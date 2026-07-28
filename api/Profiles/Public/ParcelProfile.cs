using api.Models;
using api.Dtos.Public;
using AutoMapper;
using System.Net;

namespace api.Profiles.Public;

public class ParcelProfile : Profile
{
    public ParcelProfile()
    {
        CreateMap<Parcel, ParcelReadDto>();
    }
}