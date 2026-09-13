import type { Metadata } from "next";
import { ServicesView } from "@/components/pages/ServicesView";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Accident and collision repair, hand panel beating, paintless dent removal and colour-matched paint. Watford and North West London.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Auto Moj",
    description:
      "Accident repair, hand panel beating, PDR and refinishing in Watford.",
    url: "/services",
  },
};

export default function ServicesIndexPage() {
  return <ServicesView />;
}
