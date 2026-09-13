"use client";

import Link from "next/link";
import NextImage from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICES_LIST } from "@/lib/services";

/**
 * Renders from SERVICES_LIST. This page previously carried its own hardcoded
 * copy of the catalogue, which drifted out of step with lib/services.ts and
 * left retired claims ("OEM factory parts guaranteed", "Lifetime paint
 * guarantee") live on the site after they had been removed everywhere else.
 * One source of truth — claims are edited in exactly one file.
 */
export function ServicesView() {
  const { lang } = useLanguage();
  const fa = lang === "FA";

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans">
      <section className="bg-[#050505] py-20 border-b border-[#1C1C1C] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[#C5A880] text-[10px] uppercase tracking-[0.3em] font-medium block mb-3">
            {fa ? "تخصص‌های کارگاه" : "What We Do"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.15em] mb-4 uppercase">
            {fa ? "خدمات کارگاه" : "Our Services"}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider uppercase font-light">
            {fa
              ? "صافکاری، رفع فرورفتگی و رنگ برای واتفورد و شمال‌غرب لندن."
              : "Panel repair, dent removal and paint for Watford and North West London."}
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service) => {
            const title = fa ? service.title_fa : service.title_en;
            const short = fa ? service.short_fa : service.short_en;
            const benefits = fa ? service.benefits_fa : service.benefits_en;

            return (
              <div
                key={service.slug}
                className="flex flex-col bg-[#0E0E0E] border border-[#1F1F1F] p-6 hover:border-[#C5A880]/50 transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 border border-[#171717]">
                  <NextImage
                    src={service.img}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                  />
                </div>

                <h2 className="font-serif text-base tracking-[0.1em] uppercase text-[#EDEDED] mb-3 group-hover:text-[#C5A880] transition-colors">
                  {title}
                </h2>
                <p className="text-xs text-[#8E8E8E] mb-6 flex-1 font-light leading-relaxed">
                  {short}
                </p>

                <ul className="space-y-2 mb-8 border-t border-[#1C1C1C] pt-4">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start text-[11px] text-[#8E8E8E] font-light"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] me-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="w-full text-center border border-[#262626] text-[#8E8E8E] group-hover:border-[#C5A880] group-hover:text-[#C5A880] py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors"
                >
                  {fa ? "جزئیات این خدمت" : "Read More"}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
