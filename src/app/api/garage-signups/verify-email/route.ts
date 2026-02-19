import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id || !token) {
    return new NextResponse("Missing verification parameters", { status: 400 });
  }

  const signup = await prisma.garageSignup.findUnique({
    where: { id },
  });

  if (!signup || signup.emailToken !== token) {
    return new NextResponse("Invalid verification token", { status: 400 });
  }

  if (signup.emailTokenExpires && signup.emailTokenExpires < new Date()) {
    return new NextResponse("Verification token expired", { status: 400 });
  }

  await prisma.garageSignup.update({
    where: { id },
    data: {
      emailVerified: true,
      emailToken: null,
      emailTokenExpires: null,
    },
  });

  const html = `
    <html>
      <head><title>Email verified</title></head>
      <body style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>Email verified</h2>
        <p>Your email is verified. You can return to signup and continue.</p>
        <p><a href="/signup?id=${id}">Return to signup</a></p>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
