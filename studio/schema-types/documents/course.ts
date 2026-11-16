import { defineArrayMember, defineField, defineType } from "sanity";
import { BookOpen } from "lucide-react";
import { slugField, studentCountField, validateCourseLessons, type CourseModuleValue } from "../shared";

export const course = defineType({
  name: "course",
  type: "document",
  icon: BookOpen,
  groups: [
    { name: "overview", default: true }, { name: "curriculum" }, { name: "marketing" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "overview", validation: (rule) => rule.required().max(120) }),
    { ...slugField("title"), group: "overview" },
    defineField({ name: "summary", type: "text", rows: 3, group: "overview", validation: (rule) => rule.required().max(600) }),
    defineField({ name: "coverImage", type: "contentImage", group: "overview", validation: (rule) => rule.required().assetRequired() }),
    defineField({ name: "instructor", type: "reference", group: "overview", to: [{ type: "instructor" }], validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "reference", group: "overview", to: [{ type: "category" }], validation: (rule) => rule.required() }),
    defineField({
      name: "level", type: "string", group: "overview",
      options: { list: ["beginner", "intermediate", "advanced"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modules", type: "array", group: "curriculum",
      description: "Drag to set module order. Numbering is derived, never entered manually.",
      of: [defineArrayMember({ type: "module" })],
      validation: (rule) => rule.required().min(1).custom<CourseModuleValue[]>(validateCourseLessons),
    }),
    defineField({
      name: "learningOutcomes", type: "array", group: "curriculum",
      of: [defineArrayMember({ type: "learningOutcome" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "price", type: "number", group: "marketing",
      description: "Amount in major currency units (for example, 49.99 USD). Zero means free.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currency", type: "string", group: "marketing", initialValue: "USD",
      description: "Three-letter ISO 4217 currency code.",
      validation: (rule) => rule.required().regex(/^[A-Z]{3}$/),
    }),
    defineField({ name: "popular", type: "boolean", group: "marketing", initialValue: false }),
    { ...studentCountField, group: "marketing" },
  ],
  preview: { select: { title: "title", subtitle: "instructor.name", media: "coverImage" } },
  orderings: [{ title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] }],
});
