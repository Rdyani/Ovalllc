import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { cn } from "@/lib/cn";
import { JsonLd } from "./json-ld";

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * Pass the full trail including "Home" — the last item renders as plain text.
 */
export function Breadcrumbs({
  crumbs,
  tone = "light",
  className,
}: {
  crumbs: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              // Index-prefixed so a repeated path can never collide as a key.
              // Repeated paths are still a data bug — they produce duplicate
              // URLs in the schema — but they should not break rendering.
              <li key={`${index}-${crumb.path}`} className="flex items-center gap-2">
                {isLast ? (
                  <span
                    aria-current="page"
                    className={tone === "light" ? "text-ink-500" : "text-ink-400"}
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className={cn(
                        "transition-colors",
                        tone === "light"
                          ? "text-ink-500 hover:text-brand-600"
                          : "text-ink-400 hover:text-white",
                      )}
                    >
                      {crumb.name}
                    </Link>
                    <span
                      aria-hidden="true"
                      className={tone === "light" ? "text-ink-300" : "text-ink-600"}
                    >
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
