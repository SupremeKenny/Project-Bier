using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;

// TODO Document routes
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
        public IActionResult GetProduct(String id)
        {
            Product product = ProductRepository.GetProductByGuid(id);
            if (product == null)
            {
                return NotFound();
            }
            return Json(new { product = product });
        }

        [HttpGet]
        public IActionResult GetCategoryItems(String categoryId, int index)
        {
            ItemCollection<Product> itemCollection = ProductRepository.GetProductCollectionByCategory(categoryId, index);
            if (itemCollection == null)
            {
                return NotFound();
            }
            return Json(itemCollection);
        }

        [HttpGet]
        public IActionResult GetCategoryDescription(String categoryId)
        {
            Category category = ProductRepository.GetCategory(categoryId);
            if (category != null)
            {
                return Ok(new { category.Description });
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Fetches x random products by calliung the productRepository
        /// </summary>
        /// <param name="productCount">The number of products to fetch</param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetProducts(int count)
        {
            IEnumerable<Product> products = ProductRepository.GetRandomProducts(count);
            if (products == null)
            {
                return NotFound();
            }
            return Json(new { products = products });
        }

    }
}
