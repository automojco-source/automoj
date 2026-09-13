import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "About the Workshop",
  description:
    "An independent bodyshop in Watford with over seven years of bodywork and paint. Traditional hand panel beating, PDR and refinishing for North West London.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About the Workshop | Auto Moj",
    description:
      "Traditional hand panel beating in Watford. We repair panels rather than replace them, and we deal with your insurer.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
