using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

namespace Project_Bier.Pagination
{
	public class Page<T>
	{
		public int Index { get; set; }
		public T[] Items { get; set; }
		public int TotalPages { get; set; }
	}

	public static class MyExtension
	{
		public static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query, string[] relationsToInclude) where T : class
		{
			if (relationsToInclude == null)
			{
				return query;
			}

			foreach (var pathToRelation in relationsToInclude)
				query = query.Include(pathToRelation);

			return query;
		}

		public static Page<T> GetPages<T>(this Microsoft.EntityFrameworkCore.DbSet<T> list, int index_page, int page_size, Func<T, object> order_by_selector, params string[] relationsToInclude) where T : class
		{
			var result = list.IncludeMultiple(relationsToInclude).OrderBy(order_by_selector)
											.Skip(index_page * page_size)
											.Take(page_size)
											.ToArray();

			int tot_items = list.Count();
			int tot_pages = (int)(Math.Ceiling((double)tot_items / (double)page_size));

			// If there are no Items, there will still be 1 page
			if (tot_items < page_size) tot_pages = 1;

			return new Page<T>
			{
				Index = index_page,
				Items = result,
				TotalPages = tot_pages
			};
		}
	}
}