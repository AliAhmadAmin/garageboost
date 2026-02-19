import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guards";
import { isAdminRole } from "@/lib/session";
import { isGarageStaffRole, isGarageOwnerRole } from "@/lib/access-control";

export async function GET(request: Request) {
  const sessionResult = await requireSession(request);
  if ("response" in sessionResult) return sessionResult.response;

  const { session } = sessionResult;
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let garage = null as Awaited<ReturnType<typeof prisma.garage.findFirst>>;

  if (isAdminRole(session.role)) {
    garage = await prisma.garage.findFirst({
      orderBy: { createdAt: "desc" },
    });
  } else if (isGarageOwnerRole(session.role)) {
    garage = await prisma.garage.findFirst({
      where: { ownerId: session.sub },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });

    if (!garage) {
      garage = await prisma.garage.create({
        data: {
          name: "",
          ownerName: user.name || "Garage Owner",
          slug: null,
          isPublic: true,
          ownerId: user.id,
          email: user.email,
          status: "TRIAL",
          plan: "STARTER",
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      });
    }
  } else if (isGarageStaffRole(session.role)) {
    const staff = await prisma.staff.findFirst({
      where: { userId: session.sub, active: true },
      include: { garage: true },
    });
    garage = staff?.garage || null;
  }

  if (!garage) {
    return NextResponse.json({ error: "Garage not found" }, { status: 404 });
  }

  return NextResponse.json(garage);
}
