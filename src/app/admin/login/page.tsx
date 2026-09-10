"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.ok) {
        setError(payload?.message ?? "Sign in failed.");
        setBusy(false);
        return;
      }
      // Only navigate to an internal path, never to an attacker-supplied URL.
      router.replace(from.startsWith("/") && !from.startsWith("//") ? from : "/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm bg-[#0E0E0E] border border-[#1F1F1F] p-8 space-y-6"
    >
      <div className="text-center">
        <Lock className="w-8 h-8 text-[#C5A880] mx-auto mb-4 stroke-[1.2]" />
        <h1 className="font-serif text-lg tracking-[0.2em] uppercase text-[#EDEDED]">
          Auto Moj Admin
        </h1>
        <p className="text-[11px] text-[#8E8E8E] mt-1 font-light">Staff access only</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 border border-[#2E2E2E] bg-[#141414] px-3 text-sm text-[#EDEDED] focus:outline-none focus:border-[#C5A880]"
        />
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-2 text-[11px] text-[#E2867B] font-light">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-[#C5A880] text-[#080808] py-3 text-[10px] tracking-[0.25em] uppercase font-bold disabled:opacity-60 disabled:cursor-wait"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] p-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
