import "server-only";
import type { QueryParams, SanityQueries } from "@sanity/client";
import { getReadClient } from "./client";

export function sanityFetch<Query extends keyof SanityQueries>(
  query: Query,
  params: QueryParams = {},
) {
  return getReadClient().fetch(query, params, {
    perspective: "published",
    stega: false,
    cache: "no-store",
  });
}
