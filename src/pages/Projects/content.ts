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
      id: "secure-term-end-to-end-encrypted-browser-terminal",
      title: "Secure-Term — End-to-End Encrypted Browser Terminal",
      blurb:
        "E2E-encrypted long-poll browser terminal that keeps terminal content opaque to edge and TLS-inspection proxies. Python standard-library HTTP server, AES-GCM via WebCrypto, paramiko SSH into persistent tmux sessions, constant-time token auth, no inbound ports. Built so remote administration works through a Zero Trust tunnel without exposing plaintext to the middlebox.",
      tech: ["Python", "AES-GCM", "WebCrypto", "xterm.js", "paramiko", "SSH", "tmux", "Docker"],
      year: 2026,
      role: "Security & Systems Engineer · Personal",
    },
    {
      id: "op-e-console-encrypted-ai-operations-console",
      title: "OP-E Console — Encrypted AI Operations Console",
      blurb:
        "End-to-end encrypted chat console for operating an OpenCode/DeepSeek agent: session resume, screenshot attachments, all-session cost and token analytics, live server health, and an isolated workspace. Reads the OpenCode API, keeps agent chat separate from CLI coding sessions, and runs behind Cloudflare Access with Kuma monitoring, systemd restart, and verified backups.",
      tech: ["Python", "AES-GCM", "WebCrypto", "OpenCode", "DeepSeek", "OpenCode API", "Docker", "SQLite", "Uptime Kuma", "Cloudflare Access"],
      year: 2026,
      role: "AI Systems Engineer · Personal",
    },
    {
      id: "agent-test-disposable-container-verification-pipeline",
      title: "Agent-Test — Disposable-Container Verification Pipeline",
      blurb:
        "Self-contained CI harness that spins ephemeral containers to run static analysis, unit/API/UI tests, and hardcoded-value scans against the career automation stack without touching live services. Treats undefined-name lint errors as build failures and gates merges on reproducible results.",
      tech: ["Docker", "pytest", "pyflakes", "Browserless", "Bash", "CI/CD", "GitHub Actions"],
      year: 2026,
      role: "DevOps / Test Engineer · Personal",
    },
    {
      id: "ai-study-guide-interview-prep-jobdashboard",
      title: "AI Study Guide & Interview Prep (JobDashboard)",
      blurb:
        "JobDashboard extension that researches each target company (Wikipedia, news RSS, site scrape, tech-stack detection) and generates a per-job study guide and interview prep sheet grounded only in verified skills and project evidence. Runs as an n8n workflow over the same LLM routing layer.",
      tech: ["n8n", "LLM", "RouteLLM", "NocoDB", "Python", "RSS", "Web Scraping"],
      year: 2026,
      role: "AI Systems Engineer · Personal",
    },
    {
      id: "command-deck-container-control-plane",
      title: "Command Deck — Container Control Plane & Tool Console",
      blurb:
        "Config-driven control plane and 43-tool operations console for a 43-container self-hosted stack: discovers Docker services live, groups tools by function, streams host and per-container stats, runs HTTP health probes, and starts/stops/restarts through a guarded action layer. FastAPI and the Docker SDK behind a restricted socket proxy, Cloudflare Access JWT verification, YAML/env config, and a dependency-free SPA.",
      tech: ["FastAPI", "Docker SDK", "Cloudflare Access", "PyJWT", "psutil", "Python", "YAML", "Health checks"],
      year: 2026,
      role: "Platform / DevOps Engineer · Personal",
    },
    {
      id: "self-healing-stack-automation",
      title: "Self-Healing Stack Automation",
      blurb:
        "Cron-driven operations layer for a 43-container stack: Brave CPU watchdog, container health watchdog, Sonarr queue janitor, qBittorrent executable exclusions, Uptime Kuma-to-ntfy alert bridge, and nightly consistent SQLite/Postgres backups mirrored across drives. Every fix runs unattended with cooldowns and dry-run support.",
      tech: ["Python", "Bash", "Docker", "Uptime Kuma", "ntfy", "SQLite", "PostgreSQL", "Cron"],
      year: 2026,
      role: "Site Reliability / Platform Engineer · Personal",
    },
    {
      id: "op-e-voice-local-speech-service",
      title: "OP-E Voice — Local Speech Service",
      blurb:
        "Self-hosted speech service for my agent's spoken interface: faster-whisper transcription and Kokoro, Piper, or eSpeak synthesis with per-emotion prosody, signature chirps, and callout framing. Streaming audio runs over an encrypted session with no cloud speech APIs involved.",
      tech: ["Python", "faster-whisper", "Kokoro", "Piper", "eSpeak NG", "FastAPI", "Docker", "Audio DSP"],
      year: 2026,
      role: "AI Systems Engineer · Personal",
    },
    {
      id: "command-center-disaster-recovery-rebuild-repo",
      title: "Command Center — Disaster-Recovery Rebuild Repo",
      blurb:
        "Sanitized disaster-recovery repository for a multi-service home server: every maintained service pinned as a submodule, secrets kept out of source, and a bootstrap that detects the host (distro, UID/GID, storage, ports) and rebuilds the stack from scratch. Includes backup/restore tooling, sanitization checks, and written rebuild runbooks.",
      tech: ["Docker Compose", "Bash", "Python", "Git Submodules", "Linux", "Cloudflare Zero Trust", "Disaster Recovery"],
      year: 2026,
      role: "Systems Architect · Personal",
    },
    {
      id: "agentic-cli-development-workflow-opencode-deepseek",
      title: "Agentic CLI Development Workflow (OpenCode + DeepSeek)",
      blurb:
        "Long-context agent-driven development using OpenCode with DeepSeek models for code execution, wired into the same verification gates as human changes: disposable-container tests, hardcode scans, and PR review. Emphasis on invariant design and proof of correctness rather than blind generation.",
      tech: ["OpenCode", "DeepSeek", "LLM", "Git", "Docker", "CLI", "CI/CD"],
      year: 2026,
      role: "AI Systems Engineer · Personal",
    },
    {
      id: "job-search-automation-dashboard",
      title: "Job Search Automation Dashboard",
      blurb:
        "Automated job-search pipeline that scrapes live postings daily (JobSpy), builds a verified skill inventory with evidence, and uses LLM-powered evaluation to score fit against real, provable experience before generating tailored resume PDFs and cover letters. Orchestrated with n8n on Docker, data in NocoDB, dashboard in Python/FastAPI.",
      tech: ["n8n", "NocoDB", "JobSpy", "Python", "LLM", "Docker", "FastAPI"],
      year: 2026,
      role: "Systems & AI Engineer · Personal",
      link: "/projects/jobdashboard",
    },
    {
      id: "ouroborn-local-llm-council",
      title: "Ouroborn — Local LLM Deliberation Council",
      blurb:
        "An original multi-agent system where a panel of local language models answers independently, argues over blind-labeled rounds, and a separate foreman model reads the verdict. Runs entirely on owned hardware via Ollama — no API calls, nothing leaves the machine. Opposite of an API wrapper.",
      tech: ["Python", "Ollama", "LLM", "Docker", "SQLite", "FastAPI"],
      year: 2026,
      role: "AI Systems Engineer · Personal",
      link: "/projects/ouroborn",
    },
    {
      id: "routellm-cli-development-pipeline",
      title: "RouteLLM CLI in the Development Pipeline",
      blurb:
        "Integrated the RouteLLM CLI — an OpenAI-compatible LLM routing gateway — into the development pipeline, giving every agentic and automation workflow a single unified endpoint that routes each request to the best model for the job.",
      tech: ["RouteLLM", "LLM", "OpenAI-compatible API", "CLI", "Python", "Automation"],
      year: 2026,
      role: "Systems & AI Engineer · Personal",
      link: "https://routellm.abacus.ai",
    },
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
