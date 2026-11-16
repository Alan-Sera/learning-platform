export const apiVersion = "2026-11-16";

function required(name: string, value: string | undefined): string {
  if (!value?.trim()) throw new Error(`Missing environment variable: ${name}`);
  return value.trim();
}

export function getSanityPublicConfig() {
  return {
    projectId: required("NEXT_PUBLIC_SANITY_PROJECT_ID", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    dataset: required("NEXT_PUBLIC_SANITY_DATASET", process.env.NEXT_PUBLIC_SANITY_DATASET),
    apiVersion,
  };
}
