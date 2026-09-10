"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * The public site's shell. The admin area has its own chrome, so the marketing
 * navbar, footer and WhatsApp button are kept off every /admin route.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      <div className="flex-1 mt-14 sm:mt-16">{children}</div>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
