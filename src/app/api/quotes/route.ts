import { NextResponse } from "next/server";
import { parseQuoteInput } from "@/lib/validation";
import { getPrisma, isDatabaseConfigured, type AutoMojTx } from "@/lib/prisma";
import { notifyNewLead, isNotifyConfigured } from "@/lib/notify";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 1 MB — far more than this form needs, small enough not to be a memory lever. */
const MAX_BODY_BYTES = 1_000_000;

function reference(): string {
  const year = new Date().getFullYear();
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `AM-${year}-${suffix}`;
}

export async function POST(req: Request) {
  /* ------------------------------ rate limit ----------------------------- */
  const limit = rateLimit(`quotes:${clientIp(req)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Too many requests from this connection. Please try again shortly, or call us.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  /* -------------------------------- parse -------------------------------- */
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, message: "Could not read the request." }, { status: 400 });
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = parseQuoteInput(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, message: "Some details need checking.", issues: parsed.issues },
      { status: 400 },
    );
  }

  /* -------------------------------- bots --------------------------------- */
  // The honeypot field is invisible to people. Anything that fills it is
  // answered with a plausible success so it stops retrying, and stored nowhere.
  if (parsed.honeypot) {
    return NextResponse.json({ ok: true, quoteId: reference() }, { status: 201 });
  }

  const d = parsed.data;
  const quoteId = reference();

  /* ------------------------------- persist ------------------------------- */
  let persisted = false;
  if (isDatabaseConfigured()) {
    try {
      const prisma = await getPrisma();
      if (prisma) {
        await prisma.$transaction(async (tx: AutoMojTx) => {
          const customer = await tx.customer.create({
            data: { name: d.name, phone: d.phone, email: d.email, postcode: d.postcode },
          });
          const vehicle = await tx.vehicle.create({
            data: { customerId: customer.id, regNumber: d.regNumber },
          });
          await tx.quote.create({
            data: {
              quoteId,
              customerId: customer.id,
              vehicleId: vehicle.id,
              serviceType: d.damageType,
              description: d.description,
              preferredDate: d.preferredDate,
              contactMethod: d.contactMethod,
            },
          });
        });
        persisted = true;
      }
    } catch (error) {
      console.error("[quotes] Database write failed", error);
    }
  }

  /* ------------------------------- notify -------------------------------- */
  const notified = await notifyNewLead({ quoteId, ...d });

  /* ------------------------------- respond ------------------------------- */
  // A lead that reached neither the database nor the workshop inbox is a lost
  // lead. Say so, rather than showing the customer a reference nobody will act on.
  if (!persisted && !notified) {
    console.error(
      "[quotes] Lead could not be delivered.",
      { databaseConfigured: isDatabaseConfigured(), notifyConfigured: isNotifyConfigured() },
      // Logged so the lead is at least recoverable from server logs.
      { quoteId, ...d },
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not record your request right now. Please call or WhatsApp us and we will take your details directly.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, quoteId }, { status: 201 });
}

/** Anything other than POST is not a thing this endpoint does. */
export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
