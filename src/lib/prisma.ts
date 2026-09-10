/**
 * Prisma access for Auto Moj.
 *
 * Two things this file works around, deliberately:
 *
 * 1. The generated client (`@prisma/client`) does not exist until someone has
 *    run `npx prisma generate`. Importing its types at the top level would
 *    break `tsc` and `next build` on a fresh clone, so the import is dynamic
 *    and the surface we use is described by the structural types below.
 *    Once `prisma generate` is part of the install step, these can be replaced
 *    with the real generated types and everything else here stays the same.
 *
 * 2. Next.js hot-reloads modules in development. A fresh PrismaClient per
 *    reload exhausts the connection pool within minutes, so the instance is
 *    cached on globalThis.
 *
 * Callers must handle `null`: it means no database is configured yet.
 * See src/app/api/quotes/route.ts for the pattern.
 */

type CustomerCreate = {
  data: { name: string; phone: string; email: string; postcode: string };
};
type VehicleCreate = { data: { customerId: string; regNumber: string } };
type QuoteCreate = {
  data: {
    quoteId: string;
    customerId: string;
    vehicleId: string;
    serviceType: string;
    description?: string;
    preferredDate?: string;
    contactMethod: string;
  };
};

export type AutoMojTx = {
  customer: { create(args: CustomerCreate): Promise<{ id: string }> };
  vehicle: { create(args: VehicleCreate): Promise<{ id: string }> };
  quote: { create(args: QuoteCreate): Promise<{ id: string }> };
};

export type AutoMojPrisma = AutoMojTx & {
  $transaction<T>(fn: (tx: AutoMojTx) => Promise<T>): Promise<T>;
  $disconnect(): Promise<void>;
};

const globalForPrisma = globalThis as unknown as { __autoMojPrisma?: AutoMojPrisma };

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function getPrisma(): Promise<AutoMojPrisma | null> {
  if (!isDatabaseConfigured()) return null;
  if (globalForPrisma.__autoMojPrisma) return globalForPrisma.__autoMojPrisma;

  let mod: Record<string, unknown>;
  try {
    mod = (await import("@prisma/client")) as unknown as Record<string, unknown>;
  } catch (error) {
    console.error(
      "[prisma] Could not load @prisma/client. Run `npx prisma generate`.",
      error,
    );
    return null;
  }

  const Ctor = mod.PrismaClient as
    | (new (opts?: { log?: string[] }) => AutoMojPrisma)
    | undefined;

  if (typeof Ctor !== "function") {
    console.error("[prisma] @prisma/client loaded but is not generated yet. Run `npx prisma generate`.");
    return null;
  }

  const client = new Ctor({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  globalForPrisma.__autoMojPrisma = client;
  return client;
}
