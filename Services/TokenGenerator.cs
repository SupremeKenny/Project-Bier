using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace Project_Bier.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly UserManager<WebshopUser> userManager;
        private readonly IConfiguration config;

        public TokenGenerator(UserManager<WebshopUser> userManager, IConfiguration config)
        {
            this.userManager = userManager;
            this.config = config;
        }

        public Task<string> GenerateTokenConfirm(WebshopUser user)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GenerateTokenLogin(WebshopUser user)
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

        public Task<string> GenerateTokenReset(WebshopUser user)
        {
            throw new NotImplementedException();
        }
    }
}