using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    public class Order
    {
        [Key]
        public Guid Guid { get; set; }
        public bool Paid { get; set; }
        public bool Shipped { get; set; }
        public DateTime OrderCreated { get; set; }
        public DateTime OrderPaid { get; set; }
        public DateTime OrderShipped { get; set; }
        public decimal TotalPrice { get; set; }
        public bool CouponApplied { get; set; }
        public ProductOrder[] OrderedProducts { get; set; }
        public String AssociatedUserGuid { get; set; }
        public bool OrderedFromGuestAccount {get; set;}
        public bool EmailConfirmationSent { get; set; }
    }
}