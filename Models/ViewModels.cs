using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Models;

namespace Project_Bier.Models.ViewModels
{
    public class RegisterViewModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string StreetNumber { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public string CityName { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Province { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }

    public class UpdateInfoModel
    {
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string StreetNumber { get; set; }
        [Required]
        public string StreetName { get; set; }
        [Required]
        public string CityName { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Province { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }

    public class SelectedProduct
    {
        public string Id { get; set; }
        public int Count { get; set; }
    }

    public class OrderGuestUserViewModel
    {
        public List<SelectedProduct> Products { get; set; }
        public string Coupon { get; set; }
        public string PostalCode { get; set; }
        public string StreetNumber { get; set; }
        public string StreetName { get; set; }
        public string CityName { get; set; }
        public string Country { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    public class OrderUserViewModel
    {
        public List<SelectedProduct> Products { get; set; }
        public string Email { get; set; }
        public string Coupon { get; set; }
    }


    public class LoginViewModel
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class PostcodeApiRequestModel
    {
        public string Zip { get; set; }
        public string Number { get; set; }
    }

    /// <summary>
    /// Response view model for account order overview
    /// </summary>
    public class ProductOverviewModel
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public string Url { get; set; }
        public int Count { get; set; }
    }

    /// <summary>
    /// Response view model for account order overview
    /// </summary>
    public class OrderOverviewModel
    {
        public DateTime Date { get; set; }
        public string OrderNumber { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public decimal FinalPrice {get; set;}
        public List<ProductOrder> OrderedProducts { get; set; }
        public List<ProductOverviewModel> Products {get; set;}
    }
}