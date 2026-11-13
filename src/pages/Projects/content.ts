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
      id: "enterprise-integration-automation",
      title: "Enterprise Integration & Automation",
      blurb:
        "Automated enterprise and M365 processes through ServiceNow, Azure and PowerShell: access and licensing changes, IP-address management, backup and restore, and the reporting and data workflows around them. Examples include EfficientIP pool and range pre-reservation, Revit server and ImaginIT Clarity automation, employee name changes, manager-requested access removal for departed employees, and ArcGIS backup and restore in Azure. Contributed to the QTS platform's Azure modernization as a developer. The automation removed hundreds of administrative hours a year and replaced hand-run processes with documented, supported services.",
      tech: ["Azure", "ServiceNow", "PowerShell", "Microsoft 365", "EfficientIP", "ArcGIS", "REST / OAuth"],
      year: 2025,
      role: "Staff Software Developer · Burns & McDonnell",
    },
    {
      id: "ibmi-azure-integration-bridge",
      title: "IBM i ↔ Azure Integration Bridge",
      blurb:
        "Design and maintain the bridge between IBM i (RPGLE/CL) business systems and Azure-hosted Python and .NET services. Work with stakeholders to define interfaces, replace manual workflows with supported automation, and keep production integrations observable and recoverable.",
      tech: ["IBM i", "RPGLE", "CL", "Azure", "Python", ".NET", "REST APIs"],
      year: 2026,
      role: "Integration Architect / Programmer-Analyst · Murphy-Hoffman",
    },
    {
      id: "op-e-console-secure-term",
      title: "OP-E Console & Secure-Term",
      blurb:
        "Designed and operate an end-to-end encrypted AI operations console and browser terminal. TypeScript/React front end, Python services, AES-GCM/WebCrypto, SSH into persistent tmux sessions, cost analytics, monitoring, recall, model routing and a supervised remote-desktop gateway, deployed behind Cloudflare Access with backups and recovery runbooks.",
      tech: ["TypeScript", "React", "Python", "AES-GCM", "WebCrypto", "SSH / tmux", "Docker", "Cloudflare Access", "LLMs"],
      year: 2026,
      role: "AI Systems Architect · Independent",
    },
    {
      id: "career-automation-stack",
      title: "Career Automation Stack",
      blurb:
        "Self-hosted job and contract pipeline built on n8n, NocoDB/PostgreSQL and FastAPI. Scores roles against an evidence-based skill inventory, generates ATS-safe resumes, and runs the work as background jobs, with a human in control of every application.",
      tech: ["n8n", "NocoDB", "PostgreSQL", "FastAPI", "Python", "LLM", "Docker"],
      year: 2026,
      role: "Automation Architect · Independent",
      link: "/projects/jobdashboard",
    },
    {
      id: "agent-test-command-deck",
      title: "Agent-Test & Command Deck",
      blurb:
        "Disposable-container CI harness for static, unit/API/UI and hardcoded-value checks, plus a config-driven Docker control plane with health probes, guarded actions and Cloudflare Access. Built so agent-generated and human changes pass the same verification gate.",
      tech: ["Docker", "pytest", "Browserless", "FastAPI", "Docker SDK", "Cloudflare Access", "CI/CD"],
      year: 2026,
      role: "Platform & Verification Architect · Independent",
    },
    {
      id: "zero-trust-platform",
      title: "Zero Trust Self-Hosted Platform",
      blurb:
        "Self-hosted Linux and Docker platform published only through Cloudflare Zero Trust tunnels, with identity-aware access, monitoring, alerting, backups and disaster-recovery runbooks. Designed to fail visibly and recover without manual babysitting.",
      tech: ["Linux", "Docker", "Cloudflare Zero Trust", "Monitoring", "Backups / DR", "Networking"],
      year: 2026,
      role: "Platform Architect · Independent",
    },
    {
      id: "local-ai-deliberation",
      title: "Local AI Deliberation Council",
      blurb:
        "Multi-agent deliberation system where local models answer independently, cross-examine blind-labelled rounds and a separate judge reads the verdict. Runs entirely on owned hardware via Ollama, with structured outputs and no data leaving the network.",
      tech: ["Python", "Ollama", "LLM", "Multi-agent systems", "FastAPI", "SQLite"],
      year: 2026,
      role: "AI Systems Architect · Independent",
      link: "/projects/ouroborn",
    },
  ],
};
