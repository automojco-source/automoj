"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

type Language = "EN" | "FA";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Brand & Header
    "brand.name": "AUTO MOJ ACCIDENT REPAIR",
    "brand.tagline": "Prestige Bodyshop • London",
    "nav.home": "Home",
    "nav.bodywork": "Bodywork",
    "nav.paint": "Paint & Bake",
    "nav.pdr": "PDR Dent",
    "nav.restorations": "Restorations",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Quote",

    // Hero Section
    "hero.badge": "LONDON'S PREMIER ATELIER",
    "hero.title1": "AUTO MOJ",
    "hero.title2": "ACCIDENT REPAIR,",
    "hero.title2.line1": "ACCIDENT",
    "hero.title2.line2": "REPAIR,",
    "hero.title3": "BUILT IN",
    "hero.city": "LONDON.",
    "hero.desc": "LUXURY ACCIDENT REPAIR & PRECISION BODYWORK FOR MODERN LEGENDS.",
    "hero.cta": "EXPLORE ATELIER",

    // Featured Disciplines (4-Card Grid)
    "featured.title": "FEATURED COLLECTIONS",
    "card1.title": "DENT & SCRATCH",
    "card1.link": "VIEW SPEC",
    "card2.title": "OVEN RESPRAY",
    "card2.link": "VIEW SPEC",
    "card3.title": "PRECISION PDR",
    "card3.link": "VIEW SPEC",
    "card4.title": "LOW-BAKE PAINT",
    "card4.link": "VIEW SPEC",

    // Section 3 - Monoblock Spec
    "spec.badge": "HAND PANEL BEATING",
    "spec.title": "AUTO MOJ M10-FORGED",
    "spec.price": "FREE ESTIMATE / BESPOKE ASSESSMENT",
    "spec.row1.label": "TOLERANCE",
    "spec.row1.value": "± 0.5mm Contour Precision",
    "spec.row2.label": "ALLOY TYPE",
    "spec.row2.value": "Aerospace 6061-T6 & Steel",
    "spec.row3.label": "MATERIAL",
    "spec.row3.value": "Hand Formed Automotive Sheet",
    "spec.row4.label": "FINISH",
    "spec.row4.value": "Brushed Titanium / Gold Primer",
    "spec.row5.label": "COATING",
    "spec.row5.value": "Low-Bake Anti-Corrosion E-Coat",
    "spec.row6.label": "WARRANTY",
    "spec.row6.value": "Lifetime Structural Guarantee",
    "spec.cta": "UPLOAD PHOTOS & GET QUOTE",

    // Section 4 - Philosophy
    "phil.title": "PRECISION. STRENGTH. STYLE.",
    "phil.desc": "Every component we restore is a fusion of advanced engineering and timeless design. Crafted with aerospace-grade composites and finished to showroom perfection in our London atelier.",
    "phil.cta": "DISCOVER BODYWORK",

    // Footer Trust Badges
    "trust.1.title": "PREMIUM QUALITY",
    "trust.1.desc": "OEM CERTIFIED MATERIALS",
    "trust.2.title": "PRECISION",
    "trust.2.desc": "LASER MEASURED",
    "trust.3.title": "INSURANCE CLAIMS",
    "trust.3.desc": "DIRECT UK LIAISON",
    "trust.4.title": "RESTORED IN",
    "trust.4.desc": "LONDON ATELIER",

    // Footer Columns
    "footer.desc": "Dedicated to automotive perfection. London's bespoke accident repair and precision structural restoration atelier.",
    "footer.col1.title": "SERVICES",
    "footer.col1.1": "BODYWORK",
    "footer.col1.2": "LOW-BAKE PAINT",
    "footer.col1.3": "PDR DENT",
    "footer.col1.4": "PANEL REBUILD",
    "footer.col2.title": "COMPANY",
    "footer.col2.1": "ABOUT US",
    "footer.col2.2": "OUR PROCESS",
    "footer.col2.3": "GALLERY",
    "footer.col2.4": "CONTACT",
    "footer.col3.title": "SUPPORT",
    "footer.col3.1": "INSURANCE FAQS",
    "footer.col3.2": "COLLECTION",
    "footer.col3.3": "WARRANTY",
    "footer.col3.4": "LOCATION",
    "footer.col4.title": "JOIN AUTO MOJ",
    "footer.col4.desc": "Subscribe for exclusive accident priority access and claim guidance.",
    "footer.col4.placeholder": "Your email address",
    "footer.copyright": "AUTO MOJ ACCIDENT REPAIR. ALL RIGHTS RESERVED.",
    "footer.privacy": "PRIVACY POLICY",
    "footer.terms": "TERMS & CONDITIONS"
  },
  FA: {
    // Brand & Header
    "brand.name": "اتوموج (AUTO MOJ ACCIDENT REPAIR)",
    "brand.tagline": "مرکز تخصصی صافکاری و بازسازی تصادفات • لندن",
    "nav.home": "صفحه اصلی",
    "nav.bodywork": "صافکاری و بدنه",
    "nav.paint": "رنگ کوره و پاشش",
    "nav.pdr": "صافکاری بدون رنگ (PDR)",
    "nav.restorations": "گالری بازسازی",
    "nav.about": "درباره کارگاه",
    "nav.contact": "تماس و آدرس",
    "nav.quote": "استعلام قیمت",

    // Hero Section
    "hero.badge": "کارگاه تخصصی خودروهای لوکس در لندن",
    "hero.title1": "اتوموج (AUTO MOJ)",
    "hero.title2": "صافکاری و بازسازی تصادفات،",
    "hero.title2.line1": "صافکاری تخصصی",
    "hero.title2.line2": "و بازسازی تصادفات،",
    "hero.title3": "مستقر در",
    "hero.city": "لندن.",
    "hero.desc": "صافکاری تخصصی تصادفات، فرم‌دهی فلز و نقاشی فوق‌العاده برای خودروهای افسانه‌ای و مدرن.",
    "hero.cta": "مشاهده خدمات کارگاه",

    // Featured Disciplines (4-Card Grid)
    "featured.title": "بخش‌های تخصصی کارگاه",
    "card1.title": "ترمیم تصادف و خط و خش",
    "card1.link": "مشاهده جزئیات",
    "card2.title": "رنگ‌آمیزی کوره",
    "card2.link": "مشاهده جزئیات",
    "card3.title": "صافکاری بدون رنگ PDR",
    "card3.link": "مشاهده جزئیات",
    "card4.title": "پاشش رنگ نهایی و کیلر",
    "card4.link": "مشاهده جزئیات",

    // Section 3 - Monoblock Spec
    "spec.badge": "صافکاری سنتی با چکش و فرم‌دهی دست",
    "spec.title": "شاسی‌کشی و فرم‌دهی M10 اتوموج",
    "spec.price": "کارشناسی و برآورد رایگان هزینه / قیمت‌گذاری اختصاصی",
    "spec.row1.label": "میزان تلورانس و دقت",
    "spec.row1.value": "دقت ۰.۵± میلیمتر مطابق شابلون کارخانه",
    "spec.row2.label": "نوع آلیاژ بدنه",
    "spec.row2.value": "آلومینیوم هوانوردی 6061-T6 و فولاد سبک",
    "spec.row3.label": "متریال کاربردی",
    "spec.row3.value": "ورق‌های فلزی فابریک فرم‌دهی شده با دست",
    "spec.row4.label": "زیرسازی و فینیش",
    "spec.row4.value": "آستر طلایی ضدخوردگی و زیرسازی مات",
    "spec.row5.label": "پوشش محافظتی",
    "spec.row5.value": "پوشش الکترواستاتیک ضدزنگ کوره",
    "spec.row6.label": "گارانتی شرکتی",
    "spec.row6.value": "ضمانت مادام‌العمر خطوط و استحکام بدنه",
    "spec.cta": "ارسال عکس خسارت و استعلام فوری قیمت",

    // Section 4 - Philosophy
    "phil.title": "دقت بالا. استحکام. زیبایی ماندگار.",
    "phil.desc": "هر قطعه‌ای که در اتوموج ترمیم می‌شود، ترکیبی از مهندسی پیشرفته و هنر دست اصیل است. بازسازی قطعات فیبر کربن و فلز با بالاترین استاندارد نمایشگاهی در آتلیه اختصاصی ما در لندن.",
    "phil.cta": "کشف تخصص‌های صافکاری",

    // Footer Trust Badges
    "trust.1.title": "کیفیت فوق‌العاده",
    "trust.1.desc": "متریال رسمی و دارای گواهی OEM",
    "trust.2.title": "دقت میکرومتری",
    "trust.2.desc": "اندازه‌گیری و شابلون‌کشی لیزری",
    "trust.3.title": "دریافت خسارت بیمه",
    "trust.3.desc": "پیگیری مستقیم پرونده‌های بیمه انگلستان",
    "trust.4.title": "بازسازی اصیل",
    "trust.4.desc": "در کارگاه تخصصی لندن",

    // Footer Columns
    "footer.desc": "تعهد کامل به اوج کیفیت خودرو. کارگاه تخصصی صافکاری تصادفات سنگین و سبک، رنگ کوره و شاسی‌کشی در لندن.",
    "footer.col1.title": "خدمات کارگاه",
    "footer.col1.1": "صافکاری و بازسازی بدنه",
    "footer.col1.2": "رنگ کوره و پاشش کیلر",
    "footer.col1.3": "صافکاری بدون رنگ PDR",
    "footer.col1.4": "ترمیم و ساخت قطعات کربن",
    "footer.col2.title": "درباره اتوموج",
    "footer.col2.1": "درباره کارگاه ما",
    "footer.col2.2": "مراحل ترمیم خودرو",
    "footer.col2.3": "گالری نمونه کارها",
    "footer.col2.4": "ارتباط با مدیر فنی",
    "footer.col3.title": "پشتیبانی و بیمه",
    "footer.col3.1": "سوالات خسارت بیمه",
    "footer.col3.2": "حمل و یدک‌کش خودرو",
    "footer.col3.3": "شرایط گارانتی کارگاه",
    "footer.col3.4": "لوکیشن و ساعات کاری",
    "footer.col4.title": "عضویت در اتوموج",
    "footer.col4.desc": "برای دریافت اولویت نوبت‌دهی و مشاوره رایگان خسارت بیمه ثبت‌نام کنید.",
    "footer.col4.placeholder": "ایمیل خود را وارد کنید",
    "footer.copyright": "تمامی حقوق برای مرکز صافکاری تصادفات AUTO MOJ محفوظ است.",
    "footer.privacy": "حریم خصوصی",
    "footer.terms": "شرایط و ضوابط"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: (key: string) => key,
});

/* -------------------------------------------------------------------------- *
 * Language store
 *
 * The chosen language lives in localStorage, which is an external system, so
 * it is read through useSyncExternalStore rather than copied into state inside
 * an effect. That matters for two reasons: setState inside an effect causes a
 * cascading render, and the server has no localStorage, so the first client
 * render must match the server's ("EN") or hydration breaks.
 *
 * This is a stopgap. The durable fix is /en and /fa route segments so the
 * server renders the right language, with the correct lang and dir in the HTML
 * it sends — without which the Farsi content is invisible to search engines.
 * -------------------------------------------------------------------------- */

const STORAGE_KEY = "auto_moj_lang";

let currentLang: Language = "EN";
let initialised = false;
const listeners = new Set<() => void>();

function readStored(): Language {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "FA" || value === "EN" ? value : "EN";
  } catch {
    // Private mode, or storage disabled. English is a fine default.
    return "EN";
  }
}

function applyToDocument(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang === "FA" ? "fa" : "en";
  document.documentElement.dir = lang === "FA" ? "rtl" : "ltr";
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  if (!initialised) {
    initialised = true;
    currentLang = readStored();
    applyToDocument(currentLang);
  }

  listeners.add(listener);

  // Keep other tabs of the same site in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    const next = readStored();
    if (next === currentLang) return;
    currentLang = next;
    applyToDocument(next);
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = (): Language => currentLang;
const getServerSnapshot = (): Language => "EN";

function writeLang(next: Language) {
  if (next === currentLang) return;
  currentLang = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Not being able to remember the choice is survivable; switching is not.
  }
  applyToDocument(next);
  emit();
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Language) => writeLang(next), []);

  const t = useCallback(
    (key: string): string =>
      translations[lang]?.[key] ?? translations.EN?.[key] ?? key,
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
