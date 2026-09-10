"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  image: string;
  beforeImage?: string;
  alt?: string;
}

export function BeforeAfterSlider({ image, beforeImage, alt = "" }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    // One AbortController removes every listener at once. The previous version
    // passed a fresh arrow function to removeEventListener, so nothing was ever
    // actually removed and each drag leaked another set of window listeners.
    const controller = new AbortController();
    const { signal } = controller;
    const stop = () => setIsDragging(false);

    window.addEventListener("mousemove", (e) => handleMove(e.clientX), { signal });
    window.addEventListener("touchmove", (e) => handleMove(e.touches[0].clientX), { signal });
    window.addEventListener("mouseup", stop, { signal });
    window.addEventListener("touchend", stop, { signal });
    window.addEventListener("touchcancel", stop, { signal });

    return () => controller.abort();
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize bg-black"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" />

      {/* Clipped rather than width-constrained, so the image never needs
          measuring and the two halves always line up pixel for pixel. */}
      <img
        src={beforeImage ?? image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover filter grayscale brightness-75"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[#C5A880] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#C5A880] flex items-center justify-center shadow-lg">
          <MoveHorizontal className="w-4 h-4 text-[#080808]" />
        </div>
      </div>

      {/* Keyboard access: the slider is also operable without a pointer. */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPosition}
        aria-label="Reveal the before image"
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2/3 opacity-0 focus-visible:opacity-100"
      />
    </div>
  );
}
