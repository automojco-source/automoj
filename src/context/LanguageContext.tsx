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
    "brand.tagline": "Bodyshop • Watford & NW London",
    "nav.home": "Home",
    "nav.bodywork": "Accident Repair",
    "nav.paint": "Paint & Refinish",
    "nav.pdr": "PDR Dent",
    "nav.restorations": "Our Work",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Estimate",

    // Hero
    "hero.badge": "TRADITIONAL BODYSHOP • WATFORD",
    "hero.title1": "AUTO MOJ",
    "hero.title2": "ACCIDENT REPAIR,",
    "hero.title2.line1": "ACCIDENT",
    "hero.title2.line2": "REPAIR,",
    "hero.title3": "BASED IN",
    "hero.city": "WATFORD.",
    "hero.desc":
      "HAND-FINISHED PANEL BEATING, DENT REMOVAL AND PAINT. SERVING WATFORD AND NORTH WEST LONDON.",
    "hero.cta": "WHAT WE DO",

    // Featured disciplines (4-card grid)
    "featured.title": "WHAT WE DO",
    "card1.title": "DENT & SCRATCH",
    "card1.link": "MORE",
    "card2.title": "RESPRAY & REFINISH",
    "card2.link": "MORE",
    "card3.title": "PRECISION PDR",
    "card3.link": "MORE",
    "card4.title": "PANEL BEATING",
    "card4.link": "MORE",

    // How we work
    "spec.badge": "HAND PANEL BEATING",
    "spec.title": "REPAIR BEFORE REPLACE",
    "spec.price": "FREE ESTIMATE • IN PERSON • NO OBLIGATION",
    "spec.row1.label": "APPROACH",
    "spec.row1.value": "Repair the panel before replacing it",
    "spec.row2.label": "PANEL WORK",
    "spec.row2.value": "Hammer, dolly and English wheel",
    "spec.row3.label": "DENTS",
    "spec.row3.value": "PDR where the paint is unbroken",
    "spec.row4.label": "PAINT",
    "spec.row4.value": "Matched to your vehicle's paint code",
    "spec.row5.label": "INSURANCE",
    "spec.row5.value": "We deal with your insurer directly",
    "spec.row6.label": "ESTIMATE",
    "spec.row6.value": "Free, and free of obligation",
    "spec.cta": "GET A FREE ESTIMATE",

    // Philosophy
    "phil.title": "REPAIRED, NOT REPLACED.",
    "phil.desc":
      "Most bodyshops replace a damaged panel because it is quicker. We would rather save it. Metal is worked back into shape by hand, dents are lifted without breaking the paint where the panel allows, and what cannot be saved is replaced and refinished properly.",
    "phil.cta": "ABOUT THE WORKSHOP",

    // Trust badges
    "trust.1.title": "REPAIR FIRST",
    "trust.1.desc": "PANELS SAVED, NOT REPLACED",
    "trust.2.title": "TRADITIONAL CRAFT",
    "trust.2.desc": "HAND-FORMED METALWORK",
    "trust.3.title": "INSURANCE CLAIMS",
    "trust.3.desc": "WE DEAL WITH YOUR INSURER",
    "trust.4.title": "BASED IN",
    "trust.4.desc": "WATFORD, WD19",

    // Footer
    "footer.desc":
      "An independent bodyshop in Watford. Traditional panel beating, paintless dent removal and refinishing for cars across North West London.",
    "footer.col1.title": "SERVICES",
    "footer.col1.1": "ACCIDENT REPAIR",
    "footer.col1.2": "PAINT & REFINISH",
    "footer.col1.3": "PDR DENT",
    "footer.col1.4": "PANEL BEATING",
    "footer.col2.title": "COMPANY",
    "footer.col2.1": "ABOUT US",
    "footer.col2.2": "OUR SERVICES",
    "footer.col2.3": "OUR WORK",
    "footer.col2.4": "CONTACT",
    "footer.col3.title": "SUPPORT",
    "footer.col3.1": "INSURANCE CLAIMS",
    "footer.col3.2": "FREE ESTIMATE",
    "footer.col3.3": "HOW WE WORK",
    "footer.col3.4": "FIND US",
    "footer.col4.title": "VISIT THE WORKSHOP",
    "footer.col4.hours": "Mon-Fri 08:00-18:00 · Sat 09:00-14:00",
    "footer.col4.cta": "GET DIRECTIONS",
    "footer.copyright": "AUTO MOJ ACCIDENT REPAIR. ALL RIGHTS RESERVED.",
    "footer.privacy": "PRIVACY POLICY",
    "footer.terms": "TERMS & CONDITIONS",
  },

  FA: {
    // Brand & Header
    "brand.name": "اتوموج (AUTO MOJ ACCIDENT REPAIR)",
    "brand.tagline": "صافکاری • واتفورد و شمال‌غرب لندن",
    "nav.home": "صفحه اصلی",
    "nav.bodywork": "صافکاری تصادفات",
    "nav.paint": "رنگ و پولیش",
    "nav.pdr": "صافکاری بدون رنگ (PDR)",
    "nav.restorations": "نمونه کارها",
    "nav.about": "درباره کارگاه",
    "nav.contact": "تماس و آدرس",
    "nav.quote": "برآورد هزینه",

    // Hero
    "hero.badge": "کارگاه صافکاری سنتی • واتفورد",
    "hero.title1": "اتوموج (AUTO MOJ)",
    "hero.title2": "صافکاری و بازسازی تصادفات،",
    "hero.title2.line1": "صافکاری",
    "hero.title2.line2": "و ترمیم تصادفات،",
    "hero.title3": "مستقر در",
    "hero.city": "واتفورد.",
    "hero.desc":
      "صافکاری دستی، رفع فرورفتگی و رنگ. خدمت‌رسانی در واتفورد و شمال‌غرب لندن.",
    "hero.cta": "خدمات ما",

    // Featured disciplines (4-card grid)
    "featured.title": "کارهایی که انجام می‌دهیم",
    "card1.title": "فرورفتگی و خط و خش",
    "card1.link": "بیشتر",
    "card2.title": "رنگ و پولیش",
    "card2.link": "بیشتر",
    "card3.title": "صافکاری بدون رنگ PDR",
    "card3.link": "بیشتر",
    "card4.title": "صافکاری سنتی",
    "card4.link": "بیشتر",

    // How we work
    "spec.badge": "صافکاری دستی",
    "spec.title": "اول ترمیم، بعد تعویض",
    "spec.price": "برآورد رایگان • حضوری • بدون تعهد",
    "spec.row1.label": "رویکرد",
    "spec.row1.value": "پیش از تعویض قطعه، ترمیمش می‌کنیم",
    "spec.row2.label": "کار بدنه",
    "spec.row2.value": "چکش، سندان و چرخ انگلیسی",
    "spec.row3.label": "فرورفتگی",
    "spec.row3.value": "PDR در صورتی که رنگ آسیب ندیده باشد",
    "spec.row4.label": "رنگ",
    "spec.row4.value": "مطابق کد رنگ خودروی شما",
    "spec.row5.label": "بیمه",
    "spec.row5.value": "مستقیماً با بیمه‌گر شما در تماسیم",
    "spec.row6.label": "برآورد",
    "spec.row6.value": "رایگان و بدون تعهد",
    "spec.cta": "دریافت برآورد رایگان",

    // Philosophy
    "phil.title": "ترمیم، نه تعویض.",
    "phil.desc":
      "بیشتر کارگاه‌ها قطعه آسیب‌دیده را عوض می‌کنند چون سریع‌تر است. ما ترجیح می‌دهیم نگهش داریم. فلز را با دست به فرم اولیه برمی‌گردانیم، فرورفتگی را در صورتی که قطعه اجازه دهد بدون آسیب به رنگ بالا می‌آوریم، و آنچه قابل نگه‌داشتن نیست را درست تعویض و رنگ می‌کنیم.",
    "phil.cta": "درباره کارگاه",

    // Trust badges
    "trust.1.title": "اول ترمیم",
    "trust.1.desc": "قطعه را نگه می‌داریم، نه اینکه عوض کنیم",
    "trust.2.title": "کار دست",
    "trust.2.desc": "فرم‌دهی فلز به روش سنتی",
    "trust.3.title": "پرونده بیمه",
    "trust.3.desc": "مستقیماً با بیمه‌گر شما در تماسیم",
    "trust.4.title": "مستقر در",
    "trust.4.desc": "واتفورد، WD19",

    // Footer
    "footer.desc":
      "کارگاه مستقل صافکاری در واتفورد. صافکاری سنتی، رفع فرورفتگی بدون رنگ و نقاشی خودرو برای شمال‌غرب لندن.",
    "footer.col1.title": "خدمات",
    "footer.col1.1": "صافکاری تصادفات",
    "footer.col1.2": "رنگ و پولیش",
    "footer.col1.3": "صافکاری بدون رنگ PDR",
    "footer.col1.4": "صافکاری سنتی",
    "footer.col2.title": "درباره اتوموج",
    "footer.col2.1": "درباره کارگاه",
    "footer.col2.2": "خدمات ما",
    "footer.col2.3": "نمونه کارها",
    "footer.col2.4": "تماس با ما",
    "footer.col3.title": "پشتیبانی",
    "footer.col3.1": "پرونده بیمه",
    "footer.col3.2": "برآورد رایگان",
    "footer.col3.3": "روش کار ما",
    "footer.col3.4": "آدرس کارگاه",
    "footer.col4.title": "مراجعه حضوری",
    "footer.col4.hours": "دوشنبه تا جمعه ۰۸:۰۰–۱۸:۰۰ · شنبه ۰۹:۰۰–۱۴:۰۰",
    "footer.col4.cta": "مسیریابی",
    "footer.copyright": "تمامی حقوق برای مرکز صافکاری تصادفات AUTO MOJ محفوظ است.",
    "footer.privacy": "حریم خصوصی",
    "footer.terms": "شرایط و ضوابط",
  },
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
