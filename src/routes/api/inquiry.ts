import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendConsultationEmail } from "../../lib/email-service";

// ─── Rate Limiter (in-memory, per IP) ────────────────────────────────────────
const RATE_LIMIT_MAX = 5;        // max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    // First request from this IP or window expired — reset
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterMs: record.resetAt - now };
  }

  record.count++;
  return { allowed: true, retryAfterMs: 0 };
}

// Periodically clean up expired entries to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) rateLimitStore.delete(ip);
  }
}, 15 * 60 * 1000); // every 15 minutes

// ─── Input Sanitiser ──────────────────────────────────────────────────────────
/** Strip HTML/script tags and trim whitespace to prevent XSS in email output */
function sanitizeString(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")   // strip HTML tags
    .replace(/javascript:/gi, "") // strip JS protocol
    .trim();
}

// ─── Validation Schema ────────────────────────────────────────────────────────
const inquirySchema = z.object({
  // Honeypot — must be empty (bots fill this in, humans don't see it)
  _hp: z.string().max(0, "Bot detected").optional(),

  // Required fields
  fullName: z.string().min(1, "Full name is required").max(100, "Name too long"),
  email: z
    .string()
    .email("Invalid email format")
    .max(254, "Email too long")
    .toLowerCase(),
  phone: z.string().min(1, "Phone number is required").max(30, "Phone number too long"),

  // Optional fields — all with reasonable max lengths
  whatsapp:    z.string().max(30).optional(),
  age:         z.string().max(10).optional(),
  gender:      z.string().max(30).optional(),
  location:    z.string().max(100).optional(),
  weight:      z.string().max(20).optional(),
  height:      z.string().max(20).optional(),
  goal:        z.string().min(1, "Goal is required").max(200, "Goal description too long"),
  goalNotes:   z.string().max(1000).optional(),
  experience:  z.string().max(100).optional(),
  profession:  z.string().max(100).optional(),
  activity:    z.string().max(100).optional(),
  workoutTime: z.string().max(100).optional(),
  diet:        z.string().max(200).optional(),
  sleep:       z.string().max(100).optional(),
  medical:     z.string().max(500).optional(),
  medications: z.string().max(500).optional(),
  struggle:    z.string().max(500).optional(),
  previous:    z.string().max(500).optional(),
  motivation:  z.string().max(500).optional(),
  outcome:     z.string().max(500).optional(),
  source:      z.string().max(100).optional(),
  referral:    z.string().max(200).optional(),
  duration:    z.string().max(100).optional(),
  budget:      z.string().max(100).optional(),
  startDate:   z.string().max(50).optional(),
});

// ─── Route Handler ────────────────────────────────────────────────────────────
export const Route = createFileRoute("/api/inquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // ── 1. Rate Limit ──
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          "unknown";

        const { allowed, retryAfterMs } = checkRateLimit(ip);
        if (!allowed) {
          const retryAfterSecs = Math.ceil(retryAfterMs / 1000);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Too many requests. Please try again later.",
            }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": String(retryAfterSecs),
              },
            },
          );
        }

        try {
          // ── 2. Parse & Validate ──
          const body = await request.json();
          const parsed = inquirySchema.parse(body);

          // ── 3. Honeypot Check ──
          if (parsed._hp && parsed._hp.length > 0) {
            // Silently reject bot submissions (return success so bots don't know)
            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          // ── 4. Sanitise Inputs ──
          const sanitized = {
            ...parsed,
            fullName:   sanitizeString(parsed.fullName),
            email:      parsed.email,
            phone:      sanitizeString(parsed.phone),
            goal:       sanitizeString(parsed.goal),
            goalNotes:  parsed.goalNotes  ? sanitizeString(parsed.goalNotes)  : undefined,
            medical:    parsed.medical    ? sanitizeString(parsed.medical)    : undefined,
            medications:parsed.medications? sanitizeString(parsed.medications): undefined,
            struggle:   parsed.struggle   ? sanitizeString(parsed.struggle)   : undefined,
            motivation: parsed.motivation ? sanitizeString(parsed.motivation) : undefined,
            outcome:    parsed.outcome    ? sanitizeString(parsed.outcome)    : undefined,
            referral:   parsed.referral   ? sanitizeString(parsed.referral)   : undefined,
          };

          // ── 5. Send Email ──
          await sendConsultationEmail(sanitized);

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });

        } catch (error: unknown) {
          // ── 6. Error Handling — never leak internal details to client ──
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

          // Log full error server-side only
          console.error("[API /inquiry] Unhandled error:", error);

          return new Response(
            JSON.stringify({
              success: false,
              error: "Something went wrong. Please try again or contact us directly.",
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
