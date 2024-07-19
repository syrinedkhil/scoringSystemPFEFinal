using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IFastApi
    {
         Task<(string[], double[])> ClassifySequenceAsync(string ArticleTexte, string[] Items);
        Task<Dictionary<string, object>> ClassifyArticle(string url, string[] inputLabels, string[] companies_names);

    }
}
