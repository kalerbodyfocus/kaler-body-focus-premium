import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientRole",
      title: "Client Role / Subtitle",
      type: "string",
      description: "e.g., 'Functional Fitness Client', 'Fat Loss Client'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "transformationSummary",
      title: "Transformation Summary",
      type: "string",
      description: "e.g., 'Improved Strength & Balance over 16 Months'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "testimonialText",
      title: "Testimonial Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoFile",
      title: "Testimonial Video File",
      type: "file",
      description: "Upload a video file for this testimonial (MP4, WebM format recommended)",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "videoUrl",
      title: "Testimonial Video URL (External link / Fallback)",
      type: "string",
      description: "Optional: Paste an external video link (e.g. YouTube, Vimeo) or local path if not uploading a file.",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
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
