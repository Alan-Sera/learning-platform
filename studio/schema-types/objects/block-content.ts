import { defineArrayMember, defineField, defineType } from "sanity";
import { AlignLeft } from "lucide-react";

export const blockContent = defineType({
  name: "blockContent",
  type: "array",
  icon: AlignLeft,
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Inline code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link", type: "object",
            fields: [
              defineField({
                name: "href", title: "URL", type: "url",
                validation: (rule) => rule.required().uri({ scheme: ["https", "mailto"], allowRelative: false }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
