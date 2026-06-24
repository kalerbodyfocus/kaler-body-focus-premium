import nodemailer from "nodemailer";

export interface ConsultationData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  age?: string;
  gender?: string;
  location?: string;
  weight?: string;
  height?: string;
  goal: string;
  goalNotes?: string;
  experience?: string;
  profession?: string;
  activity?: string;
  workoutTime?: string;
  diet?: string;
  sleep?: string;
  medical?: string;
  medications?: string;
  struggle?: string;
  previous?: string;
  motivation?: string;
  outcome?: string;
  source?: string;
  referral?: string;
  duration?: string;
  budget?: string;
  startDate?: string;
}

function generateHtmlTemplate(
  data: ConsultationData,
  dateStr: string,
  timestampStr: string,
): string {
  const gold = "#D4AF37";
  const bg = "#050505";
  const cardBg = "#0F0F0F";
  const border = "#1F1F1F";
  const text = "#FFFFFF";
  const mutedText = "#A0A0A0";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Consultation Application</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: ${bg};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: ${text};
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 24px 16px;
        }
        .card {
          background-color: ${cardBg};
          border: 1px solid ${border};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .header {
          padding: 32px 24px;
          background-color: #080808;
          border-bottom: 1px solid ${border};
          text-align: center;
        }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 11px;
          color: ${gold};
          font-weight: 700;
          margin-bottom: 8px;
        }
        .title {
          font-size: 20px;
          font-weight: 900;
          margin: 0;
          color: ${text};
          letter-spacing: -0.02em;
        }
        .meta {
          font-size: 12px;
          color: ${mutedText};
          margin-top: 12px;
        }
        .section {
          padding: 24px;
          border-bottom: 1px solid ${border};
        }
        .section:last-of-type {
          border-bottom: none;
        }
        .section-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: ${gold};
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 16px;
        }
        .grid-row {
          margin-bottom: 12px;
        }
        .grid-row:last-child {
          margin-bottom: 0;
        }
        .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${mutedText};
          margin-bottom: 4px;
        }
        .value {
          font-size: 14px;
          color: ${text};
          font-weight: 500;
          line-height: 1.4;
        }
        .footer {
          padding: 24px;
          background-color: #080808;
          border-top: 1px solid ${border};
          text-align: center;
          font-size: 11px;
          color: ${mutedText};
          line-height: 1.6;
        }
        .footer-logo {
          font-weight: 900;
          color: ${text};
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <!-- Header -->
          <div class="header">
            <div class="eyebrow">Kaler Body Focus</div>
            <h1 class="title">NEW COACHING APPLICATION</h1>
            <div class="meta">Submission Date: ${dateStr}</div>
          </div>

          <!-- Section 1: Personal Details -->
          <div class="section">
            <h2 class="section-title">Personal Details</h2>
            <div class="grid-row">
              <div class="label">Full Name</div>
              <div class="value">${data.fullName}</div>
            </div>
            <div class="grid-row">
              <div class="label">Email</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="grid-row">
              <div class="label">Phone</div>
              <div class="value">${data.phone}</div>
            </div>
            <div class="grid-row">
              <div class="label">WhatsApp</div>
              <div class="value">${data.whatsapp || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Age</div>
              <div class="value">${data.age || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Gender</div>
              <div class="value">${data.gender || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Location</div>
              <div class="value">${data.location || "Not provided"}</div>
            </div>
          </div>

          <!-- Section 2: Body Statistics -->
          <div class="section">
            <h2 class="section-title">Body Statistics</h2>
            <div class="grid-row">
              <div class="label">Weight (kg)</div>
              <div class="value">${data.weight ? `${data.weight} kg` : "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Height (cm)</div>
              <div class="value">${data.height ? `${data.height} cm` : "Not provided"}</div>
            </div>
          </div>

          <!-- Section 3: Fitness Goals -->
          <div class="section">
            <h2 class="section-title">Fitness Goals</h2>
            <div class="grid-row">
              <div class="label">Primary Goal</div>
              <div class="value">${data.goal}</div>
            </div>
            ${
              data.goalNotes
                ? `
            <div class="grid-row">
              <div class="label">Goal Context / Specifics</div>
              <div class="value">${data.goalNotes}</div>
            </div>
            `
                : ""
            }
          </div>

          <!-- Section 4: Training Background -->
          <div class="section">
            <h2 class="section-title">Training Background</h2>
            <div class="grid-row">
              <div class="label">Training Experience</div>
              <div class="value">${data.experience || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Profession</div>
              <div class="value">${data.profession || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Daily Activity Level</div>
              <div class="value">${data.activity || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Preferred Workout Time</div>
              <div class="value">${data.workoutTime || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Diet Type</div>
              <div class="value">${data.diet || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Sleep Duration</div>
              <div class="value">${data.sleep || "Not provided"}</div>
            </div>
            ${
              data.medical
                ? `
            <div class="grid-row">
              <div class="label">Medical Conditions / Injuries</div>
              <div class="value">${data.medical}</div>
            </div>
            `
                : ""
            }
            ${
              data.medications
                ? `
            <div class="grid-row">
              <div class="label">Current Medications</div>
              <div class="value">${data.medications}</div>
            </div>
            `
                : ""
            }
          </div>

          <!-- Section 5: Challenges -->
          <div class="section">
            <h2 class="section-title">Challenges</h2>
            ${
              data.struggle
                ? `
            <div class="grid-row">
              <div class="label">Biggest Fitness Struggle</div>
              <div class="value">${data.struggle}</div>
            </div>
            `
                : ""
            }
            ${
              data.previous
                ? `
            <div class="grid-row">
              <div class="label">Why Previous Attempts Failed</div>
              <div class="value">${data.previous}</div>
            </div>
            `
                : ""
            }
            ${
              data.motivation
                ? `
            <div class="grid-row">
              <div class="label">Motivation For Joining</div>
              <div class="value">${data.motivation}</div>
            </div>
            `
                : ""
            }
            ${
              data.outcome
                ? `
            <div class="grid-row">
              <div class="label">Expected Outcome</div>
              <div class="value">${data.outcome}</div>
            </div>
            `
                : ""
            }
          </div>

          <!-- Section 6: Commitment Level -->
          <div class="section">
            <h2 class="section-title">Commitment Level</h2>
            <div class="grid-row">
              <div class="label">Coaching Duration</div>
              <div class="value">${data.duration || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Budget Readiness</div>
              <div class="value">${data.budget || "Not provided"}</div>
            </div>
            <div class="grid-row">
              <div class="label">Preferred Start Date</div>
              <div class="value">${data.startDate || "Not provided"}</div>
            </div>
          </div>

          <!-- Section 7: Lead Information -->
          <div class="section">
            <h2 class="section-title">Lead Information</h2>
            <div class="grid-row">
              <div class="label">Lead Source</div>
              <div class="value">${data.source || "Not provided"}</div>
            </div>
            ${
              data.referral
                ? `
            <div class="grid-row">
              <div class="label">Referral Name</div>
              <div class="value">${data.referral}</div>
            </div>
            `
                : ""
            }
            <div class="grid-row">
              <div class="label">Submission Time</div>
              <div class="value">${timestampStr}</div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-logo">KALER BODY FOCUS</div>
            <div>Christchurch, New Zealand</div>
            <div style="margin-top: 12px; font-size: 10px; color: #666666;">
              This lead was generated through the website consultation form.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendConsultationEmail(data: ConsultationData): Promise<boolean> {
  const provider = process.env.EMAIL_PROVIDER || "resend";
  const toEmail = process.env.EMAIL_TO || "pushpak.pandore@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const subject = `New Consultation Application – ${data.fullName}`;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-NZ", { dateStyle: "long" });
  const timestampStr = now.toLocaleTimeString("en-NZ", { timeStyle: "medium" });

  const htmlContent = generateHtmlTemplate(data, dateStr, timestampStr);

  // Fallback to mock mode if provider is "mock" or if Resend key is missing in development
  if (provider === "mock" || (provider === "resend" && !process.env.RESEND_API_KEY)) {
    console.warn("==================================================");
    console.warn("⚠️  MOCK EMAIL SENDER ACTIVATED");
    console.warn(`To: ${toEmail}`);
    console.warn(`From: ${fromEmail}`);
    console.warn(`Subject: ${subject}`);
    console.warn("Application Details:");
    console.warn(JSON.stringify(data, null, 2));
    console.warn("==================================================");
    return true;
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API error response:", errorText);
        throw new Error(`Resend email dispatch failed: ${response.statusText}`);
      }

      return true;
    } catch (e) {
      console.error("Error sending email via Resend:", e);
      throw e;
    }
  } else if (provider === "smtp") {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";

    if (!host || !user || !pass) {
      console.error(
        "SMTP configuration is missing. Set SMTP_HOST, SMTP_USER, SMTP_PASS environment variables.",
      );
      throw new Error("SMTP configuration error.");
    }

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: subject,
        html: htmlContent,
      });

      return true;
    } catch (e) {
      console.error("Error sending email via SMTP:", e);
      throw e;
    }
  } else {
    console.error(`Invalid EMAIL_PROVIDER configured: ${provider}`);
    throw new Error("Invalid email provider configuration.");
  }
}
