export type Project = {
  id: string;
  title: string;
  blurb: string;
  tech: string[];
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
      tech: ["ServiceNow", "REST", "Automation"],
      link: "#",
    },
    {
      id: "server-patching",
      title: "Monthly Server Patching Orchestrator",
      blurb:
        "Config-driven scheduling engine with RITM/SCTASK generation, approvals, and status rollups.",
      tech: ["ServiceNow", "Workflow", "PowerShell"],
      link: "#",
    },
    {
      id: "dfs-archive",
      title: "DFS Archive Request Pipeline",
      blurb:
        "MID Server + PowerShell pipeline with guarded concurrency and throttling for bulk archive jobs.",
      tech: ["MID Server", "PowerShell", "Governance"],
      link: "#",
    },
  ],
};
