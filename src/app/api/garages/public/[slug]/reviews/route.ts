import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/garages/public/[slug]/reviews - Get approved reviews for public display
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const garage = await prisma.garage.findFirst({
      where: { slug, isPublic: true },
      include: {
        reviews: {
          where: { status: "APPROVED" },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Calculate average rating
    const reviews = garage.reviews;
    const averageRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return NextResponse.json({
      reviews,
      averageRating: parseFloat(averageRating as string),
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/garages/public/[slug]/reviews - Submit review via public form
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const { rating, title, content, customerName, customerEmail } = body;

    // Validation
    if (!rating || !title || !content || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Find garage by slug
    const garage = await prisma.garage.findFirst({
      where: { slug, isPublic: true },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    // Check if review already exists from this email
    const existingReview = await prisma.review.findFirst({
      where: {
        garageId: garage.id,
        customerEmail,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          error: "You have already submitted a review. Contact support to update it.",
        },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        garageId: garage.id,
        rating,
        title,
        content,
        customerName,
        customerEmail,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        review,
        message: "Thank you for your review! It will be displayed after approval.",
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
