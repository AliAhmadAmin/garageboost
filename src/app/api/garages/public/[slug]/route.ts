import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const garage = await prisma.garage.findFirst({
      where: {
        isPublic: true,
        OR: [{ slug }, { id: slug }],
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    return NextResponse.json(garage);
  } catch (error) {
    console.error("Public garage fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch garage" }, { status: 500 });
  }
}
