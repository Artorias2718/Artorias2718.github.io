using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Contexts;

public class SqlServerContext(DbContextOptions<SqlServerContext> options) : DbContext(options)
{
    public DbSet<FAQGroup> FAQGroups { get; set; }
    public DbSet<FAQ> FAQs { get; set; }
    public DbSet<Glossary> Glossaries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SqlServerContext).Assembly);
    }
}