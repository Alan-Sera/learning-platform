import { defineArrayMember, defineField, defineType } from "sanity";
import { ListOrdered } from "lucide-react";

export const moduleType = defineType({
  name: "module",
  type: "object",
  icon: ListOrdered,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (rule) => rule.required().max(600) }),
    defineField({
      name: "lessons", type: "array",
      description: "Drag to set lesson order. Lesson numbers are derived from this order.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "lesson" }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "title", lessons: "lessons" },
    prepare: ({ title, lessons }) => ({ title, subtitle: `${lessons?.length ?? 0} lessons` }),
  },
});
