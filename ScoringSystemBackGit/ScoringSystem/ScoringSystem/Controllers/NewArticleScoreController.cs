using Contract.records.NewArticleScore;
using Contract.services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ScoringSystem.Controllers
{
    [Route("api/ArticleScore")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Reviewer")]

    public class ArticleScoreControllers : ControllerBase
    {
        private readonly IManageNewArticleScoreServices _manageNewArticleScoreServices;
        public ArticleScoreControllers(IManageNewArticleScoreServices manageNewArticleScoreServices)
        {
            _manageNewArticleScoreServices = manageNewArticleScoreServices;
        }

        [HttpPost("ScoreArticles", Name = "ScoreArticles")]
        public List<NewArticleScoreResponse> getTopArticlesScores(GetNewArticleScoreRequest request)
        {
            return _manageNewArticleScoreServices.GetArticleScore(request);
        }
    }

}
