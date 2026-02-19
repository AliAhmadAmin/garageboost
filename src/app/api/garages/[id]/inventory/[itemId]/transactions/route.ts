import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

const normalizeQuantity = (value: number) => Math.trunc(value);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const item = await prisma.inventoryItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 });
    }

    if (item.garageId !== id) {
      return NextResponse.json({ error: "Inventory item does not belong to this garage" }, { status: 403 });
    }

    const transactions = await prisma.inventoryTransaction.findMany({
      where: { inventoryItemId: itemId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Error fetching inventory transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const item = await prisma.inventoryItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 });
    }

    if (item.garageId !== id) {
      return NextResponse.json({ error: "Inventory item does not belong to this garage" }, { status: 403 });
    }

    const type = String(body.type || "").toUpperCase();
    const rawQuantity = Number(body.quantity);

    if (!type || !["RECEIPT", "ISSUE", "ADJUSTMENT"].includes(type)) {
      return NextResponse.json({ error: "Invalid transaction type" }, { status: 400 });
    }

    if (!Number.isFinite(rawQuantity) || rawQuantity === 0) {
      return NextResponse.json({ error: "Quantity is required" }, { status: 400 });
    }

    const safeQuantity = normalizeQuantity(rawQuantity);
    if (safeQuantity === 0) {
      return NextResponse.json({ error: "Quantity is required" }, { status: 400 });
    }

    const delta = type === "ISSUE"
      ? -Math.abs(safeQuantity)
      : type === "RECEIPT"
      ? Math.abs(safeQuantity)
      : safeQuantity;

    const newQuantity = item.quantityOnHand + delta;
    if (newQuantity < 0) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    const unitCostPence = typeof body.unitCostPence === "number" ? body.unitCostPence : null;
    const reference = body.reference ? String(body.reference).trim() : null;
    const notes = body.notes ? String(body.notes).trim() : null;

    const [updatedItem, transaction] = await prisma.$transaction([
      prisma.inventoryItem.update({
        where: { id: itemId },
        data: { quantityOnHand: newQuantity },
      }),
      prisma.inventoryTransaction.create({
        data: {
          type,
          quantity: delta,
          unitCostPence,
          reference,
          notes,
          inventoryItemId: itemId,
          garageId: id,
        },
      }),
    ]);

    return NextResponse.json({ item: updatedItem, transaction }, { status: 201 });
  } catch (error) {
    console.error("Error creating inventory transaction:", error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}
