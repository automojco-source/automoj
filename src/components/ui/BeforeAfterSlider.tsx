"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  image: string;
}

export function BeforeAfterSlider({ image }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-xl select-none cursor-ew-resize group"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* AFTER IMAGE (Perfect condition) */}
      <img 
        src={image} 
        alt="After Repair" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
      />
      
      {/* BEFORE IMAGE (Simulated damage via CSS filters for prototyping) */}
      <img 
        src={image} 
        alt="Before Repair" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none saturate-50 contrast-125 brightness-75" 
        style={{ 
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
        }}
      />

      {/* SLIDER LINE & HANDLE */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110">
          <MoveHorizontal className="w-6 h-6" />
        </div>
      </div>
      
      {/* LABELS */}
      <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest backdrop-blur-md">BEFORE</div>
      <div className="absolute top-4 right-4 bg-primary text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg">AFTER</div>
    </div>
  );
}
