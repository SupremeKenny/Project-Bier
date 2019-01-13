using System;
using System.ComponentModel.DataAnnotations;
using Nest;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Bier.Models
{
    /// <summary>
    /// Base class for product with properties every product has to have
    /// </summary>
    public class Product
    {
        [Key] public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public Boolean Available { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        [NotMapped] [Completion()] public CompletionField Suggest { get; set; }
    }
}