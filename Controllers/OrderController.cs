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
    public class OrderController: Controller
    {
        IOrderRepository orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult Fetch(String id)
        {
            Order order = orderRepository.GetOrderByGuid(id);
            if(order == null) 
            {
                return NotFound();
            }
            return Json(new {order = order});
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] OrderGuestUserViewModel OrderGuestUserViewModel){
            System.Diagnostics.Debug.WriteLine(OrderGuestUserViewModel);
            if (ModelState.IsValid){

                GuestUser guestUser = new GuestUser
                {
                    UserGuid =  Guid.NewGuid().ToString(),
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

                //TODO: prijs berekenen
                decimal totalPrice = 9;
                

                bool couponApplied = false;
                if(OrderGuestUserViewModel.Coupon != ""){
                    couponApplied = true;
                }


                List<ProductOrder> hoi = new List<ProductOrder>();
                foreach(inputproduct test in OrderGuestUserViewModel.Products){
                    ProductOrder ho = new ProductOrder();
                    ho.Guid = Guid.NewGuid().ToString();
                    ho.ProductId = hoi.pr
                }

                Order newOrder = new Order
                {
                    Guid = Guid.NewGuid().ToString(),
                    Paid = false,
                    Shipped = false,
                    OrderCreated = DateTime.Now,
                    TotalPrice = totalPrice,
                    CouponApplied = couponApplied,
                   // TODO: OrderedProducts = OrderGuestUserViewModel.Products,
                    AssociatedUserGuid = guestUser.UserGuid,
                    OrderedFromGuestAccount = true,
                    EmailConfirmationSent = false
                };

                //TODO: make Guestuser repostitory
                orderRepository.AddOrder(newOrder);
                return Ok(); 
            }
            return BadRequest();
           
        }

    }
}
