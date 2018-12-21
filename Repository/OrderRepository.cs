using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Project_Bier.Models.ViewModels;

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

        /// <summary>
        /// Returns the order of a certain user.null
        /// Only returns guid, final price and the products by using projection
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<OrderOverviewModel> GetAllUserOrders(Guid id)
        {
            var userOrders = 
                from order in context.Order
                where order.AssociatedUserGuid == id
                orderby order.OrderCreated descending
                select new OrderOverviewModel
                {
                    OrderNumber = order.Guid.ToString(),
                    FinalPrice = order.FinalPrice,
                    OrderedProducts = order.OrderedProducts.ToList(),
                    Date = order.OrderCreated,
                    OrderStatus = order.OrderStatus
                }; 

            return userOrders.ToList();
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
        
        public Dictionary<string, int> populardiscounts()
        {
            IEnumerable<Order> allItems = context.Order;
            var ordereditems = allItems.GroupBy(item => item.CouponCode)
                                        .Select(g => new {CouponCode = g.First().CouponCode, Count= g.Count()})
                                        .OrderByDescending(iets => iets.Count)
                                        .Take(10);


            Dictionary<string, int> populardiscounts = new Dictionary<string, int>();

            foreach (var result in ordereditems){
                if(result.CouponCode != null && result.CouponCode != ""){
                    populardiscounts.Add(result.CouponCode, result.Count);
                }
            }

            return populardiscounts;
        }
        

    }
}