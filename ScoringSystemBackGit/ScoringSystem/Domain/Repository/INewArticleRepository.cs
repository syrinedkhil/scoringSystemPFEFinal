using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface INewArticleRepository
    {
        public List<NewArticle> GetNewTopArticles(Topic topic);
        public void AddArticle(NewArticle article);
        public void DeleteArticle(Guid id);


    }
}
