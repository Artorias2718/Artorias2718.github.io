using api.Contexts;
using api.Dtos.Public;
using api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Domain.Public.FAQ;

public class BoostTierDomainGet(SqlServerContext context, IMapper mapper) : IBoostTierDomainGet
{
    public async Task<ICollection<ParcelReadDto>> GetParcels()
    {
        var oParcelResult = await context.Parcels.ToListAsync();
        return mapper.Map<ICollection<ParcelReadDto>>(oParcelResult);
    }
}