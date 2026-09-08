using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Models.ModelConfigurations;

public class AboutDetailConfiguration : IEntityTypeConfiguration<AboutDetail>
{
    public void Configure(EntityTypeBuilder<AboutDetail> builder)
    {
        builder.ToTable("AboutDetail");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Icon)
            .HasColumnType("nvarchar(120)")
            .IsRequired(false);

        builder.Property(e => e.Title)
            .HasColumnType("nvarchar(120)")
            .IsRequired();

        builder.Property(e => e.Description)
            .HasColumnType("nvarchar(max)")
            .IsRequired();
    }
}

public class CommunityLinkConfiguration : IEntityTypeConfiguration<CommunityLink>
{
    public void Configure(EntityTypeBuilder<CommunityLink> builder)
    {
        builder.ToTable("CommunityLink");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Href)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.Property(e => e.Icon)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.Property(e => e.Alt)
            .HasColumnType("nvarchar(max)")
            .IsRequired();
    }
}