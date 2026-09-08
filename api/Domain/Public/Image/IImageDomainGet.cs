namespace api.Domain.Public.Image;

public interface IImageDomainGet
{
    public Task<byte[]?> GetImage(string path);
}
