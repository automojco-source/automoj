/**
 * The service catalogue.
 *
 * Lives in lib/ rather than in the page so that Server Components can read it
 * for generateStaticParams and generateMetadata, while the interactive view
 * imports the same object on the client. One source of truth for both.
 *
 * NOTE ON CLAIMS: every `benefits` line below is a factual claim about Auto Moj
 * and is enforceable under the DMCC Act 2024 — the burden of proof sits with
 * the business. Do not add a line here that cannot be evidenced on request.
 * Lines currently pending evidence are marked TODO(claim) and must be either
 * substantiated or reworded before launch.
 */

export type Service = {
  slug: string;
  title_en: string;
  title_fa: string;
  short_en: string;
  short_fa: string;
  full_en: string;
  full_fa: string;
  img: string;
  benefits_en: string[];
  benefits_fa: string[];
};

export const SERVICES_CATALOG: Record<string, Service> = {
  "accident-repair": {
    slug: "accident-repair",
    title_en: "Accident Repair & Chassis Alignment",
    title_fa: "صافکاری تصادفات و شاسی‌کشی",
    short_en: "Complete structural and cosmetic restoration following a collision.",
    short_fa: "ترمیم کامل آسیب‌های تصادف، تنظیم ساختار بدنه و تعویض قطعات.",
    full_en:
      "Our accident repair service covers everything from composite panel rebuilds to structural realignment, restoring your vehicle's geometry and finish after a collision.",
    full_fa:
      "خدمات صافکاری تصادفات سنگین و سبک، شامل بازسازی قطعات کامپوزیت، تنظیم مجدد ساختار بدنه و بازیابی ایمنی و هندلینگ اولیه خودرو.",
    img: "/images/door_restoration.jpg",
    // TODO(claim): confirm insurer relationships and parts policy before launch.
    benefits_en: [
      "We liaise with your insurer directly",
      "Structural alignment to manufacturer geometry",
      "Parts sourced to your insurer's specification",
    ],
    benefits_fa: [
      "پیگیری مستقیم پرونده با شرکت بیمه شما",
      "تنظیم ساختار بدنه مطابق هندسه کارخانه",
      "تأمین قطعات مطابق مشخصات تأییدشده بیمه",
    ],
  },
  "dent-repair": {
    slug: "dent-repair",
    title_en: "Precision PDR Dent Removal",
    title_fa: "صافکاری بدون رنگ (PDR)",
    short_en: "Paintless Dent Removal that keeps the original factory clearcoat.",
    short_fa: "رفع فرورفتگی و تگرگ‌خوردگی بدون آسیب به رنگ فابریک خودرو.",
    full_en:
      "Paintless Dent Removal restores panel contour by working the metal from behind, under reflection boards, so the original paint is never broken.",
    full_fa:
      "در تکنیک PDR، فرورفتگی از پشت قطعه و زیر خطوط نوری بازتابی فرم‌دهی می‌شود، بنابراین لایه رنگ اصلی خودرو دست‌نخورده باقی می‌ماند.",
    img: "/images/pdr_light.jpg",
    benefits_en: [
      "Original paint left intact where the panel allows",
      "Often completed the same day",
      "No filler and no respray",
    ],
    benefits_fa: [
      "حفظ رنگ اصلی خودرو در صورت امکان‌پذیر بودن قطعه",
      "در بسیاری موارد تحویل در همان روز",
      "بدون بتونه و بدون نیاز به رنگ",
    ],
  },
  "car-paint": {
    slug: "car-paint",
    title_en: "Low-Bake Oven Paint & Respray",
    title_fa: "نقاشی کوره و پاشش رنگ",
    short_en: "Colour-matched refinishing, cured in a low-bake spray oven.",
    short_fa: "تطبیق کد رنگ و پخت رنگ در کوره پاشش.",
    full_en:
      "Panel respraying with colour matched to your vehicle's paint code, applied and cured in a low-bake extraction spray oven for an even, durable finish.",
    full_fa:
      "پاشش رنگ قطعه بر اساس کد رنگ خودرو، و پخت لایه‌های رنگ و کیلر در کوره پاشش برای یکنواختی و دوام بیشتر.",
    img: "/images/artisan_hand_respray.jpg",
    // TODO(claim): warranty length must match the written warranty document.
    benefits_en: [
      "Colour matched to your vehicle's paint code",
      "Cured in a low-bake spray oven",
      "Written paint warranty — see our warranty terms",
    ],
    benefits_fa: [
      "تطبیق رنگ بر اساس کد رنگ خودرو",
      "پخت در کوره پاشش",
      "ضمانت کتبی رنگ — مطابق شرایط ضمانت‌نامه",
    ],
  },
  "panel-beating": {
    slug: "panel-beating",
    title_en: "Hand Panel Beating & Metal Shaping",
    title_fa: "صافکاری سنتی و فرم‌دهی دستی فلز",
    short_en: "Traditional panel beating on aluminium and steel bodywork.",
    short_fa: "فرم‌دهی دستی ورق‌های فلزی و آلومینیومی به روش سنتی.",
    full_en:
      "Traditional metal shaping using dollies, shaping hammers and English wheel forming to rebuild complex curves — the approach for panels that cannot simply be replaced.",
    full_fa:
      "فرم‌دهی فلز با چکش‌های مخصوص، سندان و چرخ انگلیسی برای بازسازی انحناهای پیچیده — روشی برای قطعاتی که امکان تعویض ندارند.",
    img: "/images/metal_shaping.jpg",
    benefits_en: [
      "Aluminium and steel shaping",
      "Rebuilds for panels that are no longer available",
      "Original body lines restored by hand",
    ],
    benefits_fa: [
      "فرم‌دهی آلومینیوم و فولاد",
      "بازسازی قطعاتی که دیگر در بازار موجود نیستند",
      "احیای دستی خطوط اصلی بدنه",
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES_CATALOG);

/** Slugs that used to exist, and where they went. Used for 301s. */
export const SERVICE_REDIRECTS: Record<string, string> = {
  "alloy-wheel-repair": "panel-beating",
};

export function getService(slug: string): Service | null {
  return SERVICES_CATALOG[slug] ?? null;
}
