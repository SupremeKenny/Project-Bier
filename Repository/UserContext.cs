using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Project_Bier.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Project_Bier.Repository
{
    public class UserContext : IUserContext
    {
        private readonly UserManager<WebshopUser> userManager;
        private WebshopUser currentUser;
        private HttpContext httpContext;

        public UserContext(UserManager<WebshopUser> userManager,  IHttpContextAccessor contextAccessor,  HttpContext httpContext)
        {
            this.userManager = userManager;
            this.httpContext = contextAccessor.HttpContext;
        }

        
        public string GenerateToken(WebshopUser user)
        {
            throw new NotImplementedException();
        }

        public Task<WebshopUser> GetCurrentUser()
        {
            throw new NotImplementedException();
        }

        public Task<WebshopUser> GetLoggedInUser()
        {
            throw new NotImplementedException();
        }

        public Guid? GetUserGuidFromCookies()
        {
            throw new NotImplementedException();
        }

        public WebshopUser NewGuestUser()
        {
            throw new NotImplementedException();
        }

        public void RemoveUserGuidCookies()
        {
            throw new NotImplementedException();
        }

        public void SetUserGuidCookies(Guid userGuid)
        {
            throw new NotImplementedException();
        }
    }
}