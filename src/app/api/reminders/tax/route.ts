import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { vehicleTitle } from "@/lib/vehicle";
import { formatUKDate } from "@/lib/uk-date";
import { requireVehicleAccess } from "@/lib/auth-guards";
import { getAssignmentScope } from "@/lib/access-control";
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

    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 });
    }

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
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    if (!vehicle.taxExpiry) {
      return NextResponse.json({ error: "Tax expiry date is not available for this vehicle" }, { status: 400 });
    }

    const reminder = await prisma.reminder.create({
      data: {
        channel,
        status: channel === "EMAIL" ? "TAX_PENDING" : "TAX_SCHEDULED",
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : new Date(),
        vehicleId,
      },
    });

    if (channel !== "EMAIL") {
      return NextResponse.json(reminder, { status: 201 });
    }

    if (!vehicle.ownerEmail) {
      return NextResponse.json(
        { error: "Customer email is required for tax reminders" },
        { status: 400 }
      );
    }

    let apiKey: string | null = await getApiKey("RESEND_API_KEY");
    let fromEmail: string | null = await getApiKey("RESEND_FROM_EMAIL");
    const fromName = (await getApiKey("RESEND_FROM_NAME")) || vehicle.garage?.name || "Garage Boost";

    if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
    if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Email is not configured", details: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const ownerName = vehicle.ownerName || "Customer";
    const garageName = vehicle.garage?.name || fromName;
    const garagePhone = vehicle.garage?.phone;
    const garageEmail = vehicle.garage?.email;
    const garageAddress = vehicle.garage?.address;
    const garagePostcode = vehicle.garage?.postcode;
    const taxDate = formatUKDate(vehicle.taxExpiry);
    const daysUntilTax = Math.ceil((new Date(vehicle.taxExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isUrgent = daysUntilTax <= 14;

    const { error: emailError } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      replyTo: garageEmail || undefined,
      to: vehicle.ownerEmail,
      subject: `🧾 Road Tax Reminder: ${vehicleTitle(vehicle)} (${vehicle.vrm})`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
              .header { background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); color: white; padding: 30px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background: white; padding: 30px 20px; }
              .vehicle-card { background: #f3f4f6; border-left: 4px solid #0f766e; padding: 20px; margin: 20px 0; border-radius: 4px; }
              .vehicle-info { margin: 15px 0; }
              .vehicle-info p { margin: 8px 0; }
              .label { font-weight: 600; color: #1f2937; }
              .value { color: #4b5563; }
              .urgent { background: #fef2f2; border-left-color: #dc2626; }
              .tax-expiry { font-size: 18px; color: ${isUrgent ? "#dc2626" : "#0f766e"}; font-weight: 700; }
              .cta-button { display: inline-block; background: #0f766e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
              .cta-button:hover { background: #0d5e56; }
              .contact-section { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
              .contact-section h3 { margin-top: 0; color: #1f2937; }
              .contact-item { margin: 10px 0; }
              .contact-item a { color: #0f766e; text-decoration: none; }
              .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
              .greeting { font-size: 16px; color: #1f2937; margin: 0 0 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🧾 ${garageName}</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Road Tax Reminder</p>
              </div>

              <div class="content">
                <p class="greeting">Hi ${ownerName},</p>

                <p style="color: #4b5563;">Your road tax is due soon. Here are the details:</p>

                  <div class="vehicle-card ${isUrgent ? "urgent" : ""}">
                  <div class="vehicle-info">
                    <div><span class="label">Vehicle:</span> <span class="value">${vehicleTitle(vehicle)}</span></div>
                    <div><span class="label">Registration:</span> <span class="value">${vehicle.vrm}</span></div>
                    <div><span class="label">Tax Expires:</span> <span class="tax-expiry">${taxDate}</span></div>
                    <div style="margin-top: 10px; font-size: 13px; color: #6b7280;">That's ${daysUntilTax} days away</div>
                  </div>
                </div>

                <p style="text-align: center; margin: 20px 0;">
                  <a href="https://www.gov.uk/vehicle-tax" class="cta-button" style="color: #ffffff !important;">Renew Road Tax</a>
                </p>

                <div class="contact-section">
                  <h3>📞 Get in Touch</h3>
                  ${garagePhone ? `<div class="contact-item"><strong>Phone:</strong> <a href="tel:${garagePhone}">${garagePhone}</a></div>` : ""}
                  ${garageEmail ? `<div class="contact-item"><strong>Email:</strong> <a href="mailto:${garageEmail}">${garageEmail}</a></div>` : ""}
                  ${garageAddress ? `<div class="contact-item"><strong>Address:</strong> ${garageAddress}${garagePostcode ? ", " + garagePostcode : ""}</div>` : ""}
                </div>

                <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">If you no longer own this vehicle, please disregard this email.</p>
              </div>

              <div class="footer">
                <p style="margin: 0;">This is an automated reminder from ${garageName}.</p>
                <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} ${garageName}. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      return NextResponse.json(
        { error: "Failed to send email", details: emailError.message },
        { status: 500 }
      );
    }

    const updated = await prisma.reminder.update({
      where: { id: reminder.id },
      data: { status: "TAX_SENT", sentAt: new Date() },
    });

    return NextResponse.json(updated, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create tax reminder", details: errorMessage },
      { status: 500 }
    );
  }
}
