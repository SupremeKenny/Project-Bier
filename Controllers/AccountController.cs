using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<WebshopUser> userManager;
        private readonly SignInManager<WebshopUser> signInManager;

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager) 
        { 
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody]RegisterViewModel model)
        {
            return Ok();
            // TODO register user and log in
        }
        
    }
}