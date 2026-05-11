/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getPhoto } from "../lib/photos";

export const alt = "Photo preview card with headline and call to action";
export const size = {
  width: 630,
  height: 630,
};
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ photoId: string }>;
};

export default async function OpenGraphImage({
  params,
}: OpenGraphImageProps) {
  const { photoId } = await params;
  const photo = await getPhoto(photoId);

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(226, 232, 240) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={photo?.thumbnailUrl}
          alt={photo?.title}
          style={{
            width: "630px",
            height: "630px",
            objectFit: "contain",
            objectPosition: "center",
          }}
          />
      </div>
    ),
    size
  );
}
