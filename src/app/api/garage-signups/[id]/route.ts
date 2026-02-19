import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TRIAL_DAYS } from "@/lib/plans";
import { slugify } from "@/lib/slug";

const buildUniqueSlug = async (base: string) => {
  const normalized = slugify(base);
  let candidate = normalized;
  let counter = 2;

  while (true) {
    const existing = await prisma.garage.findFirst({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${normalized}-${counter}`;
    counter += 1;
  }
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const signup = await prisma.garageSignup.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      emailVerified: true,
      phoneVerified: true,
      garageName: true,
      postcode: true,
      address: true,
      businessType: true,
      proofPhotoUrl: true,
      proofCardUrl: true,
      companyNumber: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!signup) {
    return NextResponse.json({ error: "Signup not found" }, { status: 404 });
  }

  return NextResponse.json(signup);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existingSignup = await prisma.garageSignup.findUnique({
      where: { id },
    });

    if (!existingSignup) {
      return NextResponse.json({ error: "Signup not found" }, { status: 404 });
    }

    const updateData: any = {};

    if (body.garageName !== undefined) updateData.garageName = body.garageName;
    if (body.postcode !== undefined) updateData.postcode = body.postcode;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.businessType !== undefined) updateData.businessType = body.businessType;
    if (body.companyNumber !== undefined) updateData.companyNumber = body.companyNumber;
    if (body.proofPhotoUrl !== undefined) updateData.proofPhotoUrl = body.proofPhotoUrl;
    if (body.proofCardUrl !== undefined) updateData.proofCardUrl = body.proofCardUrl;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.selectedPlan !== undefined) updateData.selectedPlan = body.selectedPlan;

    if (body.customerName !== undefined) updateData.name = body.customerName;
    if (body.customerEmail !== undefined) updateData.email = body.customerEmail;
    if (body.customerPhone !== undefined) updateData.phone = body.customerPhone;

    const updated = await prisma.garageSignup.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        emailVerified: true,
        phoneVerified: true,
        garageName: true,
        postcode: true,
        address: true,
        businessType: true,
        proofPhotoUrl: true,
        proofCardUrl: true,
        companyNumber: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (body.status === "SUBMITTED") {
      if (!existingSignup.emailVerified) {
        return NextResponse.json({ error: "Email must be verified" }, { status: 400 });
      }

      if (!existingSignup.passwordHash) {
        return NextResponse.json({ error: "Missing password for signup" }, { status: 400 });
      }

      let user = await prisma.user.findUnique({
        where: { email: existingSignup.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: existingSignup.name,
            email: existingSignup.email,
            passwordHash: existingSignup.passwordHash,
            role: "GARAGE_OWNER",
          },
        });
      } else if (!user.passwordHash) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: existingSignup.passwordHash },
        });
      }

      const garageName = existingSignup.garageName || `${existingSignup.name}'s Garage`;
      const existingGarage = await prisma.garage.findFirst({
        where: {
          ownerId: user.id,
          name: garageName,
        },
      });

      if (!existingGarage) {
        // Calculate trial end date
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);

        // Use selected plan, default to professional
        const selectedPlan = updateData.selectedPlan || "professional";

        const slugBase = await buildUniqueSlug(garageName);
        await prisma.garage.create({
          data: {
            name: garageName,
            ownerName: existingSignup.name,
            ownerId: user.id,
            slug: slugBase,
            plan: selectedPlan,
            status: "TRIAL",
            trialEndsAt: trialEndsAt,
            revenuePence: 0,
            postcode: existingSignup.postcode || null,
            address: existingSignup.address || null,
            phone: existingSignup.phone || null,
            email: existingSignup.email || null,
          },
        });
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Garage signup update error:", error);
    return NextResponse.json({ error: "Failed to update signup" }, { status: 500 });
  }
}
