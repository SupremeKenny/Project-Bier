using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Project_Bier.Models;
using Project_Bier.Services;

namespace Project_Bier.Controllers
{
    [Route("[controller]/[action]")]
    public class SearchController : Controller
    {
        ISearchService<Product> SearchService { get; }

        public SearchController(ISearchService<Product> searchService) => SearchService = searchService;

        [HttpGet]
        public IActionResult Search(String id)
        {
            IEnumerable<Product> results = SearchService.Search(id);
            return Json(new {product = results});
        }

        [HttpGet]
        public IActionResult Suggest(String id)
        {
            SuggestResponse results = SearchService.Suggest(id);
            return Json(results);
        }
    }
}