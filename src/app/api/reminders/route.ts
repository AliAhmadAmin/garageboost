import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { vehicleTitle } from "@/lib/vehicle";
import { formatUKDate } from "@/lib/uk-date";
import { requireGarageAdminAccess, requireSession, requireVehicleAccess } from "@/lib/auth-guards";
import { getAssignmentScope } from "@/lib/access-control";
import { isAdminRole } from "@/lib/session";
import { getApiKey } from "@/app/api/admin/config/route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vehicleId = String(body.vehicleId || "").trim();
    const channel = String(body.channel || "EMAIL").toUpperCase();

    const guard = await requireVehicleAccess(request, vehicleId);
    if ("response" in guard) return guard.response;
    if (guard.staff && getAssignmentScope(guard.staff.accessRole) === "ASSIGNED") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log("[Reminders API] Creating reminder:", { vehicleId, channel });

    if (!vehicleId) {
      console.log("[Reminders API] Missing vehicleId");
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 });
    }

    // Get vehicle details with full garage info
    console.log("[Reminders API] Fetching vehicle:", vehicleId);
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        garage: {
          select: {
            name: true,
            phone: true,
            email: true,
            address: true,
            postcode: true,
          },
        },
      },
    });

    if (!vehicle) {
      console.log("[Reminders API] Vehicle not found:", vehicleId);
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    console.log("[Reminders API] Vehicle found:", { vrm: vehicle.vrm, email: vehicle.ownerEmail });

    // Create reminder record
    const reminder = await prisma.reminder.create({
      data: {
        channel,
        status: channel === "EMAIL" ? "PENDING" : "SCHEDULED",
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : new Date(),
        vehicleId,
      },
    });

    // Send email if channel is EMAIL
    if (channel === "EMAIL") {
      if (!vehicle.ownerEmail) {
        console.log("[Reminders API] No owner email for vehicle:", vehicleId);
        return NextResponse.json(
          { error: "Customer email is required for email reminders" },
          { status: 400 }
        );
      }

      console.log("[Reminders API] Fetching Resend config...");
      let apiKey = await getApiKey("RESEND_API_KEY");
      let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
      const fromName = (await getApiKey("RESEND_FROM_NAME")) || process.env.NEXT_PUBLIC_APP_NAME || "Garage Boost";

      // Fallback to environment variables if not in database
      if (!apiKey) {
        apiKey = process.env.RESEND_API_KEY ?? null;
        console.log("[Reminders API] Using env RESEND_API_KEY:", apiKey ? "found" : "not found");
      }
      if (!fromEmail) {
        fromEmail = process.env.RESEND_FROM_EMAIL ?? null;
        console.log("[Reminders API] Using env RESEND_FROM_EMAIL:", fromEmail ? "found" : "not found");
      }

      if (!apiKey) {
        console.log("[Reminders API] Missing RESEND_API_KEY");
        return NextResponse.json(
          { error: "Email is not configured", details: "Missing RESEND_API_KEY" },
          { status: 400 }
        );
      }
      if (!fromEmail) {
        console.log("[Reminders API] Missing RESEND_FROM_EMAIL");
        return NextResponse.json(
          { error: "Email is not configured", details: "Missing RESEND_FROM_EMAIL" },
          { status: 400 }
        );
      }
      console.log("[Reminders API] Resend config found, sending email...");

      const resend = new Resend(apiKey);
      const ownerName = vehicle.ownerName || "Customer";
      const garageName = vehicle.garage?.name || fromName;
      const garagePhone = vehicle.garage?.phone;
      const garageEmail = vehicle.garage?.email;
      const garageAddress = vehicle.garage?.address;
      const garagePostcode = vehicle.garage?.postcode;
      const motDate = vehicle.motExpiry ? formatUKDate(vehicle.motExpiry) : "Unknown";
      const motDateObj = vehicle.motExpiry ? new Date(vehicle.motExpiry) : null;
      const daysUntilMOT = motDateObj ? Math.ceil((motDateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
      const isUrgent = daysUntilMOT <= 30;

      console.log("[Reminders API] Sending email to:", vehicle.ownerEmail);
      const { error: emailError } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        replyTo: garageEmail || undefined,
        to: vehicle.ownerEmail,
        subject: `⏰ MOT Reminder: ${vehicleTitle(vehicle)} (${vehicle.vrm})`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
                .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 30px 20px; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; }
                .content { background: white; padding: 30px 20px; }
                .vehicle-card { background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 4px; }
                .vehicle-info { margin: 15px 0; }
                .vehicle-info p { margin: 8px 0; }
                .label { font-weight: 600; color: #1f2937; }
                .value { color: #4b5563; }
                .mot-urgent { background: #fee2e2; border-left-color: #dc2626; }
                .mot-expiry { font-size: 18px; color: ${isUrgent ? '#dc2626' : '#0891b2'}; font-weight: 700; }
                .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
                .cta-button:hover { background: #2563eb; }
                .urgency-flag { display: inline-block; background: #dc2626; color: white; padding: 4px 10px; border-radius: 3px; font-size: 12px; font-weight: 600; margin-left: 10px; }
                .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
                .contact-section h3 { margin-top: 0; color: #1f2937; }
                .contact-item { margin: 10px 0; }
                .contact-item a { color: #3b82f6; text-decoration: none; }
                .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
                .greeting { font-size: 16px; color: #1f2937; margin: 0 0 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🔧 ${garageName}</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">MOT Reminder Service</p>
                </div>

                <div class="content">
                  <p class="greeting">Hi ${ownerName},</p>

                  <p style="color: #4b5563;">Your MOT is due soon! Here are the details:</p>

                  <div class="vehicle-card ${isUrgent ? 'mot-urgent' : ''}">
                      <div class="vehicle-info">
                      <div><span class="label">Vehicle:</span> <span class="value">${vehicleTitle(vehicle)}</span></div>
                      <div><span class="label">Registration:</span> <span class="value">${vehicle.vrm}</span></div>
                      <div><span class="label">MOT Expires:</span> <span class="mot-expiry">${motDate}</span>${isUrgent ? '<span class="urgency-flag">⚠️ URGENT - EXPIRES SOON</span>' : ''}</div>
                      <div style="margin-top: 10px; font-size: 13px; color: #6b7280;">That's ${daysUntilMOT} days away</div>
                    </div>
                  </div>

                  <p style="text-align: center; margin: 20px 0;">
                    <a href="${garageEmail ? `mailto:${garageEmail}?subject=Book MOT - ${vehicle.vrm}` : '#'}" class="cta-button" style="color: #ffffff !important;">📅 Book Your MOT Now</a>
                  </p>

                  <div class="contact-section">
                    <h3>📞 Get in Touch</h3>
                    ${garagePhone ? `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${garagePhone}">${garagePhone}</a></div>` : ''}
                    ${garageEmail ? `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${garageEmail}">${garageEmail}</a></div>` : ''}
                    ${garageAddress ? `<div class="contact-item"><strong>Address:</strong> ${garageAddress}${garagePostcode ? ', ' + garagePostcode : ''}</div>` : ''}
                  </div>

                  <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Don't worry – we're here to help! Just give us a call or reply to this email to book your appointment. We'll make sure your vehicle passes its MOT safely.</p>
                </div>

                <div class="footer">
                  <p style="margin: 0;">This is an automated reminder from ${garageName}. If you no longer own this vehicle, please disregard this email.</p>
                  <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} ${garageName}. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (emailError) {
        console.log("[Reminders API] Email send failed:", emailError);
        return NextResponse.json(
          { error: "Failed to send email", details: emailError.message },
          { status: 500 }
        );
      }
      console.log("[Reminders API] Email sent successfully");

      // Update reminder status to SENT
      const updated = await prisma.reminder.update({
        where: { id: reminder.id },
        data: { status: "SENT", sentAt: new Date() },
      });

      return NextResponse.json(updated, { status: 201 });
    }

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("[Reminders API] Reminder create error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create reminder", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = searchParams.get("garageId");

  const sessionResult = await requireSession(request);
  if ("response" in sessionResult) return sessionResult.response;

  if (garageId) {
    const guard = await requireGarageAdminAccess(request, garageId);
    if ("response" in guard) return guard.response;
  } else if (!isAdminRole(sessionResult.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const reminders = await prisma.reminder.findMany({
    where: garageId
      ? {
          vehicle: {
            garageId,
          },
        }
      : undefined,
    include: {
      vehicle: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reminders);
}
