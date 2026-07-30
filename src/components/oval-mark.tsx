/**
 * The OVAL mark.
 *
 * A true ellipse (rx 14 / ry 10.8) with an offset counter rotated -25°, drawn
 * as a single evenodd path so the centre is a real transparent hole rather than
 * a shape filled with the background colour — it has to sit on white, on
 * ink-950 and on generated social cards.
 *
 * The tilt is what stops it reading as a generic donut: the ring is thicker at
 * the sides than at top and bottom, the way a drawn "O" actually is.
 *
 * MARK_PATH is exported separately because the OG image routes render through
 * satori, which takes a raw path rather than this component.
 */

export const MARK_PATH =
  "M2 16a14 10.8 0 0 1 28 0a14 10.8 0 0 1-28 0ZM10.56 18.54a6 4.4 -25 0 1 10.88-5.07a6 4.4 -25 0 1-10.88 5.07Z";

/** Gradient stops, kept in sync with --color-brand-500 / --color-aurora-500. */
export const MARK_GRADIENT = { from: "#6c63f5", to: "#12c795" } as const;
/** Lighter pair, for the mark on dark backgrounds. */
export const MARK_GRADIENT_DARK = { from: "#8286fb", to: "#2ee0ae" } as const;

export function OvalMark({
  size = 32,
  tone = "light",
  className,
}: {
  size?: number;
  /** "light" = on a light background, "dark" = on ink-950 */
  tone?: "light" | "dark";
  className?: string;
}) {
  const id = `oval-mark-${tone}`;
  const { from, to } = tone === "dark" ? MARK_GRADIENT_DARK : MARK_GRADIENT;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={MARK_PATH} fill={`url(#${id})`} fillRule="evenodd" />
    </svg>
  );
}

/** Solid single-colour variant — for knockouts on coloured backgrounds. */
export function OvalMarkSolid({
  size = 32,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={MARK_PATH} fill={color} fillRule="evenodd" />
    </svg>
  );
}
