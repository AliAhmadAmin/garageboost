import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = String(body.secret || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();
    const role = String(body.role || "ADMIN").trim();

    const setupSecret = process.env.ADMIN_SETUP_SECRET || "";
    if (!setupSecret || secret !== setupSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields", details: "name, email, and password are required" },
        { status: 400 }
      );
    }

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Invalid role", details: "role must be ADMIN or SUPER_ADMIN" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        passwordHash,
      },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Admin create error:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}
