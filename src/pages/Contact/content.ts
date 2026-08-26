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
  location: "Kansas City, MO",

  note: [
    "Open to In-office, Hybrid, or Remote full-time positions.",
    "UK passport holder relocating to Brighton/Greater London area.",
    "Prefer email for first contact. I typically reply within 24 hours.",
  ],
};
