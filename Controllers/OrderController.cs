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
        IProductRepository productRepository;

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

                

                bool couponApplied = false;
                if(OrderGuestUserViewModel.Coupon != ""){
                    couponApplied = true;
                }

                decimal totalPrice = 0;
                List<ProductOrder> productlist = new List<ProductOrder>();
                foreach(inputproduct test in OrderGuestUserViewModel.Products){
                    ProductOrder productOrder = new ProductOrder();
                    productOrder.Guid = Guid.NewGuid().ToString();
                    productOrder.ProductId = test.id;
                    productOrder.Count = test.count;
                    productlist.Add(productOrder);
                    //TODO price van het product halen..
                    //totalPrice = totalPrice + productRepository.GetProductByGuid(test.id).Price;

                }
                
            
              
                

                Order newOrder = new Order
                {
                    Guid = Guid.NewGuid().ToString(),
                    Paid = false,
                    Shipped = false,
                    OrderCreated = DateTime.Now,
                    TotalPrice = totalPrice,
                    CouponApplied = couponApplied,
                    OrderedProducts = productlist,
                    AssociatedUserGuid = guestUser.UserGuid,
                    OrderedFromGuestAccount = true,
                    EmailConfirmationSent = false
                };

               



                //TODO: Save guestUser to database..
                orderRepository.AddOrder(newOrder);
                return Ok(newOrder.Guid); 
            }
            return BadRequest();
           
        }

    }
}
