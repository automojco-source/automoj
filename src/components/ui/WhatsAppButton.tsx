"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WhatsAppButton() {
  const pathname = usePathname();
  
  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "447123456789"; 
  const message = "Hi Auto Moj, I'm interested in an accident repair quote for my car.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </Link>
  );
}
