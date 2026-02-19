import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

// PUT /api/garages/[id]/reviews/[reviewId] - Update review (approve/reject/respond)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> }
) {
  try {
    const { id, reviewId } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const { status, response } = body;

    // Verify review exists and belongs to this garage
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.garageId !== id) {
      return NextResponse.json(
        { error: "Review does not belong to this garage" },
        { status: 403 }
      );
    }

    // Validation
    if (status && !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const review = await prisma.review.update({
      where: { id: reviewId },
      data: {
        ...(status && { status }),
        ...(response !== undefined && { response }),
      },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/garages/[id]/reviews/[reviewId] - Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; reviewId: string }> }
) {
  try {
    const { id, reviewId } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    // Verify review exists and belongs to this garage
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (existingReview.garageId !== id) {
      return NextResponse.json(
        { error: "Review does not belong to this garage" },
        { status: 403 }
      );
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
