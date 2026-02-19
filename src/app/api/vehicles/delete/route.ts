import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireVehicleAccess } from "@/lib/auth-guards";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const guard = await requireVehicleAccess(request, id);
  if ("response" in guard) return guard.response;

  if (!id) {
    return NextResponse.json({ error: "Vehicle ID required" }, { status: 400 });
  }

  await prisma.vehicle.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
