using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    /// <summary>  
    ///  Class encapsulating a physical address
    /// </summary>  
    public class ShippingAddress
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
        public Guid AssociatedUser { get; set; }
        public string Province { get; set; }
    }
}