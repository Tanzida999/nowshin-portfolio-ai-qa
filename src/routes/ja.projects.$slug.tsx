import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetailPage } from "@/components/project-page";
import { findProject } from "@/data/portfolio";
import { getContent, type Content } from "@/lib/i18n";

const site = "https://nowshin-portfolio-ai-qa.lovable.app";

export const Route = createFileRoute("/ja/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => {
    const c = getContent("ja");
    const copy = c.projects[params.slug as keyof Content["projects"]];
    const title = loaderData && copy ? `${copy.title}｜${c.meta.projectTitleSuffix}` : c.meta.projectNotFound;
    const description = copy?.description ?? c.meta.projectFallbackDescription;
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:locale", content: "ja_JP" }, { property: "og:type", content: "article" },
        { property: "og:url", content: `${site}/ja/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `${site}/ja/projects/${params.slug}` },
        { rel: "alternate", hrefLang: "en", href: `${site}/projects/${params.slug}` },
        { rel: "alternate", hrefLang: "ja", href: `${site}/ja/projects/${params.slug}` },
      ],
    };
  },
  component: () => <ProjectDetailPage project={Route.useLoaderData()} locale="ja" />,
});
