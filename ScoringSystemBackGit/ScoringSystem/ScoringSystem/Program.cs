using Microsoft.EntityFrameworkCore;
using DependencyInjection;
using Application.Helpers;
using Infrastructure.DataAccess.Repositories;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddInfrastructure();
builder.Services.AddApplication();
string Url2 = "http://localhost:5487";

builder.Services.AddHttpClient();
builder.Services.AddSingleton(provider =>
{
    return "http://localhost:8000/classify";
});

builder.Services.AddScoped<FastApi>(provider =>
{
    var httpClientFactory = provider.GetRequiredService<IHttpClientFactory>();

    var httpClient = httpClientFactory.CreateClient();
    var Url = provider.GetRequiredService<string>();
    return new FastApi();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Okta Authorization header using the Bearer scheme Example: \"Authortization: Bearer <token>\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
     {
         {
             new OpenApiSecurityScheme
             {
                 Name = "Bearer",
                 Type = SecuritySchemeType.ApiKey,
                 In= ParameterLocation.Header,
                 Reference = new OpenApiReference
                 {
                     Type = ReferenceType.SecurityScheme,
                     Id = "Bearer"
                 }
             },
             new string[]{}
         }
     });
});



builder.Services.Configure<OktaTokenSettings>(builder.Configuration.GetSection("Okta"));

var OktaSettings = builder.Configuration.GetSection("Okta").Get<OktaTokenSettings>();

var httpClient = new HttpClient();
var json = httpClient.GetStringAsync("https://dev-31259526.okta.com/oauth2/default/v1/keys").Result;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = "https://dev-31259526.okta.com/oauth2/default";
    options.Audience = OktaSettings.Audience;
    options.RequireHttpsMetadata = false; // For development, set it to true in production
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) =>
        {

            var keys = new JsonWebKeySet(json).Keys;
            return keys;
        }

    };

});

builder.Services.AddAuthorization(options =>
{
    // Add a single policy for all roles requiring authentication
    options.AddPolicy("RequireAuthenticated", policy =>
    {
        policy.RequireAuthenticatedUser();
    });

    // Add a policy for the "Admin" role
    options.AddPolicy("Admin", policy =>
    {
        policy.RequireClaim("Admin", "Admin");
    });

    options.AddPolicy("Reviewer", policy =>
    {
        policy.RequireClaim("Admin", "Admin");

    });

    // Add a policy for the "Reviewer" role
    options.AddPolicy("Reviewer", policy =>
    {
        policy.RequireClaim("Reviewer", "Reviewer");
    });
    options.AddPolicy("Client", policy =>
    {
        policy.RequireClaim("Client");
    });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();

    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}
app.UseCors("MyAllowSpecificOrigin");
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();
