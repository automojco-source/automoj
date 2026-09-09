"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { use } from "react";

const SERVICES_CATALOG: Record<string, {
  title_en: string;
  title_fa: string;
  short_en: string;
  short_fa: string;
  full_en: string;
  full_fa: string;
  img: string;
  benefits_en: string[];
  benefits_fa: string[];
}> = {
  "accident-repair": {
    title_en: "Accident Repair & Chassis Alignment",
    title_fa: "صافکاری تصادفات و شاسی‌کشی لیزری",
    short_en: "Complete structural and cosmetic restoration following a collision.",
    short_fa: "ترمیم کامل آسیب‌های تصادف، شاسی‌کشی با دقت لیزری و تعویض قطعات فابریک.",
    full_en: "Our prestige accident repair service covers everything from carbon composite rebuilds to precision structural realignment. Utilising computerized laser jigs, we restore your vehicle's structural integrity to exact factory standards.",
    full_fa: "خدمات تخصصی صافکاری تصادفات سنگین و سبک شامل بازسازی فیبر کربن، کشش شاسی با شابلون‌های لیزری کارخانه و بازیابی کامل ایمنی و هندلینگ اولیه خودرو.",
    img: "/images/door_restoration.jpg",
    benefits_en: ["Insurance approved direct claim", "Laser structural alignment", "OEM factory parts guaranteed"],
    benefits_fa: ["پیگیری مستقیم با شرکت‌های بیمه", "شاسی‌کشی لیزری سه‌بعدی", "تضمین نصب قطعات اصلی کارخانه"]
  },
  "dent-repair": {
    title_en: "Precision PDR Dent Removal",
    title_fa: "صافکاری بدون رنگ تخصصی (PDR)",
    short_en: "Paintless Dent Removal to retain original factory clearcoat.",
    short_fa: "رفع فرورفتگی، قری و تگرگ‌خوردگی بدون آسیب به رنگ فابریک خودرو.",
    full_en: "Specialist Paintless Dent Removal (PDR) restores panel contour perfection under specialized shadow reflection boards without breaking original factory paint.",
    full_fa: "تکنیک پیشرفته پی‌دی‌آر با استفاده از میله‌های استیل آلمانی و خطوط نوری بازتابی، فرورفتگی‌های بدنه را بدون نیاز به بتونه و نقاشی محو می‌کند.",
    img: "/images/pdr_light.jpg",
    benefits_en: ["Factory paint preserved", "Express same-day completion", "Flawless reflection line"],
    benefits_fa: ["حفظ ۱۰۰٪ رنگ فابریک", "تحویل سریع چند ساعته", "عدم افت قیمت خودرو"]
  },
  "car-paint": {
    title_en: "Low-Bake Oven Paint & Respray",
    title_fa: "نقاشی کوره و پاشش رنگ و کیلر",
    short_en: "Spectrophotometer colour matching and infrared low-bake baking.",
    short_fa: "اسکن کامپیوتری کد رنگ و پاشش حرفه‌ای در کوره مادون قرمز.",
    full_en: "Flawless panel respraying using waterborne DeBeer paints inside computerized low-bake extraction spray ovens for a mirror-like finish.",
    full_fa: "ساخت دقیق فرمول رنگ بر اساس کاتالوگ شرکت سازنده خودرو و پخت لایه‌های رنگ و کیلر سرامیکی با تکنولوژی مادون قرمز جهت جلوگیری از پوسته شدن.",
    img: "/images/artisan_hand_respray.jpg",
    benefits_en: ["Spectrophotometer colour match", "Infrared bake curing", "Lifetime paint guarantee"],
    benefits_fa: ["تطبیق صددرصدی رنگ", "پخت در کوره مادون قرمز", "ضمانت کتبی مادام‌العمر رنگ"]
  },
  "alloy-wheel-repair": {
    title_en: "Hand Panel Beating & Metal Shaping",
    title_fa: "صافکاری سنتی و فرم‌دهی دستی فلز",
    short_en: "Master panel beating on bespoke aluminium & steel bodywork.",
    short_fa: "هنر اصیل فرم‌دهی ورق‌های فلزی و آلومینیومی با دست.",
    full_en: "Traditional metal shaping techniques using custom dollies, shaping hammers, and English wheel forming to restore complex curves and contours.",
    full_fa: "استفاده از تکنیک‌های سنتی و چکش‌های چوبی و مشته‌های مخصوص برای احیای دقیق انحنای گلگیرها و قطعات کمیاب بدون موج‌افتادگی.",
    img: "/images/metal_shaping.jpg",
    benefits_en: ["Aluminium & steel shaping", "Custom body restoration", "Precision contour lines"],
    benefits_fa: ["فرم‌دهی آلومینیوم و فولاد", "بازسازی دست‌ساز قطعات", "حفظ دقیق خطوط انحنای بدنه"]
  }
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang } = useLanguage();
  const service = SERVICES_CATALOG[slug] || SERVICES_CATALOG["accident-repair"];

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans pb-24">
      {/* HERO */}
      <section className="relative py-24 bg-[#050505] border-b border-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={service.img} 
            alt={lang === "EN" ? service.title_en : service.title_fa} 
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          <Link href="/services" className="inline-flex items-center text-[10px] tracking-[0.25em] uppercase text-[#C5A880] hover:underline mb-8">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> {lang === "EN" ? "All Disciplines" : "مشاهده تمام خدمات"}
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.1em] mb-4 uppercase">
            {lang === "EN" ? service.title_en : service.title_fa}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] max-w-2xl font-light tracking-wide leading-relaxed">
            {lang === "EN" ? service.short_en : service.short_fa}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-serif tracking-[0.15em] uppercase mb-4 text-[#EDEDED]">
                {lang === "EN" ? "Technical Execution" : "نحوه اجرای مهندسی و تخصصی"}
              </h2>
              <div className="text-xs md:text-sm text-[#8E8E8E] leading-relaxed space-y-4 font-light tracking-wide">
                <p>{lang === "EN" ? service.full_en : service.full_fa}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-4 text-[#C5A880]">
                {lang === "EN" ? "Standards & Guarantees" : "استانداردها و ضمانت‌نامه"}
              </h3>
              <ul className="space-y-3">
                {(lang === "EN" ? service.benefits_en : service.benefits_fa).map((benefit, i) => (
                  <li key={i} className="flex items-center text-xs text-[#EDEDED] bg-[#0E0E0E] p-4 border border-[#1F1F1F]">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] mr-3 flex-shrink-0" />
                    <span className="font-light tracking-wide">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-5 sticky top-28 space-y-6">
            <div className="border border-[#1F1F1F] bg-[#0A0A0A] p-3">
              <img src={service.img} alt={lang === "EN" ? service.title_en : service.title_fa} className="w-full aspect-[4/3] object-cover" />
            </div>
            
            <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-8">
              <h3 className="font-serif text-base tracking-[0.15em] uppercase mb-2 text-[#EDEDED]">
                {lang === "EN" ? "Request Valuation" : "استعلام قیمت آنلاین"}
              </h3>
              <p className="text-xs text-[#8E8E8E] mb-6 font-light leading-relaxed">
                {lang === "EN" 
                  ? `Direct insurance claim assessment and private estimate for ${service.title_en}.`
                  : `برآورد رسمی هزینه و پیگیری بیمه برای ${service.title_fa}.`
                }
              </p>
              <Link 
                href="/get-a-quote"
                className="w-full block text-center border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] py-3 text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300"
              >
                {lang === "EN" ? "Get Quote »" : "شروع استعلام قیمت »"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
