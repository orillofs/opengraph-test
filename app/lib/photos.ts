export type Photo = {
  id: string;
  title: string;
  author: string;
  width: number;
  height: number;
  url: string;
  thumbnailUrl: string;
};

type PicsumPhoto = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const API_BASE_URL = "https://picsum.photos";

function mapPhoto(photo: PicsumPhoto): Photo {
  return {
    id: photo.id,
    title: `Photo by ${photo.author}`,
    author: photo.author,
    width: photo.width,
    height: photo.height,
    url: `${API_BASE_URL}/id/${photo.id}/1200/1200`,
    thumbnailUrl: `${API_BASE_URL}/id/${photo.id}/400/300`,
  };
}

export async function getPhotos(limit = 12): Promise<Photo[]> {
  const response = await fetch(`${API_BASE_URL}/v2/list?page=1&limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch photos.");
  }

  const photos: PicsumPhoto[] = await response.json();

  return photos.map(mapPhoto);
}

export async function getPhoto(photoId: string): Promise<Photo | null> {
  const response = await fetch(`${API_BASE_URL}/id/${photoId}/info`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch the photo.");
  }

  const photo: PicsumPhoto = await response.json();

  return mapPhoto(photo);
}
