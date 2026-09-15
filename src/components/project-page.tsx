import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/language-switch";
import type { Project } from "@/data/portfolio";
import { getContent, getT, homePath, projectPath, type Content, type Locale } from "@/lib/i18n";
import { useEffect } from "react";

export function ProjectDetailPage({ project, locale }: { project: Project; locale: Locale }) {
  const c = getContent(locale);
  const t = getT(locale);
  const reduced = useReducedMotion();
  const copy = c.projects[project.slug as keyof Content["projects"]];
  const statusLabel = c.ui.status[project.status === "Live" ? "live" : "inProgress"];
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  return <motion.main key={locale} lang={locale} className={`min-h-screen bg-background text-foreground ${locale === "ja" ? "lang-ja" : ""}`} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .2 }}>
    <header className="border-b border-border"><div className="page-shell flex h-20 items-center justify-between gap-4">
      <Link to={homePath(locale) as "/"} className="seal" aria-label={c.ui.homeAria}>TN</Link>
      <div className="flex items-center gap-3">
        <LanguageSwitch locale={locale} enHref={projectPath("en", project.slug)} jaHref={projectPath("ja", project.slug)} />
        <Button asChild variant="ghost"><Link to={homePath(locale) as "/"} hash="projects"><ArrowLeft size={16} /> {c.ui.allProjects}</Link></Button>
      </div>
    </div></header>
    <article>
      <section className="editorial-grid border-b border-border py-20 sm:py-28"><div className="page-shell">
        <p className="eyebrow text-primary">{String(t("ui.projectMeta", { category: c.ui.categories[project.category], status: statusLabel }))}</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-none font-semibold sm:text-7xl">{copy.title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.overview}</p>
        {project.link && <Button asChild className="mt-9"><a href={project.link} target="_blank" rel="noreferrer">{c.ui.visitProject} <ArrowUpRight size={16} /></a></Button>}
      </div></section>
      <div className="page-shell py-12 sm:py-16"><h2 className="eyebrow mb-6 text-primary">{c.ui.screenshots}</h2><motion.div className="case-image" initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}><ProjectImage project={project} c={c} /></motion.div></div>
      <section className="page-shell grid gap-14 border-b border-border py-16 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
        <div><p className="eyebrow text-primary">{c.ui.myRole}</p><p className="mt-5 leading-7">{copy.role}</p></div>
        <div><p className="eyebrow text-primary">{c.ui.technology}</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
      </section>
      <section className="page-shell grid gap-14 py-16 sm:py-24 lg:grid-cols-2">
        <DetailList title={c.ui.keyFeatures} items={copy.features} />
        <DetailList title={c.ui.whatITested} items={copy.tested} />
      </section>
    </article>
    <footer className="border-t border-border py-8"><div className="page-shell flex items-center justify-between gap-4"><p className="font-mono text-xs text-muted-foreground">{c.ui.copyright}</p><Link to={homePath(locale) as "/"} hash="projects" className="text-link">{c.ui.nextProject} <ArrowUpRight size={14} /></Link></div></footer>
  </motion.main>;
}

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return <div><h2 className="font-display text-3xl font-semibold">{title}</h2><ul className="mt-7 border-t border-border">{items.map((item) => <li className="flex gap-3 border-b border-border py-4 leading-7" key={item}><Check className="mt-1 shrink-0 text-primary" size={17} />{item}</li>)}</ul></div>;
}
