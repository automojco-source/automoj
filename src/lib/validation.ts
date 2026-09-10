/**
 * Validation shared by the quote form (client) and the API route (server).
 *
 * Deliberately dependency-free: the same rules run in the browser for instant
 * feedback and again on the server, which is the only copy that is trusted.
 */

export const DAMAGE_TYPES = [
  "MAJOR_COLLISION",
  "MINOR_SCRATCH",
  "PDR",
  "BUMPER_PLASTIC",
  "FULL_RESPRAY",
] as const;
export type DamageType = (typeof DAMAGE_TYPES)[number];

export const CONTACT_METHODS = ["PHONE", "EMAIL", "WHATSAPP"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

/* ------------------------------- patterns ------------------------------- */

/** UK registration marks, spaces and case ignored. Covers current + older formats. */
const REG = /^[A-Z0-9]{2,7}$/;

/** Royal Mail postcode format. */
const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;

/** UK landline or mobile, with or without +44. */
const PHONE = /^(?:\+44|0)\d{9,10}$/;

/** Pragmatic email check — the real test is whether our reply arrives. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------ normalisers ----------------------------- */

export const normaliseReg = (v: string) =>
  v.toUpperCase().replace(/[\s-]/g, "").trim();

export const normalisePostcode = (v: string) => {
  const flat = v.toUpperCase().replace(/\s/g, "").trim();
  return flat.length > 3 ? `${flat.slice(0, -3)} ${flat.slice(-3)}` : flat;
};

export const normalisePhone = (v: string) => v.replace(/[\s()-]/g, "").trim();

/* -------------------------------- guards -------------------------------- */

export const isUkReg = (v: string) => REG.test(normaliseReg(v));
export const isUkPostcode = (v: string) =>
  POSTCODE.test(normalisePostcode(v).replace(/\s/g, ""));
export const isUkPhone = (v: string) => PHONE.test(normalisePhone(v));
export const isEmail = (v: string) => v.length <= 120 && EMAIL.test(v.trim());

export const isDamageType = (v: unknown): v is DamageType =>
  typeof v === "string" && (DAMAGE_TYPES as readonly string[]).includes(v);

export const isContactMethod = (v: unknown): v is ContactMethod =>
  typeof v === "string" && (CONTACT_METHODS as readonly string[]).includes(v);

/* ------------------------------ server parse ---------------------------- */

export type QuoteInput = {
  regNumber: string;
  damageType: DamageType;
  description?: string;
  preferredDate?: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  contactMethod: ContactMethod;
};

export type ParseResult =
  | { ok: true; data: QuoteInput; honeypot: boolean }
  | { ok: false; issues: Record<string, string> };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * Validates and normalises an untrusted request body.
 * Never trust the client copy of these rules — this is the one that counts.
 */
export function parseQuoteInput(body: unknown): ParseResult {
  const issues: Record<string, string> = {};

  if (typeof body !== "object" || body === null) {
    return { ok: false, issues: { _form: "Malformed request body." } };
  }
  const b = body as Record<string, unknown>;

  const regNumber = normaliseReg(str(b.regNumber));
  if (!REG.test(regNumber)) issues.regNumber = "Enter a valid UK registration.";

  if (!isDamageType(b.damageType)) issues.damageType = "Select a damage type.";

  const name = str(b.name);
  if (name.length < 2 || name.length > 80) issues.name = "Enter your full name.";

  const phone = normalisePhone(str(b.phone));
  if (!PHONE.test(phone)) issues.phone = "Enter a valid UK phone number.";

  const email = str(b.email);
  if (!isEmail(email)) issues.email = "Enter a valid email address.";

  const postcode = normalisePostcode(str(b.postcode));
  if (!POSTCODE.test(postcode.replace(/\s/g, "")))
    issues.postcode = "Enter a valid UK postcode.";

  if (!isContactMethod(b.contactMethod))
    issues.contactMethod = "Choose how we should contact you.";

  // UK GDPR: consent must be an active, unambiguous opt-in.
  if (b.consent !== true)
    issues.consent = "Consent is required before we can store your details.";

  const description = str(b.description).slice(0, 1000) || undefined;

  let preferredDate: string | undefined;
  const rawDate = str(b.preferredDate);
  if (rawDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDate) || Number.isNaN(Date.parse(rawDate))) {
      issues.preferredDate = "Enter a valid date.";
    } else {
      preferredDate = rawDate;
    }
  }

  if (Object.keys(issues).length > 0) return { ok: false, issues };

  return {
    ok: true,
    honeypot: str(b.website).length > 0,
    data: {
      regNumber,
      damageType: b.damageType as DamageType,
      description,
      preferredDate,
      name,
      phone,
      email,
      postcode,
      contactMethod: b.contactMethod as ContactMethod,
    },
  };
}
