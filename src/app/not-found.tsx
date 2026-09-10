import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Auto Moj",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-[#080808] text-[#EDEDED] px-6 py-24">
      <div className="max-w-md text-center">
        <p className="font-mono text-[#C5A880] text-xs tracking-[0.3em] mb-4">404</p>
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.15em] uppercase mb-4">
          Page Not Found
        </h1>
        <p className="text-xs text-[#8E8E8E] font-light leading-relaxed mb-2">
          The page you were looking for has moved or no longer exists.
        </p>
        <p className="text-xs text-[#8E8E8E] font-light leading-relaxed mb-8" dir="rtl">
          صفحه‌ای که دنبالش بودید جابه‌جا شده یا دیگر وجود ندارد.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#C5A880] text-[#080808] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold"
          >
            Home
          </Link>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center justify-center border border-[#333333] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors"
          >
            Get an estimate
          </Link>
        </div>
      </div>
    </main>
  );
}
