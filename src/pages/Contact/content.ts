import { profile, type Phone } from "../../config/profile";

export type ContactContent = {
  heading: string;
  email: string;
  phones: Phone[];
  location: string;
  relocation: string;
  note: string[];
};

function locationNote(): string {
  const based = `${profile.citizenship}, based in ${profile.location}.`;
  if (!profile.relocation) return based;
  const sponsorship = profile.sponsorship ? `; ${profile.sponsorship}` : "";
  // copy-ok: generic template, only used when a relocation target is configured.
  return `${based} Open to relocating to ${profile.relocation}${sponsorship}.`;
}

export const contactContent: ContactContent = {
  heading: "Contact",
  email: profile.email,
  phones: profile.phones,
  location: profile.location,
  relocation: profile.relocation,
  note: [profile.availability, locationNote(), profile.firstContact],
};
