import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/garages/public/[slug]/services - Get active services for public booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const garage = await prisma.garage.findFirst({
      where: {
        slug,
        isPublic: true,
      },
      include: {
        bookableServices: {
          where: {
            isActive: true,
          },
          orderBy: [
            { sortOrder: "asc" },
            { category: "asc" },
            { name: "asc" },
          ],
        },
      },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    return NextResponse.json({ services: garage.bookableServices });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
