import type { NextRequest } from "next/server";

const DEFAULT_PRODUCTION_URL = "https://garage.bizzboost.uk";

function normalizeBaseUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/$/, "");
}

function isLocalhostUrl(url: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(url);
}

export function getAppBaseUrl(req?: NextRequest): string {
  const originHeader = normalizeBaseUrl(req?.headers.get("origin"));
  if (originHeader && (!isLocalhostUrl(originHeader) || process.env.NODE_ENV !== "production")) {
    return originHeader;
  }

  const forwardedProto = req?.headers.get("x-forwarded-proto") || "https";
  const forwardedHost = normalizeBaseUrl(req?.headers.get("x-forwarded-host"));
  if (forwardedHost) {
    const forwardedOrigin = `${forwardedProto}://${forwardedHost}`;
    if (!isLocalhostUrl(forwardedOrigin) || process.env.NODE_ENV !== "production") {
      return forwardedOrigin;
    }
  }

  const envUrl =
    normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL) ||
    normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

  if (envUrl && (!isLocalhostUrl(envUrl) || process.env.NODE_ENV !== "production")) {
    return envUrl;
  }

  return DEFAULT_PRODUCTION_URL;
}