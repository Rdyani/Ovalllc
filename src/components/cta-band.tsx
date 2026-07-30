import { site } from "@/lib/site";
import { Icon } from "./icons";
import { Button, Eyebrow } from "./ui";

/**
 * Closing conversion block. Appears at the bottom of nearly every page —
 * organic visitors land deep in the site, not on the homepage, so every
 * template needs its own exit to a conversion.
 */
export function CtaBand({
  eyebrow = "Start the conversation",
  title = "Tell us what you're trying to grow.",
  description = "Tell us what you need and we will point you at the right package — including when the right answer is the cheapest one. Reply within one business day, no sales call required.",
  primaryLabel = "See packages",
  primaryHref = "/pricing",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 on-ink">
      {/* Aurora wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 size-[36rem] -translate-y-1/2 rounded-full bg-brand-600/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 size-[28rem] rounded-full bg-aurora-500/18 blur-[110px]"
      />

      <div className="container-page relative py-20 md:py-28">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-lg leading-relaxed text-ink-300">{description}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Button href={primaryHref} variant="onInk" size="lg" icon="arrow-right">
                {primaryLabel}
              </Button>
              <Button
                href={`tel:${site.phoneRaw}`}
                size="lg"
                className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15 shadow-none"
              >
                {site.phone}
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-400">
              <li className="inline-flex items-center gap-1.5">
                <Icon name="check" size={14} className="text-aurora-400" />
                One-time payment
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="check" size={14} className="text-aurora-400" />
                US &amp; UK hours
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Icon name="check" size={14} className="text-aurora-400" />
                You own everything
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
