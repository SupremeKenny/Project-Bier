using System;
using MailChimp.Net;
using MailChimp.Net.Interfaces;
using MailChimp.Net.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Project_Bier.Services
{
    public class MailChimp : IMailService
    {
        private IConfiguration Config { get; }
        private IMailChimpManager Manager { get; set; }
        private ILogger<IMailService> Logger { get; }

        public MailChimp(IConfiguration config, ILogger<IMailService> logger)
        {
            Config = config;
            Logger = logger;
            Manager = new MailChimpManager(Config["Mailchimp:Key"]);
        }

        public async void SendWelcomeEmail(string firstName, string lastName, string email)
        {
            try
            {
                Member newSubscriber = new Member {EmailAddress = email, StatusIfNew = Status.Subscribed};
                newSubscriber.MergeFields.Add("FNAME", firstName);
                newSubscriber.MergeFields.Add("LNAME", lastName);
                await Manager.Members.AddOrUpdateAsync(Config["Mailchimp:ListId"], newSubscriber);
            }
            catch (Exception e)
            {
                Logger.LogError("Something went wrong in Mailchimp IMailservice: " + e.Message);
            }
        }

        public void SendOrderConfirmation(string email)
        {
            throw new NotImplementedException();
        }
    }
}