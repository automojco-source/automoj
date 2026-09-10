"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import {
  Car,
  Camera,
  User,
  CalendarCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Validation shared with the server (src/lib/validation.ts)
 * ------------------------------------------------------------------ */
import {
  DAMAGE_TYPES,
  CONTACT_METHODS,
  isUkReg,
  isUkPostcode,
  isUkPhone,
  isEmail,
  normaliseReg,
  type DamageType,
  type ContactMethod,
} from "@/lib/validation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

type FormState = {
  regNumber: string;
  damageType: DamageType;
  description: string;
  preferredDate: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  contactMethod: ContactMethod;
  consent: boolean;
  website: string; // honeypot — real users never see or fill this
};

const EMPTY: FormState = {
  regNumber: "",
  damageType: "MINOR_SCRATCH",
  description: "",
  preferredDate: "",
  name: "",
  phone: "",
  email: "",
  postcode: "",
  contactMethod: "PHONE",
  consent: false,
  website: "",
};

export function QuoteForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const fa = lang === "FA";

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const STEPS = [
    { id: 1, title: fa ? "خودرو" : "Vehicle", icon: Car },
    { id: 2, title: fa ? "خسارت" : "Damage", icon: Camera },
    { id: 3, title: fa ? "تماس" : "Contact", icon: User },
    { id: 4, title: fa ? "ارسال" : "Submit", icon: CalendarCheck },
  ];

  /* --------------------------- validation --------------------------- */

  function validateStep(n: number): boolean {
    const e: Record<string, string> = {};

    if (n === 1) {
      if (!isUkReg(data.regNumber)) {
        e.regNumber = fa
          ? "شماره پلاک بریتانیایی معتبر وارد کنید — مثلاً AB12 CDE"
          : "Enter a valid UK registration, e.g. AB12 CDE";
      }
    }

    if (n === 3) {
      if (data.name.trim().length < 2) {
        e.name = fa ? "نام و نام خانوادگی را وارد کنید" : "Enter your full name";
      }
      if (!isUkPhone(data.phone)) {
        e.phone = fa
          ? "شماره تماس بریتانیایی معتبر وارد کنید — مثلاً 07123 456789"
          : "Enter a valid UK phone number, e.g. 07123 456789";
      }
      if (!isEmail(data.email)) {
        e.email = fa ? "ایمیل معتبر وارد کنید" : "Enter a valid email address";
      }
      if (!isUkPostcode(data.postcode)) {
        e.postcode = fa
          ? "کدپستی بریتانیایی معتبر وارد کنید — مثلاً WD19 4EA"
          : "Enter a valid UK postcode, e.g. WD19 4EA";
      }
    }

    if (n === 4 && !data.consent) {
      e.consent = fa
        ? "برای ارسال درخواست، باید با نحوه استفاده از اطلاعاتتان موافقت کنید"
        : "Please confirm you agree to how we use your details";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  /* ----------------------------- submit ----------------------------- */

  async function submit() {
    if (!validateStep(4)) return;

    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, regNumber: normaliseReg(data.regNumber) }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok || !payload?.ok) {
        // Surface field errors the server found, if any.
        if (payload?.issues && typeof payload.issues === "object") {
          setErrors(payload.issues as Record<string, string>);
        }
        setStatus("failed");
        setServerError(
          payload?.message ??
            (fa
              ? "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا مستقیماً با ما تماس بگیرید."
              : "We could not send your request. Please try again, or contact us directly."),
        );
        return;
      }

      setReference(payload.quoteId ?? null);
      setStatus("sent");
    } catch {
      // Network / offline. Never tell the customer this succeeded.
      setStatus("failed");
      setServerError(
        fa
          ? "ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید."
          : "We could not reach the server. Check your connection and try again.",
      );
    }
  }

  /* --------------------------- success view -------------------------- */

  if (status === "sent") {
    const waText = fa
      ? `سلام اتوموج، کد پیگیری من ${reference} است. عکس‌های خسارت خودرو را می‌فرستم.`
      : `Hi Auto Moj, my reference is ${reference}. Here are photos of the damage.`;
    const waUrl = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`
      : null;

    return (
      <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 sm:p-10 max-w-3xl mx-auto text-[#EDEDED] text-center">
        <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto mb-5 stroke-[1.2]" />
        <h2 className="text-xl sm:text-2xl font-serif tracking-[0.15em] uppercase mb-3">
          {fa ? "درخواست شما ثبت شد" : "Request Received"}
        </h2>
        <p className="text-xs sm:text-sm text-[#8E8E8E] font-light mb-6 max-w-md mx-auto leading-relaxed">
          {fa
            ? "کارشناسان ما درخواست شما را بررسی می‌کنند و در اولین فرصت کاری با شما تماس می‌گیرند."
            : "Our estimators will review your request and get back to you as soon as possible."}
        </p>

        {reference && (
          <div className="inline-block border border-[#2E2E2E] bg-[#141414] px-6 py-3 mb-8">
            <span className="block text-[9px] tracking-[0.25em] uppercase text-[#8E8E8E] mb-1">
              {fa ? "کد پیگیری" : "Your Reference"}
            </span>
            <span className="font-mono text-lg font-bold text-[#C5A880]" dir="ltr">
              {reference}
            </span>
          </div>
        )}

        <div className="border-t border-[#1C1C1C] pt-6 space-y-4">
          <p className="text-xs text-[#8E8E8E] font-light">
            {fa
              ? "برای برآورد دقیق‌تر، عکس‌های آسیب‌دیدگی را همراه با کد پیگیری برای ما بفرستید."
              : "For a more accurate estimate, send us photos of the damage along with your reference."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#080808] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                {fa ? "ارسال عکس با واتساپ" : "Send photos on WhatsApp"}
              </a>
            )}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="inline-flex items-center justify-center border border-[#333333] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium transition-colors"
            >
              {fa ? "بازگشت به صفحه اصلی" : "Back to home"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ form ------------------------------ */

  const damageLabels: Record<DamageType, { en: string; fa: string }> = {
    MAJOR_COLLISION: {
      en: "Major Collision & Structural Frame Damage",
      fa: "تصادف شدید و آسیب شاسی",
    },
    MINOR_SCRATCH: {
      en: "Minor Scratches, Key Marks & Dents",
      fa: "خط و خش، کلیدخوردگی و فرورفتگی جزئی",
    },
    PDR: { en: "Paintless Dent Removal (PDR)", fa: "صافکاری بدون رنگ (PDR)" },
    BUMPER_PLASTIC: {
      en: "Bumper Crack & Plastic Welding",
      fa: "ترک سپر و جوشکاری پلاستیک",
    },
    FULL_RESPRAY: {
      en: "Full Body Respray & Refinishing",
      fa: "رنگ کامل بدنه و پولیش نهایی",
    },
  };

  const contactLabels: Record<ContactMethod, { en: string; fa: string }> = {
    PHONE: { en: "Phone call", fa: "تماس تلفنی" },
    EMAIL: { en: "Email", fa: "ایمیل" },
    WHATSAPP: { en: "WhatsApp", fa: "واتساپ" },
  };

  const err = (field: string) =>
    errors[field] ? (
      <p className="flex items-center gap-1.5 text-[11px] text-[#E2867B] mt-1.5 font-light">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const fieldClass = (field: string) =>
    `bg-[#141414] text-xs h-11 ${
      errors[field] ? "border-[#E2867B]" : "border-[#2E2E2E]"
    }`;

  return (
    <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-5 sm:p-8 md:p-10 max-w-3xl mx-auto text-[#EDEDED]">
      {/* Progress */}
      <div
        className="flex justify-between items-center mb-8 sm:mb-10 relative"
        role="group"
        aria-label={fa ? "مراحل فرم" : "Form steps"}
      >
        <div className="absolute start-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#1C1C1C] -z-0">
          <div
            className="h-full bg-[#C5A880] transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
        {STEPS.map((s) => (
          <div
            key={s.id}
            aria-current={step === s.id ? "step" : undefined}
            className="flex flex-col items-center gap-1.5 bg-[#0E0E0E] px-1 sm:px-3 relative z-10"
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border transition-colors ${
                step >= s.id
                  ? "border-[#C5A880] bg-[#C5A880] text-[#080808]"
                  : "border-[#262626] bg-[#141414] text-[#8E8E8E]"
              }`}
            >
              <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span
              className={`text-[9px] sm:text-[10px] tracking-[0.15em] font-medium ${
                step >= s.id ? "text-[#C5A880]" : "text-[#666666]"
              }`}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-[300px]">
        {/* ---------------------------- STEP 1 ---------------------------- */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] mb-1.5">
                {fa ? "مشخصات خودرو" : "Vehicle Specification"}
              </h3>
              <p className="text-xs text-[#8E8E8E] font-light">
                {fa
                  ? "شماره پلاک و نوع آسیب‌دیدگی خودرو را وارد کنید."
                  : "Enter your registration and the type of damage."}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regNumber" className="text-xs text-[#A0A0A0]">
                {fa ? "شماره پلاک" : "UK Registration Mark"}
              </Label>
              <Input
                id="regNumber"
                name="regNumber"
                dir="ltr"
                autoComplete="off"
                placeholder="AB12 CDE"
                aria-invalid={!!errors.regNumber}
                className={`uppercase text-[#C5A880] placeholder:text-[#555555] font-mono font-bold text-base ${fieldClass(
                  "regNumber",
                )}`}
                value={data.regNumber}
                onChange={(e) => set("regNumber", e.target.value)}
              />
              {err("regNumber")}
            </div>

            <div className="space-y-2">
              <Label htmlFor="damageType" className="text-xs text-[#A0A0A0]">
                {fa ? "نوع آسیب‌دیدگی" : "Primary Damage Assessment"}
              </Label>
              <select
                id="damageType"
                name="damageType"
                className="w-full flex h-11 items-center border border-[#2E2E2E] bg-[#141414] px-3 py-2 text-xs text-[#EDEDED] focus:outline-none focus:border-[#C5A880]"
                value={data.damageType}
                onChange={(e) => set("damageType", e.target.value as DamageType)}
              >
                {DAMAGE_TYPES.map((k) => (
                  <option key={k} value={k} className="bg-[#141414]">
                    {fa ? damageLabels[k].fa : damageLabels[k].en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ---------------------------- STEP 2 ---------------------------- */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] mb-1.5">
                {fa ? "شرح خسارت" : "Damage Details"}
              </h3>
              <p className="text-xs text-[#8E8E8E] font-light">
                {fa
                  ? "هرچه بیشتر توضیح دهید، برآورد ما دقیق‌تر خواهد بود."
                  : "The more you tell us, the more accurate our estimate."}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs text-[#A0A0A0]">
                {fa ? "توضیح آسیب‌دیدگی" : "Describe the damage"}
              </Label>
              <textarea
                id="description"
                name="description"
                rows={5}
                maxLength={1000}
                placeholder={
                  fa
                    ? "مثلاً: درب جلو سمت راننده فرورفتگی دارد و رنگ خط افتاده. خودرو قابل رانندگی است."
                    : "e.g. Dent to the driver's front door with scratched paint. The car is still drivable."
                }
                className="w-full border border-[#2E2E2E] bg-[#141414] px-3 py-2.5 text-xs text-[#EDEDED] placeholder:text-[#555555] focus:outline-none focus:border-[#C5A880] resize-y"
                value={data.description}
                onChange={(e) => set("description", e.target.value)}
              />
              <p className="text-[10px] text-[#666666] font-light">
                {fa
                  ? "پس از ثبت درخواست، می‌توانید عکس‌های خسارت را از طریق واتساپ برای ما بفرستید."
                  : "After you submit, you can send us photos of the damage over WhatsApp."}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="text-xs text-[#A0A0A0]">
                {fa ? "تاریخ ترجیحی مراجعه (اختیاری)" : "Preferred date (optional)"}
              </Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                dir="ltr"
                min={new Date().toISOString().slice(0, 10)}
                className={fieldClass("preferredDate")}
                value={data.preferredDate}
                onChange={(e) => set("preferredDate", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ---------------------------- STEP 3 ---------------------------- */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] mb-1.5">
                {fa ? "اطلاعات تماس" : "Your Details"}
              </h3>
              <p className="text-xs text-[#8E8E8E] font-light">
                {fa
                  ? "برای ارسال برآورد هزینه و هماهنگی نوبت."
                  : "So we can send your estimate and arrange a slot."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs text-[#A0A0A0]">
                  {fa ? "نام و نام خانوادگی" : "Full Name"}
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={fieldClass("name")}
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                />
                {err("name")}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs text-[#A0A0A0]">
                  {fa ? "شماره تماس" : "Telephone / Mobile"}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  placeholder="07123 456789"
                  aria-invalid={!!errors.phone}
                  className={fieldClass("phone")}
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
                {err("phone")}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-[#A0A0A0]">
                  {fa ? "ایمیل" : "Email Address"}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="name@example.co.uk"
                  aria-invalid={!!errors.email}
                  className={fieldClass("email")}
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                {err("email")}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="postcode" className="text-xs text-[#A0A0A0]">
                  {fa ? "کدپستی" : "Postcode"}
                </Label>
                <Input
                  id="postcode"
                  name="postcode"
                  dir="ltr"
                  autoComplete="postal-code"
                  placeholder="WD19 4EA"
                  aria-invalid={!!errors.postcode}
                  className={`uppercase ${fieldClass("postcode")}`}
                  value={data.postcode}
                  onChange={(e) => set("postcode", e.target.value)}
                />
                {err("postcode")}
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-xs text-[#A0A0A0] mb-2">
                {fa ? "چطور با شما تماس بگیریم؟" : "How should we contact you?"}
              </legend>
              <div className="flex flex-wrap gap-2">
                {CONTACT_METHODS.map((m) => (
                  <label
                    key={m}
                    className={`cursor-pointer border px-4 py-2 text-[11px] tracking-wider transition-colors ${
                      data.contactMethod === m
                        ? "border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]"
                        : "border-[#2E2E2E] bg-[#141414] text-[#8E8E8E] hover:border-[#444444]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m}
                      className="sr-only"
                      checked={data.contactMethod === m}
                      onChange={() => set("contactMethod", m)}
                    />
                    {fa ? contactLabels[m].fa : contactLabels[m].en}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Honeypot — hidden from people, irresistible to bots */}
            <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0">
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={data.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ---------------------------- STEP 4 ---------------------------- */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] mb-1.5">
                {fa ? "بازبینی و ارسال" : "Review & Submit"}
              </h3>
              <p className="text-xs text-[#8E8E8E] font-light">
                {fa
                  ? "اطلاعات زیر را بررسی و تأیید کنید."
                  : "Please check your details before submitting."}
              </p>
            </div>

            <dl className="bg-[#121212] p-4 sm:p-5 border border-[#1F1F1F] space-y-3 text-xs">
              {[
                [fa ? "پلاک" : "Registration", normaliseReg(data.regNumber), true],
                [
                  fa ? "نوع آسیب" : "Damage",
                  fa ? damageLabels[data.damageType].fa : damageLabels[data.damageType].en,
                  false,
                ],
                [fa ? "نام" : "Name", data.name, false],
                [fa ? "تلفن" : "Phone", data.phone, true],
                [fa ? "ایمیل" : "Email", data.email, true],
                [fa ? "کدپستی" : "Postcode", data.postcode.toUpperCase(), true],
                [
                  fa ? "روش تماس" : "Contact by",
                  fa ? contactLabels[data.contactMethod].fa : contactLabels[data.contactMethod].en,
                  false,
                ],
              ].map(([label, value, ltr]) => (
                <div
                  key={label as string}
                  className="flex justify-between gap-4 border-b border-[#1A1A1A] pb-2 last:border-0 last:pb-0"
                >
                  <dt className="text-[#8E8E8E] tracking-wider flex-shrink-0">{label as string}</dt>
                  <dd
                    className="text-[#EDEDED] font-light text-end break-words"
                    dir={ltr ? "ltr" : undefined}
                  >
                    {(value as string) || (fa ? "—" : "—")}
                  </dd>
                </div>
              ))}
            </dl>

            <div>
              <label
                htmlFor="consent"
                className="flex items-start gap-3 cursor-pointer text-[11px] text-[#8E8E8E] font-light leading-relaxed"
              >
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#C5A880]"
                />
                <span>
                  {fa
                    ? "موافقم که اتوموج از اطلاعات بالا برای پاسخ به این درخواست استعلام استفاده کند. "
                    : "I agree that Auto Moj may use these details to respond to my enquiry. "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A880] underline"
                  >
                    {fa ? "سیاست حریم خصوصی" : "Privacy policy"}
                  </a>
                </span>
              </label>
              {err("consent")}
            </div>

            {status === "failed" && serverError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 border border-[#E2867B]/40 bg-[#E2867B]/10 p-4 text-xs text-[#E2867B] font-light"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --------------------------- navigation --------------------------- */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#1C1C1C]">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            disabled={status === "sending"}
            className="w-full sm:w-auto inline-flex items-center justify-center border border-[#262626] text-[#8E8E8E] hover:text-[#EDEDED] px-6 py-3 text-xs tracking-[0.2em] font-medium transition-colors disabled:opacity-50"
          >
            {fa ? (
              <>
                <ArrowRight className="w-3.5 h-3.5 ms-2" /> بازگشت
              </>
            ) : (
              <>
                <ArrowLeft className="w-3.5 h-3.5 me-2" /> Back
              </>
            )}
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C5A880] text-[#080808] hover:bg-[#b0936c] px-7 py-3 text-xs tracking-[0.25em] font-bold transition-all"
          >
            {fa ? (
              <>
                مرحله بعد <ArrowLeft className="w-3.5 h-3.5 ms-2" />
              </>
            ) : (
              <>
                Next Step <ArrowRight className="w-3.5 h-3.5 ms-2" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "sending"}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C5A880] text-[#080808] hover:bg-[#b0936c] px-8 py-3.5 text-xs tracking-[0.25em] font-bold transition-all shadow-[0_0_20px_rgba(197,168,128,0.3)] disabled:opacity-60 disabled:cursor-wait"
          >
            {status === "sending"
              ? fa
                ? "در حال ارسال…"
                : "Sending…"
              : fa
                ? "ارسال درخواست استعلام"
                : "Submit Estimate Request"}
          </button>
        )}
      </div>
    </div>
  );
}
