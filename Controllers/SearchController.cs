using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Repository;
using Microsoft.AspNetCore.Http;
using Project_Bier.Models;
using Project_Bier.Services;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class SearchController : Controller
    {
        ElasticSearchService ElasticSearchService { get; }

        public SearchController(ElasticSearchService elasticSearchService) => ElasticSearchService = elasticSearchService;

        [HttpGet]
        public IActionResult Search(String id)
        {
            IEnumerable<Product> results = ElasticSearchService.Search(id);
            return Json(results);
        }

        [HttpGet]
        public IActionResult Suggest(String id)
        {
            SuggestResponse results = ElasticSearchService.Suggest(id);
            return Json(results);
        }
    }
}