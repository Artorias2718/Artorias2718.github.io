using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

namespace api.Domain.Public.Image;

public class ImageDomainGet(
    IWebHostEnvironment env,
    IServiceProvider services,
    IHttpClientFactory httpClientFactory,
    HashSet<string> allowedRemoteHosts) : IImageDomainGet
{
    // Local → your Blob → external allowlisted URL, first hit wins.
    public async Task<byte[]?> GetImage(string path)
    {
        // An absolute http(s) URL means "go fetch this external image".
        if (Uri.TryCreate(path, UriKind.Absolute, out var uri) &&
            (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps))
        {
            return await GetExternalImage(uri);
        }

        // Otherwise it's a filename → local first, then your own Blob.
        return await GetLocalImage(path) ?? await GetRemoteImage(path);
    }

    private async Task<byte[]?> GetLocalImage(string path)
    {
        var root = Path.Combine(env.ContentRootPath, "Resources", "Images");
        var fullPath = Path.GetFullPath(Path.Combine(root, path));

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
        var blobService = services.GetService<BlobServiceClient>();
        if (blobService is null)
            return null;

        var blobName = $"Resources/Images/{path}";
        var blob = blobService
            .GetBlobContainerClient("atlasearthhqapi")
            .GetBlobClient(blobName);

        if (!await blob.ExistsAsync())
            return null;

        var result = await blob.DownloadContentAsync();
        return result.Value.Content.ToArray();
    }

    private async Task<byte[]?> GetExternalImage(Uri uri)
    {
        // Allowlist check — the whole point. Reject anything we didn't sanction,
        // which is what stops SSRF at the metadata endpoint / internal network.
        if (!allowedRemoteHosts.Contains(uri.Host))
            return null;

        var http = httpClientFactory.CreateClient("remote-images");

        try
        {
            using var resp = await http.GetAsync(uri);
            if (!resp.IsSuccessStatusCode)
                return null;

            // Optional: confirm it's actually an image, not an HTML error page.
            var contentType = resp.Content.Headers.ContentType?.MediaType;
            if (contentType is not null && !contentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
                return null;

            return await resp.Content.ReadAsByteArrayAsync();
        }
        catch (HttpRequestException)
        {
            return null; // host unreachable, DNS fail, etc. → treat as not found
        }
    }
}