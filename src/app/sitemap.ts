import type { MetadataRoute } from "next";

import { locations } from "@/lib/locations";
import { posts } from "@/lib/posts";
import { services } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

/**
 * Generated sitemap covering every indexable route.
 *
 * Priorities are relative hints only — Google largely ignores them, but they
 * cost nothing and other crawlers still read them. Anything added to the data
 * files in src/lib appears here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
      { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
      {
        url: absoluteUrl("/digital-marketing-agency"),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      { url: absoluteUrl("/pricing"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
      { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
      { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
      { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
      { url: absoluteUrl("/refund-policy"), changeFrequency: "yearly", priority: 0.3 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((location) => ({
    url: absoluteUrl(`/digital-marketing-agency/${location.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog posts carry their real modified date — this is the one lastModified
  // value crawlers actually act on, so it must not be faked.
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...postRoutes,
  ];
}
