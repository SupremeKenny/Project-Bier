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

    }
}