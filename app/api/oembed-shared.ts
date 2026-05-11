import { NextResponse } from "next/server";
import { getPhoto } from "@/app/lib/photos";
import { getRequestOrigin } from "@/app/lib/site";

function getPhotoIdFromUrl(resourceUrl: URL, origin: string) {
  if (resourceUrl.origin !== origin) {
    return null;
  }

  const [photoId] = resourceUrl.pathname.split("/").filter(Boolean);

  return photoId ?? null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function handleOEmbedRequest(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "json";
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "The `url` query parameter is required." },
      { status: 400 }
    );
  }

  if (format !== "json" && format !== "xml") {
    return NextResponse.json(
      { error: "Only json and xml oEmbed formats are supported." },
      { status: 501 }
    );
  }

  const origin = await getRequestOrigin();
  const resourceUrl = new URL(targetUrl, origin);
  const photoId = getPhotoIdFromUrl(resourceUrl, origin);

  if (!photoId) {
    return NextResponse.json(
      { error: "This oEmbed endpoint only supports local photo detail pages." },
      { status: 404 }
    );
  }

  const photo = await getPhoto(photoId);

  if (!photo) {
    return NextResponse.json({ error: "Photo not found." }, { status: 404 });
  }

  const width = Number.parseInt(searchParams.get("maxwidth") ?? "1280", 10) || 1280;
  const height = Number.parseInt(searchParams.get("maxheight") ?? "720", 10) || 720;
  const clampedWidth = Math.min(width, 1280);
  const clampedHeight = Math.min(height, 720);
  const title = `${photo.title} Video Preview`;
  const embedUrl = `${origin}/embed/${photoId}`;

  const html =
    `<iframe src="${escapeHtml(embedUrl)}" ` +
    `width="${clampedWidth}" height="${clampedHeight}" ` +
    `style="border:0;border-radius:24px;overflow:hidden;background:#0c0a09" ` +
    `allow="autoplay; fullscreen; picture-in-picture" ` +
    `allowfullscreen loading="lazy"></iframe>`;

  const response = {
    version: "1.0",
    type: "video",
    provider_name: "Photo Gallery",
    provider_url: origin,
    title,
    author_name: photo.author,
    width: clampedWidth,
    height: clampedHeight,
    html,
    thumbnail_url: photo.thumbnailUrl,
    thumbnail_width: 1200,
    thumbnail_height: 650,
  };

  if (format === "xml") {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<oembed>
  <version>1.0</version>
  <type>video</type>
  <provider_name>Photo Gallery</provider_name>
  <provider_url>${escapeHtml(origin)}</provider_url>
  <title>${escapeHtml(title)}</title>
  <author_name>${escapeHtml(photo.author)}</author_name>
  <width>${clampedWidth}</width>
  <height>${clampedHeight}</height>
  <html>${escapeHtml(html)}</html>
  <thumbnail_url>${escapeHtml(photo.thumbnailUrl)}</thumbnail_url>
  <thumbnail_width>1200</thumbnail_width>
  <thumbnail_height>650</thumbnail_height>
</oembed>`;

    return new NextResponse(xml, {
      headers: {
        "content-type": "text/xml; charset=utf-8",
      },
    });
  }

  return new NextResponse(JSON.stringify(response, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}
