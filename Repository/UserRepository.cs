using System.Collections.Generic;
using System.Linq;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Pagination;

namespace Project_Bier.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDatabaseContext context;

        public UserRepository(ApplicationDatabaseContext applicationDatabaseContext)
        {
            context = applicationDatabaseContext;
        }

        public IEnumerable<WebshopUser> GetAllUsers()
        {
            return context.Users.Select(p => p);
        }

        public Page<WebshopUser> GetUsers(int index, int size)
        {
            Page<WebshopUser> users = context.Users.GetPages(index, size, u => u.Email);
            return users;
        }

        public WebshopUser FindById(string id)
        {
            return context.Users
                .FirstOrDefault(user => user.Id == id);
        }

        public void DeleteUser(WebshopUser user)
        {
            context.Users.Remove(user);
            context.SaveChanges();
        }

        public bool UpdateUser(UpdateInfoModel updatedInfoModel, WebshopUser userToUpdate, ShippingAddress address)
        {
            userToUpdate.Email = updatedInfoModel.Email;
            userToUpdate.FirstName = updatedInfoModel.FirstName;
            userToUpdate.LastName = updatedInfoModel.LastName;
            userToUpdate.PhoneNumber = updatedInfoModel.PhoneNumber;


            bool addressChanged = updatedInfoModel.PostalCode != address.PostalCode ||
                                  updatedInfoModel.StreetNumber != address.StreetNumber ||
                                  updatedInfoModel.StreetName != address.StreetName ||
                                  updatedInfoModel.CityName != address.CityName;

            if (addressChanged)
            {
                ShippingAddress userAddress = new ShippingAddress
                {
                    PostalCode = updatedInfoModel.PostalCode,
                    StreetNumber = updatedInfoModel.StreetNumber,
                    StreetName = updatedInfoModel.StreetName,
                    CityName = updatedInfoModel.CityName,
                    Country = updatedInfoModel.Country,
                    Province = updatedInfoModel.Province,
                    AssociatedUser = userToUpdate.UserGuid
                };

                userToUpdate.ShippingAddresses = new List<ShippingAddress>(new ShippingAddress[] {userAddress});
            }

            context.SaveChanges();
            return addressChanged;
        }
    }
}