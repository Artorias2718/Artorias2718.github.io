using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace api.Models.ModelConfigurations;

public class GlossaryConfiguration: IEntityTypeConfiguration<Glossary>
{
    public void Configure(EntityTypeBuilder<Glossary> builder)
    {
        builder.ToTable("Glossary");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Term)
               .HasColumnType("nvarchar(max)")
               .IsRequired();

        builder.Property(e => e.Definition)
               .HasColumnType("nvarchar(max)")
               .IsRequired();
    }
}
