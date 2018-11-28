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
    public class DiscountRepository : IDiscountRepository
    {
        private ApplicationDatabaseContext context;

        public DiscountRepository(ApplicationDatabaseContext applicationDatabaseContext)
        {
            this.context = applicationDatabaseContext;
        }

        public Discount CheckDiscount(String input)
        {
            var rest = context.Discount
                    .Where(b => b.Code == input)
                    .FirstOrDefault();
            
            return rest;
        }

        public void AddDiscount(Discount discount)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Discount> ListAll()
        {
            return context.Discount.ToList();
        }

        public void RemoveDiscount(Guid guid)
        {
            throw new NotImplementedException();
        }

        public void UpdateDiscount(Guid guid, Discount newDiscount)
        {
            throw new NotImplementedException();
        }

    }
}