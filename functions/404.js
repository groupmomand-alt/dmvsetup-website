// Pages serves 404.html at /404 with status 200 because the file exists.
// Return that same page with status 404 so /404 is not a normal route.
export async function onRequest(context) {
  const asset = await context.env.ASSETS.fetch(context.request);
  if (asset.status >= 300 && asset.status < 400) return asset;
  const headers = new Headers(asset.headers);
  headers.delete("etag");
  headers.delete("content-length");
  headers.set("cache-control", "no-store");
  return new Response(asset.body, {
    status: 404,
    statusText: "Not Found",
    headers,
  });
}
