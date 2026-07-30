/**
 * Shared presentational primitives.
 *
 * Everything here is a server component — no interactivity, so nothing ships
 * to the client. Interactive pieces live in their own "use client" files.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icons";

/* -------------------------------------------------------------------------- */
/* Button                                                                     */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "onInk";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-[0_8px_24px_-10px] shadow-brand-600/70",
  secondary:
    "bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
  ghost: "text-ink-700 hover:text-ink-950 hover:bg-ink-50",
  onInk: "bg-white text-ink-950 hover:bg-ink-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-13 px-6 text-base gap-2",
};

const buttonBase =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 whitespace-nowrap disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonBase, variantStyles[variant], sizeStyles[size], className);
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} size={size === "sm" ? 15 : 17} /> : null}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Section scaffolding                                                        */
/* -------------------------------------------------------------------------- */

export function Section({
  className,
  children,
  tone = "paper",
  ...props
}: ComponentPropsWithoutRef<"section"> & { tone?: "paper" | "subtle" | "ink" }) {
  return (
    <section
      className={cn(
        "py-20 md:py-28",
        tone === "subtle" && "bg-paper-subtle",
        tone === "ink" && "bg-ink-950 text-ink-300 on-ink",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.18em]",
        tone === "light" ? "text-brand-600" : "text-aurora-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          "font-semibold",
          Heading === "h1"
            ? "text-4xl leading-[1.06] sm:text-5xl lg:text-6xl"
            : "text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <div
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            tone === "light" ? "text-ink-600" : "text-ink-300",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Surfaces                                                                   */
/* -------------------------------------------------------------------------- */

export function Card({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 ring-1 ring-ink-100 transition-shadow duration-300 md:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "neutral" | "aurora";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 ring-brand-100",
    neutral: "bg-ink-50 text-ink-600 ring-ink-100",
    aurora: "bg-aurora-400/10 text-aurora-600 ring-aurora-400/20",
  } as const;
  return (
    <span
      className={cn(
        // w-fit so the badge never stretches when it is a direct child of a
        // flex column, where align-items defaults to stretch
        "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Bulleted benefit list with aurora check marks. */
export function CheckList({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "light" ? "bg-aurora-400/15 text-aurora-600" : "bg-aurora-400/15 text-aurora-400",
            )}
          >
            <Icon name="check" size={12} strokeWidth={2.4} />
          </span>
          <span className={tone === "light" ? "text-ink-700" : "text-ink-300"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Large metric display used on case studies and the homepage. */
export function Stat({
  value,
  label,
  detail,
  tone = "light",
}: {
  value: string;
  label: string;
  detail?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={cn(
          "text-4xl font-semibold tracking-tight tabular-nums lg:text-5xl",
          tone === "light" ? "text-ink-950" : "text-white",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          tone === "light" ? "text-ink-800" : "text-ink-100",
        )}
      >
        {label}
      </span>
      {detail ? (
        <span className={cn("text-sm", tone === "light" ? "text-ink-500" : "text-ink-400")}>
          {detail}
        </span>
      ) : null}
    </div>
  );
}

/** Text link with a trailing arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-[0.9375rem] font-medium transition-colors",
        tone === "light"
          ? "text-brand-600 hover:text-brand-700"
          : "text-aurora-400 hover:text-aurora-300",
        className,
      )}
    >
      {children}
      <Icon
        name="arrow-right"
        size={16}
        className="transition-transform duration-200 group-hover/link:translate-x-1"
      />
    </Link>
  );
}
