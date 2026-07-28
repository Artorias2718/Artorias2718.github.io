using api.Domain.Public.FAQ;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParcelController(IParcelDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<ParcelReadDto>> GetParcels()
    {
        return await domainGet.GetParcels();
    }
}
