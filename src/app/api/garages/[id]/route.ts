import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";
import { isAdminRole } from "@/lib/session";
import { slugify } from "@/lib/slug";

const buildUniqueSlug = async (base: string, excludeId?: string) => {
  const normalized = slugify(base);
  let candidate = normalized;
  let counter = 2;

  while (true) {
    const existing = await prisma.garage.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${normalized}-${counter}`;
    counter += 1;
  }
};

// GET: Fetch single garage by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAccess(req, id);
    if ("response" in guard) return guard.response;
    const garage = await prisma.garage.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    if (!garage) {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    if (isAdminRole(guard.session.role)) {
      const [summary, payments] = await Promise.all([
        prisma.garagePayment.aggregate({
          where: { garageId: id },
          _sum: { amountPence: true },
          _count: { _all: true },
          _max: { paidAt: true },
        }),
        prisma.garagePayment.findMany({
          where: { garageId: id },
          orderBy: { paidAt: "desc" },
          take: 10,
          select: {
            id: true,
            amountPence: true,
            currency: true,
            stripeInvoiceId: true,
            paidAt: true,
          },
        }),
      ]);

      return NextResponse.json({
        ...garage,
        paymentsSummary: {
          count: summary._count?._all ?? 0,
          totalPence: summary._sum?.amountPence ?? 0,
          lastPaidAt: summary._max?.paidAt ?? null,
        },
        payments,
      });
    }

    return NextResponse.json(garage);
  } catch (error) {
    console.error("Failed to fetch garage:", error);
    return NextResponse.json({ error: "Failed to fetch garage" }, { status: 500 });
  }
}

// PUT: Update garage
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const guard = await requireGarageAccess(req, id);
    if ("response" in guard) return guard.response;
    let nextSlug: string | undefined;

    if (typeof body.slug === "string") {
      const normalized = body.slug.trim() ? slugify(body.slug) : slugify(body.name || "garage");
      nextSlug = await buildUniqueSlug(normalized, id);
    }

    const updated = await prisma.garage.update({
      where: { id },
      data: {
        name: body.name,
        ownerName: body.ownerName,
        slug: nextSlug,
        plan: body.plan,
        status: body.status,
        trialEndsAt: body.trialEndsAt ? new Date(body.trialEndsAt) : undefined,
        revenuePence: Number.isFinite(body.revenuePence)
          ? Number(body.revenuePence)
          : undefined,
        isPublic: typeof body.isPublic === "boolean" ? body.isPublic : undefined,
        shortDescription: body.shortDescription ?? undefined,
        description: body.description ?? undefined,
        services: body.services ?? undefined,
        specialties: body.specialties ?? undefined,
        certifications: body.certifications ?? undefined,
        amenities: body.amenities ?? undefined,
        website: body.website ?? undefined,
        phone: body.phone ?? undefined,
        email: body.email ?? undefined,
        address: body.address ?? undefined,
        postcode: body.postcode ?? undefined,
        latitude: typeof body.latitude === "number" ? body.latitude : undefined,
        longitude: typeof body.longitude === "number" ? body.longitude : undefined,
        city: body.city ?? undefined,
        county: body.county ?? undefined,
        openingHours: body.openingHours ?? undefined,
        logoUrl: body.logoUrl ?? undefined,
        vatEnabled: typeof body.vatEnabled === "boolean" ? body.vatEnabled : undefined,
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update garage:", error);
    return NextResponse.json({ error: "Failed to update garage" }, { status: 500 });
  }
}

// DELETE: Delete garage
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAccess(req, id);
    if ("response" in guard) return guard.response;
    // First delete all related vehicles and their advisories/reminders
    const vehicles = await prisma.vehicle.findMany({
      where: { garageId: id },
    });

    for (const vehicle of vehicles) {
      await prisma.advisory.deleteMany({ where: { vehicleId: vehicle.id } });
      await prisma.reminder.deleteMany({ where: { vehicleId: vehicle.id } });
    }

    await prisma.vehicle.deleteMany({ where: { garageId: id } });

    // Then delete the garage
    await prisma.garage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete garage:", error);
    return NextResponse.json({ error: "Failed to delete garage" }, { status: 500 });
  }
}
