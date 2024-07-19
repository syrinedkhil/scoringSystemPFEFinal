using Domain.Entities;
using Domain.Repository;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DataAccess.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DataBaseContext _dbContext;
        public FeedbackRepository(DataBaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddFeedback(Feedback feedback)
        {
            _dbContext.Feedback.Add(feedback);
            _dbContext.SaveChanges();
        }
        public Feedback? GetFeedbackById(Guid id)
        {
            return _dbContext.Feedback.SingleOrDefault(f => f.Id == id);
        }
        public List<Feedback> GetAll()
        {
            var feedbacksWithCompanies = _dbContext.Feedback
               .Include(f => f.relatedCompanies)
               .ToList();
            return feedbacksWithCompanies;
        }
        public void DeleteFeedback(Guid id)
        {
            var feedback = _dbContext.Feedback.FirstOrDefault(f => f.Id == id);
            if (feedback != null)
            {
                _dbContext.Feedback.Remove(feedback);
                _dbContext.SaveChanges();
            }
        }

        public List<NewArticle> GetFeedbackByCompany(string name)
        {
            List<Feedback> allFeedback = _dbContext.Feedback
                .Include(f => f.relatedCompanies)
                .Where(f => f.relatedCompanies.Any(c => c.Name == name))
                .ToList();

            List<NewArticle> RelatedArticles = new List<NewArticle>();
            foreach (var feedback in allFeedback)
            {
                var id = feedback.ArticleId;
                NewArticle article = _dbContext.NewArticle.FirstOrDefault(f => f.Id == id);

                RelatedArticles.Add(article);
            }
            return RelatedArticles;


        }
    }
}
