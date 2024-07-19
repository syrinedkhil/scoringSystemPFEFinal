using Contract.records.Article;
using Contract.records.NewArticle;
using Contract.services;
using Domain.Entities;
using Domain.Repository;
using FirstProject.Contracts.Records.Articles;
namespace Application.services
{
    public class ManageNewArticleService : IManageNewArticleServices
    {
        private readonly INewArticleRepository _newArticleRepository;
        private readonly ITopicRepository _topicRepositroy;
        public ManageNewArticleService(INewArticleRepository newArticleRepository, ITopicRepository topicRepository)
        {
            _newArticleRepository = newArticleRepository;
            _topicRepositroy = topicRepository;
        }
        public List<NewArticleResponse> GetTopNewArticles(GetTopNewArticlesRequest request)
        {
            List<NewArticleResponse> result = new List<NewArticleResponse>();
            var topic = _topicRepositroy.GetTopicById(request.topicId);
            var TopResult = _newArticleRepository.GetNewTopArticles(topic);
            foreach (var Article in TopResult)
            {
                result.Add(new NewArticleResponse(
                    Article.Source,
                    Article.Author,
                    Article.Url,
                    Article.Title,
                    Article.Description,
                    Article.Content
                    ));
            }
            return result;
        }
        public string AddArticle(AddNewArticleRequest request)
        {
            var article = new NewArticle
            {
                Id = Guid.NewGuid(),
                Source = request.Source,
                Author = request.Author,
                Url = request.Url,
                Title = request.Title,
                Description = request.Description,
                Content = request.Content
            };
            _newArticleRepository.AddArticle(article);
            return article.Id.ToString();
        }
        public void DeleteArticle(string id) { _newArticleRepository.DeleteArticle(new Guid(id)); }
    }
}
