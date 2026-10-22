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
  roles: "Enterprise Automation & Systems Engineer",
  summary:
    "I automate and govern enterprise platforms: Microsoft 365 administration, Intune and Entra ID, PowerShell at scale, Zero Trust networking, and IBM i modernisation bridged to Azure. Applied AI, deployed governance-first.",
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
  ],
  cta: { label: "View Projects", href: "/projects" },
  ctaSecondary: { label: "Contact Me", href: "/contact" },
  socials: [
    { label: "GitHub", href: "https://github.com/cscherer1" }, // add your profile URL
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cschere1" }, // add your profile URL
  ],
};
