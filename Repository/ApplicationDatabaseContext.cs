using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.DependencyInjection;
using Project_Bier.Models;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Repository
{
    public class ApplicationDatabaseContext : IdentityDbContext<WebshopUser>
    {
        public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options) : base(options) { }
        public DbSet<ShippingAddress> Addresses { get; set; }
        public DbSet<Beer> Beer {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Order> Order {get; set;}
        public DbSet<ProductOrder> ProductOrder { get; set; }
        public DbSet<GuestUser> GuestUsers {get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ShippingAddress>().HasKey(c => new { c.PostalCode, c.StreetNumber, c.AssociatedUser });

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }
    }
}