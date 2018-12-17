using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Interface that describes what kind of methods a Order Repository class
    /// should have.
    /// 
    /// Depency injection is used for the repository pattern. Where we need the product repository
    /// we have a inject an instance of the concrete class: OrderRepository
    /// </summary>
    public interface IOrderRepository
    {
        void AddOrder(Order order);

        void AddOrder(Order order, GuestUser guestUser);

        void UpdateOrder(Guid guid, Order newOrder);

        void RemoveOrder(Guid guid);

        Order GetOrderByGuid(Guid id);

        IEnumerable<Order>  ListAll();

        decimal TurnOverLastWeek();

        decimal TurnOverxWeeksago(int weeks);

        Dictionary<string, int> popularbeers();

        List<OrderOverviewModel> GetAllUserOrders(Guid id);

    }
}