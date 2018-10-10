using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;

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
        void AddProduct(Product product);

        void UpdateProduct(Guid guid, Product newProduct);

        void RemoveProduct(Guid guid);

        void AddProducts(Product[] products);

        Product GetProductByGuid(String id);

        Product GetProductByPrettyUrl(String url);

        IEnumerable<Product> GetProductsByCategory(string category);

        IEnumerable<Product>  ListAll();

    }
}