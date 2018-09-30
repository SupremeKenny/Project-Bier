using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class ProductController: Controller
    {
        IProductRepository productRepository;

        public ProductController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Fetch()
        {
            return Ok(new {message="wubbulubbadubdub"});
        }
    }
}
