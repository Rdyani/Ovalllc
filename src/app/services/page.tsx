import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Button, Section, SectionHeading } from "@/components/ui";
import { checkoutHref, packages } from "@/lib/packages";
import { services } from "@/lib/services";
import { defaultOgImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design & SEO Services for Small Businesses",
  description:
    "Web design, SEO, local SEO, content writing and logo design for small businesses in the US and UK. Fixed prices from $35, defined scope, no monthly contracts.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | OVAL",
    description:
      "Five services for small businesses, all at a fixed price with a published scope and turnaround.",
    url: "/services",
    images: [defaultOgImage],
  },
};

const hubFaqs = [
  {
    question: "Which service should I start with?",
    answer:
      "If you already have a website, start with the $35 SEO audit — it tells you what is wrong before you spend anything else, and the findings decide what comes next. If you have no website or the one you have is beyond saving, start with the Landing Page Build at $149 or the 5-Page Business Website at $299, both of which include the SEO setup already.",
  },
  {
    question: "Can I combine several services?",
    answer:
      "Yes, and it costs less than buying each separately. Tell us what you want combined before paying and we will quote a single price. The most common combination is a website plus Google Business Profile setup, which is already bundled into the $299 package.",
  },
  {
    question: "Do you offer monthly retainers?",
    answer:
      "No. Everything is a one-time payment with a defined scope. The only recurring option is $25 per month for site maintenance — updates, backups and small content changes — and you can cancel that at any time.",
  },
  {
    question: "What if my project does not fit a package?",
    answer:
      "Tell us what you need and we will quote it. If it is genuinely beyond what a small studio should take on — ecommerce with inventory, a booking system, a custom application — we will say so rather than take the money and struggle.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Usually within one to two business days of payment. You get a short questionnaire immediately, and the stated turnaround starts from when you send it back with your content and access.",
  },
];

const stages = [
  {
    phase: "First",
    icon: "search" as const,
    title: "Find out what is actually wrong",
    body: "Before you spend money on a rebuild, spend $35 finding out whether you need one. Plenty of sites are three fixes away from working, and an audit tells you which three.",
    links: [{ label: "SEO Services", href: "/services/seo-services" }],
  },
  {
    phase: "Then",
    icon: "layout" as const,
    title: "Fix the site, or build a new one",
    body: "Either implement the audit findings on the site you have, or build a fast, credible new one. Both routes include the SEO groundwork rather than selling it back to you later.",
    links: [
      { label: "Web Design & Development", href: "/services/web-design-and-development" },
      { label: "Logo & Brand Design", href: "/services/brand-identity-design" },
    ],
  },
  {
    phase: "After",
    icon: "pin" as const,
    title: "Get found locally, then keep publishing",
    body: "A properly set-up Google Business Profile is the highest-return hour a local business can spend. Content is what keeps the site earning traffic after that.",
    links: [
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Content Writing", href: "/services/content-writing" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything a small business website actually needs"
        description="Five services, each at a fixed price with the full scope published. No retainers, no minimum term, and no quote hidden behind a discovery call."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        aside={
          <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-400">
              Not sure where to start?
            </p>
            <p className="leading-relaxed text-ink-300">
              Send us your website and what you are trying to fix. We will tell you which
              service would help first — including when the answer is that you should not
              spend anything yet.
            </p>
            <ArrowLink href="/contact" tone="dark">
              Ask before you buy
            </ArrowLink>
          </div>
        }
      />

      <Section tone="subtle" aria-labelledby="all-services">
        <div className="container-page">
          {/* The card grid uses h3, so this h2 keeps the outline from jumping
              h1 → h3. Visually redundant after the hero, hence sr-only. */}
          <h2 id="all-services" className="sr-only">
            All services
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- The sequence */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="What order to buy in"
            title="The sequence matters more than the shopping list."
            description="Buying in the wrong order is the most common way a small marketing budget gets wasted. This is what we would recommend, and why."
            align="center"
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {stages.map((stage) => (
              <div
                key={stage.phase}
                className="flex flex-col gap-5 rounded-3xl bg-paper-subtle p-8 ring-1 ring-ink-100"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100">
                  <Icon name={stage.icon} size={21} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                    {stage.phase}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{stage.title}</h3>
                </div>
                <p className="flex-1 leading-relaxed text-ink-600">{stage.body}</p>
                <ul className="flex flex-col gap-2 border-t border-ink-200/70 pt-5">
                  {stage.links.map((link) => (
                    <li key={link.href}>
                      <ArrowLink href={link.href}>{link.label}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Packages */}
      <Section tone="ink">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              tone="dark"
              eyebrow="Packages"
              title="How these services are actually sold."
              description="Each package bundles the work above into a fixed price with a stated turnaround. Anything larger is quoted as a custom project from $350."
            />
            <ArrowLink href="/pricing" tone="dark" className="shrink-0 md:mb-2">
              Full breakdown
            </ArrowLink>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((entry) => (
              <div
                key={entry.slug}
                className="flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
                <p className="text-3xl font-semibold text-aurora-400">
                  ${entry.price}
                  <span className="ml-1 text-sm font-normal text-ink-400">one-time</span>
                </p>
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink-300">
                  {entry.tagline}. Delivered in {entry.turnaroundDays} business days.
                </p>
                <Button
                  href={checkoutHref(entry)}
                  variant="onInk"
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

      <FaqSection faqs={hubFaqs} title="Choosing a service" />

      <CtaBand />
    </>
  );
}
