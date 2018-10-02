using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Project_Bier.Models
{
    /// <summary>
    /// Base class for Product
    /// </summary>
    public class Product
    {
            [Key]
            public Guid ProductGuid { get; set; } 
            public string Name {get; set;}
            public decimal Price {get; set;}
            public Boolean Available {get; set;}
            public string Description {get; set;} 
            public string Brand { get; set;}
            public Category category { get; set; }
    }
}