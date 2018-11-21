using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Nest;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Bier.Models
{
    public class SuggestResponse
    {
        IEnumerable<Suggestion> Suggestions { get; set; }
    }

    public class Suggestion
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Score { get; set; }
    }
}