using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Feedback
    {
        public Guid Id { get; set; }
        public Guid topicId { get; set; }
        public Topic topic { get; set; }
        public Guid ArticleId { get; set; }
        public string articleUrl { get; set; }
        public float[] highScore { get; set; }
        public float[] midScore { get; set; }
        public float[] lowScore { get; set; }
        public float finalScore { get; set; }
        public bool rated { get; set; }
        public List<Company> relatedCompanies { get; set; }
        public DateTime CreatedOn { get; set; }
        public string articleSentiment { get; set; }
        public string Reviewer { get; set; }
    }
}
