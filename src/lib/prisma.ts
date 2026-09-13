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
 *
 * ON PRISMA 7 AND DRIVER ADAPTERS (checked 11 Sep 2026)
 * -----------------------------------------------------
 * Prisma 7 made the Rust-free client the default, and that client REQUIRES a
 * driver adapter — `new PrismaClient()` throws "Using engine type \"client\"
 * requires either \"adapter\" or \"accelerateUrl\"".
 *
 * This project is NOT on that path. prisma/schema.prisma still uses the
 * `prisma-client-js` generator, and the generated client in
 * node_modules/.prisma/client reports `"engineType": "library"` and ships the
 * native query engine binary. So the plain constructor below is correct, and
 * passing an adapter to it would be wrong.
 *
 * `prisma-client-js` is deprecated and will be removed in a future release.
 * When migrating to the `prisma-client` generator (which needs an `output`
 * path in the schema, and a prisma.config.ts), three things change together:
 *   1. npm install @prisma/adapter-pg
 *   2. construct as: new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
 *   3. import PrismaClient from the generated output path, not "@prisma/client"
 * Doing any one of those without the others breaks the app at runtime.
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

/**
 * The shapes the app reads back. These are described by hand because the
 * generated client does not exist until `prisma generate` has run — see the
 * note above. Row shapes are typed precisely (the UI depends on them); the
 * query arguments are left loose, which is the honest boundary: TypeScript is
 * not checking those, Prisma is, at runtime.
 */

export type AdminCustomer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  createdAt: Date;
};

export type AdminVehicle = {
  id: string;
  regNumber: string;
  make: string | null;
  model: string | null;
  year: number | null;
  colour: string | null;
};

export type AdminNoteRow = {
  id: string;
  note: string;
  createdAt: Date;
};

export type AdminQuote = {
  id: string;
  quoteId: string;
  serviceType: string;
  description: string | null;
  preferredDate: string | null;
  contactMethod: string;
  status: string;
  amount: number | null;
  createdAt: Date;
  updatedAt: Date;
  Customer: AdminCustomer;
  Vehicle: AdminVehicle;
  AdminNote?: AdminNoteRow[];
};

export type AdminCustomerWithQuotes = AdminCustomer & {
  Quote: Array<{ id: string; quoteId: string; status: string; createdAt: Date }>;
  Vehicle: AdminVehicle[];
};

type Delegate<Row> = {
  findMany(args?: unknown): Promise<Row[]>;
  findUnique(args: unknown): Promise<Row | null>;
  findFirst(args?: unknown): Promise<Row | null>;
  count(args?: unknown): Promise<number>;
  create(args: unknown): Promise<{ id: string }>;
  update(args: unknown): Promise<{ id: string }>;
  upsert(args: unknown): Promise<{ id: string }>;
};

export type AutoMojTx = {
  customer: { create(args: CustomerCreate): Promise<{ id: string }> };
  vehicle: { create(args: VehicleCreate): Promise<{ id: string }> };
  quote: { create(args: QuoteCreate): Promise<{ id: string }> };
};

export type AutoMojPrisma = {
  $transaction<T>(fn: (tx: AutoMojTx) => Promise<T>): Promise<T>;
  $disconnect(): Promise<void>;
  customer: Delegate<AdminCustomerWithQuotes> & AutoMojTx["customer"];
  vehicle: Delegate<AdminVehicle> & AutoMojTx["vehicle"];
  quote: Delegate<AdminQuote> & AutoMojTx["quote"];
  adminNote: Delegate<AdminNoteRow>;
  user: Delegate<{ id: string; email: string; role: string }>;
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
