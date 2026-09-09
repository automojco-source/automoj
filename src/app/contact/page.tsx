"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans pb-24">
      <section className="bg-[#050505] py-20 border-b border-[#1C1C1C] text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-[#C5A880] text-[10px] uppercase tracking-[0.3em] font-medium block mb-3">
            {lang === "EN" ? "Direct Liaison" : "ارتباط با اتوموج"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.15em] mb-4 uppercase">
            {lang === "EN" ? "Contact & Location" : "تماس و موقعیت کارگاه"}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider uppercase font-light">
            {lang === "EN"
              ? "Get in touch with our team for priority booking, insurance claims, or workshop inspection."
              : "جهت مشاوره خسارت بیمه، رزرو نوبت کارشناسی یا مراجعه حضوری با ما تماس بگیرید."
            }
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Details Card */}
          <div className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
            <h2 className="text-lg font-serif tracking-[0.15em] uppercase mb-6 text-[#EDEDED] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C5A880]" />
              {lang === "EN" ? "Atelier Contact" : "اطلاعات تماس کارگاه"}
            </h2>
            <ul className="space-y-4 text-xs text-[#8E8E8E] font-light">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>{lang === "EN" ? "Direct Telephone:" : "تلفن مستقیم:"} <strong className="text-[#EDEDED] font-mono">020 8888 1234</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>{lang === "EN" ? "Official Enquiries:" : "ایمیل اداری:"} <strong className="text-[#EDEDED]">info@automoj.co.uk</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>{lang === "EN" ? "Workshop Address:" : "آدرس کارگاه:"} <strong className="text-[#EDEDED]">123 Repair Street, Park Royal, London, NW10</strong></span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
            <h2 className="text-lg font-serif tracking-[0.15em] uppercase mb-6 text-[#EDEDED] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C5A880]" />
              {lang === "EN" ? "Operating Hours" : "ساعات کاری"}
            </h2>
            <ul className="space-y-3 text-xs text-[#8E8E8E] font-light">
              <li className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span>{lang === "EN" ? "Monday – Friday:" : "دوشنبه تا جمعه:"}</span>
                <span className="text-[#EDEDED] font-mono">08:00 – 18:00</span>
              </li>
              <li className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span>{lang === "EN" ? "Saturday:" : "شنبه‌ها:"}</span>
                <span className="text-[#EDEDED] font-mono">09:00 – 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>{lang === "EN" ? "Sunday:" : "یکشنبه‌ها:"}</span>
                <span className="text-[#C5A880] font-mono">{lang === "EN" ? "Closed (Emergency Only)" : "تعطیل (فقط موارد اورژانسی)"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
