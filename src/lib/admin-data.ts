import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import type { AdminQuote, AdminCustomerWithQuotes } from "@/lib/prisma";

/**
 * Read/write helpers for the admin dashboard.
 *
 * SERVER ONLY. Everything here reaches the database directly, so it must never
 * be imported from a component marked "use client" — the admin pages are Server
 * Components and the interactive bits take plain data as props. (The
 * `server-only` package would enforce this at build time; it is not installed,
 * and adding a dependency for a guard is not worth it while the rule is easy to
 * follow.)
 *
 * Every function returns an empty or null result rather than throwing when the
 * database is not configured, so the dashboard renders a clear "not connected"
 * state instead of an error page. The dashboard used to show a hardcoded
 * MOCK_QUOTES array with invented figures — "1,248 leads", "£24.5k revenue" —
 * which is worse than showing nothing.
 */

export const QUOTE_STATUSES = [
  "NEW",
  "REVIEWING",
  "QUOTED",
  "APPROVED",
  "BOOKED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const isQuoteStatus = (v: unknown): v is QuoteStatus =>
  typeof v === "string" && (QUOTE_STATUSES as readonly string[]).includes(v);

export { isDatabaseConfigured };

export type DashboardStats = {
  total: number;
  newThisWeek: number;
  awaitingReview: number;
  booked: number;
};

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const prisma = await getPrisma();
  if (!prisma) return null;

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [total, newThisWeek, awaitingReview, booked] = await Promise.all([
    prisma.quote.count(),
    prisma.quote.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.quote.count({ where: { status: { in: ["NEW", "REVIEWING"] } } }),
    prisma.quote.count({ where: { status: { in: ["BOOKED", "IN_PROGRESS"] } } }),
  ]);

  return { total, newThisWeek, awaitingReview, booked };
}

export async function listQuotes(options?: {
  status?: QuoteStatus;
  take?: number;
}): Promise<AdminQuote[]> {
  const prisma = await getPrisma();
  if (!prisma) return [];

  return prisma.quote.findMany({
    where: options?.status ? { status: options.status } : undefined,
    include: { Customer: true, Vehicle: true },
    orderBy: { createdAt: "desc" },
    take: options?.take ?? 100,
  });
}

export async function getQuote(id: string): Promise<AdminQuote | null> {
  const prisma = await getPrisma();
  if (!prisma) return null;

  return prisma.quote.findUnique({
    where: { id },
    include: {
      Customer: true,
      Vehicle: true,
      AdminNote: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function listCustomers(): Promise<AdminCustomerWithQuotes[]> {
  const prisma = await getPrisma();
  if (!prisma) return [];

  return prisma.customer.findMany({
    include: {
      Quote: { select: { id: true, quoteId: true, status: true, createdAt: true } },
      Vehicle: true,
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export async function setQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  const prisma = await getPrisma();
  if (!prisma) return;
  await prisma.quote.update({ where: { id }, data: { status } });
}

/**
 * AdminNote requires a User row (schema FK). The admin area is currently a
 * single shared password, so there is no per-person account to attribute a note
 * to — one placeholder staff row stands in. When Auth.js replaces the shared
 * password, attribute notes to the signed-in user instead and drop this.
 */
async function ensureStaffUserId(): Promise<string | null> {
  const prisma = await getPrisma();
  if (!prisma) return null;

  const email = "staff@automoj.local";
  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) return existing.id;

  const created = await prisma.user.create({
    data: { email, passwordHash: "", role: "ADMIN" },
  });
  return created.id;
}

export async function addQuoteNote(quoteId: string, note: string): Promise<void> {
  const trimmed = note.trim().slice(0, 2000);
  if (!trimmed) return;

  const prisma = await getPrisma();
  if (!prisma) return;

  const userId = await ensureStaffUserId();
  if (!userId) return;

  await prisma.adminNote.create({ data: { quoteId, userId, note: trimmed } });
}
