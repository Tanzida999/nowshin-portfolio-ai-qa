import { Link } from "@tanstack/react-router";
import { getContent, rememberLanguage, type Locale } from "@/lib/i18n";

/** EN / 日本語 switch. Keeps the current page and remembers the choice. */
export function LanguageSwitch({ locale, enHref, jaHref }: { locale: Locale; enHref: string; jaHref: string }) {
  const c = getContent(locale);
  return (
    <div className="language-switch" role="group" aria-label={c.language.switchAria}>
      <Link
        to={enHref}
        lang="en"
        onClick={() => rememberLanguage("en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={locale === "en" ? "is-active" : undefined}
      >
        {c.language.en}
      </Link>
      <span aria-hidden="true">/</span>
      <Link
        to={jaHref}
        lang="ja"
        onClick={() => rememberLanguage("ja")}
        aria-current={locale === "ja" ? "true" : undefined}
        className={locale === "ja" ? "is-active" : undefined}
      >
        {c.language.ja}
      </Link>
    </div>
  );
}
