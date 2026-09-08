using api.Dtos.Public;

namespace api.Domain.Public.About;

public interface IAboutDomainGet
{
    public Task<ICollection<AboutDetailReadDto>> GetAboutDetails(bool includeIcons);
    public Task<ICollection<CommunityLinkReadDto>> GetCommunityLinks();
}