using System;
using System.Collections.Generic;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Pagination;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Interface that describes what kind of methods a UserRepository class
    /// should have.
    /// </summary>
    public interface IUserRepository
    {
        IEnumerable<WebshopUser> GetAllUsers();

        /// <summary>
        /// This method is used when you only want to fetch the fields
        /// that can be displayed in a user interface, so no normalized fields
        /// or hashed passwords and such.
        /// </summary>
        /// <param name="index">The current pagination index</param>
        /// <param name="size">The number of items on one page</param>
        /// <returns></returns>
        Page<WebshopUser> GetUsers(int index, int size);

        WebshopUser FindById(string id);

        void DeleteUser(WebshopUser user);

        bool UpdateUser(UpdateInfoModel updatedInfoModel, WebshopUser userToUpdate, ShippingAddress address);
    }
}