import coverKizuna from "@/assets/cover-kizuna.jpg";
import coverLineBooking from "@/assets/cover-line-booking-agent.jpg";
import coverSakinah from "@/assets/cover-sakinah-alt.jpg";
import coverSentiment from "@/assets/cover-real-time-sentiment-dashboard.jpg";
import coverStockfix from "@/assets/cover-stockfix.jpg";
import shotBarilagbe from "@/assets/screenshot-barilagbe.jpg";
import shotSakinah from "@/assets/screenshot-sakinah.jpg";
import shotQuietCorner from "@/assets/screenshot-your-quiet-corner.jpg";

/** Stable, language-independent structure. All human-facing copy lives in /locales. */
export type ProjectCategory = "Client" | "Company" | "Personal";
export type ProjectStatus = "Live" | "In progress";

export type Project = {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tech: string[];
  link?: string;
  /** Bundled illustration used as the cover and as the fallback if a screenshot fails. */
  cover: string;
  /** Real product screenshot; `address` renders inside a browser-window frame. */
  screenshot?: { src: string; width: number; height: number; address?: string; position?: string };
};

export type SectionId = "about" | "skills" | "experience" | "projects" | "contact";

export const person = {
  email: "nowshinsara999@gmail.com",
  linkedin: "https://linkedin.com/in/tanzida-nowshin",
  github: "https://github.com/Tanzida999",
  cv: "/Tanzida_Nowshin_CV.pdf",
};

export const navItems: SectionId[] = ["about", "skills", "experience", "projects", "contact"];

export const experienceItems: { id: "akino" | "ecommerized" | "saras" | "touchandglow"; link?: string }[] = [
  { id: "akino" },
  { id: "ecommerized", link: "https://ecommerized.ai" },
  { id: "saras" },
  { id: "touchandglow" },
];

export const projects: Project[] = [
  {
    slug: "your-quiet-corner",
    category: "Personal",
    status: "Live",
    tech: ["TanStack Start", "Capacitor", "Supabase", "OpenRouter", "Firebase"],
    link: "https://yourquietcorner.co.uk",
    cover: coverSentiment,
    screenshot: { src: shotQuietCorner, width: 1600, height: 900, address: "yourquietcorner.co.uk" },
  },
  {
    slug: "barilagbe",
    category: "Client",
    status: "In progress",
    tech: ["Lovable", "React"],
    link: "https://barilagbe.lovable.app",
    cover: coverStockfix,
    screenshot: { src: shotBarilagbe, width: 1600, height: 900, address: "barilagbe99.netlify.app" },
  },
  {
    slug: "stockfix",
    category: "Client",
    status: "In progress",
    tech: ["TanStack Start", "TypeScript", "Supabase", "Tailwind"],
    link: "https://github.com/Tanzida999/stockfix",
    cover: coverStockfix,
  },
  {
    slug: "line-booking-agent",
    category: "Company",
    status: "In progress",
    tech: ["LINE", "AI agents", "APIs", "Automation"],
    cover: coverLineBooking,
  },
  {
    slug: "kizuna",
    category: "Company",
    status: "In progress",
    tech: ["LINE", "LLM APIs", "Prompt design", "Safety flows"],
    cover: coverKizuna,
  },
  {
    slug: "sakinah",
    category: "Personal",
    status: "In progress",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Tanzida999/Sakinah",
    cover: coverSakinah,
    screenshot: { src: shotSakinah, width: 900, height: 1827, position: "center 12%" },
  },
  {
    slug: "real-time-sentiment-dashboard",
    category: "Personal",
    status: "In progress",
    tech: ["AWS Kinesis", "Comprehend", "OpenSearch", "CloudWatch"],
    cover: coverSentiment,
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
