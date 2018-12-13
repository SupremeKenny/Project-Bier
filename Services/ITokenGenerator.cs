using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;

namespace Project_Bier.Services
{
    /// <summary>
    /// Interface that describes method signatures of Token generation service class
    /// 
    /// Depency injection is used for the repository pattern. Where we need the product repository
    /// we have a inject an instance of the concrete class: ProductRepository
    /// </summary>
    public interface ITokenGenerator
    {
        Task<string> GenerateTokenLogin(WebshopUser user);
        Task<string> GenerateTokenReset(WebshopUser user);
        Task<string> GenerateTokenConfirm(WebshopUser user);
    }
}