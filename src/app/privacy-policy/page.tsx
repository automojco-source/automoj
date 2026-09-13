import type { Metadata } from "next";
import { SITE, formattedAddress, hasLegalDetails, hasSoleTraderDetails } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and stores your personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

/**
 * DRAFT — needs two things before launch:
 *   1. The registered company details (see the "Who we are" section).
 *   2. A read-through by a UK solicitor. This is written to be accurate about
 *      what the site actually does, but it is not legal advice.
 *
 * It describes the site as built: one quote form, no analytics, no advertising
 * pixels, no non-essential cookies. If any of those are added, this must change
 * in the same commit — and a cookie banner becomes mandatory under PECR.
 */
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="10 September 2026">
      <h2>Who we are</h2>
      <p>
        {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website and is the data
        controller for the personal information described below.
      </p>
      <ul>
        {hasLegalDetails() && (
          <li>
            {SITE.legal.registeredName}, registered in {SITE.legal.placeOfRegistration}, company
            number {SITE.legal.companyNumber}
            {SITE.legal.registeredOffice ? `. Registered office: ${SITE.legal.registeredOffice}` : ""}
            {SITE.legal.vatNumber ? `. VAT number ${SITE.legal.vatNumber}` : ""}
          </li>
        )}
        {!hasLegalDetails() && hasSoleTraderDetails() && (
          <li>
            {SITE.name} is the trading name of {SITE.soleTrader.fullName}, trading as a sole
            trader.
          </li>
        )}
        <li>Address: {formattedAddress()}</li>
        <li>
          Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </li>
        <li>
          Telephone: <a href={`tel:${SITE.telephone.e164}`}>{SITE.telephone.display}</a>
        </li>
      </ul>

      <h2>What we collect</h2>
      <p>
        We collect personal information only when you send it to us. If you complete the
        estimate form, that is: your name, telephone number, email address, postcode, your
        vehicle registration, the type of damage, any description you write, and a preferred
        date if you give one.
      </p>
      <p>
        If you contact us by phone, email or WhatsApp, we hold whatever you tell us in that
        conversation.
      </p>
      <p>
        We do not use analytics, advertising pixels or tracking cookies on this website. The
        only cookie we set is the one that keeps a member of staff signed in to the private
        admin area; it is not set for visitors.
      </p>
      <p>
        Our contact page can show a map from Google Maps. It is not loaded automatically —
        Google may set its own cookies once it does, so we only load it if you press
        &ldquo;Show map&rdquo;. If you would rather it did not load at all, use the
        &ldquo;Open in Google Maps&rdquo; or &ldquo;Directions&rdquo; links instead, which take
        you to Google&rsquo;s own site rather than loading anything here.
      </p>

      <h2>Why we use it, and our lawful basis</h2>
      <ul>
        <li>
          <strong>To answer your enquiry and give you an estimate.</strong> Lawful basis: it is
          necessary to take steps, at your request, towards a possible repair contract with you.
          You confirm you have read this policy by ticking the box on the form, but we do not
          rely on that tick as consent under data protection law — this processing happens
          because you asked us to, not because you opted in to it.
        </li>
        <li>
          <strong>To carry out repair work you ask us to do.</strong> Lawful basis: performance
          of a contract.
        </li>
        <li>
          <strong>To deal with your insurer about a claim,</strong> where you have asked us to.
          Lawful basis: performance of a contract, and your consent.
        </li>
        <li>
          <strong>To keep records of work carried out.</strong> Lawful basis: our legitimate
          interest in being able to answer questions about a repair, and to defend a claim.
        </li>
      </ul>
      <p>
        We do not sell your information, and we do not use it to send you marketing unless you
        have separately asked us to.
      </p>

      <h2>Who we share it with</h2>
      <ul>
        <li>
          <strong>Your insurer or their engineer,</strong> where you have asked us to handle a
          claim.
        </li>
        <li>
          <strong>Parts suppliers,</strong> limited to what is needed to order the right part
          for your vehicle.
        </li>
        <li>
          <strong>Our IT suppliers,</strong> who host this website, its database and our email.
          They process data on our instructions only.
        </li>
      </ul>
      <p>
        Where a supplier stores data outside the UK, we rely on the UK Government&rsquo;s
        adequacy regulations or on standard contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries that do not lead to work are deleted after{" "}
        <strong>{SITE.retention.enquiry.en}</strong>. Records of repairs we have carried out are
        kept for <strong>{SITE.retention.jobRecord.en}</strong>, which matches the period in
        which a claim about the work could still be brought, so that we can answer questions
        about a repair and deal with any claim arising from it.
      </p>

      <h2>Your rights</h2>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>ask for a copy of the personal information we hold about you;</li>
        <li>ask us to correct anything that is wrong;</li>
        <li>ask us to delete it, where we have no continuing reason to keep it;</li>
        <li>object to, or ask us to restrict, how we use it;</li>
        <li>withdraw your consent at any time; and</li>
        <li>ask us to transfer it to someone else.</li>
      </ul>
      <p>
        To exercise any of these, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We
        will respond within one month; if your request is complex we may extend this by a
        further two months, and we will tell you if we need to.
      </p>
      <p>
        If you are unhappy with how we have handled your information you can complain to the
        Information Commissioner&rsquo;s Office at{" "}
        <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">
          ico.org.uk
        </a>
        , or by calling 0303 123 1113. We would rather you told us first, so we can put it
        right.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy we will update the date at the top of this page.
      </p>
    </LegalPage>
  );
}
