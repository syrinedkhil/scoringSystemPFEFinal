using Application.services;
using Contract.records.Article;
using Contract.records.NewArticle;
using Contract.services;
using FirstProject.Contracts.Records.Articles;
using Microsoft.AspNetCore.Mvc;

namespace ScoringSystem.Controllers
{
    [Route("api/Articles")]
    [ApiController]
    public class NewArticlesController : ControllerBase
    {
        private readonly IManageNewArticleServices _manageNewArticlesServices;
        public NewArticlesController(IManageNewArticleServices manageArticlesServices)
        {
            _manageNewArticlesServices = manageArticlesServices;
        }
        [HttpPost("GetTopArticles", Name = "GetTopArticles")]
        public List<NewArticleResponse> GetTopArticles(GetTopNewArticlesRequest request)
        {
            return _manageNewArticlesServices.GetTopNewArticles(request);
        }
        [HttpPost("AddNewArticle", Name = "AddNewArticle")]
        public AddNewArticleResponse AddArticle(AddNewArticleRequest request)
        {
            string articleId = _manageNewArticlesServices.AddArticle(request);
            var Response = new AddNewArticleResponse(id: articleId);
            return Response;
        }
        [HttpDelete("DeleteNewArticle", Name = "DeleteNewArticle")]
        public void DeleteArticle(string id) => _manageNewArticlesServices.DeleteArticle(id);

    }

}
