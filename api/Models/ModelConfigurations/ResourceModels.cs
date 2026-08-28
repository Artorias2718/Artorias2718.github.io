using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Models.ModelConfigurations;

public class ResourceGroupConfiguration : IEntityTypeConfiguration<ResourceGroup>
{
    public void Configure(EntityTypeBuilder<ResourceGroup> builder)
    {
        builder.ToTable("ResourceGroup");
        builder.HasKey(e => e.Id);
    }
}

public class ResourceConfiguration : IEntityTypeConfiguration<Resource>
{
    public void Configure(EntityTypeBuilder<Resource> builder)
    {
        builder.ToTable("Resource");
        builder.HasKey(e => e.Id);
        builder.HasOne(e => e.ResourceGroup)
            .WithMany(e => e.Items)
            .HasForeignKey(e => e.ResourceGroupId);

        builder.Property(e => e.Name)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.Property(e => e.Url)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.Property(e => e.Icon)
            .HasColumnType("nvarchar(120)")
            .IsRequired();

        builder.Property(e => e.IconColor)
            .HasColumnType("nvarchar(8)")
            .IsRequired();

        builder.Property(e => e.IconBackground)
            .HasColumnType("nvarchar(8)")
            .IsRequired();

        builder.Property(e => e.Description)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.Property(e => e.Badge)
            .HasColumnType("nvarchar(max)");
    }
}