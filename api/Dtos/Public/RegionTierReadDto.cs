namespace api.Dtos.Public;

public class RegionTierReadDto
{
    public string Key { get; set; } = "";
    public string Label { get; set; } = "";
    public string Currency { get; set; } = "";

    public ICollection<RegionCountryReadDto> Countries { get; set; }
    public ICollection<BoostTierReadDto> Tiers { get; set; }
}

public class BoostTierReadDto
{
    public int Id { get; set; }
    public int MinParcels { get; set; }
    public string ParcelsLabel { get; set; } = "";
    public int Boost { get; set; }
    public decimal? NoAdsMonth { get; set; }
    public decimal? WithAdsMonth { get; set; }
    public decimal? WithAdsYear { get; set; }
    public decimal? SrbYear { get; set; }
}

public class RegionCountryReadDto
{
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
}