export type ContactContent = {
  heading: string;
  email: string;
  "US Phone": string;
  "UK Phone": string;
  location: string;
  note: string[];
};

export const contactContent: ContactContent = {
  heading: "Contact",
  email: "cschere1@gmail.com",
  "US Phone": "+1 (910) 333-7347",
  "UK Phone": "+44 7522 346480",
  location: "Kansas City, MO → Brighton / Greater London, UK",

  note: [
    "Open to full-time or contract roles in integration architecture, automation architecture and solutions engineering.",
    "US/UK dual citizen, relocating to Brighton / Greater London. No UK sponsorship needed.",
    "Email is the best first contact.",
  ],
};
