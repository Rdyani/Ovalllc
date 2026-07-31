import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

/**
 * ⚠️  TEMPLATE — have a lawyer review before launch.
 *
 * This covers the common ground for a US agency serving UK/EU visitors
 * (GDPR + UK GDPR + CCPA/CPRA), but it is not legal advice.
 *
 * The sub-processor list names the tools this site actually uses today: Vercel,
 * Resend, Stripe and Google Analytics. If you change host, or start collecting
 * anything new, update this page in the same commit — describing processing you do not do is as much of an
 * accuracy problem under GDPR as omitting one you do.
 *
 * Analytics cookies are gated behind the consent banner in
 * src/components/cookie-consent.tsx — GTM is not loaded at all until a visitor
 * accepts. If you ever load a tag outside that gate, this section stops being
 * true.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OVAL collects, uses and protects personal data for visitors and clients in the United States, United Kingdom and European Union.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro={`This policy explains what personal data ${site.legalName} collects, why we collect it, and the rights you have over it.`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy policy", path: "/privacy" },
      ]}
    >
      <h2>Who we are</h2>
      <p>
        {site.legalName} (&ldquo;OVAL&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) is a digital marketing and web development agency registered in
        the United States, at {site.address.street}, {site.address.city},{" "}
        {site.address.region} {site.address.postalCode}. For questions about this policy
        or about your data, contact <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        For visitors in the United Kingdom and European Economic Area, we act as the data
        controller for information collected through this website. Where we process data
        on behalf of a client — for example, analytics data within their own properties —
        we act as a data processor under that client&rsquo;s instructions.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Enquiry details.</strong> When you complete our contact form we collect
          your name, email address, company, website, and whatever you write in the
          message field, along with the service, budget and timeline you select.
        </li>
        <li>
          <strong>Order details.</strong> When you buy a package, Stripe processes the
          payment and shares your name, email address and order reference with us. We
          never receive or store your card number.
        </li>
        <li>
          <strong>Correspondence.</strong> Emails, call notes and documents you share with
          us during a project or a sales conversation.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage data.</strong> Pages visited, referring source, approximate
          location derived from IP address, device and browser type — collected through
          Google Analytics, as described under Cookies and analytics below.
        </li>
        <li>
          <strong>Technical data.</strong> IP address and request headers, retained
          briefly in server logs for security and abuse prevention. Contact form
          submissions are rate-limited per IP address for the same reason.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and, where relevant, quote work for you.</li>
        <li>To deliver a package you have purchased, and to contact you about that order.</li>
        <li>To understand in aggregate how people find and use this website.</li>
                <li>To protect the site against spam, abuse and fraudulent submissions.</li>
        <li>To meet legal, accounting and tax obligations.</li>
      </ul>
      <p>
        We do not sell personal data, and we do not share it with advertising networks for
        cross-context behavioural advertising.
      </p>

      <h2>Legal bases (UK & EU visitors)</h2>
      <ul>
        <li>
          <strong>Legitimate interests</strong> — responding to business enquiries and
          protecting the site against spam and abuse.
        </li>
        <li>
          <strong>Contract</strong> — where processing is necessary to deliver services
          you or your organisation have engaged us for.
        </li>
        <li>
          <strong>Consent</strong> — for the analytics cookies described below. Nothing is
          set until you accept the banner, and you can withdraw consent at any time via
          the Cookie settings link in the footer.
        </li>
        <li>
          <strong>Legal obligation</strong> — for records we are required to retain.
        </li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        This website uses Google Analytics 4 to measure how many people visit and which
        pages they read. It sets the following cookies:
      </p>
      <ul>
        <li>
          <strong>_ga</strong> — distinguishes one visitor from another. Expires after
          two years.
        </li>
        <li>
          <strong>_ga_&lt;container&gt;</strong> — keeps track of a single visit. Expires
          after two years.
        </li>
      </ul>
      <p>
        We use this only to see aggregate patterns — which pages are read, how people
        arrive, which devices they use. We do not use it for advertising, we do not build
        profiles of individuals, and we have not enabled Google Signals or any
        ad-personalisation feature.
      </p>
      <p>
        <strong>These cookies are only set if you agree.</strong> When you first visit, a
        banner asks whether we may measure how the site is used. Nothing from Google is
        loaded until you choose Accept — if you decline, or simply ignore the banner, the
        Google Analytics script is never requested and no analytics cookie is created.
      </p>
      <p>
        You can change your mind whenever you like using the <strong>Cookie settings</strong>{" "}
        link in the footer of any page, which clears the stored choice and asks again. Your
        answer is remembered in your browser&rsquo;s local storage rather than in a cookie,
        so declining really does leave your browser with nothing set by us.
      </p>
      <p>
        You can also block or clear these cookies in your browser at any time, or install
        Google&rsquo;s{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          opt-out browser add-on
        </a>
        . The site works exactly the same without them. No cookie is required for the site
        to function, and we set none for advertising.
      </p>

      <h2>Who we share data with</h2>
      <p>
        We use a small number of third-party providers to run the business. Each processes
        data under contract and only on our instructions:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (United States) — website hosting and content
          delivery. Processes IP addresses and request data in server logs.
        </li>
        <li>
          <strong>Resend</strong> (United States) — delivers contact form submissions to
          our inbox. Processes the name, email address and message you submit.
        </li>
        <li>
          <strong>Stripe, Inc.</strong> (United States) — payment processing. Stripe
          collects your card details directly; we never receive or store them. See{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            Stripe&rsquo;s privacy policy
          </a>{" "}
          for how they handle payment data.
        </li>
        <li>
          <strong>Google LLC</strong> (United States) — Google Analytics 4, used to
          understand how people find and use this site. Processes
          your IP address (truncated by Google before storage), pages viewed, approximate
          location, device and browser type, and referring source. See{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&rsquo;s privacy policy
          </a>
          .
        </li>
      </ul>
      <p>
        That is the complete list. We do not sell your data or share it with advertising
        networks, and we do not disclose it to anyone else except where legally required,
        or to establish or defend legal claims.
      </p>

      <h2>International transfers</h2>
      <p>
        We are based in the United States, so personal data from UK and EEA visitors is
        transferred to and stored in the US. Where required, these transfers rely on the
        UK International Data Transfer Addendum or the EU Standard Contractual Clauses,
        together with supplementary technical measures.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          <strong>Enquiries that do not become clients:</strong> up to 24 months, then
          deleted.
        </li>
        <li>
          <strong>Client records:</strong> for the life of the engagement plus seven years,
          to meet accounting and legal requirements.
        </li>
        <li>
          <strong>Server logs:</strong> typically 30 days.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access the personal data we
        hold about you, correct it, delete it, restrict or object to its processing,
        receive it in a portable format, or withdraw consent you previously gave.
        California residents additionally have the right to know what is collected, to
        request deletion, and not to be discriminated against for exercising those rights.
      </p>
      <p>
        To exercise any of these, email <a href={`mailto:${site.email}`}>{site.email}</a>.
        We respond within 30 days. UK and EU residents also have the right to complain to
        their supervisory authority — in the UK, the Information Commissioner&rsquo;s
        Office.
      </p>

      <h2>Security</h2>
      <p>
        We use TLS encryption in transit, access controls on internal systems, and limit
        access to personal data to those who need it. No system is perfectly secure, but
        we take these obligations seriously and will notify affected individuals and
        regulators where a breach requires it.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for business audiences and is not directed at children under
        16. We do not knowingly collect personal data from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will update this page when our practices change, and revise the &ldquo;last
        updated&rdquo; date at the top. Material changes affecting existing clients will be
        communicated directly.
      </p>
    </LegalPage>
  );
}
