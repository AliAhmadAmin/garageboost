import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Fetch public garages with approved reviews
    const garages = await prisma.garage.findMany({
      where: {
        isPublic: true,
        name: { not: "" },
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        county: true,
        postcode: true,
        phone: true,
        email: true,
        services: true,
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
            sortOrder: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
          take: 1,
        },
        reviews: {
          where: {
            status: "APPROVED",
          },
          select: {
            rating: true,
          },
        },
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data and calculate ratings
    const featured = garages.map((garage) => {
      const approvedReviews = garage.reviews || [];
      const reviewCount = approvedReviews.length;
      const averageRating =
        reviewCount > 0
          ? (
              approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
              reviewCount
            ).toFixed(1)
          : null;

      return {
        id: garage.id,
        name: garage.name,
        slug: garage.slug,
        city: garage.city || "UK",
        county: garage.county || "United Kingdom",
        postcode: garage.postcode,
        phone: garage.phone,
        email: garage.email,
        services: garage.services || "MOT, Servicing, Repairs",
        rating: averageRating ? parseFloat(averageRating) : null,
        reviewCount: reviewCount,
        image: garage.images && garage.images.length > 0 ? garage.images[0] : null,
      };
    });

    return NextResponse.json(featured, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching featured garages:", error);
    return NextResponse.json(
      { error: "Failed to fetch garages" },
      { status: 500 }
    );
  }
}
