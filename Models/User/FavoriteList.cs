using System;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    public class FavoriteList
    {
        [Key] public Guid Guid { get; set; }
    }
}