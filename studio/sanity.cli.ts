import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  studioHost: "gema-vertex",
  deployment: { appId: "vb5jwmyqwze9xjdpld9cqd6i" },
  typegen: {
    enabled: true,
    path: "../sanity/lib/queries.ts",
    schema: "./schema.json",
    generates: "../sanity/types.ts",
    overloadClientMethods: true,
  },
});
