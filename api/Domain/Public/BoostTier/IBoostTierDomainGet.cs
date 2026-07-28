using api.Dtos.Public;
using api.Models;

namespace api.Domain.Public.FAQ;

public interface IBoostTierDomainGet
{
    public Task<ICollection<ParcelReadDto>> GetParcels();
}