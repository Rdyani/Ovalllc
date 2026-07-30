import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

/**
 * ⚠️  TEMPLATE — have a lawyer review before launch.
 *
 * These cover BOTH website use and the terms of sale, because packages are
 * bought directly through a Stripe Payment Link — there is no separate signed
 * services agreement to fall back on. Section 3 is therefore the contract for
 * every purchase, and it must stay consistent with the scopes published in
 * src/lib/packages.ts and with /refund-policy.
 *
 * The governing-law clause names Wyoming, matching where the LLC is registered.
 */

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the OVAL website and the purchase of our packages and custom projects: scope, payment, delivery, revisions, ownership and liability.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      intro={`These terms govern your use of the ${site.name} website and your purchase of any package sold on it. Please read section 3 before buying — it is the agreement between us.`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Terms of service", path: "/terms" },
      ]}
    >
      <h2>1. Acceptance</h2>
      <p>
        By accessing {site.url} you agree to these terms. If you do not agree, please do
        not use the site. We may update these terms from time to time; continued use after
        a change constitutes acceptance of the revised version.
      </p>

      <h2>2. About us</h2>
      <p>
        This website is operated by {site.legalName}, a limited liability company
        registered in the United States, with its registered address at{" "}
        {site.address.street}, {site.address.city}, {site.address.region}{" "}
        {site.address.postalCode}.
      </p>

      <h2>3. Buying a package</h2>
      <p>
        Packages are sold at the fixed prices listed on our <a href="/pricing">pricing
        page</a>. Buying one forms a contract between you and {site.legalName} on these
        terms. There is no separate agreement to sign.
      </p>

      <h3>3.1 Scope</h3>
      <p>
        What you are buying is the list of items shown under &ldquo;What&rsquo;s
        included&rdquo; for that package on the pricing page, at the version published on
        the day you pay. Anything not on that list is not included. If you need something
        outside it, contact us first and we will quote it separately.
      </p>

      <h3>3.2 Payment</h3>
      <p>
        Payment is taken in full at the time of purchase, in {site.currency}, by card
        through Stripe. We do not see or store your card details. Prices exclude
        third-party costs such as domain registration, premium hosting, paid plugins and
        stock imagery; we will tell you before any such cost is incurred on your behalf.
      </p>

      <h3>3.3 Delivery</h3>
      <p>
        Each package states a turnaround in business days. That period begins when you
        return the project questionnaire with the content and access we have asked for —
        not on the date you pay — because the work cannot start before then. If we expect
        to miss a stated turnaround, we will tell you before the deadline passes.
      </p>

      <h3>3.4 Your responsibilities</h3>
      <p>
        You are responsible for supplying accurate content, for holding the rights to any
        text, images or logos you send us, and for providing the access we need. You
        confirm that material you supply does not infringe anyone else&rsquo;s rights.
      </p>

      <h3>3.5 Revisions and cancellation</h3>
      <p>
        Revision rounds are stated per package on the pricing page. Cancellations and
        refunds are governed by our <a href="/refund-policy">refund policy</a>, which
        forms part of these terms.
      </p>

      <h3>3.6 Ownership</h3>
      <p>
        On completion of payment, all deliverables — code, design files and written
        content produced for you — transfer to you outright, along with any domain,
        hosting and third-party accounts set up in your name. There is no licence to
        maintain and nothing to renew with us.
      </p>

      <h3>3.7 Custom projects and invoiced work</h3>
      <p>
        Work outside the published packages is quoted individually. In that case the
        written quote we send you — its scope, price and delivery date — replaces the
        pricing page as the definition of what you are buying, and everything else in
        section 3 continues to apply.
      </p>
      <p>
        Custom projects are invoiced through Stripe in two parts: a <strong>50%
        deposit</strong> before work begins, and the remaining <strong>50% on
        delivery</strong>. Work starts once the deposit clears and you have supplied the
        content and access we need. The balance is due within 14 days of the delivery
        invoice unless we have agreed otherwise in writing. Delivered work remains
        licensed to you for review until the balance is paid, at which point ownership
        transfers under section 3.6.
      </p>

      <h2>4. No guarantee of results</h2>
      <p>
        We sell defined work, not outcomes. We do not promise any search engine ranking,
        volume of traffic, number of enquiries or amount of revenue, and nothing on this
        website should be read as such a promise. Search rankings are determined by third
        parties whose algorithms we do not control and cannot influence beyond doing the
        work well. Any figures quoted anywhere on this site are general market information
        and not a prediction of your results.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        All content on this site — text, design, graphics, code and the OVAL
        name and marks — is owned by us or our licensors and protected by intellectual
        property law. You may view and print pages for your own internal reference. You
        may not republish, sell, or systematically extract content, or use our marks
        without written permission.
      </p>
      <p>
        This applies to the website itself. Work we produce <em>for you</em> under a
        purchased package is covered by section 3.6 above: it transfers to you outright on
        completion of payment.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful purpose or in breach of any regulation.</li>
        <li>
          Attempt to gain unauthorised access to the site, its servers, or any connected
          system.
        </li>
        <li>
          Introduce malware, or launch any denial-of-service or automated attack against
          the site.
        </li>
        <li>
          Scrape, harvest or systematically extract content or contact details, except by
          well-behaved search engine crawlers acting in accordance with our robots.txt.
        </li>
        <li>Submit false information or spam through our contact form.</li>
      </ul>

      <h2>7. Third-party links</h2>
      <p>
        This site may link to third-party websites. Those links are provided for
        convenience only. We do not control and are not responsible for the content,
        accuracy or privacy practices of any external site.
      </p>

      <h2>8. Disclaimer</h2>
      <p>
        The site and its content are provided &ldquo;as is&rdquo; without warranties of any
        kind, express or implied, including any implied warranty of merchantability,
        fitness for a particular purpose, or non-infringement. Content is published for
        general information and does not constitute professional, legal or financial
        advice.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.legalName} shall not be liable for
        any indirect, incidental, special, consequential or punitive damages, or for any
        loss of profits, revenue, data or goodwill, arising from your use of this site.
        Nothing in these terms excludes liability for death or personal injury caused by
        negligence, for fraud, or for any liability that cannot lawfully be excluded.
      </p>

      <h2>10. Indemnity</h2>
      <p>
        You agree to indemnify us against any claims, losses or expenses arising from your
        breach of these terms or your misuse of the site.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Wyoming, United States, and
        the courts of that state have exclusive jurisdiction over any dispute. If you
        are a consumer resident in the United Kingdom or European Union, this does not
        deprive you of the protection of mandatory consumer law in your country of
        residence.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
