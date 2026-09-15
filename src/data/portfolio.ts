import barilagbeAsset from "@/assets/barilagbe-platform.webp.asset.json";
import sakinahAsset from "@/assets/sakinah-app.png.asset.json";
import quietCornerAsset from "@/assets/your-quiet-corner.webp.asset.json";

/** Stable, language-independent structure. All human-facing copy lives in /locales. */
export type ProjectCategory = "Client" | "Company" | "Personal";
export type ProjectStatus = "Live" | "In progress";

export type Project = {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tech: string[];
  link?: string;
  image?: { url: string; position?: string };
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
    image: { url: quietCornerAsset.url, position: "center 14%" },
  },
  {
    slug: "barilagbe",
    category: "Client",
    status: "In progress",
    tech: ["Lovable", "React"],
    link: "https://barilagbe.lovable.app",
    image: { url: barilagbeAsset.url, position: "center top" },
  },
  {
    slug: "stockfix",
    category: "Client",
    status: "In progress",
    tech: ["TanStack Start", "TypeScript", "Supabase", "Tailwind"],
    link: "https://github.com/Tanzida999/stockfix",
  },
  {
    slug: "line-booking-agent",
    category: "Company",
    status: "In progress",
    tech: ["LINE", "AI agents", "APIs", "Automation"],
  },
  {
    slug: "kizuna",
    category: "Company",
    status: "In progress",
    tech: ["LINE", "LLM APIs", "Prompt design", "Safety flows"],
  },
  {
    slug: "sakinah",
    category: "Personal",
    status: "In progress",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Tanzida999/Sakinah",
    image: { url: sakinahAsset.url, position: "center 12%" },
  },
  {
    slug: "real-time-sentiment-dashboard",
    category: "Personal",
    status: "In progress",
    tech: ["AWS Kinesis", "Comprehend", "OpenSearch", "CloudWatch"],
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
