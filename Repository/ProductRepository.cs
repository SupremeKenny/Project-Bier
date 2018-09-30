using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;

namespace Project_Bier.Repository
{
    public class ProductRepository : IProductRepository
    {
        public void AddProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public void AddProducts(Product[] products)
        {
            throw new NotImplementedException();
        }

        public Product GetProductByGuid(Guid guid)
        {
            throw new NotImplementedException();
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