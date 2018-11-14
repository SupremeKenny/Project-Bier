using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;
using Nest;
using Elasticsearch;

namespace Project_Bier.Controllers
{

    [Route("[controller]/[action]")]
    public class SearchController : Controller
    {
        [HttpGet]
        public IActionResult SearchFuzzy(String query)
        {
            ConnectionSettings settings = new ConnectionSettings(new Uri("http://localhost:9200")).DefaultIndex("products");
            ElasticClient client = new ElasticClient(settings);

            var searchResponse = client.Search<Beer>(s => s.Query(
                q => q.MultiMatch(c => c
                    .Fields(f => f.Field(p=>p.Name).Field(p => p.CategoryId))
                    .Query(query)
                    .Analyzer("standard")
                    .Boost(1.1)
                    .Slop(2)
                    .Fuzziness(Fuzziness.Auto)
                    .PrefixLength(2)
                    .MaxExpansions(2)
                    .Operator(Operator.Or)
                    .MinimumShouldMatch(2)
                    .FuzzyRewrite(MultiTermQueryRewrite.ConstantScoreBoolean)
                    .TieBreaker(1.1)
                    .CutoffFrequency(0.001)
                    .Lenient()
                    .ZeroTermsQuery(ZeroTermsQuery.All)     
                    )
                )
            );

            IEnumerable<Product> products;
            if(searchResponse.Hits.Count > 0) 
            {
                products = searchResponse.Hits.Select(h => h.Source);
                return Json(new {product = products});
            }
            else {
                return NotFound();
            }
        }
    }
}