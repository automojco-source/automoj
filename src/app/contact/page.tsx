import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";
import { SITE, formattedAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Opening Hours",
  description: `Auto Moj, ${formattedAddress()}. Call ${SITE.telephone.display} or email ${SITE.email}. Open Monday to Friday and Saturday mornings.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Auto Moj | Watford",
    description: `Find the workshop at ${formattedAddress()}, and how to reach us.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
