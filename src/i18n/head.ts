import { COPY } from "./copy";
import type { Lang } from "./lang";

/** Read the language from a route match's context inside `head()`. */
export function langOf(context: unknown): Lang {
  const lang = (context as { lang?: unknown } | undefined)?.lang;
  return lang === "it" ? "it" : "en";
}

export function headCopy(match: { context: unknown }) {
  return COPY[langOf(match.context)];
}
