using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Contexts;

public class SqlServerContext(DbContextOptions<SqlServerContext> options) : DbContext(options)
{
    public DbSet<BoostTier> BoostTiers { get; set; }
    public DbSet<FAQ> FAQs { get; set; }
    public DbSet<FAQGroup> FAQGroups { get; set; }
    public DbSet<Glossary> Glossaries { get; set; }
    public DbSet<Parcel> Parcels { get; set; }
    public DbSet<RegionCountry> RegionCountries { get; set; }
    public DbSet<RegionTier> RegionTiers { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<ResourceGroup> ResourceGroups { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SqlServerContext).Assembly);
    }
}