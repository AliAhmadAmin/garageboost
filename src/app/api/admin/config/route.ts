import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest, isAdminRole } from "@/lib/session";

// Simple encryption (in production, use proper encryption library like crypto)
function encrypt(text: string): string {
  return Buffer.from(text).toString("base64");
}

function decrypt(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf-8");
}

// GET: Retrieve all API configurations
export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session || !isAdminRole(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const configs = await prisma.apiConfig.findMany({
      where: { isActive: true },
    });

    const configMap = configs.reduce((acc, config) => {
      acc[config.key] = {
        key: config.key,
        value: decrypt(config.value), // Decrypt for display
        isActive: config.isActive,
      };
      return acc;
    }, {} as Record<string, any>);

    // Set default for REQUIRE_EMAIL_VERIFICATION if not configured
    if (!configMap["REQUIRE_EMAIL_VERIFICATION"]) {
      configMap["REQUIRE_EMAIL_VERIFICATION"] = {
        key: "REQUIRE_EMAIL_VERIFICATION",
        value: "false", // Default to false (email verification disabled)
        isActive: true,
      };
    }

    return NextResponse.json(configMap);
  } catch (error) {
    console.error("Failed to fetch API configs:", error);
    return NextResponse.json({ error: "Failed to fetch configuration" }, { status: 500 });
  }
}

// POST: Save/Update API configurations
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session || !isAdminRole(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await req.json();

    // Update or create each config
    for (const [key, config] of Object.entries(body)) {
      const configData = config as { key: string; value: string; isActive: boolean };
      
      if (!configData.value) continue; // Skip empty values

      await prisma.apiConfig.upsert({
        where: { key },
        update: {
          value: encrypt(configData.value), // Encrypt before storage
          isActive: configData.isActive,
          updatedAt: new Date(),
        },
        create: {
          key,
          value: encrypt(configData.value),
          isActive: true,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Configuration saved" });
  } catch (error) {
    console.error("Failed to save API configs:", error);
    return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
  }
}

// Helper function to get API key from database (for use in other API routes)
export async function getApiKey(key: string): Promise<string | null> {
  try {
    const config = await prisma.apiConfig.findUnique({
      where: { key, isActive: true },
    });

    if (!config) {
      // Return default for REQUIRE_EMAIL_VERIFICATION if not set
      if (key === "REQUIRE_EMAIL_VERIFICATION") return "false";
      return null;
    }
    return decrypt(config.value);
  } catch (error) {
    console.error(`Failed to get API key ${key}:`, error);
    return null;
  }
}
