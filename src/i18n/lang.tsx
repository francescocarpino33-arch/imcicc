import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader, setCookie } from "@tanstack/react-start/server";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";
import { COPY, type Copy } from "./copy";

export type Lang = "en" | "it";
export const LANGS: Lang[] = ["en", "it"];
const COOKIE = "lang";
const ONE_YEAR = 60 * 60 * 24 * 365;

const isLang = (v: unknown): v is Lang => v === "en" || v === "it";

/**
 * Which language to render.
 * 1. The visitor's own choice, remembered in a cookie.
 * 2. Otherwise the browser's preferred language: Italian browsers get Italian.
 * 3. Otherwise English.
 * On the server the decision is also written to the cookie, so the browser
 * hydrates in the same language the page was rendered in.
 */
export const detectLang = createIsomorphicFn()
  .server((): Lang => {
    const saved = getCookie(COOKIE);
    if (isLang(saved)) return saved;
    const accept = (getRequestHeader("accept-language") ?? "").toLowerCase();
    const first = accept.split(",")[0]?.trim() ?? "";
    const lang: Lang = first.startsWith("it") ? "it" : "en";
    try {
      setCookie(COOKIE, lang, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    } catch {
      // headers already sent: the client will fall back to the same detection
    }
    return lang;
  })
  .client((): Lang => {
    const match = document.cookie.match(/(?:^|;\s*)lang=(en|it)/);
    if (match && isLang(match[1])) return match[1];
    return (navigator.language || "").toLowerCase().startsWith("it") ? "it" : "en";
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
      document.cookie = `${COOKIE}=${lang}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
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
