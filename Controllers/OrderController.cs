using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Microsoft.AspNetCore.Identity;


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

        public OrderController(IOrderRepository orderRepository, IProductRepository productRepository, UserManager<WebshopUser> userManager, IDiscountRepository discountRepository)
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
            return Json(new { discount = rest });

        }

        [HttpGet]
        public IActionResult Fetch(String id)
        {
            Order order = OrderRepository.GetOrderByGuid(new Guid(id));
            if (order == null)
            {
                return NotFound();
            }
            return Json(new { order = order });
        }

        [HttpPost]
        public IActionResult AddOrderGuest([FromBody] OrderGuestUserViewModel OrderGuestUserViewModel)
        {
            if (ModelState.IsValid)
            {
                GuestUser guestUser = new GuestUser
                {
                    UserGuid = Guid.NewGuid(),
                    Email = OrderGuestUserViewModel.Email,
                    FirstName = OrderGuestUserViewModel.FirstName,
                    LastName = OrderGuestUserViewModel.LastName
                };

                ShippingAddress userAddress = new ShippingAddress
                {
                    PostalCode = OrderGuestUserViewModel.PostalCode,
                    StreetNumber = OrderGuestUserViewModel.StreetNumber,
                    StreetName = OrderGuestUserViewModel.StreetName,
                    CityName = OrderGuestUserViewModel.CityName,
                    Country = OrderGuestUserViewModel.Country,
                    AssociatedUser = guestUser.UserGuid
                };

                guestUser.ShippingAddress = userAddress;

                decimal totalPriceOrder = CalculateOrderPrice(OrderGuestUserViewModel.Products);
                List<ProductOrder> productOrders = GetOrderProducts(OrderGuestUserViewModel.Products);

                string couponcodedatabase = null;
                decimal totaldiscount = 0;
                decimal totalPricewithDiscount = 0;


                if (OrderGuestUserViewModel.Coupon != null)
                {
                    Discount rest = DiscountRepository.CheckDiscount(OrderGuestUserViewModel.Coupon);
                    if (rest != null)
                    {
                        couponcodedatabase = rest.Code;

                        if (rest.Procent == true)
                        {
                            totaldiscount = Math.Round((totalPriceOrder / 100 * rest.Amount) * 100) / 100;
                        }
                        else
                        {
                            totaldiscount = Math.Round((rest.Amount) * 100) / 100;
                        }
                    }
                }
                totalPricewithDiscount = Math.Round((totalPriceOrder - totaldiscount) * 100) / 100;

                if (totalPricewithDiscount < 0)
                {
                    totalPricewithDiscount = 0;
                }




                // TODO Apply coupon code to order on server side;

                Order newOrder = new Order
                {
                    Guid = Guid.NewGuid(),
                    Paid = false,
                    Shipped = false,
                    OrderCreated = DateTime.Now,
                    TotalPrice = totalPriceOrder,
                    Discount = totaldiscount,
                    FinalPrice = totalPricewithDiscount,
                    CouponCode = couponcodedatabase,
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

        // TODO validate this api route with token
        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] OrderUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Check if user exits
                WebshopUser user = await UserManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    decimal totalPriceOrder = CalculateOrderPrice(model.Products);
                    List<ProductOrder> productOrders = GetOrderProducts(model.Products);

                    Order newOrder = new Order
                    {
                        Guid = Guid.NewGuid(),
                        Paid = false,
                        Shipped = false,
                        OrderCreated = DateTime.Now,
                        TotalPrice = totalPriceOrder,
                        CouponCode = model.Coupon,
                        OrderedProducts = productOrders,
                        AssociatedUserGuid = user.UserGuid,
                        OrderedFromGuestAccount = false,
                        EmailConfirmationSent = false
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
    }
}
