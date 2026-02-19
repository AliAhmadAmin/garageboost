import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireQuoteAccess } from "@/lib/auth-guards";

// GET quote by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const guard = await requireQuoteAccess(request, id);
  if ("response" in guard) return guard.response;
  
  const quote = await prisma.quote.findUnique({
    where: { id },
    include: {
      vehicle: true,
      job: true,
      invoice: true,
      items: true,
      activities: true,
    },
  });

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json(quote);
}

// PATCH update quote status
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const guard = await requireQuoteAccess(request, id);
  if ("response" in guard) return guard.response;

  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {};

    // Handle customer details update
    if (body.customerName !== undefined) updateData.customerName = body.customerName;
    if (body.customerEmail !== undefined) updateData.customerEmail = body.customerEmail;
    if (body.customerPhone !== undefined) updateData.customerPhone = body.customerPhone;

    // Handle status update
    if (body.status) {
      updateData.status = body.status;
    }

    // Add specific fields based on status
    if (body.status === "SENT") {
      updateData.activities = {
        create: {
          action: "SENT",
          details: `Quote sent to ${quote.customerEmail}`,
        },
      };
    } else if (body.status === "ACCEPTED") {
      updateData.acceptedDate = new Date();
      updateData.activities = {
        create: {
          action: "ACCEPTED",
          details: body.details || "Quote accepted by customer",
        },
      };
    } else if (body.status === "DECLINED") {
      updateData.declinedDate = new Date();
      updateData.declineReason = body.reason || null;
      updateData.activities = {
        create: {
          action: "DECLINED",
          details: body.reason || "Quote declined by customer",
        },
      };
    }

    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: updateData,
      include: {
        vehicle: true,
        job: true,
        invoice: true,
        items: true,
        activities: true,
      },
    });

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error("Quote PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}

// DELETE quote
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const guard = await requireQuoteAccess(request, id);
  if ("response" in guard) return guard.response;
  
  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quote deleted" });
  } catch (error) {
    console.error("Quote DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
