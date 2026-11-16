import { defineField, defineType } from "sanity";
import { Link } from "lucide-react";

export const resource = defineType({
  name: "resource",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "type", type: "string",
      options: { list: ["article", "documentation", "repository", "download"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "description", type: "text", rows: 2, validation: (rule) => rule.required().max(400) }),
    defineField({ name: "url", title: "URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["https"], allowRelative: false }) }),
  ],
  preview: { select: { title: "title", subtitle: "type" } },
});
