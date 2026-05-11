import { notFound } from "next/navigation";
import { getPhoto } from "@/app/lib/photos";
import { getLoremVideoUrl } from "@/app/lib/video";

type EmbedPageProps = {
  params: Promise<{ photoId: string }>;
};

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { photoId } = await params;
  const photo = await getPhoto(photoId);

  if (!photo) {
    notFound();
  }

  const videoUrl = getLoremVideoUrl(photoId);

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 p-0">
      <video
        controls
        playsInline
        preload="metadata"
        poster={photo.thumbnailUrl}
        className="h-screen w-screen bg-black object-contain"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </main>
  );
}

