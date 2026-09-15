import barilagbeAsset from "@/assets/barilagbe-platform.webp.asset.json";
import sakinahAsset from "@/assets/sakinah-app.png.asset.json";
import quietCornerAsset from "@/assets/your-quiet-corner.webp.asset.json";

export type ProjectCategory = "Client" | "Company" | "Personal";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  overview: string;
  role: string;
  tech: string[];
  status: "Live" | "In progress";
  link?: string;
  image?: { url: string; alt: string; position?: string };
  features: string[];
  tested: string[];
  qaChecks: string[];
};

export const portfolio = {
  person: {
    name: "Tanzida Nowshin",
    email: "nowshinsara999@gmail.com",
    linkedin: "https://linkedin.com/in/tanzida-nowshin",
    github: "https://github.com/Tanzida999",
    location: "Japan",
  },
  nav: ["About", "Skills", "Experience", "Projects", "Contact"],
  hero: {
    label: "WEB DEVELOPER · AI-ASSISTED QA · JAPAN",
    title: "I build web products — and make sure they work.",
    description:
      "Full-stack developer using GitHub Copilot, Claude and modern AI tools to build, test and ship reliable web apps for clients in Japan, Bangladesh and the UK.",
    tests: [
      "builds full-stack web apps (React, Node.js, TypeScript)",
      "ships AI features with GitHub Copilot and Claude",
      "tests AI output and edge cases before release",
      "integrates APIs, automations and chatbots",
      "deploys to the cloud (AWS, Supabase)",
    ],
  },
  about: {
    paragraphs: [
      "I'm a web developer with a B.Sc. in Computer Science and Engineering from United International University. I've built websites, e-commerce stores, API integrations, chatbots and business automations for companies in Japan and Bangladesh.",
      "Today I build with AI coding tools every day — and I care just as much about checking what they produce. I'm now growing into AI-assisted software testing and QA, and I'm studying for AWS certifications alongside my work.",
    ],
    facts: [
      "Based in Japan",
      "Bangla / English / Japanese (JLPT N3, studying)",
      "AWS AI Practitioner (in progress)",
    ],
  },
  skills: [
    {
      title: "AI-assisted engineering",
      tags: ["GitHub Copilot", "Claude", "ChatGPT", "Gemini", "Lovable", "Prompt and agent design", "LLM API integration"],
    },
    {
      title: "Testing & QA",
      tags: ["Test case design", "Manual testing", "Exploratory testing", "Regression checks", "Real-device testing", "Troubleshooting", "Bug fixing"],
    },
    {
      title: "Development",
      tags: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "Express", "TanStack Start", "Tailwind CSS", "MongoDB", "MySQL", "Supabase"],
    },
    {
      title: "Cloud & business tools",
      tags: ["AWS", "EC2", "S3", "Kinesis", "Comprehend", "OpenSearch", "CloudWatch", "WordPress", "Shopify", "REST APIs", "Automation", "Chatbots"],
    },
  ],
  experience: [
    {
      role: "Web Developer / Designer",
      company: "Akino Group",
      place: "Japan",
      period: "Feb 2026 – Present",
      description: "Websites for clients and the company, server maintenance and performance, and company projects built with GitHub Copilot.",
      link: undefined,
    },
    {
      role: "Web Developer",
      company: "Ecommerized",
      place: undefined,
      period: "Jul 2025 – Jan 2026",
      description: "Client projects built with GitHub Copilot, chatbots across multiple websites, API integrations, sales and communication automations, technical support, and the Abu Dhabi Store Shopify site.",
      link: "https://ecommerized.ai",
    },
    {
      role: "Web Developer",
      company: "Sara's Collection BD",
      place: undefined,
      period: "2024 – 2025",
      description: "Created the business website, logo and complete brand identity.",
      link: undefined,
    },
    {
      role: "Founder",
      company: "Touch and Glow BD",
      place: undefined,
      period: "2023 – 2024",
      description: "Founded and ran an online product business through Facebook and Instagram.",
      link: undefined,
    },
  ],
  education: [
    ["B.Sc. Computer Science and Engineering", "United International University", "2019 – 2024"],
    ["Higher Secondary Certificate", "Begum Badrunnesa Govt. College", "2018"],
    ["Secondary School Certificate", "A.K. School and College", "2016"],
  ],
  certifications: [
    ["AWS Certified AI Practitioner", "In progress"],
    ["AWS Cloud Practitioner / Solutions Architect Associate", "In progress"],
    ["MERN Stack certificates", "Great Learning and Simplilearn · 2024"],
  ],
} as const;

export const projects: Project[] = [
  {
    slug: "your-quiet-corner",
    title: "Your Quiet Corner",
    category: "Personal",
    description: "An AI companion web and Android app for adults in the UK.",
    overview: "A private, calm space where adults can check in, reflect, and talk with an AI companion designed with emotional safety in mind.",
    role: "Full-stack development, AI safety testing, authentication debugging, Android packaging and real-device QA.",
    tech: ["TanStack Start", "Capacitor", "Supabase", "OpenRouter", "Firebase"],
    status: "Live",
    link: "https://yourquietcorner.co.uk",
    image: { url: quietCornerAsset.url, alt: "Your Quiet Corner mood check-in interface", position: "center 14%" },
    features: ["AI-guided emotional check-ins", "Web and Android experiences", "Google authentication", "Push notifications"],
    tested: ["Safety classifier with scripted conversations", "Google login recovery paths", "Push notifications on physical devices", "Responsive behaviour and conversation edge cases"],
    qaChecks: ["safety classifier test conversations", "Google login flow", "push notifications on a real Android device"],
  },
  {
    slug: "barilagbe",
    title: "Barilagbe",
    category: "Client",
    description: "A Bengali rental platform connecting Dhaka's tenants, owners, agents and lawyers.",
    overview: "A Bengali-first rental management experience intended to make finding, listing, managing and supporting homes in Dhaka more transparent.",
    role: "Product design and front-end development for a multi-sided local marketplace.",
    tech: ["Lovable", "React"],
    status: "In progress",
    link: "https://barilagbe.lovable.app",
    image: { url: barilagbeAsset.url, alt: "Barilagbe Bengali rental platform home page", position: "center top" },
    features: ["Bengali-language interface", "Tenant and owner journeys", "Agent discovery", "Legal support pathways"],
    tested: ["Bengali text wrapping", "Navigation and listing flows", "Responsive layouts", "Cross-browser presentation"],
    qaChecks: ["pages checked against client requirements", "search filters", "owner registration flow"],
  },
  {
    slug: "stockfix",
    title: "StockFix",
    category: "Client",
    description: "A UK marketplace connecting homeowners with trusted local tradespeople.",
    overview: "A role-based marketplace that coordinates jobs between homeowners and local trades, with oversight tools for administrators.",
    role: "Full-stack product development across homeowner, trade and administrative workflows.",
    tech: ["TanStack Start", "TypeScript", "Supabase", "Tailwind"],
    status: "In progress",
    link: "https://github.com/Tanzida999/stockfix",
    features: ["Homeowner dashboard", "Tradesperson dashboard", "Admin controls", "Job and account workflows"],
    tested: ["Role-based access paths", "Form validation", "Dashboard state changes", "Mobile and desktop usability"],
    qaChecks: ["sign-up and password reset", "trade search", "role dashboards"],
  },
  {
    slug: "line-booking-agent",
    title: "LINE Booking Agent",
    category: "Company",
    description: "An AI booking system for small Japanese businesses, operated through LINE.",
    overview: "A conversational booking flow that lets customers reserve services without leaving the messaging app they already use.",
    role: "Conversation design, integration planning and application development.",
    tech: ["LINE", "AI agents", "APIs", "Automation"],
    status: "In progress",
    features: ["Natural-language booking", "Availability handling", "Business-side notifications", "Japanese customer journey"],
    tested: ["Ambiguous booking requests", "Unavailable time slots", "Conversation recovery", "Japanese language variations"],
    qaChecks: ["ambiguous booking requests", "unavailable time slots", "conversation recovery"],
  },
  {
    slug: "kizuna",
    title: "Kizuna",
    category: "Company",
    description: "An emotional-support AI companion on LINE for elderly and isolated people in Japan.",
    overview: "A considerate companion concept designed around familiar messaging habits and the needs of people who may experience social isolation.",
    role: "Product concept, conversation design and safety-focused AI development.",
    tech: ["LINE", "LLM APIs", "Prompt design", "Safety flows"],
    status: "In progress",
    features: ["Low-friction LINE access", "Supportive conversations", "Japanese context", "Safety escalation concepts"],
    tested: ["Sensitive conversation paths", "Tone consistency", "Unexpected user input", "Clear boundaries and escalation wording"],
    qaChecks: ["sensitive conversation paths", "tone consistency", "unexpected input recovery"],
  },
  {
    slug: "sakinah",
    title: "Sakinah",
    category: "Personal",
    description: "A calm Islamic companion interface for everyday faith and reflection.",
    overview: "A mobile interface bringing together chat, prayer times, Qibla direction and daily remembrance in a focused experience.",
    role: "UI design and front-end prototyping across light and dark interface themes.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "In progress",
    link: "https://github.com/Tanzida999/Sakinah",
    image: { url: sakinahAsset.url, alt: "Sakinah Islamic companion mobile interface", position: "center 12%" },
    features: ["Companion chat", "Prayer schedule", "Qibla compass", "Dhikr and saved duas", "Light and dark themes"],
    tested: ["Mobile viewport layout", "Theme contrast", "Navigation clarity", "Long text and content states"],
    qaChecks: ["light and dark themes", "Qibla location permission", "dhikr counter"],
  },
  {
    slug: "real-time-sentiment-dashboard",
    title: "Real-Time Sentiment Dashboard",
    category: "Personal",
    description: "An AWS streaming data pipeline built alongside professional cloud studies.",
    overview: "A practical cloud project that ingests text, analyses sentiment and exposes operational signals through a searchable dashboard.",
    role: "Cloud architecture, pipeline configuration and observability setup.",
    tech: ["AWS Kinesis", "Comprehend", "OpenSearch", "CloudWatch"],
    status: "In progress",
    features: ["Streaming ingestion", "Sentiment analysis", "Searchable visualisation", "Operational monitoring"],
    tested: ["Event delivery", "Malformed input handling", "Analysis results", "CloudWatch alerts and logs"],
    qaChecks: ["event delivery", "malformed input handling", "CloudWatch alerts"],
  },
];