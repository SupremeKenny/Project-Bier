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
        public DbSet<Beer> Beers {get; set;}
        public DbSet<Category> Categories {get; set;}
        public DbSet<Order> Order {get; set;}
        public DbSet<ProductOrder> ProductOrder { get; set; }
        public DbSet<GuestUser> GuestUsers {get; set;}
        public DbSet<Discount> Discount { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ShippingAddress>().HasKey(c => new { c.PostalCode, c.StreetNumber, c.AssociatedUser });
            modelBuilder.Entity<Order>().HasMany(i => i.OrderedProducts).WithOne();
        }   

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // TODO, move this to a configuration file of some sort
            optionsBuilder.UseNpgsql("User ID=postgres;Password=ZMWX4BLb5jEk2u6n;Host=188.166.77.23;Port=5432;Database=postgres;Pooling=true;");
        }
        
    }
}