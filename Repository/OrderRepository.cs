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
    public class OrderRepository : IOrderRepository
    {
        private ApplicationDatabaseContext context;

        public OrderRepository(ApplicationDatabaseContext applicationDatabaseContext)
        {
            this.context = applicationDatabaseContext;
        }

        public void AddOrder(Order order)
        {
            context.Order.Add(order);
            context.SaveChanges();
        }

        /// <summary>
        /// Overloaded method that also saves the guestUser
        /// </summary>
        /// <param name="order"></param>
        /// <param name="guestUser"></param>
        public void AddOrder(Order order, GuestUser guestUser)
        {
            context.GuestUsers.Add(guestUser);
            context.Order.Add(order);
            context.SaveChanges();
        }

        public Order GetOrderByGuid(Guid id)
        {
            return context.Order
                .FirstOrDefault(p => p.Guid == id);
        }

        public IEnumerable<Order> ListAll()
        {
            throw new NotImplementedException();
        }

        public void RemoveOrder(Guid guid)
        {
            throw new NotImplementedException();
        }

        public void UpdateOrder(Guid guid, Order newOrder)
        {
            throw new NotImplementedException();
        }

        public decimal TurnOverLastWeek()
        {
            IEnumerable<Order> allItems = context.Order
                        .Where(s => s.OrderCreated.AddDays(7) > DateTime.Now);
            decimal totalpricelastweek = allItems.Sum(s => s.FinalPrice);

            return totalpricelastweek;
        }

        public decimal TurnOverxWeeksago(int weeks)
        {
            IEnumerable<Order> allItems = context.Order
                        .Where(s => s.OrderCreated.AddDays(7 + 7*weeks) > DateTime.Now)
                        .Where(s => s.OrderCreated.AddDays(7*weeks) < DateTime.Now);
            decimal totalpricelastweek = allItems.Sum(s => s.FinalPrice);

            return totalpricelastweek;
        }

        public Dictionary<string, int> popularbeers()
        {
            IEnumerable<ProductOrder> allItems = context.ProductOrder;
            var ordereditems = allItems.GroupBy(item => item.ProductId)
                                        .Select(g => new {ProductId = g.Key, Count= g.Sum(s => s.Count)})
                                        .OrderByDescending(iets => iets.Count)
                                        .Take(10);


            Dictionary<string, int> popularbeers = new Dictionary<string, int>();

            foreach (var result in ordereditems){
                popularbeers.Add(result.ProductId, result.Count);
            }

            return popularbeers;
        }
        

    }
}