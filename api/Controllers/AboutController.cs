using api.Domain.Public.About;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("readPolicy")]
public class AboutController(IAboutDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<AboutDetailReadDto>> GetAboutDetails([FromQuery] bool includeIcons)
    {
        return await domainGet.GetAboutDetails(includeIcons);
    }

    [HttpGet("[action]")]
    public async Task<ICollection<CommunityLinkReadDto>> GetCommunityLinks()
    {
        return await domainGet.GetCommunityLinks();
    }
}
