export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-[60vh] flex items-center justify-center bg-[#080808]"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-[#C5A880] border-t-transparent rounded-full animate-spin" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#8E8E8E] font-mono">
          Auto Moj
        </span>
      </div>
    </div>
  );
}
