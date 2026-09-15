import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio-page";
import { getContent } from "@/lib/i18n";

const site = "https://nowshin-portfolio-ai-qa.lovable.app";

export const Route = createFileRoute("/ja/")({
  head: () => {
    const c = getContent("ja");
    return {
      meta: [
        { title: c.meta.homeTitle }, { name: "description", content: c.meta.homeDescription },
        { property: "og:title", content: c.meta.homeTitle }, { property: "og:description", content: c.meta.homeDescription },
        { property: "og:locale", content: "ja_JP" }, { property: "og:type", content: "website" },
        { property: "og:url", content: `${site}/ja` }, { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `${site}/ja` },
        { rel: "alternate", hrefLang: "en", href: `${site}/` },
        { rel: "alternate", hrefLang: "ja", href: `${site}/ja` },
        { rel: "alternate", hrefLang: "x-default", href: `${site}/` },
      ],
    };
  },
  component: () => <PortfolioPage locale="ja" />,
});
