using api.Contexts;
using api.Dtos.Public;
using api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Domain.Public.FAQ;

public class GlossaryDomainGet(SqlServerContext context, IMapper mapper) : IGlossaryDomainGet
{
    public async Task<ICollection<GlossaryReadDto>> GetGlossary()
    {
        var oGlossaryResult = await context.Glossaries.ToListAsync();
        return mapper.Map<ICollection<GlossaryReadDto>>(oGlossaryResult);
    }
}