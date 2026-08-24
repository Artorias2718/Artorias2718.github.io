namespace api.Dtos.Public;

public class ResourceGroupReadDto
{
    public string Category { get; set; } = "";
    public string Description { get; set; } = "";
    public ICollection<ResourceReadDto> Items { get; set; } = null!;
}
