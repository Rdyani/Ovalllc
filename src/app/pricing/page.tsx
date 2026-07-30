import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Badge, Button, Section, SectionHeading } from "@/components/ui";
import { addOns, checkoutHref, customProject, packages } from "@/lib/packages";
import { packagesSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — Web Design & SEO Packages from $35",
  description:
    "Fixed-price web design and SEO packages for small businesses. SEO audits $35, on-page setup $60, landing pages $149, 5-page websites $299. No monthly contracts.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | OVAL",
    description:
      "Fixed-price web design and SEO packages from $35. Clear scope, fast turnaround, no monthly contracts.",
    url: "/pricing",
    images: [defaultOgImage],
  },
};

const pricingFaqs = [
  {
    question: "Why is your pricing so much lower than other agencies?",
    answer:
      "Two reasons. First, we sell fixed packages with a defined scope rather than open-ended monthly retainers, so there is no account management overhead built into the price. Second, we are a new, small studio building a client base — we are pricing to earn reviews and referrals rather than to cover an office and a sales team. What you give up is unlimited revisions and a dedicated account manager.",
  },
  {
    question: "Are there any monthly fees or hidden costs?",
    answer:
      "No. Every package is a one-time payment covering everything listed in its scope. The only recurring cost is the optional $25/month maintenance add-on, which you choose separately. Third-party costs such as domain registration and premium hosting are paid by you directly to those providers, and we tell you what to expect before you buy.",
  },
  {
    question: "How do I pay?",
    answer:
      "By card through Stripe, using the buy buttons on this page. Payment is taken up front for packages at these prices — that is standard for fixed-scope digital work and it is what keeps the prices this low. Your card details go straight to Stripe and are never stored by us.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, under the terms of our refund policy. In short: a full refund if you cancel before work starts, a partial refund reflecting work completed if you cancel part-way through, and revisions rather than refunds once the work has been delivered to scope. The full policy is on our refund policy page.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "You receive a Stripe receipt immediately, and we email you within one business day with a short questionnaire covering everything we need from you. Turnaround times start from when you return that questionnaire, not from the payment date — because the work cannot begin until we have your content and access.",
  },
  {
    question: "Do you offer custom quotes for bigger projects?",
    answer:
      "Yes — custom projects start at $350. Tell us what you need and you get a written quote with the scope, price and delivery date on it. Payment is split 50% deposit to start and 50% on delivery, both invoiced through Stripe. If the project is beyond what we should take on, we will say so rather than stretch a package over it.",
  },
  {
    question: "How does paying by invoice work?",
    answer:
      "For custom projects we send a Stripe invoice by email with the agreed scope on it as line items. You pay by card directly from the email — there is no account to create and no portal to log into. You get a receipt immediately and a PDF invoice for your records.",
  },
  {
    question: "Why is custom work split 50/50 instead of paid up front?",
    answer:
      "Custom projects are larger, so asking a new supplier for the full amount before anything exists is a lot to expect. The deposit covers the work we do before delivery, and the balance is only due once you have what you paid for. The refund policy applies at both stages.",
  },
  {
    question: "Do UK customers pay US sales tax?",
    answer:
      "No. Prices are in US dollars and UK customers are not charged US sales tax. Stripe shows you the exact amount your card will be billed, including any currency conversion your bank applies, before you confirm.",
  },
  {
    question: "Can I buy more than one package?",
    answer:
      "Yes, and most people do over time — a website first, then content or local SEO once it is live. If you want to combine several at once, get in touch before paying and we will bundle them at a lower total than buying each separately.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={packagesSchema()} />

      <PageHero
        eyebrow="Pricing"
        title="Fixed-price packages, starting at $35"
        description="Every package below has a defined scope, a stated turnaround and a single price. No monthly retainer, no minimum term, and nothing to cancel."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
        aside={
          <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-400">
              What we never do
            </p>
            <ul className="flex flex-col gap-3 text-[0.9375rem] text-ink-300">
              {[
                "Charge a monthly retainer you have to cancel",
                "Promise rankings, traffic or revenue figures",
                "Add setup or onboarding fees",
                "Lock you into a platform you cannot leave",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Icon name="close" size={15} className="mt-1 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* -------------------------------------------------------------- Packages */}
      <Section tone="subtle">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {packages.map((entry) => (
              <div
                key={entry.slug}
                id={entry.slug}
                className={
                  entry.featured
                    ? "relative flex scroll-mt-28 flex-col gap-6 rounded-3xl bg-ink-950 p-7 text-ink-300 ring-1 ring-ink-950 on-ink"
                    : "flex scroll-mt-28 flex-col gap-6 rounded-3xl bg-white p-7 ring-1 ring-ink-100"
                }
              >
                {entry.featured ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-aurora-400 px-3 py-1 text-xs font-semibold text-ink-950">
                    Best value
                  </span>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg font-semibold">{entry.name}</h2>
                  <p className={entry.featured ? "text-sm text-ink-400" : "text-sm text-ink-500"}>
                    {entry.tagline}
                  </p>
                </div>

                <div>
                  <p
                    className={
                      entry.featured
                        ? "text-4xl font-semibold text-white"
                        : "text-4xl font-semibold text-ink-950"
                    }
                  >
                    ${entry.price}
                  </p>
                  <p
                    className={
                      entry.featured ? "mt-1 text-sm text-ink-400" : "mt-1 text-sm text-ink-500"
                    }
                  >
                    one-time · {entry.turnaroundDays} business days
                  </p>
                </div>

                <p className="text-[0.9375rem] leading-relaxed">{entry.summary}</p>

                <Button
                  href={checkoutHref(entry)}
                  variant={entry.featured ? "onInk" : "secondary"}
                  className="w-full"
                  icon="arrow-right"
                >
                  {entry.paymentLink ? "Buy now" : "Get started"}
                </Button>

                <div
                  className={
                    entry.featured
                      ? "flex flex-col gap-3 border-t border-white/10 pt-6"
                      : "flex flex-col gap-3 border-t border-ink-100 pt-6"
                  }
                >
                  <p
                    className={
                      entry.featured
                        ? "font-mono text-xs uppercase tracking-[0.16em] text-ink-500"
                        : "font-mono text-xs uppercase tracking-[0.16em] text-ink-400"
                    }
                  >
                    What&rsquo;s included
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {entry.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.9375rem]">
                        <span
                          className={
                            entry.featured
                              ? "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-aurora-400/15 text-aurora-400"
                              : "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-aurora-400/15 text-aurora-600"
                          }
                        >
                          <Icon name="check" size={10} strokeWidth={2.6} />
                        </span>
                        <span className={entry.featured ? "text-ink-300" : "text-ink-700"}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={
                    entry.featured
                      ? "mt-auto flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-ink-400"
                      : "mt-auto flex flex-col gap-2 border-t border-ink-100 pt-5 text-sm text-ink-500"
                  }
                >
                  <p>
                    <span className="font-medium">Revisions:</span> {entry.revisions}
                  </p>
                  <p>
                    <span className="font-medium">Best for:</span> {entry.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Fifth card — spans the full grid width because a custom quote needs
              room for the process, and a narrow orphan column looked accidental. */}
          <div
            id={customProject.slug}
            className="mt-6 scroll-mt-28 rounded-3xl bg-white p-7 ring-1 ring-ink-200 md:p-10"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div className="flex flex-col gap-5">
                <Badge tone="brand">Bigger projects</Badge>
                <div>
                  <h2 className="text-2xl font-semibold">{customProject.name}</h2>
                  <p className="mt-1 text-ink-500">{customProject.tagline}</p>
                </div>
                <p>
                  <span className="text-4xl font-semibold text-ink-950">
                    From ${customProject.fromPrice}
                  </span>
                  <span className="mt-1 block text-sm text-ink-500">
                    Quoted per project · {customProject.paymentTerms}
                  </span>
                </p>
                <p className="leading-relaxed text-ink-600">{customProject.summary}</p>
                <Button href="/contact" icon="arrow-right" className="w-fit">
                  Request a quote
                </Button>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
                    Typically
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {customProject.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2.5 text-[0.9375rem]">
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-aurora-400/15 text-aurora-600">
                          <Icon name="check" size={10} strokeWidth={2.6} />
                        </span>
                        <span className="text-ink-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
                    How it works
                  </h3>
                  <ol className="flex flex-col gap-4">
                    {customProject.steps.map((step, index) => (
                      <li key={step.title} className="flex gap-3">
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink-950 font-mono text-[0.6875rem] font-medium text-white">
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-ink-900">
                            {step.title}
                          </span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-ink-600">
                            {step.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-ink-500">
            All prices in {site.currency}. Package turnaround is counted in business days
            from when you send us your content and access, not from the payment date.
          </p>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- Add-ons */}
      <Section>
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Add-ons"
            title="Extras you can add to any package"
            description="Priced individually so you only pay for what you need. Add them when you order, or later."
          />

          <div>
            <ul className="divide-y divide-ink-100 border-y border-ink-100">
              {addOns.map((addOn) => (
                <li key={addOn.name} className="flex items-center justify-between gap-6 py-4">
                  <span className="text-[0.9375rem] text-ink-700">{addOn.name}</span>
                  <span className="shrink-0 font-medium tabular-nums text-ink-950">
                    ${addOn.price}
                    {addOn.name.includes("Monthly") ? (
                      <span className="text-sm font-normal text-ink-400">/mo</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-500">
              Add-ons are quoted and invoiced with your package.{" "}
              <Link href="/contact" className="font-medium text-brand-600">
                Ask for a combined price
              </Link>{" "}
              and it will come in below the sum of the parts.
            </p>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- What's not included */}
      <Section tone="ink">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            tone="dark"
            eyebrow="Being straight with you"
            title="What these prices do not buy."
            description="Low prices come with real limits. Better you know them now than discover them in week two."
          />

          <div className="flex flex-col gap-0">
            {[
              {
                title: "Unlimited revisions",
                body: "Each package includes a set number of revision rounds. Beyond that we quote the extra work rather than absorbing it — that is how the price stays where it is.",
              },
              {
                title: "Ecommerce or custom applications",
                body: "Payments, inventory, bookings and user accounts are considerably more work than a marketing site. We will quote those separately, or tell you we are not the right fit.",
              },
              {
                title: "Guaranteed rankings or traffic",
                body: "Nobody controls Google's index, so we do not sell outcomes. We sell defined work, done properly, and we tell you honestly what it can and cannot achieve.",
              },
              {
                title: "Written content, unless you buy it",
                body: "Packages include polishing the copy you supply. If you want it written from scratch, that is the content writing add-on at $40 per piece.",
              },
              {
                title: "A dedicated account manager",
                body: "You get direct email access to the person doing the work and a reply within one business day. You do not get a project manager, a Slack channel or weekly calls.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="grid gap-3 border-t border-white/10 py-6 md:grid-cols-[16rem_1fr] md:gap-10"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="leading-relaxed text-ink-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- Payment */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Payment & guarantees"
            title="How buying works"
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: "shield" as const,
                title: "Secure card payment",
                body: "Payments are processed by Stripe. Your card details go directly to Stripe and are never seen or stored by us.",
              },
              {
                icon: "clock" as const,
                title: "Clear turnaround",
                body: "Every package states its delivery time in business days. If we are going to miss it, you hear from us before the deadline, not after.",
              },
              {
                icon: "compass" as const,
                title: "A real refund policy",
                body: "Full refund before work starts, partial refund if you cancel mid-way, revisions once delivered. Written down, not improvised.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl bg-paper-subtle p-7 ring-1 ring-ink-100"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-ink-600">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ArrowLink href="/refund-policy">Read the full refund policy</ArrowLink>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- Per-service rates */}
      <Section tone="subtle">
        <div className="container-page">
          <SectionHeading
            eyebrow="By service"
            title="Where each service starts"
            description="Every service maps to one or more of the packages above. Follow a link to see exactly what is involved."
          />

          <div className="mt-12 overflow-x-auto rounded-2xl ring-1 ring-ink-100">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="bg-white">
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink-950">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink-950">
                    From
                  </th>
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink-950">
                    Turnaround
                  </th>
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink-950">
                    Billing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {services.map((service) => (
                  <tr key={service.slug} className="bg-white">
                    <td className="px-6 py-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="font-medium text-ink-900 transition-colors hover:text-brand-600"
                      >
                        {service.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[0.9375rem] tabular-nums text-ink-700">
                      ${service.startingPrice}
                      <span className="text-ink-400"> / {service.priceUnit}</span>
                    </td>
                    <td className="px-6 py-4 text-[0.9375rem] text-ink-600">
                      {service.timeline}
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone="neutral">One-time</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <FaqSection faqs={pricingFaqs} title="Pricing questions" />

      <CtaBand
        eyebrow="Not sure which package?"
        title="Tell us what you need and we'll point you at the right one."
        description="Including when the answer is the $35 audit rather than the $299 website. We would rather you start small and come back than overbuy and regret it."
      />
    </>
  );
}
