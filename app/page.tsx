import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPhotos } from "./lib/photos";

export const metadata: Metadata = {
  title: "Photos",
  description: "A photo list loaded from Picsum.",
};

export default async function Home() {
  const photos = await getPhotos();

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-12 text-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
            Public API demo
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Photos
          </h1>
          <p className="max-w-2xl text-base text-stone-300 sm:text-lg">
            A small gallery powered by Picsum. Each card links to its dedicated
            photo page.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/${photo.id}`}
              className="group overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 transition hover:border-stone-700 hover:bg-stone-800/80"
            >
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                width={150}
                height={150}
                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
              <div className="flex flex-col gap-3 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  {photo.author}
                </p>
                <h2 className="text-lg font-medium leading-7 text-stone-100">
                  {photo.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
