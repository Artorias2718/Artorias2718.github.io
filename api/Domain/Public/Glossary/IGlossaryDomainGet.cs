using api.Dtos.Public;
using api.Models;

namespace api.Domain.Public.FAQ;

public interface IGlossaryDomainGet
{
    public Task<ICollection<GlossaryReadDto>> GetGlossary();
}