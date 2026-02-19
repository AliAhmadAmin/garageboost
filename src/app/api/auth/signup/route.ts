import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limiter";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { signSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const password = String(body.password || "").trim();
    const recaptchaToken = String(body.recaptchaToken || "").trim();

    // Validate inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
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

    // Rate limit by email (3 attempts per 24 hours)
    const emailLimitKey = getRateLimitKey(email, "signup");
    const emailLimit = checkRateLimit(
      emailLimitKey,
      parseInt(process.env.RATE_LIMIT_SIGNUP_PER_IP || "3"),
      parseInt(process.env.RATE_LIMIT_SIGNUP_WINDOW_HOURS || "24")
    );

    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((emailLimit.resetTime - Date.now()) / 1000)) } }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered. Please login or use a different email." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: "GARAGE_OWNER",
      },
    });

    // Create default garage for the new user
    const garage = await prisma.garage.create({
      data: {
        name: "",
        ownerName: name,
        slug: null,
        ownerId: user.id,
        isPublic: true,
        status: "TRIAL",
        plan: "STARTER",
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      },
    });

    // Create session cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        garage: {
          id: garage.id,
          name: garage.name,
        },
      },
      { status: 201 }
    );

    // Sign and set session token
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
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}
