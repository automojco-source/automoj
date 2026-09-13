/**
 * The service catalogue.
 *
 * Lives in lib/ rather than in a page so Server Components can read it for
 * generateStaticParams and generateMetadata, while the interactive view imports
 * the same object on the client, and the services index renders from it too.
 * One source of truth — there used to be a second, diverging copy inside
 * src/app/services/page.tsx.
 *
 * WHAT THIS COPY IS GROUNDED IN (confirmed by the owner, 10 Sep 2026):
 *   - Traditional hand panel beating: full toolset, this is the core skill.
 *   - PDR: full toolset.
 *   - Paint: sprayed in-house. NO low-bake oven, NO infrared curing,
 *     NO spectrophotometer.
 *   - Structural work: done, by traditional methods. NO laser jig, NO 3D
 *     measuring system — so no numeric tolerance or "laser" claims anywhere.
 *   - No IMI/ATA accreditation, no insurer approved-repairer status,
 *     no manufacturer certification, no written warranty document.
 *
 * Every line below is a factual claim about Auto Moj and is enforceable under
 * the DMCC Act 2024 — the burden of proof sits with the business. Do not add a
 * claim about equipment, accreditation or guarantees that the list above does
 * not support.
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
    title_en: "Accident & Collision Repair",
    title_fa: "صافکاری و ترمیم تصادفات",
    short_en: "Panel and body repair after a collision, worked by hand.",
    short_fa: "ترمیم بدنه و قطعات پس از تصادف، با کار دست.",
    full_en:
      "After a collision we look at the car with you, explain what actually needs doing, and agree the work with your insurer if there is a claim. Damaged panels are worked back into shape by hand wherever the metal allows, and replaced only where it does not. If a repair needs equipment we do not have, we will tell you so and point you to a workshop that does.",
    full_fa:
      "بعد از تصادف، خودرو را با هم می‌بینیم، توضیح می‌دهیم واقعاً چه کاری لازم است، و اگر پرونده بیمه باشد کار را با بیمه‌گر شما هماهنگ می‌کنیم. قطعات آسیب‌دیده تا جایی که فلز اجازه بدهد با دست به فرم برمی‌گردند و فقط در صورت لزوم تعویض می‌شوند. اگر ترمیمی به تجهیزاتی نیاز داشته باشد که ما نداریم، صریح می‌گوییم و شما را به کارگاه مجهز راهنمایی می‌کنیم.",
    img: "/images/door_restoration.jpg",
    benefits_en: [
      "We deal with your insurer directly",
      "Repaired by hand where the panel allows",
      "You choose who repairs your car — not your insurer",
    ],
    benefits_fa: [
      "مستقیماً با بیمه‌گر شما در تماسیم",
      "ترمیم با دست، تا جایی که قطعه اجازه بدهد",
      "انتخاب کارگاه با شماست، نه با بیمه‌گر",
    ],
  },

  "panel-beating": {
    slug: "panel-beating",
    title_en: "Hand Panel Beating & Metal Shaping",
    title_fa: "صافکاری سنتی و فرم‌دهی فلز",
    short_en: "Traditional panel beating on aluminium and steel bodywork.",
    short_fa: "صافکاری سنتی روی بدنه آلومینیومی و فولادی.",
    full_en:
      "This is the work the workshop is built around. Using dollies, shaping hammers and an English wheel, a dented or creased panel is worked back to its original curve rather than filled or thrown away. It is slower than fitting a new panel, and it is the only option at all when the panel is no longer made.",
    full_fa:
      "کاری که کل کارگاه حول آن شکل گرفته است. با سندان، چکش‌های فرم‌دهی و چرخ انگلیسی، قطعه‌ی فرورفته یا تاب‌برداشته به انحنای اولیه‌اش برگردانده می‌شود، به‌جای اینکه بتونه بخورد یا دور انداخته شود. از نصب قطعه نو کندتر است — و وقتی قطعه دیگر ساخته نمی‌شود، تنها راه است.",
    img: "/images/metal_shaping.jpg",
    benefits_en: [
      "Aluminium and steel worked by hand",
      "An option for panels that are no longer made",
      "Body lines rebuilt rather than filled",
    ],
    benefits_fa: [
      "کار دست روی آلومینیوم و فولاد",
      "راه‌حلی برای قطعاتی که دیگر تولید نمی‌شوند",
      "بازسازی خطوط بدنه به‌جای بتونه‌کاری",
    ],
  },

  "dent-repair": {
    slug: "dent-repair",
    title_en: "Precision PDR Dent Removal",
    title_fa: "صافکاری بدون رنگ (PDR)",
    short_en: "Paintless Dent Removal that keeps the paint you already have.",
    short_fa: "رفع فرورفتگی بدون آسیب به رنگ موجود خودرو.",
    full_en:
      "Where the paint is unbroken, a dent can be worked out from behind the panel under reflection boards, leaving the original finish untouched. It suits car park dings, trolley marks and hail damage. If the paint is cracked or the metal is stretched, PDR is the wrong tool and we will say so.",
    full_fa:
      "وقتی رنگ نشکسته باشد، فرورفتگی را می‌توان از پشت قطعه و زیر خطوط نوری بازتابی بیرون آورد، بدون اینکه رنگ اصلی دست بخورد. مناسب ضربه‌های پارکینگ، برخورد چرخ‌دستی و تگرگ‌خوردگی است. اگر رنگ ترک خورده یا فلز کشیده شده باشد، PDR ابزار درستی نیست و همین را می‌گوییم.",
    img: "/images/pdr_light.jpg",
    benefits_en: [
      "Existing paint left untouched",
      "Often finished the same day",
      "No filler and no respray",
    ],
    benefits_fa: [
      "رنگ فعلی خودرو دست‌نخورده می‌ماند",
      "در بسیاری موارد تحویل در همان روز",
      "بدون بتونه و بدون نیاز به رنگ",
    ],
  },

  "car-paint": {
    slug: "car-paint",
    title_en: "Paint & Refinishing",
    title_fa: "رنگ و پولیش",
    short_en: "Colour-matched respray, prepared and sprayed in-house.",
    short_fa: "رنگ‌آمیزی مطابق کد رنگ، آماده‌سازی و پاشش در کارگاه.",
    full_en:
      "Repaired panels are stripped back, filled where needed, primed and sprayed here in the workshop. Colour is matched to your vehicle's paint code and blended into the surrounding panels so the repair is not the first thing you see, then flatted and polished by hand.",
    full_fa:
      "قطعه ترمیم‌شده تا زیرکار برداشته می‌شود، در صورت نیاز بتونه می‌خورد، آستر و رنگ آن در همین کارگاه پاشیده می‌شود. رنگ بر اساس کد رنگ خودروی شما ساخته و در قطعات مجاور محو می‌شود تا محل ترمیم اولین چیزی نباشد که به چشم می‌آید، و در پایان با دست سنباده و پولیش می‌خورد.",
    img: "/images/artisan_hand_respray.jpg",
    benefits_en: [
      "Matched to your vehicle's paint code",
      "Blended into the surrounding panels",
      "Flatted and polished by hand",
    ],
    benefits_fa: [
      "مطابق کد رنگ خودروی شما",
      "محو‌سازی در قطعات مجاور",
      "سنباده و پولیش نهایی با دست",
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES_CATALOG);

export const SERVICES_LIST: Service[] = Object.values(SERVICES_CATALOG);

export function getService(slug: string): Service | null {
  return SERVICES_CATALOG[slug] ?? null;
}
