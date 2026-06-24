import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendConsultationEmail } from "../../lib/email-service";

const inquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  whatsapp: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  goal: z.string().min(1, "Goal is required"),
  goalNotes: z.string().optional(),
  experience: z.string().optional(),
  profession: z.string().optional(),
  activity: z.string().optional(),
  workoutTime: z.string().optional(),
  diet: z.string().optional(),
  sleep: z.string().optional(),
  medical: z.string().optional(),
  medications: z.string().optional(),
  struggle: z.string().optional(),
  previous: z.string().optional(),
  motivation: z.string().optional(),
  outcome: z.string().optional(),
  source: z.string().optional(),
  referral: z.string().optional(),
  duration: z.string().optional(),
  budget: z.string().optional(),
  startDate: z.string().optional(),
});

export const Route = createFileRoute("/api/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsedData = inquirySchema.parse(body);

          await sendConsultationEmail(parsedData);

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: unknown) {
          console.error("API error handling inquiry:", error);
          if (error instanceof z.ZodError) {
            return new Response(
              JSON.stringify({
                success: false,
                error: "Validation failed",
                details: error.issues,
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const errorMessage =
            error instanceof Error ? error.message : "Failed to process application";
          return new Response(
            JSON.stringify({
              success: false,
              error: errorMessage,
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
