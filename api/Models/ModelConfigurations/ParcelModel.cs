using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace api.Models.ModelConfigurations;

public class ParcelConfiguration: IEntityTypeConfiguration<Parcel>
{
    public void Configure(EntityTypeBuilder<Parcel> builder)
    {
        builder.ToTable("Parcel");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Rarity)
               .HasColumnType("nvarchar(10)")
               .IsRequired();

        builder.Property(e => e.Odds)
               .IsRequired();

        builder.Property(e => e.Rate)
               .HasColumnType("decimal")
               .HasPrecision(18, 12)
               .IsRequired();
    }
}
