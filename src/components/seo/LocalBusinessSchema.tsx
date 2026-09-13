import { SITE, googleMapsSearchUrl } from "@/lib/site";

/**
 * schema.org structured data for the workshop.
 *
 * `AutoBodyShop` is the specific type for a body/collision repair business, and
 * it is what puts a local business in the map pack alongside a Google Business
 * Profile. The two must agree: the name, address and phone below are the same
 * strings the profile should carry.
 *
 * Deliberately NOT included: `geo`. Guessed coordinates are worse than none —
 * Google geocodes the postal address perfectly well, and a latitude that is a
 * few hundred metres out puts the pin in the wrong yard. Add real coordinates
 * (from the Google Business Profile, once verified) if precision is ever needed.
 *
 * Also not included: `aggregateRating` or `review`. Marking up reviews that
 * have not been collected is a banned practice under the DMCC Act 2024.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": `${SITE.url}/#workshop`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    telephone: SITE.telephone.e164,
    email: SITE.email,
    image: `${SITE.url}/images/site-icon.png`,
    description:
      "Independent bodyshop in Watford. Traditional hand panel beating, paintless dent removal and colour-matched paint for Watford and North West London.",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.name}, ${SITE.address.street}`,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    hasMap: googleMapsSearchUrl(),
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: SITE.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
    currenciesAccepted: "GBP",
    knowsLanguage: ["en-GB"],
    makesOffer: [
      "Accident and collision repair",
      "Hand panel beating and metal shaping",
      "Paintless dent removal",
      "Paint and refinishing",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from a literal we control — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
