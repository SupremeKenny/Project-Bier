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

        public Discount CheckDiscount(string input)
        {
            return context.Discount
                .FirstOrDefault(b => b.Code == input);
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

        public void UpdateDiscount(Discount newDiscount, string code)
        {
            try
            {
                if (code == newDiscount.Code)
                {
                    Discount productToUpdate = context.Discount.FirstOrDefault(p => p.Code == newDiscount.Code);
                    if (productToUpdate != null)
                    {
                        productToUpdate.Code = newDiscount.Code;
                        productToUpdate.Procent = newDiscount.Procent;
                        productToUpdate.Amount = newDiscount.Amount;

                        context.SaveChanges();
                    }
                }
                else
                {
                    RemoveDiscount(code);
                    AddDiscount(newDiscount);
                }
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}