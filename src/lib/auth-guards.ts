import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionFromRequest, isAdminRole, type SessionPayload } from "@/lib/session";
import { getAssignmentScope, isGarageOwnerRole, isGarageStaffRole } from "@/lib/access-control";

type StaffAccessContext = {
  id: string;
  accessRole: string;
  garageId: string;
};

type GuardResult =
  | { session: SessionPayload; staff?: StaffAccessContext }
  | { response: NextResponse };

const deny = (status: number, message: string) => {
  return { response: NextResponse.json({ error: message }, { status }) };
};

export const requireSession = async (request: Request): Promise<GuardResult> => {
  const session = await getSessionFromRequest(request);
  if (!session) return deny(401, "Unauthorized");
  return { session };
};

export const requireGarageAccess = async (
  request: Request,
  garageId?: string | null
): Promise<GuardResult> => {
  if (!garageId) return deny(400, "garageId is required");
  const sessionResult = await requireSession(request);
  if ("response" in sessionResult) return sessionResult;

  const { session } = sessionResult;
  if (isAdminRole(session.role)) return sessionResult;

  if (isGarageOwnerRole(session.role)) {
    const garage = await prisma.garage.findFirst({
      where: {
        id: garageId,
        ownerId: session.sub,
      },
      select: { id: true },
    });

    if (!garage) return deny(403, "Forbidden");
    return sessionResult;
  }

  if (isGarageStaffRole(session.role)) {
    const staff = await prisma.staff.findFirst({
      where: {
        garageId,
        userId: session.sub,
        active: true,
      },
      select: { id: true, accessRole: true, garageId: true },
    });

    if (!staff) return deny(403, "Forbidden");
    return { session, staff };
  }

  return deny(403, "Forbidden");
};

export const requireGarageAdminAccess = async (
  request: Request,
  garageId?: string | null
): Promise<GuardResult> => {
  const guard = await requireGarageAccess(request, garageId);
  if ("response" in guard) return guard;
  if (!guard.staff) return guard;

  const scope = getAssignmentScope(guard.staff.accessRole);
  if (scope !== "ALL") return deny(403, "Forbidden");
  return guard;
};

export const requireVehicleAccess = async (
  request: Request,
  vehicleId?: string | null
): Promise<GuardResult> => {
  if (!vehicleId) return deny(400, "vehicleId is required");
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    select: { id: true, garageId: true },
  });

  if (!vehicle) return deny(404, "Vehicle not found");
  return requireGarageAccess(request, vehicle.garageId);
};

export const requireJobAccess = async (
  request: Request,
  jobId?: string | null
): Promise<GuardResult> => {
  if (!jobId) return deny(400, "jobId is required");
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, garageId: true, assignedToId: true },
  });

  if (!job) return deny(404, "Job not found");
  const guard = await requireGarageAccess(request, job.garageId);
  if ("response" in guard) return guard;
  if (guard.staff) {
    const scope = getAssignmentScope(guard.staff.accessRole);
    if (scope === "ASSIGNED" && job.assignedToId !== guard.staff.id) {
      return deny(403, "Forbidden");
    }
  }
  return guard;
};

export const requireQuoteAccess = async (
  request: Request,
  quoteId?: string | null
): Promise<GuardResult> => {
  if (!quoteId) return deny(400, "quoteId is required");
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    select: { id: true, garageId: true },
  });

  if (!quote) return deny(404, "Quote not found");
  return requireGarageAccess(request, quote.garageId);
};

export const requireInvoiceAccess = async (
  request: Request,
  invoiceId?: string | null
): Promise<GuardResult> => {
  if (!invoiceId) return deny(400, "invoiceId is required");
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: { id: true, job: { select: { garageId: true } } },
  });

  if (!invoice || !invoice.job?.garageId) return deny(404, "Invoice not found");
  return requireGarageAccess(request, invoice.job.garageId);
};

export const requireCustomerAccess = async (
  request: Request,
  customerId?: string | null
): Promise<GuardResult> => {
  if (!customerId) return deny(400, "customerId is required");
  const customer = await (prisma as any).customer.findUnique({
    where: { id: customerId },
    select: { id: true, garageId: true },
  });

  if (!customer) return deny(404, "Customer not found");
  return requireGarageAccess(request, customer.garageId);
};

export const requireServiceAccess = async (
  request: Request,
  serviceId?: string | null
): Promise<GuardResult> => {
  if (!serviceId) return deny(400, "serviceId is required");
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { id: true, garageId: true },
  });

  if (!service) return deny(404, "Service not found");
  return requireGarageAccess(request, service.garageId);
};

export const requireBookingAccess = async (
  request: Request,
  bookingId?: string | null
): Promise<GuardResult> => {
  if (!bookingId) return deny(400, "bookingId is required");
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, garageId: true, staffId: true },
  });

  if (!booking) return deny(404, "Booking not found");
  const guard = await requireGarageAccess(request, booking.garageId);
  if ("response" in guard) return guard;
  if (guard.staff) {
    const scope = getAssignmentScope(guard.staff.accessRole);
    if (scope === "ASSIGNED" && booking.staffId !== guard.staff.id) {
      return deny(403, "Forbidden");
    }
  }
  return guard;
};

export const requireReviewAccess = async (
  request: Request,
  reviewId?: string | null
): Promise<GuardResult> => {
  if (!reviewId) return deny(400, "reviewId is required");
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { id: true, garageId: true },
  });

  if (!review) return deny(404, "Review not found");
  return requireGarageAccess(request, review.garageId);
};

export const requireReminderAccess = async (
  request: Request,
  reminderId?: string | null
): Promise<GuardResult> => {
  if (!reminderId) return deny(400, "reminderId is required");
  const reminder = await prisma.reminder.findUnique({
    where: { id: reminderId },
    select: { id: true, vehicle: { select: { garageId: true } } },
  });

  if (!reminder || !reminder.vehicle?.garageId) return deny(404, "Reminder not found");
  return requireGarageAccess(request, reminder.vehicle.garageId);
};
