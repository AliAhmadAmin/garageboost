import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAdminAccess } from "@/lib/auth-guards";
import bcrypt from "bcryptjs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const guard = await requireGarageAdminAccess(request, id);
    if ("response" in guard) return guard.response;

    const staff = await prisma.staff.findMany({
      where: { garageId: id },
      orderBy: { createdAt: "desc" },
    });

    // Parse permissions for all staff
    const parsedStaff = staff.map((s) => ({
      ...s,
      permissions: s.permissions ? JSON.parse(s.permissions) : [],
    }));

    return NextResponse.json({ staff: parsedStaff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: garageId } = await params;
    const body = await request.json();

    const guard = await requireGarageAdminAccess(request, garageId);
    if ("response" in guard) return guard.response;

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const createLogin = Boolean(body.createLogin);
    const accessRole = body.accessRole || "TECHNICIAN";
    let userId: string | null = null;

    if (createLogin) {
      const email = String(body.email || "").toLowerCase().trim();
      const password = String(body.password || "").trim();

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
          name: String(body.name || "Staff").trim() || "Staff",
          email,
          role: "GARAGE_STAFF",
          passwordHash,
        },
      });
      userId = user.id;
    }

    const staff = await prisma.staff.create({
      data: {
        name: body.name.trim(),
        role: body.role || "Staff",
        accessRole,
        jobTitle: body.jobTitle || null,
        employmentType: body.employmentType || null,
        startDate: body.startDate ? new Date(body.startDate) : null,
        hourlyRatePence: body.hourlyRatePence || null,
        phone: body.phone || null,
        email: body.email ? body.email.toLowerCase().trim() : null,
        avatarUrl: body.avatarUrl || null,
        notes: body.notes || null,
        permissions: body.permissions && Array.isArray(body.permissions) ? JSON.stringify(body.permissions) : null,
        userId,
        garageId,
      },
    });

    // Parse permissions back to array for response
    const responseStaff = {
      ...staff,
      permissions: staff.permissions ? JSON.parse(staff.permissions) : [],
    };

    return NextResponse.json({ staff: responseStaff }, { status: 201 });
  } catch (error) {
    console.error("Error creating staff:", error);
    return NextResponse.json({ error: "Failed to create staff" }, { status: 500 });
  }
}
