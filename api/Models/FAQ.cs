namespace api.Models;

public class FAQGroup
{
    public int Id { get; set; }
    public string Category { get; set; } = "";
    public ICollection<FAQ> Questions { get; set; } = new List<FAQ>();
}

public class FAQ
{
    public int Id { get; set; }
    public int FaqGroupId { get; set; }
    public string Question { get; set; } = "";
    public string Answer { get; set; } = "";

    public FAQGroup FaqGroup { get; set; } = null!;
}