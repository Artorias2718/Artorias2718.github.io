using api.Dtos.Public;
using api.Models;

namespace api.Domain.Public.Resource;

public interface IResourceDomainGet
{
    public Task<ICollection<ResourceGroupReadDto>> GetResources();
}