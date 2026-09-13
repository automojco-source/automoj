import type { Metadata } from "next";
import { QuoteView } from "@/components/pages/QuoteView";

export const metadata: Metadata = {
  title: "Get a Free Estimate",
  description:
    "Tell us about your vehicle and the damage, and we will come back to you with an estimate. Free, and no obligation.",
  alternates: { canonical: "/get-a-quote" },
  openGraph: {
    title: "Get a Free Estimate | Auto Moj",
    description:
      "Four short steps. Free estimate, no obligation, and we deal with your insurer.",
    url: "/get-a-quote",
  },
};

export default function GetAQuotePage() {
  return <QuoteView />;
}
