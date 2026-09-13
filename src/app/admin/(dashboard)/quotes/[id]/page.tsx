import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ArrowLeft } from "lucide-react";
import {
  getQuote,
  setQuoteStatus,
  addQuoteNote,
  isDatabaseConfigured,
  QUOTE_STATUSES,
  isQuoteStatus,
} from "@/lib/admin-data";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { NotConfigured } from "@/components/admin/NotConfigured";

export const dynamic = "force-dynamic";

const dt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
});

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isDatabaseConfigured()) return <NotConfigured />;

  const quote = await getQuote(id);
  if (!quote) notFound();

  /** Server Actions — the form posts straight back to the server, no API route. */
  async function updateStatus(formData: FormData) {
    "use server";
    const next = formData.get("status");
    if (!isQuoteStatus(next)) return;
    await setQuoteStatus(id, next);
    revalidatePath(`/admin/quotes/${id}`);
    revalidatePath("/admin/quotes");
    revalidatePath("/admin");
  }

  async function createNote(formData: FormData) {
    "use server";
    const note = formData.get("note");
    if (typeof note !== "string") return;
    await addQuoteNote(id, note);
    revalidatePath(`/admin/quotes/${id}`);
  }

  const rows: Array<[string, string]> = [
    ["Registration", quote.Vehicle.regNumber],
    ["Service", quote.serviceType.replace(/_/g, " ")],
    ["Preferred date", quote.preferredDate ?? "—"],
    ["Contact by", quote.contactMethod],
    ["Received", dt.format(quote.createdAt)],
    ["Last updated", dt.format(quote.updatedAt)],
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/admin/quotes"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> All quote requests
      </Link>

      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-2xl font-bold font-mono text-primary">{quote.quoteId}</h1>
        <StatusBadge status={quote.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Customer</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{quote.Customer.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Phone</dt>
              <dd><a href={`tel:${quote.Customer.phone}`} className="text-primary hover:underline">{quote.Customer.phone}</a></dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Email</dt>
              <dd><a href={`mailto:${quote.Customer.email}`} className="text-primary hover:underline break-all">{quote.Customer.email}</a></dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Postcode</dt>
              <dd className="font-mono">{quote.Customer.postcode}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-4">Request</h2>
          <dl className="space-y-2 text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {quote.description && (
        <section className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold mb-3">What the customer said</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {quote.description}
          </p>
        </section>
      )}

      <section className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold mb-4">Change status</h2>
        <form action={updateStatus} className="flex flex-wrap gap-3 items-center">
          <select
            name="status"
            defaultValue={quote.status}
            className="h-10 rounded-lg border border-input bg-transparent px-3 text-sm"
          >
            {QUOTE_STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
          <button
            type="submit"
            className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
          >
            Save
          </button>
        </form>
      </section>

      <section className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold mb-4">Internal notes</h2>
        <form action={createNote} className="space-y-3 mb-6">
          <textarea
            name="note"
            rows={3}
            required
            maxLength={2000}
            placeholder="What was agreed, what the insurer said, parts ordered…"
            className="w-full rounded-lg border border-input bg-transparent p-3 text-sm resize-y"
          />
          <button
            type="submit"
            className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
          >
            Add note
          </button>
        </form>

        {quote.AdminNote && quote.AdminNote.length > 0 ? (
          <ul className="space-y-3">
            {quote.AdminNote.map((n) => (
              <li key={n.id} className="border-s-2 border-border ps-4">
                <p className="text-sm whitespace-pre-wrap">{n.note}</p>
                <p className="text-xs text-muted-foreground mt-1">{dt.format(n.createdAt)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No notes yet.</p>
        )}
      </section>
    </div>
  );
}
