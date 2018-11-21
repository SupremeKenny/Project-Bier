using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Project_Bier.Models;

namespace Project_Bier.Services
{
    /// <summary>
    /// Interface that describes method signatures of Search Service classes
    /// 
    /// Depency injection is used for the repository pattern. Where we need the product repository
    /// we have a inject an instance of the concrete class: ProductRepository
    /// </summary>
    public interface ISearchService<T> 
    {
        IEnumerable<T> Search(String query);
        SuggestResponse Suggest(String query);
    }
}