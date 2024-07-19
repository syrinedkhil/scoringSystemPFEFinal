using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IFeedbackRepository
    {
        public void AddFeedback(Feedback feedback);
        public Feedback? GetFeedbackById(Guid id);
        public List<Feedback> GetAll();
        public List<NewArticle> GetFeedbackByCompany(string name);

        public void DeleteFeedback(Guid id);
    }
}
