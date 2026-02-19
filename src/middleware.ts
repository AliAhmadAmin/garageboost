import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequest, isAdminRole } from "@/lib/session";

const PROTECTED_PAGE_PATHS = ["/garage", "/admin"];
const PROTECTED_API_PATHS = [
  "/api/garages",
  "/api/vehicles",
  "/api/quotes",
  "/api/reminders",
  "/api/bookings",
  "/api/jobs",
  "/api/invoices",
  "/api/analytics",
  "/api/stripe/checkout",
  "/api/seed",
  "/api/admin",
];

const isProtectedPath = (pathname: string) => {
  return PROTECTED_PAGE_PATHS.some((path) => pathname.startsWith(path));
};

const isProtectedApiPath = (pathname: string) => {
  return PROTECTED_API_PATHS.some((path) => pathname.startsWith(path));
};

const isPublicGaragesList = (request: NextRequest) => {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname !== "/api/garages" || request.method !== "GET") return false;
  return searchParams.get("includeAll") !== "true";
};

const isPublicGaragesSubPath = (pathname: string) => {
  return pathname.startsWith("/api/garages/public");
};

const isPublicFeaturedGarages = (pathname: string) => {
  return pathname === "/api/garages/featured";
};

const isPublicBookingRequest = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  return pathname === "/api/bookings" && request.method === "POST";
};

const isCronAutomationEndpoint = (pathname: string) => {
  return pathname === "/api/reminders/auto/process" || pathname === "/api/email-queue/process";
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionFromRequest(request);

  if (isProtectedApiPath(pathname)) {
    if (
      isCronAutomationEndpoint(pathname) ||
      isPublicGaragesList(request) ||
      isPublicGaragesSubPath(pathname) ||
      isPublicFeaturedGarages(pathname) ||
      isPublicBookingRequest(request)
    ) {
      return NextResponse.next();
    }
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (isProtectedPath(pathname)) {
    if (!session) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!session || !isAdminRole(session.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/garage/:path*", "/admin/:path*", "/api/:path*"],
};
