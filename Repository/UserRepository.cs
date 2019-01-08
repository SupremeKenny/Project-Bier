using System;
using System.Collections.Generic;
using System.Linq;
using Project_Bier.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Project_Bier.Repository 
{
    public class UserRepository : IUserRepository
    {
        private ApplicationDatabaseContext context;

        public UserRepository(ApplicationDatabaseContext applicationDatabaseContext)
        {
            this.context = applicationDatabaseContext;
        }

        public IEnumerable<WebshopUser> ListAllUsers()
        {
            return context.Users
            .Select(p => p);
        }
    }
}