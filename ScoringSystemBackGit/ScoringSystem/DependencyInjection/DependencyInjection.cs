using Microsoft.Extensions.DependencyInjection;
using Application.services;
using Domain.Entities;
using Contract.services;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Repository;
using Infrastructure.DataAccess.Repositories;


namespace DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {

            services.AddScoped<IManageArticleServices, ManageArticleServices>();
            services.AddScoped<IManageLabelServices, ManageLabelServices>();
            services.AddScoped<IManageNewArticleServices, ManageNewArticleService>();
            services.AddScoped<IManageTopicService, ManageTopicServices>();
            services.AddScoped<IManageNewArticleScoreServices, ManageNewArticleScoreService>();
            services.AddScoped<IManageNewLabelServices, ManageNewLabelServices>();
            services.AddScoped<IManageFeedbackServices, ManageFeedbackServices>();
            services.AddScoped<IManageCompanyService, ManageCompanyServices>();
            services.AddScoped<IManageTokenServices, ManageTokenService>();
            return services;
        }
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {

            services.AddScoped<IArticleRepository, ArticleRepository>();
            services.AddScoped<ILabelRepository, LabelRepository>();
            services.AddScoped<ITopicRepository, TopicRepository>();
            services.AddScoped<INewArticleRepository, NewArticleRepository>();
            services.AddScoped<INewArticleScoreRepository, NewArticleScoreRepository>();
            services.AddScoped<INewLabelRepository, NewLabelRepository>();
            services.AddScoped<IFeedbackRepository, FeedbackRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IFastApi, FastApi>();

            //var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            //var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            //var dbPassword = Environment.GetEnvironmentVariable("DB_MSSQL_SA_PASSWORD");
            //var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID=sa;Password={dbPassword};Trusted_Connection=false;TrustServerCertificate=True";
            //services.AddDbContext<DataBaseContext>(opt => opt.UseSqlServer(connectionString));

            services.AddDbContext<DataBaseContext>(
             options => options.UseSqlServer("Server=DESKTOP-79U2SV5;Database=ScoringSystemdb;Trusted_Connection=true;TrustServerCertificate=True"));

            return services;

        }


    }
}
