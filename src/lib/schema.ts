/**
 * JSON-LD structured data builders.
 *
 * Search engines and AI answer engines both lean on this markup to understand
 * what the page is and who published it. Every builder returns a plain object
 * that gets serialised by the <JsonLd> component.
 *
 * Validate changes at https://validator.schema.org and in Search Console's
 * rich results report.
 */

import { absoluteUrl, site } from "./site";
import type { Service, Faq } from "./services";
import type { Location } from "./locations";
import type { Post } from "./posts";
import { packages } from "./packages";

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phoneRaw,
    foundingDate: site.founded,
    priceRange: "$",
    image: absoluteUrl("/opengraph-image"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areaServed.map((code) => ({
      "@type": "Country",
      name: code === "US" ? "United States" : "United Kingdom",
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...site.hours.days],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    sameAs: Object.values(site.socials),
    knowsAbout: [
      "Search engine optimization",
      "Web design",
      "Web development",
      "Local SEO",
      "Google Business Profile optimization",
      "Content writing",
      "Logo and brand identity design",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.name,
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((code) => ({
      "@type": "Country",
      name: code === "US" ? "United States" : "United Kingdom",
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: service.startingPrice,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: site.currency,
        minPrice: service.startingPrice,
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/services/${service.slug}`),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((deliverable) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliverable.title,
          description: deliverable.body,
        },
      })),
    },
  };
}

/**
 * The pricing page's package list.
 *
 * Modelled as an OfferCatalog of Offers rather than Products — these are
 * services with a fixed price, and misdeclaring them as Products is the kind
 * of thing that gets flagged in Search Console's rich results report.
 */
export function packagesSchema() {
  const url = absoluteUrl("/pricing");
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${url}#packages`,
    name: `${site.name} web design and SEO packages`,
    url,
    provider: { "@id": ORG_ID },
    itemListElement: packages.map((entry, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: entry.name,
      description: entry.summary,
      price: entry.price,
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
      url: `${url}#${entry.slug}`,
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        value: entry.turnaroundDays,
        unitCode: "DAY",
      },
      itemOffered: {
        "@type": "Service",
        name: entry.name,
        description: entry.summary,
        serviceType: entry.name,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

export function locationServiceSchema(location: Location) {
  const url = absoluteUrl(`/digital-marketing-agency/${location.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Digital Marketing Agency in ${location.city}`,
    description: location.metaDescription,
    url,
    serviceType: "Digital marketing agency",
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: location.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.region,
      },
    },
    audience: {
      "@type": "BusinessAudience",
      name: `Businesses in ${location.city}, ${location.region}`,
    },
  };
}

export function articleSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount: estimateWordCount(post),
    articleSection: post.category,
    inLanguage: "en-US",
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    // Published under the company name — no invented personal bylines
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

function estimateWordCount(post: Post): number {
  return post.blocks.reduce((total, block) => {
    if ("text" in block && typeof block.text === "string") {
      return total + block.text.split(/\s+/).length;
    }
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.type === "table") {
      return total + block.rows.flat().join(" ").split(/\s+/).length;
    }
    return total;
  }, 0);
}
