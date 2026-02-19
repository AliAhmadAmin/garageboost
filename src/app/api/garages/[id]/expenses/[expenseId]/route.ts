import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; expenseId: string }> }
) {
  try {
    const { id, expenseId } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    if (expense.garageId !== id) {
      return NextResponse.json({ error: "Expense does not belong to this garage" }, { status: 403 });
    }

    const updated = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        ...(body.title !== undefined && { title: String(body.title).trim() }),
        ...(body.category !== undefined && { category: String(body.category).trim() }),
        ...(body.amountPence !== undefined && { amountPence: body.amountPence }),
        ...(body.taxPence !== undefined && { taxPence: body.taxPence }),
        ...(body.vendor !== undefined && { vendor: body.vendor ? String(body.vendor).trim() : null }),
        ...(body.paymentMethod !== undefined && { paymentMethod: body.paymentMethod ? String(body.paymentMethod).trim() : null }),
        ...(body.status !== undefined && body.status ? { status: String(body.status).trim() } : {}),
        ...(body.incurredAt !== undefined && { incurredAt: new Date(body.incurredAt) }),
        ...(body.notes !== undefined && { notes: body.notes ? String(body.notes).trim() : null }),
      },
    });

    return NextResponse.json({ expense: updated });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json({ error: "Failed to update expense" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; expenseId: string }> }
) {
  try {
    const { id, expenseId } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    if (expense.garageId !== id) {
      return NextResponse.json({ error: "Expense does not belong to this garage" }, { status: 403 });
    }

    await prisma.expense.delete({
      where: { id: expenseId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
  }
}
