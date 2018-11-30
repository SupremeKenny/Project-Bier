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

        public AdminController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
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

    }

}