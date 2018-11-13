using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Bier.Models
{

    
    public class Order
    {
        [Key]
        public string Guid { get; set; }
        public bool Paid { get; set; }
        public bool Shipped { get; set; }
        public DateTime OrderCreated { get; set; }
        public DateTime OrderPaid { get; set; }
        public DateTime OrderShipped { get; set; }
        public decimal TotalPrice { get; set; }
        public bool CouponApplied { get; set; }
        public List<ProductOrder> OrderedProducts { get; set; }
        public string AssociatedUserGuid { get; set; }
        public bool OrderedFromGuestAccount {get; set;}
        public bool EmailConfirmationSent { get; set; }
    }
}