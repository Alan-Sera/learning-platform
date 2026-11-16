import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./env";
import { schemaTypes } from "./schema-types";
import { structure } from "./structure";

export default defineConfig({
  name: "gema-vertex",
  title: "Gema-Vertex",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
