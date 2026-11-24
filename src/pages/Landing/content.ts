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
  roles: "Software & Platform Engineer — Integration, Automation & Applied AI | Remote-first",
  summary:
    "I build the integration and automation layer between legacy systems, cloud services, and AI — and the private systems that keep my own operation running. A decade in enterprise IT and eight years at Burns & McDonnell, where I turned manual access, licensing, IP-address, backup and data workflows into supported automation. Now at Murphy-Hoffman, bridging IBM i to Azure, Python and .NET, and operating a self-hosted platform of encrypted, evidence-first tools. Based in Las Vegas; remote-first, with hybrid considered for the right fit.",
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
    "Private / self-hosted systems",
    "Remote-first delivery",
  ],
  cta: { label: "View Projects", href: "/projects" },
  ctaSecondary: { label: "Contact Me", href: "/contact" },
  socials: [
    { label: "GitHub", href: "https://github.com/cscherer1" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cschere1" },
  ],
};
