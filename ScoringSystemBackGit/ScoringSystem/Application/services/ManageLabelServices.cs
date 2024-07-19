using Contract.records.Label;
using Contract.records.Labels;
using Contract.services;
using Domain.Entities;
using Domain.Repository;
namespace Application.services
{
    public class ManageLabelServices : IManageLabelServices
    {
        private readonly ILabelRepository _labelRepository;
        private readonly IArticleRepository _articleRepository;
        public ManageLabelServices(ILabelRepository labelRepository, IArticleRepository articleRepository)
        {
            _labelRepository = labelRepository;
            _articleRepository = articleRepository;
        }
        public LabelResponse AddLabel(AddLabelRequest request)
        {
            var label = new Label
            {
                LabelId = Guid.NewGuid(),
                Item = request.Item,
                Score = request.Score,
                Priority=request.Priority,
                    articleId =request.ArticleId,
            };
            _labelRepository.AddLabel(label);
            return new LabelResponse(label.LabelId,request.Item, request.Score, request.Priority, label.articleId);
        }
        public List<LabelResponse> GetLabelByArticleId(GetLabelByArticleIdRequest request)
        {
            var article = _articleRepository.GetArticleById(request.ArticleId);
            if (article == null){return new List<LabelResponse>();}
            List<Label> labels = _labelRepository.GetLabelByArticle(article.ArticleId);
            if (labels == null || labels.Count == 0) { return new List<LabelResponse>();}
            List<LabelResponse> AllLabelsForCurrentArticle = new List<LabelResponse>();
            foreach (var label in labels)
            {
                var singleLabel = new LabelResponse( label.LabelId, label.Item, label.Score,label.Priority, label.articleId);
                AllLabelsForCurrentArticle.Add(singleLabel);
            }
            return AllLabelsForCurrentArticle;
        }
        public void DeleteLabel(Guid id) { _labelRepository.DeleteLabel(id);}
        public LabelResponse UpdateLabel(UpdateLabelRequest request)
        {
            Label newLabel = new Label()
            {
               LabelId= request.LabelId,
                Item=request.Item,
                Score = request.Score,
                Priority = request.Priority,
                articleId = request.ArticleId,
            };
            _labelRepository.UpdateLabel(newLabel);
            return new LabelResponse( newLabel.LabelId, newLabel.Item, newLabel.Score, newLabel.Priority, newLabel.articleId);
        }

        public List<List<LabelResponse>> GetAllLabelsByArticle()
        {
            List<List<LabelResponse>> allLabelsByArticle = new List<List<LabelResponse>>();
            var Articles = _articleRepository.GetAllArticles();
            foreach (var article in Articles)
            {
                List<LabelResponse> labelsForArticle = GetLabelByArticleId(new GetLabelByArticleIdRequest(article.ArticleId));
                allLabelsByArticle.Add(labelsForArticle);
            }
            return allLabelsByArticle;
        }
    }
    }

