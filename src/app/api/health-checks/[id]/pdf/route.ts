import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildHealthCheckPdf } from "@/lib/health-check-pdf";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const healthCheck = await prisma.healthCheck.findUnique({
      where: { id },
      include: {
        items: true,
        vehicle: true,
        garage: true,
      },
    });

    if (!healthCheck) {
      return NextResponse.json({ error: "Health check not found" }, { status: 404 });
    }

    const pdfBytes = await buildHealthCheckPdf({
      checkNumber: healthCheck.checkNumber,
      checkedBy: healthCheck.checkedBy,
      createdAt: healthCheck.createdAt,
      garageName: healthCheck.garage.name,
      vehicle: {
        vrm: healthCheck.vehicle.vrm,
        make: healthCheck.vehicle.make,
        model: healthCheck.vehicle.model,
        typeApproval: healthCheck.vehicle.typeApproval,
        motExpiry: healthCheck.vehicle.motExpiry,
        mileage: healthCheck.vehicle.mileage,
      },
      items: healthCheck.items.map((item: { category: string; item: string; status: string; notes: string | null; estimatedCost: number | null }) => ({
        category: item.category,
        item: item.item,
        status: item.status,
        notes: item.notes,
        estimatedCost: item.estimatedCost,
      })),
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${healthCheck.checkNumber}.pdf"`,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate health check PDF", details: errorMessage },
      { status: 500 }
    );
  }
}
