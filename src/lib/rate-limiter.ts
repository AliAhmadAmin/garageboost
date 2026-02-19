// In-memory rate limiter (for production, use Redis)
const attempts = new Map<string, { count: number; resetTime: number }>();

export function getRateLimitKey(identifier: string, type: string): string {
  return `${type}:${identifier}`;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMinutes: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetTime) {
    // First attempt or window expired
    attempts.set(key, { count: 1, resetTime: now + windowMinutes * 60 * 1000 });
    return { allowed: true, remaining: limit - 1, resetTime: record?.resetTime || now + windowMinutes * 60 * 1000 };
  }

  if (record.count < limit) {
    record.count++;
    return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
  }

  return { allowed: false, remaining: 0, resetTime: record.resetTime };
}

export function resetRateLimit(key: string): void {
  attempts.delete(key);
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";
  return ip;
}
