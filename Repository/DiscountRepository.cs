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
            return context.Discount
                .Where(b => b.Code == input)
                 .FirstOrDefault();

        }

        public void AddDiscount(Discount discount)
        {
            // throw new NotImplementedException();
            try
            {
                
                    context.Discount.Add(discount);
                    context.SaveChanges();
            
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public IEnumerable<Discount> ListAll()
        {
            return context.Discount.ToList();
        }

        public void RemoveDiscount(string code)
        {

            try
            {
                var deleteDiscount = this.CheckDiscount(code);
                context.Discount.Remove(deleteDiscount);
                context.SaveChanges();

            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public void UpdateDiscount(Guid guid, Discount newDiscount)
        {
            throw new NotImplementedException();
        }

    }
}