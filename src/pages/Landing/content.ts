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
    "I design the integration and automation layer between legacy systems, cloud services and AI. Ten years in enterprise IT, eight at Burns & McDonnell, where I automated enterprise and M365 processes through ServiceNow, Azure and PowerShell: access and licensing changes, IP-address management, backup and restore, and the reporting and data workflows around them. Examples include EfficientIP pool reservations, employee name changes, manager-requested access removal for departed employees, and ArcGIS backup and restore in Azure. I contributed to the QTS platform's Azure modernization as a developer. Now bridging IBM i to Azure at Murphy-Hoffman, and building applied-AI operations tooling that I actually run.",
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
