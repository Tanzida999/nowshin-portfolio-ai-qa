import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, Download, Menu, Moon, Send, Sun, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import portraitAsset from "@/assets/tanzida-nowshin.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { portfolio, projects, type ProjectCategory } from "@/data/portfolio";

const description = "Web developer in Japan building reliable products with modern AI tools and growing into AI-assisted software testing and QA.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tanzida Nowshin — Web Developer & AI-Assisted QA" },
      { name: "description", content: description },
      { property: "og:title", content: "Tanzida Nowshin — Web Developer & AI-Assisted QA" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");

  useEffect(() => {
    const stored = window.localStorage.getItem("tn-theme");
    const initial = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("tn-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header dark={dark} menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} onTheme={toggleTheme} />
      <main>
        <section className="editorial-grid min-h-[calc(100svh-5rem)] border-b border-border pt-20" aria-labelledby="hero-title">
          <div className="page-shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-20">
            <div className="min-w-0">
              <p className="eyebrow">{portfolio.hero.label}</p>
              <h1 id="hero-title" className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
                I build web products <span className="text-primary">—</span> and make sure they work.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{portfolio.hero.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild><a href="#projects">View my work <ArrowDown size={16} /></a></Button>
                <Button asChild variant="outline"><a href="/Tanzida_Nowshin_CV.pdf" download>Download CV <Download size={16} /></a></Button>
              </div>
              <TestRunner />
            </div>
            <div className="mx-auto w-full max-w-xs self-center lg:max-w-sm">
              <div className="portrait-frame">
                <img src={portraitAsset.url} alt="Tanzida Nowshin in her graduation gown" className="h-full w-full object-cover" fetchPriority="high" />
              </div>
              <p className="mt-5 text-center font-mono text-xs uppercase text-muted-foreground">Tokyo, Japan · 2026</p>
            </div>
          </div>
        </section>

        <Section id="about" number="01" title="A builder with a tester's eye.">
          <div className="max-w-4xl space-y-6 text-lg leading-8 sm:text-xl">
            {portfolio.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-12 grid border-y border-border sm:grid-cols-3">
            {portfolio.about.facts.map((fact) => <p key={fact} className="border-border px-0 py-5 font-mono text-xs text-muted-foreground sm:border-r sm:px-5 first:pl-0 last:border-0">{fact}</p>)}
          </div>
        </Section>

        <Section id="skills" number="02" title="Tools, craft and judgement.">
          <div className="grid border-l border-t border-border md:grid-cols-2">
            {portfolio.skills.map((skill, index) => (
              <article key={skill.title} className="skill-panel border-b border-r border-border p-6 sm:p-8">
                <p className="font-mono text-xs text-primary">0{index + 1}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold">{skill.title}</h3>
                <div className="mt-6 flex flex-wrap gap-2">{skill.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" number="03" title="Work, across markets.">
          <div className="timeline max-w-4xl">
            {portfolio.experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="timeline-item pb-12 pl-9 last:pb-0">
                <p className="font-mono text-xs text-primary">{item.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{item.role} <span className="text-muted-foreground">— {item.company}</span></h3>
                {item.place && <p className="mt-1 font-mono text-xs text-muted-foreground">{item.place}</p>}
                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{item.description}</p>
                {item.link && <a className="text-link mt-4 inline-flex items-center gap-1 text-sm" href={item.link} target="_blank" rel="noreferrer">Visit company <ArrowUpRight size={14} /></a>}
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" number="04" title="Selected work.">
          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border" role="group" aria-label="Filter projects">
            {(["All", "Client", "Company", "Personal"] as const).map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)} className={`filter-tab ${filter === tab ? "filter-tab-active" : ""}`} aria-pressed={filter === tab}>{tab}</button>
            ))}
          </div>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
            {projects.filter((project) => filter === "All" || project.category === filter).map((project) => (
              <article className="project-card group" key={project.slug}>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ProjectVisual project={project} />
                  <div className="pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-xs text-muted-foreground">{project.category}</p>
                      <Status status={project.status} />
                    </div>
                    <h3 className="mt-3 flex items-center justify-between gap-4 font-display text-3xl font-semibold">{project.title}<ArrowUpRight className="shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} /></h3>
                    <p className="mt-3 leading-7 text-muted-foreground">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{project.tech.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Section>

        <Section id="education" number="05" title="Learning, continuously.">
          <div className="grid gap-14 lg:grid-cols-2">
            <CredentialList title="Education" items={portfolio.education} />
            <CredentialList title="Certifications" items={portfolio.certifications} />
          </div>
        </Section>

        <Section id="contact" number="06" title="Let's build something reliable.">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="max-w-md leading-7 text-muted-foreground">Have a product to build, a workflow to improve, or software that needs a careful second look? I’d like to hear about it.</p>
              <div className="mt-8 flex flex-col items-start gap-4">
                <a className="text-link" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}</a>
                <a className="text-link" href={portfolio.person.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
                <a className="text-link" href={portfolio.person.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
              </div>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

function Header({ dark, menuOpen, onMenu, onTheme }: { dark: boolean; menuOpen: boolean; onMenu: () => void; onTheme: () => void }) {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
    <div className="page-shell grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
      <a href="#top" className="seal" aria-label="Tanzida Nowshin, back to top">TN</a>
      <nav className="hidden justify-center gap-7 lg:flex" aria-label="Main navigation">{portfolio.nav.map((item) => <a className="nav-link" href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav>
      <div className="flex items-center justify-end gap-2">
        <Button asChild variant="outline" className="hidden sm:inline-flex"><a href="/Tanzida_Nowshin_CV.pdf" download>Download CV</a></Button>
        <Button variant="icon" aria-label={`Switch to ${dark ? "light" : "dark"} mode`} onClick={onTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</Button>
        <Button variant="icon" className="lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={onMenu}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</Button>
      </div>
    </div>
    {menuOpen && <nav className="border-t border-border bg-background px-6 py-5 lg:hidden" aria-label="Mobile navigation">{portfolio.nav.map((item) => <a className="block border-b border-border py-3 font-mono text-sm" href={`#${item.toLowerCase()}`} onClick={onMenu} key={item}>{item}</a>)}</nav>}
  </header>;
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && node.classList.add("revealed"), { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} id={id} className="reveal-section scroll-mt-20 border-b border-border py-20 sm:py-28">
    <div className="page-shell"><div className="mb-12 grid gap-4 border-t border-border pt-5 sm:grid-cols-[9rem_1fr] sm:mb-16">
      <p className="eyebrow text-primary">{number}</p><h2 className="max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl">{title}</h2>
    </div>{children}</div>
  </section>;
}

function TestRunner() {
  return <div className="test-runner mt-12 max-w-2xl" aria-label="Five development and testing capabilities passed">
    <div className="flex items-center gap-2 border-b border-terminal-line px-4 py-3"><span className="h-2 w-2 rounded-full bg-primary" /><span className="font-mono text-[10px] uppercase text-terminal-muted">reliability-check.test.ts</span></div>
    <div className="space-y-2.5 p-4 sm:p-5">{portfolio.hero.tests.map((test, index) => <p key={test} className="test-line font-mono text-xs sm:text-sm" style={{ animationDelay: `${index * 0.45}s` }}><Check className="inline text-success" size={14} /> {test}</p>)}
      <p className="test-summary mt-4 border-t border-terminal-line pt-4 font-mono text-xs text-success">5 passed · 0 failed</p></div>
  </div>;
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  return <div className="project-visual">{project.image ? <img src={project.image.url} alt={project.image.alt} loading="lazy" style={{ objectPosition: project.image.position }} /> : <div className="project-placeholder"><span>{project.title.slice(0, 2).toUpperCase()}</span><p>{project.category} / {project.status}</p></div>}</div>;
}

function Status({ status }: { status: "Live" | "In progress" }) {
  return <span className={`status ${status === "Live" ? "status-live" : "status-progress"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

function CredentialList({ title, items }: { title: string; items: readonly (readonly string[])[] }) {
  return <div><h3 className="eyebrow mb-7 text-primary">{title}</h3><div className="border-t border-border">{items.map((item) => <div className="border-b border-border py-5" key={item[0]}><p className="font-semibold">{item[0]}</p><p className="mt-1 text-sm text-muted-foreground">{item.slice(1).join(" · ")}</p></div>)}</div></div>;
}

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (!name || name.length > 100) next.name = "Please enter your name (up to 100 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) next.email = "Please enter a valid email address.";
    if (message.length < 10 || message.length > 1000) next.message = "Please enter a message between 10 and 1,000 characters.";
    setErrors(next);
    if (!Object.keys(next).length) { setSent(true); event.currentTarget.reset(); }
  };
  return <form onSubmit={submit} noValidate className="space-y-5" aria-label="Contact form">
    <Field label="Name" name="name" maxLength={100} error={errors["name"]} />
    <Field label="Email" name="email" type="email" maxLength={255} error={errors["email"]} />
    <div><label className="field-label" htmlFor="message">Message</label><textarea className="field min-h-36 resize-y" id="message" name="message" maxLength={1000} aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "message-error" : undefined} />{errors["message"] && <p className="field-error" id="message-error">{errors["message"]}</p>}</div>
    <Button type="submit">Send message <Send size={16} /></Button>
    {sent && <p className="border-l-2 border-success pl-4 text-sm" role="status">Thank you — your message is ready. Please email me directly if you need an immediate reply.</p>}
  </form>;
}

function Field({ label, name, error, ...props }: { label: string; name: string; error: string | undefined; type?: string; maxLength: number }) {
  return <div><label className="field-label" htmlFor={name}>{label}</label><input className="field" id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />{error && <p className="field-error" id={`${name}-error`}>{error}</p>}</div>;
}

function Footer() {
  return <footer className="py-8"><div className="page-shell grid grid-cols-[auto_1fr_auto] items-center gap-4"><span className="seal">TN</span><p className="font-mono text-[10px] text-muted-foreground">© 2026 Tanzida Nowshin</p><a className="nav-link flex items-center gap-2" href="#top">Top <ArrowUpRight size={13} /></a></div></footer>;
}
