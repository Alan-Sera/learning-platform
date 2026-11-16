import "server-only";
import { createClient } from "next-sanity";
import { getSanityPublicConfig } from "../env";

export function getReadClient() {
  const config = getSanityPublicConfig();
  const token = process.env.SANITY_API_READ_TOKEN?.trim();
  if (!token) throw new Error("Missing environment variable: SANITY_API_READ_TOKEN");

  return createClient({
    ...config,
    token,
    perspective: "published",
    useCdn: false,
    stega: false,
  });
}
