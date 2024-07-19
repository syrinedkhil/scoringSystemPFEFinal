using System.ComponentModel.DataAnnotations;
namespace Contract.records.NewArticle
{
    public record AddNewArticleResponse
    {
        [Required]
        public string id { get; init; }
        public AddNewArticleResponse(string id)
        {
            this.id = id;
        }
    }

}
