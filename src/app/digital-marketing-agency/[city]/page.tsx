import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LocationCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Badge, Button, Section, SectionHeading } from "@/components/ui";
import { getLocation, locations } from "@/lib/locations";
import { checkoutHref, packages } from "@/lib/packages";
import { locationServiceSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { defaultOgImage, site } from "@/lib/site";

export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/digital-marketing-agency/[city]">): Promise<Metadata> {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) return {};

  const path = `/digital-marketing-agency/${location.slug}`;
  return {
    // metaTitle already ends with the brand — see services/[slug] for the why
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: path,
      type: "website",
      images: [defaultOgImage],
    },
  };
}

export default async function LocationPage({
  params,
}: PageProps<"/digital-marketing-agency/[city]">) {
  const { city } = await params;
  const location = getLocation(city);
  if (!location) notFound();

  const isUk = location.country === "GB";
  const others = locations.filter((entry) => entry.slug !== location.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={locationServiceSchema(location)} />

      <PageHero
        eyebrow={`${location.city}, ${location.country === "US" ? location.regionCode : "UK"}`}
        title={
          isUk
            ? `Digital Marketing Agency for ${location.city} Brands`
            : `Digital Marketing Agency for ${location.city} Businesses`
        }
        description={location.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/digital-marketing-agency" },
          { name: location.city, path: `/digital-marketing-agency/${location.slug}` },
        ]}
        aside={
          <div className="flex flex-col gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-400">
              Serving {location.city}
            </p>
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-ink-400">Region</dt>
                <dd className="text-right font-medium text-white">{location.region}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-ink-400">Country</dt>
                <dd className="text-right font-medium text-white">{location.countryName}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-ink-400">Billing</dt>
                <dd className="text-right font-medium text-white">
                  USD{isUk ? " (GBP on request)" : ""}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-ink-400">Meetings</dt>
                <dd className="text-right font-medium text-white">
                  {isUk ? "GMT morning overlap" : "Your business hours"}
                </dd>
              </div>
            </dl>
            <Button href="/pricing" variant="onInk" icon="arrow-right" className="w-full">
              See packages
            </Button>
          </div>
        }
      />

      {/* -------------------------------------------------------- Market context */}
      <Section tone="subtle">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="The market"
              title={`What search looks like in ${location.city}`}
              description={location.marketNote}
            />
            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-100">
              <h3 className="text-base font-semibold">How we would approach this market</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{location.competitiveNote}</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Sectors we focus on in {location.city}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {location.industries.map((industry) => (
                  <li key={industry}>
                    <Badge tone="neutral" className="px-3 py-1.5 text-[0.8125rem]">
                      {industry}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Areas we serve
              </h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {location.nearbyAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2 text-[0.9375rem] text-ink-600"
                  >
                    <Icon name="pin" size={14} className="shrink-0 text-ink-300" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Services */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title={`What we deliver for ${location.city} businesses`}
            description="The same fixed prices and published scopes in every market we serve."
          />

          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-paper-subtle"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={service.icon as never} size={20} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-semibold text-ink-950">
                    {service.name} in {location.city}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink-600">
                    {service.excerpt}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Packages */}
      <Section tone="subtle">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Pricing"
              title={`Packages for ${location.city} businesses`}
              description="Same fixed prices in every market. One-time payment, defined scope, stated turnaround — or a custom quote from $350 for larger projects."
            />
            <ArrowLink href="/pricing" className="shrink-0 md:mb-2">
              Full breakdown
            </ArrowLink>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((entry) => (
              <div
                key={entry.slug}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-ink-100"
              >
                <h3 className="text-lg font-semibold">{entry.name}</h3>
                <p className="text-3xl font-semibold text-ink-950">
                  ${entry.price}
                  <span className="ml-1 text-sm font-normal text-ink-500">one-time</span>
                </p>
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {entry.tagline}. Delivered in {entry.turnaroundDays} business days.
                </p>
                <Button href={checkoutHref(entry)} variant="secondary" size="sm" className="w-full">
                  {entry.paymentLink ? "Buy now" : "Get started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FaqSection
        faqs={location.faqs}
        title={`Working with us in ${location.city}`}
        eyebrow="Local FAQ"
      />

      {/* ---------------------------------------------------------- Other cities */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Other locations"
            title="We work across both markets"
            description={`Not in ${location.city}? We serve brands throughout the United States and United Kingdom.`}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((entry) => (
              <LocationCard key={entry.slug} location={entry} />
            ))}
          </div>
          <ArrowLink href="/digital-marketing-agency" className="mt-8">
            View all locations
          </ArrowLink>
        </div>
      </Section>

      <CtaBand
        eyebrow={`${location.city} enquiries`}
        title={`Let's talk about growing your ${location.city} business.`}
        description={`Tell us what you need and we will point you at the right package. All prices are one-time, in ${site.currency}${isUk ? ", with no US sales tax for UK customers" : ""}.`}
      />
    </>
  );
}
