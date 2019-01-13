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
using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Repository;
using Project_Bier.Services;
using PostcodeAPI.Wrappers;
using Project_Bier.Pagination;


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
        private IUserRepository UserRepository { get; }
        private IMailService MailService { get; }

        public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager,
            ITokenGenerator tokenGenerator, IConfiguration config, IAddressRepository addressRepository,
            IUserRepository userRepository, IMailService mailService)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            TokenGenerator = tokenGenerator;
            Config = config;
            AddressRepository = addressRepository;
            UserRepository = userRepository;
            MailService = mailService;
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
                Microsoft.AspNetCore.Identity.SignInResult result =
                    await SignInManager.CheckPasswordSignInAsync(user, model.Password, true);
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
                MailService.SendWelcomeEmail(model.FirstName, model.LastName, model.Email);
                return Ok(new {registerResponse});
            }

            List<string> errors = registerResult.Errors.Select(error => error.Description).ToList();

            registerResponse.Success = false;
            registerResponse.Errors = errors;
            return Ok(new {registerResponse});
        }

        public Task<IActionResult> ChangePassword([FromBody] RegisterViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IActionResult> ForgotPassword()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAccountInformation()
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value;
            WebshopUser user = await UserManager.FindByIdAsync(userId);
            if (user == null) return BadRequest();
            ShippingAddress address = AddressRepository.GetByGuid(user.UserGuid);
            return Ok(new
            {
                address, email = user.Email, name = user.FirstName, lastName = user.LastName,
                phone = user.PhoneNumber
            });
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateAccountInformation([FromBody] UpdateInfoModel model)
        {
            if (!ModelState.IsValid) return BadRequest();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value;
            WebshopUser user = await UserManager.FindByIdAsync(userId);

            ShippingAddress currentAddress = AddressRepository.GetByGuid(user.UserGuid);
            if (model.PostalCode != currentAddress.PostalCode)
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
            if (result.Succeeded) return Ok();

            return BadRequest();
        }

        [HttpPost]
        public IActionResult FetchAddress([FromBody] PostcodeApiRequestModel model)
        {
            PostcodeApiClient client = new PostcodeApiClient(Config["PostcodeAPI:Key"]);
            try
            {
                ApiHalResultWrapper result = client.GetAddress(model.Zip, int.Parse(model.Number));
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
        public IActionResult GetPostcodeApiLimit()
        {
            PostcodeApiClient client = new PostcodeApiClient(Config["PostcodeAPI:Key"]);
            int? remaining = client.RequestsRemaining;
            return Ok(new {remaining});
        }

        [HttpGet("{page_index}/{page_size}")]
        public IActionResult FetchAllUsers(int page_index, int page_size)
        {
            Page<WebshopUser> userPage = UserRepository.GetUsers(page_index, page_size);

            IEnumerable<object> userFieldSubset = userPage.Items.Select(user => new
            {
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName,
                Phone = user.PhoneNumber,
                Address = user.ShippingAddresses
            });

            IEnumerable<object> fieldSubset = userFieldSubset.ToList();
            if (!fieldSubset.Any()) return NotFound();

            return new OkObjectResult(new
                {userPage.TotalPages, Items = fieldSubset, Count = fieldSubset.Count()});
        }

        [HttpPut("{id}")]
        public async void Update([FromBody] UpdateInfoModel updatedInfoModel, string id)
        {
            WebshopUser userToUpdate = UserRepository.FindById(id);
            if (userToUpdate.Email != updatedInfoModel.Email)
            {
                string token = await UserManager.GenerateChangeEmailTokenAsync(userToUpdate, updatedInfoModel.Email);
                await UserManager.ChangeEmailAsync(userToUpdate, updatedInfoModel.Email, token);
            }

            ShippingAddress address = AddressRepository
                .GetByGuid(userToUpdate.UserGuid);
            bool addressChanged = UserRepository.UpdateUser(updatedInfoModel, userToUpdate, address);
            if (addressChanged) AddressRepository.DeleteAddress(userToUpdate.UserGuid);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            WebshopUser userToDelete = UserRepository.FindById(id);
            AddressRepository.DeleteAddress(userToDelete.UserGuid);
            UserRepository.DeleteUser(userToDelete);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserInformation(string id)
        {
            WebshopUser user = UserRepository.FindById(id);
            ShippingAddress address = AddressRepository.GetByGuid(user.UserGuid);
            user.ShippingAddresses = new List<ShippingAddress>(new[] {address});
            return Json(new {user});
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AdminCheck()
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value;
            WebshopUser user = await UserManager.FindByIdAsync(userId);
            return Ok(new{user.isAdmin});
        }
    }
}