import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const expenses = await prisma.expense.findMany({
      where: {
        garageId: id,
        ...(category && { category }),
        ...(status && { status }),
        ...(from && to
          ? {
              incurredAt: {
                gte: new Date(from),
                lte: new Date(to),
              },
            }
          : from
          ? { incurredAt: { gte: new Date(from) } }
          : to
          ? { incurredAt: { lte: new Date(to) } }
          : {}),
      },
      orderBy: { incurredAt: "desc" },
    });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const {
      title,
      category,
      amountPence,
      taxPence,
      vendor,
      paymentMethod,
      status,
      incurredAt,
      notes,
    } = body;

    if (!title || !category || typeof amountPence !== "number") {
      return NextResponse.json({ error: "Title, category, and amount are required" }, { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        title: String(title).trim(),
        category: String(category).trim(),
        amountPence,
        taxPence: typeof taxPence === "number" ? taxPence : 0,
        vendor: vendor ? String(vendor).trim() : null,
        paymentMethod: paymentMethod ? String(paymentMethod).trim() : null,
        status: status ? String(status).trim() : "PAID",
        incurredAt: incurredAt ? new Date(incurredAt) : new Date(),
        notes: notes ? String(notes).trim() : null,
        garageId: id,
      },
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}
