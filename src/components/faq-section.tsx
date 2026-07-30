import type { Faq } from "@/lib/services";
import { faqSchema } from "@/lib/schema";
import { Icon } from "./icons";
import { JsonLd } from "./json-ld";
import { Section, SectionHeading } from "./ui";

/**
 * FAQ accordion built on native <details>/<summary>.
 *
 * No JavaScript, keyboard-accessible for free, and the answer text is in the
 * DOM at load — which matters because search engines and AI answer engines
 * both extract from rendered content, and hidden-by-default JS accordions
 * historically had a worse time of it.
 */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "FAQ",
  description,
  /** Set false when another block on the same page already emits FAQPage schema */
  emitSchema = true,
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  description?: string;
  emitSchema?: boolean;
}) {
  if (faqs.length === 0) return null;

  return (
    <Section tone="subtle">
      {emitSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="divide-y divide-ink-200/80 border-y border-ink-200/80">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <h3 className="text-lg font-medium text-ink-950">{faq.question}</h3>
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-ink-500 ring-1 ring-ink-200 transition-transform duration-200 group-open:rotate-180">
                  <Icon name="chevron-down" size={15} />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-13 leading-relaxed text-ink-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
