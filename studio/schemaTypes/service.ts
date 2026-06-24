import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Coaching Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Service Description",
      type: "text",
      description: "Brief summary of what this service offers.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Service Icon",
      type: "string",
      initialValue: "Dumbbell",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Dumbbell (Workout / Strength)", value: "Dumbbell" },
          { title: "Activity (Cardio / Tracking)", value: "Activity" },
          { title: "Target (Goals / Directing)", value: "Target" },
          { title: "Trophy (Success / Hypertrophy)", value: "Trophy" },
          { title: "Shield (Safety / Strength)", value: "Shield" },
          { title: "Apple (Nutrition / Diet)", value: "Apple" },
          { title: "Heart (Cardio / Injury Rehab)", value: "Heart" },
          { title: "Brain (Mindset / Habits)", value: "Brain" },
          { title: "Star (Premium / Highlights)", value: "Star" },
          { title: "Clock (Flexible / Time)", value: "Clock" },
          { title: "ChevronRight (Advanced / Next Level)", value: "ChevronRight" },
        ],
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
