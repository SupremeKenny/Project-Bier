using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Project_Bier.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Concrete implementation of the product repository
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
            return context.Beer
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
            return context.Beer.Where(p => p.CategoryId == category);
        }

        public IEnumerable<Product> ListAll()
        {
            return context.Beer
            .Select (p => p);
            // .OrderBy (p => p.Id);
            // return context.Beer
            // .OrderBy(x => Guid.NewGuid()).Take(8);
            // throw new NotImplementedException();
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

        public Page<Beer> Pagination (int page_index, int page_size)
        {
            var paginationResult = context.Beer.GetPages(page_index, page_size, m => m.Id);
            IEnumerable<object> resultToReturn = paginationResult.Items.Select(prod => new 
            {
                Name = prod.Name
            });

            return paginationResult;

            //return new OkObjectResult(new {TotalPages = paginationResult.TotalPages, Items = resultToReturn});
        }
    }
}