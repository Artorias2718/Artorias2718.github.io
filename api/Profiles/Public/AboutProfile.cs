using api.Models;
using api.Dtos.Public;
using System.Net;
using AutoMapper;

namespace api.Profiles.Public;

public class AboutProfile : Profile
{
    public AboutProfile ()
    {
        CreateMap<AboutDetail, AboutDetailReadDto>();
        CreateMap<CommunityLink, CommunityLinkReadDto>();
    }
}