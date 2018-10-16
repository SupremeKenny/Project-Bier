using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;

namespace Project_Bier.Controllers
{
    public class HomeController: Controller
    {
        IProductRepository productRepository;

        public HomeController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult FetchAllProducts()
        {
            IEnumerable<Product> products = productRepository.GetHomePageProducts();
            if(products == null) {
                return NotFound();
            }
            return Json(new {products = products});
        }
    }
}