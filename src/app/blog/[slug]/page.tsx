import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard, formatDate } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { FaqSection } from "@/components/faq-section";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PostBody } from "@/components/post-body";
import { ArrowLink, Badge, Section, SectionHeading } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { OvalMark } from "@/components/oval-mark";
import { cheapestPackage } from "@/lib/packages";
import { getPost, getRelatedPosts, getTableOfContents, posts } from "@/lib/posts";
import { articleSchema } from "@/lib/schema";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: path },
    authors: [{ name: site.legalName }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: path,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [site.legalName],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = getTableOfContents(post);
  const related = getRelatedPosts(post);
  const wasUpdated = post.updatedAt !== post.publishedAt;

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      {/* ---------------------------------------------------------------- Header */}
      <header className="border-b border-ink-100 bg-paper-subtle">
        <div className="container-page max-w-4xl pb-14 pt-10">
          <Breadcrumbs
            // The final crumb is the post itself. It previously repeated
            // "/blog" for the category, which collided as a React key and put
            // two identical URLs into the BreadcrumbList schema. The category
            // is already shown as a badge below, so nothing is lost.
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
            className="mb-8"
          />

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="brand">{post.category}</Badge>
              <span className="text-sm text-ink-500">{post.readingMinutes} min read</span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl">
              {post.title}
            </h1>

            <p className="text-xl leading-relaxed text-ink-600">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-200/70 pt-6">
              <div className="flex items-center gap-3">
                <OvalMark size={38} className="shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-ink-900">{site.legalName}</p>
                  <p className="text-ink-500">Written by the team</p>
                </div>
              </div>

              <div className="flex flex-col gap-0.5 text-sm text-ink-500">
                <span>
                  Published{" "}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </span>
                {wasUpdated ? (
                  <span>
                    Updated{" "}
                    <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ Body */}
      <div className="container-page grid gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <article className="max-w-3xl">
          <PostBody blocks={post.blocks} />

          {/* Publisher note */}
          <div className="mt-16 flex flex-col gap-4 rounded-2xl bg-paper-subtle p-7 ring-1 ring-ink-100 sm:flex-row sm:gap-6">
            <OvalMark size={52} className="shrink-0" />
            <div>
              <p className="font-semibold text-ink-950">{site.legalName}</p>
              <p className="text-sm text-ink-500">
                Web design and SEO for small businesses in the US and UK
              </p>
              <p className="mt-3 leading-relaxed text-ink-600">
                We publish what we learn doing the work — pricing, timelines and the
                technical detail most agencies keep vague. If something here would be
                useful on your own site,{" "}
                <Link href="/pricing" className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4">
                  our packages start at ${cheapestPackage.price}
                </Link>
                .
              </p>
            </div>
          </div>
        </article>

        {/* --------------------------------------------------------------- Aside */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:h-fit">
          {toc.length > 0 ? (
            <nav aria-labelledby="toc-heading">
              <h2
                id="toc-heading"
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500"
              >
                On this page
              </h2>
              <ol className="flex flex-col gap-2.5 border-l border-ink-200">
                {toc.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-[0.9375rem] leading-snug text-ink-600 transition-colors hover:border-brand-500 hover:text-brand-600"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="rounded-2xl bg-ink-950 p-6 text-ink-300 on-ink">
            <h2 className="text-lg font-semibold">Need this done, not explained?</h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">
              We do this work for small businesses across the US and UK. Fixed prices,
              published scope, no retainer.
            </p>
            <ArrowLink href="/pricing" tone="dark" className="mt-4">
              See packages
            </ArrowLink>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
              Related services
            </h2>
            <ul className="flex flex-col gap-2">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-2 text-[0.9375rem] text-ink-600 transition-colors hover:text-brand-600"
                  >
                    <Icon name="arrow-right" size={14} className="text-ink-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {post.faqs && post.faqs.length > 0 ? (
        <FaqSection faqs={post.faqs} title="Related questions" eyebrow="FAQ" />
      ) : null}

      {related.length > 0 ? (
        <Section>
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Keep reading" title="Related articles" />
              <ArrowLink href="/blog" className="shrink-0 md:mb-2">
                All articles
              </ArrowLink>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => (
                <PostCard key={entry.slug} post={entry} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
