import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess } from "@/lib/auth-guards";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";

const MAX_IMAGE_COUNT = 3;
const MAX_IMAGE_BYTES = 1 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAccess(request, id);
    if ("response" in guard) return guard.response;
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, or WEBP images allowed" }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image must be 1MB or smaller" }, { status: 400 });
    }

    const currentCount = await prisma.garageImage.count({
      where: { garageId: id },
    });

    if (currentCount >= MAX_IMAGE_COUNT) {
      return NextResponse.json({ error: "Image limit reached" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
    const filename = `${id}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "garages");
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    const url = `/uploads/garages/${filename}`;
    const image = await prisma.garageImage.create({
      data: {
        garageId: id,
        url,
        sortOrder: currentCount,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Garage image upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guard = await requireGarageAccess(request, id);
    if ("response" in guard) return guard.response;
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json({ error: "imageId is required" }, { status: 400 });
    }

    const image = await prisma.garageImage.findFirst({
      where: { id: imageId, garageId: id },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    await prisma.garageImage.delete({ where: { id: imageId } });

    const filename = path.basename(image.url);
    const filePath = path.join(process.cwd(), "public", "uploads", "garages", filename);
    await fs.unlink(filePath).catch(() => undefined);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Garage image delete error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
