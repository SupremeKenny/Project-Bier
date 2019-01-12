using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Project_Bier.Models
{
    public class WebshopUser : IdentityUser
    {
        public Guid UserGuid { get; set; }
        [PersonalData] public string FirstName { get; set; }
        [PersonalData] public string LastName { get; set; }
        [PersonalData] public List<ShippingAddress> ShippingAddresses { get; set; }
        public List<FavoriteList> FavoriteLists { get; set; }
        public DateTime DateCreated { get; set; }
        public bool isAdmin { get; set; }
    }
}