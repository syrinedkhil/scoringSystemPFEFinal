using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Google;
using Infrastructure.Persistence;
namespace Infrastructure.Extensions
{
    //public static  class MigrationExtensions
    //{
    //    public static void ApplyMigrations(this IApplicationBuilder app)
    //    {
    //        using IServiceScope scope = app.ApplicationServices.CreateScope();
    //        using DataBaseContext dbContext =
    //        scope.ServiceProvider.GetRequiredService<DataBaseContext>();

    //        dbContext.Database.Migrate();
    //    }
    //}
}
