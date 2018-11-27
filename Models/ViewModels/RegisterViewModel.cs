using System;
using Project_Bier.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Models.ViewModels
{
    public class RegisterViewModel 
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PostalCode { get; set; }
        public string StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string CityName { get; set; }
        public string Country { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}