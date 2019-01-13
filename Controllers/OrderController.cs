using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

//TODO Sent confirmation email after payment
namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class OrderController : Controller
    {
        UserManager<WebshopUser> UserManager { get; }
        IOrderRepository OrderRepository { get; }
        IProductRepository ProductRepository { get; }
        IDiscountRepository DiscountRepository { get; }

        public OrderController(IOrderRepository orderRepository, IProductRepository productRepository,
            UserManager<WebshopUser> userManager, IDiscountRepository discountRepository)
        {
            OrderRepository = orderRepository;
            ProductRepository = productRepository;
            UserManager = userManager;
            DiscountRepository = discountRepository;
        }

        [HttpGet]
        public IActionResult SearchDiscount(String input)
        {
            Discount rest = new Discount();
            rest = DiscountRepository.CheckDiscount(input);
            if (rest == null)
            {
                return NotFound();
            }

            return Json(new {discount = rest});
        }

        [HttpGet]
        public IActionResult Fetch(String id)
        {
            Order order = OrderRepository.GetOrderByGuid(new Guid(id));
            if (order == null)
            {
                return NotFound();
            }

            return Json(new {order = order});
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserOrders()
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
            WebshopUser user = await UserManager.FindByIdAsync(userId);
            if (user != null)
            {
                List<OrderOverviewModel> orders = OrderRepository.GetAllUserOrders(user.UserGuid);

                // Can be done in subquery in repository but this also works
                foreach (OrderOverviewModel order in orders)
                {
                    order.Products = new List<ProductOverviewModel>();
                    foreach (ProductOrder productOrder in order.OrderedProducts)
                    {
                        order.Products.Add(ProductRepository.GetOverviewModel(productOrder));
                    }

                    // Set the null to erase duplicate data
                    order.OrderedProducts = null;
                }

                return Ok(new {orders});
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult AddOrderGuest([FromBody] OrderGuestUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                GuestUser guestUser = new GuestUser
                {
                    UserGuid = Guid.NewGuid(),
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PhoneNumber = model.PhoneNumber
                };

                ShippingAddress userAddress = new ShippingAddress
                {
                    PostalCode = model.PostalCode,
                    StreetNumber = model.StreetNumber,
                    StreetName = model.StreetName,
                    CityName = model.CityName,
                    Country = model.Country,
                    AssociatedUser = guestUser.UserGuid
                };

                guestUser.ShippingAddress = userAddress;

                decimal totalPriceOrder = CalculateOrderPrice(model.Products);
                List<ProductOrder> productOrders = GetOrderProducts(model.Products);

                decimal finalPrice = totalPriceOrder;
                decimal discount = 0;

                if (model.Coupon != null)
                {
                    var discountValidation = ValidateCouponCode(model.Coupon, totalPriceOrder);
                    if (discountValidation != null)
                    {
                        model.Coupon = discountValidation.Item1;
                        discount = discountValidation.Item2;
                        finalPrice = discountValidation.Item3;
                    }
                }

                Order newOrder = new Order
                {
                    Guid = Guid.NewGuid(),
                    Paid = false,
                    Shipped = false,
                    OrderCreated = DateTime.Now,
                    TotalPrice = totalPriceOrder,
                    Discount = discount,
                    FinalPrice = finalPrice,
                    CouponCode = model.Coupon,
                    OrderedProducts = productOrders,
                    AssociatedUserGuid = guestUser.UserGuid,
                    OrderedFromGuestAccount = true,
                    EmailConfirmationSent = false
                };

                OrderRepository.AddOrder(newOrder, guestUser);
                return Ok(newOrder.Guid);
            }

            return BadRequest();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddOrder([FromBody] OrderUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
                WebshopUser user = await UserManager.FindByIdAsync(userId);

                if (user != null)
                {
                    decimal totalPriceOrder = CalculateOrderPrice(model.Products);
                    List<ProductOrder> productOrders = GetOrderProducts(model.Products);

                    decimal finalPrice = totalPriceOrder;
                    decimal discount = 0;

                    if (model.Coupon != null)
                    {
                        var discountValidation = ValidateCouponCode(model.Coupon, totalPriceOrder);
                        if (discountValidation != null)
                        {
                            model.Coupon = discountValidation.Item1;
                            discount = discountValidation.Item2;
                            finalPrice = discountValidation.Item3;
                        }
                    }

                    Order newOrder = new Order
                    {
                        Guid = Guid.NewGuid(),
                        Paid = false,
                        Shipped = false,
                        OrderCreated = DateTime.Now,
                        TotalPrice = totalPriceOrder,
                        Discount = discount,
                        FinalPrice = finalPrice,
                        CouponCode = model.Coupon,
                        OrderedProducts = productOrders,
                        AssociatedUserGuid = user.UserGuid,
                        OrderedFromGuestAccount = false,
                        EmailConfirmationSent = false,
                        OrderStatus = OrderStatus.Received
                    };

                    OrderRepository.AddOrder(newOrder);
                    return Ok(newOrder.Guid);
                }
            }

            return BadRequest();
        }

        private decimal CalculateOrderPrice(List<SelectedProduct> products)
        {
            decimal totalPrice = 0;
            foreach (SelectedProduct selectedProduct in products)
            {
                decimal price = ProductRepository.GetProductByGuid(selectedProduct.Id).Price;
                totalPrice += (selectedProduct.Count * price);
            }

            return totalPrice;
        }

        private List<ProductOrder> GetOrderProducts(List<SelectedProduct> products)
        {
            List<ProductOrder> productOrders = new List<ProductOrder>();
            foreach (SelectedProduct selectedProduct in products)
            {
                ProductOrder productOrder = new ProductOrder()
                {
                    Guid = Guid.NewGuid(),
                    ProductId = selectedProduct.Id,
                    Count = selectedProduct.Count
                };
                productOrders.Add(productOrder);
            }

            return productOrders;
        }

        private Tuple<string, decimal, decimal> ValidateCouponCode(string coupon, decimal price)
        {
            string fetchedCoupon = null;
            decimal totalDiscount = 0;
            decimal finalPrice = 0;

            Discount discount = DiscountRepository.CheckDiscount(coupon);

            if (discount != null)
            {
                fetchedCoupon = discount.Code;

                if (discount.Procent == true)
                {
                    totalDiscount = Math.Round((price / 100 * discount.Amount) * 100) / 100;
                }
                else
                {
                    totalDiscount = Math.Round((discount.Amount) * 100) / 100;
                }

                finalPrice = Math.Round((price - totalDiscount) * 100) / 100;

                if (finalPrice < 0)
                {
                    finalPrice = 0;
                }

                return new Tuple<string, decimal, decimal>(fetchedCoupon, totalDiscount, finalPrice);
            }
            else return null;
        }
    }
}