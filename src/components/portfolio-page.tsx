import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Clipboard, Download, Menu, Moon, Play, RotateCcw, Search, Send, Sun, Undo2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import portraitAsset from "@/assets/tanzida-photo-cutout.png.asset.json";
import { LanguageSwitch } from "@/components/language-switch";
import { Button } from "@/components/ui/button";
import { experienceItems, navItems, person, projects, type Project, type ProjectCategory, type ProjectStatus, type SectionId } from "@/data/portfolio";
import { getContent, getT, homePath, preferredLanguage, projectPath, storedLanguage, type Content, type Locale } from "@/lib/i18n";

const premiumEase = [0.22, 1, 0.36, 1] as const;
const statusKey = (status: ProjectStatus) => (status === "Live" ? "live" : "inProgress");
const filterKeys = ["all", "Client", "Company", "Personal"] as const;
type FilterKey = (typeof filterKeys)[number];

export function PortfolioPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = getT(locale);
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [bugs, setBugs] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("tn-theme");
      const initial = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(initial); document.documentElement.classList.toggle("dark", initial);
      setBugs(JSON.parse(window.localStorage.getItem("tn-fixed-bugs") ?? "[]") as string[]);
    } catch { /* Private browsing can block storage. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    if (locale !== "en" || storedLanguage()) return;
    if (preferredLanguage() === "ja") void navigate({ to: "/ja", replace: true });
  }, [locale, navigate]);
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine) and (min-width: 1024px)").matches) return;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    void import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const tick = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    });
    return () => { cancelAnimationFrame(frame); lenis?.destroy(); };
  }, [reduced]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPaletteOpen(true); }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", keydown); return () => window.removeEventListener("keydown", keydown);
  }, []);
  const toggleTheme = () => {
    const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next);
    try { window.localStorage.setItem("tn-theme", next ? "dark" : "light"); } catch { /* Theme still works for this view. */ }
  };
  const fixBug = (id: string) => {
    if (bugs.includes(id)) return;
    const next = [...bugs, id]; setBugs(next);
    try { window.localStorage.setItem("tn-fixed-bugs", JSON.stringify(next)); } catch { /* Keep session state. */ }
    setToast(next.length === 3 ? c.ui.bugs.all : String(t("ui.bugs.progress", { count: next.length })));
  };

  const shown = useMemo(() => projects.filter((project) => filter === "all" || project.category === filter), [filter]);

  return <div id="top" lang={locale} className={`min-h-screen bg-background text-foreground ${locale === "ja" ? "lang-ja" : ""}`}>
    <motion.div className="reading-progress" style={{ scaleX: reduced ? 0 : progress }} />
    <CustomCursor />
    <p className="edge-japanese" aria-hidden="true">{c.ui.edgeJapanese}</p>
    <Header locale={locale} c={c} dark={dark} menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} onTheme={toggleTheme} onPalette={() => setPaletteOpen(true)} />
    <motion.main key={locale} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .2, ease: premiumEase }}>
      <section className="hero-grain editorial-grid border-b border-border pt-20" aria-labelledby="hero-title">
        <div className="page-shell hero-layout grid items-center gap-10 py-10 lg:grid-cols-[3fr_2fr] lg:py-12">
          <div className="hero-copy min-w-0">
            <motion.p className="eyebrow" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: premiumEase }}>{c.hero.label}</motion.p>
            <AnimatedHeadline title={c.hero.title} locale={locale} />
            <p className="mt-3 font-mono text-xs text-muted-foreground">{c.hero.nameLine}</p>
            <motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: reduced ? 0 : .65, ease: premiumEase }} className="mt-7 max-w-[65ch] text-[17px] leading-[1.7] text-muted-foreground">{c.hero.description}</motion.p>
            <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: reduced ? 0 : .8, ease: premiumEase }} className="mt-8 flex flex-wrap gap-3"><Magnetic><Button asChild className="shine-button"><a href="#projects">{c.hero.viewWork} <ArrowDown size={16} /></a></Button></Magnetic><Magnetic><Button asChild variant="outline"><a href={person.cv} download>{c.ui.downloadCv} <Download size={16} /></a></Button></Magnetic></motion.div>
            <TestRunner c={c} />
          </div>
          <HeroPortrait c={c} />
        </div>
        <a href="#about" className="scroll-indicator" aria-label={c.hero.scrollAria}><span>{c.hero.scroll}</span><i><b /></i></a>
      </section>

      <Marquee phrase={c.ui.marquee} />

      <Section id="about" number="01" title={c.sections.about}>
        <BugButton id="about" fixed={bugs.includes("about")} onFix={fixBug} className="right-4 top-7" c={c} />
        <div className="max-w-4xl space-y-6 text-lg leading-8 sm:text-xl">{c.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="mt-12 grid border-y border-border sm:grid-cols-3">{c.about.facts.map((fact) => <p key={fact} className="border-border px-0 py-5 font-mono text-xs text-muted-foreground sm:border-r sm:px-5 first:pl-0 last:border-0">{fact}</p>)}</div>
      </Section>

      <Section id="skills" number="02" title={c.sections.skills}>
        <BugButton id="skills" fixed={bugs.includes("skills")} onFix={fixBug} className="bottom-5 right-5" c={c} />
        <div className="grid border-l border-t border-border md:grid-cols-2">{c.skills.map((skill, index) => <SkillCard key={skill.title} skill={skill} index={index} />)}</div>
      </Section>

      <Section id="experience" number="03" title={c.sections.experience}>
        <Timeline c={c} />
      </Section>

      <Section id="projects" number="04" title={c.sections.projects}>
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border" role="group" aria-label={c.ui.filterAria}>{filterKeys.map((tab) => <button key={tab} onClick={() => setFilter(tab)} className={`filter-tab ${filter === tab ? "filter-tab-active" : ""}`} aria-pressed={filter === tab}>{tab === "all" ? c.ui.filters.all : c.ui.categories[tab]}</button>)}</div>
        <motion.div layout className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          <AnimatePresence mode="popLayout">{shown.map((project) => <ProjectCard project={project} key={project.slug} c={c} locale={locale} />)}</AnimatePresence>
        </motion.div>
      </Section>

      <Section id="education" number="05" title={c.sections.education}><div className="grid gap-14 lg:grid-cols-2"><CredentialList title={c.education.title} items={c.education.items} /><CredentialList title={c.certifications.title} items={c.certifications.items} /></div></Section>
      <Section id="contact" number="06" title={c.sections.contact}><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="max-w-md leading-7 text-muted-foreground">{c.ui.contactIntro}</p><div className="mt-8 flex flex-col items-start gap-4"><a className="text-link" href={`mailto:${person.email}`}>{person.email}</a><a className="text-link" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a className="text-link" href={person.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div></div><ContactForm c={c} /></div></Section>
    </motion.main>
    <Footer bugFixed={bugs.includes("footer")} onFix={fixBug} c={c} />
    <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} c={c} locale={locale} />
    <AnimatePresence>{toast && <motion.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bug-toast"><p>{toast}</p>{bugs.length === 3 && <Button size="sm" onClick={() => { document.querySelector("#contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); setToast(null); }}>{c.ui.bugs.contact}</Button>}<button aria-label={c.ui.bugs.dismiss} onClick={() => setToast(null)}><X size={15} /></button></motion.div>}</AnimatePresence>
  </div>;
}

function Header({ locale, c, dark, menuOpen, onMenu, onTheme, onPalette }: { locale: Locale; c: Content; dark: boolean; menuOpen: boolean; onMenu: () => void; onTheme: () => void; onPalette: () => void }) {
  const reduced = useReducedMotion(); const [stamp, setStamp] = useState(false);
  useEffect(() => { try { if (!sessionStorage.getItem("tn-stamped")) { setStamp(true); sessionStorage.setItem("tn-stamped", "1"); } } catch { setStamp(true); } }, []);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"><div className="page-shell grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
    <motion.a href="#top" className="seal relative" aria-label={c.ui.backToTop} initial={stamp && !reduced ? { scale: 1.6, rotate: -9, y: -18 } : false} animate={{ scale: 1, rotate: 0, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 14 }}><span>TN</span>{stamp && !reduced && <motion.i className="stamp-ring" initial={{ scale: .65, opacity: .6 }} animate={{ scale: 1.75, opacity: 0 }} transition={{ duration: .75, delay: .18 }} />}</motion.a>
    <nav className="hidden justify-center gap-7 lg:flex" aria-label={c.nav.projects}>{navItems.map((id) => <a className="nav-link" href={`#${id}`} key={id}>{c.nav[id]}</a>)}</nav>
    <div className="flex items-center justify-end gap-2"><LanguageSwitch locale={locale} enHref="/" jaHref="/ja" /><button className="command-hint hidden xl:inline-flex" onClick={onPalette}><Search size={13} />⌘K</button><Button asChild variant="outline" className="hidden lg:inline-flex"><a href={person.cv} download>{c.ui.downloadCv}</a></Button><Button variant="icon" aria-label={dark ? c.ui.themeToLight : c.ui.themeToDark} onClick={onTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</Button><Button variant="icon" className="lg:hidden" aria-label={c.ui.toggleMenu} aria-expanded={menuOpen} onClick={onMenu}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</Button></div>
  </div>{menuOpen && <nav className="border-t border-border bg-background px-6 py-5 lg:hidden" aria-label={c.nav.projects}>{navItems.map((id) => <a className="block border-b border-border py-3 font-mono text-sm" href={`#${id}`} onClick={onMenu} key={id}>{c.nav[id]}</a>)}<a className="mt-4 block font-mono text-sm text-primary" href={person.cv} download>{c.ui.downloadCv}</a></nav>}</header>;
}

function HeroPortrait({ c }: { c: Content }) {
  const reduced = useReducedMotion(); const ref = useRef<HTMLDivElement>(null); const photoX = useMotionValue(0); const photoY = useMotionValue(0); const circleX = useMotionValue(0); const circleY = useMotionValue(0);
  const move = (event: ReactMouseEvent<HTMLDivElement>) => { if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine) and (min-width: 1024px)").matches) return; const box = ref.current?.getBoundingClientRect(); if (!box) return; const nx = (event.clientX - box.left) / box.width - .5; const ny = (event.clientY - box.top) / box.height - .5; photoX.set(nx * 16); photoY.set(ny * 16); circleX.set(nx * -8); circleY.set(ny * -8); };
  const reset = () => { photoX.set(0); photoY.set(0); circleX.set(0); circleY.set(0); };
  return <div className="hero-portrait-wrap mx-auto self-center"><div ref={ref} className="portrait-pop-stage" onMouseMove={move} onMouseLeave={reset}>
    <motion.div className="portrait-circle" style={{ x: circleX, y: circleY }} initial={reduced ? false : { opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, ease: premiumEase }} />
    <svg className="portrait-ring" viewBox="0 0 100 100" aria-hidden="true"><motion.circle cx="50" cy="50" r="48.8" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: reduced ? 0 : .45, ease: premiumEase }} /></svg>
    <motion.div className="portrait-person" style={{ x: photoX, y: photoY }} initial={reduced ? false : { opacity: 0, translateY: 24 }} animate={reduced ? { opacity: 1 } : { opacity: 1, translateY: [24, 0, -4, 0] }} transition={reduced ? { duration: 0 } : { opacity: { duration: .8, delay: .2 }, translateY: { duration: 6, delay: .2, times: [0, .14, .57, 1], repeat: Infinity, ease: "easeInOut" } }}>
      <img src={portraitAsset.url} alt={c.hero.portraitAlt} width="690" height="866" fetchPriority="high" />
    </motion.div>
  </div><div className="availability"><span />{c.hero.availability}</div></div>;
}

function splitHeadline(title: string, locale: Locale) {
  if (locale === "ja") return title.split(/(?<=[、。])/).filter(Boolean);
  return title.split(" ");
}

function AnimatedHeadline({ title, locale }: { title: string; locale: Locale }) {
  const reduced = useReducedMotion();
  return <h1 id="hero-title" aria-label={title} className="hero-title mt-5 max-w-4xl font-display text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl"><span aria-hidden="true">{splitHeadline(title, locale).map((part, index) => <span className="word-mask" key={`${part}-${index}`}><motion.span initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .6, delay: reduced ? 0 : .14 + index * .06, ease: premiumEase }} className={part === "—" ? "text-primary" : undefined}>{part}</motion.span></span>)}</span></h1>;
}

function Marquee({ phrase }: { phrase: string }) { return <div className="marquee" aria-label={phrase}><div className="marquee-track"><span>{phrase}</span><span aria-hidden="true">{phrase}</span></div></div>; }

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.section id={id} className="premium-section relative scroll-mt-20 border-b border-border" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .6, ease: premiumEase }}><div className="page-shell relative"><div className="mb-12 grid gap-4 border-t border-border pt-5 sm:mb-16 sm:grid-cols-[9rem_1fr]">
    <motion.p className="eyebrow text-primary" initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35 }}>{number}</motion.p><div><h2 className="max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl">{title}</h2><BrushStroke /></div>
  </div>{children}</div></motion.section>;
}
function BrushStroke() { const reduced = useReducedMotion(); return <svg className="brush-stroke" viewBox="0 0 170 14" aria-hidden="true"><motion.path d="M3 9 C 38 5, 78 11, 166 4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" initial={reduced ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: .9 }} viewport={{ once: true }} transition={{ duration: .7, ease: "easeOut", delay: .15 }} /></svg>; }

function TestRunner({ c }: { c: Content }) { const [run, setRun] = useState(0); return <div className="test-runner mt-12 max-w-2xl" aria-label={c.hero.runnerAria}><div className="flex items-center gap-2 border-b border-terminal-line px-4 py-3"><span className="h-2 w-2 rounded-full bg-primary" /><span className="font-mono text-[10px] uppercase text-terminal-muted">{c.hero.runnerFile}</span></div><div className="space-y-2.5 p-4 sm:p-5" key={run}>{c.hero.tests.map((test, index) => <p key={test} className="test-line font-mono text-xs sm:text-sm" style={{ animationDelay: `${index * .45}s` }}><Check className="inline text-success" size={14} /> {test}</p>)}<div className="test-summary mt-4 flex items-center justify-between gap-3 border-t border-terminal-line pt-4"><p className="font-mono text-xs text-success">{c.hero.runnerSummary}</p><button className="runner-replay" onClick={() => setRun((value) => value + 1)}><RotateCcw size={12} /> {c.hero.runAgain}</button></div></div></div>; }

function Timeline({ c }: { c: Content }) {
  const reduced = useReducedMotion(); const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start .8", "end .55"] });
  return <div ref={ref} className="timeline max-w-4xl"><motion.div className="timeline-progress" style={{ scaleY: reduced ? 1 : scrollYProgress }} />{experienceItems.map(({ id, link }) => { const item = c.experience[id]; return <motion.article key={id} className="timeline-item pb-12 pl-9 last:pb-0" initial={reduced ? false : "idle"} whileInView="active" viewport={{ once: true, amount: .35 }}><motion.span className="timeline-dot" variants={{ idle: { scale: .65, backgroundColor: "var(--background)" }, active: { scale: 1, backgroundColor: "var(--primary)" } }} /><p className="font-mono text-xs text-primary">{item.period}</p><h3 className="mt-2 font-display text-2xl font-semibold">{item.role} <span className="text-muted-foreground">— {item.company}</span></h3>{item.place && <p className="mt-1 font-mono text-xs text-muted-foreground">{item.place}</p>}<p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{item.description}</p>{link && <a className="text-link mt-4 inline-flex items-center gap-1 text-sm" href={link} target="_blank" rel="noreferrer">{c.ui.visitCompany} <ArrowUpRight size={14} /></a>}</motion.article>; })}</div>;
}

function SkillCard({ skill, index }: { skill: Content["skills"][number]; index: number }) { const reduced = useReducedMotion(); const x = useMotionValue(-200); const y = useMotionValue(-200); const bg = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 13%, transparent), transparent 75%)`; return <motion.article className="skill-panel relative border-b border-r border-border p-6 sm:p-8" onMouseMove={(event) => { if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) { const rect = event.currentTarget.getBoundingClientRect(); x.set(event.clientX - rect.left); y.set(event.clientY - rect.top); } }} onMouseLeave={() => { x.set(-200); y.set(-200); }} style={{ backgroundImage: reduced ? undefined : bg }} initial="hidden" whileInView="shown" viewport={{ once: true, amount: .35 }}><p className="font-mono text-xs text-primary">0{index + 1}</p><h3 className="mt-5 font-display text-2xl font-semibold">{skill.title}</h3><div className="mt-6 flex flex-wrap gap-2">{skill.tags.map((tag, tagIndex) => <motion.span className="tag" key={tag} variants={{ hidden: { opacity: 0, scale: .94 }, shown: { opacity: 1, scale: 1, transition: { delay: reduced ? 0 : tagIndex * .04 } } }}>{tag}</motion.span>)}</div></motion.article>; }

function ProjectCard({ project, c, locale }: { project: Project; c: Content; locale: Locale }) {
  const reduced = useReducedMotion(); const [flipped, setFlipped] = useState(false);
  const copy = c.projects[project.slug as keyof Content["projects"]];
  return <motion.article layout initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .6, ease: premiumEase }} className="project-card-shell"><motion.div className="project-card-inner" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: reduced ? 0 : .5, ease: premiumEase }}>
    <div className="project-face project-front" aria-hidden={flipped}><Link to={projectPath(locale, project.slug)} tabIndex={flipped ? -1 : undefined} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ProjectVisual project={project} c={c} /><div className="pt-5"><div className="flex items-center justify-between gap-4"><p className="font-mono text-xs text-muted-foreground">{c.ui.categories[project.category]}</p><Status status={project.status} c={c} /></div><h3 className="mt-3 flex items-center justify-between gap-4 font-display text-3xl font-semibold">{copy.title}<ArrowUpRight className="shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} /></h3><p className="mt-3 leading-7 text-muted-foreground">{copy.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div></div></Link><button className="qa-trigger" tabIndex={flipped ? -1 : undefined} onClick={() => setFlipped(true)}><Play size={13} /> {c.ui.runChecks}</button></div>
    <div className="project-face project-back" aria-hidden={!flipped}><p className="eyebrow text-primary">QA / {project.slug}</p><h3 className="mt-4 font-display text-3xl font-semibold">{c.ui.checksPassed}</h3><div className="mt-7 space-y-4">{copy.qaChecks.map((check, index) => <motion.p key={check} className="flex gap-2 font-mono text-xs leading-6" initial={{ opacity: 0, x: -5 }} animate={flipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }} transition={{ delay: reduced ? 0 : .28 + index * .16 }}><Check className="mt-1 shrink-0 text-success" size={14} />{check}</motion.p>)}</div><button className="qa-trigger mt-auto" tabIndex={flipped ? undefined : -1} onClick={() => setFlipped(false)}><Undo2 size={13} /> {c.ui.backToCard}</button></div>
  </motion.div></motion.article>;
}

export function ProjectVisual({ project, c }: { project: Project; c: Content }) {
  const reduced = useReducedMotion();
  const copy = c.projects[project.slug as keyof Content["projects"]];
  return <motion.div className="project-visual" initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8, ease: premiumEase }}>{project.image ? <img src={project.image.url} alt={copy.imageAlt} loading="lazy" width="1280" height="800" style={{ objectPosition: project.image.position }} /> : <div className="project-placeholder"><span>{copy.title.slice(0, 2).toUpperCase()}</span><p>{c.ui.categories[project.category]} / {c.ui.status[statusKey(project.status)]}</p></div>}</motion.div>;
}

function Status({ status, c }: { status: ProjectStatus; c: Content }) { return <span className={`status ${status === "Live" ? "status-live" : "status-progress"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{c.ui.status[statusKey(status)]}</span>; }
function CredentialList({ title, items }: { title: string; items: readonly (readonly string[])[] }) { return <div><h3 className="eyebrow mb-7 text-primary">{title}</h3><div className="border-t border-border">{items.map((item) => <div className="border-b border-border py-5" key={item[0]}><p className="font-semibold">{item[0]}</p><p className="mt-1 text-sm text-muted-foreground">{item.slice(1).join(" · ")}</p></div>)}</div></div>; }

function BugButton({ id, fixed, onFix, className, c }: { id: string; fixed: boolean; onFix: (id: string) => void; className: string; c: Content }) { return <button className={`bug-target ${className} ${fixed ? "bug-fixed" : ""}`} onClick={() => onFix(id)} aria-label={fixed ? c.ui.bugs.fixed : c.ui.bugs.find}>{fixed ? <Check size={14} /> : <BugIcon />}</button>; }
function BugIcon() { return <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 5.3h6v5.2a3 3 0 0 1-6 0V5.3Zm1-2.2 1 2.2m3-2.2-1 2.2M2.5 7h2.4M11 7h2.5M2.5 10h2.4m6.1 0h2.5M4 13l1.4-1M12 13l-1.4-1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>; }

function Magnetic({ children }: { children: ReactNode }) { const x = useMotionValue(0); const y = useMotionValue(0); const reduced = useReducedMotion(); return <motion.span className="inline-flex" style={{ x, y }} onMouseMove={(event) => { if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return; const r = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - r.left - r.width / 2) * .12); y.set((event.clientY - r.top - r.height / 2) * .12); }} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>; }
function CustomCursor() { const x = useMotionValue(-30); const y = useMotionValue(-30); const [active, setActive] = useState(false); useEffect(() => { if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return; const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); }; const over = (e: MouseEvent) => setActive(Boolean((e.target as Element).closest("a,button,input,textarea"))); window.addEventListener("mousemove", move); document.addEventListener("mouseover", over); return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); }; }, [x, y]); return <motion.div className={`custom-cursor ${active ? "cursor-active" : ""}`} style={{ x, y }} aria-hidden="true" />; }

function CommandPalette({ open, onClose, c, locale }: { open: boolean; onClose: () => void; c: Content; locale: Locale }) {
  const t = getT(locale);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const downloadCv = () => { const anchor = document.createElement("a"); anchor.href = person.cv; anchor.download = "Tanzida_Nowshin_CV.pdf"; anchor.click(); };
  const commands: { label: string; href?: string; action?: () => void }[] = [
    ...navItems.map((id) => ({ label: c.nav[id], action: () => document.querySelector(`#${id}`)?.scrollIntoView() })),
    ...projects.map((project) => ({ label: String(t("ui.palette.projectPrefix", { title: c.projects[project.slug as keyof Content["projects"]].title })), href: projectPath(locale, project.slug) })),
    { label: c.ui.palette.downloadCv, action: downloadCv },
    { label: c.ui.palette.copyEmail, action: () => { void navigator.clipboard.writeText(person.email); setCopied(true); } },
  ];
  const shown = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 9);
  return <AnimatePresence>{open && <motion.div className="palette-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div role="dialog" aria-modal="true" aria-label={c.ui.palette.aria} className="command-palette" initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}><div className="flex items-center gap-3 border-b border-border px-4"><Search size={17} className="text-muted-foreground" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={c.ui.palette.placeholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" /><kbd>ESC</kbd></div><div className="max-h-96 overflow-y-auto p-2">{copied && <p className="px-3 py-2 font-mono text-xs text-success" role="status">{c.ui.palette.copied}</p>}{shown.map((item) => <button key={item.label} onClick={() => { if (item.href) window.location.assign(item.href); else item.action?.(); if (!item.href) onClose(); setQuery(""); }} className="command-item">{item.label === c.ui.palette.downloadCv ? <Download size={14} /> : item.label === c.ui.palette.copyEmail ? <Clipboard size={14} /> : <ArrowUpRight size={14} />}<span>{item.label}</span></button>)}</div></motion.div></motion.div>}</AnimatePresence>;
}

function ContactForm({ c }: { c: Content }) {
  const [errors, setErrors] = useState<Record<string, string>>({}); const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim(); const email = String(form.get("email") ?? "").trim(); const message = String(form.get("message") ?? "").trim();
    const next: Record<string, string> = {};
    if (!name || name.length > 100) next["name"] = c.ui.form.nameError;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) next["email"] = c.ui.form.emailError;
    if (message.length < 10 || message.length > 1000) next["message"] = c.ui.form.messageError;
    setErrors(next); if (!Object.keys(next).length) { setSent(true); event.currentTarget.reset(); }
  };
  return <form onSubmit={submit} noValidate className="space-y-5" aria-label={c.ui.form.aria}><Field label={c.ui.form.name} name="name" maxLength={100} error={errors["name"]} /><Field label={c.ui.form.email} name="email" type="email" maxLength={255} error={errors["email"]} /><div><label className="field-label" htmlFor="message">{c.ui.form.message}</label><textarea className="field min-h-36 resize-y" id="message" name="message" maxLength={1000} aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "message-error" : undefined} />{errors["message"] && <p className="field-error" id="message-error">{errors["message"]}</p>}</div><Button type="submit">{c.ui.form.send} <Send size={16} /></Button>{sent && <p className="border-l-2 border-success pl-4 text-sm" role="status">{c.ui.form.sent}</p>}</form>;
}
function Field({ label, name, error, ...props }: { label: string; name: string; error: string | undefined; type?: string; maxLength: number }) { return <div><label className="field-label" htmlFor={name}>{label}</label><input className="field" id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />{error && <p className="field-error" id={`${name}-error`}>{error}</p>}</div>; }
function Footer({ bugFixed, onFix, c }: { bugFixed: boolean; onFix: (id: string) => void; c: Content }) { return <footer className="relative py-8"><BugButton id="footer" fixed={bugFixed} onFix={onFix} className="left-1/2 top-1" c={c} /><div className="page-shell grid grid-cols-[auto_1fr_auto] items-center gap-4"><span className="seal">TN</span><p className="font-mono text-[10px] text-muted-foreground">{c.ui.copyright}</p><a className="nav-link flex items-center gap-2" href="#top">{c.ui.top} <ArrowUpRight size={13} /></a></div></footer>; }

export { homePath };
