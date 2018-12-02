using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Concrete implementation of the product repository interface
    /// </summary>
    public class ProductRepository : IProductRepository
    {
        private ApplicationDatabaseContext context;
        public static int LoadSize { get => 8; }

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
            return context.Beers
                .FirstOrDefault(p => p.Id == id);
        }

        public ItemCollection<Product> GetProductCollectionByCategory(string category, int index)
        {
            IEnumerable<Product> allItems = GetProductsByCategory(category);
            int totalCollections = allItems.Count() / ProductRepository.LoadSize;

            IEnumerable<Product> actualItems = allItems
                .Skip(index * ProductRepository.LoadSize)
                .Take(ProductRepository.LoadSize);
            
            return new ItemCollection<Product>(){
                Index = index,
                Items = actualItems,
                TotalCollections = totalCollections
            };
        }

        public IEnumerable<Product> GetProductsByCategory(string category)
        {
            return context.Beers.Where(p => p.CategoryId == category);
        }

        public IEnumerable<Product> ListAll()
        {
            return context.Beers.ToList();
        }

        public void RemoveProduct(Guid guid)
        {
            throw new NotImplementedException();
        }

        public void UpdateProduct(Guid guid, Product newProduct)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetRandomProducts(int count)
        {
            return context.Beers
            .OrderBy(x => Guid.NewGuid()).Take(count);
        }
    }
}