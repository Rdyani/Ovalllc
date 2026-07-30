import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { OvalMark } from "./oval-mark";

/**
 * Wordmark: the OVAL lettermark plus "OVAL LLC".
 *
 * The mark stands on its own rather than sitting in a coloured tile — at this
 * size a container competes with the counter and makes the O read as a dot.
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} — home`}
    >
      <OvalMark size={34} tone={tone} className="shrink-0" />
      <span
        className={cn(
          "text-[1.0625rem] font-semibold tracking-[-0.025em]",
          tone === "light" ? "text-ink-950" : "text-white",
        )}
      >
        OVAL
        <span className="text-ink-400"> LLC</span>
      </span>
    </Link>
  );
}
