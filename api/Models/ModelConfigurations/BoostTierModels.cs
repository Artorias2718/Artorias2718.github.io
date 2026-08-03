using System.Collections.Immutable;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Models.ModelConfigurations;

public class ParcelConfiguration : IEntityTypeConfiguration<Parcel>
{
    public void Configure(EntityTypeBuilder<Parcel> builder)
    {
        builder.ToTable("Parcel");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Rarity)
               .HasColumnType("nvarchar(10)")
               .IsRequired();

        builder.Property(e => e.Odds)
               .HasColumnType("decimal")
               .IsRequired();

        builder.Property(e => e.Rate)
               .HasColumnType("decimal")
               .HasPrecision(18, 12)
               .IsRequired();
    }
}

public class RegionTierConfiguration : IEntityTypeConfiguration<RegionTier>
{
    public void Configure(EntityTypeBuilder<RegionTier> builder)
    {
        builder.ToTable("RegionTier")
               .HasKey(e => e.Id);

        builder.Property(e => e.Key)
               .HasColumnType("nvarchar(120)")
               .IsRequired();

        builder.Property(e => e.Label)
               .HasColumnType("nvarchar(120)")
               .IsRequired();

        builder.Property(e => e.Currency)
               .HasColumnType("nvarchar(4)")
               .IsRequired();
    }
}

public class BoostTierConfiguration : IEntityTypeConfiguration<BoostTier>
{
    public void Configure(EntityTypeBuilder<BoostTier> builder)
    {
        builder.ToTable("BoostTier");
        builder.HasKey("Id");

       builder.HasOne(e => e.RegionTier)
              .WithMany(e => e.Tiers)
              .HasForeignKey(e => e.RegionTierId);

        builder.Property(e => e.ParcelsLabel)
               .HasColumnType("nvarchar(120)")
               .IsRequired();

        builder.Property(e => e.Boost)
               .IsRequired();

        builder.Property(e => e.NoAdsMonth)
               .HasPrecision(8, 4)
               .IsRequired();

        builder.Property(e => e.WithAdsMonth)
               .HasPrecision(8, 4)
               .IsRequired();

        builder.Property(e => e.WithAdsYear)
               .HasPrecision(8, 4)
               .IsRequired();

        builder.Property(e => e.SrbYear)
               .HasPrecision(8, 4)
               .IsRequired();
    }
}

public class RegionCountryConfiguration : IEntityTypeConfiguration<RegionCountry>
{
    public void Configure(EntityTypeBuilder<RegionCountry> builder)
    {
        builder.ToTable("RegionCountry")
               .HasKey(e => e.Id);

        builder.HasOne(e => e.RegionTier)
               .WithMany(e => e.Countries)
               .HasForeignKey(e => e.RegionTierId);

        builder.Property(e => e.Code)
               .HasColumnType("nvarchar(20)")
               .IsRequired();

        builder.Property(e => e.Name)
               .HasColumnType("nvarchar(120)");
    }
}