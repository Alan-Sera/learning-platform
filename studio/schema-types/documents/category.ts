import { defineField, defineType } from "sanity";
import { Tags } from "lucide-react";
import { slugField } from "../shared";

export const category = defineType({
  name: "category",
  type: "document",
  icon: Tags,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(80) }),
    slugField("title"),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(400) }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
  orderings: [{ title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] }],
});
