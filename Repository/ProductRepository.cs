using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Project_Bier.Pagination;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Models.ViewModels;

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

        public void AddProduct(Beer product)
        {
            bool beerExists = context.Beers.Any(b => b.Id == product.Id);
            if (!beerExists)
            {
                context.Beers.Add(product);
                context.SaveChanges();
            }
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

            return new ItemCollection<Product>()
            {
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
            return context.Beers
            .Select(p => p);
        }

        public void RemoveProduct(String guid)
        {
            var deleteProduct = context.Beers.Find(guid);
            context.Beers.Remove(deleteProduct);
            context.SaveChanges();
        }

        public void UpdateProduct(Beer modifiedProduct, string oldId)
        {
            if (oldId == modifiedProduct.Id)
            {
                Beer productToUpdate = context.Beers.FirstOrDefault(p => p.Id == modifiedProduct.Id);
                if (productToUpdate != null)
                {
                    productToUpdate.Name = modifiedProduct.Name;
                    productToUpdate.CategoryId = modifiedProduct.CategoryId;
                    productToUpdate.Price = modifiedProduct.Price;
                    productToUpdate.BrewerName = modifiedProduct.BrewerName;
                    productToUpdate.CountryName = modifiedProduct.CountryName;
                    productToUpdate.AlcoholPercentage = modifiedProduct.AlcoholPercentage;
                    productToUpdate.Content = modifiedProduct.Content;
                    productToUpdate.Url = modifiedProduct.Url;
                    productToUpdate.Description = modifiedProduct.Description;
                    context.SaveChanges();
                }
            }
            else
            {
                // If the id has been changed then we should add a new product
                RemoveProduct(oldId);
                AddProduct(modifiedProduct);
            }
        }

        public IEnumerable<Product> GetRandomProducts(int count)
        {
            return context.Beers.OrderBy(x => Guid.NewGuid()).Take(count);
        }

        public Page<Beer> Pagination(int page_index, int page_size)
        {
            Page<Beer> paginationResult = context.Beers.GetPages(page_index, page_size, m => m.Name);
            return paginationResult;
        }

        public ProductOverviewModel GetOverviewModel(ProductOrder order)
        {
            Product product = GetProductByGuid(order.ProductId);
            return new ProductOverviewModel
            {
                Name = product.Name,
                Id = product.Id,
                Url = product.Url,
                Count = order.Count
            };
        }

        public Category GetCategory(string category)
        {
             return context.Categories.FirstOrDefault(p => p.CategoryId == category);
        }
    }
}