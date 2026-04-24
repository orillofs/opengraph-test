import { ImageResponse } from "next/og";
import { getPhoto } from "../lib/photos";

export const alt = "Photo preview card with headline and call to action";
export const size = {
  width: 1200,
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

  const headline = photo
    ? `Explore This Photo by ${photo.author}`
    : "Explore This Featured Photo";

  const subheadline = photo
    ? `Open the full photo page and view a high-resolution image from Picsum.`
    : "Open the full page to view the image.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "linear-gradient(135deg, #111827 0%, #1f2937 45%, #d97706 100%)",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 30%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.14)",
                fontSize: 24,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Picsum Photo Preview
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 840,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            >
              {headline}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                lineHeight: 1.35,
                color: "rgba(245,245,244,0.86)",
              }}
            >
              {subheadline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "rgba(245,245,244,0.72)",
              }}
            >
              {photo ? `Photo ID ${photo.id}` : "Photo details"}
            </div>
            <div
              style={{
                display: "flex",
                padding: "18px 28px",
                borderRadius: 9999,
                background: "#f59e0b",
                color: "#111827",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              View Full Photo
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
