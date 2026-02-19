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
    const activeOnly = searchParams.get("activeOnly") === "true";
    const lowStock = searchParams.get("lowStock") === "true";

    const items = await prisma.inventoryItem.findMany({
      where: {
        garageId: id,
        ...(activeOnly && { isActive: true }),
      },
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    });

    const filteredItems = lowStock
      ? items.filter((item: { quantityOnHand: number; reorderLevel: number }) => item.quantityOnHand <= item.reorderLevel)
      : items;

    return NextResponse.json({ items: filteredItems });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
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

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const item = await prisma.inventoryItem.create({
      data: {
        name: String(body.name).trim(),
        sku: body.sku ? String(body.sku).trim() : null,
        category: body.category ? String(body.category).trim() : null,
        brand: body.brand ? String(body.brand).trim() : null,
        location: body.location ? String(body.location).trim() : null,
        supplier: body.supplier ? String(body.supplier).trim() : null,
        unitCostPence: typeof body.unitCostPence === "number" ? body.unitCostPence : 0,
        unitPricePence: typeof body.unitPricePence === "number" ? body.unitPricePence : 0,
        quantityOnHand: typeof body.quantityOnHand === "number" ? body.quantityOnHand : 0,
        reorderLevel: typeof body.reorderLevel === "number" ? body.reorderLevel : 0,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
        garageId: id,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Error creating inventory item:", error);
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 });
  }
}
