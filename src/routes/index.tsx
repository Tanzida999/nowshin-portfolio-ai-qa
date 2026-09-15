import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Clipboard, Download, Menu, Moon, Play, RotateCcw, Search, Send, Sun, Undo2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import portraitAsset from "@/assets/tanzida-photo-cutout.png.asset.json";
import { Button } from "@/components/ui/button";
import { portfolio, projects, type Project, type ProjectCategory } from "@/data/portfolio";

const description = "Web developer in Japan building reliable products with modern AI tools and growing into AI-assisted software testing and QA.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tanzida Nowshin — Web Developer & AI-Assisted QA" }, { name: "description", content: description },
      { property: "og:title", content: "Tanzida Nowshin — Web Developer & AI-Assisted QA" }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: "/" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const reduced = useReducedMotion();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
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
    setToast(next.length === 3 ? "All bugs fixed. This is what I do at work too — let’s talk." : `Bug fixed · ${next.length} of 3`);
  };

  return <div id="top" className="min-h-screen bg-background text-foreground">
    <motion.div className="reading-progress" style={{ scaleX: reduced ? 0 : progress }} />
    <CustomCursor />
    <p className="edge-japanese" aria-hidden="true">ウェブ開発者</p>
    <Header dark={dark} menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} onTheme={toggleTheme} onPalette={() => setPaletteOpen(true)} />
    <main>
      <section className="hero-grain editorial-grid min-h-[calc(100svh-5rem)] border-b border-border pt-20" aria-labelledby="hero-title">
        <div className="page-shell hero-layout grid min-h-[calc(100svh-5rem)] items-center gap-10 py-10 lg:grid-cols-[3fr_2fr] lg:py-12">
          <div className="hero-copy min-w-0">
            <motion.p className="eyebrow" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: premiumEase }}>{portfolio.hero.label}</motion.p>
            <AnimatedHeadline />
            <motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: reduced ? 0 : .65, ease: premiumEase }} className="mt-7 max-w-[65ch] text-[17px] leading-[1.7] text-muted-foreground">{portfolio.hero.description}</motion.p>
            <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: reduced ? 0 : .8, ease: premiumEase }} className="mt-8 flex flex-wrap gap-3"><Magnetic><Button asChild className="shine-button"><a href="#projects">View my work <ArrowDown size={16} /></a></Button></Magnetic><Magnetic><Button asChild variant="outline"><a href="/Tanzida_Nowshin_CV.pdf" download>Download CV <Download size={16} /></a></Button></Magnetic></motion.div>
            <TestRunner />
          </div>
          <HeroPortrait />
        </div>
        <a href="#about" className="scroll-indicator" aria-label="Scroll to About"><span>Scroll</span><i><b /></i></a>
      </section>

      <Marquee />

      <Section id="about" number="01" title="A builder with a tester's eye.">
        <BugButton id="about" fixed={bugs.includes("about")} onFix={fixBug} className="right-4 top-7" />
        <div className="max-w-4xl space-y-6 text-lg leading-8 sm:text-xl">{portfolio.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="mt-12 grid border-y border-border sm:grid-cols-3">{portfolio.about.facts.map((fact) => <p key={fact} className="border-border px-0 py-5 font-mono text-xs text-muted-foreground sm:border-r sm:px-5 first:pl-0 last:border-0">{fact}</p>)}</div>
      </Section>

      <Section id="skills" number="02" title="Tools, craft and judgement.">
        <BugButton id="skills" fixed={bugs.includes("skills")} onFix={fixBug} className="bottom-5 right-5" />
        <div className="grid border-l border-t border-border md:grid-cols-2">{portfolio.skills.map((skill, index) => <SkillCard key={skill.title} skill={skill} index={index} />)}</div>
      </Section>

      <Section id="experience" number="03" title="Work, across markets.">
        <Timeline />
      </Section>

      <Section id="projects" number="04" title="Selected work.">
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border" role="group" aria-label="Filter projects">{(["All", "Client", "Company", "Personal"] as const).map((tab) => <button key={tab} onClick={() => setFilter(tab)} className={`filter-tab ${filter === tab ? "filter-tab-active" : ""}`} aria-pressed={filter === tab}>{tab}</button>)}</div>
        <motion.div layout className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          <AnimatePresence mode="popLayout">{projects.filter((project) => filter === "All" || project.category === filter).map((project) => <ProjectCard project={project} key={project.slug} />)}</AnimatePresence>
        </motion.div>
      </Section>

      <Section id="education" number="05" title="Learning, continuously."><div className="grid gap-14 lg:grid-cols-2"><CredentialList title="Education" items={portfolio.education} /><CredentialList title="Certifications" items={portfolio.certifications} /></div></Section>
      <Section id="contact" number="06" title="Let's build something reliable."><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="max-w-md leading-7 text-muted-foreground">Have a product to build, a workflow to improve, or software that needs a careful second look? I’d like to hear about it.</p><div className="mt-8 flex flex-col items-start gap-4"><a className="text-link" href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}</a><a className="text-link" href={portfolio.person.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a className="text-link" href={portfolio.person.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div></div><ContactForm /></div></Section>
    </main>
    <Footer bugFixed={bugs.includes("footer")} onFix={fixBug} />
    <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    <AnimatePresence>{toast && <motion.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bug-toast"><p>{toast}</p>{bugs.length === 3 && <Button size="sm" onClick={() => { document.querySelector("#contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); setToast(null); }}>Contact</Button>}<button aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={15} /></button></motion.div>}</AnimatePresence>
  </div>;
}

function Header({ dark, menuOpen, onMenu, onTheme, onPalette }: { dark: boolean; menuOpen: boolean; onMenu: () => void; onTheme: () => void; onPalette: () => void }) {
  const reduced = useReducedMotion(); const [stamp, setStamp] = useState(false);
  useEffect(() => { try { if (!sessionStorage.getItem("tn-stamped")) { setStamp(true); sessionStorage.setItem("tn-stamped", "1"); } } catch { setStamp(true); } }, []);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"><div className="page-shell grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4">
    <motion.a href="#top" className="seal relative" aria-label="Tanzida Nowshin, back to top" initial={stamp && !reduced ? { scale: 1.6, rotate: -9, y: -18 } : false} animate={{ scale: 1, rotate: 0, y: 0 }} transition={{ type: "spring", stiffness: 280, damping: 14 }}><span>TN</span>{stamp && !reduced && <motion.i className="stamp-ring" initial={{ scale: .65, opacity: .6 }} animate={{ scale: 1.75, opacity: 0 }} transition={{ duration: .75, delay: .18 }} />}</motion.a>
    <nav className="hidden justify-center gap-7 lg:flex" aria-label="Main navigation">{portfolio.nav.map((item) => <a className="nav-link" href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav>
    <div className="flex items-center justify-end gap-2"><button className="command-hint hidden xl:inline-flex" onClick={onPalette}><Search size={13} />⌘K</button><Button asChild variant="outline" className="hidden sm:inline-flex"><a href="/Tanzida_Nowshin_CV.pdf" download>Download CV</a></Button><Button variant="icon" aria-label={`Switch to ${dark ? "light" : "dark"} mode`} onClick={onTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</Button><Button variant="icon" className="lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={onMenu}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</Button></div>
  </div>{menuOpen && <nav className="border-t border-border bg-background px-6 py-5 lg:hidden" aria-label="Mobile navigation">{portfolio.nav.map((item) => <a className="block border-b border-border py-3 font-mono text-sm" href={`#${item.toLowerCase()}`} onClick={onMenu} key={item}>{item}</a>)}</nav>}</header>;
}

function HeroPortrait() {
  const reduced = useReducedMotion(); const ref = useRef<HTMLDivElement>(null); const photoX = useMotionValue(0); const photoY = useMotionValue(0); const circleX = useMotionValue(0); const circleY = useMotionValue(0);
  const move = (event: ReactMouseEvent<HTMLDivElement>) => { if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine) and (min-width: 1024px)").matches) return; const box = ref.current?.getBoundingClientRect(); if (!box) return; const nx = (event.clientX - box.left) / box.width - .5; const ny = (event.clientY - box.top) / box.height - .5; photoX.set(nx * 16); photoY.set(ny * 16); circleX.set(nx * -8); circleY.set(ny * -8); };
  const reset = () => { photoX.set(0); photoY.set(0); circleX.set(0); circleY.set(0); };
  return <div className="hero-portrait-wrap mx-auto self-center"><div ref={ref} className="portrait-pop-stage" onMouseMove={move} onMouseLeave={reset}>
    <motion.div className="portrait-circle" style={{ x: circleX, y: circleY }} initial={reduced ? false : { opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, ease: premiumEase }} />
    <svg className="portrait-ring" viewBox="0 0 100 100" aria-hidden="true"><motion.circle cx="50" cy="50" r="48.8" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: reduced ? 0 : .45, ease: premiumEase }} /></svg>
    <motion.div className="portrait-person" style={{ x: photoX, y: photoY }} initial={reduced ? false : { opacity: 0, translateY: 24 }} animate={reduced ? { opacity: 1 } : { opacity: 1, translateY: [24, 0, -4, 0] }} transition={reduced ? { duration: 0 } : { opacity: { duration: .8, delay: .2 }, translateY: { duration: 6, delay: .2, times: [0, .14, .57, 1], repeat: Infinity, ease: "easeInOut" } }}>
      <img src={portraitAsset.url} alt="Tanzida Nowshin in her graduation gown and cap" width="690" height="866" fetchPriority="high" />
    </motion.div>
  </div><div className="availability"><span />Open to work · Japan</div></div>;
}

const premiumEase = [0.22, 1, 0.36, 1] as const;
function AnimatedHeadline() { const reduced = useReducedMotion(); return <h1 id="hero-title" className="hero-title mt-5 max-w-4xl font-display text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">{portfolio.hero.title.split(" ").map((word, index) => <span className="word-mask" key={`${word}-${index}`}><motion.span initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .6, delay: reduced ? 0 : .14 + index * .06, ease: premiumEase }} className={word === "—" ? "text-primary" : undefined}>{word}</motion.span></span>)}</h1>; }
function Marquee() { const reduced = useReducedMotion(); const phrase = "React · TypeScript · GitHub Copilot · Testing · AWS · Supabase ·"; return <div className="marquee" aria-label={phrase}><motion.div animate={reduced ? false : { x: ["0%", "-50%"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}><span>{phrase}</span><span aria-hidden="true">{phrase}</span></motion.div></div>; }

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.section id={id} className="premium-section relative scroll-mt-20 border-b border-border" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .6, ease: premiumEase }}><div className="page-shell relative"><div className="mb-12 grid gap-4 border-t border-border pt-5 sm:mb-16 sm:grid-cols-[9rem_1fr]">
    <motion.p className="eyebrow text-primary" initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35 }}>{number}</motion.p><div><h2 className="max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl">{title}</h2><BrushStroke /></div>
  </div>{children}</div></motion.section>;
}
function BrushStroke() { const reduced = useReducedMotion(); return <svg className="brush-stroke" viewBox="0 0 170 14" aria-hidden="true"><motion.path d="M3 9 C 38 5, 78 11, 166 4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" initial={reduced ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: .9 }} viewport={{ once: true }} transition={{ duration: .7, ease: "easeOut", delay: .15 }} /></svg>; }

function TestRunner() { const [run, setRun] = useState(0); return <div className="test-runner mt-12 max-w-2xl" aria-label="Five development and testing capabilities passed"><div className="flex items-center gap-2 border-b border-terminal-line px-4 py-3"><span className="h-2 w-2 rounded-full bg-primary" /><span className="font-mono text-[10px] uppercase text-terminal-muted">reliability-check.test.ts</span></div><div className="space-y-2.5 p-4 sm:p-5" key={run}>{portfolio.hero.tests.map((test, index) => <p key={test} className="test-line font-mono text-xs sm:text-sm" style={{ animationDelay: `${index * .45}s` }}><Check className="inline text-success" size={14} /> {test}</p>)}<div className="test-summary mt-4 flex items-center justify-between gap-3 border-t border-terminal-line pt-4"><p className="font-mono text-xs text-success">5 passed · 0 failed</p><button className="runner-replay" onClick={() => setRun((value) => value + 1)}><RotateCcw size={12} /> Run again</button></div></div></div>; }

function Timeline() { const reduced = useReducedMotion(); const ref = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start .8", "end .55"] }); return <div ref={ref} className="timeline max-w-4xl"><motion.div className="timeline-progress" style={{ scaleY: reduced ? 1 : scrollYProgress }} />{portfolio.experience.map((item) => <motion.article key={`${item.company}-${item.period}`} className="timeline-item pb-12 pl-9 last:pb-0" initial={reduced ? false : "idle"} whileInView="active" viewport={{ once: true, amount: .35 }}><motion.span className="timeline-dot" variants={{ idle: { scale: .65, backgroundColor: "var(--background)" }, active: { scale: 1, backgroundColor: "var(--primary)" } }} /><p className="font-mono text-xs text-primary">{item.period}</p><h3 className="mt-2 font-display text-2xl font-semibold">{item.role} <span className="text-muted-foreground">— {item.company}</span></h3>{item.place && <p className="mt-1 font-mono text-xs text-muted-foreground">{item.place}</p>}<p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{item.description}</p>{item.link && <a className="text-link mt-4 inline-flex items-center gap-1 text-sm" href={item.link} target="_blank" rel="noreferrer">Visit company <ArrowUpRight size={14} /></a>}</motion.article>)}</div>; }

function SkillCard({ skill, index }: { skill: (typeof portfolio.skills)[number]; index: number }) { const reduced = useReducedMotion(); const x = useMotionValue(-200); const y = useMotionValue(-200); const bg = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 13%, transparent), transparent 75%)`; return <motion.article className="skill-panel relative border-b border-r border-border p-6 sm:p-8" onMouseMove={(event) => { if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) { const rect = event.currentTarget.getBoundingClientRect(); x.set(event.clientX - rect.left); y.set(event.clientY - rect.top); } }} onMouseLeave={() => { x.set(-200); y.set(-200); }} style={{ backgroundImage: reduced ? undefined : bg }} initial="hidden" whileInView="shown" viewport={{ once: true, amount: .35 }}><p className="font-mono text-xs text-primary">0{index + 1}</p><h3 className="mt-5 font-display text-2xl font-semibold">{skill.title}</h3><div className="mt-6 flex flex-wrap gap-2">{skill.tags.map((tag, tagIndex) => <motion.span className="tag" key={tag} variants={{ hidden: { opacity: 0, scale: .94 }, shown: { opacity: 1, scale: 1, transition: { delay: reduced ? 0 : tagIndex * .04 } } }}>{tag}</motion.span>)}</div></motion.article>; }

function ProjectCard({ project }: { project: Project }) { const reduced = useReducedMotion(); const [flipped, setFlipped] = useState(false); return <motion.article layout initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .6, ease: premiumEase }} className="project-card-shell"><motion.div className="project-card-inner" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: reduced ? 0 : .5, ease: premiumEase }}>
  <div className="project-face project-front" aria-hidden={flipped}><Link to="/projects/$slug" params={{ slug: project.slug }} tabIndex={flipped ? -1 : undefined} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ProjectVisual project={project} /><div className="pt-5"><div className="flex items-center justify-between gap-4"><p className="font-mono text-xs text-muted-foreground">{project.category}</p><Status status={project.status} /></div><h3 className="mt-3 flex items-center justify-between gap-4 font-display text-3xl font-semibold">{project.title}<ArrowUpRight className="shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} /></h3><p className="mt-3 leading-7 text-muted-foreground">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div></div></Link><button className="qa-trigger" tabIndex={flipped ? -1 : undefined} onClick={() => setFlipped(true)}><Play size={13} /> Run checks</button></div>
  <div className="project-face project-back" aria-hidden={!flipped}><p className="eyebrow text-primary">QA / {project.slug}</p><h3 className="mt-4 font-display text-3xl font-semibold">Checks passed.</h3><div className="mt-7 space-y-4">{project.qaChecks.map((check, index) => <motion.p key={check} className="flex gap-2 font-mono text-xs leading-6" initial={{ opacity: 0, x: -5 }} animate={flipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }} transition={{ delay: reduced ? 0 : .28 + index * .16 }}><Check className="mt-1 shrink-0 text-success" size={14} />{check}</motion.p>)}</div><button className="qa-trigger mt-auto" tabIndex={flipped ? undefined : -1} onClick={() => setFlipped(false)}><Undo2 size={13} /> Back</button></div>
  </motion.div></motion.article>; }

function ProjectVisual({ project }: { project: Project }) { const reduced = useReducedMotion(); return <motion.div className="project-visual" initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8, ease: premiumEase }}>{project.image ? <img src={project.image.url} alt={project.image.alt} loading="lazy" width="1280" height="800" style={{ objectPosition: project.image.position }} /> : <div className="project-placeholder"><span>{project.title.slice(0, 2).toUpperCase()}</span><p>{project.category} / {project.status}</p></div>}</motion.div>; }
function Status({ status }: { status: "Live" | "In progress" }) { return <span className={`status ${status === "Live" ? "status-live" : "status-progress"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>; }
function CredentialList({ title, items }: { title: string; items: readonly (readonly string[])[] }) { return <div><h3 className="eyebrow mb-7 text-primary">{title}</h3><div className="border-t border-border">{items.map((item) => <div className="border-b border-border py-5" key={item[0]}><p className="font-semibold">{item[0]}</p><p className="mt-1 text-sm text-muted-foreground">{item.slice(1).join(" · ")}</p></div>)}</div></div>; }

function BugButton({ id, fixed, onFix, className }: { id: string; fixed: boolean; onFix: (id: string) => void; className: string }) { return <button className={`bug-target ${className} ${fixed ? "bug-fixed" : ""}`} onClick={() => onFix(id)} aria-label={fixed ? "Bug fixed" : "Find and fix hidden bug"}>{fixed ? <Check size={14} /> : <BugIcon />}</button>; }
function BugIcon() { return <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 5.3h6v5.2a3 3 0 0 1-6 0V5.3Zm1-2.2 1 2.2m3-2.2-1 2.2M2.5 7h2.4M11 7h2.5M2.5 10h2.4m6.1 0h2.5M4 13l1.4-1M12 13l-1.4-1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>; }

function Magnetic({ children }: { children: ReactNode }) { const x = useMotionValue(0); const y = useMotionValue(0); const reduced = useReducedMotion(); return <motion.span className="inline-flex" style={{ x, y }} onMouseMove={(event) => { if (reduced || !window.matchMedia("(hover:hover) and (pointer:fine)").matches) return; const r = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - r.left - r.width / 2) * .12); y.set((event.clientY - r.top - r.height / 2) * .12); }} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>; }
function CustomCursor() { const x = useMotionValue(-30); const y = useMotionValue(-30); const [active, setActive] = useState(false); useEffect(() => { if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return; const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); }; const over = (e: MouseEvent) => setActive(Boolean((e.target as Element).closest("a,button,input,textarea"))); window.addEventListener("mousemove", move); document.addEventListener("mouseover", over); return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); }; }, [x, y]); return <motion.div className={`custom-cursor ${active ? "cursor-active" : ""}`} style={{ x, y }} aria-hidden="true" />; }

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) { const [query, setQuery] = useState(""); const downloadCv = () => { const anchor = document.createElement("a"); anchor.href = "/Tanzida_Nowshin_CV.pdf"; anchor.download = "Tanzida_Nowshin_CV.pdf"; anchor.click(); }; const commands = [...portfolio.nav.map((label) => ({ label, action: () => document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView() })), ...projects.map((project) => ({ label: `Project: ${project.title}`, href: `/projects/${project.slug}` })), { label: "Download CV", action: downloadCv }, { label: "Copy email address", action: () => navigator.clipboard.writeText(portfolio.person.email) }]; const shown = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 9); return <AnimatePresence>{open && <motion.div className="palette-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div role="dialog" aria-modal="true" aria-label="Quick navigation" className="command-palette" initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}><div className="flex items-center gap-3 border-b border-border px-4"><Search size={17} className="text-muted-foreground" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Jump to a section or project…" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" /><kbd>ESC</kbd></div><div className="max-h-96 overflow-y-auto p-2">{shown.map((item) => <button key={item.label} onClick={() => { if ("href" in item) window.location.assign(item.href); else item.action(); onClose(); setQuery(""); }} className="command-item">{item.label === "Download CV" ? <Download size={14} /> : item.label.includes("email") ? <Clipboard size={14} /> : <ArrowUpRight size={14} />}<span>{item.label}</span></button>)}</div></motion.div></motion.div>}</AnimatePresence>; }

function ContactForm() { const [errors, setErrors] = useState<Record<string, string>>({}); const [sent, setSent] = useState(false); const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get("name") ?? "").trim(); const email = String(form.get("email") ?? "").trim(); const message = String(form.get("message") ?? "").trim(); const next: Record<string, string> = {}; if (!name || name.length > 100) next["name"] = "Please enter your name (up to 100 characters)."; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) next["email"] = "Please enter a valid email address."; if (message.length < 10 || message.length > 1000) next["message"] = "Please enter a message between 10 and 1,000 characters."; setErrors(next); if (!Object.keys(next).length) { setSent(true); event.currentTarget.reset(); } }; return <form onSubmit={submit} noValidate className="space-y-5" aria-label="Contact form"><Field label="Name" name="name" maxLength={100} error={errors["name"]} /><Field label="Email" name="email" type="email" maxLength={255} error={errors["email"]} /><div><label className="field-label" htmlFor="message">Message</label><textarea className="field min-h-36 resize-y" id="message" name="message" maxLength={1000} aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "message-error" : undefined} />{errors["message"] && <p className="field-error" id="message-error">{errors["message"]}</p>}</div><Button type="submit">Send message <Send size={16} /></Button>{sent && <p className="border-l-2 border-success pl-4 text-sm" role="status">Thank you — your message is ready. Please email me directly if you need an immediate reply.</p>}</form>; }
function Field({ label, name, error, ...props }: { label: string; name: string; error: string | undefined; type?: string; maxLength: number }) { return <div><label className="field-label" htmlFor={name}>{label}</label><input className="field" id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} {...props} />{error && <p className="field-error" id={`${name}-error`}>{error}</p>}</div>; }
function Footer({ bugFixed, onFix }: { bugFixed: boolean; onFix: (id: string) => void }) { return <footer className="relative py-8"><BugButton id="footer" fixed={bugFixed} onFix={onFix} className="left-1/2 top-1" /><div className="page-shell grid grid-cols-[auto_1fr_auto] items-center gap-4"><span className="seal">TN</span><p className="font-mono text-[10px] text-muted-foreground">© 2026 Tanzida Nowshin</p><a className="nav-link flex items-center gap-2" href="#top">Top <ArrowUpRight size={13} /></a></div></footer>; }