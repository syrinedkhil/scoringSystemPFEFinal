using Domain.Entities;
using Domain.Repository;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.DataAccess.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        public readonly DataBaseContext _dbContexte;
        public ArticleRepository(DataBaseContext dbContext)
        {
            _dbContexte = dbContext;
        }

        public void AddArticle(Article article)
        {
            _dbContexte.Add(article);
            _dbContexte.SaveChanges();
        }

        public void DeleteArticle(Guid id)
        {
            var article = _dbContexte.Articles.FirstOrDefault(u => u.ArticleId == id);
            _dbContexte.Articles.Remove(article);
            _dbContexte.SaveChanges();
        }

        public List<Article> GetAllArticles()
        {
            var Articles = _dbContexte.Articles.Include(a => a.Labels).ToList();
            return Articles;
        }

        public Article? GetArticleById(Guid id)

        {
            Article a = _dbContexte.Articles.Include(a => a.Labels).FirstOrDefault(x => x.ArticleId == id);
            return a;
        }



        public void UpdateArticle(Article article)
        {
            _dbContexte.Update(article);
            _dbContexte.SaveChanges();
        }
    }
}
