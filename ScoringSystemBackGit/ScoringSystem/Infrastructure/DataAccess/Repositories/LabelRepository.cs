using Domain.Entities;
using Domain.Repository;
using Infrastructure.Persistence;
using System.Collections.Generic;


namespace Infrastructure.DataAccess.Repositories
{
    public class LabelRepository : ILabelRepository
    {
        public readonly DataBaseContext _dbContexte;
        public LabelRepository(DataBaseContext dbContext)
        {
            _dbContexte = dbContext;
        }


        public void AddLabel(Label label)
        {

            _dbContexte.Add(label);
            _dbContexte.SaveChanges();
        }



        public void DeleteLabel(Guid id)
        {
            var label = _dbContexte.Labels.FirstOrDefault(label => label.LabelId == id);
            if (label != null)
            {
                _dbContexte.Labels.Remove(label);
                _dbContexte.SaveChanges();
            }
        }

        public List<List<Label>> GetAllLabelsByArticles()
        {
            var articles = _dbContexte.Articles.ToList();
            List < List<Label> > labels= new List<List<Label>>();
            foreach (var article in articles)
            {
                var Labels = _dbContexte.Labels.Where(label => label.articleId == article.ArticleId).ToList();
                labels.Add(Labels);

            }
            return labels;
        }

        public List<Label> GetLabelByArticle(Guid id)
        {
            var Labels = _dbContexte.Labels.Where(label => label.articleId == id).ToList();
            return Labels;
        }
        public void UpdateLabel(Label label)
        {
            _dbContexte.Update(label);
            _dbContexte.SaveChanges();
        }
    }


}
