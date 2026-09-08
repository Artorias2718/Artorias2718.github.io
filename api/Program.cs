using System.Reflection;
using System.Threading.RateLimiting;
using api.Contexts;
using api.Domain.Public.About;
using api.Domain.Public.FAQ;
using api.Domain.Public.Image;
using api.Domain.Public.Resource;
using api.Models;
using api.Profiles.Public;
using api.Seeders;
using Azure.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.Azure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var corsPolicyName = "_corsPolicy";
var readPolicyName = "_readPolicy";
var writePolicyName = "_writePolicy";

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
            "http://localhost:5055",
            "https://localhost:5173",
            "https://artorias2718.github.io"
        ]);
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy<string>(readPolicyName, httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 100,
                Window = TimeSpan.FromMinutes(1)
            }
        )
    );

     options.AddPolicy<string>(writePolicyName, httpContext =>
         RateLimitPartition.GetFixedWindowLimiter(
             partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
             factory: _ => new FixedWindowRateLimiterOptions
             {
                 PermitLimit = 15,
                 Window = TimeSpan.FromMinutes(1)
             }
         )
     );
});

builder.Services.AddScoped<IAboutDomainGet, AboutDomainGet>();
builder.Services.AddScoped<IBoostTierDomainGet, BoostTierDomainGet>();
builder.Services.AddScoped<IFAQDomainGet, FAQDomainGet>();
builder.Services.AddScoped<IGlossaryDomainGet, GlossaryDomainGet>();
builder.Services.AddScoped<IImageDomainGet, ImageDomainGet>();
builder.Services.AddScoped<IResourceDomainGet, ResourceDomainGet>();

builder.Services.AddDbContext<SqlServerContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnectionString"),
        sqlOptions => {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null
            );
            sqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery);
            sqlOptions.UseCompatibilityLevel(160); // SQL Server 2022
        });
});

var blobUri = builder.Configuration["Storage:BlobUri"];
if (!string.IsNullOrWhiteSpace(blobUri))
{
    builder.Services.AddAzureClients(clients =>
    {
        clients.AddBlobServiceClient(new Uri(blobUri));
        clients.UseCredential(new DefaultAzureCredential());
    });
}


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
