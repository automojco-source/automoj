import type { ReactNode } from "react";

/** Shared shell for the legal pages: readable measure, plain type, no flourish. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans">
      <section className="bg-[#050505] py-16 border-b border-[#1C1C1C]">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-serif tracking-[0.12em] uppercase mb-3">
            {title}
          </h1>
          <p className="text-[11px] text-[#8E8E8E] font-mono tracking-wider">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-3xl py-14">
        <div
          className="
            text-sm text-[#A8A29A] font-light leading-[1.9]
            [&_h2]:text-[#EDEDED] [&_h2]:font-serif [&_h2]:text-base [&_h2]:tracking-[0.12em]
            [&_h2]:uppercase [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:font-semibold
            [&_h2:first-child]:mt-0
            [&_p]:mb-4
            [&_ul]:mb-4 [&_ul]:ps-5 [&_ul]:list-disc [&_li]:mb-1.5
            [&_a]:text-[#C5A880] [&_a]:underline
            [&_strong]:text-[#EDEDED] [&_strong]:font-medium
          "
        >
          {children}
        </div>
      </div>
    </main>
  );
}
