import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildQuoteHtml } from "@/lib/quote-template";
import { getApiKey } from "@/app/api/admin/config/route";
import { requireQuoteAccess } from "@/lib/auth-guards";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const guard = await requireQuoteAccess(request, id);
    if ("response" in guard) return guard.response;
    
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: { items: true, garage: true, vehicle: true },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const footerText = (await getApiKey("QUOTE_PDF_FOOTER")) || "";
    const companyName = (await getApiKey("RESEND_FROM_NAME")) || "Garage Boost";

    // Transform quote to match QuoteLike interface (convert null descriptions to undefined)
    const transformedItems = quote.items.map(item => ({
      name: item.name,
      totalPence: item.totalPence,
      description: item.description ?? undefined,
    }));

    const html = buildQuoteHtml({
      quoteNumber: quote.quoteNumber,
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      subtotalPence: quote.subtotalPence,
      vatRate: quote.vatRate,
      vatPence: quote.vatPence,
      totalPence: quote.totalPence,
      expiryDate: quote.expiryDate,
      items: transformedItems,
      garage: quote.garage ? {
        name: quote.garage.name,
        phone: quote.garage.phone ?? undefined,
        email: quote.garage.email ?? undefined,
        address: quote.garage.address ?? undefined,
        postcode: quote.garage.postcode ?? undefined,
        website: quote.garage.website ?? undefined,
      } : undefined,
      vehicle: quote.vehicle ? {
        make: quote.vehicle.make ?? undefined,
        model: quote.vehicle.model ?? undefined,
        typeApproval: quote.vehicle.typeApproval ?? undefined,
        vrm: quote.vehicle.vrm ?? undefined,
        motExpiry: quote.vehicle.motExpiry ?? undefined,
      } : undefined,
    });
    
    // Return HTML for client-side PDF generation
    const printHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Quote ${quote.quoteNumber}</title>
  <style>
    @media print {
      @page { margin: 0.5in; }
      body { margin: 0; }
    }
  </style>
</head>
<body>
  ${html}
  <script>
    window.onload = () => {
      window.print();
      setTimeout(() => window.close(), 100);
    };
  </script>
</body>
</html>`;

    return new NextResponse(printHtml, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Quote PDF error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
