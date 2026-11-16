import { defineField, defineType } from "sanity";
import { Lightbulb } from "lucide-react";

export const learningOutcome = defineType({
  name: "learningOutcome",
  type: "object",
  icon: Lightbulb,
  fields: [
    defineField({
      name: "icon", type: "string", initialValue: "check",
      options: { list: ["check", "code", "layers", "terminal", "rocket", "shield"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(100) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(400) }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
