"use client";

import { Award, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans">
      {/* HERO SECTION */}
      <section className="relative py-24 bg-[#050505] border-b border-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="/images/hero.jpg" 
            alt="Bodyshop Background" 
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <span className="text-[#C5A880] font-medium tracking-[0.3em] text-[10px] uppercase mb-4 block">
            {lang === "EN" ? "Atelier Heritage" : "اصالت و سابقه کارگاه"}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-[0.1em] mb-6 leading-tight uppercase">
            {lang === "EN" ? (
              <>Setting the Standard for <br className="hidden md:block"/><span className="text-[#C5A880]">Accident Repair in London</span></>
            ) : (
              <>پیشرو در استانداردهای <br className="hidden md:block"/><span className="text-[#C5A880]">صافکاری و نقاشی تصادفات در لندن</span></>
            )}
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E8E] tracking-wider font-light leading-relaxed max-w-2xl mx-auto">
            {lang === "EN" 
              ? "With over 15 years of master craftsmanship, Auto Moj is London's premier independent automotive atelier, trusted by drivers and insurers for flawless prestige restoration."
              : "با بیش از ۱۵ سال تجربه درخشان، اتوموج (Auto Moj) معتبرترین کارگاه مستقل صافکاری و بازسازی خودروهای لوکس در لندن است که مورد تایید شرکت‌های بیمه و مالکان خودروهای سوپراسپرت می‌باشد."
            }
          </p>
        </div>
      </section>

      {/* OUR STORY & FACILITY */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.15em] uppercase mb-6 text-[#EDEDED]">
              {lang === "EN" ? "State-of-the-Art London Atelier" : "تجهیزات مدرن و هنر دست در لندن"}
            </h2>
            <div className="space-y-4 text-[#8E8E8E] text-xs md:text-sm leading-relaxed mb-8 font-light tracking-wide">
              <p>
                {lang === "EN"
                  ? "Founded on the pursuit of automotive perfection, Auto Moj was built to provide master dealership-quality structural repair and refinishing without compromise."
                  : "اتوموج با هدف دستیابی به کمال و دقت در ترمیم خودرو تاسیس شد تا خدماتی در سطح نمایندگی‌های اصلی و بدون هیچ‌گونه افت کیفیت ارائه دهد."
                }
              </p>
              <p>
                {lang === "EN"
                  ? "Our purpose-built London centre features 3D robotic laser chassis measurement, computerised colour matching spectrophotometers, and negative-pressure low-bake infrared curing ovens."
                  : "مرکز تخصصی ما در لندن مجهز به دستگاه شاسی‌کشی سه‌بعدی لیزری، سیستم پیشرفته اسکن و تطبیق رنگ کامپیوتری و کوره رنگ مجهز به اشعه مادون قرمز می‌باشد."
                }
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l border-[#C5A880] pl-4">
                <h4 className="text-2xl font-serif text-[#EDEDED] font-bold">5,000+</h4>
                <p className="text-[10px] text-[#8E8E8E] uppercase tracking-[0.2em] mt-1">
                  {lang === "EN" ? "Prestige Restorations" : "خودروی بازسازی شده"}
                </p>
              </div>
              <div className="border-l border-[#C5A880] pl-4">
                <h4 className="text-2xl font-serif text-[#EDEDED] font-bold">15+</h4>
                <p className="text-[10px] text-[#8E8E8E] uppercase tracking-[0.2em] mt-1">
                  {lang === "EN" ? "Years Master Artistry" : "سال سابقه حرفه‌ای"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#1F1F1F] bg-[#0E0E0E] p-2">
              <img 
                src="/images/panel_beating.jpg" 
                alt="Traditional Panel Beating" 
                className="w-full h-64 object-cover filter contrast-105"
              />
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] text-center mt-2 font-medium">
                {lang === "EN" ? "Traditional Panel Beating" : "صافکاری سنتی با چکش"}
              </p>
            </div>
            <div className="border border-[#1F1F1F] bg-[#0E0E0E] p-2 mt-8">
              <img 
                src="/images/pdr_light.jpg" 
                alt="PDR Line Board Reflection" 
                className="w-full h-64 object-cover filter contrast-105"
              />
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] text-center mt-2 font-medium">
                {lang === "EN" ? "Precision PDR Reflection" : "صافکاری بدون رنگ PDR"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24 bg-[#050505] border-y border-[#1C1C1C]">
        <div className="container mx-auto px-6 text-center max-w-3xl mb-16">
          <h2 className="text-2xl md:text-4xl font-serif tracking-[0.15em] uppercase mb-4 text-[#EDEDED]">
            {lang === "EN" ? "The Pillars of Excellence" : "ارکان کیفیت و تمایز ما"}
          </h2>
          <p className="text-[#8E8E8E] text-xs tracking-wider uppercase font-light">
            {lang === "EN" ? "Every restoration is backed by unyielding engineering rigor." : "هر خودرو با بالاترین دقت مهندسی بازسازی می‌شود."}
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
            <ShieldCheck className="w-8 h-8 text-[#C5A880] mb-6 stroke-[1.2]" />
            <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-3 text-[#EDEDED] font-semibold">
              {lang === "EN" ? "Direct Insurance Claim" : "پیگیری مستقیم بیمه"}
            </h3>
            <p className="text-xs text-[#8E8E8E] font-light leading-relaxed">
              {lang === "EN" 
                ? "We are accredited for major UK prestige motor insurers, managing claims, courtesy vehicles and paperwork directly."
                : "طرف قرارداد با تمامی بیمه‌های معتبر انگلستان؛ انجام کلیه مراحل اداری، دریافت خودروی جایگزین و پرداخت خسارت."
              }
            </p>
          </div>
          <div className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
            <Award className="w-8 h-8 text-[#C5A880] mb-6 stroke-[1.2]" />
            <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-3 text-[#EDEDED] font-semibold">
              {lang === "EN" ? "Lifetime Guarantee" : "ضمانت مادام‌العمر"}
            </h3>
            <p className="text-xs text-[#8E8E8E] font-light leading-relaxed">
              {lang === "EN" 
                ? "All paintwork, structural welds and anti-corrosion protection treatments carry our full lifetime guarantee."
                : "کلیه خدمات رنگ‌آمیزی کوره، جوشکاری ساختاری شاسی و عایق‌بندی ضدزنگ دارای ضمانت کتبی مادام‌العمر هستند."
              }
            </p>
          </div>
          <div className="bg-[#0E0E0E] p-8 border border-[#1F1F1F]">
            <Users className="w-8 h-8 text-[#C5A880] mb-6 stroke-[1.2]" />
            <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-3 text-[#EDEDED] font-semibold">
              {lang === "EN" ? "Master Technicians" : "متخصصین دارای مدرک بین‌المللی"}
            </h3>
            <p className="text-xs text-[#8E8E8E] font-light leading-relaxed">
              {lang === "EN" 
                ? "Our senior technicians hold prestigious ATA accreditations with decades of OEM supercar experience."
                : "تکنسین‌های ارشد ما دارای گواهینامه معتبر ATA انگلستان و سال‌ها تجربه کار بر روی خودروهای سوپراسپرت هستند."
              }
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif tracking-[0.15em] uppercase mb-4 text-[#EDEDED]">
          {lang === "EN" ? "Request Priority Assessment" : "درخواست بررسی و استعلام قیمت"}
        </h2>
        <p className="text-xs md:text-sm text-[#8E8E8E] mb-8 max-w-xl mx-auto font-light tracking-wide">
          {lang === "EN" 
            ? "Provide your vehicle specifications and photos for an immediate valuation."
            : "مشخصات و عکس‌های آسیب‌دیدگی خودرو را ارسال کنید تا کارشناسان ما سریعاً برآورد هزینه را اعلام کنند."
          }
        </p>
        <Link 
          href="/get-a-quote" 
          className="inline-flex items-center border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300"
        >
          {lang === "EN" ? "Get Free Estimate »" : "ثبت رایگان درخواست استعلام »"}
        </Link>
      </section>
    </main>
  );
}
