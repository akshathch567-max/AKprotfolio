import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // --- Validation ---
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name." },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@akshathch.dev";

    // --- Send email via Resend (if API key is set) ---
    if (RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [TO_EMAIL],
          subject: `New message from ${name.trim()} via Portfolio`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
              <h2 style="color: #818cf8; margin-top: 0;">📬 New Portfolio Contact</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 80px;">Name</td>
                  <td style="padding: 8px 0; font-weight: 600;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: #1e293b; border-radius: 8px; border-left: 3px solid #6366f1;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
              </div>
              <p style="margin-top: 24px; color: #475569; font-size: 12px;">Sent from your portfolio contact form.</p>
            </div>
          `,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Resend error:", err);
        return NextResponse.json(
          { success: false, error: "Failed to send email. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // Dev fallback — just log to console
      console.log("\n📬 New Contact Form Submission:");
      console.log("  Name   :", name.trim());
      console.log("  Email  :", email);
      console.log("  Message:", message.trim());
      console.log("  (Set RESEND_API_KEY in .env.local to send real emails)\n");
    }

    return NextResponse.json(
      { success: true, message: "Message received! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
