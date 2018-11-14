using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Nest;
using Elasticsearch;
using Project_Bier.Models;
using System.Threading;
using System.Text;
using System.Linq;

namespace Project_Bier.Repository
{
    /// <summary>
    /// Configurition and Population logic of Elastic Search
    /// </summary>
    class ElasticSearchPopulator
    {
        IProductRepository productRepository;

        public ElasticSearchPopulator(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        /// <summary>
        /// Configures the Elastic Search Client
        /// </summary>
        /// <param name="loggerFactory"></param>
        public static ElasticClient Configure(ILoggerFactory loggerFactory)
        {
            var logger = loggerFactory.CreateLogger<ElasticSearchPopulator>();
            logger.LogInformation("Configuring ElasticSearch");

            ConnectionSettings settings = new ConnectionSettings(new Uri("http://localhost:9200"))
            .DefaultIndex("products");

            ElasticClient client;
            try
            {
                client = new ElasticClient(settings); 
            }
            catch (System.Exception e)
            {
                logger.LogError("Error occured while creating Client: {0}", e);
                return null;
            }

            // Create index and mapping
            var createIndexResponse = client.CreateIndex("products", c => c
            .Mappings(ms => ms
                .Map<Product>(m => m
                    .AutoMap<Beer>()
                    .Properties(ps => ps
                    .Completion(d => d.Name(p => p.Suggest)))))
                );

            return client;
        }

        /// <summary>
        /// Generates a sequence of suggsestion strings based on the product name
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public static String[] SuggestionGenerator(Product product)
        {
            String name = product.Name;
            String[] elements = name.Split(null);
            List<String> suggestions = new List<String>();
            
            for(int i = 0 ; i < elements.Length; i++)
            {
                StringBuilder stringBuilder = new StringBuilder();
                String[] array = elements.Skip(i).ToArray();
                for(int j = 0; j < array.Length; j++ )
                {
                    stringBuilder.Append(array[j]);
                    stringBuilder.Append(" ");
                }

                suggestions.Add(stringBuilder.ToString());
            }

            return suggestions.ToArray();
        }

        /// <summary>
        /// Indexes all products into ElasticSearch client index
        /// </summary>
        /// <param name="client"></param>
        public static void InsertDocuments<T>(ILoggerFactory loggerFactory, ElasticClient client, string indexName, IEnumerable<T> documents) where T : class
        {
            var logger = loggerFactory.CreateLogger<ElasticSearchPopulator>();
            logger.LogInformation("Pushing items to Search Engine");
            var bulkResponse = client.IndexMany<T>(documents);
            logger.LogInformation("Got response: {0}, {1}, {2}", bulkResponse.ApiCall, bulkResponse.DebugInformation, bulkResponse.Items);
        }
    }
}