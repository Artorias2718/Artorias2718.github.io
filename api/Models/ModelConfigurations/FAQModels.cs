using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace api.Models.ModelConfigurations;

public class FAQGroupConfiguration : IEntityTypeConfiguration<FAQGroup>
{
    public void Configure(EntityTypeBuilder<FAQGroup> builder)
    {
        builder.ToTable("FAQGroup");
        builder.HasKey(e => e.Id);
    }
}

public class FAQConfiguration: IEntityTypeConfiguration<FAQ>
{
    public void Configure(EntityTypeBuilder<FAQ> builder)
    {
        builder.ToTable("FAQ");
        builder.HasKey(e => e.Id);
        builder.HasOne(e => e.FaqGroup)
            .WithMany(e => e.Questions)
            .HasForeignKey(e => e.FaqGroupId);

        builder.Property(e => e.Question)
               .HasColumnType("nvarchar(max)")
               .IsRequired();

        builder.Property(e => e.Answer)
               .HasColumnType("nvarchar(max)")
               .IsRequired();
    }
}
