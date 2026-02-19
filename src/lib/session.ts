export type SessionPayload = {
  sub: string;
  role: string;
  exp: number;
};

type SessionResult = SessionPayload | null;

const getSecret = () => {
  const secret = process.env.SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production");
  }
  return secret || "dev-session-secret";
};

const getCrypto = () => {
  if (globalThis.crypto?.subtle) return globalThis.crypto;
  throw new Error("Web Crypto API is not available");
};

const toBase64Url = (input: Uint8Array) => {
  const base64 = typeof Buffer !== "undefined"
    ? Buffer.from(input).toString("base64")
    : btoa(String.fromCharCode(...input));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url = (input: string) => {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const sign = async (data: string, secret: string) => {
  const crypto = getCrypto();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return toBase64Url(new Uint8Array(signature));
};

const verify = async (data: string, signature: string, secret: string) => {
  const crypto = getCrypto();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  return crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64Url(signature),
    new TextEncoder().encode(data)
  );
};

export const signSession = async (payload: SessionPayload) => {
  const secret = getSecret();
  const header = toBase64Url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const data = `${header}.${body}`;
  const signature = await sign(data, secret);
  return `${data}.${signature}`;
};

export const verifySession = async (token?: string | null): Promise<SessionResult> => {
  if (!token) return null;
  const secret = getSecret();
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const data = `${header}.${body}`;
  const isValid = await verify(data, signature, secret);
  if (!isValid) return null;

  try {
    const payloadJson = new TextDecoder().decode(fromBase64Url(body));
    const payload = JSON.parse(payloadJson) as SessionPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!payload.sub || !payload.role) return null;
    return payload;
  } catch {
    return null;
  }
};

export const getSessionFromRequest = async (request: Request) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionCookies = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item.startsWith("garage-session="));
  const match = sessionCookies.length > 0 ? sessionCookies[sessionCookies.length - 1] : null;
  const token = match ? match.slice("garage-session=".length) : null;
  return verifySession(token);
};

export const isAdminRole = (role?: string | null) => {
  return role === "ADMIN" || role === "SUPER_ADMIN" || role === "PLATFORM_ADMIN";
};
