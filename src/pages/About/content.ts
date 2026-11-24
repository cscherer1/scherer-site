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
    "I am a software and platform engineer with an integration and automation background. I start with the process, design the interfaces and controls, then build the smallest system that removes the manual work and stays supportable. A decade in enterprise IT and eight years at Burns & McDonnell, where I automated enterprise and M365 processes through ServiceNow, Azure and PowerShell: access and licensing, IP-address management, backup and restore, and the data workflows around them. Now at Murphy-Hoffman, I connect IBM i (RPGLE/CL) systems to Azure, Python and .NET services. Outside work I design and operate private systems — an encrypted AI console and terminal, a job and contract automation stack, a zero-trust home platform, a records-grounded health assistant, a reseller tool, and a browser game in development. Each is documented as a case study that states plainly why the code is private and what is public. Based in Las Vegas; remote-first, with hybrid considered for the right role. US/UK dual citizen, no sponsorship needed.",
  highlights: [
    "Software and platform engineering on top of a decade of enterprise integration and automation.",
    "Enterprise and M365 automation through ServiceNow, Azure and PowerShell: access and licensing, IP-address management, backup and restore, and supporting data workflows.",
    "IBM i (RPGLE/CL) ↔ Azure, Python and .NET integration with observable, recoverable production interfaces.",
    "Private systems, public evidence: eight case studies covering an encrypted AI console, career automation, disposable-container verification, a zero-trust home platform, a health assistant, a reseller tool, a local model council, and a game.",
    "Remote-first, based in Las Vegas; hybrid considered for the right role.",
    "US/UK dual citizen, no sponsorship needed.",
    "Open to software, platform and integration engineering roles.",
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
