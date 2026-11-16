import { defineField, defineType } from "sanity";
import { Image } from "lucide-react";

export const contentImage = defineType({
  name: "contentImage",
  title: "Image with alternative text",
  type: "image",
  icon: Image,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt", title: "Alternative text", type: "string",
      description: "Describe the image for learners who cannot see it.",
      validation: (rule) => rule.required().max(200),
    }),
  ],
});
