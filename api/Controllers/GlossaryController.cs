using api.Domain.Public.FAQ;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GlossaryController(IGlossaryDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<GlossaryReadDto>> GetGlossary()
    {
        return await domainGet.GetGlossary();
    }
}
