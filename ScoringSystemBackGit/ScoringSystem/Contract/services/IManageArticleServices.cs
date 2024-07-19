using Contract.records.Article;

namespace Contract.services
{
    public interface IManageArticleServices
    {
        ArticleResponse GetArticle(GetArticleByIdResponse request);

        Task<ArticleResponse> AddArticleAsync(AddArticleRequest request);
        void DeleteArticle(Guid id);
        void UpdateArticle(UpdateArticleRequest request);

        List<ArticleResponse> GetAllArticles();

    }
}
