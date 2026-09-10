"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, Clock, Navigation, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const { lang } = useLanguage();

  const mapQuery = "Advanced Specialist Logistics, Bushey & Oxhey Railway Yard, Pinner Road, Watford, WD19 4EA";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

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

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Details Card */}
          <div className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
            <h2 className="text-lg font-serif tracking-[0.15em] uppercase mb-6 text-[#EDEDED] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C5A880]" />
              {lang === "EN" ? "Atelier Contact" : "اطلاعات تماس کارگاه"}
            </h2>
            <ul className="space-y-4 text-xs text-[#8E8E8E] font-light">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>{lang === "EN" ? "Telephone:" : "تلفن تماس:"} <a href="tel:02071236946" className="text-[#EDEDED] hover:text-[#C5A880] transition-colors font-mono font-bold">020 7123 6946</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>{lang === "EN" ? "Official Enquiries:" : "ایمیل اداری:"} <a href="mailto:info@automoj.co.uk" className="text-[#EDEDED] hover:text-[#C5A880] transition-colors underline font-medium">info@automoj.co.uk</a></span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
                <span>{lang === "EN" ? "Workshop Address:" : "آدرس کارگاه:"} <strong className="text-[#EDEDED] block mt-0.5">Advanced Specialist Logistics, Bushey & Oxhey Railway Yard, Pinner Road, Watford, WD19 4EA</strong></span>
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

        {/* Interactive Google Map Section */}
        <div className="bg-[#0E0E0E] border border-[#1F1F1F] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-base tracking-[0.15em] uppercase text-[#EDEDED] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#C5A880]" />
                {lang === "EN" ? "Find Our Atelier on Map" : "موقعیت کارگاه روی نقشه گوگل"}
              </h3>
              <p className="text-[11px] text-[#8E8E8E] mt-1 font-light">
                {lang === "EN" ? "Watford & Greater London Service Centre" : "منطقه واتفورد و حومه لندن"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#C5A880] text-[#080808] hover:bg-[#b0936b] px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "Get Directions" : "مسیریابی مستقیم"}</span>
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#333333] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "Open Maps" : "مشاهده در گوگل مپ"}</span>
              </a>
            </div>
          </div>

          {/* Embedded Map Frame with Dark Luxury Filter */}
          <div className="w-full h-80 sm:h-96 relative bg-[#111111]">
            <iframe
              title="Auto Moj Workshop Location"
              src={embedUrl}
              className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.85] invert-[0.9] hue-rotate-[180deg]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
