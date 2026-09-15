# Tanzida's Studio

Build a personal portfolio website for Tanzida Nowshin, a web developer moving into AI-assisted software testing and QA, based in Japan. Single-page site with smooth scroll navigation, plus a separate page for each project. It must look professional, calm and unique, not like a generic developer template.

DESIGN DIRECTION — "Japanese editorial minimalism"
- Background: warm off-white paper tone (#F7F4EE). Text: soft ink black (#1C1B19). One accent colour only: vermilion red like a Japanese hanko seal (#C8412D). Muted grey for secondary text (#6B675F).
- Dark mode: deep ink background (#141312), off-white text, same vermilion accent. Add a light/dark toggle and respect the system setting.
- Fonts: "Fraunces" (serif) for large headings, "Inter" for body text, "JetBrains Mono" for small technical labels, tags and the test runner.
- Logo: a small square vermilion seal with the white initials "TN", styled like a hanko stamp.
- Layout: lots of white space, a thin 1px hairline grid, section numbers in mono font (01, 02, 03...), large serif headings, left-aligned text.
- Motion: subtle only. Sections fade up gently on scroll, links get an underline that draws in from the left, and project cards lift slightly on hover. Respect prefers-reduced-motion.
- No stock photos, no fake testimonials, no fake counters or statistics, no emojis in headings.

SECTIONS

1. NAV (sticky, blurred background): TN seal logo | About · Skills · Experience · Projects · Contact | "Download CV" button (links to /Tanzida_Nowshin_CV.pdf) | theme toggle.

2. HERO
- Small mono label: "WEB DEVELOPER · AI-ASSISTED QA · JAPAN"
- Big serif heading: "I build web products — and make sure they work."
- Subtext: "Full-stack developer using GitHub Copilot, Claude and modern AI tools to build, test and ship reliable web apps for clients in Japan, Bangladesh and the UK."
- Buttons: "View my work" (scroll to Projects) and "Download CV".
- Right side: a round profile photo placeholder (I will upload my photo) with a thin vermilion ring.
- SIGNATURE ELEMENT: below the text, a small terminal-style "test runner" card in mono font that types out these lines one by one with green check marks, then shows a final summary line:
  ✓ builds full-stack web apps (React, Node.js, TypeScript)
  ✓ ships AI features with GitHub Copilot and Claude
  ✓ tests AI output and edge cases before release
  ✓ integrates APIs, automations and chatbots
  ✓ deploys to the cloud (AWS, Supabase)
  "5 passed · 0 failed"

3. ABOUT (01)
Two short paragraphs: "I'm a web developer with a B.Sc. in Computer Science and Engineering from United International University. I've built websites, e-commerce stores, API integrations, chatbots and business automations for companies in Japan and Bangladesh. Today I build with AI coding tools every day — and I care just as much about checking what they produce. I'm now growing into AI-assisted software testing and QA, and I'm studying for AWS certifications alongside my work."
Small facts row in mono font: Based in Japan · Bangla / English / Japanese (JLPT N3, studying) · AWS AI Practitioner (in progress)

4. SKILLS (02) — grid of 4 cards, each with a title and tag chips:
- AI-assisted engineering: GitHub Copilot, Claude, ChatGPT, Gemini, Lovable, prompt and agent design, LLM API integration
- Testing & QA: test case design, manual and exploratory testing, regression checks, real-device testing, troubleshooting, bug fixing
- Development: JavaScript, TypeScript, Python, React, Node.js, Express, TanStack Start, Tailwind CSS, MongoDB, MySQL, Supabase
- Cloud & business tools: AWS (EC2, S3, Kinesis, Comprehend, OpenSearch, CloudWatch), WordPress, Shopify, REST APIs, automation, chatbots

5. EXPERIENCE (03) — vertical timeline with a thin line and vermilion dots:
- Web Developer / Designer — Akino Group (Japan) · Feb 2026 – Present: websites for clients and the company, server maintenance and performance, building company projects with GitHub Copilot.
- Web Developer — Ecommerized · Jul 2025 – Jan 2026: client projects built with GitHub Copilot, chatbots on multiple websites, API integrations, sales and communication automations, technical support for the sales and business development teams, the Abu Dhabi Store Shopify site. Link: https://ecommerized.ai
- Web Developer — Sara's Collection BD · 2024 – 2025: business website, logo and brand identity.
- Founder — Touch and Glow BD · 2023 – 2024: ran an online product business through Facebook and Instagram.

6. PROJECTS (04) — filter tabs: All · Client · Company · Personal. Cards with a screenshot area (placeholder I will replace), title, one-line description, tech chips, status badge ("Live" in green, "In progress" in amber) and links. Each card opens its own project page with: overview, my role, tech stack, key features, what I tested, and screenshots.
- Your Quiet Corner — AI companion web and Android app for UK adults. Safety classifier tested with scripted conversations, Google login fix, push notifications tested on real devices. Tech: TanStack Start, Capacitor, Supabase, OpenRouter, Firebase. Status: Live. Link: https://yourquietcorner.co.uk · Tab: Personal
- Barilagbe — Bengali-language rental management platform for Dhaka connecting tenants, owners, local agents and lawyers. Tech: Lovable, React. Status: In progress. Link: https://barilagbe.lovable.app · Tab: Client
- StockFix — UK marketplace connecting homeowners with local tradespeople, with homeowner, trade and admin dashboards. Tech: TanStack Start, TypeScript, Supabase, Tailwind. Status: In progress. Link: https://github.com/Tanzida999/stockfix · Tab: Client
- LINE Booking Agent — AI booking system for small Japanese businesses, where customers book through LINE. Status: In progress. No link. · Tab: Company
- Kizuna — emotional-support AI companion on LINE for elderly and isolated people in Japan. Status: In progress. No link. · Tab: Company
- Sakinah — UI design for an Islamic companion app with chat, prayer times, Qibla compass, and light/dark themes. Tech: HTML, CSS, JavaScript. Status: In progress. Link: https://github.com/Tanzida999/Sakinah · Tab: Personal
- Real-Time Sentiment Dashboard — AWS data pipeline with Kinesis, Comprehend, OpenSearch and CloudWatch, built alongside my AWS studies. Status: In progress. · Tab: Personal

7. EDUCATION & CERTIFICATIONS (05) — two columns:
- B.Sc. Computer Science and Engineering, United International University (2019 – 2024); HSC, Begum Badrunnesa Govt. College (2018); SSC, A.K. School and College (2016)
- AWS Certified AI Practitioner (in progress), AWS Cloud Practitioner / Solutions Architect Associate (in progress), MERN Stack certificates from Great Learning and Simplilearn (2024)

8. CONTACT (06)
Large serif heading: "Let's build something reliable."
Email button: nowshinsara999@gmail.com (mailto link) · LinkedIn: https://linkedin.com/in/tanzida-nowshin · GitHub: https://github.com/Tanzida999
Simple contact form (name, email, message) with validation and a success message. Do NOT show a phone number anywhere on the site.

9. FOOTER: TN seal, "© 2026 Tanzida Nowshin", small links, back-to-top button.

TECHNICAL REQUIREMENTS
- Fully responsive: mobile first, looks great from 360px phones to large desktops.
- Fast: lazy-load images, no heavy libraries.
- Accessible: good colour contrast, alt text on every image, keyboard navigation, visible focus states.
- SEO: page title "Tanzida Nowshin — Web Developer & AI-Assisted QA", meta description, Open Graph image and tags so the link previews nicely on LinkedIn.
- Put all text content in one data file so I can edit projects and experience easily later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a3868111-aaed-4abe-bbc5-55d020926140).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
