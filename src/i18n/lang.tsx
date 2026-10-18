import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";
import { COPY, type Copy } from "./copy";

export type Lang = "en" | "it";
export const LANGS: Lang[] = ["en", "it"];

/**
 * The site always opens in English. Italian is shown only after the visitor
 * picks IT, and only for that visit: the choice lives in a session cookie that
 * the browser drops when it closes, so the next visit starts in English again.
 */
const COOKIE = "site_lang";
/** Cookie used by the first version of the switch (kept a year, set from the browser language). */
const LEGACY_COOKIE = "lang";

const isLang = (v: unknown): v is Lang => v === "en" || v === "it";

export const detectLang = createIsomorphicFn()
  .server((): Lang => {
    if (getCookie(LEGACY_COOKIE)) {
      try {
        setCookie(LEGACY_COOKIE, "", { path: "/", maxAge: 0 });
      } catch {
        // headers already sent
      }
    }
    return getCookie(COOKIE) === "it" ? "it" : "en";
  })
  .client((): Lang => {
    const match = document.cookie.match(/(?:^|;\s*)site_lang=(en|it)/);
    return match && isLang(match[1]) ? match[1] : "en";
  });

/** The current language, as decided in the root route's beforeLoad. */
export function useLang(): Lang {
  const lang = useRouterState({
    select: (s) => (s.matches[0]?.context as { lang?: Lang } | undefined)?.lang,
  });
  return isLang(lang) ? lang : "en";
}

/** All interface copy for the current language. */
export function useCopy(): Copy {
  return COPY[useLang()];
}

/** Switch language: remember the choice and re-render the current page. */
export function useSetLang() {
  const router = useRouter();
  return useCallback(
    (lang: Lang) => {
      // No max-age: a session cookie, forgotten when the browser closes.
      document.cookie = `${COOKIE}=${lang}; path=/; samesite=lax`;
      document.cookie = `${LEGACY_COOKIE}=; path=/; max-age=0`;
      document.documentElement.lang = lang;
      router.invalidate();
    },
    [router],
  );
}

/** "A, B and C" in the right language. */
export function joinList(items: string[], and: string) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}
