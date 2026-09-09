import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// In a real app, this would be fetched from Prisma: await prisma.quote.findMany(...)
const MOCK_QUOTES = [
  { id: "QR-2026-8432", name: "Sarah Jenkins", vehicle: "BMW 3 Series", service: "Accident Repair", status: "NEW", date: "Today, 09:42" },
  { id: "QR-2026-7711", name: "David Smith", vehicle: "Porsche Macan", service: "Respray", status: "REVIEWING", date: "Yesterday, 14:15" },
  { id: "QR-2026-6190", name: "Uber Fleet Ops", vehicle: "Toyota Prius", service: "Bumper Repair", status: "QUOTED", date: "01 Sep 2026" },
  { id: "QR-2026-5002", name: "Lucy Lease", vehicle: "Audi A3", service: "Dent Repair", status: "BOOKED", date: "30 Aug 2026" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Total Leads</p>
          <h3 className="text-3xl font-bold">1,248</h3>
          <p className="text-xs text-green-500 mt-2">+12% from last month</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">New Quotes (Today)</p>
          <h3 className="text-3xl font-bold text-primary">8</h3>
          <p className="text-xs text-muted-foreground mt-2">Requires review</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Booked Repairs</p>
          <h3 className="text-3xl font-bold">42</h3>
          <p className="text-xs text-muted-foreground mt-2">This week</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Est. Revenue</p>
          <h3 className="text-3xl font-bold">£24.5k</h3>
          <p className="text-xs text-green-500 mt-2">This month</p>
        </div>
      </div>

      {/* Recent Quotes Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Quote Requests</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Quote ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_QUOTES.map((quote) => (
                <tr key={quote.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary font-medium">{quote.id}</td>
                  <td className="px-6 py-4 font-medium">{quote.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{quote.vehicle}</td>
                  <td className="px-6 py-4 text-muted-foreground">{quote.service}</td>
                  <td className="px-6 py-4 text-muted-foreground">{quote.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      quote.status === 'NEW' ? 'bg-primary/20 text-primary border border-primary/30' :
                      quote.status === 'REVIEWING' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      quote.status === 'BOOKED' ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                      'bg-surface border border-border text-muted-foreground'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface rounded-md text-muted-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
