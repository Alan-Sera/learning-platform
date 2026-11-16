import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { getReadClient } from "./client";
import { getSanityPublicConfig } from "../env";

afterEach(() => vi.unstubAllEnvs());

describe("Private read client", () => {
  it("requires configuration on use rather than module import", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    expect(() => getSanityPublicConfig()).toThrow("NEXT_PUBLIC_SANITY_PROJECT_ID");
  });
  it("refuses anonymous fallback even when public identifiers are configured", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "testproject");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("SANITY_API_READ_TOKEN", "");
    expect(() => getReadClient()).toThrow("SANITY_API_READ_TOKEN");
  });
  it("restricts authenticated reads to published content without stega or CDN", () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "testproject");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
    vi.stubEnv("SANITY_API_READ_TOKEN", "test-only-placeholder-token");
    expect(getReadClient().config()).toMatchObject({
      perspective: "published", useCdn: false, apiVersion: "2026-11-16",
      stega: { enabled: false },
    });
  });
});
