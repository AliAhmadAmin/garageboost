import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guards";
import { isAdminRole } from "@/lib/session";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const buildUniqueSlug = async (base: string, excludeId?: string) => {
  const normalized = slugify(base);
  let candidate = normalized;
  let counter = 2;

  while (true) {
    const existing = await prisma.garage.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${normalized}-${counter}`;
    counter += 1;
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("includeAll") === "true";

  if (includeAll) {
    const sessionResult = await requireSession(request);
    if ("response" in sessionResult) return sessionResult.response;
    if (!isAdminRole(sessionResult.session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const garages = await prisma.garage.findMany({
    where: includeAll
      ? undefined
      : {
          isPublic: true,
          name: { not: "" },
        },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  for (const garage of garages) {
    if (!garage.slug && garage.name) {
      const nextSlug = await buildUniqueSlug(garage.name, garage.id);
      await prisma.garage.update({
        where: { id: garage.id },
        data: { slug: nextSlug },
      });
      garage.slug = nextSlug;
    }
  }

  return NextResponse.json(garages, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function POST(request: Request) {
  const sessionResult = await requireSession(request);
  if ("response" in sessionResult) return sessionResult.response;
  if (!isAdminRole(sessionResult.session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const requestedSlug = slugify(body.slug || body.name || "garage");
  const nextSlug = await buildUniqueSlug(requestedSlug);
  const garage = await prisma.garage.create({
    data: {
      name: body.name,
      ownerName: body.ownerName,
      slug: nextSlug,
      plan: body.plan ?? "TRIAL",
      status: body.status ?? "TRIAL",
      revenuePence: body.revenuePence ?? 0,
    },
  });
  return NextResponse.json(garage, { status: 201 });
}
