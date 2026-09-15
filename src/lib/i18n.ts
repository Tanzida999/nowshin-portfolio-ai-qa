import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../locales/en.json";
import ja from "../../locales/ja.json";

export type Locale = "en" | "ja";
export type Content = typeof en;

export const locales: Locale[] = ["en", "ja"];
export const LANGUAGE_STORAGE_KEY = "tn-language";

if (!i18next.isInitialized) {
  void i18next.use(initReactI18next).init({
    resources: { en: { translation: en }, ja: { translation: ja } },
    lng: "en",
    fallbackLng: "en",
    returnObjects: true,
    interpolation: { escapeValue: false },
  });
}

/** Content tree for a locale; deterministic on the server (no shared language state). */
export function getContent(locale: Locale): Content {
  return (i18next.getResourceBundle(locale, "translation") as Content | undefined) ?? en;
}

/** Interpolating translator bound to one locale. */
export function getT(locale: Locale) {
  return i18next.getFixedT(locale);
}

export function homePath(locale: Locale) {
  return locale === "ja" ? "/ja" : "/";
}

export function projectPath(locale: Locale, slug: string) {
  return locale === "ja" ? `/ja/projects/${slug}` : `/projects/${slug}`;
}

export function rememberLanguage(locale: Locale) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    /* Private browsing can block storage; the current page still switches. */
  }
}

export function storedLanguage(): Locale | null {
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === "en" || value === "ja" ? value : null;
  } catch {
    return null;
  }
}

/** Language a first-time visitor should see. */
export function preferredLanguage(): Locale {
  const stored = storedLanguage();
  if (stored) return stored;
  const browser = typeof navigator === "undefined" ? "" : (navigator.language ?? "");
  return browser.toLowerCase().startsWith("ja") ? "ja" : "en";
}

export default i18next;
