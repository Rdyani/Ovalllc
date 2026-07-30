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
 * Resend and Stripe. If you change host, add analytics, or start using a CRM,
 * add it to that list AND to the cookies section — describing processing you do
 * not do is as much of an accuracy problem under GDPR as omitting one you do.
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
          location derived from IP address, device and browser type.
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
          <strong>Legal obligation</strong> — for records we are required to retain.
        </li>
      </ul>

      <h2>Cookies and tracking</h2>
      <p>
        <strong>This website sets no cookies at all.</strong> There is no analytics
        package, no advertising pixel, no tracking script and no consent banner, because
        there is nothing to consent to. You can verify it in your browser&rsquo;s developer
        tools.
      </p>
      <p>
        If we add analytics in future we will update this policy first, and any
        non-essential cookie will be set only after you agree to it.
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
      </ul>
      <p>
        That is the complete list. We do not use analytics, advertising or tracking
        services on this website, and we do not share your data with anyone else except
        where legally required, or to establish or defend legal claims.
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
