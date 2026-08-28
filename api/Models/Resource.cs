namespace api.Models;

public class ResourceGroup
{
    public int Id { get; set; }
    public string Category { get; set; } = "";
    public string Description { get; set; } = "";
    public ICollection<Resource> Items { get; set; } = new List<Resource>();
}

public class Resource
{
    public int Id { get; set; }
    public int ResourceGroupId { get; set; }
    public string Name { get; set; } = "";
    public string Url { get; set; } = "";
    public string Icon { get; set; } = "";
    public string IconColor { get; set; } = "";
    public string IconBackground { get; set; } = "";
    public string Description { get; set; } = "";
    public string? Badge { get; set; } = "";

    public ResourceGroup ResourceGroup { get; set; } = null!;
}