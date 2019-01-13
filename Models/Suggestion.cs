using System.Collections.Generic;

namespace Project_Bier.Models
{
    public class SuggestResponse
    {
        public IEnumerable<Suggestion> Suggestions { get; set; }
    }

    public class Suggestion
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SuggestedName { get; set; }
        public double Score { get; set; }
    }
}