import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signSession } from "@/lib/session";
import { checkRateLimit, getRateLimitKey, getClientIP } from "@/lib/rate-limiter";
import { verifyRecaptcha } from "@/lib/recaptcha";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim();
    const password = String(body.password || "").trim();
    const recaptchaToken = String(body.recaptchaToken || "").trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const { valid, score } = await verifyRecaptcha(recaptchaToken);
      if (!valid || score < 0.3) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Rate limit by email (5 attempts per 15 minutes)
    const emailLimitKey = getRateLimitKey(email, "login");
    const emailLimit = checkRateLimit(
      emailLimitKey,
      parseInt(process.env.RATE_LIMIT_LOGIN_ATTEMPTS || "5"),
      parseInt(process.env.RATE_LIMIT_LOGIN_WINDOW_MINUTES || "15")
    );

    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((emailLimit.resetTime - Date.now()) / 1000)) } }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        garages: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Password not set for this account" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    let staffContext: {
      id: string;
      accessRole: string;
      garage: { id: string; name: string; ownerName: string; plan: string; status: string; trialEndsAt: Date | null };
    } | null = null;
    let ownerGarage: { id: string; name: string; ownerName: string; plan: string; status: string; trialEndsAt: Date | null } | null = null;

    if (user.role === "GARAGE_STAFF") {
      const staff = await prisma.staff.findFirst({
        where: { userId: user.id, active: true },
        include: { garage: true },
      });

      if (!staff?.garage) {
        return NextResponse.json({ error: "Staff access not configured" }, { status: 403 });
      }

      staffContext = {
        id: staff.id,
        accessRole: staff.accessRole,
        garage: {
          id: staff.garage.id,
          name: staff.garage.name,
          ownerName: staff.garage.ownerName,
          plan: staff.garage.plan,
          status: staff.garage.status,
          trialEndsAt: staff.garage.trialEndsAt,
        },
      };
    } else if (user.role === "GARAGE_OWNER") {
      const garage = await prisma.garage.findFirst({
        where: { ownerId: user.id },
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          name: true,
          ownerName: true,
          plan: true,
          status: true,
          trialEndsAt: true,
        },
      });
      ownerGarage = garage || null;
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        garages: user.garages,
        staff: staffContext,
      },
      garage: ownerGarage || staffContext?.garage || null,
    });

    const sessionToken = await signSession({
      sub: user.id,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    });

    response.cookies.set("garage-session", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
