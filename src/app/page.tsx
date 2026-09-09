"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isLoadedRef = useRef<boolean>(false);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  const TOTAL_FRAMES = 61;

  // Helper to map scrollProgress into a specific phase [0, 1]
  const getSubProgress = (prog: number, start: number, end: number) => {
    if (prog <= start) return 0;
    if (prog >= end) return 1;
    return (prog - start) / (end - start);
  };

  // Helper to draw a frame onto canvas with responsive aspect-cover
  const drawFrame = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Aspect cover scaling
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;

    // Mobile focal point centered on car door (36%), Desktop centered (50%)
    const focalX = window.innerWidth <= 768 ? 0.36 : 0.50;
    const dx = (cw - sw) * focalX;
    const dy = (ch - sh) * 0.5;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, sw, sh);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set high-DPI canvas resolution
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const firstImg = imagesRef.current[0];
      if (firstImg && firstImg.complete) {
        drawFrame(firstImg, canvas);
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Preload frames progressively (Frame 1 immediately, then remainder asynchronously)
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `/frames/f_${numStr}.webp`;
      if (i === 1) {
        img.onload = () => {
          isLoadedRef.current = true;
          drawFrame(img, canvas);
        };
      }
      images.push(img);
    }

    let rafId: number;

    const handleScroll = () => {
      if (!heroTrackRef.current) return;
      const rect = heroTrackRef.current.getBoundingClientRect();
      const topOffset = window.innerWidth >= 640 ? 64 : 56;
      const totalScrollable = rect.height - (window.innerHeight - topOffset);
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max((topOffset - rect.top) / totalScrollable, 0), 1);
      targetProgressRef.current = progress;
      setScrollProgress(progress);
    };

    // Silky-smooth 60fps interpolation loop (0.12 lerp factor eliminates all jitter)
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.14;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      const currentImg = imagesRef.current[frameIdx];
      if (currentImg && currentImg.complete && canvas) {
        drawFrame(currentImg, canvas);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(renderLoop);
    handleScroll();

    // IntersectionObserver for scroll-driven reveals of lower cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 14;
    const y = ((clientY - top) / height - 0.5) * 14;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Scroll phase calculations
  const subLine1 = Math.min(1, scrollProgress * 5); // Visible early
  const subLine2 = getSubProgress(scrollProgress, 0.15, 0.48); // Line 2 enters 15% -> 48%
  const subLine3 = getSubProgress(scrollProgress, 0.45, 0.78); // Line 3 enters 45% -> 78%
  const subDesc = getSubProgress(scrollProgress, 0.70, 0.95);  // CTA & desc enter 70% -> 95%
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollProgress * 4.5);

  return (
    <main className="min-h-screen bg-[#080808] text-[#EDEDED] font-sans">
      
      {/* SECTION 1: SCROLL-DRIVEN HERO TRACK (Ultra-Smooth 60FPS Canvas Scrollytelling) */}
      <section 
        ref={heroTrackRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[300vh] sm:min-h-[320vh] border-b border-[#141414]"
      >
        {/* Pinned Viewport Container: Locked in place during scroll */}
        <div className="sticky top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-full overflow-hidden flex items-start justify-start">

          {/* Canvas Frame Layer with Hardware-Accelerated 60FPS Renderer */}
          <div 
            style={{
              transform: `scale(${1 + scrollProgress * 0.06})`,
              willChange: "transform"
            }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <canvas 
              ref={canvasRef}
              className="w-full h-full object-cover"
            />

            {/* Subtle Atelier Vignette Overlay: Car Door Remains 100% Crisp */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-transparent via-45% to-[#080808]/80 md:bg-gradient-to-r md:from-[#080808] md:via-[#080808]/75 md:via-35% md:to-transparent md:to-65% z-10 pointer-events-none" />
          </div>

          {/* Hero Content: Shifted ~35% Towards Top, Driven Dynamically By Scroll */}
          <div className="max-w-[1400px] relative z-20 mx-auto px-6 sm:px-10 lg:px-12 w-full pt-20 sm:pt-24 lg:pt-28 pb-16">
            <div 
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)"
              }}
              className="max-w-xl space-y-6 will-change-transform"
            >
              {/* Badge */}
              <div 
                style={{
                  opacity: Math.max(0.7, subLine1),
                  transform: `translate3d(0, ${(1 - subLine1) * 10}px, 0)`
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C5A880]/40 bg-[#111111]/90 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C5A880] font-semibold backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></span>
                <span>AUTO MOJ ACCIDENT REPAIR</span>
              </div>

              {/* Sequential Scroll-Driven Typography */}
              <h1 className="font-serif tracking-[0.1em] text-[#EDEDED] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] space-y-1.5 sm:space-y-2.5">
                
                {/* Line 1: AUTO MOJ - 100% Size (Present from initial scroll) */}
                <span 
                  style={{
                    opacity: 0.2 + 0.8 * subLine1,
                    transform: `translate3d(${(1 - subLine1) * 40}px, 0, 0)`,
                    filter: `blur(${(1 - subLine1) * 3}px)`,
                    transition: "transform 0.15s ease-out, opacity 0.15s ease-out"
                  }}
                  className="block text-4xl sm:text-6xl lg:text-7xl leading-[1.05]"
                >
                  {t("hero.title1")}
                </span>
                
                {/* Line 2: ACCIDENT REPAIR - In 2 Lines & 40% Smaller (Slides In as you scroll 15% -> 48%) */}
                <span 
                  style={{
                    opacity: subLine2,
                    transform: `translate3d(${(1 - subLine2) * 80}px, 0, 0)`,
                    filter: `blur(${(1 - subLine2) * 6}px)`,
                    transition: "transform 0.15s ease-out, opacity 0.15s ease-out"
                  }}
                  className="block text-2xl sm:text-4xl lg:text-[2.85rem] leading-[1.1] text-[#D8D8D8]"
                >
                  <span className="block">{t("hero.title2.line1")}</span>
                  <span className="block">{t("hero.title2.line2")}</span>
                </span>
                
                {/* Line 3: BUILT IN LONDON - Scaled Down (Slides In as you scroll 45% -> 78%) */}
                <span 
                  style={{
                    opacity: subLine3,
                    transform: `translate3d(${(1 - subLine3) * 80}px, 0, 0)`,
                    filter: `blur(${(1 - subLine3) * 6}px)`,
                    transition: "transform 0.15s ease-out, opacity 0.15s ease-out"
                  }}
                  className="block text-lg sm:text-2xl lg:text-[2.15rem] leading-[1.15] text-[#B0B0B0]"
                >
                  {t("hero.title3")} <span className="text-[#C5A880] hero-gold-glow inline-block">{t("hero.city")}</span>
                </span>
              </h1>

              {/* Description (Enters 70% -> 95%) */}
              <p 
                style={{
                  opacity: subDesc,
                  transform: `translate3d(${(1 - subDesc) * 40}px, 0, 0)`,
                  filter: `blur(${(1 - subDesc) * 4}px)`,
                  transition: "transform 0.15s ease-out, opacity 0.15s ease-out"
                }}
                className="text-xs sm:text-sm tracking-[0.2em] text-[#8E8E8E] uppercase font-light max-w-md leading-relaxed pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                {t("hero.desc")}
              </p>

              {/* CTA Button (Enters 70% -> 95%) */}
              <div 
                style={{
                  opacity: subDesc,
                  transform: `translate3d(${(1 - subDesc) * 40}px, 0, 0)`,
                  transition: "transform 0.15s ease-out, opacity 0.15s ease-out"
                }}
                className="pt-6"
              >
                <Link 
                  href="/get-a-quote" 
                  className="inline-flex items-center gap-2.5 border border-[#444444] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 group bg-[#080808]/40 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(197,168,128,0.3)]"
                >
                  <span>{t("hero.cta")}</span>
                  <span className="text-xs text-[#C5A880] transition-transform group-hover:translate-x-1">&raquo;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Elegant Luxury Scroll Guidance Indicator */}
          <div 
            style={{ 
              opacity: scrollIndicatorOpacity,
              pointerEvents: scrollIndicatorOpacity <= 0.05 ? "none" : "auto" 
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-300 text-center"
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-serif font-light">
              {lang === "fa" ? "برای هدایت انیمیشن اسکرول کنید ↓" : "SCROLL TO DISCOVER CRAFT ↓"}
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-[#C5A880] to-transparent animate-pulse" />
          </div>

        </div>
      </section>

      {/* SECTION 2: FEATURED DISCIPLINES (Exact 4-Card Grid with Header & View Spec Links) */}
      <section id="craft" className="py-20 bg-[#080808] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Header */}
          <div className="mb-8 border-b border-[#141414] pb-3 scroll-reveal">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-serif font-medium">
              {t("featured.title")}
            </span>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: SCRATCH & DENT REPAIR */}
            <div className="scroll-reveal scroll-delay-1 bg-[#0C0C0C] border border-[#1C1C1C] p-4 flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-black mb-4 border border-[#171717]">
                <img 
                  src="/images/door_restoration.jpg" 
                  alt="Auto Moj Scratch & Dent Repair" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
              </div>
              <h3 className="text-center font-serif text-xs tracking-[0.2em] uppercase text-[#EDEDED] mb-3 font-semibold">
                {t("card1.title")}
              </h3>
              <div className="mt-auto pt-3 text-center border-t border-[#171717]">
                <Link href="/services/accident-repair" className="inline-flex items-center gap-1 text-[9px] tracking-[0.25em] uppercase text-[#777777] group-hover:text-[#C5A880] transition-colors">
                  <span>{t("card1.link")}</span>
                  <span className="text-xs">&raquo;</span>
                </Link>
              </div>
            </div>

            {/* Card 2: RESPREY */}
            <div className="scroll-reveal scroll-delay-2 bg-[#0C0C0C] border border-[#1C1C1C] p-4 flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-black mb-4 border border-[#171717]">
                <img 
                  src="/images/artisan_hand_respray.jpg" 
                  alt="Auto Moj Paint Artisan & Refinishing" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
              </div>
              <h3 className="text-center font-serif text-xs tracking-[0.2em] uppercase text-[#EDEDED] mb-3 font-semibold">
                {t("card2.title")}
              </h3>
              <div className="mt-auto pt-3 text-center border-t border-[#171717]">
                <Link href="/services/car-paint" className="inline-flex items-center gap-1 text-[9px] tracking-[0.25em] uppercase text-[#777777] group-hover:text-[#C5A880] transition-colors">
                  <span>{t("card2.link")}</span>
                  <span className="text-xs">&raquo;</span>
                </Link>
              </div>
            </div>

            {/* Card 3: PRECISION PDR REFLECTION */}
            <div className="scroll-reveal scroll-delay-3 bg-[#0C0C0C] border border-[#1C1C1C] p-4 flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-black mb-4 border border-[#171717]">
                <img 
                  src="/images/pdr_light.jpg" 
                  alt="Auto Moj Precision PDR" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
              </div>
              <h3 className="text-center font-serif text-xs tracking-[0.2em] uppercase text-[#EDEDED] mb-3 font-semibold">
                {t("card3.title")}
              </h3>
              <div className="mt-auto pt-3 text-center border-t border-[#171717]">
                <Link href="/services/dent-repair" className="inline-flex items-center gap-1 text-[9px] tracking-[0.25em] uppercase text-[#777777] group-hover:text-[#C5A880] transition-colors">
                  <span>{t("card3.link")}</span>
                  <span className="text-xs">&raquo;</span>
                </Link>
              </div>
            </div>

            {/* Card 4: LOW-BAKE SPRAY PAINT */}
            <div className="scroll-reveal scroll-delay-4 bg-[#0C0C0C] border border-[#1C1C1C] p-4 flex flex-col group hover:border-[#C5A880]/50 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden bg-black mb-4 border border-[#171717]">
                <img 
                  src="/images/spray_gun.jpg" 
                  alt="Auto Moj Low-Bake Oven Refinish" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
              </div>
              <h3 className="text-center font-serif text-xs tracking-[0.2em] uppercase text-[#EDEDED] mb-3 font-semibold">
                {t("card4.title")}
              </h3>
              <div className="mt-auto pt-3 text-center border-t border-[#171717]">
                <Link href="/services/car-paint" className="inline-flex items-center gap-1 text-[9px] tracking-[0.25em] uppercase text-[#777777] group-hover:text-[#C5A880] transition-colors">
                  <span>{t("card4.link")}</span>
                  <span className="text-xs">&raquo;</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: MONOBLOCK / TECHNICAL CRAFT SHOWCASE (Exact 1:1 of Roma R10 Monoblock with Left Specs & Right Circular/Square Feature) */}
      <section id="standards" className="py-24 bg-[#080808] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Specs List */}
            <div className="lg:col-span-5 space-y-6 scroll-reveal-left">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-[#EDEDED] uppercase font-semibold">
                  {t("spec.title")}
                </h2>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#888888] mt-0.5">
                  {t("spec.badge")}
                </p>
                <p className="text-sm font-serif text-[#C5A880] tracking-wider mt-2">
                  {t("spec.price")}
                </p>
              </div>

              {/* Technical Spec List with Icons & Exact Alignment */}
              <div className="border-t border-[#171717] pt-6 space-y-3.5 text-[11px] tracking-wider font-light">
                <div className="flex items-center justify-between py-1 border-b border-[#121212]">
                  <span className="text-[#666666] uppercase tracking-[0.15em]">{t("spec.row1.label")}</span>
                  <span className="text-[#EDEDED] font-mono">{t("spec.row1.value")}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#121212]">
                  <span className="text-[#666666] uppercase tracking-[0.15em]">{t("spec.row2.label")}</span>
                  <span className="text-[#EDEDED] font-mono">{t("spec.row2.value")}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#121212]">
                  <span className="text-[#666666] uppercase tracking-[0.15em]">{t("spec.row3.label")}</span>
                  <span className="text-[#EDEDED] font-mono">{t("spec.row3.value")}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#121212]">
                  <span className="text-[#666666] uppercase tracking-[0.15em]">{t("spec.row4.label")}</span>
                  <span className="text-[#EDEDED] font-mono">{t("spec.row4.value")}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#121212]">
                  <span className="text-[#666666] uppercase tracking-[0.15em]">{t("spec.row5.label")}</span>
                  <span className="text-[#EDEDED] font-mono">{t("spec.row5.value")}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#121212]">
                  <span className="text-[#666666] uppercase tracking-[0.15em]">{t("spec.row6.label")}</span>
                  <span className="text-[#EDEDED] font-mono">{t("spec.row6.value")}</span>
                </div>
              </div>

              <div className="pt-3">
                <Link 
                  href="/get-a-quote" 
                  className="inline-flex items-center gap-2 border border-[#333333] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300"
                >
                  <span>{t("spec.cta")}</span>
                  <span className="text-xs text-[#C5A880]">&raquo;</span>
                </Link>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end scroll-reveal-right">
              <div className="w-full max-w-lg border border-[#1C1C1C] bg-[#0C0C0C] p-3 sm:p-4">
                <img 
                  src="/images/metal_shaping.jpg" 
                  alt="Auto Moj Traditional Metal Shaping" 
                  className="w-full aspect-square object-cover filter contrast-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: CARBON AERO / PHILOSOPHY */}
      <section id="restorations" className="py-24 bg-[#080808] border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-6 scroll-reveal-left">
              <div className="border border-[#1C1C1C] bg-[#0C0C0C] p-3 sm:p-4">
                <img 
                  src="/images/carbon.jpg" 
                  alt="Auto Moj Carbon Composite & Bumper Repair" 
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
            </div>

            {/* Right Text with AM Watermark */}
            <div className="lg:col-span-6 space-y-6 relative scroll-reveal-right">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
                <span className="text-[120px] font-serif font-bold text-[#C5A880]">AM</span>
              </div>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-[#EDEDED] uppercase font-semibold">
                  {t("phil.title")}
                </h2>
              </div>

              <p className="text-xs text-[#8E8E8E] leading-relaxed font-light tracking-wide max-w-lg">
                {t("phil.desc")}
              </p>
              
              <div className="pt-2">
                <Link 
                  href="/services/accident-repair" 
                  className="inline-flex items-center gap-2 border border-[#333333] hover:border-[#C5A880] text-[#EDEDED] hover:text-[#C5A880] px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300"
                >
                  <span>{t("phil.cta")}</span>
                  <span className="text-xs text-[#C5A880]">&raquo;</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
