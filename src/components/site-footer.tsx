import Link from "next/link";
import { services } from "@/lib/services";
import { usLocations, ukLocations } from "@/lib/locations";
import { sortedPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { Icon, type IconName } from "./icons";
import { CookieSettingsButton } from "./cookie-consent";
import { Logo } from "./logo";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Packages & pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: "linkedin" },
  { label: "X", href: site.socials.x, icon: "x" },
  { label: "Instagram", href: site.socials.instagram, icon: "instagram" },
  { label: "Dribbble", href: site.socials.dribbble, icon: "dribbble" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-paper-subtle">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-[0.9375rem] leading-relaxed text-ink-600">
              A digital marketing and web development agency building websites and
              organic growth programmes for brands in the United States and the
              United Kingdom.
            </p>
            <div className="flex flex-col gap-2 text-[0.9375rem]">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-ink-700 transition-colors hover:text-brand-600"
              >
                <Icon name="mail" size={16} className="text-ink-400" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneRaw}`}
                className="inline-flex items-center gap-2 text-ink-700 transition-colors hover:text-brand-600"
              >
                <Icon name="phone" size={16} className="text-ink-400" />
                {site.phone}
              </a>
              <p className="inline-flex items-start gap-2 text-ink-600">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-ink-400" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.regionCode} {site.address.postalCode}
                </span>
              </p>
            </div>
          </div>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services/${service.slug}`}>
                {service.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Latest writing">
            {sortedPosts.slice(0, 3).map((post) => (
              <FooterLink key={post.slug} href={`/blog/${post.slug}`}>
                {post.title.split(":")[0].split("?")[0]}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* Location links kept in the footer for internal linking depth */}
        <div className="mt-14 grid gap-8 border-t border-ink-200/70 pt-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
              United States
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {usLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/digital-marketing-agency/${location.slug}`}
                    className="text-sm text-ink-600 transition-colors hover:text-brand-600"
                  >
                    {location.city}, {location.regionCode}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
              United Kingdom
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {ukLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/digital-marketing-agency/${location.slug}`}
                    className="text-sm text-ink-600 transition-colors hover:text-brand-600"
                  >
                    {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-ink-200/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 text-sm text-ink-500">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p className="flex flex-wrap gap-x-4">
              <Link href="/privacy" className="transition-colors hover:text-ink-800">
                Privacy policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-ink-800">
                Terms of service
              </Link>
              <Link href="/refund-policy" className="transition-colors hover:text-ink-800">
                Refunds
              </Link>
              <CookieSettingsButton className="text-left transition-colors hover:text-ink-800" />
              <Link href="/sitemap.xml" className="transition-colors hover:text-ink-800">
                Sitemap
              </Link>
            </p>
          </div>

          <ul className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${social.label}`}
                  className="flex size-10 items-center justify-center rounded-full bg-white text-ink-500 ring-1 ring-ink-200 transition-colors hover:text-brand-600 hover:ring-brand-200"
                >
                  <Icon name={social.icon} size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.9375rem] text-ink-600 transition-colors hover:text-brand-600"
      >
        {children}
      </Link>
    </li>
  );
}
