import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";

// GET /api/garages/[id]/reviews - List all reviews for garage owner
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const reviews = await prisma.review.findMany({
      where: {
        garageId: id,
        ...(status && { status }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/garages/[id]/reviews - Submit a new review
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { rating, title, content, customerName, customerEmail } = body;

    // Validation
    if (!rating || !title || !content || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Rating, title, content, name, and email are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Verify garage exists
    const garage = await prisma.garage.findUnique({
      where: { id },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Check if review already exists from this email
    const existingReview = await prisma.review.findFirst({
      where: {
        garageId: id,
        customerEmail,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          error: "You have already submitted a review for this garage. Contact support to update it.",
        },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        garageId: id,
        rating,
        title,
        content,
        customerName,
        customerEmail,
        status: "PENDING", // Reviews need approval
      },
    });

    return NextResponse.json(
      {
        review,
        message: "Review submitted successfully. Pending approval.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
