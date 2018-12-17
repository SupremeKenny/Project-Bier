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
    // TODO Routes should be protected with admin role tokens
    // Why do the CUD operations not return anything? 
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

        [HttpPut("{id}")]
        public void UpdateDiscount ([FromBody] Discount discount, String id)
        {

            /// Save Changes
            discountRepository.UpdateDiscount(discount, id);

            
        }


        [HttpGet("{page_index}/{numberOfProducts}")]
        public IActionResult FetchAllProducts (int page_index, int numberOfProducts) 
        {
            var projects = ProductRepository.Pagination(page_index, numberOfProducts);

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
            Product product = ProductRepository.GetProductByGuid(id);
            if(product == null) 
            {
                return NotFound();
            }
            return Json(new {product = product});
        }

        [HttpDelete("{id}")]
        public void Delete(String id)  
        {  
            ProductRepository.RemoveProduct(id); 
        }

        [HttpPost]
        public void Create ([FromBody] Beer product)
        {
            ProductRepository.AddProduct(product);
        }

        [HttpPut("{id}")]
        public void Update ([FromBody] Beer product, String id)
        {
            ProductRepository.UpdateProduct(product, id);   
        }

    }
}