using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Nest;
using System.ComponentModel.DataAnnotations.Schema;

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
        
        [NotMapped]
        public CompletionField Suggest { get; set; }
    }
}