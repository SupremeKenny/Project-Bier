using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    public class ProductOrder
    {
        [Key] 
        public Guid Guid { get; set; }
        public string ProductId {get; set;}
        public int Count {get; set;}
    }
}