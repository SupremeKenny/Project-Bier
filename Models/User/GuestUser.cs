using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Project_Bier.Models
{
    public class GuestUser
    {
        [Key] public Guid UserGuid { get; set; }
        [PersonalData] public string Email { get; set; }
        [PersonalData] public string FirstName { get; set; }
        [PersonalData] public string LastName { get; set; }
        [PersonalData] public ShippingAddress ShippingAddress { get; set; }
        [Phone] public string PhoneNumber { get; set; }
    }
}