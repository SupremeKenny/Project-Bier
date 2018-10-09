using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    /// <summary>
    /// Parent class of product that has fields that every products shares
    /// </summary>
    public class Product
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Boolean Available { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
    }

    /// <summary>
    /// Beer product class
    /// </summary>
    public class Beer : Product
    {
        public Category Category { get; set; }
        public string Content { get; set; }
        public string AlcoholPercentage { get; set; }
        public string BrewerName { get; set; }
        public string CountryName { get; set; }
    }
}