import { defineField, defineType } from "sanity";

export default defineType({
  name: "transformation",
  title: "Transformation Stat",
  type: "document",
  fields: [
    defineField({
      name: "tag",
      title: "Category Tag",
      type: "string",
      description: "e.g., 'Fat Loss', 'Muscle Gain', 'Strength'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Optional name of the client (e.g. 'Rahul', 'James')",
    }),
    defineField({
      name: "value",
      title: "Metric Value",
      type: "string",
      description: "e.g., '-18kg', '+9kg', '+45%'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Detail Text",
      type: "string",
      description: "e.g., '12-week transformation', 'Lean tissue in 24 weeks'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      description: "Optional photo before starting the transformation",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      description: "Optional photo after completing the transformation",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "order",
      title: "Order Number",
      type: "number",
      description: "Sort order (smaller numbers appear first)",
      initialValue: 0,
    }),
  ],
});
