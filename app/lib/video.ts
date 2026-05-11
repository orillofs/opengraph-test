const VIDEO_VARIANTS = ["bunny", "cat", "corgi", "test"] as const;

function getVariantIndex(photoId: string) {
  const numericId = Number.parseInt(photoId, 10);

  if (Number.isNaN(numericId)) {
    return 0;
  }

  return Math.abs(numericId) % VIDEO_VARIANTS.length;
}

export function getLoremVideoUrl(photoId: string) {
  const variant = VIDEO_VARIANTS[getVariantIndex(photoId)];

  return `https://lorem.video/${variant}_1280x720_h264_30fps_15s_aac_128kbps.mp4`;
}

