using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.records.NewArticle
{
    public record NewArticleResponse
    {
        [Required]
        public string Source { get; init; }
        [Required]
        public string Author { get; init; }
        [Required]
        public string Url { get; init; }
        [Required]
        public string Title { get; init; }
        [Required]
        public string Description { get; init; }
        [Required]
        public string Content { get; init; }
        public NewArticleResponse(string Source, string Author, string Url, string Title, string Description, string Content)
        {
            this.Source = Source;
            this.Author = Author;
            this.Url = Url;
            this.Title = Title;
            this.Description = Description;
            this.Content = Content;
        }
    }
}
