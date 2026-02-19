import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id || "").trim();
    const otp = String(body.otp || "").trim();

    if (!id || !otp) {
      return NextResponse.json(
        { error: "Missing required fields", details: "id and otp are required" },
        { status: 400 }
      );
    }

    const signup = await prisma.garageSignup.findUnique({
      where: { id },
    });

    if (!signup || signup.phoneOtp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (signup.phoneOtpExpires && signup.phoneOtpExpires < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    await prisma.garageSignup.update({
      where: { id },
      data: {
        phoneVerified: true,
        phoneOtp: null,
        phoneOtpExpires: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Garage signup verify phone error:", error);
    return NextResponse.json({ error: "Failed to verify phone" }, { status: 500 });
  }
}
