import type { Metadata } from "next";
import Link from "next/link";

import { PostCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Badge, Section, SectionHeading } from "@/components/ui";
import { getTableOfContents, posts, sortedPosts } from "@/lib/posts";
import { absoluteUrl, defaultOgImage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog: SEO & Web Development Insights",
  description:
    "Practical guides on SEO timelines, website costs, Core Web Vitals and digital marketing strategy — written for people who have to justify the budget.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | OVAL",
    description:
      "Practical writing on SEO, web development and digital marketing for US and UK brands.",
    url: "/blog",
    images: [defaultOgImage],
  },
};

/** Blog schema listing every post — helps search engines discover the archive. */
function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: `${site.name} Blog`,
    description:
      "Practical guides on SEO, web development and digital marketing for US and UK brands.",
    url: absoluteUrl("/blog"),
    publisher: { "@id": `${site.url}/#organization` },
    blogPost: sortedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };
}

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts;
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema()).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        eyebrow="Insights"
        title="Practical writing about search, websites and growth"
        description="No thought leadership, no predictions about the future of marketing. Just the questions clients ask us, answered with enough detail to act on."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
        aside={
          <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-400">
              Topics
            </p>
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-ink-300 ring-1 ring-white/10"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section tone="subtle">
        <div className="container-page">
          {/* Featured post */}
          <article className="mb-14 grid gap-8 rounded-3xl bg-white p-8 ring-1 ring-ink-100 md:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Badge tone="brand">{featured.category}</Badge>
                <span className="text-sm text-ink-500">
                  {featured.readingMinutes} min read
                </span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                <Link href={`/blog/${featured.slug}`} className="hover:text-brand-700">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-lg leading-relaxed text-ink-600">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-800"
              >
                Read the guide
              </Link>
            </div>

            <div className="rounded-2xl bg-paper-subtle p-6 ring-1 ring-ink-100">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                What&rsquo;s inside
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {getTableOfContents(featured)
                  .slice(0, 5)
                  .map((heading) => (
                    <li
                      key={heading.id}
                      className="flex gap-2.5 text-[0.9375rem] text-ink-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-400"
                      />
                      {heading.text}
                    </li>
                  ))}
              </ul>
            </div>
          </article>

          <SectionHeading eyebrow="All articles" title="More from the team" />
          <div className="mt-6 grid max-w-4xl gap-5 md:grid-cols-2">
            <p className="leading-relaxed text-ink-600">
              Most writing about SEO and web design exists to make the subject sound
              harder than it is, so that quoting four figures a month feels reasonable.
              These guides do the opposite. They give you the actual numbers — what a
              website costs at each tier and why, how long SEO genuinely takes by activity
              type, which Core Web Vitals fixes are worth engineering time — so you can
              judge any quote you are given, including ours.
            </p>
            <p className="leading-relaxed text-ink-600">
              We publish only when we have something specific to say, which means a handful
              of thorough pieces rather than a weekly post nobody reads. Everything here is
              written by the person who does the work, updated when the advice changes, and
              free of the &ldquo;in today&rsquo;s digital landscape&rdquo; padding that
              makes most agency blogs unreadable. If a guide leaves a question unanswered,{" "}
              <Link href="/contact" className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4">
                email us
              </Link>{" "}
              and we will answer it properly.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Beyond the blog"
        title="Want this applied to your site rather than explained?"
        description="We will audit where you stand today and tell you which of these ideas would actually move your numbers."
      />
    </>
  );
}
