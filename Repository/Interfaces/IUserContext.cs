using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;

namespace Project_Bier.Repository {
    public interface IUserContext
    {   
        /// <summary>
        /// Generates a json web token for the client
        /// </summary>
        /// <param name="user">The user that should be identified with the token</param>
        /// <returns>Returns a token string</returns>
        string GenerateToken(WebshopUser user);

        Task<WebshopUser> GetCurrentUser();

        WebshopUser NewGuestUser();

        void RemoveUserGuidCookies();

        void SetUserGuidCookies(Guid userGuid);

        Task<WebshopUser> GetLoggedInUser();

        Guid? GetUserGuidFromCookies();
    }
}