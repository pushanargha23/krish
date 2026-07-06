/** Utility to merge class names (lightweight cn without clsx) */
export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');
