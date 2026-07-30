/** Tiny className joiner — avoids pulling in clsx for a nine-line function. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
