import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDashboardStats, listQuotes, isDatabaseConfigured } from "@/lib/admin-data";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { LaunchReadiness } from "@/components/admin/LaunchReadiness";

export const dynamic = "force-dynamic";

const dt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminDashboard() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-8">
        <h1 className="text-xl font-semibold">Overview</h1>
        <NotConfigured />
        <LaunchReadiness />
      </div>
    );
  }

  const [stats, recent] = await Promise.all([
    getDashboardStats(),
    listQuotes({ take: 8 }),
  ]);

  const tiles = [
    { label: "Total enquiries", value: stats?.total ?? 0, hint: "All time" },
    { label: "New this week", value: stats?.newThisWeek ?? 0, hint: "Last 7 days" },
    { label: "Awaiting review", value: stats?.awaitingReview ?? 0, hint: "New or reviewing" },
    { label: "In the workshop", value: stats?.booked ?? 0, hint: "Booked or in progress" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {tiles.map((t) => (
          <div key={t.label} className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <p className="text-sm text-muted-foreground font-medium mb-1">{t.label}</p>
            <h3 className="text-3xl font-bold tabular-nums">{t.value}</h3>
            <p className="text-xs text-muted-foreground mt-2">{t.hint}</p>
          </div>
        ))}
      </div>

      <LaunchReadiness />

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center gap-4">
          <h3 className="text-lg font-semibold">Recent enquiries</h3>
          <Link
            href="/admin/quotes"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            No enquiries yet. They will appear here as soon as the form is used.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Vehicle</th>
                  <th className="px-6 py-4 font-medium">Received</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recent.map((q) => (
                  <tr key={q.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-primary font-medium">
                      <Link href={`/admin/quotes/${q.id}`} className="hover:underline">
                        {q.quoteId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium">{q.Customer.name}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono">{q.Vehicle.regNumber}</td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {dt.format(q.createdAt)}
                    </td>
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
