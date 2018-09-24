using Project_Bier.Models;
using Project_Bier.Models.ViewModels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Controllers
{
    /// <summary>
    /// Interface that describes functions that a user controller
    /// should have
    /// </summary>
    public interface IUserController
    {
        Task<IActionResult> Register(object data);
        Task<IActionResult> Login(object data);
        Task<IActionResult> Logout();
        Task<IActionResult> ForgotPassword(object data);
        Task<IActionResult> ResetPassword(object data);
        Task<IActionResult> ChangePassword(object data);
    }
}