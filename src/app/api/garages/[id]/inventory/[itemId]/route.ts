import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const existing = await prisma.inventoryItem.findUnique({
      where: { id: itemId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 });
    }

    if (existing.garageId !== id) {
      return NextResponse.json({ error: "Inventory item does not belong to this garage" }, { status: 403 });
    }

    const updated = await prisma.inventoryItem.update({
      where: { id: itemId },
      data: {
        ...(body.name !== undefined && { name: String(body.name).trim() }),
        ...(body.sku !== undefined && { sku: body.sku ? String(body.sku).trim() : null }),
        ...(body.category !== undefined && { category: body.category ? String(body.category).trim() : null }),
        ...(body.brand !== undefined && { brand: body.brand ? String(body.brand).trim() : null }),
        ...(body.location !== undefined && { location: body.location ? String(body.location).trim() : null }),
        ...(body.supplier !== undefined && { supplier: body.supplier ? String(body.supplier).trim() : null }),
        ...(body.unitCostPence !== undefined && { unitCostPence: body.unitCostPence }),
        ...(body.unitPricePence !== undefined && { unitPricePence: body.unitPricePence }),
        ...(body.quantityOnHand !== undefined && { quantityOnHand: body.quantityOnHand }),
        ...(body.reorderLevel !== undefined && { reorderLevel: body.reorderLevel }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
      },
    });

    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error("Error updating inventory item:", error);
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id, itemId } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const existing = await prisma.inventoryItem.findUnique({
      where: { id: itemId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 });
    }

    if (existing.garageId !== id) {
      return NextResponse.json({ error: "Inventory item does not belong to this garage" }, { status: 403 });
    }

    const updated = await prisma.inventoryItem.update({
      where: { id: itemId },
      data: { isActive: false },
    });

    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 });
  }
}
