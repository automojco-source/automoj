/**
 * Session signing for the admin area.
 *
 * Uses Web Crypto (HMAC-SHA256) rather than a library so the same code runs in
 * middleware (Edge runtime) and in route handlers (Node), and so the project
 * gains no dependency.
 *
 * This is a single shared-password gate — enough to stop the admin dashboard
 * being world-readable, which is what it is today. It is NOT a user system:
 * there are no per-user accounts, roles or audit trail. Replace it with
 * Auth.js over the existing `User` model (passwordHash + role) before the
 * dashboard handles real customer data at any volume.
 */

export const ADMIN_COOKIE = "am_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // one working day

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string, key: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new TextEncoder().encode(payload),
  );
  return toHex(sig);
}

/** Length-independent comparison, so a wrong value leaks no timing signal. */
function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(secret() && process.env.ADMIN_PASSWORD);
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare hashes, not the raw strings, so length is not observable either.
  const key = secret() ?? "";
  const [a, b] = await Promise.all([
    sign(candidate, key),
    sign(expected, key),
  ]);
  return safeEqual(a, b);
}

/** `<expiresAtMs>.<hmac>` — self-contained, so no server-side session store. */
export async function createSessionToken(): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  return `${payload}.${await sign(payload, key)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const key = secret();
  if (!key || !token) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return safeEqual(signature, await sign(payload, key));
}
