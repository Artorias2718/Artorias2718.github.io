using api.Domain.Public.FAQ;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("readPolicy")]
public class FAQController(IFAQDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<FAQGroupReadDto>> GetFAQs()
    {
        return await domainGet.GetFAQs();
    }
}
