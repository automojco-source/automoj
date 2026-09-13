import type { Metadata } from "next";
import { SITE, formattedAddress, hasLegalDetails } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms on which ${SITE.name} provides estimates and repair work.`,
  alternates: { canonical: "/terms-and-conditions" },
};

/**
 * DRAFT — needs the registered company details and a solicitor's read-through
 * before launch. Written to describe how the business actually operates: free
 * estimates, no online payment, no binding quote until the vehicle is seen.
 *
 * Deliberately says nothing about a warranty period: there is no written
 * warranty document yet. When one exists, add a section here and link it.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; Conditions" updated="10 September 2026">
      <h2>About these terms</h2>
      <p>
        These terms apply to this website and to estimates and repair work provided by{" "}
        {SITE.name}, {formattedAddress()}.
        {hasLegalDetails() && (
          <>
            {" "}
            {SITE.legal.registeredName} is registered in {SITE.legal.placeOfRegistration} under
            company number {SITE.legal.companyNumber}.
          </>
        )}
      </p>
      <p>
        Nothing in these terms affects your statutory rights under the Consumer Rights Act
        2015. If any part of these terms conflicts with those rights, your rights win.
      </p>

      <h2>Estimates</h2>
      <p>
        An estimate given through this website, by phone or by message is an{" "}
        <strong>indication only</strong>. It is based on what you have told us and, where you
        have sent them, photographs. It is not a quotation and it does not bind either of us.
      </p>
      <p>
        A firm price can only be given after we have seen the vehicle in person. Damage that is
        not visible until a panel is removed is common in accident repair, and where we find it
        we will tell you and agree the change with you before carrying on.
      </p>
      <p>Estimates are free and carry no obligation.</p>

      <h2>Insurance work</h2>
      <p>
        Where a repair is being paid for by an insurer, the work, the parts and the price are
        agreed with that insurer. Your insurer may specify parts other than the vehicle
        manufacturer&rsquo;s own; where that happens we will tell you.
      </p>
      <p>
        You are entitled to choose who repairs your vehicle. Your insurer may recommend a
        repairer, but the choice is yours. Using a repairer outside your insurer&rsquo;s network
        may affect what your policy covers — check your policy or ask your insurer.
      </p>
      <p>
        You remain responsible for any excess and for anything your insurer does not cover.
      </p>

      <h2>Carrying out the work</h2>
      <p>
        We will carry out the work with reasonable care and skill, and within a reasonable time.
        Any completion date we give is an estimate; parts availability and, on insurance work,
        the insurer&rsquo;s authorisation can move it.
      </p>
      <p>
        Where a repair needs equipment or expertise we do not have, we will say so rather than
        attempt it.
      </p>

      <h2>Your vehicle while it is with us</h2>
      <p>
        Please remove personal belongings before leaving your vehicle with us. We cannot accept
        responsibility for items left in a vehicle.
      </p>
      <p>
        Vehicles are held at your risk except where loss or damage is caused by our negligence.
      </p>

      <h2>Payment</h2>
      <p>
        For private work, payment is due on collection unless we have agreed otherwise in
        writing. We do not take payment through this website.
      </p>
      <p>
        We may keep possession of a vehicle until payment for work carried out on it has been
        made.
      </p>

      <h2>If something is not right</h2>
      <p>
        Tell us. Bring the vehicle back and we will look at it. Contact{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
        <a href={`tel:${SITE.telephone.e164}`}>{SITE.telephone.display}</a>.
      </p>

      <h2>This website</h2>
      <p>
        We try to keep the information on this website accurate and current, but we do not
        guarantee that it is complete or error-free. Prices mentioned in any guide or article
        are illustrative and are not an offer.
      </p>
      <p>
        The content of this website belongs to us and may not be copied or reproduced without
        our permission.
      </p>

      <h2>Law</h2>
      <p>
        These terms are governed by the law of England and Wales, and the courts of England and
        Wales have jurisdiction.
      </p>
    </LegalPage>
  );
}
