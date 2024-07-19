using Contract.records.NewArticleScore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.services
{
    public interface IManageNewArticleScoreServices
    {
        public List<NewArticleScoreResponse> GetArticleScore(GetNewArticleScoreRequest request);

    }
}
