"use client";

import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function BeforeAfterPage() {
  const { lang } = useLanguage();

  const projects = [
    {
      title: "Porsche 911 Carrera",
      service: lang === "EN" ? "Full Panel Respray & Scratch Removal" : "نقاشی کامل قطعه و رفع خط و خش عمیق",
      image: "https://images.unsplash.com/photo-1503376712351-1f28f7fc3fb4?q=80&w=1200&auto=format&fit=crop",
      details: lang === "EN"
        ? ["Flawless colour matching", "Clear coat restoration", "Completed in 3 days"]
        : ["تطبیق صددرصدی کد رنگ", "ترمیم لایه شفاف کیلر کوره", "تحویل ۳ روزه پروژه"]
    },
    {
      title: "Ferrari F8 Tributo",
      service: lang === "EN" ? "Carbon Bumper & Splitter Restoration" : "ترمیم شکستگی سپر فیبر کربن و زیرسازی",
      image: "https://images.unsplash.com/photo-1555353540-64fd37380cf0?q=80&w=1200&auto=format&fit=crop",
      details: lang === "EN"
        ? ["Bespoke carbon weave repair", "Negative pressure baking", "OEM factory fit"]
        : ["بافت مجدد فیبر کربن آسیب‌دیده", "پخت در اتاق رنگ کوره", "نصب دقیق با فواصل فابریک"]
    },
    {
      title: "Mercedes G-Class",
      service: lang === "EN" ? "Major Collision & Structural Chassis Jig" : "صافکاری تصادف شدید و شاسی‌کشی لیزری",
      image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1200&auto=format&fit=crop",
      details: lang === "EN"
        ? ["Insurance direct liaison", "OEM parts fitted", "Factory tolerance restored"]
        : ["پیگیری مستقیم با بیمه", "نصب قطعات اورجینال", "بازگشت دقیق به ابعاد کارخانه"]
    },
    {
      title: "Aston Martin DBS",
      service: lang === "EN" ? "Paintless Dent Removal (PDR)" : "صافکاری بدون رنگ تخصصی (PDR)",
      image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop",
      details: lang === "EN"
        ? ["Zero paint required", "Original clearcoat retained", "Same day delivery"]
        : ["بدون نیاز به حتی یک قطره رنگ", "حفظ کامل رنگ و اصالت خودرو", "تحویل در همان روز"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans pb-24">
      <section className="bg-[#050505] py-20 border-b border-[#1C1C1C] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[#C5A880] text-[10px] uppercase tracking-[0.3em] font-medium block mb-3">
            {lang === "EN" ? "Excellence in Motion" : "نمونه کارهای واقعی ما"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.15em] mb-4 uppercase">
            {lang === "EN" ? "Restorations Gallery" : "گالری پروژه‌های بازسازی"}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider uppercase font-light">
            {lang === "EN"
              ? "See the quality of our craftsmanship before and after master restoration."
              : "کیفیت هنر صافکاری و نقاشی اتوموج را در مقایسه قبل و بعد از تعمیر مشاهده کنید."
            }
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-[#0E0E0E] border border-[#1F1F1F] p-5 flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden bg-black mb-6 border border-[#171717]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover filter brightness-90" />
              </div>
              
              <h2 className="font-serif text-lg tracking-[0.1em] uppercase text-[#EDEDED] mb-1 font-semibold">{project.title}</h2>
              <span className="text-xs text-[#C5A880] tracking-wider uppercase font-medium mb-4 block">{project.service}</span>
              
              <ul className="space-y-2 mb-8 border-t border-[#1C1C1C] pt-4">
                {project.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-xs text-[#8E8E8E] font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] mr-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link 
                  href="/get-a-quote"
                  className="w-full block text-center border border-[#262626] text-[#8E8E8E] group-hover:border-[#C5A880] group-hover:text-[#C5A880] py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-colors"
                >
                  {lang === "EN" ? "Request Similar Repair »" : "درخواست استعلام برای این خدمت »"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
