using api.Contexts;
using api.Dtos.Public;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Domain.Public.About;

public class AboutDomainGet(SqlServerContext context, IMapper mapper) : IAboutDomainGet
{
    public async Task<ICollection<AboutDetailReadDto>> GetAboutDetails(bool includeIcons)
    {
        var oAboutDetailResult = await context
            .AboutDetails
            .Where(x => includeIcons
                ? !string.IsNullOrWhiteSpace(x.Icon)
                : string.IsNullOrWhiteSpace(x.Icon)
             )
            .AsSplitQuery()
            .ToListAsync();

        return mapper.Map<ICollection<AboutDetailReadDto>>(oAboutDetailResult);
    }
    public async Task<ICollection<CommunityLinkReadDto>> GetCommunityLinks()
    {
        var oCommunityLinkResult= await context
            .CommunityLinks
            .AsSplitQuery()
            .ToListAsync();

        return mapper.Map<ICollection<CommunityLinkReadDto>>(oCommunityLinkResult);
    }
}