using Contract.records.NewArticleScore;
using Contract.services;
using Domain.Repository;
namespace Application.services
{
    public class ManageNewArticleScoreService : IManageNewArticleScoreServices
    {
        private readonly INewArticleRepository _newArticleRepository;
        private readonly ITopicRepository _topicRepository;
        private readonly INewArticleScoreRepository _newArticleScoreRepository;
        private readonly INewLabelRepository _labelRepository;
        public ManageNewArticleScoreService(INewArticleRepository articleRepository, ITopicRepository topicRepository, INewArticleScoreRepository articleScoreRepository, INewLabelRepository labelRepository)
        {
            _newArticleRepository = articleRepository;
            _topicRepository = topicRepository;
            _newArticleScoreRepository = articleScoreRepository;
            _labelRepository = labelRepository;
        }
        public List<NewArticleScoreResponse> GetArticleScore(GetNewArticleScoreRequest request)
        {
            List<NewArticleScoreResponse> results = new List<NewArticleScoreResponse>();
            var topic = _topicRepository.GetTopicById(request.TopicId);
            var TopResult1 = _newArticleRepository.GetNewTopArticles(topic);

            foreach (var TopResult in TopResult1)
            {
                var scores = _newArticleScoreRepository.getModelOutput(TopResult, topic);

                // Vérifier si les scores contiennent les valeurs par défaut
                if (scores.Companies_Ids.Length == 0 && scores.Companies_Score.Length == 0 &&
                    scores.HighScore.Length == 0 && scores.MidScore.Length == 0 &&
                    scores.LowScore.Length == 0 && scores.articleSentimet == "" &&
                    scores.setimentScore == 0.0f)
                {
                    // Ignorer cet élément et passer au suivant
                    continue;
                }

                float AvgHighScore = 0.0f;
                float AvgMidScore = 0.0f;
                float AvgLowScore = 0.0f;
                var finalScore = 0.0f;
                var listLabels = topic.Labels;
                var highLabels = listLabels.Where(label => label.Priority == 3).Select(label => label.Item).ToArray();
                var midLabels = listLabels.Where(label => label.Priority == 2).Select(label => label.Item).ToArray();
                var lowLabels = listLabels.Where(label => label.Priority == 1).Select(label => label.Item).ToArray();

                // Calcul des scores moyens en fonction des priorités des labels
                if (highLabels.Length > 0)
                {
                    for (var i = 0; i < highLabels.Length; i++)
                    {
                        AvgHighScore += scores.HighScore[i];
                    }
                    AvgHighScore = AvgHighScore / highLabels.Length;
                }
                if (midLabels.Length > 0)
                {
                    for (var i = 0; i < midLabels.Length; i++)
                    {
                        AvgMidScore += scores.MidScore[i];
                    }
                    AvgMidScore = AvgMidScore / midLabels.Length;
                }
                if (lowLabels.Length > 0)
                {
                    for (var i = 0; i < lowLabels.Length; i++)
                    {
                        AvgLowScore += scores.LowScore[i];
                    }
                    AvgLowScore = AvgLowScore / lowLabels.Length;
                }

                // Calcul du score final en fonction des labels de priorité
                if ((midLabels.Length > 0) && (lowLabels.Length > 0))
                {
                    finalScore = AvgHighScore * 0.5f + AvgMidScore * 0.3f + AvgLowScore * 0.2f;
                }
                else if (midLabels.Length > 0)
                {
                    finalScore = AvgHighScore * 0.6f + AvgMidScore * 0.4f;
                }
                else if (lowLabels.Length > 0)
                {
                    finalScore = AvgHighScore * 0.7f + AvgLowScore * 0.3f;
                }
                else
                {
                    finalScore = AvgHighScore;
                }

                scores.result = finalScore;
                scores.ArticleId = TopResult.Id;
                scores.TopicId = topic.IdTopic;
                scores.Topic = topic;
                scores.Article = TopResult;

                // Ajout du résultat à la liste uniquement si les scores ne sont pas les valeurs par défaut
                results.Add(new NewArticleScoreResponse(
                    topic.IdTopic,
                    TopResult.Source,
                    TopResult.Author,
                    TopResult.Url,
                    TopResult.Title,
                    TopResult.Description,
                    TopResult.Content,
                    scores.Companies_Ids,
                    scores.Companies_Score,
                    scores.HighScore,
                    scores.MidScore,
                    scores.LowScore,
                    scores.result,
                    scores.articleSentimet,
                    scores.setimentScore
                ));
            }

            return results;
        }


    }
}

