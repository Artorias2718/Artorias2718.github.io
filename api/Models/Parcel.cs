namespace api.Models;

public class Parcel
{
    public int Id { get; set; }
    public string Rarity { get; set; } = "";
    public decimal Odds { get; set; }
    public decimal Rate { get; set; }
}