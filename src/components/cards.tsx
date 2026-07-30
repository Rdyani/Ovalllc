import Link from "next/link";
import type { Service } from "@/lib/services";
import type { Post } from "@/lib/posts";
import type { Location } from "@/lib/locations";
import { Icon } from "./icons";
import { Badge } from "./ui";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/* -------------------------------------------------------------------------- */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col gap-4 rounded-2xl bg-white p-7 ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-ink-200"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        <Icon name={service.icon as never} size={21} />
      </span>

      <h3 className="text-xl font-semibold">{service.name}</h3>
      <p className="flex-1 leading-relaxed text-ink-600">{service.excerpt}</p>

      <div className="flex items-center justify-between border-t border-ink-100 pt-4 text-sm">
        <span className="font-medium text-ink-500">
          From ${service.startingPrice.toLocaleString("en-US")}
          <span className="text-ink-400">/{service.priceUnit}</span>
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-brand-600">
          Explore
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}


/* -------------------------------------------------------------------------- */

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col gap-4 rounded-2xl bg-white p-7 ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-ink-200"
      >
        <div className="flex items-center gap-3 text-sm">
          <Badge tone="brand">{post.category}</Badge>
          <span className="text-ink-400">{post.readingMinutes} min read</span>
        </div>

        <h3 className="text-xl font-semibold leading-snug transition-colors group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="flex-1 leading-relaxed text-ink-600">{post.excerpt}</p>

        <div className="flex items-center justify-between border-t border-ink-100 pt-4 text-sm">
          <time dateTime={post.publishedAt} className="text-ink-500">
            {formatDate(post.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1 font-medium text-brand-600">
            Read
            <Icon
              name="arrow-right"
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

/* -------------------------------------------------------------------------- */

export function LocationCard({ location }: { location: Location }) {
  return (
    <Link
      href={`/digital-marketing-agency/${location.slug}`}
      className="group flex flex-col gap-3 rounded-2xl bg-white p-6 ring-1 ring-ink-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-ink-200"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-lg font-semibold text-ink-950">
          <Icon name="pin" size={17} className="text-brand-500" />
          {location.city}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-400">
          {location.country === "US" ? location.regionCode : "UK"}
        </span>
      </div>
      <p className="flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
        {location.excerpt}
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600">
        View {location.city} services
        <Icon
          name="arrow-right"
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

