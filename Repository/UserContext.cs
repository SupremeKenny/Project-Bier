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
        private readonly IConfiguration config;
        private WebshopUser currentUser;
        private HttpContext httpContext;

        public UserContext(UserManager<WebshopUser> userManager, IHttpContextAccessor contextAccessor, HttpContext httpContext, IConfiguration config)
        {
            this.userManager = userManager;
            this.httpContext = contextAccessor.HttpContext;
            this.config = config;
        }

        public async Task<string> GenerateToken(WebshopUser user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Sid, user.Id),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.UserData, user.UserGuid.ToString())
            };

            IList<Claim> userClaims = await userManager.GetClaimsAsync(user);
            claims.AddRange(claims);

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            JwtSecurityToken securityToken = new JwtSecurityToken(
                config["Token:Issuer"],
                config["Token:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);
            
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
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