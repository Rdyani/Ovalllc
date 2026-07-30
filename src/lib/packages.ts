/**
 * Productized packages.
 *
 * Fixed price, fixed scope, fixed turnaround — the model that works when you
 * are selling at $35–$299 and delivering solo. It is also the easiest model to
 * get approved and keep in good standing with Stripe: every charge maps to one
 * concrete deliverable a reviewer (or a disputing customer) can point at.
 *
 * Deliberately avoided in all copy here: any promise about rankings, traffic
 * volume or revenue. Payment processors treat outcome guarantees in SEO as a
 * chargeback red flag, and they are not promises a new agency can keep.
 *
 * ── Stripe setup ────────────────────────────────────────────────────────────
 * Create one Payment Link per package in the Stripe dashboard, then put the
 * URLs in .env.local (see .env.example). Until they are set, the buy buttons
 * fall back to the contact form, so the site works fine before approval.
 */

export type Package = {
  slug: string;
  name: string;
  /** One-line positioning shown under the name */
  tagline: string;
  price: number;
  /** Business days from receiving your materials */
  turnaroundDays: number;
  /** Highlighted as the recommended tier */
  featured?: boolean;
  summary: string;
  /** Exactly what is delivered — the scope a Stripe dispute would be judged against */
  includes: string[];
  /** What the customer must supply before work starts */
  requires: string[];
  revisions: string;
  idealFor: string;
  /** Stripe Payment Link, or undefined until configured */
  paymentLink?: string;
};

/**
 * Explicit env lookups rather than a dynamic index — Next.js only inlines
 * `process.env.X` when the key is a literal.
 */
const paymentLinks: Record<string, string | undefined> = {
  "seo-audit": process.env.STRIPE_LINK_SEO_AUDIT,
  "on-page-seo": process.env.STRIPE_LINK_ON_PAGE_SEO,
  "landing-page": process.env.STRIPE_LINK_LANDING_PAGE,
  "business-website": process.env.STRIPE_LINK_BUSINESS_WEBSITE,
};

const packageData: Package[] = [
  {
    slug: "seo-audit",
    name: "Website SEO Audit",
    tagline: "Find out exactly what is holding your site back",
    price: 35,
    turnaroundDays: 3,
    summary:
      "A written audit of your website's technical health, on-page optimisation and page speed, with every issue ranked by how much it is costing you. No tools to learn and no jargon — you get a prioritised list you can hand to any developer, or bring back to us to implement.",
    includes: [
      "Full crawl of up to 100 pages, checking indexing, redirects, broken links and duplicate content",
      "On-page review: title tags, meta descriptions, heading structure, image alt text and internal linking",
      "Core Web Vitals and page speed report for mobile and desktop",
      "Mobile usability and basic accessibility check",
      "Structured data (schema markup) review",
      "A prioritised fix list — every issue ranked high / medium / low with the reason",
      "15–20 page PDF report plus a plain-English summary of the top five things to fix first",
    ],
    requires: ["Your website URL", "Read access to Google Search Console (optional, but makes the audit far more useful)"],
    revisions: "One round of follow-up questions answered in writing, free.",
    idealFor:
      "Anyone who suspects their site has problems but does not know what they are, or who wants a second opinion before paying someone for SEO work.",
  },
  {
    slug: "on-page-seo",
    name: "On-Page SEO Setup",
    tagline: "The audit, plus we actually do the work",
    price: 60,
    turnaroundDays: 5,
    featured: true,
    summary:
      "Everything in the audit, and then we implement the fixes on up to 10 pages ourselves. This is the package that takes a site from technically neglected to properly set up for search — done once, correctly, so it keeps working.",
    includes: [
      "Everything in the Website SEO Audit",
      "Keyword research: 30–50 relevant keywords mapped to the right page, with search intent noted",
      "Rewritten title tags and meta descriptions for up to 10 pages",
      "Heading structure corrected (one H1 per page, logical H2/H3 nesting)",
      "Image alt text written for up to 30 images",
      "Internal linking improvements between your key pages",
      "Organisation and LocalBusiness schema markup added",
      "XML sitemap and robots.txt created or corrected",
      "Google Search Console and Google Analytics 4 set up and verified",
      "A short handover note listing every change made",
    ],
    requires: [
      "Admin access to your website or CMS",
      "Access to your domain's DNS if Search Console needs verifying",
    ],
    revisions: "Two rounds of revisions on the written content within 14 days of delivery.",
    idealFor:
      "Small business sites that have never had SEO done properly. This is the best value package for most people and the usual place to start.",
  },
  {
    slug: "landing-page",
    name: "Landing Page Build",
    tagline: "One page, built to turn visitors into enquiries",
    price: 149,
    turnaroundDays: 7,
    summary:
      "A single, fast, mobile-first landing page designed around one action — book a call, request a quote, start a trial. Built on a modern framework, deployed live, and yours to keep. Ideal for a service business, a campaign, or validating an offer before committing to a full site.",
    includes: [
      "Custom one-page design in your brand colours (or we pick a palette if you have none)",
      "Fully responsive across mobile, tablet and desktop",
      "Conversion-focused structure: hero, benefits, social proof, FAQ and clear call to action",
      "Working contact form with email notifications",
      "Copy polishing — you provide the raw text, we tighten it for the web",
      "On-page SEO: title, meta description, headings, alt text and schema markup",
      "Speed optimised — images compressed and converted, Core Web Vitals in the green",
      "Deployed live on your domain, with SSL and hosting setup handled",
      "Google Analytics 4 installed and conversion tracking configured",
    ],
    requires: [
      "Your text content and any images or logo you want used",
      "Domain access (we will walk you through it if you have not done this before)",
    ],
    revisions: "Two rounds of design revisions before launch.",
    idealFor:
      "Service businesses, freelancers and campaigns that need one page that converts rather than a whole website.",
  },
  {
    slug: "business-website",
    name: "5-Page Business Website",
    tagline: "A complete small-business site, SEO-ready from day one",
    price: 299,
    turnaroundDays: 14,
    summary:
      "A full five-page website — typically Home, About, Services, Contact and one more of your choosing — designed, built, optimised for search and launched. Everything from the Landing Page package, applied across the whole site, plus the local search setup that gets a small business found.",
    includes: [
      "Everything in the Landing Page Build, applied across five pages",
      "Custom design system: colour, typography and components used consistently site-wide",
      "Site structure planned around what your customers actually search for",
      "On-page SEO across all five pages, with keyword research included",
      "Google Business Profile created or optimised — categories, services, hours, photos, description",
      "Blog set up and ready to publish, if you want one",
      "Contact form, Google Maps embed and click-to-call on mobile",
      "Search Console, Analytics 4 and sitemap submission",
      "A recorded walkthrough showing you how to update your own content",
    ],
    requires: [
      "Text content for each page, or tell us and we will send a simple questionnaire to draw it out of you",
      "Logo and any photography you want used",
      "Domain access",
    ],
    revisions: "Three rounds of design revisions before launch.",
    idealFor:
      "New businesses and local service companies that need a complete, credible web presence without a four-figure budget.",
  },
];

/** Packages with their Stripe Payment Link resolved from the environment. */
export const packages: Package[] = packageData.map((entry) => ({
  ...entry,
  paymentLink: paymentLinks[entry.slug],
}));

export function getPackage(slug: string): Package | undefined {
  return packages.find((entry) => entry.slug === slug);
}

/**
 * Where the buy button points. Falls back to the contact form so the site is
 * fully usable before Stripe approval comes through.
 */
export function checkoutHref(entry: Package): string {
  return entry.paymentLink ?? `/contact?package=${entry.slug}`;
}

export const cheapestPackage = packages.reduce((lowest, entry) =>
  entry.price < lowest.price ? entry : lowest,
);

/**
 * Custom projects.
 *
 * Anything outside the fixed packages: bigger builds, migrations, multi-location
 * sites, ongoing content. Quoted individually and billed through Stripe
 * Invoicing rather than a Payment Link, so there is no checkout to wire up.
 *
 * The 50/50 split matters for two reasons: it stops us doing weeks of work
 * unpaid, and it is easier for a customer to accept from a new business than
 * paying the whole amount up front. Terms §3.7 and the refund policy both
 * depend on these numbers — change them in all three places or not at all.
 */
export const customProject = {
  slug: "custom-project",
  name: "Custom Project",
  tagline: "For anything the packages do not cover",
  fromPrice: 350,
  summary:
    "Some projects do not fit a fixed scope — a larger site, a migration, several packages combined, or ongoing work. Tell us what you need and you get a written quote with the scope, the price and the delivery date on it. If we are not the right people for it, we will say so rather than take the job.",
  examples: [
    "Websites larger than five pages",
    "Migrating or rebuilding an existing site without losing rankings",
    "Multi-location or multi-language sites",
    "Ongoing content — an agreed number of articles per month",
    "Several packages combined, priced below buying each separately",
    "Technical SEO fixes on a larger or unusual site",
  ],
  steps: [
    {
      title: "Tell us what you need",
      body: "By email or the contact form. Rough is fine — we will ask whatever else we need to price it properly.",
    },
    {
      title: "You get a written quote",
      body: "Scope, fixed price and a delivery date, in writing. Nothing starts until you agree to it.",
    },
    {
      title: "50% deposit invoice",
      body: "Sent through Stripe. Pay by card from the email — no account to create. Work begins once it clears and we have your content.",
    },
    {
      title: "50% on delivery",
      body: "Invoiced when the work is delivered. The same refund policy applies throughout.",
    },
  ],
  paymentTerms: "50% deposit to start, 50% on delivery — both invoiced through Stripe.",
} as const;

/** Optional extras, priced to be added on to any package. */
export const addOns = [
  { name: "Extra page (design + build + SEO)", price: 45 },
  { name: "Blog post, 1,000–1,500 words, SEO-optimised", price: 40 },
  { name: "Logo design, 3 concepts + final files", price: 75 },
  { name: "Google Business Profile setup & optimisation", price: 50 },
  { name: "Monthly site maintenance, updates & backups", price: 25 },
];
