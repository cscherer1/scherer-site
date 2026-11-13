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
  roles: "Enterprise Integration & Automation Architect — Azure, ServiceNow & Applied AI",
  summary:
    "I design the integration and automation layer between legacy systems, cloud services and AI. Ten years in enterprise IT, eight at Burns & McDonnell, where I led the QTS platform's Azure modernization and automated licensing, archiving and data workflows that removed hundreds of administrative hours a year. Now bridging IBM i to Azure at Murphy-Hoffman, and building applied-AI operations tooling that I actually run.",
  specialties: [
    "Enterprise integration",
    "Solution architecture",
    "Azure",
    "ServiceNow",
    "IBM i / RPGLE",
    ".NET / C#",
    "Python",
    "REST / OAuth",
    "Workflow automation",
    "Cloudflare Zero Trust",
    "Docker / Linux",
    "PostgreSQL",
    "Applied AI",
    "LLM orchestration",
  ],
  cta: { label: "View Projects", href: "/projects" },
  ctaSecondary: { label: "Contact Me", href: "/contact" },
  socials: [
    { label: "GitHub", href: "https://github.com/cscherer1" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cschere1" },
  ],
};
