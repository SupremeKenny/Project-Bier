using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;

using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Repository;


namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<WebshopUser> userManager;
        private readonly SignInManager<WebshopUser> signInManager;
        private readonly IUserContext userContext;

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                WebshopUser newUser = new WebshopUser
                {
                    Guid =  Guid.NewGuid(),
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    FavoriteLists = new List<FavoriteList>(),
                    DateCreated = DateTime.Now
                };

                ShippingAddress userAddress = new ShippingAddress
                {
                    PostalCode = model.PostalCode,
                    StreetNumber = model.StreetNumber,
                    StreetName = model.StreetName,
                    CityName = model.CityName,
                    Country = model.Country,
                    AssociatedUser = newUser.Guid
                };

                newUser.ShippingAddresses  = new List<ShippingAddress>(new ShippingAddress[] { userAddress });

                // Create user in the Identity Database
                IdentityResult registerResult = await userManager.CreateAsync(newUser, model.Password);

                if (registerResult.Succeeded)
                {
                    // TODO 
                    // Log Information
                    // Send email for confirmation to the user

                    // Sign in the user
                    var signInResult = await signInManager.CheckPasswordSignInAsync(newUser, model.Password, false);
                    if (signInResult.Succeeded)
                    {
                        // TODO: Log Login , create generation of JWT
                        await userManager.AddClaimAsync(newUser, new Claim(ClaimTypes.Role, "Member"));
                        //userContext.SetUserGuidCookies(newUser.UserGuid);
                        //return Ok(new {token = userContext.GenerateToken(newUser)});

                        return Ok(new {message="okay done"});
                    }
                }
                AddErrors(registerResult);
                return Ok(new { error = "Registration Failed", error_description = "User could not be created using that user name" });
            }
            return BadRequest();
        }

        public Task<IActionResult> ChangePassword([FromBody] RegisterViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> ForgotPassword([FromBody] ViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> Login([FromBody] ViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> Logout()
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> ResetPassword([FromBody] ViewModel model)
        {
            throw new NotImplementedException();
        }


        #region Helpers

        private void AddErrors(IdentityResult result) 
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

    
        #endregion

    }
}