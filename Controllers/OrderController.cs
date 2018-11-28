using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class OrderController : Controller
    {
        IOrderRepository OrderRepository { get; }
        IProductRepository ProductRepository { get; }
        IDiscountRepository DiscountRepository { get; }

        public OrderController(IOrderRepository orderRepository, IProductRepository productRepository, IDiscountRepository discountRepository)
        {
            OrderRepository = orderRepository;
            ProductRepository = productRepository;
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
            return Json(new { discount = rest});
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
        public IActionResult AddOrder([FromBody] OrderGuestUserViewModel OrderGuestUserViewModel)
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

                decimal totalPriceOrder = 0;
                List<ProductOrder> productOrders = new List<ProductOrder>();
                foreach (SelectedProduct selectedProduct in OrderGuestUserViewModel.Products)
                {
                    ProductOrder productOrder = new ProductOrder()
                    {
                        Guid = Guid.NewGuid(),
                        ProductId = selectedProduct.Id,
                        Count = selectedProduct.Count
                    };
                    productOrders.Add(productOrder);
                    decimal price = ProductRepository.GetProductByGuid(selectedProduct.Id).Price;
                    totalPriceOrder += (selectedProduct.Count * price);
                }

                string couponcodedatabase = null;
                decimal totaldiscount = 0;
                decimal totalPricewithDiscount = 0;


                if(OrderGuestUserViewModel.Coupon != null){
                    Discount rest = DiscountRepository.CheckDiscount(OrderGuestUserViewModel.Coupon);
                    if(rest != null){
                        couponcodedatabase = rest.Code;

                        if(rest.Procent == true){
                            totaldiscount = Math.Round((totalPriceOrder / 100 * rest.Amount)*100)/100;
                        } else {
                            totaldiscount = Math.Round((rest.Amount)*100)/100;
                        }
                    }
                }
                totalPricewithDiscount = Math.Round((totalPriceOrder - totaldiscount)*100)/100;         

                
                

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
    }
}
