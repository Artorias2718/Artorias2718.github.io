using api.Models;
using api.Dtos.Public;
using AutoMapper;
using System.Net;

namespace api.Profiles.Public;

public class BoostTierProfile : Profile
{
    public BoostTierProfile()
    {
        CreateMap<Parcel, ParcelReadDto>();
    }
}