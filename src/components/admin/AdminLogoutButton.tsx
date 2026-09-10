"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
        router.replace("/admin/login");
        router.refresh();
      }}
      className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive w-full rounded-lg font-medium transition-colors disabled:opacity-50"
    >
      <LogOut className="w-5 h-5" /> {busy ? "Signing out…" : "Logout"}
    </button>
  );
}
