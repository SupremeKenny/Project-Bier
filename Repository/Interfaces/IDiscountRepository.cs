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
    public interface IDiscountRepository
    {
        void AddDiscount(Discount discount);

        Discount CheckDiscount(String input);

        void UpdateDiscount(Guid guid, Discount newDiscount);

        void RemoveDiscount(Guid guid);

        IEnumerable<Discount>  ListAll();

    }
}