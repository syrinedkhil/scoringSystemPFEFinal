using Contract.records.Label;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Contract.records.Article
{
    public record ArticleResponse
    {
        [Required]
        public Guid ArticleId { get; init; }
        [Required]
        public string ArticleTexte { get; init; }
        [Required]
        public List<LabelResponse> Labels { get; init; }
        [Required]
        public int FinalScore { get; init; }
        public ArticleResponse(Guid id, string texte, List<LabelResponse> labels, int FinalScore)
        {
            this.ArticleId = id;
            this.ArticleTexte = texte;
            this.Labels = labels;
            this.FinalScore = FinalScore;
        }
    }
}
