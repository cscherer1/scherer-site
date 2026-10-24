// src/pages/Landing/content.ts
export type LandingContent = {
  owner: string;
  roles: string;
  summary: string; // short elevator pitch under the headline
  specialties: string[]; // compact skill pills (not exhaustive)
  cta: { label: string; href: string; newTab?: boolean };
  ctaSecondary: { label: string; href: string; newTab?: boolean };
  socials: { label: string; href: string }[];
};

export const landingContent: LandingContent = {
  owner: "Christian Scherer",
  roles: "Full-Stack & AI Systems Engineer — Enterprise Automation, Cloud & Zero Trust",
  summary:
    "Full-stack and AI systems engineer: I build software, automation, and AI tooling that runs enterprises. Eight years modernizing Microsoft 365, ServiceNow, and IBM i platforms; REST APIs and .NET/Python services; n8n and LLM pipelines, RouteLLM routing, and agent stacks — all deployed governance-first under Zero Trust.",
  specialties: [
    "M365",
    "Intune",
    "Entra ID",
    "PowerShell",
    "IBM i",
    "RPG/CL",
    "ServiceNow",
    "Azure",
    "Docker",
    "Cloudflare Zero Trust",
    "Python",
    ".NET",
    "TypeScript",
    "Linux",
    "n8n",
    "FastAPI",
    "LLMs",
    "RouteLLM",
    "RAG",
    "React",
    "Next.js",
    "PostgreSQL",
    "REST APIs",
    "CI/CD",
    "GitHub Actions",
  ],
  cta: { label: "View Projects", href: "/projects" },
  ctaSecondary: { label: "Contact Me", href: "/contact" },
  socials: [
    { label: "GitHub", href: "https://github.com/cscherer1" }, // add your profile URL
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cschere1" }, // add your profile URL
  ],
};
