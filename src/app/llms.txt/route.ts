import { packages, customProject } from "@/lib/packages";
import { usLocations, ukLocations } from "@/lib/locations";
import { sortedPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";

/**
 * /llms.txt — the llmstxt.org format.
 *
 * robots.ts already lets GPTBot, ClaudeBot, PerplexityBot and Google-Extended
 * crawl the site. This is the other half: rather than making a model infer the
 * offer from 14,000px of marketing pages, it states the prices, the scope and
 * the turnaround in one file it can read in a single request.
 *
 * Generated from the same data the pages render from, so it cannot drift out
 * of sync the way a hand-written copy would. Prices in particular are the
 * thing a stale file would get wrong, and a model quoting last month's price
 * to a prospect is worse than no file at all.
 *
 * Format, per the spec: an H1 (the only required section), a blockquote
 * summary, free-form prose, then H2 sections of markdown link lists. The
 * "Optional" H2 has defined meaning — those links may be skipped when a model
 * needs a shorter context — so the low-value pages live there.
 */

export const dynamic = "force-static";

function lines() {
  const cheapest = packages.reduce((low, p) => (p.price < low.price ? p : low));

  return [
    `# ${site.legalName}`,
    "",
    `> ${site.description} Fixed-price packages from $${cheapest.price}, no monthly retainer and no minimum term. Based in ${site.address.city}, ${site.address.region}, working with clients across the United States and United Kingdom.`,
    "",
    `Every package has a published scope, a single price and a stated turnaround in business days. Payment is taken up front by card; the refund policy is written down rather than negotiated. Prices are in ${site.currency}. Contact: ${site.email} / ${site.phone}.`,
    "",
    "## Packages and pricing",
    "",
    ...packages.map(
      (p) =>
        `- [${p.name} — $${p.price}](${absoluteUrl(`/pricing#${p.slug}`)}): ${p.tagline}. Delivered in ${p.turnaroundDays} business days.`,
    ),
    `- [${customProject.name} — from $350](${absoluteUrl("/contact")}): ${customProject.tagline}. Quoted individually, 50% deposit and 50% on delivery.`,
    `- [Full pricing page](${absoluteUrl("/pricing")}): every package, add-on prices and what the prices deliberately do not include.`,
    "",
    "## Services",
    "",
    ...services.map(
      (s) =>
        `- [${s.name} — from $${s.startingPrice}/${s.priceUnit}](${absoluteUrl(`/services/${s.slug}`)}): ${s.excerpt} Typical timeline ${s.timeline}.`,
    ),
    "",
    "## Guides",
    "",
    ...sortedPosts.map(
      (p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`,
    ),
    "",
    "## Locations",
    "",
    ...usLocations.map(
      (l) =>
        `- [Digital marketing agency, ${l.city}, ${l.regionCode}](${absoluteUrl(`/digital-marketing-agency/${l.slug}`)})`,
    ),
    ...ukLocations.map(
      (l) =>
        `- [Digital marketing agency, ${l.city}, United Kingdom](${absoluteUrl(`/digital-marketing-agency/${l.slug}`)})`,
    ),
    "",
    "## Company and terms",
    "",
    `- [About](${absoluteUrl("/about")}): who does the work and how the studio is run.`,
    `- [Contact](${absoluteUrl("/contact")}): enquiry form, ${site.email}, ${site.phone}.`,
    `- [Refund and cancellation policy](${absoluteUrl("/refund-policy")}): full refund before work starts, partial refund part-way through, revisions once delivered.`,
    `- [Terms of service](${absoluteUrl("/terms")})`,
    `- [Privacy policy](${absoluteUrl("/privacy")}): what is collected, and the sub-processors used.`,
    "",
    "## Optional",
    "",
    `- [Services overview](${absoluteUrl("/services")}): hub page; the individual service pages above carry the detail.`,
    `- [Locations overview](${absoluteUrl("/digital-marketing-agency")})`,
    `- [Blog index](${absoluteUrl("/blog")})`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ];
}

export function GET() {
  return new Response(lines().join("\n"), {
    headers: {
      // text/markdown is what the format is; the charset stops it being
      // sniffed as something else by clients that guess.
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, must-revalidate",
    },
  });
}
