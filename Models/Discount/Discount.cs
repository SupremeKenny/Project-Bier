using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Bier.Models
{


    public class Discount
    {
        [Key]
        public string Code { get; set; }
        public bool Procent { get; set; }
        public decimal Amount { get; set; }
    }
}