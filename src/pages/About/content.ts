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
    "Enterprise automation and systems engineer. Eight years governing Microsoft 365 and automating with PowerShell and ServiceNow at Burns & McDonnell, now bridging IBM i platforms to Azure at Murphy-Hoffman Company.",
  highlights: [
    "Microsoft 365 Sub-Global Admin: Exchange Online, Entra ID, Intune MDM/MAM",
    "PowerShell and ServiceNow automation at enterprise scale",
    "Hybrid cloud + legacy depth: IBM i (RPG/CL) ↔ Azure, Python, .NET",
    "Zero Trust networking and governance-first applied AI",
  ],

  // New sections
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
  ],
  awards: [
    { title: "Summa Cum Laude", org: "SNHU", year: "2024" },
    { title: "Distinguished Scholar Award", org: "SNHU", year: "2024" },
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
