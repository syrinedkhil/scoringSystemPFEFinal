using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IArticleRepository
    {
        Article? GetArticleById(Guid id);

        void AddArticle(Article article);
        void DeleteArticle(Guid id);
        void UpdateArticle(Article article);

        List<Article> GetAllArticles();


    }
}
