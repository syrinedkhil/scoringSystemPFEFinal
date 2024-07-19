using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public class DataBaseContext : DbContext
        
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }
        
        public DbSet<Article> Articles { get; set; } = null!;
        public DbSet<Label> Labels { get; set; } = null!;
        public DbSet<Topic> Topic { get; set; } = null!;
        public DbSet<NewArticle> NewArticle { get; set; } = null!;
        public DbSet<NewLabel> newLabel { get; set; } = null!;

        public DbSet<NewArticleScore> NewArticleScore { get; set; } = null!;
        public DbSet<Feedback> Feedback { get; set; } = null!;
        public DbSet<Company> Companies { get; set; } = null!;





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            

            modelBuilder.Entity<Article>()
                .HasKey(s => s.ArticleId);

            modelBuilder.Entity<Article>()
               .HasMany(f => f.Labels)
               .WithMany()
               .UsingEntity(j => j.ToTable("ArticleLabels"));

            modelBuilder.Entity<Label>()
               .HasKey(s => s.LabelId);



            modelBuilder.Entity<Topic>()
                .HasKey(t => t.IdTopic);

            modelBuilder.Entity<Topic>()
                .HasMany(f => f.Labels)
                .WithMany()
                .UsingEntity(j => j.ToTable("TopicLabels"));



            modelBuilder.Entity<Feedback>()
                .HasKey(f => f.Id);
            
            modelBuilder.Entity<Feedback>()
                .HasMany(f => f.relatedCompanies)
                .WithMany()
                .UsingEntity(j => j.ToTable("FeedbackCompany"));

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.topic)
                .WithMany()
                .HasForeignKey(f => f.topicId);





        }







    }
}



    

