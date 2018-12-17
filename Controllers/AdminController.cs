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
    public class AdminController: Controller
    {
        IProductRepository productRepository;
        IDiscountRepository discountRepository;

        public AdminController(IProductRepository productRepository, IDiscountRepository discountRepository)
        {
            this.productRepository = productRepository;
            this.discountRepository = discountRepository;
        }

        [HttpGet]
        public IActionResult FetchAllDiscounts() 
        {
            var discounts = discountRepository.ListAll();
            
            
            if(discounts == null) {
                return NotFound();
            }


            return new OkObjectResult(new {discounts= discounts});
        }

        [HttpDelete("{code}")]
        public void deletediscount(String code)  
        {  
            discountRepository.RemoveDiscount(code); 
        }

        [HttpPost]
        public void CreateDiscount ([FromBody] Discount discount)
        {
            discountRepository.AddDiscount(discount);
        }


        [HttpGet("{page_index}/{numberOfProducts}")]
        public IActionResult FetchAllProducts (int page_index, int numberOfProducts) 
        {
            var projects = productRepository.Pagination(page_index, numberOfProducts);

            IEnumerable<object> resultToReturn = projects.Items.Select(prod => new 
            {
                Name = prod.Name,
                Id = prod.Id
            });

            if(projects == null) {
                return NotFound();
            }


            return new OkObjectResult(new {TotalPages = projects.TotalPages, Items = resultToReturn, Count = resultToReturn.Count()});
        }

        [HttpGet("{id}")]
        public IActionResult Fetch(String id)
        {
            Product product = productRepository.GetProductByGuid(id);
            if(product == null) 
            {
                return NotFound();
            }
            return Json(new {product = product});
        }

        [HttpDelete("{id}")]
        public void Delete(String id)  
        {  
            productRepository.RemoveProduct(id); 
        }

        [HttpPost]
        public void Create ([FromBody] Beer product)
        {
            productRepository.AddProduct(product);
        }

        [HttpPut("{id}")]
        public void Update ([FromBody] Beer product, String id)
        {

            /// Save Changes
            productRepository.UpdateProduct(product, id);

            
        }

        [HttpPost]
        public void CreateTest (){

            /// Use Post in Postman 

            for (int i = 0; i < 10; i++)
            {
                Beer product = new Beer {
                Id = "Id-" + i,
                Name = "*" + i + " - test",
                CategoryId = "Amber",
                Price = 2
                };
                productRepository.AddProduct(product);
            }

            // Beer product = new Beer {
            //     Id = "Id-",
            //     Name = "0" + " - test",
            //     CategoryId = "Amber",
            //     Price = 2
            //     };
            //     productRepository.AddProduct(product);
        }

    }

}