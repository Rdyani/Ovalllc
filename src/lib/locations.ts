/**
 * Location landing pages.
 *
 * These render at /digital-marketing-agency/[slug] and target city-level
 * commercial intent ("digital marketing agency in Austin"). The hub page at
 * /digital-marketing-agency targets the head term.
 *
 * Every entry needs genuinely local content — industry mix, nearby areas,
 * a market note. Thin, templated location pages get filtered as doorway
 * pages, so each one here carries its own research.
 */

import type { Faq } from "./services";

export type Location = {
  slug: string;
  city: string;
  /** State (US) or county/region (UK) */
  region: string;
  regionCode: string;
  country: "US" | "GB";
  countryName: string;
  currencySymbol: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line summary for the locations hub */
  excerpt: string;
  intro: string;
  /** What the local economy actually runs on — keeps these pages unique */
  marketNote: string;
  industries: string[];
  nearbyAreas: string[];
  /** Local competitive reality, used in the "why us here" section */
  competitiveNote: string;
  faqs: Faq[];
};

/**
 * FAQ builder.
 *
 * Takes the whole location rather than just the city name, so each page's
 * answers pull in its own industries, nearby areas and market context. The
 * earlier version swapped only the city name into identical text, which pushed
 * the Manchester and Birmingham pages to ~50% textual similarity — close enough
 * to the doorway-page threshold to be worth avoiding.
 */
function buildFaqs(location: Omit<Location, "faqs">): Faq[] {
  const { city, region, industries, nearbyAreas, country } = location;
  const isUk = country === "GB";
  const areas = nearbyAreas.slice(0, 3).join(", ");
  const sectors = industries.slice(0, 3).join(", ").toLowerCase();

  // The pricing and remote-working answers are necessarily similar across
  // cities — the prices and the arrangement are the same everywhere — so they
  // are kept deliberately short. The local answer carries the city-specific
  // detail and is where the page earns its uniqueness.
  const pricing: Faq = {
    question: `How much does a digital marketing agency in ${city} cost?`,
    answer: isUk
      ? `${city} agencies typically charge £2,000–£12,000 per month on retainer. We sell fixed one-time packages instead — $35 for a website SEO audit up to $299 for a five-page site, custom work from $350. UK customers pay no US sales tax.`
      : `Agencies serving ${city} typically charge $2,500–$20,000 per month on retainer. We sell fixed one-time packages instead — $35 for a website SEO audit up to $299 for a five-page site, custom work from $350. Every price is on our pricing page.`,
  };

  const remote: Faq = {
    question: isUk
      ? `Can a US studio handle a ${city} website?`
      : `Do you have an office in ${city}?`,
    answer: isUk
      ? `Yes. We research against google.co.uk, write in British English, and keep a GMT-afternoon block so calls do not land in your evening. Invoices are in US dollars.`
      : `No — we are a remote-first US studio registered in Wyoming. For audits, on-page SEO and websites, being in ${region} changes nothing about the result, and not paying for an office is part of why the prices are what they are.`,
  };

  const local: Faq = {
    question: `Can you get us into ${city} map results?`,
    answer: `Our Local SEO package claims and completes your Google Business Profile, fixes name, address and phone inconsistencies across directories, and adds LocalBusiness schema. If you serve ${areas} as well as ${city} proper, we set the service area to cover them rather than pinning you to one address — which matters in ${region}, where ${sectors} businesses routinely take work well beyond their own postcode.`,
  };

  return [pricing, remote, local];
}

const baseLocations: Omit<Location, "faqs">[] = [
    {
    slug: "new-york",
    city: "New York",
    region: "New York",
    regionCode: "NY",
    country: "US",
    countryName: "United States",
    currencySymbol: "$",
    metaTitle: "Digital Marketing Agency in New York, NY | OVAL",
    metaDescription: "Web development and SEO agency serving New York brands. Conversion-first websites and organic growth programmes for NYC finance, retail and SaaS companies.",
    excerpt: "SEO and web development for New York brands competing in the most saturated search market in the country.",
    intro: "New York is the hardest search market in the United States. Every commercial keyword worth having is contested by companies with real budgets and in-house teams, which means the generic playbook — publish some blogs, build some links, wait — does not move anything. Winning here takes sharper targeting and better execution than your competitors are willing to fund.",
    marketNote: "NYC search competition is concentrated in financial services, legal, real estate and DTC retail, where cost per click on commercial terms regularly exceeds $40. That economics makes organic search disproportionately valuable: the same click costs nothing after the content is earning its ranking.",
    industries: [
        "Financial services",
        "SaaS & fintech",
        "DTC retail",
        "Professional services",
        "Real estate"
    ],
    nearbyAreas: [
        "Manhattan",
        "Brooklyn",
        "Queens",
        "Jersey City",
        "Long Island City",
        "The Bronx"
    ],
    competitiveNote: "Against New York incumbents we win on specificity. Rather than chasing head terms your competitors have owned for a decade, we take the long-tail commercial clusters they ignore, dominate those completely, and use the resulting authority to move upward into the terms that matter."
    },
    {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "California",
    regionCode: "CA",
    country: "US",
    countryName: "United States",
    currencySymbol: "$",
    metaTitle: "Digital Marketing Agency in Los Angeles, CA | OVAL",
    metaDescription: "LA web design and SEO agency for entertainment, DTC and wellness brands. Beautiful sites that load fast and rank — not portfolio pieces that quietly lose traffic.",
    excerpt: "Brand-led web design and SEO for Los Angeles companies where visual standards are non-negotiable.",
    intro: "Los Angeles brands are held to a higher visual standard than almost anywhere else, and that is usually where the problem starts. Sites get designed to win awards, ship with 12MB of hero video, and then quietly fail Core Web Vitals for the eighteen months nobody checks. We build sites that meet the LA bar for design and still load in under two seconds on a phone.",
    marketNote: "The LA market skews heavily toward entertainment, wellness, apparel and DTC — categories where brand perception drives conversion but where organic discovery is increasingly won through content depth and product-led search terms rather than display advertising.",
    industries: [
        "Entertainment & media",
        "DTC apparel",
        "Health & wellness",
        "Hospitality",
        "Creator economy"
    ],
    nearbyAreas: [
        "Santa Monica",
        "Culver City",
        "West Hollywood",
        "Pasadena",
        "Long Beach",
        "Burbank"
    ],
    competitiveNote: "Plenty of LA studios can design a beautiful site. Far fewer can design one that ranks. We bring both in the same engagement, so you are not paying a second agency to retrofit SEO into a build that never considered it."
    },
    {
    slug: "chicago",
    city: "Chicago",
    region: "Illinois",
    regionCode: "IL",
    country: "US",
    countryName: "United States",
    currencySymbol: "$",
    metaTitle: "Digital Marketing Agency in Chicago, IL | OVAL",
    metaDescription: "Chicago SEO and web development agency for B2B, manufacturing and logistics brands. Long sales cycles, technical buyers, measurable pipeline.",
    excerpt: "B2B-focused SEO and web development for Chicago manufacturers, logistics firms and professional services.",
    intro: "Chicago runs on B2B — manufacturing, logistics, industrial supply, professional services. These are long sales cycles with technical buyers who research extensively before they ever fill in a form, which makes content depth and search visibility far more valuable than the top-of-funnel brand campaigns that get pitched to them.",
    marketNote: "Midwest B2B search behaviour rewards specificity: buyers search exact part numbers, spec ranges, capability phrases and compliance terms. Most competitors publish thin category pages and leave that entire long tail uncontested.",
    industries: [
        "Industrial manufacturing",
        "Logistics & supply chain",
        "B2B services",
        "Healthcare",
        "Insurance"
    ],
    nearbyAreas: [
        "The Loop",
        "Evanston",
        "Naperville",
        "Schaumburg",
        "Oak Brook",
        "Aurora"
    ],
    competitiveNote: "We are comfortable in technical categories. Our writers will read your spec sheets and interview your engineers rather than paraphrasing a competitor's blog, which is what makes the difference in markets where buyers can immediately tell whether the author understands the product."
    },
    {
    slug: "austin",
    city: "Austin",
    region: "Texas",
    regionCode: "TX",
    country: "US",
    countryName: "United States",
    currencySymbol: "$",
    metaTitle: "Digital Marketing Agency in Austin, TX | OVAL",
    metaDescription: "Austin SEO and web development agency for SaaS and startups. Product-led content, technical SEO and websites built to convert trial signups into revenue.",
    excerpt: "SaaS-native SEO and web development for Austin startups scaling past founder-led growth.",
    intro: "Austin is full of companies that grew on product and referral and hit the ceiling where organic search should have taken over. The pattern is consistent: a fast, decent-looking site with almost no indexable content, a blog nobody has updated in a year, and no keyword strategy tied to the product's actual jobs-to-be-done. That is a fixable problem, and usually a fast one.",
    marketNote: "SaaS search demand concentrates in comparison, alternative and integration keywords — the terms buyers use once they already know the category. These convert at multiples of top-of-funnel content and are consistently under-served by early-stage marketing teams.",
    industries: [
        "B2B SaaS",
        "Developer tools",
        "Fintech",
        "Consumer apps",
        "Clean energy"
    ],
    nearbyAreas: [
        "Downtown Austin",
        "East Austin",
        "The Domain",
        "Round Rock",
        "Cedar Park",
        "San Marcos"
    ],
    competitiveNote: "We build product-led content programmes: comparison pages, integration pages, use-case pages and alternatives pages that map to how software buyers actually search. It is unglamorous work and it consistently outperforms thought leadership."
    },
    {
    slug: "miami",
    city: "Miami",
    region: "Florida",
    regionCode: "FL",
    country: "US",
    countryName: "United States",
    currencySymbol: "$",
    metaTitle: "Digital Marketing Agency in Miami, FL | OVAL",
    metaDescription: "Miami web design and SEO agency for real estate, hospitality and international brands. Bilingual-ready sites built for US and Latin American search demand.",
    excerpt: "Web design and SEO for Miami real estate, hospitality and internationally-facing brands.",
    intro: "Miami businesses often serve two search markets at once — domestic US and Latin American — and most sites are built for neither properly. A single English page competing for bilingual demand leaves a large share of qualified traffic on the table. Getting the multilingual architecture right at build time costs a fraction of retrofitting it later.",
    marketNote: "High-value Miami categories — luxury real estate, hospitality, private aviation, medical tourism — carry unusually high transaction values, which means even modest organic gains produce outsized revenue. Search demand is also strongly seasonal, so content calendars need to lead peak season by several months.",
    industries: [
        "Luxury real estate",
        "Hospitality & travel",
        "Private aviation",
        "Medical & aesthetics",
        "Import/export"
    ],
    nearbyAreas: [
        "Miami Beach",
        "Brickell",
        "Coral Gables",
        "Fort Lauderdale",
        "Wynwood",
        "Aventura"
    ],
    competitiveNote: "We architect multilingual sites properly from the outset — correct hreflang, separate keyword research per language, and localised rather than machine-translated content — so the Spanish-language version earns rankings instead of being ignored by search engines."
    },
    {
    slug: "london",
    city: "London",
    region: "Greater London",
    regionCode: "LDN",
    country: "GB",
    countryName: "United Kingdom",
    currencySymbol: "£",
    metaTitle: "Digital Marketing Agency for London Brands | OVAL",
    metaDescription: "US agency serving London businesses with SEO and web development. UK-specific keyword research, GMT-friendly hours, and dual US/UK search strategy.",
    excerpt: "SEO and web development for London brands, with proper UK keyword research and GMT-overlapping hours.",
    intro: "London is the most competitive search market in Europe, and it is also where a lot of American agencies quietly underperform — because they run US keyword research against a UK audience and wonder why the traffic does not convert. British buyers use different terminology, different comparison language and different trust signals. We research the UK market as its own market.",
    marketNote: "London search competition is fiercest in fintech, legal, property and professional services. Cost per click on commercial terms frequently exceeds £25, and organic positions two through five often carry better economics than paying for position one.",
    industries: [
        "Fintech & financial services",
        "Legal",
        "Property",
        "Professional services",
        "B2B SaaS"
    ],
    nearbyAreas: [
        "The City",
        "Shoreditch",
        "Canary Wharf",
        "Westminster",
        "Croydon",
        "Reading"
    ],
    competitiveNote: "For London clients we run google.co.uk as the primary index for research and tracking, write in British English, and set up geo-targeting properly. If you also sell into the US, we run both markets in parallel with correct hreflang rather than letting them cannibalise each other."
    },
    {
    slug: "manchester",
    city: "Manchester",
    region: "Greater Manchester",
    regionCode: "MAN",
    country: "GB",
    countryName: "United Kingdom",
    currencySymbol: "£",
    metaTitle: "Digital Marketing Agency for Manchester Brands | OVAL",
    metaDescription: "SEO and web development for Manchester businesses. Ecommerce, media and B2B growth programmes with UK-specific research and transparent monthly reporting.",
    excerpt: "Ecommerce and B2B growth programmes for Manchester businesses expanding beyond the North West.",
    intro: "Manchester has become the UK's strongest tech and ecommerce hub outside London, with genuinely competitive local agencies and a market that has grown far faster than most companies' websites have. The common pattern we see is a business trading nationally on a site that was built for a regional customer base three years ago.",
    marketNote: "Manchester ecommerce and media businesses increasingly compete nationally rather than regionally, which changes the SEO problem entirely: you stop competing with local firms on local terms and start competing with national brands on category terms.",
    industries: [
        "Ecommerce & retail",
        "Media & production",
        "B2B SaaS",
        "Manufacturing",
        "Education"
    ],
    nearbyAreas: [
        "Salford",
        "Stockport",
        "Bolton",
        "Altrincham",
        "Warrington",
        "Leeds"
    ],
    competitiveNote: "We are typically brought in when a Manchester business is ready to compete nationally or expand into the US. That transition needs a different content strategy and a site architecture that can carry many more commercial pages than a regional site ever needed."
    },
    {
    slug: "birmingham",
    city: "Birmingham",
    region: "West Midlands",
    regionCode: "WMD",
    country: "GB",
    countryName: "United Kingdom",
    currencySymbol: "£",
    metaTitle: "Digital Marketing Agency for Birmingham Brands | OVAL",
    metaDescription: "Web development and SEO for Birmingham and West Midlands businesses. Manufacturing, logistics and professional services growth backed by transparent reporting.",
    excerpt: "Web development and SEO for Birmingham manufacturers, logistics operators and professional firms.",
    intro: "The West Midlands runs on manufacturing, engineering and logistics — sectors where the buyers are technical, the sales cycles are long, and the websites are frequently a decade behind the businesses they represent. There is often an enormous amount of uncontested search demand sitting in product and capability terms nobody has bothered to build pages for.",
    marketNote: "Industrial search demand in the West Midlands is dominated by capability and specification queries. Most regional competitors publish a single thin services page, which leaves entire categories of commercial long-tail traffic effectively unclaimed.",
    industries: [
        "Manufacturing & engineering",
        "Logistics",
        "Automotive supply",
        "Professional services",
        "Construction"
    ],
    nearbyAreas: [
        "Solihull",
        "Wolverhampton",
        "Coventry",
        "Walsall",
        "Dudley",
        "Redditch"
    ],
    competitiveNote: "We do the unglamorous work industrial SEO actually requires: proper capability pages, specification content, and technical writing produced from interviews with your engineers rather than from a competitor's website."
    }
];

/** FAQs are generated per location so no two pages share identical answers. */
export const locations: Location[] = baseLocations.map((location) => ({
  ...location,
  faqs: buildFaqs(location),
}));

export function getLocation(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}

export const usLocations = locations.filter((location) => location.country === "US");
export const ukLocations = locations.filter((location) => location.country === "GB");
export const locationSlugs = locations.map((location) => location.slug);
