using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Project_Bier.Models
{
    public class Category
    {
            [Key]
            public Guid CategoryGuid { get; set; } 
            public string Name {get; set;}
            public string Description {get; set;}
    }
}