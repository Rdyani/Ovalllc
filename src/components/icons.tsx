/**
 * Inline icon set.
 *
 * Kept in-repo rather than pulled from an icon package so nothing extra ships
 * to the browser and every glyph shares one stroke weight. All icons are drawn
 * on a 24×24 grid with a 1.6 stroke, currentColor, and rounded caps.
 */

import type { SVGProps } from "react";

export type IconName =
  | "layout"
  | "search"
  | "target"
  | "sparkles"
  | "trending"
  | "pen"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "chevron-down"
  | "menu"
  | "close"
  | "mail"
  | "phone"
  | "pin"
  | "clock"
  | "quote"
  | "star"
  | "shield"
  | "compass"
  | "linkedin"
  | "x"
  | "instagram"
  | "dribbble";

const paths: Record<IconName, React.ReactNode> = {
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.2 13.7 8l4.8 1.7-4.8 1.7L12 16.2l-1.7-4.8L5.5 9.7 10.3 8 12 3.2Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </>
  ),
  trending: (
    <>
      <path d="M3 17.5 9.5 11l4 4L21 7.5" />
      <path d="M15.5 7.5H21v5.5" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20h4l10.5-10.5a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20Z" />
      <path d="m14 7.5 2.5 2.5" />
    </>
  ),
  "arrow-right": <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  "arrow-up-right": <path d="M7 17 17 7m0 0H8.5M17 7v8.5" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "chevron-down": <path d="m5.5 9 6.5 6.5L18.5 9" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h-2A1.5 1.5 0 0 0 3 5.2C3.6 13 11 20.4 18.8 21a1.5 1.5 0 0 0 1.7-1.5v-2a1.5 1.5 0 0 0-1.2-1.5l-2.6-.5a1.5 1.5 0 0 0-1.5.6l-.9 1.2a13.5 13.5 0 0 1-5.6-5.6l1.2-.9a1.5 1.5 0 0 0 .6-1.5l-.5-2.6a1.5 1.5 0 0 0-1.5-1.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  quote: (
    <path d="M9.5 6.5C6.9 7.8 5.5 10 5.5 13v4.5H11V11H8.2c.2-1.4 1-2.4 2.4-3.1l-1.1-1.4Zm9 0C15.9 7.8 14.5 10 14.5 13v4.5H20V11h-2.8c.2-1.4 1-2.4 2.4-3.1l-1.1-1.4Z" />
  ),
  star: (
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.7l5.9-.8L12 3.5Z" />
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 6v6c0 4.7 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.8 7.5-9.5V6L12 2.8Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5.5-5.5 2 2-5.5 5.5-2Z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V16M7.5 7.6v.1M11.5 16v-3.2a2 2 0 0 1 4 0V16M11.5 10.5V16" />
    </>
  ),
  x: <path d="m4 4 7.5 9.2M20 20l-7.5-9.2M4 20l6.2-7M20 4l-6.2 7" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.8 7.2v.1" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5 8.5c4.8 1 9.5.2 13-2.4M3.5 14.5c4-1.6 8.8-1 11.8 2.3M9 3.6c3.4 4 5.5 8.8 6 14.6" />
    </>
  ),
};

/** Icons that read better filled than stroked */
const filled: IconName[] = ["quote", "star"];

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  const isFilled = filled.includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
