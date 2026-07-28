namespace api.Dtos.Public;

public class FAQGroupReadDto
{
    public string Category { get; set; } = "";
    public ICollection<FAQReadDto> Questions { get; set; } = new List<FAQReadDto>();
}
