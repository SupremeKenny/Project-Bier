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
using Project_Bier.Services;


namespace Project_Bier.Controllers
{
    class RegisterResponse
    {
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
    }

    class LoginResponse
    {
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
        public string Token { get; set; }
    }

    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<WebshopUser> userManager;
        private readonly SignInManager<WebshopUser> signInManager;
        private readonly ITokenGenerator tokenGenerator;

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager, ITokenGenerator tokenGenerator)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                WebshopUser user = await userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, true);
                    if (result.Succeeded)
                    {
                        string token = await tokenGenerator.GenerateTokenLogin(user);
                        LoginResponse loginResponse = new LoginResponse
                        {
                            Success = true,
                            Errors = null,
                            Token = token
                        };
                        return Ok(new { loginResponse });
                    }
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                WebshopUser newUser = new WebshopUser
                {
                    UserGuid = Guid.NewGuid(),
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
                    AssociatedUser = newUser.UserGuid
                };

                newUser.ShippingAddresses = new List<ShippingAddress>(new ShippingAddress[] { userAddress });
                IdentityResult registerResult = await userManager.CreateAsync(newUser, model.Password);

                if (registerResult.Succeeded)
                {
                    // TODO 
                    // Log Information about Register Result
                    // Send confirmation mail

                    await userManager.AddClaimAsync(newUser, new Claim(ClaimTypes.Role, "Member"));
                    RegisterResponse succesResponse = new RegisterResponse
                    {
                        Success = true,
                        Errors = null
                    };
                    return Ok(new { succesResponse });
                }

                List<String> errors = new List<string>();
                foreach (IdentityError error in registerResult.Errors)
                {
                    errors.Add(error.Description);
                }

                RegisterResponse registerResponse = new RegisterResponse
                {
                    Success = false,
                    Errors = errors
                };

                return Ok(new { registerResponse });
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

        public Task<IActionResult> Logout()
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> ResetPassword([FromBody] ViewModel model)
        {
            throw new NotImplementedException();
        }

    }
}