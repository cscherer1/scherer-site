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
  roles: "Software Developer · Solutions Architect",
  summary:
    "Full-stack problem-solver focused on shipping reliable, scalable systems. I turn messy business problems into simple, maintainable software.",
  specialties: [
    "Full-stack",
    ".NET",
    "C#",
    "React",
    "Next.js",
    "SQL",
    "PostgreSQL",
    "Azure",
    "Docker",
    "CI/CD",
    "Javascript",
    "Typescript",
    "Python",
    "CSS",
    "HTML",
  ],
  cta: { label: "View Projects", href: "/projects" },
  ctaSecondary: { label: "Contact Me", href: "/contact" },
  socials: [
    { label: "GitHub", href: "https://github.com/cscherer1" }, // add your profile URL
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cschere1" }, // add your profile URL
  ],
};
