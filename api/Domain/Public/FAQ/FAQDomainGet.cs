using api.Contexts;
using api.Dtos.Public;
using api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Domain.Public.FAQ;

public class FAQDomainGet(SqlServerContext context, IMapper mapper) : IFAQDomainGet
{
    public async Task<ICollection<FAQGroupReadDto>> GetFAQs()
    {
        var oFAQGroupResult = await context
            .FAQGroups
            .Include(x => x.Questions)
            .AsSplitQuery()
            .ToListAsync();

        return mapper.Map<ICollection<FAQGroupReadDto>>(oFAQGroupResult);
    }
}