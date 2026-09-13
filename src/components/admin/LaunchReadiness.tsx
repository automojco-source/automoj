import { Check, AlertTriangle, CircleHelp } from "lucide-react";
import { launchChecks } from "@/lib/launch-checks";

export function LaunchReadiness() {
  const checks = launchChecks();
  const outstanding = checks.filter((c) => !c.ok);

  if (outstanding.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 flex items-start gap-3">
        <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Ready to launch</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Every pre-launch check has been satisfied.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-semibold">
          Before launch
          <span className="ms-2 text-sm font-normal text-muted-foreground tabular-nums">
            {outstanding.length} outstanding
          </span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          This panel is only visible to staff.
        </p>
      </div>

      <ul className="divide-y divide-border">
        {checks.map((c) => (
          <li key={c.id} className="p-5 flex items-start gap-3">
            {c.ok ? (
              <Check className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
            ) : c.manual ? (
              <CircleHelp className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <p className={`text-sm font-medium ${c.ok ? "text-muted-foreground line-through" : ""}`}>
                {c.label}
                {c.manual && !c.ok && (
                  <span className="ms-2 text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                    needs checking
                  </span>
                )}
              </p>
              {!c.ok && (
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed break-words">
                  {c.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
