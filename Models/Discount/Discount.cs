using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    public class Discount
    {
        [Key] public string Code { get; set; }
        public bool Procent { get; set; }
        public decimal Amount { get; set; }
    }
}