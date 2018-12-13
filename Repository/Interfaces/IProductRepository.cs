using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Models;
using Project_Bier.Pagination;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Interface that describes what kind of methods a Product Repository class
    /// should have.
    /// 
    /// Depency injection is used for the repository pattern. Where we need the product repository
    /// we have a inject an instance of the concrete class: ProductRepository
    /// </summary>
    public interface IProductRepository
    {
        void AddProduct(Beer product);

        void UpdateProduct(Beer newProduct, string oldId);

        void RemoveProduct(String guid);

        void AddProducts(Product[] products);

        Product GetProductByGuid(String id);

        IEnumerable<Product> GetProductsByCategory(string category);

        /// <summary>
        /// Selects a collection of Products based on the index
        /// </summary>
        /// <param name="category">The category that the user wishes to select</param>
        /// <returns></returns>
        ItemCollection<Product> GetProductCollectionByCategory(string category, int index);

        IEnumerable<Product>  ListAll();

        IEnumerable<Product> GetRandomProducts(int count);

        Page<Beer> Pagination (int page_index, int page_size);

    }
}