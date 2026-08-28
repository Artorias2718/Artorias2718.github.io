namespace api.Models;

public class RegionTier
{
    public int Id { get; set; }
    public string Key { get; set; } = "";
    public string Label { get; set; } = "";
    public string Currency { get; set; } = "";

    public ICollection<RegionCountry> Countries { get; set; } = new List<RegionCountry>();
    public ICollection<BoostTier> Tiers { get; set; } = new List<BoostTier>();
}

public class BoostTier
{
    public int Id { get; set; }
    public int MinParcels { get; set; }
    public int RegionTierId { get; set; }
    public string ParcelsLabel { get; set; } = "";
    public int Boost { get; set; }
    public decimal? NoAdsMonth { get; set; }
    public decimal? WithAdsMonth { get; set; }
    public decimal? WithAdsYear { get; set; }
    public decimal? SrbYear { get; set; }
    public RegionTier RegionTier { get; set; }
}

public class RegionCountry
{
    public int Id { get; set; }
    public int RegionTierId { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";

    public RegionTier RegionTier { get; set; }
}