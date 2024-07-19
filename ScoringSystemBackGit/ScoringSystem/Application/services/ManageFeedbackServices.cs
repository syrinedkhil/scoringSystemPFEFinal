using Contract.records.Feedback;
using Contract.records.NewArticle;
using Contract.services;
using Domain.Entities;
using Domain.Repository;


namespace Application.services
{
    public class ManageFeedbackServices : IManageFeedbackServices
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly ITopicRepository _topicRepository;
        private readonly ICompanyRepository _companyRepository;
        public ManageFeedbackServices(IFeedbackRepository feedbackRepository, ITopicRepository topicRepository,
            ICompanyRepository companyRepository)
        {
            _feedbackRepository = feedbackRepository;
            _topicRepository = topicRepository;
            _companyRepository = companyRepository;
        }
        public void AddFeedback(FeedbackRequest request)
        {
            var topic = _topicRepository.GetTopicById(new Guid(request.topicId));
            var RelatedCompanies = new List<Company>();
            var company = new Company();
            foreach (var companyId in request.relatedCompanies)
            {
                var id = new Guid(companyId);
                company = _companyRepository.GetCompanyById(id);
                RelatedCompanies.Add(company);
            }
            var articleId = new Guid(request.articleId);
            DateTime currentDate = DateTime.Now;
            var feedback = new Feedback
            {
                Id = Guid.NewGuid(),
                topicId = topic.IdTopic,
                topic = topic,
                ArticleId = articleId,
                articleUrl = request.articleUrl,
                highScore = request.highScore,
                midScore = request.midScore,
                lowScore = request.lowScore,
                finalScore = request.finalScore,
                rated = request.rated,
                relatedCompanies = RelatedCompanies,
                articleSentiment = request.articleSentiment,
                CreatedOn = currentDate,
                Reviewer = request.reviewer,
            };
            _feedbackRepository.AddFeedback(feedback);
        }
        public FeedbackResponse? GetFeedbackById(string id)
        {
            var feedback = _feedbackRepository.GetFeedbackById(new Guid(id));
            var RelatedCompanies = new string[] { };
            var RelatedCompaniesNamesList = new List<string>();
            foreach (var company in feedback.relatedCompanies){ RelatedCompaniesNamesList.Add(company.Name);}
            RelatedCompanies = RelatedCompaniesNamesList.ToArray();
            string formattedDateTime = feedback.CreatedOn.ToString("dd-MM HH:mm");
            return new FeedbackResponse(
                    feedback.Id,
                    feedback.topicId,
                    feedback.ArticleId,
                    feedback.articleUrl,
                    feedback.highScore,
                    feedback.midScore,
                    feedback.lowScore,
                    feedback.finalScore,
                    feedback.rated,
                    RelatedCompanies,
                    feedback.articleSentiment,
                    formattedDateTime,
                    feedback.Reviewer
                );
        }
        public List<FeedbackResponse> GetAll()
        {
            var feedbacks = _feedbackRepository.GetAll();
            string[] RelatedCompanies;
            List<string> RelatedCompaniesNamesList;
            List<FeedbackResponse> AllFeedbacks = new();
            foreach (var feedback in feedbacks)
            {
                RelatedCompaniesNamesList = new List<string>();
                RelatedCompanies = new string[] { };
                foreach (var company in feedback.relatedCompanies) {RelatedCompaniesNamesList.Add(company.Name); }
                RelatedCompanies = RelatedCompaniesNamesList.ToArray();
                string formattedDateTime = feedback.CreatedOn.ToString("dd-MM HH:mm");
                var singleFeedback = new FeedbackResponse(
                    feedback.Id,
                    feedback.topicId,
                    feedback.ArticleId,
                    feedback.articleUrl,
                    feedback.highScore,
                    feedback.midScore,
                    feedback.lowScore,
                    feedback.finalScore,
                    feedback.rated,
                    RelatedCompanies,
                    feedback.articleSentiment,
                    formattedDateTime,
                    feedback.Reviewer
                );
                AllFeedbacks.Add(singleFeedback);
            }
            return AllFeedbacks;
        }
        public List<NewArticleResponse> GetFeedbackByCompanyName(string name)
        {
            var articleList = _feedbackRepository.GetFeedbackByCompany(name);
            List<NewArticleResponse> allFeedbackByCompanyName = articleList.Select(article =>{
                return new NewArticleResponse( article.Source, article.Author, article.Url,article.Title, article.Description,article.Content);
            }).ToList();
            return allFeedbackByCompanyName;
        }


        public void DeleteFeedback(string id)
        {
            _feedbackRepository.DeleteFeedback(new Guid(id));
        }


    }

}
