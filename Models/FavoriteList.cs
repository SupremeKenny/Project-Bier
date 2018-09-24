using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Project_Bier.Models 
{
    public class FavoriteList
    {
        [Key]
        public Guid Guid {get; set;}
    }
}