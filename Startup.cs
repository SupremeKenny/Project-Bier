using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project_Bier.Models;
using Project_Bier.Repository;
using Project_Bier.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using Nest;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Project_Bier
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<ApplicationDatabaseContext>();

            services.AddIdentity<WebshopUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDatabaseContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication()
                .AddCookie(config => config.SlidingExpiration = true)
                .AddJwtBearer(config =>
                {
                    config.RequireHttpsMetadata = false;
                    config.SaveToken = true;

                    config.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = Configuration["Token:Issuer"],
                        ValidAudience = Configuration["Token:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:Key"]))
                    };
                });

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.User.RequireUniqueEmail = true;
            });

            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ISearchService<Product>, ElasticSearchService>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ITokenGenerator, TokenGenerator>();
            services.AddScoped<IAddressRepository, AddressRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, IApplicationLifetime applicationLifetime)
        {
            ConfigureElasticSearch(app, loggerFactory, applicationLifetime, "beer");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        /// <summary>
        /// Creates index and documents in Elastic Search instance
        /// </summary>
        /// <param name="app"></param>
        /// <param name="loggerFactory"></param>
        /// <param name="applicationLifetime"></param>
        public void ConfigureElasticSearch(IApplicationBuilder app, ILoggerFactory loggerFactory, IApplicationLifetime applicationLifetime, string indexName)
        {
            // If command line argument "--elastic true" is present configure elastic search Engine process
            applicationLifetime.ApplicationStarted.Register(() =>
            {
                if (Configuration["elastic"] != null)
                {
                    using (var serviceScope = app.ApplicationServices.CreateScope())
                    {
                        var client = ElasticSearchPopulator.Configure(loggerFactory);
                        IEnumerable<Product> products = serviceScope.ServiceProvider.GetService<IProductRepository>().ListAll();

                        // Clean out index if it exists
                        if (client.IndexExists(indexName).Exists)
                        {
                            client.DeleteIndex(indexName);
                        }

                        // Add Suggestion strings to product models
                        foreach (Product product in products)
                        {
                            String[] suggestions = ElasticSearchPopulator.SuggestionGenerator(product);
                            product.Suggest = new CompletionField { Input = suggestions };
                        }

                        // Insert documents 
                        if (products != null)
                        {
                            ElasticSearchPopulator.InsertDocuments<Product>(loggerFactory, client, indexName, products);
                        }

                    }
                }
            });
        }
    }
}
