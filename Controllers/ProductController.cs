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
    public class ProductController : Controller
    {
        IProductRepository ProductRepository { get; }

        public ProductController(IProductRepository productRepository)
        {
            ProductRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Fetch(String id)
        {
            Product product = ProductRepository.GetProductByGuid(id);
            if (product == null)
            {
                return NotFound();
            }
            return Json(new { product = product });
        }

        [HttpGet]
        public IActionResult FetchCategory(String category, int index)
        {
            ItemCollection<Product> itemCollection = ProductRepository.GetProductCollectionByCategory(category, index);
            if (itemCollection == null)
            {
                return NotFound();
            }
            return Json(itemCollection);
        }


        /// <summary>
        /// Fetches x random products by calliung the productRepository
        /// </summary>
        /// <param name="productCount">The number of products to fetch</param>
        /// <returns></returns>
        [HttpGet("{productCount}")]
        public IActionResult FetchProducts(int productCount)
        {
            IEnumerable<Product> products = ProductRepository.GetRandomProducts(productCount);
            if (products == null)
            {
                return NotFound();
            }
            return Json(new { products = products });
        }

    }
}
