﻿using Contract.records.Label;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.Article
{
    public record UpdateArticleRequest(Guid ArticleId, string ArticleTexte, List<LabelResponse> Labels);
}