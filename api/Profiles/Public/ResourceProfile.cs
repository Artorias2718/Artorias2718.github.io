using api.Models;
using api.Dtos.Public;
using System.Net;
using AutoMapper;

namespace api.Profiles.Public;

public class ResourceProfile : Profile
{
    public ResourceProfile()
    {
        CreateMap<ResourceGroup, ResourceGroupReadDto>()
            .ForMember(
                dest => dest.Category,
                opt =>
                    opt.MapFrom(src =>
                        WebUtility.HtmlDecode(src.Category)
                    ))
            .ForMember(
                dest => dest.Description,
                opt =>
                    opt.MapFrom(src =>
                        WebUtility.HtmlDecode(src.Description)
                    ));

        CreateMap<Resource, ResourceReadDto>()
            .ForMember(
                dest => dest.Description,
                opt =>
                    opt.MapFrom(src =>
                        WebUtility.HtmlDecode(src.Description)
                    ));
    }
}