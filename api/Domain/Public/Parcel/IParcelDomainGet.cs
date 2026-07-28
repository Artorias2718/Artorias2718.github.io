using api.Dtos.Public;
using api.Models;

namespace api.Domain.Public.FAQ;

public interface IParcelDomainGet
{
    public Task<ICollection<ParcelReadDto>> GetParcels();
}