using api.Models;
using api.Dtos.Public;
using AutoMapper;

namespace api.Profiles.Public;

public class FAQProfile : Profile
{
    public FAQProfile()
    {
        CreateMap<FAQGroup, FAQGroupReadDto>()
            .ForMember(
                dest => dest.Category,
                opt =>
                    opt.MapFrom(src =>
                        System.Net.WebUtility.HtmlDecode(src.Category)
                    ));

        CreateMap<FAQ, FAQReadDto>()
            .ForMember(
                dest => dest.Question,
                opt =>
                    opt.MapFrom(src =>
                        System.Net.WebUtility.HtmlDecode(src.Question)
                    ))
            .ForMember(
                dest => dest.Answer,
                opt =>
                    opt.MapFrom(src =>
                        System.Net.WebUtility.HtmlDecode(src.Answer)
                    ));
    }
}