using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Project_Bier.Controllers
{
    [Route("api/[controller]")]
    public class SampleBeerController : Controller
    {
        private static string[] BeerBrands = new[]
        {
            "Jupiler", "Hertog Jan", "Heineken", "Brand", "Amstel"
        };

        private static string[] BeerTypes = new[]
        {
            "Triple", "Weizener", "Wit", "Dubbel", "Normaal"
        };
        private static string[] BeerSize = new[]
        {
            "30cl", "33cl", "20cl", "33cl", "50cl"
        };

        [HttpGet("[action]")]
        public IEnumerable<Beer> GetBeers()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Beer
            {
                Soort = BeerTypes[rng.Next(BeerTypes.Length)],
                Brand = BeerBrands[rng.Next(BeerBrands.Length)],
                Size = BeerSize[rng.Next(BeerSize.Length)]
            });
        }

        public class Beer
        {
            public string Soort { get; set; }
            public string Brand { get; set; }
            public string Size { get; set; }

            
        }
    }
}
