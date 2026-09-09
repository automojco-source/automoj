"use client";

import Link from "next/link";
import { Shield, Award, Wrench, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-[#050505] text-[#8E8E8E] border-t border-[#1C1C1C] pt-16 pb-12 font-sans">
      {/* 4 Trust Badges matching exact icons in reference image bottom */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 border-b border-[#141414]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Shield className="w-6 h-6 text-[#C5A880] stroke-[1.2]" />
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold">{t("trust.1.title")}</h5>
              <p className="text-[9px] text-[#666666] tracking-wider uppercase mt-0.5">{t("trust.1.desc")}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Wrench className="w-6 h-6 text-[#C5A880] stroke-[1.2]" />
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold">{t("trust.2.title")}</h5>
              <p className="text-[9px] text-[#666666] tracking-wider uppercase mt-0.5">{t("trust.2.desc")}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Award className="w-6 h-6 text-[#C5A880] stroke-[1.2]" />
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold">{t("trust.3.title")}</h5>
              <p className="text-[9px] text-[#666666] tracking-wider uppercase mt-0.5">{t("trust.3.desc")}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Sparkles className="w-6 h-6 text-[#C5A880] stroke-[1.2]" />
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold">{t("trust.4.title")}</h5>
              <p className="text-[9px] text-[#666666] tracking-wider uppercase mt-0.5">{t("trust.4.desc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Column Navigation Grid matching exact reference footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#141414]">
        {/* Brand Column with Roman Monogram */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 border border-[#C5A880]/40 rounded overflow-hidden flex items-center justify-center bg-[#111111] flex-shrink-0 shadow-[0_0_12px_rgba(197,168,128,0.15)]">
              <img
                src="/images/site-icon-sm.png"
                alt="Auto Moj"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif tracking-[0.2em] text-sm text-[#EDEDED] font-bold">{t("brand.name")}</h4>
              <p className="text-[8px] tracking-[0.25em] text-[#C5A880] uppercase">{t("brand.tagline")}</p>
            </div>
          </div>
          <p className="text-[11px] text-[#777777] leading-relaxed pt-2">
            {t("footer.desc")}
          </p>
        </div>

        {/* Column: SERVICES */}
        <div className="md:col-span-2">
          <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold mb-4">{t("footer.col1.title")}</h5>
          <ul className="space-y-2.5 text-[10px] tracking-wider font-light uppercase">
            <li><Link href="/services/accident-repair" className="hover:text-[#C5A880] transition-colors">{t("footer.col1.1")}</Link></li>
            <li><Link href="/services/car-paint" className="hover:text-[#C5A880] transition-colors">{t("footer.col1.2")}</Link></li>
            <li><Link href="/services/dent-repair" className="hover:text-[#C5A880] transition-colors">{t("footer.col1.3")}</Link></li>
            <li><Link href="/services/alloy-wheel-repair" className="hover:text-[#C5A880] transition-colors">{t("footer.col1.4")}</Link></li>
          </ul>
        </div>

        {/* Column: COMPANY */}
        <div className="md:col-span-2">
          <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold mb-4">{t("footer.col2.title")}</h5>
          <ul className="space-y-2.5 text-[10px] tracking-wider font-light uppercase">
            <li><Link href="/about" className="hover:text-[#C5A880] transition-colors">{t("footer.col2.1")}</Link></li>
            <li><Link href="/#craft" className="hover:text-[#C5A880] transition-colors">{t("footer.col2.2")}</Link></li>
            <li><Link href="/before-after" className="hover:text-[#C5A880] transition-colors">{t("footer.col2.3")}</Link></li>
            <li><Link href="/contact" className="hover:text-[#C5A880] transition-colors">{t("footer.col2.4")}</Link></li>
          </ul>
        </div>

        {/* Column: SUPPORT */}
        <div className="md:col-span-2">
          <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold mb-4">{t("footer.col3.title")}</h5>
          <ul className="space-y-2.5 text-[10px] tracking-wider font-light uppercase">
            <li><Link href="/contact" className="hover:text-[#C5A880] transition-colors">{t("footer.col3.1")}</Link></li>
            <li><Link href="/get-a-quote" className="hover:text-[#C5A880] transition-colors">{t("footer.col3.2")}</Link></li>
            <li><Link href="/about" className="hover:text-[#C5A880] transition-colors">{t("footer.col3.3")}</Link></li>
            <li><Link href="/contact" className="hover:text-[#C5A880] transition-colors">{t("footer.col3.4")}</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-3">
          <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-semibold mb-2">{t("footer.col4.title")}</h5>
          <p className="text-[10px] text-[#666666] mb-4 font-light tracking-wide">
            {t("footer.col4.desc")}
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder={t("footer.col4.placeholder")} 
              className="bg-[#0E0E0E] border border-[#222222] px-3 py-2 text-xs text-[#EDEDED] flex-1 focus:outline-none focus:border-[#C5A880]" 
            />
            <button 
              type="button" 
              className="bg-[#141414] border border-l-0 border-[#222222] px-3 text-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] transition-colors text-xs"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright and Legal */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-[0.2em] text-[#555555]">
        <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
        <div className="flex gap-8 mt-4 sm:mt-0 uppercase">
          <Link href="/privacy-policy" className="hover:text-[#C5A880]">{t("footer.privacy")}</Link>
          <Link href="/terms-and-conditions" className="hover:text-[#C5A880]">{t("footer.terms")}</Link>
        </div>
      </div>
    </footer>
  );
}
