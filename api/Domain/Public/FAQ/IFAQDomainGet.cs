using api.Dtos.Public;
using api.Models;

namespace api.Domain.Public.FAQ;

public interface IFAQDomainGet
{
    public Task<ICollection<FAQGroupReadDto>> GetFAQs();
}