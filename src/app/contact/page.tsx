import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui";
import { defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Questions About a Package?",
  description:
    "Questions about a package, or something outside them? Email us and get a real answer within one business day. Serving small businesses across the USA and UK.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact OVAL",
    description:
      "Get a straight answer on which package fits — or whether none of them do.",
    url: "/contact",
    images: [defaultOgImage],
  },
};

const contactFaqs = [
  {
    question: "What happens after I send this form?",
    answer:
      "A person reads it — usually within a few hours, always within one business day. If one of our packages fits, we tell you which and send the link to buy it. If your project needs something outside the packages, we send a written quote. If we are not the right fit at all, we say so and point you somewhere better.",
  },
  {
    question: "Do I need to know my budget before contacting you?",
    answer:
      "Not really — every price is already on the pricing page, so you can see before you write to us whether we are in range. If your project falls outside the packages, tell us the constraint and we will quote against it or say plainly that it is beyond what we should take on.",
  },
  {
    question: "Will you sign an NDA?",
    answer:
      "Yes. Send yours over and we will sign it, or ask and we will provide a standard mutual NDA. If your project is unannounced or pre-launch, say so in your first message and we will get the NDA done before you share anything.",
  },
  {
    question: "Do you take on small projects?",
    answer:
      "That is most of what we do. Our smallest package is a $35 website SEO audit and our largest standard package is a $299 five-page website. Anything bigger is quoted as a custom project from $350, invoiced through Stripe as a 50% deposit and 50% on delivery. If it is bigger than we can handle well, we will say so rather than take the money.",
  },
];

const channels = [
  {
    icon: "mail" as const,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    detail: "Best for detailed questions and NDAs",
  },
  {
    icon: "phone" as const,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneRaw}`,
    detail: `Mon–Fri, 9am–6pm ${site.timezone.abbreviation}`,
  },
  {
    icon: "pin" as const,
    label: "Office",
    value: `${site.address.city}, ${site.address.region}`,
    detail: site.address.street,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask us anything before you buy"
        description="Prices and scope are already published, so there is nothing to extract from us on a sales call. Use this if you want to check which package fits, or ask about something the packages do not cover."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        aside={
          <ul className="flex flex-col gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            {channels.map((channel) => (
              <li key={channel.label} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-aurora-400">
                  <Icon name={channel.icon} size={18} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-500">
                    {channel.label}
                  </span>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="font-medium text-white transition-colors hover:text-aurora-400"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <span className="font-medium text-white">{channel.value}</span>
                  )}
                  <span className="text-sm text-ink-400">{channel.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        }
      />

      <Section tone="subtle">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <ContactForm />

          <aside className="flex flex-col gap-8 lg:pt-4">
            <div>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                What to expect
              </h2>
              <ol className="flex flex-col gap-5">
                {[
                  {
                    step: "Within 1 business day",
                    body: "A reply from the person who would do the work, written by hand, not an automated sequence.",
                  },
                  {
                    step: "A straight recommendation",
                    body: "Which package fits, or that none of them do. We will point you at the cheaper one when the cheaper one is right.",
                  },
                  {
                    step: "You buy when you are ready",
                    body: "No call required. Prices and scope are already published — you pay by card and we send the project questionnaire.",
                  },
                  {
                    step: "No chasing",
                    body: "We do not run a follow-up sequence. If the timing is wrong, tell us and we will leave you alone until you come back.",
                  },
                ].map((item, index) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white font-mono text-xs font-medium text-brand-700 ring-1 ring-ink-200">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-ink-900">{item.step}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-600">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-100">
              <h2 className="text-base font-semibold">Working across time zones</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                We are on Mountain Time and hold a daily block for GMT clients, so UK calls
                land in your afternoon rather than your evening.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeading
            eyebrow="Before you write"
            title="What makes an enquiry easy to answer"
            description="You do not need a brief document. But the more of this you include, the more useful our first reply will be."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              {
                title: "The goal",
                body: "What are you actually trying to fix? \"I need more customers\" is a start; \"nobody finds us on Google Maps\" or \"my site looks broken on a phone\" is better.",
              },
              {
                title: "What you've tried",
                body: "A previous designer, a site builder you gave up on, an agency that went quiet. Knowing what already failed stops us repeating it.",
              },
              {
                title: "The constraints",
                body: "A deadline, a platform you have to stay on, content you do not have yet. Constraints shape what is realistic more than ambitions do.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-2xl bg-paper-subtle p-6 ring-1 ring-ink-100"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-ink-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FaqSection faqs={contactFaqs} title="Before you get in touch" />
    </>
  );
}
