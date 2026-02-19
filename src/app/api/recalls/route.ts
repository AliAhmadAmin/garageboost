import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { getApiKey } from "@/app/api/admin/config/route";
import { vehicleTitle } from "@/lib/vehicle";
import { requireGarageAccess, requireVehicleAccess } from "@/lib/auth-guards";

async function fetchDVSARecalls(vrm: string, apiKey: string) {
  const response = await fetch(
    `https://beta.check-mot.service.gov.uk/trade/vehicles/recalls?registration=${vrm}`,
    {
      method: "GET",
      headers: {
        "Accept": "application/json+v6",
        "x-api-key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`DVSA API error: ${response.status}`);
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vehicleId = String(body.vehicleId || "").trim();
    const notify = body.notify !== false;

    if (!vehicleId) {
      return NextResponse.json({ error: "Vehicle ID is required" }, { status: 400 });
    }

    const guard = await requireVehicleAccess(request, vehicleId);
    if ("response" in guard) return guard.response;

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

    const dvsaApiKey = await getApiKey("DVSA_API_KEY");
    console.log("[DEBUG] DVSA_API_KEY loaded:", dvsaApiKey ? dvsaApiKey.slice(0, 6) + "..." : dvsaApiKey);
    if (!dvsaApiKey) {
      return NextResponse.json(
        { error: "DVSA API key not configured" },
        { status: 400 }
      );
    }

    const data = await fetchDVSARecalls(vehicle.vrm, dvsaApiKey);
    const recalls = Array.isArray(data?.recalls) ? data.recalls : Array.isArray(data) ? data : [];

    let addedCount = 0;
    let notifiedCount = 0;

    for (const recall of recalls) {
      const recallTitle = recall.recallTitle || recall.title || recall.defect || "Recall";
      const issuedDateRaw = recall.dateOfIssue || recall.issueDate || recall.issuedDate || recall.date || new Date().toISOString();
      const issuedDate = new Date(issuedDateRaw);
      const description = recall.description || recall.defect || recall.descriptionOfRecall || "Recall notice issued.";
      const remedy = recall.remedy || recall.remedialAction || "Contact the manufacturer for remedy.";
      const risk = String(recall.risk || recall.severity || "MEDIUM").toUpperCase();

      const existing = await prisma.recall.findFirst({
        where: {
          vehicleId: vehicle.id,
          recallTitle,
          issuedDate,
        },
      });

      if (existing) {
        continue;
      }

      const createdRecall = await prisma.recall.create({
        data: {
          vrm: vehicle.vrm,
          make: vehicle.make,
          model: vehicle.model,
          buildDateFrom: recall.buildDateFrom || recall.buildDateStart || null,
          buildDateTo: recall.buildDateTo || recall.buildDateEnd || null,
          recallTitle,
          description,
          risk,
          remedy,
          issuedDate,
          vehicleId: vehicle.id,
        },
      });

      addedCount += 1;

      if (notify && vehicle.ownerEmail) {
        let apiKey: string | null = await getApiKey("RESEND_API_KEY");
        let fromEmail: string | null = await getApiKey("RESEND_FROM_EMAIL");
        const fromName = (await getApiKey("RESEND_FROM_NAME")) || vehicle.garage?.name || "Garage Boost";

        if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
        if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;

        if (apiKey && fromEmail) {
          const resend = new Resend(apiKey);
          const garageName = vehicle.garage?.name || fromName;
          const garageEmail = vehicle.garage?.email || undefined;

          await resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            replyTo: garageEmail,
            to: vehicle.ownerEmail,
            subject: `🛡️ Safety Recall Notice: ${vehicleTitle(vehicle)} (${vehicle.vrm})`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
                    .header { background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; padding: 30px 20px; text-align: center; }
                    .header h1 { margin: 0; font-size: 24px; }
                    .content { background: white; padding: 30px 20px; }
                    .recall-card { background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 4px; }
                    .label { font-weight: 600; color: #1f2937; }
                    .value { color: #4b5563; }
                    .cta-button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
                    .cta-button:hover { background: #b91c1c; }
                    .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>🛡️ ${garageName}</h1>
                      <p style="margin: 10px 0 0 0; opacity: 0.9;">Safety Recall Notice</p>
                    </div>

                    <div class="content">
                      <p>We found an official safety recall for your vehicle:</p>

                      <div class="recall-card">
                        <p><span class="label">Vehicle:</span> <span class="value">${vehicleTitle(vehicle)}</span></p>
                        <p><span class="label">Registration:</span> <span class="value">${vehicle.vrm}</span></p>
                        <p><span class="label">Recall:</span> <span class="value">${recallTitle}</span></p>
                        <p><span class="label">Risk:</span> <span class="value">${risk}</span></p>
                        <p><span class="label">Details:</span> <span class="value">${description}</span></p>
                        <p><span class="label">Remedy:</span> <span class="value">${remedy}</span></p>
                      </div>

                      <p style="text-align: center;">
                        <a href="mailto:${vehicle.garage?.email || ""}" class="cta-button" style="color: #ffffff !important;">Book Recall Repair</a>
                      </p>
                    </div>

                    <div class="footer">
                      <p style="margin: 0;">This is an automated safety notice from ${garageName}.</p>
                      <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} ${garageName}. All rights reserved.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          });

          await prisma.recall.update({
            where: { id: createdRecall.id },
            data: { notified: true, notifiedAt: new Date() },
          });

          notifiedCount += 1;
        }
      }
    }

    return NextResponse.json({ added: addedCount, notified: notifiedCount });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to check recalls", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const garageId = searchParams.get("garageId");

  if (!garageId) {
    return NextResponse.json({ error: "garageId is required" }, { status: 400 });
  }
  const guard = await requireGarageAccess(request, garageId);
  if ("response" in guard) return guard.response;
  const recalls = await prisma.recall.findMany({
    where: {
      vehicle: {
        garageId,
      },
    },
    orderBy: { issuedDate: "desc" },
  });

  return NextResponse.json(recalls);
}
