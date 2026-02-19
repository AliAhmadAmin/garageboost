import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { checkRateLimit, getRateLimitKey, getClientIP } from "@/lib/rate-limiter";
import { verifyRecaptcha } from "@/lib/recaptcha";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getApiKey } from "@/app/api/admin/config/route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "");
    const recaptchaToken = String(body.recaptchaToken || "").trim();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields", details: "name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.trim().length < 8) {
      return NextResponse.json(
        { error: "Password too short", details: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const { valid, score } = await verifyRecaptcha(recaptchaToken);
      if (!valid || score < 0.5) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Rate limit by IP (3 signups per 24 hours)
    const clientIP = getClientIP(request);
    const ipLimitKey = getRateLimitKey(clientIP, "signup_ip");
    const ipLimit = checkRateLimit(
      ipLimitKey,
      parseInt(process.env.RATE_LIMIT_SIGNUP_PER_IP || "3"),
      parseInt(process.env.RATE_LIMIT_SIGNUP_WINDOW_HOURS || "24") * 60
    );

    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many signup attempts from this IP. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((ipLimit.resetTime - Date.now()) / 1000)) } }
      );
    }

    // Rate limit by email (5 signups per 24 hours)
    const emailLimitKey = getRateLimitKey(email, "signup_email");
    const emailLimit = checkRateLimit(
      emailLimitKey,
      parseInt(process.env.RATE_LIMIT_SIGNUP_PER_IP || "5"),
      parseInt(process.env.RATE_LIMIT_SIGNUP_WINDOW_HOURS || "24") * 60
    );

    if (!emailLimit.allowed) {
      return NextResponse.json(
        { error: "Too many signup attempts with this email. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((emailLimit.resetTime - Date.now()) / 1000)) } }
      );
    }

    // Check if email verification is required
    let requireEmailVerification = false;
    try {
      const setting = await getApiKey("REQUIRE_EMAIL_VERIFICATION");
      requireEmailVerification = setting === "true";
    } catch (error) {
      console.error("Error checking email verification setting:", error);
      // Default to false if there's an error
      requireEmailVerification = false;
    }

    const token = crypto.randomBytes(24).toString("hex");
    const now = Date.now();
    const emailTokenExpires = new Date(now + 1000 * 60 * 60);

    const passwordHash = await bcrypt.hash(password, 12);

    const signup = await prisma.garageSignup.create({
      data: {
        name,
        email,
        phone: phone || "",
        passwordHash,
        emailToken: requireEmailVerification ? token : null,
        emailTokenExpires: requireEmailVerification ? emailTokenExpires : null,
        emailVerified: !requireEmailVerification, // Auto-verify if verification not required
      },
    });

    // If email verification is not required, skip sending email
    if (!requireEmailVerification) {
      return NextResponse.json({
        id: signup.id,
        emailSent: false,
        phoneSent: false,
        emailVerified: true,
      });
    }

    const resendApiKey = await getApiKey("RESEND_API_KEY");
    const resendFromEmail = await getApiKey("RESEND_FROM_EMAIL");
    const resendFromName = (await getApiKey("RESEND_FROM_NAME")) || "Garage Boost";

    if (!resendApiKey || !resendFromEmail) {
      return NextResponse.json(
        { error: "Email is not configured", details: "Missing RESEND_API_KEY or RESEND_FROM_EMAIL" },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "";
    const verifyUrl = `${origin}/api/garage-signups/verify-email?id=${signup.id}&token=${token}`;

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: `${resendFromName} <${resendFromEmail}>`,
      to: email,
      subject: "Verify your Garage Boost account",
      html: `
        <p>Hi ${name},</p>
        <p>Please verify your email to continue your garage signup.</p>
        <p><a href="${verifyUrl}">Verify Email</a></p>
        <p>This link expires in 1 hour.</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send verification email", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: signup.id,
      emailSent: true,
      phoneSent: false,
    });
  } catch (error) {
    console.error("Garage signup start error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to start signup", details: errorMessage },
      { status: 500 }
    );
  }
}
