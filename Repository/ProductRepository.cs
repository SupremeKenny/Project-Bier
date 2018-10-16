using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Concrete implementation of the product repository
    /// </summary>
    public class ProductRepository : IProductRepository
    {
        private ApplicationDatabaseContext context;

        public ProductRepository(ApplicationDatabaseContext applicationDatabaseContext) 
        {
            this.context = applicationDatabaseContext;
        }
        public void AddProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public void AddProducts(Product[] products)
        {
            throw new NotImplementedException();
        }

        public Product GetProductByGuid(String id)
        {
            return context.Beer
                .FirstOrDefault(p => p.Id == id);
        }

        public Product GetProductByPrettyUrl(string url)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
           return context.Beer.Where(p => p.CategoryId == category);
        }

        public IEnumerable<Product> ListAll()
        {
            // return context.Beer
            // .Select (p => p);
            // return context.Beer
            // .OrderBy(x => Guid.NewGuid()).Take(8);
            throw new NotImplementedException();
        }

        public void RemoveProduct(Guid guid)
        {
            throw new NotImplementedException();
        }

        public void UpdateProduct(Guid guid, Product newProduct)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetHomePageProducts()
        {
            return context.Beer
            .OrderBy(x => Guid.NewGuid()).Take(8);
        }
    }
}