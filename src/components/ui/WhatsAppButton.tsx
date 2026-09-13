"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SITE } from "@/lib/site";

/**
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER. If it is not set the
 * button does not render at all — better than a button that opens WhatsApp on
 * a number nobody answers.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const fa = lang === "FA";

  const phoneNumber = SITE.whatsapp;

  if (!phoneNumber) return null;
  if (pathname?.startsWith("/admin")) return null;

  const message = fa
    ? "سلام اتوموج، برای تعمیر خودرویم درخواست استعلام قیمت دارم."
    : "Hi Auto Moj, I'd like a quote for accident repair on my car.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={fa ? "گفت‌وگو در واتساپ" : "Chat with us on WhatsApp"}
      className="fixed bottom-6 end-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
