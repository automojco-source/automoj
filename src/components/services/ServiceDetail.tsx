"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Service } from "@/lib/services";

export function ServiceDetail({ service }: { service: Service }) {
  const { lang } = useLanguage();
  const fa = lang === "FA";

  const title = fa ? service.title_fa : service.title_en;
  const short = fa ? service.short_fa : service.short_en;
  const full = fa ? service.full_fa : service.full_en;
  const benefits = fa ? service.benefits_fa : service.benefits_en;

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans pb-24">
      <section className="relative py-24 bg-[#050505] border-b border-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Decorative backdrop — the same image is presented properly below. */}
          <img
            src={service.img}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          <Link
            href="/services"
            className="inline-flex items-center text-[10px] tracking-[0.25em] uppercase text-[#C5A880] hover:underline mb-8"
          >
            {fa ? (
              <>
                <ArrowRight className="w-3.5 h-3.5 me-2" /> مشاهده تمام خدمات
              </>
            ) : (
              <>
                <ArrowLeft className="w-3.5 h-3.5 me-2" /> All Disciplines
              </>
            )}
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.1em] mb-4 uppercase">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] max-w-2xl font-light tracking-wide leading-relaxed">
            {short}
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-serif tracking-[0.15em] uppercase mb-4">
                {fa ? "نحوه اجرا" : "Technical Execution"}
              </h2>
              <p className="text-xs md:text-sm text-[#8E8E8E] leading-relaxed font-light tracking-wide">
                {full}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-4 text-[#C5A880]">
                {fa ? "استانداردها و ضمانت" : "Standards & Guarantees"}
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center text-xs text-[#EDEDED] bg-[#0E0E0E] p-4 border border-[#1F1F1F]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] me-3 flex-shrink-0" />
                    <span className="font-light tracking-wide">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-5 sticky top-28 space-y-6">
            <div className="border border-[#1F1F1F] bg-[#0A0A0A] p-3">
              <img
                src={service.img}
                alt={title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-8">
              <h3 className="font-serif text-base tracking-[0.15em] uppercase mb-2">
                {fa ? "استعلام قیمت" : "Request an Estimate"}
              </h3>
              <p className="text-xs text-[#8E8E8E] mb-6 font-light leading-relaxed">
                {fa
                  ? `برآورد هزینه و پیگیری بیمه برای ${title}.`
                  : `Estimate and insurance liaison for ${title}.`}
              </p>
              <Link
                href="/get-a-quote"
                className="w-full block text-center border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] py-3 text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300"
              >
                {fa ? "شروع استعلام قیمت" : "Get Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
