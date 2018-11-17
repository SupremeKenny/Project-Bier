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

        public OrderController(IOrderRepository orderRepository, IProductRepository productRepository)
        {
            OrderRepository = orderRepository;
            ProductRepository = productRepository;
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
                    Guid = Guid.NewGuid(),
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
                    AssociatedUser = guestUser.Guid
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

                // TODO Apply coupon code to order on server side;

                Order newOrder = new Order
                {
                    Guid = Guid.NewGuid(),
                    Paid = false,
                    Shipped = false,
                    OrderCreated = DateTime.Now,
                    TotalPrice = totalPriceOrder,
                    CouponCode = OrderGuestUserViewModel.Coupon,
                    OrderedProducts = productOrders,
                    AssociatedUserGuid = guestUser.Guid,
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
