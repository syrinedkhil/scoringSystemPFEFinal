using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.Feedback
{
    public record FeedbackRequest(
        string topicId,
        string articleId,
        string articleUrl,
        float[] highScore,
        float[] midScore,
        float[] lowScore,
        float finalScore,
        bool rated,
        string[] relatedCompanies,
        string articleSentiment,
        string reviewer);
}
