import { SITE, hasLegalDetails, hasSoleTraderDetails, hasTradingDisclosure } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/prisma";
import { isNotifyConfigured, isTelegramConfigured, isEmailConfigured } from "@/lib/notify";

/**
 * Things that must be true before the site goes live.
 *
 * Surfaced on the admin dashboard rather than kept in a document, because a
 * checklist nobody opens is a checklist nobody finishes. Each item says what is
 * wrong and what to do about it — never just "missing".
 *
 * `manual` items cannot be detected from the code; they stay listed until
 * someone confirms them, which is the point.
 */

export type LaunchCheck = {
  id: string;
  label: string;
  detail: string;
  ok: boolean;
  /** True when nothing in the code can verify this — a human must confirm. */
  manual?: boolean;
};

export function launchChecks(): LaunchCheck[] {
  return [
    {
      id: "database",
      label: "Database connected",
      detail: isDatabaseConfigured()
        ? "Quote requests are being stored."
        : "Set DATABASE_URL in .env.local, then run `npx prisma db push`. Until then the quote form tells customers to phone instead.",
      ok: isDatabaseConfigured(),
    },
    {
      id: "notify",
      label: "Lead notification",
      detail: isNotifyConfigured()
        ? "New enquiries are sent to " + [isTelegramConfigured() ? "Telegram" : null, isEmailConfigured() ? "email" : null].filter(Boolean).join(" and ") + "."
        : "Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (or RESEND_API_KEY, LEAD_NOTIFY_FROM and LEAD_NOTIFY_TO for email). Without one of these, nobody is told when an enquiry arrives.",
      ok: isNotifyConfigured(),
    },
    {
      id: "legal",
      label: "Trading disclosure (Companies Act / e-commerce regs)",
      detail: hasLegalDetails()
        ? "Shown in the footer on every page (registered company)."
        : hasSoleTraderDetails()
          ? "Shown in the footer on every page (sole trader)."
          : "Neither SITE.legal (once the company number is issued) nor SITE.soleTrader.fullName (right now, if trading as a sole trader before then) is filled in. One of the two is a legal requirement while the site is live, not a nicety — see the comment above SITE.soleTrader in src/lib/site.ts.",
      ok: hasTradingDisclosure(),
    },
    {
      id: "whatsapp",
      label: "WhatsApp number verified",
      detail: SITE.whatsapp
        ? `Open https://wa.me/${SITE.whatsapp} and check it opens a real chat. A UK landline only works on WhatsApp if it has been registered through the WhatsApp Business app by voice verification — otherwise every visitor who taps the button sees "invalid number".`
        : "The WhatsApp button is hidden because no number is set.",
      ok: false,
      manual: true,
    },
    {
      id: "phone",
      label: "Telephone line answered",
      detail: `${SITE.telephone.display} is an 020 (London) number on a Watford address. Confirm the line is live and answered, and consider a 01923 number so it matches the Google Business Profile and the site's Watford positioning.`,
      ok: false,
      manual: true,
    },
    {
      id: "farsi",
      label: "Persian version removed",
      detail: "The site ships English-only. Remove LanguageContext, the language switcher, the Vazirmatn font and the [lang=\"fa\"] rules as the last change before launch.",
      ok: false,
      manual: true,
    },
    {
      id: "legal-review",
      label: "Legal pages reviewed by a solicitor",
      detail: "The privacy policy and terms describe the site accurately, but a UK commercial solicitor should read them, along with the service copy, before launch.",
      ok: false,
      manual: true,
    },
  ];
}
