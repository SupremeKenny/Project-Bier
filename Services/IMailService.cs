using System;

namespace Project_Bier.Services
{
    public interface IMailService
    {
        /// <summary>
        /// Sends a email to the user after 
        /// </summary>
        /// <param name="firstName"></param>
        /// <param name="lastName"></param>
        /// <param name="email"></param>
        void SendWelcomeEmail(string firstName, string lastName, string email);
        
        /// <summary>
        /// Sends a generic email that confirms the order.
        /// </summary>
        /// <param name="email"></param>
        void SendOrderConfirmation(string email);
    }
}