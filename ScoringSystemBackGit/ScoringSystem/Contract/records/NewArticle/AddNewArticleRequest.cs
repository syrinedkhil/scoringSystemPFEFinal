namespace Contract.records.NewArticle
{
    public record AddNewArticleRequest(
        string Source,
        string Author,
        string Url,
        string Title,
        string Description,
        string Content
    );
}
