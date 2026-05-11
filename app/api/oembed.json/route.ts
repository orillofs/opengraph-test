import { handleOEmbedRequest } from "../oembed-shared";

export async function GET(request: Request) {
  return handleOEmbedRequest(request);
}
