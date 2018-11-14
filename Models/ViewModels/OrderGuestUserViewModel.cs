using System;
using Project_Bier.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Models.ViewModels
{

    public class inputproduct
    {
        public string id {get; set;}
        public int count {get; set;}
    }
    public class testing 
    {
        public string Coupon { get; set; }
        public string PostalCode { get; set; }
        public string StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string CityName { get; set; }
        public string Country { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public inputproduct Products { get; set; }
        
    }
    public class OrderGuestUserViewModel 
    {
        public List<inputproduct> Products { get; set; }
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