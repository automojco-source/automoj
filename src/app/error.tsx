"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Unhandled error", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-[#080808] text-[#EDEDED] px-6 py-24">
      <div className="max-w-md text-center">
        <p className="font-mono text-[#C5A880] text-xs tracking-[0.3em] mb-4">ERROR</p>
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.15em] uppercase mb-4">
          Something Went Wrong
        </h1>
        <p className="text-xs text-[#8E8E8E] font-light leading-relaxed mb-2">
          Sorry — that did not load. You can try again, or call us on the number on our
          contact page and we will help you directly.
        </p>
        <p className="text-xs text-[#8E8E8E] font-light leading-relaxed mb-8" dir="rtl">
          متأسفانه این صفحه بارگذاری نشد. می‌توانید دوباره تلاش کنید یا مستقیماً با ما تماس بگیرید.
        </p>
        {error.digest && (
          <p className="font-mono text-[10px] text-[#555555] mb-6" dir="ltr">
            ref: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center bg-[#C5A880] text-[#080808] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold"
          >
            Try again
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[#333333] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
