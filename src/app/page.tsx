import type { Metadata } from "next";
import Link from "next/link";

import { PostCard, ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import {
  ArrowLink,
  Badge,
  Button,
  CheckList,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";
import { usLocations, ukLocations } from "@/lib/locations";
import { checkoutHref, packages } from "@/lib/packages";
import { sortedPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // The root layout's title template does not apply to this segment, so the
  // brand is written in explicitly here.
  title: "OVAL | Affordable Web Design & SEO from $35",
  description:
    "Fixed-price web design and SEO for small businesses in the USA and UK. SEO audits from $35, websites from $149. Clear scope, fast turnaround, no monthly contracts.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Affordable Web Design & SEO from $35 | OVAL",
    description:
      "Fixed-price websites and SEO for small businesses across the United States and United Kingdom. No retainers, no lock-in.",
    url: site.url,
  },
};

const homeFaqs = [
  {
    question: "What does OVAL do?",
    answer:
      "We build websites and do SEO for small businesses, sold as fixed-price packages rather than monthly retainers. A website SEO audit is $35, on-page SEO setup is $60, a landing page is $149 and a full five-page business website is $299. Everything has a defined scope and a stated turnaround.",
  },
  {
    question: "How can your prices be this low?",
    answer:
      "Because we sell fixed packages instead of open-ended retainers, we are a small independent studio with no office or sales team, and we are deliberately pricing to build a client base and earn reviews. What you give up is unlimited revisions and a dedicated account manager — everything in the published scope is still delivered in full.",
  },
  {
    question: "Are you a new business?",
    answer:
      "Yes. OVAL LLC is a newly registered US company, and we would rather say so than invent a decade of history. What we can show you is exactly what each package includes, what it costs, how long it takes, and a written refund policy — which is more than most established agencies put on their website.",
  },
  {
    question: "Do you work with UK businesses?",
    answer:
      "Yes — the United States and United Kingdom are the two markets we serve. UK sites are researched against google.co.uk rather than assuming American search behaviour transfers, and we write in British English where your audience expects it. Prices are in US dollars and UK customers are not charged US sales tax.",
  },
  {
    question: "Do you guarantee I will rank on Google?",
    answer:
      "No. Nobody controls Google's index, and any agency guaranteeing a ranking is either targeting keywords nobody searches or misleading you. We guarantee the work: everything in the package scope is delivered, or you get your money back under our refund policy.",
  },
  {
    question: "How do I pay, and can I get a refund?",
    answer:
      "By card through Stripe. Payment is taken up front, which is standard for fixed-scope digital work and part of how the prices stay this low. You get a full refund if you cancel before work starts, a partial refund if you cancel part-way through, and revisions if the delivered work needs adjusting. The full policy is on our refund policy page.",
  },
];

const differentiators = [
  {
    icon: "shield" as const,
    title: "You own everything",
    body: "Code, design files, domain, hosting and every account are in your name from day one. No proprietary platform, nothing to license, and leaving costs you nothing.",
  },
  {
    icon: "clock" as const,
    title: "A stated turnaround",
    body: "Three days for an audit, fourteen for a full website. If we are going to miss a deadline you hear it from us before it passes, not after.",
  },
  {
    icon: "compass" as const,
    title: "Scope you can point at",
    body: "Every package lists exactly what is delivered. That is what you are buying, what we are judged against, and what our refund policy is written around.",
  },
  {
    icon: "trending" as const,
    title: "No retainer to cancel",
    body: "One-time payments. Come back when you need something else, or do not. There is no minimum term and no monthly fee waiting to catch you out.",
  },
];

const audiences = [
  "Local service businesses",
  "Trades & contractors",
  "Freelancers & consultants",
  "Restaurants & cafés",
  "Clinics & practitioners",
  "Salons & studios",
  "New ecommerce brands",
  "Startups pre-funding",
];

const processPhases = [
  {
    step: "01",
    title: "Pick a package",
    body: "Prices and scope are on the pricing page. Not sure which fits? Ask — we will point you at the cheaper one when the cheaper one is right.",
  },
  {
    step: "02",
    title: "Send us what we need",
    body: "You get a short questionnaire within one business day. Content, logo, access. Turnaround starts when it comes back.",
  },
  {
    step: "03",
    title: "We build",
    body: "You see the design or draft before anything is finalised, with revision rounds included in the price.",
  },
  {
    step: "04",
    title: "Launch and hand over",
    body: "Everything transfers into your accounts, with a written summary of what was done and a walkthrough of how to update it.",
  },
];

export default function HomePage() {
  const latestPosts = sortedPosts.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-ink-950 on-ink">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-48 size-[42rem] rounded-full bg-brand-600/25 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-64 -left-24 size-[36rem] rounded-full bg-aurora-500/15 blur-[140px]"
        />

        <div className="container-page relative pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="flex flex-col items-start gap-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-1.5 pr-4 text-sm text-ink-200 ring-1 ring-white/10">
                <span className="rounded-full bg-aurora-400/15 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-aurora-400">
                  USA &amp; UK
                </span>
                Fixed prices. No monthly contracts.
              </span>

              <h1 className="text-[2.75rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4rem]">
                A website that works.
                <br />
                <span className="text-aurora">From $35.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-ink-300 md:text-xl">
                Web design and SEO for small businesses, sold as fixed-price packages
                instead of retainers. You see the exact scope, the exact price and the
                exact turnaround before you pay a cent.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button href="/pricing" variant="onInk" size="lg" icon="arrow-right">
                  See packages &amp; prices
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white/10 text-white shadow-none ring-1 ring-inset ring-white/20 hover:bg-white/15"
                >
                  Ask a question
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-400">
                <span className="inline-flex items-center gap-2">
                  <Icon name="check" size={15} className="text-aurora-400" />
                  One-time payment
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="check" size={15} className="text-aurora-400" />
                  You own everything
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="check" size={15} className="text-aurora-400" />
                  Written refund policy
                </span>
              </div>
            </div>

            {/* Package panel — the offer, not invented statistics */}
            <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur-sm">
              <Eyebrow tone="dark">Packages</Eyebrow>
              <ul className="mt-6 flex flex-col divide-y divide-white/10">
                {packages.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/pricing#${entry.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <span className="flex flex-col gap-0.5">
                        <span className="font-medium text-white">{entry.name}</span>
                        <span className="text-sm text-ink-400">
                          {entry.turnaroundDays} business days
                        </span>
                      </span>
                      <span className="shrink-0 text-2xl font-semibold tabular-nums text-aurora-400">
                        ${entry.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-aurora-400 transition-colors hover:text-aurora-300"
              >
                See what&rsquo;s included in each
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Audiences */}
      <section className="border-b border-ink-100 bg-white py-10">
        <div className="container-page flex flex-col items-center gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
            Built for small businesses like these
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {audiences.map((audience) => (
              <li key={audience} className="text-[0.9375rem] font-medium text-ink-500">
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- Services */}
      <Section tone="subtle" id="services">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Five services, all at a fixed price."
              description="Start with one. Most people begin with an audit or a website and add the rest once it is live."
            />
            <ArrowLink href="/services" className="shrink-0 md:mb-2">
              All services
            </ArrowLink>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Packages */}
      <Section>
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Packages"
              title="Pick the one that matches where you are."
              description="Every package below is a one-time payment with a written scope and a stated delivery time. Need something bigger? Custom projects are quoted from $350."
            />
            <ArrowLink href="/pricing" className="shrink-0 md:mb-2">
              Full breakdown
            </ArrowLink>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((entry) => (
              <div
                key={entry.slug}
                className={
                  entry.featured
                    ? "relative flex flex-col gap-5 rounded-2xl bg-ink-950 p-7 text-ink-300 on-ink"
                    : "flex flex-col gap-5 rounded-2xl bg-paper-subtle p-7 ring-1 ring-ink-100"
                }
              >
                {entry.featured ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-aurora-400 px-3 py-1 text-xs font-semibold text-ink-950">
                    Best value
                  </span>
                ) : null}
                <div>
                  <h3 className="text-lg font-semibold">{entry.name}</h3>
                  <p
                    className={
                      entry.featured
                        ? "mt-1 text-sm text-ink-400"
                        : "mt-1 text-sm text-ink-500"
                    }
                  >
                    {entry.tagline}
                  </p>
                </div>
                <p
                  className={
                    entry.featured
                      ? "text-3xl font-semibold text-white"
                      : "text-3xl font-semibold text-ink-950"
                  }
                >
                  ${entry.price}
                  <span
                    className={
                      entry.featured
                        ? "ml-1 text-sm font-normal text-ink-400"
                        : "ml-1 text-sm font-normal text-ink-500"
                    }
                  >
                    one-time
                  </span>
                </p>
                <ul className="flex flex-1 flex-col gap-2">
                  {entry.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-aurora-400/15 text-aurora-600">
                        <Icon name="check" size={10} strokeWidth={2.6} />
                      </span>
                      <span className={entry.featured ? "text-ink-300" : "text-ink-600"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={checkoutHref(entry)}
                  variant={entry.featured ? "onInk" : "secondary"}
                  size="sm"
                  className="w-full"
                >
                  {entry.paymentLink ? "Buy now" : "Get started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- Why us */}
      <Section tone="ink">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="flex flex-col gap-8">
              <SectionHeading
                tone="dark"
                eyebrow="Why work with us"
                title="Small, new, and completely straight with you about it."
                description="We are a new studio, so we compete on price, speed and clarity rather than on a client list we do not have yet. Here is what that actually buys you."
              />
              <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <p className="text-[0.9375rem] leading-relaxed text-ink-300">
                  Not sure whether you need a $35 audit or a $299 website? Send us your
                  site and we will tell you which — including when the honest answer is
                  that you do not need either yet.
                </p>
                <ArrowLink href="/contact" tone="dark">
                  Ask us first
                </ArrowLink>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div key={item.title} className="flex flex-col gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-aurora-400/10 text-aurora-400">
                    <Icon name={item.icon} size={21} />
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="leading-relaxed text-ink-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------------- Process */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Four steps, no discovery-call gauntlet."
            description="You should be able to buy a website the way you buy anything else — knowing the price, the scope and the delivery date up front."
            align="center"
          />

          <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processPhases.map((phase) => (
              <li
                key={phase.step}
                className="flex flex-col gap-4 border-t-2 border-ink-950 pt-6"
              >
                <span className="font-mono text-sm font-medium text-brand-600">
                  {phase.step}
                </span>
                <h3 className="text-xl font-semibold">{phase.title}</h3>
                <p className="leading-relaxed text-ink-600">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* -------------------------------------------------------- Honest limits */}
      <Section tone="subtle">
        <div className="container-page">
          <div className="grid items-center gap-12 rounded-4xl bg-white p-8 ring-1 ring-ink-100 md:p-14 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-6">
              <Badge tone="brand">Before you buy</Badge>
              <h2 className="text-3xl font-semibold leading-[1.12] sm:text-4xl">
                What these prices don&rsquo;t buy.
              </h2>
              <p className="text-lg leading-relaxed text-ink-600">
                Cheap has limits, and you should know them before you pay rather than
                discover them in week two. If what you need sits outside this, tell us and
                we will quote it properly or point you somewhere better suited.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/pricing" icon="arrow-right">
                  See full scope
                </Button>
                <Button href="/refund-policy" variant="secondary">
                  Refund policy
                </Button>
              </div>
            </div>

            <CheckList
              items={[
                "Unlimited revisions — each package includes a set number of rounds",
                "Ecommerce, booking systems or custom applications",
                "Guaranteed rankings, traffic numbers or revenue figures",
                "Copywriting from scratch, unless you add it at $40 per piece",
                "A dedicated account manager, weekly calls or a Slack channel",
              ]}
            />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Locations */}
      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Where we work"
              title="Remote, across two markets."
              description={
                <>
                  {site.legalName} is a US-registered, remote-first studio working with
                  clients across the United States and United Kingdom. Search behaviour
                  differs between the two, so we research each market on its own terms.
                </>
              }
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
                  <Icon name="pin" size={14} /> United States
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {usLocations.map((location) => (
                    <li key={location.slug}>
                      <Link
                        href={`/digital-marketing-agency/${location.slug}`}
                        className="text-[0.9375rem] text-ink-700 transition-colors hover:text-brand-600"
                      >
                        Digital marketing agency for {location.city} businesses
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
                  <Icon name="pin" size={14} /> United Kingdom
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {ukLocations.map((location) => (
                    <li key={location.slug}>
                      <Link
                        href={`/digital-marketing-agency/${location.slug}`}
                        className="text-[0.9375rem] text-ink-700 transition-colors hover:text-brand-600"
                      >
                        Digital marketing agency for {location.city} brands
                      </Link>
                    </li>
                  ))}
                </ul>
                <ArrowLink href="/digital-marketing-agency" className="mt-5">
                  All locations
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Insights */}
      <Section tone="subtle">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Guides"
              title="What things actually cost, and how long they take."
              description="The questions people ask before hiring anyone, answered without the sales pitch."
            />
            <ArrowLink href="/blog" className="shrink-0 md:mb-2">
              Read the blog
            </ArrowLink>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Section>

      <FaqSection
        faqs={homeFaqs}
        title="Questions people ask first"
        description="If yours is not here, email us — you will get a real answer from the person who would do the work."
      />

      <CtaBand />
    </>
  );
}
