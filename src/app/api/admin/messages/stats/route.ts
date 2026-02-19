import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest, isAdminRole } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session || !isAdminRole(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // Count of recipients with status SENT
    const sent = await prisma.campaignRecipient.count({ where: { status: "SENT" } });

    // We currently don't track opens or conversions in CampaignRecipient,
    // so return 0 for those fields. This endpoint can be extended later
    // if you add open tracking or conversion events.
    return NextResponse.json({ sent, openRate: 0, conversion: 0 });
  } catch (error) {
    console.error("Failed to fetch message stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
