using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using PostcodeAPI;
using MailChimp.Net;
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Repository;
using Project_Bier.Services;
using MailChimp.Net.Interfaces;
using MailChimp.Net.Models;
using Project_Bier.Pagination;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private UserManager<WebshopUser> UserManager { get; }
        private SignInManager<WebshopUser> SignInManager { get; }
        private ITokenGenerator TokenGenerator { get; }
        private IConfiguration Config { get; }
        private IAddressRepository AddressRepository { get; }
        private ApplicationDatabaseContext ApplicationDatabase { get; }

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager,
            ITokenGenerator tokenGenerator, IConfiguration config, IAddressRepository addressRepository,
            ApplicationDatabaseContext applicationDatabase)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            TokenGenerator = tokenGenerator;
            Config = config;
            AddressRepository = addressRepository;
            ApplicationDatabase = applicationDatabase;
        }

        // We should not be querying the database directly in the controller
        // the repository classes are supposed to do that
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            // Keep it like this, otherwise you'll get parameters that you wont use as WebshopUser
            var users = from u in ApplicationDatabase.Users
                select new
                {
                    u.UserGuid,
                    u.Email,
                    u.FirstName,
                    u.LastName,
                    u.PhoneNumber,
                    u.ShippingAddresses,
                };
            return Json(users);
        }

        [HttpGet("{page_index}/{page_size}")]
        public IActionResult FetchAllUsers(int page_index, int page_size)
        {
            Page<WebshopUser> projects = ApplicationDatabase.Users
                .GetPages(page_index, page_size, u => u.Email);

            IEnumerable<object> resultToReturn = projects.Items.Select(user => new
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.PhoneNumber,
                Address = user.ShippingAddresses
            });

            if (!resultToReturn.Any())
            {
                return NotFound();
            }

            return new OkObjectResult(new
                {TotalPages = projects.TotalPages, Items = resultToReturn, Count = resultToReturn.Count()});
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
            LoginResponse loginResponse = new LoginResponse();
            WebshopUser user = await UserManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                SignInResult result = await SignInManager.CheckPasswordSignInAsync(user, model.Password, true);
                if (result.Succeeded)
                {
                    string token = await TokenGenerator.GenerateTokenLogin(user);
                    loginResponse.Success = true;
                    loginResponse.Token = token;

                    return Ok(new {loginResponse});
                }

                loginResponse.Success = false;
                return Ok(new {loginResponse});
            }

            loginResponse.Success = false;
            loginResponse.Error = "User could not be found. Or Password does not match login.";
            return Ok(new {loginResponse});
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
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
            newUser.ShippingAddresses = new List<ShippingAddress>(new[] {userAddress});

            IdentityResult registerResult = await UserManager.CreateAsync(newUser, model.Password);
            RegisterResponse registerResponse = new RegisterResponse();

            if (registerResult.Succeeded)
            {
                registerResponse.Success = true;
                SendWelcomeEmail(model.FirstName, model.LastName, model.Email);
                return Ok(new {registerResponse});
            }

            List<string> errors = registerResult.Errors.Select(error => error.Description).ToList();

            registerResponse.Success = false;
            registerResponse.Errors = errors;
            return Ok(new {registerResponse});
        }

        // TODO: Move listId and API key to configuration file.
        private async void SendWelcomeEmail(string firstName, string lastName, string email)
        {
            try
            {
                IMailChimpManager manager = new MailChimpManager("7700594c13a5e9e44132712c2c9fc287-us19");
                string listId = "99cb60f14c";
                Member member = new Member {EmailAddress = email, StatusIfNew = Status.Subscribed};
                member.MergeFields.Add("FNAME", firstName);
                member.MergeFields.Add("LNAME", lastName);
                await manager.Members.AddOrUpdateAsync(listId, member);
            }
            catch (Exception e)
            {
                throw e;
            }
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
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value;
            WebshopUser user = await UserManager.FindByIdAsync(userId);
            if (user != null)
            {
                ShippingAddress address = AddressRepository.GetByGuid(user.UserGuid);
                return Ok(new
                {
                    address, email = user.Email, name = user.FirstName, lastName = user.LastName,
                    phone = user.PhoneNumber
                });
            }

            return BadRequest();
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateAccountInformation([FromBody] UpdateInfoModel model)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value;
                WebshopUser user = await UserManager.FindByIdAsync(userId);

                if (model.PostalCode != user.ShippingAddresses.FirstOrDefault()?.PostalCode)
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
                    AddressRepository.DeleteAddress(user.UserGuid);
                    user.ShippingAddresses = new List<ShippingAddress>(new[] {userAddress});
                }

                user.PhoneNumber = model.PhoneNumber;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;

                IdentityResult result = await UserManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
                }

                return BadRequest();
            }

            return BadRequest();
        }

        [HttpPost]
        public IActionResult FetchAddress([FromBody] PostcodeApiRequestModel model)
        {
            PostcodeApiClient client = new PostcodeApiClient(Config["PostcodeAPI:Key"]);
            try
            {
                var result = client.GetAddress(model.Zip, Int32.Parse(model.Number));
                PostcodeAPI.Model.Address address = result.Embedded.Addresses[0];
                AddressResponse response = new AddressResponse
                {
                    City = address.City.ToString(),
                    Street = address.Street,
                    Province = address.Province.ToString()
                };
                return Ok(new {response});
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetLimit()
        {
            PostcodeApiClient client = new PostcodeApiClient(Config["PostcodeAPI:Key"]);
            var remaining = client.RequestsRemaining;
            return Ok(new {remaining});
        }
    }
}