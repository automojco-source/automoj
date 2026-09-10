"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesIndexPage() {
  const { lang } = useLanguage();

  const services = [
    {
      slug: "accident-repair",
      title: lang === "EN" ? "Accident Repair" : "صافکاری تصادفات و بازسازی شاسی",
      shortDesc: lang === "EN" ? "Complete structural and carbon cosmetic restoration following a collision." : "ترمیم کامل شکستگی‌های شاسی، قطعات فیبر کربن و صافکاری تخصصی تصادفات شدید.",
      img: "/images/door_restoration.jpg",
      benefits: lang === "EN" 
        ? ["Insurance approved direct claim", "Laser structural alignment", "OEM factory parts guaranteed"]
        : ["پیگیری مستقیم خسارت از شرکت‌های بیمه", "شاسی‌کشی با دقت لیزری سه‌بعدی", "تضمین استفاده از قطعات فابریک کارخانه"]
    },
    {
      slug: "dent-repair",
      title: lang === "EN" ? "Precision PDR Dent" : "صافکاری بدون رنگ (PDR)",
      shortDesc: lang === "EN" ? "Paintless Dent Removal to retain original factory clearcoat." : "صافکاری بدون رنگ و بدون ریزش رنگ فابریک خودرو با میله‌های پیشرفته PDR.",
      img: "/images/pdr_light.jpg",
      benefits: lang === "EN"
        ? ["Factory paint preserved", "Express same-day completion", "Flawless reflection line"]
        : ["حفظ کامل رنگ فابریک و ارزش خودرو", "تحویل سریع و در همان روز", "یکنواختی کامل بازتاب نور روی بدنه"]
    },
    {
      slug: "car-paint",
      title: lang === "EN" ? "Low-Bake Oven Paint" : "نقاشی کوره و پاشش رنگ",
      shortDesc: lang === "EN" ? "Spectrophotometer colour matching and infrared low-bake baking." : "تطبیق کامپیوتری کد رنگ و پاشش کیلر در کوره با اشعه مادون قرمز.",
      img: "/images/artisan_hand_respray.jpg",
      benefits: lang === "EN"
        ? ["Spectrophotometer colour match", "Infrared bake curing", "Lifetime paint guarantee"]
        : ["اسکن و ساخت دقیق رنگ با دستگاه کامپیوتری", "پخت رنگ در کوره مادون قرمز", "ضمانت مادام‌العمر کیفیت رنگ و پوسته نشدن"]
    },
    {
      slug: "panel-beating",
      title: lang === "EN" ? "Hand Panel Beating" : "صافکاری سنتی و فرم‌دهی دستی",
      shortDesc: lang === "EN" ? "Master panel beating on bespoke aluminium & steel bodywork." : "فرم‌دهی دستی گلگیر و درب‌ها با چکش‌های مخصوص صافکاری و چرخ انگلیسی.",
      img: "/images/metal_shaping.jpg",
      benefits: lang === "EN"
        ? ["Aluminium & steel shaping", "Custom body restoration", "Precision contour lines"]
        : ["فرم‌دهی تخصصی ورق‌های آلومینیومی و فولادی", "بازسازی دست‌ساز قطعات نایاب", "دقت بالا در حفظ خطوط اورجینال بدنه"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans">
      <section className="bg-[#050505] py-20 border-b border-[#1C1C1C] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[#C5A880] text-[10px] uppercase tracking-[0.3em] font-medium block mb-3">
            {lang === "EN" ? "Precision Disciplines" : "خدمات و تخصص‌های اتوموج"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.15em] mb-4 uppercase">
            {lang === "EN" ? "Atelier Services" : "خدمات تخصصی کارگاه"}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider uppercase font-light">
            {lang === "EN" 
              ? "Comprehensive structural and cosmetic restoration for prestige marques in London."
              : "خدمات جامع صافکاری، نقاشی، شاسی‌کشی و دیتیلینگ خودروهای سوپراسپرت و لوکس در لندن."
            }
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.slug} className="flex flex-col bg-[#0E0E0E] border border-[#1F1F1F] p-6 hover:border-[#C5A880]/50 transition-all duration-300 group">
              <div className="aspect-[4/3] overflow-hidden mb-6 border border-[#171717]">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90" 
                />
              </div>
              <h2 className="font-serif text-base tracking-[0.1em] uppercase text-[#EDEDED] mb-3 group-hover:text-[#C5A880] transition-colors">{service.title}</h2>
              <p className="text-xs text-[#8E8E8E] mb-6 flex-1 font-light leading-relaxed">{service.shortDesc}</p>
              
              <ul className="space-y-2 mb-8 border-t border-[#1C1C1C] pt-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-[11px] text-[#8E8E8E] font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link 
                href="/get-a-quote"
                className="w-full text-center border border-[#262626] text-[#8E8E8E] group-hover:border-[#C5A880] group-hover:text-[#C5A880] py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors"
              >
                {lang === "EN" ? "View Specification »" : "استعلام قیمت این خدمت »"}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
