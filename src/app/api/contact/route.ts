import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getApiKey } from "@/app/api/admin/config/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const subjectMap: { [key: string]: string } = {
      general: "General Inquiry from Garage Boost Contact Form",
      demo: "Demo Request from Garage Boost Contact Form",
      pricing: "Pricing Question from Garage Boost Contact Form",
      support: "Technical Support Request from Garage Boost Contact Form",
      partnership: "Partnership Opportunity from Garage Boost Contact Form",
    };

    const emailSubject = subjectMap[subject] || "New Contact Form Submission";

    // Format phone number or use "Not provided"
    const phoneDisplay = phone ? phone : "Not provided";

    // Get API configuration from database or environment
    let apiKey = await getApiKey("RESEND_API_KEY");
    let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
    const fromName = (await getApiKey("RESEND_FROM_NAME")) || "Garage Boost";

    if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
    if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Email sending is not properly configured. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Send email to Garage Boost support team
    const supportResponse = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: "cs@bizzboost.uk",
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 32px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 8px 8px;">
            <div style="margin-bottom: 24px;">
              <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569; width: 120px;">Name:</td>
                  <td style="padding: 12px 0; color: #0f172a;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569;">Email:</td>
                  <td style="padding: 12px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: 600; color: #475569;">Phone:</td>
                  <td style="padding: 12px 0; color: #0f172a;">${phoneDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #475569;">Subject:</td>
                  <td style="padding: 12px 0; color: #0f172a;">
                    <span style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">
                      ${subject.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 24px;">
              <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</h2>
              <div style="background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb; color: #0f172a; line-height: 1.6;">
                ${message.replace(/\n/g, "<br />")}
              </div>
            </div>

            <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; border-left: 4px solid #22c55e; font-size: 13px; color: #166534;">
              <strong>Respond to:</strong> <a href="mailto:${email}">${email}</a> or <a href="tel:${phone}">${phoneDisplay}</a>
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            <p style="margin: 0;">Garage Boost Contact Form | Submitted on ${new Date().toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}</p>
          </div>
        </div>
      `,
    });

    if (supportResponse.error) {
      console.error("Error sending support email:", supportResponse.error);
      return NextResponse.json(
        { 
          error: "Failed to send contact form. Please try again or contact us directly.",
          details: supportResponse.error 
        },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: email,
      subject: "We Received Your Message - Garage Boost",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 32px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Garage Boost</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 8px 8px;">
            <p style="color: #0f172a; margin: 0 0 16px 0; font-size: 16px;">Hi ${name},</p>
            
            <p style="color: #475569; margin: 0 0 16px 0; line-height: 1.6;">
              Thanks for reaching out! We've received your message and our team will get back to you shortly. We typically respond within 2 hours during business hours (Mon-Fri, 8am-6pm GMT).
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 24px 0;">
              <h3 style="color: #0f172a; margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Subject Received:</h3>
              <p style="color: #0f172a; margin: 0; font-weight: 500;">${subject.replace(/_/g, " ").charAt(0).toUpperCase() + subject.replace(/_/g, " ").slice(1)}</p>
            </div>

            <p style="color: #475569; margin: 0 0 16px 0; line-height: 1.6;">
              In the meantime, if you need immediate assistance, feel free to reach out:
            </p>

            <div style="background: #eff6ff; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <p style="color: #0c4a6e; margin: 0 0 8px 0;"><strong>📞 Phone/WhatsApp:</strong> <a href="tel:07380448187" style="color: #2563eb; text-decoration: none; font-weight: 600;">07380 448187</a></p>
              <p style="color: #0c4a6e; margin: 0;"><strong>📧 Email:</strong> <a href="mailto:cs@bizzboost.uk" style="color: #2563eb; text-decoration: none; font-weight: 600;">cs@bizzboost.uk</a></p>
              <p style="color: #0c4a6e; margin: 8px 0 0 0; font-size: 13px;">Hours: Mon-Fri, 8am-6pm GMT</p>
            </div>

            <p style="color: #475569; margin: 24px 0 0 0; line-height: 1.6;">
              Best regards,<br />
              <strong>The Garage Boost Team</strong><br />
              Great Portland St, London W1W 5PF<br />
              Built by Bizz Boost Ltd
            </p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            <p style="margin: 0;"><a href="https://garageboost.co.uk" style="color: #2563eb; text-decoration: none;">Visit Garage Boost</a> | <a href="https://www.linkedin.com/company/bizz-boost/" style="color: #2563eb; text-decoration: none;">LinkedIn</a> | <a href="https://x.com/BizzBoostUK" style="color: #2563eb; text-decoration: none;">Twitter</a></p>
          </div>
        </div>
      `,
    });

    if (confirmationResponse.error) {
      console.warn("Warning: Could not send confirmation email to user:", confirmationResponse.error);
      // Don't fail the entire request if confirmation email fails
      // The important email (to support) was sent successfully
    }

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        submissionId: supportResponse.data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
