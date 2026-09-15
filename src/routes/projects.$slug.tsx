import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.title} — Tanzida Nowshin` : "Project not found — Tanzida Nowshin";
    const description = loaderData?.description ?? "Project case study by Tanzida Nowshin.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "article" }, { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return <main className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border"><div className="page-shell flex h-20 items-center justify-between"><Link to="/" className="seal" aria-label="Tanzida Nowshin home">TN</Link><Button asChild variant="ghost"><Link to="/" hash="projects"><ArrowLeft size={16} /> All projects</Link></Button></div></header>
    <article>
      <section className="editorial-grid border-b border-border py-20 sm:py-28"><div className="page-shell">
        <p className="eyebrow text-primary">{project.category} project · {project.status}</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-none font-semibold sm:text-7xl">{project.title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{project.overview}</p>
        {project.link && <Button asChild className="mt-9"><a href={project.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /></a></Button>}
      </div></section>
      {project.image && <div className="page-shell py-12 sm:py-16"><div className="case-image"><img src={project.image.url} alt={project.image.alt} /></div></div>}
      <section className="page-shell grid gap-14 border-b border-border py-16 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
        <div><p className="eyebrow text-primary">My role</p><p className="mt-5 leading-7">{project.role}</p></div>
        <div><p className="eyebrow text-primary">Technology</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
      </section>
      <section className="page-shell grid gap-14 py-16 sm:py-24 lg:grid-cols-2">
        <DetailList title="Key features" items={project.features} />
        <DetailList title="What I tested" items={project.tested} />
      </section>
    </article>
    <footer className="border-t border-border py-8"><div className="page-shell flex items-center justify-between gap-4"><p className="font-mono text-xs text-muted-foreground">© 2026 Tanzida Nowshin</p><Link to="/" hash="projects" className="text-link">Next project starts here <ArrowUpRight size={14} /></Link></div></footer>
  </main>;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return <div><h2 className="font-display text-3xl font-semibold">{title}</h2><ul className="mt-7 border-t border-border">{items.map((item) => <li className="flex gap-3 border-b border-border py-4 leading-7" key={item}><Check className="mt-1 shrink-0 text-primary" size={17} />{item}</li>)}</ul></div>;
}