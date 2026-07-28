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
        var oFAQGroupResult = await context.FAQGroups.ToListAsync();
        var oFAQResult = await context.FAQs.ToListAsync();

        // oFAQResult.AsParallel().ForAll(x =>
        // {
        //     x.FaqGroup
        // });
        oFAQGroupResult.AsParallel().ForAll(x =>
        {
            x.Questions = oFAQResult.Where(y => x.Id == y.FaqGroupId).ToList();
        });

        return mapper.Map<ICollection<FAQGroupReadDto>>(oFAQGroupResult);
    }
}