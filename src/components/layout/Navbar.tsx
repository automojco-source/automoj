"use client";

import { useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Roman Bust/Emblem Brand */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 border border-[#C5A880]/40 rounded overflow-hidden flex items-center justify-center bg-[#0D0D0D] group-hover:border-[#C5A880] transition-all flex-shrink-0 shadow-[0_0_12px_rgba(197,168,128,0.15)]">
            <NextImage
              src="/images/site-icon-sm.png"
              alt="Auto Moj"
              fill
              sizes="36px"
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif tracking-[0.08em] sm:tracking-[0.25em] text-[10px] sm:text-sm leading-[1.15] text-[#EDEDED] font-semibold">
              {t("brand.name")}
            </span>
            <span className="text-[6px] sm:text-[8px] tracking-[0.12em] sm:tracking-[0.3em] text-[#C5A880] uppercase mt-0.5 leading-[1.2]">
              {t("brand.tagline")}
            </span>
          </div>
        </Link>
        
        {/* Center: Desktop Navigation Menu with Translation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] uppercase tracking-[0.2em] font-medium text-[#8E8E8E]">
          <Link href="/" className="text-[#EDEDED] hover:text-[#C5A880] transition-colors">
            {t("nav.home")}
          </Link>
          <Link href="/services/accident-repair" className="hover:text-[#C5A880] transition-colors">
            {t("nav.bodywork")}
          </Link>
          <Link href="/services/car-paint" className="hover:text-[#C5A880] transition-colors">
            {t("nav.paint")}
          </Link>
          <Link href="/services/dent-repair" className="hover:text-[#C5A880] transition-colors">
            {t("nav.pdr")}
          </Link>
          {/* RESTORATIONS LINK (Uncomment when real workshop before/after photos are uploaded):
          <Link href="/before-after" className="hover:text-[#C5A880] transition-colors">
            {t("nav.restorations")}
          </Link> */}
          <Link href="/about" className="hover:text-[#C5A880] transition-colors">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="hover:text-[#C5A880] transition-colors">
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Right: Language Selector Switcher + Quote Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <div className="flex items-center border border-[#262626] bg-[#111111] p-0.5 text-[10px] font-semibold tracking-wider">
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`px-2 py-1 transition-colors ${lang === "EN" ? "bg-[#C5A880] text-[#080808]" : "text-[#8E8E8E] hover:text-[#EDEDED]"}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("FA")}
              className={`px-2 py-1 transition-colors ${lang === "FA" ? "bg-[#C5A880] text-[#080808]" : "text-[#8E8E8E] hover:text-[#EDEDED]"}`}
            >
              فا
            </button>
          </div>

          <Link
            href="/get-a-quote"
            className="border border-[#333333] hover:border-[#C5A880] text-[#C5A880] px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{t("nav.quote")}</span>
            <span className="text-xs">&raquo;</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#8E8E8E] hover:text-[#C5A880] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-5 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
            <span className="text-[10px] uppercase tracking-wider text-[#666666]">
              {lang === "EN" ? "Language:" : "زبان سایت:"}
            </span>
            <div className="flex gap-1 text-xs">
              <button 
                onClick={() => setLang("EN")} 
                className={`px-2.5 py-0.5 border ${lang === "EN" ? "border-[#C5A880] text-[#C5A880] font-bold" : "border-[#222222] text-[#666666]"}`}
              >
                English
              </button>
              <button 
                onClick={() => setLang("FA")} 
                className={`px-2.5 py-0.5 border ${lang === "FA" ? "border-[#C5A880] text-[#C5A880] font-bold" : "border-[#222222] text-[#666666]"}`}
              >
                فارسی
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-3.5 text-xs tracking-[0.2em] font-medium">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-[#EDEDED] py-1.5 border-b border-[#141414] uppercase">
              {t("nav.home")}
            </Link>
            <Link href="/services/accident-repair" onClick={() => setMobileMenuOpen(false)} className="text-[#8E8E8E] hover:text-[#C5A880] py-1.5 border-b border-[#141414] uppercase">
              {t("nav.bodywork")}
            </Link>
            <Link href="/services/car-paint" onClick={() => setMobileMenuOpen(false)} className="text-[#8E8E8E] hover:text-[#C5A880] py-1.5 border-b border-[#141414] uppercase">
              {t("nav.paint")}
            </Link>
            <Link href="/services/dent-repair" onClick={() => setMobileMenuOpen(false)} className="text-[#8E8E8E] hover:text-[#C5A880] py-1.5 border-b border-[#141414] uppercase">
              {t("nav.pdr")}
            </Link>
            {/* RESTORATIONS LINK (Uncomment when real workshop before/after photos are uploaded):
            <Link href="/before-after" onClick={() => setMobileMenuOpen(false)} className="text-[#8E8E8E] hover:text-[#C5A880] py-1.5 border-b border-[#141414] uppercase">
              {t("nav.restorations")}
            </Link> */}
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#8E8E8E] hover:text-[#C5A880] py-1.5 border-b border-[#141414] uppercase">
              {t("nav.about")}
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[#8E8E8E] hover:text-[#C5A880] py-1.5 uppercase">
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="/get-a-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center bg-[#C5A880] text-[#080808] font-bold py-2.5 text-xs tracking-[0.2em] uppercase"
            >
              {lang === "EN" ? "Request Free Estimate" : "ثبت درخواست استعلام قیمت"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
