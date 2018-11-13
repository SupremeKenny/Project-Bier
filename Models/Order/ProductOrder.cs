using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    public class ProductOrder
    {
        [Key]
        public string Guid { get; set; }
        public int ProductId {get; set;}
        public int Count {get; set;}

    }
}