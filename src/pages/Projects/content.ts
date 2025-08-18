export type Project = {
  id: string;
  title: string;
  blurb: string;
  tech: string[];
  year: number;
  role: string;  
  link?: string; // live demo or internal doc
  repo?: string; // GitHub link if public
};

export type ProjectsContent = {
  heading: string;
  items: Project[];
};

export const projectsContent: ProjectsContent = {
  heading: "Projects",
  items: [
    {
      id: "adobe-licensing",
      title: "Adobe License Automation",
      blurb:
        "Policy-driven license sync across ServiceNow with scheduled reconciliation and exception handling.",
      tech: ["ServiceNow", "REST", "Automation", "Javascript"],
      year: 2025,
      role: "Software Developer/Solutions Architect",
      link: "#",
    },
    {
      id: "server-patching",
      title: "Monthly Server Patching Orchestrator",
      blurb:
        "Config-driven scheduling engine with RITM/SCTASK generation, approvals, and status rollups.",
      tech: ["ServiceNow", "Workflow", "Javascript", "JSON", "Automation"],
      year: 2025,
      role: "Software Developer/Solutions Architect",
      link: "#",
    },
    {
      id: "dfs-archive",
      title: "DFS Archive Request Pipeline",
      blurb:
        "MID Server + PowerShell pipeline with guarded concurrency and throttling for bulk archive jobs.",
      tech: ["MID Server", "PowerShell", "Data Governance", "Javascript", "JSON", "Automation"],
      year: 2025,
      role: "Software Developer/Solutions Architect",
      link: "#",
    },
  ],
};
