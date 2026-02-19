import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { buildQuoteHtml } from "@/lib/quote-template";
import { getApiKey } from "@/app/api/admin/config/route";
import { requireQuoteAccess } from "@/lib/auth-guards";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const guard = await requireQuoteAccess(request, id);
    if ("response" in guard) return guard.response;
    
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        items: true,
        garage: {
          select: {
            name: true,
            phone: true,
            email: true,
            address: true,
            postcode: true,
            website: true,
          },
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            vrm: true,
            motExpiry: true,
          },
        },
      },
    });

    if (!quote) {
      console.log("[Quote Email] Quote not found:", id);
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    console.log("[Quote Email] Fetching configuration...");
    let apiKey = await getApiKey("RESEND_API_KEY");
    let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
    const fromName = (await getApiKey("RESEND_FROM_NAME")) || quote.garage?.name || "Garage Boost";

    // Fallback to environment variables if not in database
    if (!apiKey) apiKey = process.env.RESEND_API_KEY || null;
    if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL || null;

    if (!apiKey || !fromEmail) {
      console.log("[Quote Email] Missing configuration:", { hasApiKey: !!apiKey, hasFromEmail: !!fromEmail });
      return NextResponse.json(
        { error: "Email is not configured", details: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL" },
        { status: 400 }
      );
    }

    console.log("[Quote Email] Sending email to:", quote.customerEmail);
    const resend = new Resend(apiKey);
    
    // Build professional HTML with garage details
    const quoteData = {
      ...quote,
      vatRate: quote.vatRate,
      garage: {
        name: quote.garage?.name || fromName,
        phone: quote.garage?.phone ?? undefined,
        email: quote.garage?.email ?? undefined,
        address: quote.garage?.address ?? undefined,
        postcode: quote.garage?.postcode ?? undefined,
        website: quote.garage?.website ?? undefined,
      },
      vehicle: quote.vehicle,
      items: quote.items.map(item => ({
        ...item,
        description: item.description ?? undefined,
      })),
    };
    const html = buildQuoteHtml(quoteData);

    const { error: emailError } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      replyTo: quote.garage?.email ?? undefined,
      to: quote.customerEmail,
      subject: `📋 ${quote.quoteNumber} - Quote from ${fromName}`,
      html,
    });

    if (emailError) {
      console.log("[Quote Email] Send failed:", emailError.message);
      return NextResponse.json(
        { error: "Failed to send email", details: emailError.message },
        { status: 500 }
      );
    }

    console.log("[Quote Email] Email sent successfully");

    await prisma.quote.update({
      where: { id: quote.id },
      data: {
        status: "SENT",
        activities: {
          create: {
            action: "SENT",
            details: `Quote sent to ${quote.customerEmail}`,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Quote Email] Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to send email", details: errorMessage },
      { status: 500 }
    );
  }
}
