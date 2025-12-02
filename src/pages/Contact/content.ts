export type ContactContent = {
  heading: string;
  email: string;
  phone: string;
  location: string;
  note: string[];
};

export const contactContent: ContactContent = {
  heading: "Contact",
  email: "cschere1@gmail.com",
  phone: "+1 (910) 333-7347",
  location: "Kansas City, MO",
  note: [
    "Open to In-office, Hybrid, or Remote full-time positions.",
    "UK passport holder planning relocation to London.",
    "Prefer email for first contact. I typically reply within 24 hours.",
  ],
};
