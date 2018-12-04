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
using PostcodeAPI;
using PostcodeAPI.Model;

using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Repository;
using Project_Bier.Services;


namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<WebshopUser> userManager;
        private readonly SignInManager<WebshopUser> signInManager;
        private readonly ITokenGenerator tokenGenerator;
        private readonly IConfiguration config;

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager,
            ITokenGenerator tokenGenerator, IConfiguration config)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenGenerator = tokenGenerator;
            this.config = config;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                LoginResponse loginResponse = new LoginResponse();
                WebshopUser user = await userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {

                    var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, true);
                    if (result.Succeeded)
                    {
                        string token = await tokenGenerator.GenerateTokenLogin(user);
                        loginResponse.Success = true;
                        loginResponse.Token = token;

                        return Ok(new { loginResponse });
                    }
                    else
                    {
                        loginResponse.Success = false;
                        return Ok(new { loginResponse });
                    }
                }
                else
                {
                    loginResponse.Success = false;
                    loginResponse.Error = "User could not be found. Or Password does not match login.";
                    return Ok(new { loginResponse });
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
                    Province = model.Province,
                    AssociatedUser = newUser.UserGuid
                };

                newUser.ShippingAddresses = new List<ShippingAddress>(new ShippingAddress[] { userAddress });
                IdentityResult registerResult = await userManager.CreateAsync(newUser, model.Password);
                RegisterResponse registerResponse = new RegisterResponse();
                if (registerResult.Succeeded)
                {
                    // TODO: Log Information about Register Result and Send Welcome mail
                    registerResponse.Success = true;
                    return Ok(new { registerResponse });
                }

                List<String> errors = new List<string>();
                foreach (IdentityError error in registerResult.Errors)
                {
                    errors.Add(error.Description);
                }

                registerResponse.Success = false;
                registerResponse.Errors = errors;
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

        [HttpPost]
        public IActionResult FetchAddress([FromBody] PostcodeApiRequestModel model)
        {
            PostcodeApiClient client = new PostcodeApiClient(config["PostcodeAPI:Key"]);
            try
            {
                var result = client.GetAddress(model.Zip, Int32.Parse(model.Number));
                Address address = result.Embedded.Addresses[0];
                AddressResponse response = new AddressResponse
                {
                    City = address.City.ToString(),
                    Street = address.Street.ToString(),
                    Province = address.Province.ToString()
                };
                return Ok(new { response });
            }
            catch (System.ArgumentException)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetLimit()
        {
            PostcodeApiClient client = new PostcodeApiClient(config["PostcodeAPI:Key"]);
            var remaining = client.RequestsRemaining;
            return Ok(new { remaining });
        }
    }
}