/**
 * Name, Address, Phone — one source of truth.
 *
 * Local search ranking depends on these matching EXACTLY wherever they appear:
 * the contact page, the footer, the structured data, and the Google Business
 * Profile. Three hand-maintained copies is how a business ends up with three
 * slightly different addresses on the web and no local ranking at all, so every
 * surface reads from here.
 *
 * If any of this changes, change it here and nowhere else — then update the
 * Google Business Profile to match, character for character.
 */

/**
 * `??` only falls back on undefined, so an env var that is present but blank
 * would otherwise switch the WhatsApp button off silently. Blank means "not
 * configured" here; the literal "off" is the way to disable it deliberately.
 */
const WHATSAPP_DEFAULT = "442071236946";
const whatsappEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
const whatsappNumber =
  whatsappEnv.toLowerCase() === "off"
    ? ""
    : (whatsappEnv || WHATSAPP_DEFAULT).replace(/[^0-9]/g, "");

export const SITE = {
  /** Trading name, as it should appear to customers and in search results. */
  name: "Auto Moj Accident Repair",
  shortName: "Auto Moj",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://automoj.co.uk",

  telephone: {
    display: "020 7123 6946",
    /** E.164 — the format `tel:` links and structured data should carry. */
    e164: "+442071236946",
  },

  email: "info@automoj.co.uk",

  address: {
    /** The unit/operator name the yard is listed under. */
    name: "Advanced Specialist Logistics",
    street: "Bushey & Oxhey Railway Yard, Pinner Road",
    locality: "Watford",
    region: "Hertfordshire",
    postcode: "WD19 4EA",
    country: "GB",
  },

  /**
   * Registered business details.
   *
   * Companies Act 2006 and the Electronic Commerce (EC Directive) Regulations
   * 2002 require a trading company to show its registered name, number, place
   * of registration and registered office on its website — in practice, in the
   * footer of every page. A sole trader shows their own full name and a
   * business address instead.
   *
   * Registration is in progress as of 10 Sep 2026. Until these are filled in,
   * the footer shows nothing (a half-filled legal notice is worse than none)
   * and the admin dashboard lists it as outstanding. FILL BEFORE LAUNCH.
   */
  legal: {
    /** e.g. "Auto Moj Ltd" — the registered name, not the trading name. */
    registeredName: null as string | null,
    /** Companies House number. */
    companyNumber: null as string | null,
    /** "England and Wales", "Scotland", or "Northern Ireland". */
    placeOfRegistration: "England and Wales" as string | null,
    /** Registered office, if different from the workshop address. */
    registeredOffice: null as string | null,
    /** Only once VAT registered. */
    vatNumber: null as string | null,
  },

  /**
   * Sole-trader disclosure — applies ONLY while the Ltd company registration
   * is still in progress and the business trades as an individual under a
   * business name.
   *
   * The Company, Limited Liability Partnership and Business (Names and
   * Trading Disclosures) Regulations 2015, together with the Electronic
   * Commerce (EC Directive) Regulations 2002, require a sole trader who
   * trades under a name other than their own to show their full name and a
   * contact address on their website — this is a live, present-tense legal
   * requirement, separate from and not satisfied by Ltd company registration
   * being in progress. FILL THIS IN NOW if the business is currently trading
   * as a sole trader (or partnership); once the Ltd company is registered,
   * clear this and fill in `legal` above instead — the two are mutually
   * exclusive.
   */
  soleTrader: {
    /** The proprietor's full personal name, e.g. "Jane Smith". */
    fullName: null as string | null,
  },

  /**
   * How long personal data is kept. Stated in the privacy policy, so these two
   * values and that page must always agree.
   *
   * Six years for job records matches the limitation period for a contract
   * claim in England and Wales — long enough to answer a complaint about a
   * repair with the record still in hand.
   */
  retention: {
    enquiry: { en: "12 months", fa: "۱۲ ماه" },
    jobRecord: { en: "6 years", fa: "۶ سال" },
  },

  /** Towns the workshop actually serves, nearest first. */
  areaServed: [
    "Watford",
    "Bushey",
    "Oxhey",
    "Pinner",
    "Harrow",
    "Stanmore",
    "Wembley",
    "North West London",
  ],

  /** 24-hour times. `null` closes the day. */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { days: ["Saturday"], opens: "09:00", closes: "14:00" },
    { days: ["Sunday"], opens: null, closes: null },
  ],

  /**
   * WhatsApp number in international format, digits only, no leading "+".
   *
   * Currently the same line as the telephone above. NOTE: wa.me only works if
   * that number is actually registered on WhatsApp. A UK landline can be
   * registered, but only through the WhatsApp Business app using voice
   * verification — it does not happen automatically. If it is not registered,
   * the link shows "the phone number shared via link is invalid" to every
   * visitor who taps it, so test the link before launch.
   *
   * Override with NEXT_PUBLIC_WHATSAPP_NUMBER; set it to "off" to hide the
   * WhatsApp buttons entirely.
   */
  whatsapp: whatsappNumber,
} as const;

/** One-line postal address, as Royal Mail would write it. */
export function formattedAddress(): string {
  const a = SITE.address;
  return `${a.name}, ${a.street}, ${a.locality}, ${a.postcode}`;
}

/** True once the registered Ltd company details have been filled in. */
export function hasLegalDetails(): boolean {
  return Boolean(SITE.legal.registeredName && SITE.legal.companyNumber);
}

/** True once the sole-trader proprietor name has been filled in. */
export function hasSoleTraderDetails(): boolean {
  return Boolean(SITE.soleTrader.fullName);
}

/**
 * True once SOME form of the legally required trading disclosure is ready to
 * show — either the Ltd company details, or the sole-trader name. Exactly
 * one of these should ever be filled in at a time.
 */
export function hasTradingDisclosure(): boolean {
  return hasLegalDetails() || hasSoleTraderDetails();
}

export function googleMapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress())}`;
}

export function googleMapsDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formattedAddress())}`;
}
