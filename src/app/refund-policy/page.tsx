import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * ⚠️  TEMPLATE — have a lawyer review before launch.
 *
 * Payment processors expect a clear, findable refund and cancellation policy,
 * and its absence is one of the more common reasons a new account is held or
 * declined. This one is deliberately specific: stages, timeframes and amounts,
 * so a disputed charge can be judged against something written down.
 *
 * Keep it consistent with what the packages in src/lib/packages.ts actually say
 * about revisions — a policy that contradicts the sales page is worse than none.
 */

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "How refunds and cancellations work at OVAL: full refund before work starts, partial refund mid-project, and revisions once work is delivered to scope.",
  alternates: { canonical: "/refund-policy" },
  robots: { index: true, follow: true },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="July 2026"
      intro="We would rather tell you plainly when you can get your money back than bury it. This policy applies to every package sold on this website and to custom projects we invoice."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Refund policy", path: "/refund-policy" },
      ]}
    >
      <h2>The short version</h2>
      <ul>
        <li>
          <strong>Before we start work</strong> — full refund, no questions asked.
        </li>
        <li>
          <strong>After work has started but before delivery</strong> — partial refund
          reflecting the work already completed.
        </li>
        <li>
          <strong>After delivery, if the work does not match the scope</strong> — we fix
          it, or refund you if we cannot.
        </li>
        <li>
          <strong>After delivery, if the work matches the scope</strong> — revisions
          within your package&rsquo;s allowance, rather than a refund.
        </li>
      </ul>

      <h2>1. Cancelling before work begins</h2>
      <p>
        Work begins when we send you the project questionnaire and you return it. If you
        cancel at any point before we have started producing anything, you receive a 100%
        refund. Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we will process it to your
        original payment method, normally within two business days. Your bank may take a
        further five to ten business days to show it.
      </p>

      <h2>2. Cancelling part-way through</h2>
      <p>
        Once production has started, a cancellation is refunded in proportion to the work
        completed:
      </p>
      <ul>
        <li>
          <strong>Research or audit stage</strong> — 75% refunded.
        </li>
        <li>
          <strong>Design or first draft delivered</strong> — 50% refunded.
        </li>
        <li>
          <strong>Build complete, awaiting launch</strong> — 25% refunded.
        </li>
        <li>
          <strong>Delivered and accepted</strong> — no refund, but revisions still apply
          (see section 4).
        </li>
      </ul>
      <p>
        Anything already produced at the point of cancellation is yours to keep and use.
        We do not withhold partial work.
      </p>

      <h2>3. If the work does not match what was sold</h2>
      <p>
        Every package on our{" "}
        <a href="/pricing">pricing page</a> lists exactly what is included. If something
        listed in that scope is missing from what we delivered, tell us within 14 days and
        we will complete it at no extra cost. If we cannot deliver it, you receive a
        refund for that portion of the work — or a full refund if the missing element was
        central to the package.
      </p>

      <h2>4. Revisions rather than refunds</h2>
      <p>
        Once work has been delivered in line with the agreed scope, we resolve
        dissatisfaction through revisions rather than refunds. The number of rounds
        included varies by package:
      </p>
      <ul>
        {packages.map((entry) => (
          <li key={entry.slug}>
            <strong>
              {entry.name} (${entry.price})
            </strong>{" "}
            — {entry.revisions.replace(/\.$/, "")}
          </li>
        ))}
      </ul>
      <p>
        Revision requests must be made within 14 days of delivery. A revision means
        refining what was agreed. A request that changes the brief — a different design
        direction after sign-off, a new page, a new set of keywords — is new work, and we
        will quote it before doing anything.
      </p>

      <h2>5. What is not refundable</h2>
      <ul>
        <li>
          <strong>Third-party costs already incurred on your behalf</strong> — domain
          registration, premium hosting, paid plugins, stock imagery or licence fees. We
          always tell you before spending anything on your behalf.
        </li>
        <li>
          <strong>Completed and accepted work</strong>, where the deliverable matches the
          published scope.
        </li>
        <li>
          <strong>Search engine results.</strong> We sell defined work, not rankings,
          traffic or revenue. Because we make no promise about outcomes, an outcome you
          hoped for but did not get is not a basis for a refund.
        </li>
        <li>
          <strong>Delays caused by missing information.</strong> Turnaround times start
          when you send your content and access. If a project stalls because we are
          waiting on you, that is not a service failure.
        </li>
      </ul>

      <h2>6. If we cancel</h2>
      <p>
        Occasionally we will decline or end a project — because it turns out to be beyond
        what the package can cover, because the request falls outside what we are willing
        to do, or because we cannot deliver to the standard we promised. In every one of
        those cases you receive a <strong>full refund</strong>, regardless of how much
        work has been done, plus anything we have produced so far.
      </p>

      <h2>7. How to request a refund</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> with your order reference
        from the Stripe receipt and a short note on what went wrong. We reply within one
        business day and aim to resolve every request within five.
      </p>
      <p>
        If you are unhappy with the outcome, please contact us before opening a card
        dispute — a conversation is nearly always faster than a chargeback, and we would
        rather fix the problem than argue about it with a bank.
      </p>

      <h2>8. Custom projects and deposits</h2>
      <p>
        Custom projects are quoted individually and invoiced in two parts — a 50% deposit
        before work begins, and 50% on delivery. Refunds work the same way as for
        packages, measured against the scope in your written quote rather than the
        pricing page:
      </p>
      <ul>
        <li>
          <strong>Before work begins</strong> — the deposit is refunded in full, even
          after it has cleared.
        </li>
        <li>
          <strong>Part-way through</strong> — the deposit is refunded in proportion to the
          work completed, using the same stages as section 2. The delivery invoice is
          cancelled.
        </li>
        <li>
          <strong>On delivery</strong> — if what we deliver does not match the quoted
          scope, we complete it or refund the difference. If it does match, the balance is
          payable and section 4&rsquo;s revision terms apply.
        </li>
        <li>
          <strong>If we cancel</strong> — the deposit is refunded in full regardless of
          work done, and you keep everything produced so far.
        </li>
      </ul>
      <p>
        Revision rounds on custom projects are stated in the quote. Where the quote is
        silent, two rounds are included.
      </p>

      <h2>9. Recurring services</h2>
      <p>
        The optional monthly maintenance add-on can be cancelled at any time, effective at
        the end of the current billing month. There is no minimum term and no cancellation
        fee. Part-months are not pro-rated, because the work is performed across the whole
        month.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy, and the date at the top will change when we do. The
        version that applies to your order is the one published on the day you paid.
        Nothing here affects your statutory rights.
      </p>
    </LegalPage>
  );
}
