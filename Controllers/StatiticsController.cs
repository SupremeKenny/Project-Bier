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
    public class StatiticsController : Controller
    {
        UserManager<WebshopUser> UserManager { get; }
        IOrderRepository OrderRepository { get; }
        IProductRepository ProductRepository { get; }
        IDiscountRepository DiscountRepository { get; }

        public StatiticsController(IOrderRepository orderRepository, IProductRepository productRepository, UserManager<WebshopUser> userManager, IDiscountRepository discountRepository)
        {
            OrderRepository = orderRepository;
            ProductRepository = productRepository;
            UserManager = userManager;
            DiscountRepository = discountRepository;
        }


        [HttpGet]
        public IActionResult FetchTurnover() 
        {
            decimal turnoverlastweek = OrderRepository.TurnOverLastWeek();
            decimal turnover1weekago = OrderRepository.TurnOverxWeeksago(1);
            decimal turnover2weekago = OrderRepository.TurnOverxWeeksago(2);
            decimal turnover3weekago = OrderRepository.TurnOverxWeeksago(3);
        

            return new OkObjectResult(
                new {
                    turnoverlastweek= turnoverlastweek,
                    turnover1weekago = turnover1weekago,
                    turnover2weekago = turnover2weekago,
                    turnover3weekago = turnover3weekago
                    });
        }

        [HttpGet]
        public IActionResult FetchPopularBeers() 
        {

            var temp = OrderRepository.popularbeers();

            return new OkObjectResult(
                new {
                    popularbeers = temp
                    });
        }

        [HttpGet]
        public IActionResult FetchPopularDiscounts() 
        {

            var temp = OrderRepository.populardiscounts();

            return new OkObjectResult(
                new {
                    populardiscounts = temp
                    });
        }
        

    }
}
