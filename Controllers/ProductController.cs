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
    [Route("[controller]/[action]")]
    public class ProductController: Controller
    {
        IProductRepository productRepository;

        public ProductController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Fetch(String id)
        {
            Product product = productRepository.GetProductByGuid(id);
            if(product == null) 
            {
                return NotFound();
            }
            return Json(new {product = product});
        }

        [HttpGet]
        public IActionResult FetchCategory(String category, int index)
        {
            ItemCollection<Product> itemCollection = productRepository.GetProductCollectionByCategory(category, index);
            if (itemCollection == null) 
            {
                return NotFound();
            }
            return Json(itemCollection);
        }

        [HttpGet]
        public IActionResult FetchHome()
        {
            IEnumerable<Product> products = productRepository.GetHomePageProducts();
            if(products == null) {
                return NotFound();
            }
            return Json(new {products = products});
        }
    }
}
