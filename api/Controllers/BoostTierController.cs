using api.Domain.Public.FAQ;
using api.Dtos.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("readPolicy")]
public class BoostTierController(IBoostTierDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]")]
    public async Task<ICollection<ParcelReadDto>> GetParcels()
    {
        return await domainGet.GetParcels();
    }

     [HttpGet("[action]")]
        public async Task<ICollection<RegionTierReadDto>> GetRegionTiers()
        {
            return await domainGet.GetRegionTiers();
        }
}
