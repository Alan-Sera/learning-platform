function required(name: string, value: string | undefined) {
  if (!value?.trim()) throw new Error(`Missing environment variable: ${name}`);
  return value.trim();
}

export const projectId = required("SANITY_STUDIO_PROJECT_ID", process.env.SANITY_STUDIO_PROJECT_ID);
export const dataset = required("SANITY_STUDIO_DATASET", process.env.SANITY_STUDIO_DATASET);
export const apiVersion = "2026-11-16";
