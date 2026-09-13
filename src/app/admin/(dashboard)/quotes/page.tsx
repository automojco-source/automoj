import Link from "next/link";
import { listQuotes, isDatabaseConfigured, QUOTE_STATUSES, isQuoteStatus } from "@/lib/admin-data";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { NotConfigured } from "@/components/admin/NotConfigured";

export const dynamic = "force-dynamic";

const dt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
});

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = isQuoteStatus(status) ? status : undefined;

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Quote requests</h1>
        <NotConfigured />
      </div>
    );
  }

  const quotes = await listQuotes({ status: filter });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Quote requests</h1>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/quotes"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            !filter ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:bg-surface"
          }`}
        >
          All
        </Link>
        {QUOTE_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/quotes?status=${s}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filter === s ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:bg-surface"
            }`}
          >
            {s.replace(/_/g, " ")}
          </Link>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {quotes.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            {filter ? `Nothing with status ${filter.replace(/_/g, " ")}.` : "No enquiries yet."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Service</th>
                  <th className="px-6 py-4 font-medium">Received</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-primary font-medium">
                      <Link href={`/admin/quotes/${q.id}`} className="hover:underline">{q.quoteId}</Link>
                    </td>
                    <td className="px-6 py-4 font-medium">{q.Customer.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <a href={`tel:${q.Customer.phone}`} className="hover:text-primary block">{q.Customer.phone}</a>
                      <a href={`mailto:${q.Customer.email}`} className="hover:text-primary block text-xs">{q.Customer.email}</a>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground font-mono">{q.Vehicle.regNumber}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{q.serviceType.replace(/_/g, " ")}</td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap text-xs">{dt.format(q.createdAt)}</td>
                    <td className="px-6 py-4"><StatusBadge status={q.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
