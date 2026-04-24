import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhotoPageClient from "../components/photo-page-client";
import { getPhoto } from "../lib/photos";

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

  const description = `A Picsum photo by ${photo.author} with dimensions ${photo.width}x${photo.height}.`;

  return {
    title: photo.title,
    description,
    openGraph: {
      title: photo.title,
      description,
      type: "website",
      images: [
        {
          url: photo.url,
          width: 600,
          height: 600,
          alt: photo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: photo.title,
      description,
      images: [photo.url],
    },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { photoId } = await params;
  const photo = await getPhoto(photoId);

  if (!photo) {
    notFound();
  }

  return <PhotoPageClient photo={photo} photoId={photoId} />;
}
