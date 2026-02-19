import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type !== "photo" && type !== "card") {
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
    const filename = `${id}-${type}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "garage-signups");
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const url = `/uploads/garage-signups/${filename}`;
    const updateData = type === "photo" ? { proofPhotoUrl: url } : { proofCardUrl: url };

    await prisma.garageSignup.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Garage signup upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
