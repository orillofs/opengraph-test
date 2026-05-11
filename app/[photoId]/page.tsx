import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhotoPageClient from "../components/photo-page-client";
import { getPhoto } from "../lib/photos";
import { getRequestOrigin } from "../lib/site";
import { getLoremVideoUrl } from "../lib/video";
type PhotoPageProps = {
  params: Promise<{ photoId: string }>;
};

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const { photoId } = await params;
  const photo = await getPhoto(photoId);

  if (!photo) {
    return {
      title: "Photo Not Found",
    };
  }

  const title = `Explore This Picsum Photo by ${photo.author}`;
  const description = `View a full-size Picsum image by ${photo.author}, explore the photo detail page, and open a clean preview card designed for sharing on Discord and Facebook.`;
  const origin = await getRequestOrigin();
  const pageUrl = `${origin}/${photoId}`;
  const videoUrl = getLoremVideoUrl(photoId);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      videos: [
        {
          url: videoUrl,
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { photoId } = await params;
  const photo = await getPhoto(photoId);
  const origin = await getRequestOrigin();
  const pageUrl = `${origin}/${photoId}`;
  const oEmbedUrl = (format: string) => `${origin}/api/oembed.${format}?url=${encodeURIComponent(pageUrl)}`;
  if (!photo) {
    notFound();
  }

  return <>
    <head>
      <link
        rel="alternate"
        type="application/json+oembed"
        href={oEmbedUrl("json")}
        title={`oEmbed for photo ${photoId}`}
      />
      <link
        rel="alternate"
        type="text/xml+oembed"
        href={`${oEmbedUrl("xml")}&format=xml`}
        title={`oEmbed XML for photo ${photoId}`}
      />
    </head>
    <PhotoPageClient photo={photo} photoId={photoId} />;
  </>
}
