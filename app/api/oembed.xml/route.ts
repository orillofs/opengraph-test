import { handleOEmbedRequest } from "../oembed-shared";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  if (!requestUrl.searchParams.has("format")) {
    requestUrl.searchParams.set("format", "xml");
  }

  return handleOEmbedRequest(new Request(requestUrl, request));
}
