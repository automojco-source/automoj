const TONE: Record<string, string> = {
  NEW: "bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/40",
  REVIEWING: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  QUOTED: "bg-blue-400/15 text-blue-300 border-blue-400/30",
  APPROVED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  BOOKED: "bg-green-500/15 text-green-400 border-green-500/30",
  IN_PROGRESS: "bg-indigo-400/15 text-indigo-300 border-indigo-400/30",
  COMPLETED: "bg-neutral-500/15 text-neutral-300 border-neutral-500/30",
  CANCELLED: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = TONE[status] ?? "bg-surface border-border text-muted-foreground";
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${tone}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
