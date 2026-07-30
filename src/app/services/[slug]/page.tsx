import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Button, CheckList, Section, SectionHeading } from "@/components/ui";
import { checkoutHref, packages } from "@/lib/packages";
import { getRelatedServices, getService, services } from "@/lib/services";
import { serviceSchema } from "@/lib/schema";
import { defaultOgImage } from "@/lib/site";

/** Pre-render every service page at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const path = `/services/${service.slug}`;
  return {
    // `absolute` because metaTitle already carries the brand suffix — without
    // it the root layout's template would append the brand a second time
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      type: "website",
      images: [defaultOgImage],
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      <PageHero
        eyebrow={service.name}
        title={service.h1}
        description={service.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        aside={
          <div className="flex flex-col gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-400">
                Starting at
              </p>
              <p className="mt-2 text-4xl font-semibold text-white">
                ${service.startingPrice.toLocaleString("en-US")}
                <span className="text-lg font-normal text-ink-400">
                  {" "}
                  / {service.priceUnit}
                </span>
              </p>
            </div>
            <dl className="flex flex-col gap-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-400">Typical timeline</dt>
                <dd className="font-medium text-white">{service.timeline}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-400">Markets</dt>
                <dd className="font-medium text-white">USA &amp; UK</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-400">Billing</dt>
                <dd className="font-medium text-white">One-time</dd>
              </div>
            </dl>
            <Button href="/pricing" variant="onInk" icon="arrow-right" className="w-full">
              See packages
            </Button>
          </div>
        }
      />

      {/* ------------------------------------------------------------- Outcomes */}
      <Section tone="subtle">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="What you get"
            title="Outcomes we hold ourselves to"
            description="These are the things included in the package scope, and the things you should hold us to."
          />
          <CheckList items={service.outcomes} className="lg:pt-2" />
        </div>
      </Section>

      {/* --------------------------------------------------------- Deliverables */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Deliverables"
            title={`What's included in ${service.name.toLowerCase()}`}
            description="Every item below is written into the package scope, so you can check exactly what you paid for."
          />

          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((deliverable, index) => (
              <div key={deliverable.title} className="flex flex-col gap-3">
                <span className="font-mono text-sm text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold">{deliverable.title}</h3>
                <p className="leading-relaxed text-ink-600">{deliverable.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------------- Process */}
      <Section tone="ink">
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow="The process"
            title="How the work actually runs"
            description="Four steps, no discovery calls, and you always know what happens next."
          />

          <ol className="mt-14 flex flex-col gap-0">
            {service.process.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-[auto_1fr_2fr] md:gap-10"
              >
                <span className="font-mono text-sm text-aurora-400 md:w-12">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="leading-relaxed text-ink-300">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------------------- Packages */}
      <Section>
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Buy it"
              title="Packages that cover this service"
              description="Fixed price, defined scope, stated turnaround. One-time payment with nothing to cancel — or a custom quote from $350 if your project is larger."
            />
            <ArrowLink href="/pricing" className="shrink-0 md:mb-2">
              Compare all packages
            </ArrowLink>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((entry) => (
              <div
                key={entry.slug}
                className="flex flex-col gap-4 rounded-2xl bg-paper-subtle p-6 ring-1 ring-ink-100"
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
        faqs={service.faqs}
        title={`${service.name}: common questions`}
        description="The questions we get asked most often before an engagement starts."
      />

      {/* ------------------------------------------------------ Related services */}
      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Related services"
            title="What tends to pair well with this"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex flex-col gap-3 rounded-2xl bg-paper-subtle p-7 ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lift"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-100">
                  <Icon name={item.icon as never} size={19} />
                </span>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                  {item.excerpt}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                  Learn more
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title={`Ready to talk about ${service.name.toLowerCase()}?`}
        description="Tell us what you need and we will point you at the right package — or quote it properly if it sits outside them."
      />
    </>
  );
}
