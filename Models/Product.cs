using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Project_Bier.Models
{
    /// <summary>
    /// Data model that represent a product
    /// </summary>
    public class Product
    {
            [Key]
            public string Id { get; set; } 
            public string Name {get; set;}
            public decimal Price {get; set;}
            public Boolean Available {get; set;}
            public string Description {get; set;} 
            public string Url {get; set;}
            public string Brand { get; set;}
            public Category category { get; set; }
    }
}