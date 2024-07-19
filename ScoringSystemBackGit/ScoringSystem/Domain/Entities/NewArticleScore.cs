using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class NewArticleScore
    {
        public Guid Id { get; set; }
        public Guid ArticleId { get; set; }
        public NewArticle Article { get; set; }
        public Guid TopicId { get; set; }
        public Topic Topic { get; set; }
        public float result { get; set; }
        public Guid[] Companies_Ids { get; set; }
        public float[] Companies_Score { get; set; }
        public float[] HighScore { get; set; }
        public float[] MidScore { get; set; }
        public float[] LowScore { get; set; }
        public string articleSentimet {  get; set; }
        public float setimentScore {  get; set; }
    }
}
