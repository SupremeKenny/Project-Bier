using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Project_Bier.Models;
using Microsoft.AspNetCore.Identity;


namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class StatiticsController : Controller
    {
        UserManager<WebshopUser> UserManager { get; }
        IOrderRepository OrderRepository { get; }
        IProductRepository ProductRepository { get; }
        IDiscountRepository DiscountRepository { get; }

        public StatiticsController(IOrderRepository orderRepository, IProductRepository productRepository,
            UserManager<WebshopUser> userManager, IDiscountRepository discountRepository)
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

            decimal ordercountlastweek = OrderRepository.OrderCountLastWeek();
            decimal ordercount1weekago = OrderRepository.OrderCountxWeeksago(1);
            decimal ordercount2weekago = OrderRepository.OrderCountxWeeksago(2);
            decimal ordercount3weekago = OrderRepository.OrderCountxWeeksago(3);


            return new OkObjectResult(
                new
                {
                    turnoverlastweek,
                    turnover1weekago,
                    turnover2weekago,
                    turnover3weekago,

                    ordercountlastweek,
                    ordercount1weekago,
                    ordercount2weekago,
                    ordercount3weekago,
                });
        }

        [HttpGet]
        public IActionResult FetchPopularBeers()
        {
            var temp = OrderRepository.popularbeers();

            return new OkObjectResult(
                new
                {
                    popularbeers = temp
                });
        }

        [HttpGet]
        public IActionResult FetchPopularDiscounts()
        {
            var temp = OrderRepository.populardiscounts();

            return new OkObjectResult(
                new
                {
                    populardiscounts = temp
                });
        }
    }
}