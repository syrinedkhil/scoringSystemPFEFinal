using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.Feedback
{
    public record FeedbackResponse
    {
        [Required]
        public Guid id { get; init; }
        [Required]
        public Guid topicId { get; init; }
        [Required]
        public Guid ArticleId { get; init; }
        public string articleUrl { get; init; }
        [Required]
        public float[] highScore { get; init; }
        [Required]
        public float[] midScore { get; init; }
        [Required]
        public float[] lowScore { get; init; }
        [Required]
        public float finalScore { get; init; }
        [Required]
        public bool rated { get; init; }
        public string[] relatedCompanies { get; init; }
        [Required]
        public string articleSentiment { get; init; }
        [Required]
        public string CreatedOn { get; init; }
        [Required]
        public string reviewer { get; init; }
        public FeedbackResponse
            (
            Guid id,
            Guid topicId,
            Guid articleId,
            string articleUrl,
            float[] highScore,
            float[] midScore,
            float[] lowScore,
            float finalScore,
            bool rated,
            string[] relatedCompanies,
            string articleSentiment,
            string CreatedOn,
            string reviewer
            )
        {
            this.id = id;
            this.topicId = topicId;
            this.ArticleId = articleId;
            this.articleUrl = articleUrl;
            this.highScore = highScore;
            this.midScore = midScore;
            this.lowScore = lowScore;
            this.finalScore = finalScore;
            this.rated = rated;
            this.relatedCompanies = relatedCompanies;
            this.articleSentiment = articleSentiment;
            this.CreatedOn = CreatedOn;
            this.reviewer = reviewer;
        }

    }
}
