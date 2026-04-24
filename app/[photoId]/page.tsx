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

  const title = `Explore This Picsum Photo by ${photo.author}`;
  const description = `View a full-size Picsum image by ${photo.author}, explore the photo detail page, and open a clean preview card designed for sharing on Discord and Facebook.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
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

  if (!photo) {
    notFound();
  }

  return <PhotoPageClient photo={photo} photoId={photoId} />;
}
