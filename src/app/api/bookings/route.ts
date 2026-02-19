import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkStaffAvailability } from "@/lib/availability";
import { Resend } from "resend";
import { buildBookingConfirmationHtml } from "@/lib/email-templates";
import { getApiKey } from "@/app/api/admin/config/route";
import { sendNewBookingPush } from "@/lib/web-push";

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      garageId,
      serviceId,
      customerName,
      customerEmail,
      customerPhone,
      vehicleVrm,
      vehicleMake,
      vehicleModel,
      vehicleData,
      bookingDate,
      bookingTime,
      notes,
      staffId,
    } = body;

    // Validation
    if (!garageId || !serviceId || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Garage, service, name, and phone are required" },
        { status: 400 }
      );
    }

    if (!bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: "Booking date and time are required" },
        { status: 400 }
      );
    }

    // Verify service exists and get details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { garage: true },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (service.garageId !== garageId) {
      return NextResponse.json(
        { error: "Service does not belong to this garage" },
        { status: 400 }
      );
    }

    if (!service.isActive) {
      return NextResponse.json(
        { error: "Service is not available for booking" },
        { status: 400 }
      );
    }

    // Check staff availability if assigned
    if (staffId) {
      const dateStr = new Date(bookingDate).toISOString().split("T")[0];
      const { available, conflict } = await checkStaffAvailability(
        garageId,
        staffId,
        dateStr,
        bookingTime,
        service.durationMinutes
      );

      if (!available) {
        return NextResponse.json(
          { error: `Staff member not available: ${conflict}` },
          { status: 409 }
        );
      }
    }

    const customerNameValue = String(customerName || "").trim();
    const customerPhoneValue = String(customerPhone || "").trim();
    const normalizedPhone = customerPhoneValue.replace(/\D/g, "");
    const fallbackEmail = normalizedPhone
      ? `phone-${normalizedPhone}@noemail.local`
      : `guest-${Date.now()}@noemail.local`;
    const customerEmailValue = String(customerEmail || "").trim().toLowerCase() || fallbackEmail;
    const vehicleVrmValue = String(vehicleVrm || "").replace(/\s/g, "").toUpperCase();
    const vehicleMakeValue = String(vehicleMake || vehicleData?.make || "").trim();
    const vehicleModelValue = String(vehicleModel || vehicleData?.model || "").trim();
    const motExpiryRaw = vehicleData?.motExpiry ? new Date(vehicleData.motExpiry) : null;
    const taxExpiryRaw = vehicleData?.taxExpiry ? new Date(vehicleData.taxExpiry) : null;
    const motExpiryValue = motExpiryRaw && !Number.isNaN(motExpiryRaw.getTime()) ? motExpiryRaw : null;
    const taxExpiryValue = taxExpiryRaw && !Number.isNaN(taxExpiryRaw.getTime()) ? taxExpiryRaw : null;
    const taxStatusValue = vehicleData?.taxStatus ? String(vehicleData.taxStatus) : null;
    const mileageValue = Number.isFinite(Number(vehicleData?.mileage)) ? Number(vehicleData?.mileage) : null;

    // Generate booking number
    const year = new Date().getFullYear();
    const count = await prisma.booking.count();
    const bookingNumber = `BK-${year}-${String(count + 1).padStart(3, "0")}`;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        garageId,
        serviceId,
        customerName: customerNameValue,
        customerEmail: customerEmailValue,
        customerPhone: customerPhoneValue,
        vehicleVrm: vehicleVrmValue || null,
        vehicleMake: vehicleMakeValue || null,
        vehicleModel: vehicleModelValue || null,
        bookingDate: new Date(bookingDate),
        bookingTime,
        notes,
        staffId: staffId || null,
        depositPence: service.depositRequired ? service.depositPence : 0,
        status: service.depositRequired ? "PENDING" : "CONFIRMED",
      },
      include: {
        service: true,
      },
    });

    try {
      const customer = await prisma.customer.upsert({
        where: {
          garageId_email: {
            garageId,
            email: customerEmailValue,
          },
        },
        update: {
          name: customerNameValue,
          phone: customerPhoneValue || null,
        },
        create: {
          garageId,
          name: customerNameValue,
          email: customerEmailValue,
          phone: customerPhoneValue || null,
          source: "ONLINE_BOOKING",
        },
      });

      if (vehicleVrmValue) {
        const existingVehicle = await prisma.vehicle.findFirst({
          where: {
            garageId,
            vrm: vehicleVrmValue,
          },
        });

        if (!existingVehicle) {
          await prisma.vehicle.create({
            data: {
              garageId,
              customerId: customer.id,
              vrm: vehicleVrmValue,
              make: vehicleMakeValue || "Unknown",
              model: vehicleModelValue || "",
              motExpiry: motExpiryValue || new Date(),
              taxExpiry: taxExpiryValue || null,
              taxStatus: taxStatusValue,
              mileage: mileageValue || undefined,
              ownerName: customerNameValue,
              ownerEmail: customerEmailValue,
              ownerPhone: customerPhoneValue || null,
            },
          });
        } else {
          const updateData: Record<string, any> = {
            customerId: existingVehicle.customerId || customer.id,
            ownerName: customerNameValue,
            ownerEmail: customerEmailValue,
            ownerPhone: customerPhoneValue || null,
          };
          if (vehicleMakeValue) updateData.make = vehicleMakeValue;
          if (vehicleModelValue) updateData.model = vehicleModelValue;
          if (motExpiryValue) updateData.motExpiry = motExpiryValue;
          if (taxExpiryValue) updateData.taxExpiry = taxExpiryValue;
          if (taxStatusValue) updateData.taxStatus = taxStatusValue;
          if (mileageValue !== null) updateData.mileage = mileageValue;

          await prisma.vehicle.update({
            where: { id: existingVehicle.id },
            data: updateData,
          });
        }
      }
    } catch (error) {
      console.error("[Booking] CRM sync failed:", error);
    }

    // Send confirmation email to customer
    try {
      let apiKey = await getApiKey("RESEND_API_KEY");
      let fromEmail = await getApiKey("RESEND_FROM_EMAIL");
      const fromName = (await getApiKey("RESEND_FROM_NAME")) || process.env.NEXT_PUBLIC_APP_NAME || "Garage Boost";

      // Fallback to environment variables if not in database
      if (!apiKey) apiKey = process.env.RESEND_API_KEY ?? null;
      if (!fromEmail) fromEmail = process.env.RESEND_FROM_EMAIL ?? null;

      if (apiKey && fromEmail && customerEmailValue && !customerEmailValue.includes("@noemail.local")) {
        const resend = new Resend(apiKey);
        const garage = await prisma.garage.findUnique({
          where: { id: garageId },
          select: { name: true, phone: true, email: true, address: true, postcode: true },
        });

        const html = buildBookingConfirmationHtml({
          bookingNumber: booking.bookingNumber,
          customerName: customerNameValue,
          customerEmail: customerEmailValue,
          customerPhone: customerPhoneValue,
          serviceName: booking.service.name,
          serviceDescription: booking.service.description || undefined,
          servicePricePence: booking.service.pricePence,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
          vehicleVrm: vehicleVrmValue || undefined,
          vehicleMake: vehicleMakeValue || undefined,
          vehicleModel: vehicleModelValue || undefined,
          notes: booking.notes || undefined,
          garageName: garage?.name || "Garage Boost",
          garagePhone: garage?.phone || undefined,
          garageEmail: garage?.email || undefined,
          garageAddress: garage?.address || undefined,
          garagePostcode: garage?.postcode || undefined,
          depositRequired: booking.service.depositRequired,
          depositPenceDue: booking.depositPence,
          bookingStatus: booking.status as "PENDING" | "CONFIRMED",
        });

        await resend.emails.send({
          from: `${garage?.name || fromName} <${fromEmail}>`,
          replyTo: garage?.email || undefined,
          to: customerEmailValue,
          subject: `✓ Booking Confirmed - ${booking.bookingNumber}`,
          html,
        });

        console.log("[Booking] Confirmation email sent to:", customerEmailValue);
      }
    } catch (error) {
      console.error("[Booking] Failed to send confirmation email:", error);
      // Don't fail the booking creation if email fails
    }

    void sendNewBookingPush({
      garageId,
      bookingNumber: booking.bookingNumber,
      customerName: customerNameValue,
      serviceName: booking.service.name,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
    }).catch((error) => {
      console.error("[Booking] Failed to send web push notification", error);
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
