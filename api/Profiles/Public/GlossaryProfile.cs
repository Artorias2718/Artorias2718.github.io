using api.Models;
using api.Dtos.Public;
using AutoMapper;
using System.Net;

namespace api.Profiles.Public;

public class GlossaryProfile : Profile
{
    public GlossaryProfile()
    {
        CreateMap<Glossary, GlossaryReadDto>()
            .ForMember(
                dest => dest.Term,
                opt =>
                    opt.MapFrom(src =>
                        WebUtility.HtmlDecode(src.Term)
                    ))
            .ForMember(dest => dest.Definition,
                opt =>
                    opt.MapFrom(src =>
                        WebUtility.HtmlDecode(src.Definition)));
    }
}