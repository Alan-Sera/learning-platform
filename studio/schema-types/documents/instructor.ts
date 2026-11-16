import { defineField, defineType } from "sanity";
import { UserRound } from "lucide-react";
import { slugField } from "../shared";

export const instructor = defineType({
  name: "instructor",
  type: "document",
  icon: UserRound,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required().max(120) }),
    slugField("name"),
    defineField({ name: "photo", type: "contentImage", validation: (rule) => rule.required().assetRequired() }),
    defineField({ name: "expertise", type: "string", validation: (rule) => rule.required().max(200) }),
    defineField({ name: "bio", type: "blockContent", validation: (rule) => rule.required().min(1) }),
  ],
  preview: { select: { title: "name", subtitle: "expertise", media: "photo" } },
  orderings: [{ title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] }],
});
