using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Concrete implementation of the product repository interface
    /// </summary>
    public class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDatabaseContext context;

        public AddressRepository(ApplicationDatabaseContext applicationDatabaseContext)
        {
            this.context = applicationDatabaseContext;
        }

        public ShippingAddress GetByGuid(Guid guid)
        {
            return context.Addresses
                .FirstOrDefault(p => p.AssociatedUser == guid);
        }

        public void DeleteAddress(Guid guid)
        {
            ShippingAddress address = context.Addresses.FirstOrDefault(p => p.AssociatedUser == guid);
            if (address != null)
            {
                context.Addresses.Remove(address);
            }
        }
    }
}