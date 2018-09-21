using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models 
{
    /// <summary>  
    ///  Base class for users
    /// </summary>  
    public class User 
    {
        [Key]
        public Guid Id = Guid.NewGuid(); 

        [Required]
        [EmailAddress]
        public String EmailAddress {get;set;}

        [Required]
        public String PasswordHash {get;set;}
    }
}