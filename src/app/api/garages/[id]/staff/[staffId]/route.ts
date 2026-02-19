import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";
import bcrypt from "bcryptjs";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; staffId: string }> }
) {
  try {
    const { id, staffId } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
    });

    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    if (staff.garageId !== id) {
      return NextResponse.json({ error: "Staff member does not belong to this garage" }, { status: 403 });
    }

    const createLogin = Boolean(body.createLogin);
    const password = String(body.password || "").trim();

    let userId = staff.userId;
    if (createLogin && !staff.userId) {
      const email = String(body.email || "").toLowerCase().trim();
      if (!email || !password) {
        return NextResponse.json({ error: "Login email and password are required" }, { status: 400 });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name: String(body.name || staff.name).trim() || staff.name,
          email,
          role: "GARAGE_STAFF",
          passwordHash,
        },
      });
      userId = user.id;
    } else if (password && staff.userId) {
      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: staff.userId },
        data: { passwordHash },
      });
    }

    if (staff.userId) {
      const nextEmail = body.email !== undefined
        ? String(body.email || "").toLowerCase().trim()
        : null;
      const nextName = body.name !== undefined
        ? String(body.name || "").trim()
        : null;

      if (nextEmail) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: nextEmail,
            NOT: { id: staff.userId },
          },
          select: { id: true },
        });

        if (existingUser) {
          return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
        }
      }

      if (nextEmail || nextName) {
        await prisma.user.update({
          where: { id: staff.userId },
          data: {
            ...(nextEmail && { email: nextEmail }),
            ...(nextName && { name: nextName }),
          },
        });
      }
    }

    const updated = await prisma.staff.update({
      where: { id: staffId },
      data: {
        ...(body.name !== undefined && { name: String(body.name).trim() }),
        ...(body.role !== undefined && { role: String(body.role).trim() || "Staff" }),
        ...(body.accessRole !== undefined && { accessRole: String(body.accessRole).trim() || "TECHNICIAN" }),
        ...(body.jobTitle !== undefined && { jobTitle: body.jobTitle ? String(body.jobTitle).trim() : null }),
        ...(body.employmentType !== undefined && { employmentType: body.employmentType ? String(body.employmentType).trim() : null }),
        ...(body.startDate !== undefined && { startDate: body.startDate ? new Date(body.startDate) : null }),
        ...(body.hourlyRatePence !== undefined && { hourlyRatePence: body.hourlyRatePence }),
        ...(body.phone !== undefined && { phone: body.phone ? String(body.phone).trim() : null }),
        ...(body.email !== undefined && { email: body.email ? String(body.email).trim().toLowerCase() : null }),
        ...(body.avatarUrl !== undefined && { avatarUrl: body.avatarUrl ? String(body.avatarUrl).trim() : null }),
        ...(body.active !== undefined && { active: Boolean(body.active) }),
        ...(body.notes !== undefined && { notes: body.notes ? String(body.notes).trim() : null }),
        ...(body.permissions && Array.isArray(body.permissions) && { permissions: JSON.stringify(body.permissions) }),
        ...(userId !== staff.userId && { userId }),
      },
    });

    // Parse permissions back to array for response
    const responseStaff = {
      ...updated,
      permissions: updated.permissions ? JSON.parse(updated.permissions) : [],
    };

    return NextResponse.json({ staff: responseStaff });
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.json({ error: "Failed to update staff" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; staffId: string }> }
) {
  try {
    const { id, staffId } = await params;

    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const staff = await prisma.staff.findUnique({
      where: { id: staffId },
    });

    if (!staff) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    if (staff.garageId !== id) {
      return NextResponse.json({ error: "Staff member does not belong to this garage" }, { status: 403 });
    }

    // Prevent deletion of owners
    if (staff.accessRole === "OWNER") {
      return NextResponse.json(
        { error: "Cannot deactivate owner. Transfer ownership first or assign a different role." },
        { status: 400 }
      );
    }

    const updated = await prisma.staff.update({
      where: { id: staffId },
      data: { active: false },
    });

    return NextResponse.json({ staff: updated });
  } catch (error) {
    console.error("Error deleting staff:", error);
    return NextResponse.json({ error: "Failed to delete staff" }, { status: 500 });
  }
}
