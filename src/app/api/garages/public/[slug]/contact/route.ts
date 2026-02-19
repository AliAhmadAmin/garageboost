import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getRateLimitKey, getClientIP } from "@/lib/rate-limiter";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { getApiKey } from "@/app/api/admin/config/route";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();
    const recaptchaToken = String(body.recaptchaToken || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const { valid, score } = await verifyRecaptcha(recaptchaToken);
      if (!valid || score < 0.3) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Rate limit by email (5 inquiries per 24 hours)
    const emailLimitKey = getRateLimitKey(email, "contact_email");
    const emailLimit = checkRateLimit(
      emailLimitKey,
      parseInt(process.env.RATE_LIMIT_EMAIL_PER_ADDRESS || "5"),
      parseInt(process.env.RATE_LIMIT_EMAIL_WINDOW_HOURS || "24") * 60
    );

    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: "Too many inquiries. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((emailLimit.resetTime - Date.now()) / 1000)) } }
      );
    }

    const garage = await prisma.garage.findFirst({
      where: {
        isPublic: true,
        OR: [{ slug }, { id: slug }],
      },
      select: { 
        id: true,
        name: true,
        email: true,
      },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Save inquiry to database
    await prisma.garageInquiry.create({
      data: {
        garageId: garage.id,
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    // Send email to garage if configured
    if (garage.email) {
      try {
        let apiKey: string | null = await getApiKey("RESEND_API_KEY");
        let fromEmail: string | null = await getApiKey("RESEND_FROM_EMAIL");

        if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
        if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;

        if (apiKey && fromEmail) {
          const resend = new Resend(apiKey);

          await resend.emails.send({
            from: `Garage Boost <${fromEmail}>`,
            to: garage.email,
            replyTo: email,
            subject: `New Enquiry from ${name} - ${garage.name}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                    .content { background: #f9fafb; padding: 20px; border-radius: 8px; }
                    .field { margin-bottom: 15px; }
                    .field-label { font-weight: 600; color: #1f2937; margin-bottom: 5px; }
                    .field-value { color: #4b5563; word-wrap: break-word; }
                    .contact-info { background: white; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #3b82f6; }
                    .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h2 style="margin: 0;">New Enquiry Received</h2>
                      <p style="margin: 5px 0 0 0;">Someone has sent you a message via your Garage Boost listing</p>
                    </div>

                    <div class="content">
                      <div class="field">
                        <div class="field-label">From:</div>
                        <div class="field-value">${name}</div>
                      </div>

                      <div class="field">
                        <div class="field-label">Email:</div>
                        <div class="field-value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
                      </div>

                      ${phone ? `
                        <div class="field">
                          <div class="field-label">Phone:</div>
                          <div class="field-value"><a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a></div>
                        </div>
                      ` : ''}

                      <div class="field">
                        <div class="field-label">Message:</div>
                        <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                      </div>

                      <div class="contact-info">
                        <strong>Reply to this enquiry:</strong>
                        <p style="margin: 8px 0 0 0;">Simply reply to this email to contact the customer directly.</p>
                      </div>
                    </div>

                    <div class="footer">
                      <p>This is an automated message from Garage Boost. Your customer was notified that their enquiry has been received.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          });
        }
      } catch (emailError) {
        console.error("Failed to send email to garage:", emailError);
        // Don't fail the request if email fails - inquiry is already saved
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Garage inquiry error:", error);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
