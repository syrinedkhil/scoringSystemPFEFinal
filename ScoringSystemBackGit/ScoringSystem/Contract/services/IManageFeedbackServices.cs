using Contract.records.Feedback;
using Contract.records.NewArticle;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageFeedbackServices
    {
        public void AddFeedback(FeedbackRequest request);

        public FeedbackResponse? GetFeedbackById(string id);

        public List<FeedbackResponse> GetAll();
        public List<NewArticleResponse> GetFeedbackByCompanyName(string name);

        public void DeleteFeedback(string id);

    }
}
