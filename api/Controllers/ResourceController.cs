using api.Domain.Public.Resource;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourceController(IResourceDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<ResourceGroupReadDto>> GetResources()
    {
        return await domainGet.GetResources();
    }
}
