using System;
using Project_Bier.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Models.ViewModels
{
    public class OrderGuestUserViewModel 
    {
        public List<ProductOrder> Products { get; set; }
        public string Coupon { get; set; }
        public string PostalCode { get; set; }
        public string StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string CityName { get; set; }
        public string Country { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        //public DateTime Birtday { get; set; }
    }
}