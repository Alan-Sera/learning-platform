import { defineArrayMember, defineField, defineType } from "sanity";
import { Video } from "lucide-react";
import { slugField, studentCountField } from "../shared";

export const lesson = defineType({
  name: "lesson",
  type: "document",
  icon: Video,
  groups: [{ name: "overview", default: true }, { name: "teaching" }],
  fields: [
    defineField({ name: "title", type: "string", group: "overview", validation: (rule) => rule.required().max(120) }),
    { ...slugField("title"), group: "overview" },
    defineField({
      name: "videoUrl", title: "Video URL", type: "url", group: "overview",
      description: "Provider-hosted video URL. Playback and caption ingestion are separate integrations.",
      validation: (rule) => rule.required().uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({ name: "poster", type: "contentImage", group: "overview", validation: (rule) => rule.required().assetRequired() }),
    defineField({
      name: "durationSeconds", type: "number", group: "overview",
      description: "Full lesson duration as a positive integer number of seconds.",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({ name: "freePreview", type: "boolean", group: "overview", initialValue: false, description: "Display label only; this does not grant access." }),
    { ...studentCountField, group: "overview" },
    defineField({ name: "notes", type: "blockContent", group: "teaching", validation: (rule) => rule.required().min(1) }),
    defineField({
      name: "keyPoints", type: "array", group: "teaching",
      of: [defineArrayMember({ type: "string", validation: (rule) => rule.required().max(200) })],
      validation: (rule) => rule.max(8).unique(),
    }),
    defineField({ name: "proTip", type: "text", rows: 3, group: "teaching", validation: (rule) => rule.max(600) }),
    defineField({
      name: "resources", type: "array", group: "teaching",
      of: [defineArrayMember({ type: "resource" })],
      validation: (rule) => rule.max(20),
    }),
  ],
  preview: { select: { title: "title", media: "poster" } },
  orderings: [{ title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] }],
});
