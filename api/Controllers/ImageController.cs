using api.Domain.Public.Image;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.StaticFiles;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ImageController(IImageDomainGet domainGet) : ControllerBase
{
    [HttpGet("[action]/{*path}")]
    [OutputCache(Duration = 3600)]
    public async Task<IActionResult> GetImage(string path)
    {
        var bytes = await domainGet.GetImage(path);
        if (bytes is null)
            return NotFound();

        return File(bytes, GetContentType(path));
    }

    private static readonly FileExtensionContentTypeProvider ContentTypes = new();

    // Content type is an HTTP concern, so it's derived here rather than in the domain.
    private static string GetContentType(string path) =>
        ContentTypes.TryGetContentType(path, out var type)
            ? type
            : "application/octet-stream";
}