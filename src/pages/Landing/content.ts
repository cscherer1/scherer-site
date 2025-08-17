export type LandingContent = {
  owner: string;
  roles: string;
  tagline: string;
  cta: { label: string; href: string; newTab?: boolean };
};

export const landingContent: LandingContent = {
  owner: "Christian Scherer",
  roles: "Software Developer | Solutions Architect",
  tagline:
    "Full-stack developer focused on designing scalable solutions and solving complex problems.",
  cta: { label: "View Projects", href: "https://github.com/cscherer1", newTab: true },
};
