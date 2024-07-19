using Domain.Entities;
using Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NewsAPI.Constants;
using NewsAPI.Models;
using NewsAPI;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Persistence;
using Google.Apis.CustomSearchAPI.v1;
using Google.Apis.CustomSearchAPI.v1.Data;
using Google.Apis.Services;
namespace Infrastructure.DataAccess.Repositories
{
    public class NewArticleRepository : INewArticleRepository
    {
        private readonly DataBaseContext _dbContext;

        private readonly INewLabelRepository _newLabelRepositroy;
        private readonly ICompanyRepository _companyRepository;
        public NewArticleRepository(INewLabelRepository newLabelRepositroy, DataBaseContext dbContext, ICompanyRepository companyRepository)
        {
            _newLabelRepositroy = newLabelRepositroy;
            _dbContext = dbContext;
            _companyRepository = companyRepository;
        }
        public void AddArticle(NewArticle article)
        {
            _dbContext.NewArticle.Add(article);
            _dbContext.SaveChanges();
        }

        public void DeleteArticle(Guid id)
        {
            var article = _dbContext.NewArticle.FirstOrDefault(u => u.Id == id);
            _dbContext.NewArticle.Remove(article);
            _dbContext.SaveChanges();
        }
        public List<NewArticle> GetNewTopArticles(Topic topic)
        {
            List<NewArticle> articles = new List<NewArticle>();

            List<Company> candidate_companies = _companyRepository.GetAllCompanies();
            List<string> companies_name = new List<string>();


            string[] candidate_names = companies_name.ToArray();


            var Listlabels = topic.Labels.ToList();
            string[] items = new string[Listlabels.Count];
            var filteredItems = Listlabels
                 .Select(label => label.Item)
                 .ToArray();

            string result = string.Join(" ", filteredItems);
            Console.WriteLine(result);
            foreach (var name in candidate_companies)
            {
                companies_name.Add(name.Name);


            }
            string res = string.Join(" ", companies_name);
            Console.WriteLine("hfvbjhsdbvjbdsjhvbkkkkkkkkkkkkkkkkkkkkkkkkk");
            Console.WriteLine(result);
            Console.WriteLine(res);
            string final = result + " " + res;
            Console.WriteLine(final);
            string ApiQ = " article about " + final;
            CustomSearchAPIService service = new CustomSearchAPIService(new BaseClientService.Initializer()
            {
                ApiKey = "AIzaSyBQ9L2-6wIJeHEIin28_4ItED9LIkHXJys",
            });


            Console.WriteLine(ApiQ);
            var Apiresult = service.Cse.List();
            Apiresult.Q = ApiQ;
            Apiresult.Sort = "date";
            Apiresult.Cx = "57b9f059532854753";
            IList<Result> paging = new List<Result>();
            var count = 0;
            while (paging != null)
            {
                Console.WriteLine($"Page {count}");
                Apiresult.Start = count;
                try
                {
                    paging = Apiresult.Execute().Items;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }

                if (paging != null)
                    foreach (var item in paging)
                    {
                        articles.Add(new NewArticle
                        {
                            Id = Guid.NewGuid(),
                            Source = item.Kind,
                            Title = item.Title,
                            Description = item.Snippet,
                            Author = "None",
                            Content = item.Snippet,
                            Url = item.Link
                        });
                    }
                break;

            }
            Console.WriteLine("Done.");
            return articles;

        }

    }


}

