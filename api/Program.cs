using System.Reflection;
using api.Contexts;
using api.Domain.Public.FAQ;
using api.Domain.Public.Resource;
using api.Models;
using api.Profiles.Public;
using api.Seeders;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var corsPolicyName = "_corsPolicy";
builder.Services.AddControllers()
   .AddNewtonsoftJson(options =>
   {
       options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
       options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver(); // should lower case first letter when serializing a class

   });

builder.Services.AddAutoMapper(config => { },
    typeof(FAQProfile)
);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSingleton<DataSeeder>();
    builder.Services.AddOpenApi();
}

builder.Services.AddCors((options) =>
{
    options.AddPolicy(corsPolicyName, (policyBuilder) =>
    {
        policyBuilder.WithOrigins([
            "http://localhost:5173"
        ]);
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
    });
});

builder.Services.AddScoped<IFAQDomainGet, FAQDomainGet>();
builder.Services.AddScoped<IGlossaryDomainGet, GlossaryDomainGet>();
builder.Services.AddScoped<IBoostTierDomainGet, BoostTierDomainGet>();
builder.Services.AddScoped<IResourceDomainGet, ResourceDomainGet>();

builder.Services.AddDbContext<SqlServerContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnectionString"),
        sqlOptions => {
            sqlOptions.EnableRetryOnFailure();
            sqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery);
            sqlOptions.UseCompatibilityLevel(160); // SQL Server 2022
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.Services.GetService<DataSeeder>()?.SeedData();
    app.MapOpenApi();
}

app.UseCors(corsPolicyName);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
