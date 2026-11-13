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
    "I automate enterprise and M365 processes through ServiceNow, Azure and PowerShell, and connect legacy systems to cloud services and AI. A decade in enterprise IT and eight years at Burns & McDonnell, where I turned manual access, licensing, IP-address, backup and data workflows into supported automation. Examples include EfficientIP pool reservations, Revit server and ImaginIT Clarity automation, delegated manager access to departed employees' files, and ArcGIS backup and restore in Azure. Now at Murphy-Hoffman, bridging IBM i to Azure, and running an applied-AI operations platform I built and operate myself.",
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
