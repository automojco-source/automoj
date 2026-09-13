import Link from "next/link";
import { listCustomers, isDatabaseConfigured } from "@/lib/admin-data";
import { NotConfigured } from "@/components/admin/NotConfigured";

export const dynamic = "force-dynamic";

const dt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default async function CustomersPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Customers</h1>
        <NotConfigured />
      </div>
    );
  }

  const customers = await listCustomers();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Customers</h1>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {customers.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">No customers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Postcode</th>
                  <th className="px-6 py-4 font-medium">Vehicles</th>
                  <th className="px-6 py-4 font-medium">Enquiries</th>
                  <th className="px-6 py-4 font-medium">First seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <a href={`tel:${c.phone}`} className="hover:text-primary block">{c.phone}</a>
                      <a href={`mailto:${c.email}`} className="hover:text-primary block text-xs">{c.email}</a>
                    </td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{c.postcode}</td>
                    <td className="px-6 py-4 font-mono text-muted-foreground text-xs">
                      {c.Vehicle.map((v) => v.regNumber).join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {c.Quote.map((q) => (
                          <Link
                            key={q.id}
                            href={`/admin/quotes/${q.id}`}
                            className="font-mono text-xs text-primary hover:underline"
                          >
                            {q.quoteId}
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                      {dt.format(c.createdAt)}
                    </td>
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
