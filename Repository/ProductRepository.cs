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

        public void AddProduct(Beer product)
        {
            // throw new NotImplementedException();
            try
            {
                int beerExists = context.Beer.Count(b => b.Id == product.Id);

                if (beerExists <= 0)
                {
                    context.Beer.Add(product);
                    context.SaveChanges();
                }
            }
            catch (System.Exception)
            {
                
                throw;
            }
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
        }

        public void RemoveProduct(String guid)
        {
            try
            {
                var deleteProduct = context.Beer.Find(guid);
                context.Beer.Remove(deleteProduct);
                context.SaveChanges();

            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public void UpdateProduct(Beer newProduct, string oldId)
        {
            try
            {
                if (oldId == newProduct.Id)
                {
                    Beer productToUpdate = context.Beer.FirstOrDefault(p => p.Id == newProduct.Id);
                    if (productToUpdate != null)
                    {
                        productToUpdate.Name = newProduct.Name;
                        productToUpdate.CategoryId = newProduct.CategoryId;
                        productToUpdate.Price = newProduct.Price;
                        productToUpdate.BrewerName = newProduct.BrewerName;
                        productToUpdate.CountryName = newProduct.CountryName;
                        productToUpdate.AlcoholPercentage = newProduct.AlcoholPercentage;
                        productToUpdate.Content = newProduct.Content;
                        productToUpdate.Url = newProduct.Url;
                        productToUpdate.Description = newProduct.Description;
                        
                        context.SaveChanges();
                    }
                }
                else {
                    RemoveProduct(oldId);
                    AddProduct(newProduct);
                }

            }
            catch (System.Exception)
            {
                
                throw;
            }
            // throw new NotImplementedException();
        }

        public IEnumerable<Product> GetHomePageProducts()
        {
            return context.Beer
            .OrderBy(x => Guid.NewGuid()).Take(8);
        }

        public Page<Beer> Pagination (int page_index, int page_size)
        {
            Page<Beer> paginationResult = context.Beer.GetPages(page_index, page_size, m => m.Name);

            return paginationResult;
        }
    }
}