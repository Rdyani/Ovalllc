import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ArrowLink, Section, SectionHeading, Stat } from "@/components/ui";
import { OvalMark } from "@/components/oval-mark";
import { cheapestPackage, packages } from "@/lib/packages";
import { services } from "@/lib/services";
import { defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — A New Studio, Priced Like One",
  description:
    "OVAL LLC is a new, remote-first US studio building affordable websites and SEO for small businesses in the USA and UK. Fixed prices, defined scope, no retainers.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OVAL",
    description:
      "A new, remote-first US studio building affordable websites and SEO for small businesses across the USA and UK.",
    url: "/about",
    images: [defaultOgImage],
  },
};

const aboutFaqs = [
  {
    question: "How long have you been in business?",
    answer:
      "OVAL LLC is newly registered in Wyoming. We are not going to invent a decade of history — you can see that we are new, and we would rather be judged on what we publish: exact scope, exact prices, exact turnaround times and a written refund policy.",
  },
  {
    question: "How big is the team?",
    answer:
      "Small. Small enough that the person who replies to your email is the person doing the work, which is the main reason we can charge what we charge. You will not be handed over to an account manager, because there isn't one.",
  },
  {
    question: "Why should I hire a new agency?",
    answer:
      "Price and attention, mainly. A new studio charges a fraction of an established one and has a strong incentive to do excellent work, because early clients and reviews are the whole business. The trade-off is a shorter track record — which is exactly why we publish the full scope of every package and back it with a refund policy, rather than asking you to take a track record on trust.",
  },
  {
    question: "What are you not a good fit for?",
    answer:
      "Ecommerce stores with inventory and payments, booking or membership systems, custom web applications, and anyone who needs a large team, a dedicated account manager or weekly strategy calls. We will tell you in the first email rather than stretching a $299 package over something it cannot cover.",
  },
  {
    question: "Where are you based?",
    answer: `${site.legalName} is registered at ${site.address.street}, ${site.address.city}, ${site.address.regionCode} ${site.address.postalCode}, and works remotely. We are on ${site.timezone.label} and keep a daily block for UK clients so calls land in your afternoon rather than your evening.`,
  },
];

const principles = [
  {
    icon: "shield" as const,
    title: "Publish the price",
    body: "Every package price is on the website. If our numbers do not fit your budget you should find that out in ninety seconds on a web page, not after three calls and a proposal.",
  },
  {
    icon: "compass" as const,
    title: "Publish the scope",
    body: "Each package lists exactly what is delivered, down to the page count and the number of revision rounds. That is what you are buying, and what our refund policy is written against.",
  },
  {
    icon: "close" as const,
    title: "Never promise a ranking",
    body: "Nobody controls Google's index. We sell defined work done properly, and we say plainly what it can and cannot achieve. Anyone guaranteeing a position is selling something they do not own.",
  },
  {
    icon: "trending" as const,
    title: "Say when we are wrong for you",
    body: "We turn down work that does not fit. A stretched scope makes for a bad website, an unhappy client and a refund request — nobody wins, so we would rather say no early.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A new studio, priced like one"
        description="OVAL LLC builds websites and does SEO for small businesses that were quoted five figures by an agency and told a drag-and-drop template was the only alternative. There is a lot of room in between, and that is where we work."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        aside={
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <Stat
              tone="dark"
              value={`$${cheapestPackage.price}`}
              label="Lowest package"
              detail="One-time, no retainer"
            />
            <Stat
              tone="dark"
              value={`${packages.length}`}
              label="Fixed packages"
              detail="Full scope published"
            />
            <Stat tone="dark" value="3–14" label="Days to deliver" detail="Stated per package" />
            <Stat tone="dark" value="2" label="Markets" detail="USA and UK" />
          </div>
        }
      />

      {/* ----------------------------------------------------------------- Story */}
      <Section>
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why we exist"
            title="The gap between a $19 template and a $15,000 agency."
          />
          <div className="flex flex-col gap-5 text-lg leading-[1.75] text-ink-700">
            <p>
              If you run a small business and you need a website, you get offered two
              things. One is a drag-and-drop builder — cheap, and you do all the work
              yourself, including the parts you have no reason to know how to do. The
              other is an agency quoting twelve thousand dollars, six weeks of discovery
              workshops and a monthly retainer afterwards.
            </p>
            <p>
              Most small businesses need neither. They need someone competent to build a
              fast, credible site, set up the SEO basics properly, hand over the keys and
              then go away. That is real work, but it is not twelve-thousand-dollars of
              work, and it does not require a retainer.
            </p>
            <p>
              So we sell it the way it should be sold: as a fixed package with a published
              price, a written scope and a delivery date. You know what you are paying,
              what you are getting and when. If we do not deliver what is listed, our{" "}
              <Link
                href="/refund-policy"
                className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4"
              >
                refund policy
              </Link>{" "}
              says exactly what happens next.
            </p>
            <p>
              We are new at this as a company, and we are not going to pretend otherwise
              with invented case studies and a fabricated founding date. What we offer
              instead is complete transparency about the work, prices low enough that your
              risk is small, and the attention you get from someone who genuinely needs the
              first hundred clients to go well.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Principles */}
      <Section tone="ink">
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow="How we operate"
            title="Four rules we do not bend."
            description="Each of these costs us money in the short term. They are also the only reason a new business with no track record deserves your card details."
          />

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="flex flex-col gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-aurora-400/10 text-aurora-400">
                  <Icon name={principle.icon} size={21} />
                </span>
                <h3 className="text-xl font-semibold">{principle.title}</h3>
                <p className="leading-relaxed text-ink-300">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ What we do */}
      <Section>
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="What we actually do"
            title="Five things, done properly."
            description="We stay inside what a small studio can deliver well at these prices. Everything outside that, we say no to."
          />

          <div className="flex flex-col divide-y divide-ink-100 border-y border-ink-100">
            {services.map((service) => (
              <div key={service.slug} className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={service.icon as never} size={19} />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-semibold text-ink-950 transition-colors hover:text-brand-600"
                    >
                      {service.name}
                    </Link>
                    <span className="text-sm font-medium tabular-nums text-ink-500">
                      from ${service.startingPrice}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-600">
                    {service.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- Who we are */}
      <Section tone="subtle">
        <div className="container-page">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <OvalMark size={64} />
            <SectionHeading
              align="center"
              eyebrow="Who you work with"
              title="One small team, no handoffs."
              description="There is no sales department here. The person who answers your first email is the person who audits your site, writes your titles and builds your pages — and the person you come back to if something is wrong. That is the whole arrangement, and it is why replies come within one business day rather than one week."
            />
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <ArrowLink href="/contact">Send us a question</ArrowLink>
              <span aria-hidden="true" className="hidden text-ink-400 sm:inline">
                ·
              </span>
              <ArrowLink href="/pricing">See what it costs</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection faqs={aboutFaqs} title="About the studio" />

      <CtaBand
        title="Think we might be a fit?"
        description="Send us your site and what you are trying to fix. You will get a straight answer on which package suits — or a straight answer that none of them do."
      />
    </>
  );
}
