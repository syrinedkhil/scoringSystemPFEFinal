using System.ComponentModel.DataAnnotations;
namespace Contract.records.NewArticleScore
{
    public record NewArticleScoreResponse
    {
        [Required]
        public Guid TopicId { get; init; }
        [Required]
        public string Source { get; init; }
        [Required]
        public string Author { get; init; }
        [Required]
        public string Url { get; init; }
        [Required]
        public string Title { get; init; }
        [Required]
        public string Description { get; init; }
        [Required]
        public string Content { get; init; }
        [Required]
        public Guid[] companies_Ids { get; init; }
        [Required]
        public float[] companies_Scores { get; init; }
        [Required]
        public float[] HighScore { get; init; }
        [Required]
        public float[] MidScore { get; init; }
        [Required]
        public float[] LowScore { get; init; }
        [Required]
        public float result { get; init; }
        public string articleSentiment { get; init; }
        public float sentimentScore { get; init; }
        public NewArticleScoreResponse(Guid TopicId, string Source, string Author, string Url, string Title,
            string Description, string Content, Guid[] companies_Ids, float[] companies_Scores,
            float[] HighScore, float[] MidScore, float[] LowScore, float result, string articleSentiment, float sentimentScore)
        {
            this.TopicId = TopicId;
            this.Source = Source;
            this.Author = Author;
            this.Url = Url;
            this.Title = Title;
            this.Description = Description;
            this.Content = Content;
            this.companies_Ids = companies_Ids;
            this.companies_Scores = companies_Scores;
            this.HighScore = HighScore;
            this.MidScore = MidScore;
            this.LowScore = LowScore;
            this.result = result;
            this.articleSentiment = articleSentiment;
            this.sentimentScore = sentimentScore;
        }
    };
}
