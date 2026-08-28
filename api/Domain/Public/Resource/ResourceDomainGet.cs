using api.Contexts;
using api.Dtos.Public;
using api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Domain.Public.Resource;

public class ResourceDomainGet(SqlServerContext context, IMapper mapper) : IResourceDomainGet
{
    public async Task<ICollection<ResourceGroupReadDto>> GetResources()
    {
        var oResourceGroupResult= await context
            .ResourceGroups
            .Include(x => x.Items)
            .AsSplitQuery()
            .ToListAsync();

        return mapper.Map<ICollection<ResourceGroupReadDto>>(oResourceGroupResult);
    }
}