import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { Eyebrow } from "./ui";
import type { Crumb } from "@/lib/schema";

/**
 * Standard dark hero for interior pages. Carries the H1, the breadcrumb trail
 * (visible + schema) and an optional aside slot for stats or metadata.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 on-ink">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-brand-600/22 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 left-1/4 size-[30rem] rounded-full bg-aurora-500/14 blur-[130px]"
      />

      <div className="container-page relative pb-20 pt-10 md:pb-28 md:pt-14">
        <Breadcrumbs crumbs={crumbs} tone="dark" className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
          <div className="flex max-w-3xl flex-col gap-5">
            {eyebrow ? <Eyebrow tone="dark">{eyebrow}</Eyebrow> : null}
            <h1 className="text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            {description ? (
              <div className="max-w-2xl text-lg leading-relaxed text-ink-300 md:text-xl">
                {description}
              </div>
            ) : null}
            {children}
          </div>

          {aside ? <div className="lg:pb-2">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
