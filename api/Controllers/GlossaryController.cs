using api.Domain.Public.FAQ;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FAQController(IFAQDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<FAQGroupReadDto>> GetFAQs()
    {
        return await domainGet.GetFAQs();
    }
}
