import Link from "next/link";
import type { Metadata } from "next";

import { Icon } from "@/components/icons";
import { Button } from "@/components/ui";
import { sortedPosts } from "@/lib/posts";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink-950 on-ink">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-[32rem] rounded-full bg-brand-600/22 blur-[130px]"
      />

      <div className="container-page relative py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-aurora-400">
              Error 404
            </span>
            <h1 className="text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
              That page has gone north without us.
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-ink-300">
              The URL you followed does not exist — it may have moved, or the link that
              sent you here may be out of date. Everything below still works.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/" variant="onInk" size="lg" icon="arrow-right">
                Back to the homepage
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-white/10 text-white shadow-none ring-1 ring-inset ring-white/20 hover:bg-white/15"
              >
                Contact us
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Services
              </h2>
              <ul className="flex flex-col gap-2.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-[0.9375rem] text-ink-300 transition-colors hover:text-white"
                    >
                      <Icon name="arrow-right" size={14} className="text-ink-600" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Popular reading
              </h2>
              <ul className="flex flex-col gap-2.5">
                {sortedPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-start gap-2 text-[0.9375rem] leading-snug text-ink-300 transition-colors hover:text-white"
                    >
                      <Icon
                        name="arrow-right"
                        size={14}
                        className="mt-1 shrink-0 text-ink-600"
                      />
                      {post.title.split(":")[0].split("?")[0]}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/digital-marketing-agency"
                className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-aurora-400 transition-colors hover:text-aurora-300"
              >
                Browse locations
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
