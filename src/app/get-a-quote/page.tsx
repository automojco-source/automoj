"use client";

import { QuoteForm } from "@/components/quote/QuoteForm";
import { useLanguage } from "@/context/LanguageContext";

export default function GetAQuotePage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans pb-24">
      <section className="bg-[#050505] py-20 border-b border-[#1C1C1C] text-center mb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[#C5A880] text-[10px] uppercase tracking-[0.3em] font-medium block mb-3">
            {lang === "EN" ? "Priority Valuation" : "برآورد سریع خسارت و هزینه"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.15em] mb-4 uppercase">
            {lang === "EN" ? "Request Free Estimate" : "ثبت درخواست استعلام قیمت"}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider uppercase font-light">
            {lang === "EN"
              ? "Complete our 4-step assessment below. Upload photos of damage for an official appraisal."
              : "فرم ۴ مرحله‌ای زیر را تکمیل و عکس‌های آسیب‌دیدگی را بارگذاری نمایید تا کارشناسان رسمی ما ظرف ۲۴ ساعت هزینه دقیق را اعلام کنند."
            }
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <QuoteForm />
      </div>
    </main>
  );
}
