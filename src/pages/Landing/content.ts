export type LandingContent = {
  owner: string;
  roles: string;
  tagline: string;
  cta: { label: string; href: string };
};

export const landingContent: LandingContent = {
  owner: "Christian Scherer",
  roles: "Software Developer | Solutions Architect",
  tagline:
    "Full-stack developer focused on designing scalable solutions and solving complex problems.",
  cta: { label: "View Projects", href: "#projects" }
};
