using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface INewArticleScoreRepository
    {
        public (string[] stringArrayLabels, float[] floatArrayLabels, string[] stringArrayCompanies,
            Guid[] companies_Ids,float[] floatArrayCompanies, string sentiment, float sentimentScore) getModelScoresList(NewArticle article, string[] inputlabels);
        public NewArticleScore getModelOutput(NewArticle article, Topic topic);
        public NewArticleScore giveFeedBack(NewArticleScore articleScore);

    }
}
