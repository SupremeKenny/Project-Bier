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

            services.AddAuthentication();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.User.RequireUniqueEmail = true;
            });

            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, IApplicationLifetime applicationLifetime)
        {
            ConfigureElasticSearch(app, loggerFactory, applicationLifetime);

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
        public void ConfigureElasticSearch(IApplicationBuilder app, ILoggerFactory loggerFactory, IApplicationLifetime applicationLifetime)
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
                        foreach (Product product in products)
                        {
                            String[] suggestions = ElasticSearchPopulator.SuggestionGenerator(product);
                            product.Suggest = new Nest.CompletionField { Input = suggestions };
                        }
                        if (products != null) ElasticSearchPopulator.InsertDocuments<Product>(loggerFactory, client, "products", products);
                    }
                }
            });
        }
    }
}
