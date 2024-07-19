namespace Domain.Entities
{
    public class Article
    {
            public Guid ArticleId { get; set; } = Guid.NewGuid();
          
            public string ArticleTexte { get; set; } = "";
            public int FinalScore { get; set; } 
            public List<Label> Labels { get; set; } 
    }
}

