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
using MailChimp.Net;

using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using Project_Bier.Repository;
using Project_Bier.Services;
using MailChimp.Net.Interfaces;
using MailChimp.Net.Models;

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

		public AccountController(UserManager<WebshopUser> userManager, SignInManager<WebshopUser> signInManager,
				ITokenGenerator tokenGenerator, IConfiguration config, IAddressRepository addressRepository)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.tokenGenerator = tokenGenerator;
			this.config = config;
			this.addressRepository = addressRepository;
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
					SendWelcomeEmail(model.FirstName, model.LastName, model.Email);
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

		private async void SendWelcomeEmail(string firstName, string lastName, string email)
		{
			try
			{
				IMailChimpManager manager = new MailChimpManager("7700594c13a5e9e44132712c2c9fc287-us19");
				string listId = "99cb60f14c";
				Member member = new Member { EmailAddress = email, StatusIfNew = Status.Subscribed };
				member.MergeFields.Add("FNAME", firstName);
				member.MergeFields.Add("LNAME", lastName);
				await manager.Members.AddOrUpdateAsync(listId, member);
			}
			catch (System.Exception)
			{
				throw;
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
				PostcodeAPI.Model.Address address = result.Embedded.Addresses[0];
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