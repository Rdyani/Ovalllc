"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { usLocations, ukLocations } from "@/lib/locations";
import { Icon } from "./icons";
import { Logo } from "./logo";
import { Button } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile drawer whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a second render pass with the
  // drawer still open over the new page.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  // Lock body scroll behind the mobile drawer
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-ink-100 bg-white/85 backdrop-blur-lg"
          : "border-transparent bg-white",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {/* Services gets a mega-menu; the rest are plain links */}
          <div className="group relative">
            <Link
              href="/services"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                isActive("/services")
                  ? "text-ink-950"
                  : "text-ink-600 hover:text-ink-950",
              )}
              aria-haspopup="true"
            >
              Services
              <Icon
                name="chevron-down"
                size={14}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </Link>

            <div className="invisible absolute left-1/2 top-full w-[46rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-3xl bg-white p-3 shadow-lift-lg ring-1 ring-ink-100">
                <div className="grid grid-cols-2 gap-1">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-ink-50"
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon name={service.icon as never} size={17} />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-ink-950">
                          {service.name}
                        </span>
                        <span className="text-[0.8125rem] leading-snug text-ink-500">
                          {service.excerpt.split(" ").slice(0, 11).join(" ")}…
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between rounded-2xl bg-ink-50 px-4 py-3">
                  <p className="text-[0.8125rem] text-ink-600">
                    All packages are fixed price, from $35.
                  </p>
                  <Link
                    href="/contact"
                    className="text-[0.8125rem] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    See pricing →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {primaryNav
            .filter((item) => item.href !== "/services")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                  isActive(item.href)
                    ? "text-ink-950"
                    : "text-ink-600 hover:text-ink-950",
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneRaw}`}
            className="text-[0.9375rem] font-medium text-ink-600 transition-colors hover:text-ink-950"
          >
            {site.phone}
          </a>
          <Button href="/pricing" size="sm" icon="arrow-right">
            See packages
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink-800 transition-colors hover:bg-ink-50 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
        >
          <div className="container-page flex flex-col gap-8 py-8">
            <div className="flex flex-col">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Services
              </p>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 border-b border-ink-100 py-3.5 text-ink-800"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={service.icon as never} size={17} />
                  </span>
                  <span className="font-medium">{service.name}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Company
              </p>
              {primaryNav
                .filter((item) => item.href !== "/services")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-ink-100 py-3.5 font-medium text-ink-800"
                  >
                    {item.label}
                  </Link>
                ))}
              <Link
                href="/digital-marketing-agency"
                className="border-b border-ink-100 py-3.5 font-medium text-ink-800"
              >
                Locations
              </Link>
            </div>

            <div className="flex flex-col">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                Where we work
              </p>
              <div className="flex flex-wrap gap-2">
                {[...usLocations, ...ukLocations].map((location) => (
                  <Link
                    key={location.slug}
                    href={`/digital-marketing-agency/${location.slug}`}
                    className="rounded-full bg-ink-50 px-3 py-1.5 text-sm text-ink-600"
                  >
                    {location.city}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-8">
              <Button href="/pricing" size="lg" icon="arrow-right">
                See packages
              </Button>
              <Button href={`tel:${site.phoneRaw}`} variant="secondary" size="lg">
                {site.phone}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
