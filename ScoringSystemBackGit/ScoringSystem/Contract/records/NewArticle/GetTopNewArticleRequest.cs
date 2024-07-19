using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FirstProject.Contracts.Records.Articles
{
    public record GetTopNewArticlesRequest(Guid topicId);
}
