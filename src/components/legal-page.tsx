import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import type { Crumb } from "@/lib/schema";

/**
 * Shared shell for privacy / terms style pages: narrow measure, generous
 * leading, and heading styles applied via a descendant selector so the page
 * files stay as close to plain prose as possible.
 */
export function LegalPage({
  title,
  updated,
  intro,
  crumbs,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  crumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink-100 bg-paper-subtle">
        <div className="container-page max-w-3xl pb-14 pt-10">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-600">
            Last updated {updated}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{intro}</p>
        </div>
      </header>

      <div className="container-page max-w-3xl py-16">
        <div
          className="
            flex flex-col gap-5 leading-[1.75] text-ink-700
            [&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_a]:decoration-brand-200 [&_a]:underline-offset-4
            [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold
            [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold
            [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1
            [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5
          "
        >
          {children}
        </div>
      </div>
    </>
  );
}
