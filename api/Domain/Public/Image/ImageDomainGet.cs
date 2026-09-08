using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace api.Domain.Public.Image;

public class ImageDomainGet(IWebHostEnvironment env, IServiceProvider services) : IImageDomainGet
{
    // Local if it lives in Assets/Images; otherwise fall back to Blob Storage.
    public async Task<byte[]?> GetImage(string path) =>
        await GetLocalImage(path) ?? await GetRemoteImage(path);

    private async Task<byte[]?> GetLocalImage(string path)
    {
        var root = Path.Combine(env.ContentRootPath, "Resources", "Images");
        var fullPath = Path.GetFullPath(Path.Combine(root, path));

        // path comes from the caller, so guard against traversal (../../secrets).
        var rootWithSep = root.EndsWith(Path.DirectorySeparatorChar)
            ? root
            : root + Path.DirectorySeparatorChar;
        if (!fullPath.StartsWith(rootWithSep, StringComparison.OrdinalIgnoreCase))
            return null;

        if (!File.Exists(fullPath))
            return null;

        return await File.ReadAllBytesAsync(fullPath);
    }

    private async Task<byte[]?> GetRemoteImage(string path)
    {
        // Blob isn't registered when Storage:BlobUri is unset (e.g. local dev),
        // so GetService returns null and we treat the image as not found remotely.
        var blobService = services.GetService<BlobServiceClient>();
        if (blobService is null)
            return null;

        var blob = blobService.GetBlobContainerClient("images").GetBlobClient(path);
        if (!await blob.ExistsAsync())
            return null;

        var result = await blob.DownloadContentAsync();
        return result.Value.Content.ToArray();
    }
}