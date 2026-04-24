"use client";

import Image from "next/image";
import Link from "next/link";
import type { Photo } from "../lib/photos";

type PhotoPageClientProps = {
  photo: Photo;
  photoId: string;
};

export default function PhotoPageClient({
  photo,
  photoId,
}: PhotoPageClientProps) {
  return (
    <main className="min-h-screen bg-stone-100 px-6 py-12 text-stone-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <Link
          href="/"
          className="w-fit text-sm font-medium text-stone-600 transition hover:text-stone-950"
        >
          Back to photos
        </Link>

        <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_80px_rgba(28,25,23,0.12)] lg:grid-cols-[1.3fr_0.9fr]">
          <Image
            src={photo.url}
            alt={photo.title}
            width={600}
            height={600}
            className="h-full min-h-[320px] w-full object-cover"
          />

          <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              {photo.author}
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              {photo.title}
            </h1>
            <p className="text-base leading-7 text-stone-600">
              This page is rendered from the dynamic route
              <code className="mx-1 rounded bg-stone-100 px-2 py-1 text-sm text-stone-900">
                /{photoId}
              </code>
              using Picsum public API data.
            </p>
            <p className="text-sm text-stone-500">
              Photo ID: {photo.id} · {photo.width}x{photo.height}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
