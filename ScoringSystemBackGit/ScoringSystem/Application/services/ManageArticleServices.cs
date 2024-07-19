using Contract.records.Article;
using Contract.records.Label;

using Contract.services;
using Domain.Entities;
using Domain.Repository;
using Microsoft.AspNetCore.Mvc;
using Label = Domain.Entities.Label;
namespace Application.services
{
    public class ManageArticleServices : IManageArticleServices
    {
        private readonly IArticleRepository _articleRepository;
        private readonly ILabelRepository _labelRepository;
        private readonly IFastApi _fastApi;
        public ManageArticleServices(IArticleRepository articleRepository, ILabelRepository labelRepository, IFastApi fastApi)
        {
            _articleRepository = articleRepository;
            _labelRepository = labelRepository;
            _fastApi = fastApi;
        }
        public ArticleResponse GetArticle(GetArticleByIdResponse request)
        { 
            var article = _articleRepository.GetArticleById(request.ArticleId);
            List<LabelResponse> labelsList = new List<LabelResponse>();
            foreach (var l in article.Labels)
            {
                LabelResponse la = new LabelResponse(l.LabelId, l.Item, l.Score, l.Priority, article.ArticleId);
                labelsList.Add(la);
            }
            return new ArticleResponse(article.ArticleId,article.ArticleTexte,labelsList,article.FinalScore);
        }
        public async Task<ArticleResponse> AddArticleAsync([FromBody] AddArticleRequest request)
        {
            var article = new Article
            {
                ArticleId = Guid.NewGuid(),
                ArticleTexte = request.ArticleTexte,
                Labels = request.Labels.Select(label => new Label
                {
                    LabelId = Guid.NewGuid(),
                    Item = label.Item,
                    Score = label.Score,
                    Priority = label.Priority,

                }).ToList(),


            };
            var labelItems = request.Labels.Select(label => label.Item).ToArray();
            try
            {
                var result = await _fastApi.ClassifySequenceAsync(article.ArticleTexte, labelItems);
                string[] ArticleLabels = result.Item1;
                double[] scores = result.Item2;
                for (int i = 0; i < ArticleLabels.Length; i++)
                {
                    var label = article.Labels.FirstOrDefault(l => l.Item == ArticleLabels[i]);
                    if (label != null)
                    {
                        label.Score = scores[i];
                    }
                }

            }
            catch (Exception e) { Console.WriteLine(e); }
            _articleRepository.AddArticle(article);
            List<LabelResponse> labelsList = new List<LabelResponse>();
            foreach (var l in article.Labels)
            {
                LabelResponse la = new LabelResponse(l.LabelId, l.Item, l.Score, l.Priority, article.ArticleId);
                labelsList.Add(la);
            }
            int finalScore = (int)article.Labels.Sum(label => label.Score);
            var response = new ArticleResponse(article.ArticleId, article.ArticleTexte, labelsList, finalScore);
            return response;


        }
        public void DeleteArticle(Guid id){_articleRepository.DeleteArticle(id);}
        public void UpdateArticle(UpdateArticleRequest request)
        {
            Article existingArticle = _articleRepository.GetArticleById(request.ArticleId);
            existingArticle.ArticleTexte = request.ArticleTexte;
            foreach (var updatedLabel in request.Labels)
            {
                if (existingArticle.Labels == null){existingArticle.Labels = new List<Label>();}
                Label? existingLabel = existingArticle.Labels.FirstOrDefault(l => l.LabelId == updatedLabel.LabelId);
                if (existingLabel != null)
                {
                    existingLabel.Item = updatedLabel.Item;
                    existingLabel.Score = updatedLabel.Score;
                }
                else
                {
                    existingArticle.Labels.Add(new Label
                    {
                        LabelId = updatedLabel.LabelId,
                        Item = updatedLabel.Item,
                        Score = updatedLabel.Score,
                        articleId = request.ArticleId
                    });
                }
            }
            _articleRepository.UpdateArticle(existingArticle);
        }
        public List<ArticleResponse> GetAllArticles()
        {
            var articles = _articleRepository.GetAllArticles();
            List<ArticleResponse> allArticles = new();
            string[] labels;
            List<string> RelatedLabelsItemList;
            foreach (var article in articles)
            {
                List<LabelResponse> labelsList = new List<LabelResponse>();
                foreach (var l in article.Labels)
                {
                    LabelResponse la = new LabelResponse(l.LabelId, l.Item, l.Score, l.Priority, l.articleId);
                    labelsList.Add(la);
                }
                var singleArticle = new ArticleResponse( article.ArticleId,article.ArticleTexte,labelsList, article.FinalScore);
                allArticles.Add(singleArticle);
            }
            return allArticles;
        }
    }
}
