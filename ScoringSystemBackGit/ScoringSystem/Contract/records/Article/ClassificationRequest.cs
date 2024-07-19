using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.Article
{
    public class ClassificationRequest
    {
        public string ArticleTexte { get; set; }
        public string[] Labels { get; set; }
    }
}
