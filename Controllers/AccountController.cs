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
using Project_Bier.Pagination;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<WebshopUser> userManager;
        private readonly SignInManager<WebshopUser> signInManager;
        private readonly ITokenGenerator tokenGenerator;
        private readonly IConfiguration config;
        private readonly IAddressRepository addressRepository;
        private ApplicationDatabaseContext applicationDatabase;

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager,
            ITokenGenerator tokenGenerator, IConfiguration config, IAddressRepository addressRepository, ApplicationDatabaseContext applicationDatabase)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenGenerator = tokenGenerator;
            this.config = config;
            this.addressRepository = addressRepository;
            this.applicationDatabase = applicationDatabase;
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

                newUser.PhoneNumber = model.PhoneNumber;
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

        public Task<IActionResult> ForgotPassword()
        {
            // TODO send mail with password reset link
            throw new NotImplementedException();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAccountInformation()
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
            WebshopUser user = await userManager.FindByIdAsync(userId);
            if (user != null)
            {
                ShippingAddress address = addressRepository.GetByGuid(user.UserGuid);
                return Ok(new { address = address, email = user.Email, name = user.FirstName, lastName = user.LastName, phone = user.PhoneNumber });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateAccountInformation([FromBody] UpdateInfoModel model)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid).Value;
                WebshopUser user = await userManager.FindByIdAsync(userId);

                ShippingAddress address = addressRepository.GetByGuid(user.UserGuid);

                // Only if the address changed make database transactions
                if (model.PostalCode != user.ShippingAddresses.FirstOrDefault().PostalCode)
                {
                    ShippingAddress userAddress = new ShippingAddress
                    {
                        PostalCode = model.PostalCode,
                        StreetNumber = model.StreetNumber,
                        StreetName = model.StreetName,
                        CityName = model.CityName,
                        Country = model.Country,
                        Province = model.Province,
                        AssociatedUser = user.UserGuid
                    };
                    addressRepository.DeleteAddress(user.UserGuid);
                    user.ShippingAddresses = new List<ShippingAddress>(new ShippingAddress[] { userAddress });
                }

                user.PhoneNumber = model.PhoneNumber;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;

                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else return BadRequest();
            }
            else
            {
                return BadRequest();
            }
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

        /// <summary>
        /// The methods are used in the AdminPanel for users
        /// Read:       To get all users
        /// Update:     To update account information
        /// Delete:     To delete an user
        /// FetchId:    To get userinformation by Id
        /// </summary>

        [HttpGet("{page_index}/{page_size}")]
        public IActionResult Read(int page_index, int page_size)
        {
            Page<WebshopUser> projects = applicationDatabase.Users
            .GetPages(page_index,page_size, u => u.Email, "ShippingAddresses");

            IEnumerable<object> resultToReturn = projects.Items.Select(user => new
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.PhoneNumber,
                Address = user.ShippingAddresses
                
            });

            if (resultToReturn == null)
            {
                return NotFound();
            }

            return new OkObjectResult(new { TotalPages = projects.TotalPages, Items = resultToReturn, Count = resultToReturn.Count() });
        }

        [HttpPut("{id}/{email}")]
        public void Update([FromBody] UpdateInfoModel oldUser, string email, string id)
        {
            WebshopUser updateUser = applicationDatabase.Users
            .FirstOrDefault(user => user.Id == id);

            ShippingAddress address = addressRepository
            .GetByGuid(updateUser.UserGuid);

            if (updateUser != null)
            {
                updateUser.Email = email;
                updateUser.FirstName = oldUser.FirstName;
                updateUser.LastName = oldUser.LastName;
                updateUser.PhoneNumber = oldUser.PhoneNumber;
            }

            if (oldUser.PostalCode != address.PostalCode ||
                oldUser.StreetNumber != address.StreetNumber ||
                oldUser.StreetName != address.StreetName ||
                oldUser.CityName != address.CityName )
                {
                    ShippingAddress userAddress = new ShippingAddress
                    {
                        PostalCode = oldUser.PostalCode,
                        StreetNumber = oldUser.StreetNumber,
                        StreetName = oldUser.StreetName,
                        CityName = oldUser.CityName,
                        Country = oldUser.Country,
                        Province = oldUser.Province,
                        AssociatedUser = updateUser.UserGuid
                    };
                    addressRepository.DeleteAddress(updateUser.UserGuid);
                    updateUser.ShippingAddresses = new List<ShippingAddress>(new ShippingAddress[] { userAddress });
                }

            applicationDatabase.SaveChanges();
        }

        [HttpDelete("{id}")]
        public void Delete(String id)
        {
            WebshopUser deleteUser = applicationDatabase.Users.Find(id);

            addressRepository.DeleteAddress(deleteUser.UserGuid);
            applicationDatabase.Users.Remove(deleteUser);
            applicationDatabase.SaveChanges();
        }

        [HttpGet("{id}")]
        public IActionResult FetchId(String id)
        {
            WebshopUser user = applicationDatabase.Users
            .FirstOrDefault(u => u.Id == id);

            ShippingAddress address = addressRepository
            .GetByGuid(user.UserGuid);
            
            user.ShippingAddresses = new List<ShippingAddress>(new ShippingAddress[] { address });

            return Json(new {user = user});
        }
    }
}