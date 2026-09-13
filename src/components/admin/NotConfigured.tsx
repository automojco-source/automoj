import { Database } from "lucide-react";

/**
 * Shown wherever the dashboard would otherwise display data. Says plainly that
 * there is no database rather than rendering zeroes, which would read as
 * "no enquiries yet" and hide a configuration problem.
 */
export function NotConfigured() {
  return (
    <div className="border border-dashed border-border rounded-xl p-10 text-center">
      <Database className="w-8 h-8 text-muted-foreground mx-auto mb-4 stroke-[1.2]" />
      <h3 className="text-base font-semibold mb-2">No database connected</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        Quote requests are not being stored, and the form tells customers to phone
        instead. Set <code className="font-mono text-primary">DATABASE_URL</code> in{" "}
        <code className="font-mono text-primary">.env.local</code>, then run{" "}
        <code className="font-mono text-primary">npx prisma db push</code>.
      </p>
    </div>
  );
}
