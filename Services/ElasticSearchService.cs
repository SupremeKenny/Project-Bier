using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;
using Nest;

namespace Project_Bier.Services 
{
    public class ElasticSearchService : ISearchService<Product>
    {
        private readonly ElasticClient client;

        public ElasticSearchService()
        {
            ConnectionSettings settings = new ConnectionSettings(new Uri("http://localhost:9200")).DefaultIndex("products");
            this.client = new ElasticClient(settings);
        }

        /// <summary>
        /// Return results based on fuzzy search
        /// </summary>
        /// <param name="query">User entered search query</param>
        /// <returns></returns>
        public IEnumerable<Product> Search(string query)
        {
            ISearchResponse<Product> searchResponse = client.Search<Product>(s => s.Query(
                q => q.Fuzzy(c => c
                        .Name("named_query")
                        .Boost(1.1)
                        .Field(p => p.Name)
                        .Fuzziness(Fuzziness.Auto)
                        .Value(query)
                        .MaxExpansions(100)
                        .PrefixLength(3)
                        .Rewrite(MultiTermQueryRewrite.ConstantScore)
                        .Transpositions()
                    )
                )
            );

            IEnumerable<Product> products = searchResponse.Hits.Select(h => h.Source);
            return products;
        }
        
        public SuggestResponse Suggest(string query)
        {
            throw new System.NotImplementedException();
        }
    }
}