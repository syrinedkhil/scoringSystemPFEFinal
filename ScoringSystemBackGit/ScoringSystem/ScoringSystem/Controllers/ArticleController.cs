using Contract.records.Article;

using Contract.services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IManageArticleServices _manageArticleServices;

        public ArticleController(IManageArticleServices manageArticleServices)
        {
            _manageArticleServices = manageArticleServices;
        }
        [HttpPost("Add", Name = "AddArticle")]
        public Task<ArticleResponse> AddArticleAsync(AddArticleRequest request)
        {
            return _manageArticleServices.AddArticleAsync(request);
        }

        [HttpPost("GetById", Name = "GetArticleById")]
        public ArticleResponse GetArticle(GetArticleByIdResponse request)
        {
            return _manageArticleServices.GetArticle(request);
        }


        [HttpGet("GetAll", Name = "GetAllArticles")]
        public List<ArticleResponse> GetAllArticles()
        {
            return _manageArticleServices.GetAllArticles();
        }
        [HttpDelete("Delete", Name = "DeleteArticleById")]

        public void DeleteArticle(Guid id) => _manageArticleServices.DeleteArticle(id);








    }
}
