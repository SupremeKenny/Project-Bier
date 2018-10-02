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
        private ApplicationDatabaseContext applicationDatabaseContext;

        public ProductRepository(ApplicationDatabaseContext applicationDatabaseContext) 
        {
            this.applicationDatabaseContext = applicationDatabaseContext;
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
            return applicationDatabaseContext.Products
                .FirstOrDefault(p => p.Id == id);
        }

        public Product GetProductByPrettyUrl(string url)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetProductsByCategory(Category category)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> ListAll()
        {
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
    }
}