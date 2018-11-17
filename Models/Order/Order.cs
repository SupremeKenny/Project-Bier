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
        public Guid Guid { get; set; }
        public bool Paid { get; set; }
        public bool Shipped { get; set; }

        public DateTime OrderCreated { get; set; }
        public DateTime OrderPaid { get; set; }
        public DateTime OrderShipped { get; set; }

        public decimal TotalPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal FinalPrice { get; set; }
        public string CouponCode { get; set; }

        public ICollection<ProductOrder> OrderedProducts { get; set; }

        public Guid AssociatedUserGuid { get; set; }
        public bool OrderedFromGuestAccount { get; set; }
        public bool EmailConfirmationSent { get; set; }
    }
}