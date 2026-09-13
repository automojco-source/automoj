"use client";

import { Hammer, Handshake, ShieldCheck } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Copy on this page is grounded in what the workshop actually has and does —
 * see the notes at the top of src/lib/services.ts. Claims about equipment,
 * accreditation, insurer approval and warranties were removed in Sep 2026
 * because none of them could be evidenced; the previous version is in
 * _backups/. Do not reintroduce a claim here without a document behind it.
 */
export function AboutView() {
  const { lang } = useLanguage();
  const fa = lang === "FA";

  const pillars = [
    {
      icon: Handshake,
      title_en: "We Deal With Your Insurer",
      title_fa: "پرونده بیمه را ما پیگیری می‌کنیم",
      body_en:
        "Most repairs after an accident are paid for by an insurer, and the paperwork is the part people dread. We speak to your insurer, agree the work and the parts with them, and keep you updated while the car is with us. You are entitled to choose who repairs your vehicle — your insurer may recommend a repairer, but the choice is yours.",
      body_fa:
        "بیشتر تعمیرات بعد از تصادف را بیمه پرداخت می‌کند و کار اداری‌اش همان بخشی است که همه از آن فراری‌اند. ما با بیمه‌گر شما صحبت می‌کنیم، کار و قطعات را با آن‌ها توافق می‌کنیم و تا وقتی خودرو دست ماست شما را در جریان می‌گذاریم. انتخاب کارگاه تعمیر، حق قانونی شماست — بیمه‌گر ممکن است کارگاهی را پیشنهاد دهد، اما تصمیم با شماست.",
    },
    {
      icon: ShieldCheck,
      title_en: "We Stand Behind The Work",
      title_fa: "پشت کارمان می‌ایستیم",
      body_en:
        "If something we did is not right — paint that has not matched, a line that has not come back, a panel that does not sit — bring the car back and we will put it right. We would rather you told us than told someone else.",
      body_fa:
        "اگر کاری که انجام داده‌ایم درست نباشد — رنگی که هم‌خوان نشده، خطی که برنگشته، قطعه‌ای که درست ننشسته — خودرو را برگردانید تا درستش کنیم. ترجیح می‌دهیم به خودمان بگویید تا به دیگری.",
    },
    {
      icon: Hammer,
      title_en: "Traditional Panel Beating",
      title_fa: "صافکاری سنتی",
      body_en:
        "Fewer workshops still shape metal by hand — replacing a panel is faster and needs less skill. We kept the craft because it is the only way to save a panel that is no longer made, and the better way to save one that is.",
      body_fa:
        "کارگاه‌های کمتری هنوز فلز را با دست فرم می‌دهند — تعویض قطعه سریع‌تر است و مهارت کمتری می‌خواهد. ما این کار را نگه داشتیم، چون تنها راه نجات قطعه‌ای است که دیگر ساخته نمی‌شود، و راه بهتر برای قطعه‌ای که هنوز ساخته می‌شود.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans">
      {/* HERO */}
      <section className="relative py-24 bg-[#050505] border-b border-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <NextImage
            src="/images/hero.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover filter brightness-75"
          />
        </div>
        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <span className="text-[#C5A880] font-medium tracking-[0.3em] text-[10px] uppercase mb-4 block">
            {fa ? "درباره کارگاه" : "The Workshop"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.1em] mb-6 leading-tight uppercase">
            {fa ? (
              <>
                صافکاری سنتی
                <br className="hidden md:block" />
                <span className="text-[#C5A880]"> در واتفورد</span>
              </>
            ) : (
              <>
                Traditional Panel Beating
                <br className="hidden md:block" />
                <span className="text-[#C5A880]"> in Watford</span>
              </>
            )}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider font-light leading-relaxed max-w-2xl mx-auto">
            {fa
              ? "اتوموج یک کارگاه مستقل صافکاری در واتفورد است. کار ما ترمیم بدنه با دست است — صافکاری سنتی، رفع فرورفتگی بدون رنگ و نقاشی خودرو — برای رانندگان واتفورد و شمال‌غرب لندن."
              : "Auto Moj is an independent bodyshop in Watford. We repair bodywork by hand — traditional panel beating, paintless dent removal and refinishing — for drivers across Watford and North West London."}
          </p>
        </div>
      </section>

      {/* THE WORKSHOP */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.15em] uppercase mb-6 text-[#EDEDED]">
              {fa ? "کارگاه کار، نه نمایشگاه" : "A Working Shop, Not a Showroom"}
            </h2>
            <div className="space-y-4 text-[#8E8E8E] text-xs md:text-sm leading-relaxed mb-8 font-light tracking-wide">
              <p>
                {fa
                  ? "اتوموج کارگاه بزرگی نیست و ادعای بزرگی هم ندارد. چیزی که هست، بیش از هفت سال کار روی بدنه و رنگ خودرو است، و مجموعه‌ی کاملی از ابزار صافکاری سنتی: چکش‌های فرم‌دهی، سندان، چرخ انگلیسی، و ابزار PDR به‌همراه خطوط نوری بازتابی."
                  : "Auto Moj is not a large workshop and does not pretend to be one. What it has is over seven years of bodywork and paint, and a full set of traditional panel-beating tools: shaping hammers, dollies, an English wheel, and PDR rods with reflection boards."}
              </p>
              <p>
                {fa
                  ? "کار سازه‌ای را به روش سنتی انجام می‌دهیم. اگر خودرویی به شاسی‌کش لیزری یا تجهیزاتی نیاز داشته باشد که ما نداریم، همان اول می‌گوییم و شما را به کارگاه مجهز راهنمایی می‌کنیم. کار نیمه‌درست را قبول نمی‌کنیم."
                  : "Structural work is done by traditional methods. If a car needs a laser jig or equipment we do not have, we will say so at the estimate and point you to a workshop that does. We would rather turn work away than do it half-right."}
              </p>
              <p>
                {fa
                  ? "رنگ در همین کارگاه ساخته و پاشیده می‌شود، مطابق کد رنگ خودرو و با محو‌سازی در قطعات مجاور."
                  : "Paint is mixed and sprayed here, matched to the vehicle's paint code and blended into the surrounding panels."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-s border-[#C5A880] ps-4">
                <h3 className="text-2xl font-serif text-[#EDEDED] font-bold">7+</h3>
                <p className="text-[10px] text-[#8E8E8E] uppercase tracking-[0.2em] mt-1">
                  {fa ? "سال کار بدنه و رنگ" : "Years in bodywork & paint"}
                </p>
              </div>
              <div className="border-s border-[#C5A880] ps-4">
                <h3 className="text-2xl font-serif text-[#EDEDED] font-bold">
                  {fa ? "رایگان" : "Free"}
                </h3>
                <p className="text-[10px] text-[#8E8E8E] uppercase tracking-[0.2em] mt-1">
                  {fa ? "برآورد حضوری، بدون تعهد" : "In-person estimates"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#1F1F1F] bg-[#0E0E0E] p-2">
              <NextImage
                src="/images/panel_beating.jpg"
                alt={fa ? "صافکاری سنتی با چکش" : "Traditional panel beating"}
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-64 object-cover filter contrast-105"
              />
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] text-center mt-2 font-medium">
                {fa ? "صافکاری سنتی" : "Panel beating"}
              </p>
            </div>
            <div className="border border-[#1F1F1F] bg-[#0E0E0E] p-2 mt-8">
              <NextImage
                src="/images/pdr_light.jpg"
                alt={fa ? "صافکاری بدون رنگ" : "Paintless dent removal"}
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-64 object-cover filter contrast-105"
              />
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] text-center mt-2 font-medium">
                {fa ? "صافکاری بدون رنگ" : "PDR"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24 bg-[#050505] border-y border-[#1C1C1C]">
        <div className="container mx-auto px-6 text-center max-w-3xl mb-16">
          <h2 className="text-2xl md:text-4xl font-serif tracking-[0.15em] uppercase mb-4 text-[#EDEDED]">
            {fa ? "چطور کار می‌کنیم" : "How We Work"}
          </h2>
          <p className="text-[#8E8E8E] text-xs tracking-wider uppercase font-light">
            {fa ? "سه چیزی که می‌توانید رویشان حساب کنید." : "Three things you can hold us to."}
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title_en} className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
              <pillar.icon className="w-8 h-8 text-[#C5A880] mb-6 stroke-[1.2]" />
              <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-3 text-[#EDEDED] font-semibold">
                {fa ? pillar.title_fa : pillar.title_en}
              </h3>
              <p className="text-xs text-[#8E8E8E] font-light leading-relaxed">
                {fa ? pillar.body_fa : pillar.body_en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif tracking-[0.15em] uppercase mb-4 text-[#EDEDED]">
          {fa ? "برآورد رایگان بگیرید" : "Get a Free Estimate"}
        </h2>
        <p className="text-xs md:text-sm text-[#8E8E8E] mb-8 max-w-xl mx-auto font-light tracking-wide">
          {fa
            ? "مشخصات خودرو و شرح آسیب‌دیدگی را بفرستید تا با شما تماس بگیریم. بدون تعهد."
            : "Send us your vehicle details and what happened, and we will come back to you. No obligation."}
        </p>
        <Link
          href="/get-a-quote"
          className="inline-flex items-center border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300"
        >
          {fa ? "شروع برآورد" : "Start an estimate"}
        </Link>
      </section>
    </main>
  );
}
