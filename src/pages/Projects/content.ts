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
      id: "ibmi-azure-bridge",
      title: "IBM i ↔ Azure Integration Bridges",
      blurb:
        "Connecting core IBM i (RPG/CL) business systems to modern services via Azure, Python, and .NET integration layers, extending legacy platforms without rewriting them.",
      tech: ["IBM i", "RPG/CL", "Azure", "Python", ".NET"],
      year: 2026,
      role: "Programmer/Analyst · Murphy-Hoffman Company",
    },
    {
      id: "zero-trust-homelab",
      title: "Zero Trust Self-Hosted Infrastructure",
      blurb:
        "20+ containerised services published through Cloudflare Tunnels with Zero Trust access policies (no open inbound ports), plus network-wide DNS filtering via AdGuard Home.",
      tech: ["Cloudflare Zero Trust", "Docker", "Linux", "AdGuard Home", "Networking"],
      year: 2026,
      role: "Systems Engineer · Personal Lab",
    },
    {
      id: "clamav-pipeline",
      title: "Automated ClamAV Scanning Pipeline",
      blurb:
        "Scheduled, containerised malware-scanning pipeline built on ClamAV, applying security hygiene to self-hosted file stores without manual intervention.",
      tech: ["ClamAV", "Docker", "Linux", "Automation", "Security"],
      year: 2026,
      role: "Systems Engineer · Personal Lab",
    },
    {
      id: "cockpit-management",
      title: "Browser-Based Server Management (Cockpit)",
      blurb:
        "Cockpit web console exposed through an authenticated Cloudflare Tunnel, giving zero-install, browser-accessible terminal and host administration from anywhere.",
      tech: ["Cockpit", "Cloudflare Zero Trust", "Linux", "TLS"],
      year: 2026,
      role: "Systems Engineer · Personal Lab",
    },
    {
      id: "local-llm-stack",
      title: "Governance-First Local AI Agent Stack",
      blurb:
        "Local LLM inference with Ollama and agent frameworks, run entirely on owned hardware so prompts and data never leave the network. Applied AI under a Zero Trust posture.",
      tech: ["Ollama", "LLMs", "AI Agents", "Docker", "Python"],
      year: 2026,
      role: "Systems Engineer · Personal Lab",
    },
    {
      id: "adobe-licensing",
      title: "Adobe License Automation",
      blurb:
        "Policy-driven licence reconciliation across ServiceNow: scheduled sync, exception handling, and auditable governance of enterprise software entitlements.",
      tech: ["ServiceNow", "REST APIs", "JavaScript", "Automation"],
      year: 2025,
      role: "Enterprise Automation · Burns & McDonnell",
    },
    {
      id: "server-patching",
      title: "Monthly Server Patching Orchestrator",
      blurb:
        "Config-driven ServiceNow scheduling engine that generates RITM/SCTASK records, routes approvals, and rolls up patch status across the server estate.",
      tech: ["ServiceNow", "Workflow", "JavaScript", "JSON", "Automation"],
      year: 2025,
      role: "Enterprise Automation · Burns & McDonnell",
    },
    {
      id: "dfs-archive",
      title: "DFS Archive Request Pipeline",
      blurb:
        "ServiceNow MID Server + PowerShell pipeline with guarded concurrency and throttling for bulk DFS archive jobs, with data-governance controls built in.",
      tech: ["PowerShell", "MID Server", "ServiceNow", "Data Governance", "Automation"],
      year: 2025,
      role: "Enterprise Automation · Burns & McDonnell",
    },
  ],
};
