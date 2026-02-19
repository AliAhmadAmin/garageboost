import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";
import { getApiKey } from "@/app/api/admin/config/route";
import { formatUKDate } from "@/lib/uk-date";
import { processEmailQueue } from "@/lib/email-queue-processor";

type RecipientPayload = {
  email: string;
  name: string;
  customerId?: string;
  vrm?: string;
  make?: string;
  model?: string;
  motExpiry?: Date | null;
};

function applyTemplate(template: string, recipient: RecipientPayload, garageName: string) {
  return template
    .replace(/{name}/g, recipient.name || "Customer")
    .replace(/{vrm}/g, recipient.vrm || "")
    .replace(/{make}/g, recipient.make || "")
    .replace(/{model}/g, recipient.model || "")
    .replace(/{motExpiry}/g, recipient.motExpiry ? formatUKDate(recipient.motExpiry) : "")
    .replace(/{garageName}/g, garageName);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const garageId = String(body.garageId || "").trim();
    const channel = String(body.channel || "email").toLowerCase();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const selectedCustomers = Array.isArray(body.selectedCustomers) ? body.selectedCustomers.map((value: unknown) => String(value).trim()).filter(Boolean) : [];
    const manualRecipient = String(body.manualRecipient || "").trim();
    const scheduledForRaw = body.scheduledFor ? new Date(body.scheduledFor) : null;
    const scheduledFor = scheduledForRaw && !Number.isNaN(scheduledForRaw.getTime())
      ? scheduledForRaw
      : new Date();

    if (!garageId) {
      return NextResponse.json({ error: "garageId is required" }, { status: 400 });
    }

    const guard = await requireGarageAccess(request, garageId);
    if ("response" in guard) {
      return guard.response;
    }

    if (channel !== "email") {
      return NextResponse.json({ error: "Only email channel is supported" }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (selectedCustomers.length === 0 && !manualRecipient) {
      return NextResponse.json(
        { error: "Please select at least one customer or enter a recipient" },
        { status: 400 }
      );
    }

    let apiKey = await getApiKey("RESEND_API_KEY");
    let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
    if (!apiKey) apiKey = process.env.RESEND_API_KEY ?? null;
    if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL ?? null;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 400 }
      );
    }

    const recipientsByEmail = new Map<string, RecipientPayload>();

    if (manualRecipient) {
      recipientsByEmail.set(manualRecipient.toLowerCase(), {
        email: manualRecipient,
        name: "Customer",
      });
    }

    if (selectedCustomers.length > 0) {
      const [customersFromDb, vehiclesFromDb] = await Promise.all([
        prisma.customer.findMany({
          where: {
            garageId,
            name: { in: selectedCustomers },
            emailOptOut: false,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        }),
        prisma.vehicle.findMany({
          where: {
            garageId,
            ownerName: { in: selectedCustomers },
          },
          select: {
            ownerName: true,
            ownerEmail: true,
            vrm: true,
            make: true,
            model: true,
            motExpiry: true,
          },
          orderBy: { updatedAt: "desc" },
        }),
      ]);

      const vehicleByOwner = new Map<string, (typeof vehiclesFromDb)[number]>();
      for (const vehicle of vehiclesFromDb) {
        if (!vehicleByOwner.has(vehicle.ownerName)) {
          vehicleByOwner.set(vehicle.ownerName, vehicle);
        }
      }

      for (const customer of customersFromDb) {
        const email = customer.email?.trim();
        if (!email) continue;

        const emailKey = email.toLowerCase();
        const vehicle = vehicleByOwner.get(customer.name);
        recipientsByEmail.set(emailKey, {
          email,
          name: customer.name,
          customerId: customer.id,
          vrm: vehicle?.vrm,
          make: vehicle?.make,
          model: vehicle?.model,
          motExpiry: vehicle?.motExpiry,
        });
      }

      for (const vehicle of vehiclesFromDb) {
        const email = vehicle.ownerEmail?.trim();
        if (!email) continue;

        const emailKey = email.toLowerCase();
        if (recipientsByEmail.has(emailKey)) continue;

        recipientsByEmail.set(emailKey, {
          email,
          name: vehicle.ownerName || "Customer",
          vrm: vehicle.vrm,
          make: vehicle.make,
          model: vehicle.model,
          motExpiry: vehicle.motExpiry,
        });
      }
    }

    const recipients = Array.from(recipientsByEmail.values());

    const garageRecord = await prisma.garage.findUnique({
      where: { id: garageId },
      select: { name: true },
    });
    const garageName = garageRecord?.name || "Garage";

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No email addresses found for selected customers" },
        { status: 400 }
      );
    }

    const now = new Date();
    await prisma.emailQueueJob.createMany({
      data: recipients.map((recipient) => ({
        garageId,
        customerId: recipient.customerId,
        recipientEmail: recipient.email,
        recipientName: recipient.name,
        subject: applyTemplate(subject, recipient, garageName),
        message: applyTemplate(message, recipient, garageName),
        status: "PENDING",
        attempts: 0,
        maxAttempts: 5,
        scheduledFor,
      })),
    });

    void processEmailQueue(15).catch((error) => {
      console.error("[Send Message] Background queue trigger failed:", error);
    });

    return NextResponse.json({
      success: true,
      queued: recipients.length,
      message: `✅ ${recipients.length} email(s) queued. Delivery continues in the background.`,
    });
  } catch (error) {
    console.error("[Send Message] Error:", error);
    const details = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to queue message", details },
      { status: 500 }
    );
  }
}
