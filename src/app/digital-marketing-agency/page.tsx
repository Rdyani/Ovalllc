import type { Metadata } from "next";

import { LocationCard, ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Section, SectionHeading, Stat } from "@/components/ui";
import { usLocations, ukLocations } from "@/lib/locations";
import { services } from "@/lib/services";
import { defaultOgImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Marketing Agency for US & UK Small Businesses",
  description:
    "A US digital marketing agency serving small businesses across America and the United Kingdom. Websites and SEO at fixed prices from $35, with no monthly contracts.",
  alternates: { canonical: "/digital-marketing-agency" },
  openGraph: {
    title: "Digital Marketing Agency for US & UK Brands | OVAL",
    description:
      "Websites and SEO for small businesses across the United States and United Kingdom, at fixed prices from $35.",
    url: "/digital-marketing-agency",
    images: [defaultOgImage],
  },
};

const hubFaqs = [
  {
    question: "What does a digital marketing agency actually do?",
    answer:
      "A digital marketing agency plans and executes the things that bring customers to your business online — most commonly website design and development, search engine optimisation, local search visibility and content. A good one tells you plainly what it will deliver, what it costs and how long it takes, rather than quoting everything behind a discovery call.",
  },
  {
    question: "How do I choose the right digital marketing agency?",
    answer:
      "Ask three questions. First, what exactly is delivered, in writing, before you pay? Second, who owns the website, the code and the accounts if you walk away? Third, what happens if you are unhappy — is there a written refund policy, or just a conversation? An agency that answers all three clearly is rarer than it should be.",
  },
  {
    question: "Do you need to be local to my city?",
    answer:
      "For almost all digital work, no. What matters is whether whoever does the work understands your market's search behaviour and competition. We research each city and country market specifically rather than applying one template — and doing the work remotely is a large part of why our prices are what they are.",
  },
  {
    question: "Can one agency handle both the US and UK markets?",
    answer:
      "Yes, provided they treat them as two markets rather than one. Search terminology, comparison language and trust signals all differ. We run separate keyword research per market, configure hreflang and geo-targeting correctly, and report performance for each market independently.",
  },
];

export default function LocationsHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="A digital marketing agency built for US and UK brands"
        description="We are a US-registered, remote-first agency working with clients across America and the United Kingdom. Every market gets its own keyword research, its own competitive analysis and its own reporting line."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/digital-marketing-agency" },
        ]}
        aside={
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <Stat tone="dark" value="8" label="Markets covered" detail="Across two countries" />
            <Stat tone="dark" value="$35" label="Lowest package" detail="One-time, no retainer" />
            <Stat tone="dark" value="3–14" label="Days to deliver" detail="Stated per package" />
            <Stat tone="dark" value="5" label="Services" detail="All fixed price" />
          </div>
        }
      />

      {/* ------------------------------------------------------------ US market */}
      <Section tone="subtle">
        <div className="container-page">
          <SectionHeading
            eyebrow="United States"
            title="Where we work across America"
            description="Each page below covers that market's competitive reality — the industries that dominate local search, what the incumbents are doing, and where the gaps are."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {usLocations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ UK market */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="United Kingdom"
            title="Serving UK brands from the United States"
            description="We run UK engagements against google.co.uk rather than assuming US search behaviour transfers — because it does not, and the difference shows up in conversion rate long before it shows up in rankings."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ukLocations.map((location) => (
              <LocationCard key={location.slug} location={location} />
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------- Two-market approach */}
      <Section tone="ink">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            tone="dark"
            eyebrow="Two markets, one team"
            title="Running the US and UK properly means running them separately."
            description="The most common mistake we see in transatlantic SEO is treating both markets as one English-language audience. It quietly halves your performance in the smaller market."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: "search" as const,
                title: "Separate keyword research",
                body: "British and American buyers use different words for the same thing, and search volume distributes differently. We research each index independently.",
              },
              {
                icon: "compass" as const,
                title: "Correct hreflang & geo-targeting",
                body: "Misconfigured hreflang causes the two versions to cannibalise each other. We set it up once, properly, and validate it in Search Console.",
              },
              {
                icon: "pen" as const,
                title: "Localised, not translated",
                body: "Spelling, currency, date formats, and the trust signals each market expects — handled at the content level, not by a find-and-replace.",
              },
              {
                icon: "trending" as const,
                title: "Reported independently",
                body: "You see US and UK performance as separate lines, so you can tell which market is actually returning on the spend.",
              },
            ].map((item) => (
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
      </Section>

      {/* ------------------------------------------------------------- Services */}
      <Section tone="subtle">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we deliver"
              title="The same services, the same prices, everywhere."
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

      <FaqSection faqs={hubFaqs} title="Choosing a digital marketing agency" />

      <CtaBand />
    </>
  );
}
