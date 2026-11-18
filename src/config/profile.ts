// Public profile and contact details.
//
// This file is the single source of truth for everything a visitor sees about
// the operator. Every value can be overridden at build time with a VITE_*
// environment variable (see .env.example), so a move, a new phone number or a
// new resume file never needs a source edit. The defaults below are the
// current live profile.

const env = import.meta.env;

export type Phone = {
  label: string;
  number: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

const DEFAULT_PHONES: Phone[] = [
  { label: "US Phone", number: "+1 (910) 333-7347" },
  { label: "UK Phone", number: "+44 7522 346480" },
];

function parsePhones(raw: string | undefined): Phone[] {
  if (!raw) return DEFAULT_PHONES;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_PHONES;
    const phones = parsed
      .filter(
        (p): p is { label?: unknown; number?: unknown } =>
          typeof p === "object" && p !== null
      )
      .map((p) => ({
        label: typeof p.label === "string" && p.label.trim() ? p.label.trim() : "Phone",
        number: typeof p.number === "string" ? p.number.trim() : "",
      }))
      .filter((p) => p.number);
    return phones.length ? phones : DEFAULT_PHONES;
  } catch {
    return DEFAULT_PHONES;
  }
}

function parseLinks(raw: string | undefined): ContactLink[] {
  const fallback: ContactLink[] = [
    { label: "GitHub", href: "https://github.com/cscherer1" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/cschere1" },
  ];
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    const links = parsed
      .filter(
        (l): l is { label?: unknown; href?: unknown } =>
          typeof l === "object" && l !== null
      )
      .map((l) => ({
        label: typeof l.label === "string" ? l.label.trim() : "",
        href: typeof l.href === "string" ? l.href.trim() : "",
      }))
      .filter((l) => l.label && l.href);
    return links.length ? links : fallback;
  } catch {
    return fallback;
  }
}

export const profile = {
  name: env.VITE_PROFILE_NAME || "Christian Scherer",
  email: env.VITE_CONTACT_EMAIL || "cschere1@gmail.com",
  phones: parsePhones(env.VITE_CONTACT_PHONES),
  location: env.VITE_CONTACT_LOCATION || "Las Vegas, NV",
  relocation: env.VITE_RELOCATION_TARGET ?? "Brighton / Greater London, UK (potential)",
  citizenship: env.VITE_CITIZENSHIP || "US/UK dual citizen",
  sponsorship: env.VITE_SPONSORSHIP_NOTE || "no UK sponsorship needed",
  availability:
    env.VITE_AVAILABILITY ||
    "Open to in-office, hybrid, or remote full-time or contract roles in integration architecture, automation architecture and solutions engineering.",
  firstContact: env.VITE_CONTACT_NOTE || "Email is the best first contact.",
  resumeFile: env.VITE_RESUME_FILE || "Christian_Scherer_Resume.pdf",
  // Cache-busters: set these to the new PDF's git blob SHA (or any unique
  // token) whenever the resume is regenerated.
  resumeBust: env.VITE_RESUME_BUST || "5a856ce2aeaaba16022c60f9cd88f3ddd8f58c75",
  links: parseLinks(env.VITE_CONTACT_LINKS),
};
