// src/pages/About/content.ts
export type EducationItem = {
  school: string;
  degree: string;
  field?: string;
  start: string;
  end: string; // "Present" allowed
  details?: string[];
};

export type AwardItem = {
  title: string;
  org?: string;
  year?: string;
  note?: string;
};

export type CourseItem = {
  provider: string;
  name: string;
  status?: "Completed" | "In Progress" | "Planned";
  link?: string;
  year?: string;
  note?: string;
};

export type AboutContent = {
  heading: string;
  blurb: string;
  highlights: string[];
  education: EducationItem[];
  awards: AwardItem[];
  professionalDevelopment: CourseItem[];
};

export const aboutContent: AboutContent = {
  heading: "About Me",
  blurb:
    "I am an enterprise integration and automation architect, not a pure programmer. I start with the business process, design the interfaces and controls, then build the smallest system that removes the manual work and stays supportable. A decade in enterprise IT, eight years at Burns & McDonnell, and now IBM i-to-Azure integration at Murphy-Hoffman. I also design and operate an applied-AI operations platform on a self-hosted production stack, so the AI work is grounded in real deployment, security and cost constraints.",
  highlights: [
    "Led architecture and delivery of the QTS platform's Azure modernization.",
    "Designed OAuth and Azure-token REST integrations across internal platforms.",
    "Automated licensing, storage archiving and data normalization, removing hundreds of administrative hours a year.",
    "Designed ServiceNow catalog modules and automation for thousands of users, including ESRI backup integration.",
    "Bridge IBM i (RPGLE/CL) systems to Azure, Python and .NET services.",
    "Build applied-AI operations tooling with security, cost and failure handling designed in.",
    "Document architecture and governance decisions; mentor developers through review.",
    "US/UK dual citizen, available to work in the UK without sponsorship.",
  ],

  education: [
    {
      school: "Southern New Hampshire University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      start: "2020",
      end: "2022",
      details: ["4.0 GPA", "Summa Cum Laude", "SNHU Distinguished Scholar Award"],
    },
    {
      school: "Coastal Carolina Community College",
      degree: "Associate's Degree",
      field: "Computer Programming",
      start: "2013",
      end: "2015",
    },
    {
      school: "University of North Carolina at Charlotte",
      degree: "Coursework",
      field: "Computer Science",
      start: "2012",
      end: "2013",
    },
  ],
  awards: [
    { title: "Summa Cum Laude", org: "SNHU", year: "2022" },
    { title: "Distinguished Scholar Award", org: "SNHU", year: "2022" },
  ],
  professionalDevelopment: [
    {
      provider: "Code with Mosh",
      name: "Ultimate ASP.NET Core Web API",
      status: "In Progress",
      year: "2025",
      link: "https://codewithmosh.com/",
    },
    {
      provider: "Coursera",
      name: "Microsoft Full-Stack Developer Professional Certificate",
      status: "In Progress",
      year: "2025",
      link: "https://www.coursera.org/",
    },
  ],
};
