using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Project_Bier.Models
{
    /// <summary>
    /// A itemCollection is a way to encapsulate a number of data models
    /// within a collection
    /// 
    /// It is used to moderate data flow between client and server.static 
    /// These classes are fetched from t
    /// </summary>
    /// <typeparam name="T"> A model</typeparam>
    public class ItemCollection<T>
    {
        public int Index {get;set;}
        public IEnumerable<T> Items {get;set;}
        public int TotalCollections {get;set;}
    }
}