import "server-only";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { getSanityPublicConfig } from "../env";

export function urlFor(source: SanityImageSource) {
  const { projectId, dataset } = getSanityPublicConfig();
  return createImageUrlBuilder({ projectId, dataset }).image(source);
}
