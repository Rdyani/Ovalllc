/**
 * Central site configuration.
 *
 * Change the values here and they propagate to metadata, JSON-LD schema,
 * the sitemap, the header/footer and every page's copy.
 */

export const site = {
  /** Display brand — used in titles, the wordmark and schema */
  name: "OVAL",
  legalName: "OVAL LLC",
  /** No trailing slash. Used for canonicals, OG tags, sitemap and schema. */
  url: "https://ovalllc.net",
  tagline: "Websites and SEO that compound into revenue",
  description:
    "OVAL is a US-based digital marketing and web development agency. We design high-converting websites and run SEO programs that grow brands across the USA and UK.",
  founded: "2026",
  email: "contant@ovalllc.net",
  /** Display format */
  phone: "+1 680 368 344",
  /** E.164, used in schema.org and tel: links */
  phoneRaw: "+1680368344",
  address: {
    street: "30 N Gould St #34910",
    city: "Sheridan",
    region: "Wyoming",
    /** Two-letter code, used where space is tight */
    regionCode: "WY",
    postalCode: "82801",
    country: "US",
  },
  geo: { latitude: 44.7972, longitude: -106.9562 },
  /** Countries we sell into — drives copy and schema areaServed */
  areaServed: ["US", "GB"],
  currency: "USD",
  locale: "en_US",
  /** Where the team works from — Wyoming is Mountain Time */
  timezone: { label: "Mountain Time", abbreviation: "MT" },
  socials: {
    linkedin: "https://www.linkedin.com/company/ovalllc",
    x: "https://x.com/ovalllc",
    instagram: "https://www.instagram.com/ovalllc",
    dribbble: "https://dribbble.com/ovalllc",
  },
  /** Business hours in schema.org OpeningHoursSpecification shorthand */
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/**
 * Default social share card.
 *
 * Next.js only inherits the root `opengraph-image` file convention when a page
 * does NOT declare its own `openGraph` metadata block. Any page that sets
 * `openGraph` must therefore reference this explicitly, or it ships without an
 * og:image and shares as a bare link.
 */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — affordable web design and SEO for small businesses`,
};

/** Absolute URL helper — every canonical and schema URL goes through this. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
