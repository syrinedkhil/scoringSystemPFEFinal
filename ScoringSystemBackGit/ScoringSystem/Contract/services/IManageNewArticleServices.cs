using Contract.records.Article;
using Contract.records.NewArticle;
using FirstProject.Contracts.Records.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageNewArticleServices
    {
        public string AddArticle(AddNewArticleRequest request);

        public List<NewArticleResponse> GetTopNewArticles(GetTopNewArticlesRequest request);

        public void DeleteArticle(string id);

    }
}
