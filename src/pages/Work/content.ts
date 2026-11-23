export type WorkSection = {
  heading: string;
  paragraphs: string[];
};

export type WorkTrailer = {
  poster: string;
  src: string;
  type: string;
  caption: string;
};

export type WorkCaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
  tech: string[];
  sections: WorkSection[];
  trailer?: WorkTrailer;
};

export const workCaseStudies: WorkCaseStudy[] = [
  {
    slug: "op-e-console",
    eyebrow: "Case Study",
    title: "OP-E Console & Secure-Term",
    summary:
      "The encrypted console I use every day to operate a coding agent: a browser front end, a local agent bridge, and a browser terminal in one audited workspace.",
    status: "Internal · self-hosted · single-operator",
    tech: [
      "TypeScript",
      "React 19",
      "WebCrypto · AES-GCM",
      "Python",
      "tmux",
      "Cloudflare Access",
      "Uptime Kuma",
      "SQLite FTS5",
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "I drive a coding agent for hours at a time, and the default chat window is a poor control surface. It forgets context between sessions, hides what a run costs, offers no durable memory, and gives me no way to watch or take over the machine from another device. I wanted one internal place where I could start work, watch it, audit what happened, and step in — without routing the session through a third-party UI.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "OP-E is a self-hosted, single-operator console built around a local OpenCode/DeepSeek agent. The web front end is TypeScript and React 19. A browser terminal pairs an SSH-backed web terminal with tmux, so a session survives a dropped connection. Around the chat I added the things I kept reaching for: session resume, screenshot attachments, per-session and all-session cost analytics, real-time health, an isolated workspace, a feed of work milestones, a read-only observer that triages anomalies, a full-text recall index over past work, a four-model council with an independent verifier and judge, a supervised remote-desktop gateway, and a live architecture view.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Chat payloads are sealed in the browser with AES-GCM through WebCrypto; the key never leaves the client. A small Python process bridges the UI to the agent process and to tmux, streams updates over Server-Sent Events, and answers read-only queries for health, cost and recall. The observer and the recall index are deliberately read-only: they report, and never edit code or restart a process. The model council is heterogeneous on purpose — different vendors for red-team, architecture, maintenance and judging — so one model's blind spot does not become the system's. It runs behind Cloudflare Access with Uptime Kuma watching liveness, and every host, port and credential comes from environment configuration.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It is evidence of end-to-end encryption in a real daily workflow, of agent operations and observability, of secure remote administration, and of multi-model orchestration with explicit read-only boundaries. It is also a study in building a tool for exactly one user and keeping that claim honest.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "This is an internal tool with one operator: me. There are no accounts, tenants or external users, and no SLA. Some pieces are still being wired — the autonomous overnight scheduler among them — and recall results are unverified historical context, not truth. It is engineered around my workflow, not generalised for anyone else's.",
        ],
      },
    ],
  },
  {
    slug: "career-automation",
    eyebrow: "Case Study",
    title: "Career Automation Stack",
    summary:
      "A self-hosted job and contract pipeline that scrapes postings, grounds every skill in evidence, and drafts tailored applications — pointed at my own search.",
    status: "Internal · self-hosted · single-operator",
    tech: [
      "n8n",
      "NocoDB",
      "PostgreSQL",
      "FastAPI",
      "JobSpy",
      "Docker",
      "LLM fit scoring",
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Searching for work is a multi-step workflow with messy inputs and no source of truth: scrape boards, read listings, judge fit, tailor a résumé, apply, track. Each step is repetitive, and the expensive part — a truthful, tailored document — is the easiest one to fake badly. I wanted the pipeline I would build for a client, aimed at my own search, with evidence as a hard gate.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "The stack runs as containers on one private Docker network. n8n orchestrates, NocoDB is the system of record, and PostgreSQL backs both. A small Python wrapper around JobSpy so LinkedIn, Indeed, Glassdoor and ZipRecruiter results arrive as clean, typed listings. A skill-inventory worker refuses to record a skill without a source: GitHub repositories and languages, tech named on this site, or a manually confirmed list. A FastAPI dashboard reads the data, and a contract-radar branch captures contract listings and drafts proposals. LLM fit scoring runs against that evidence, not against aspirations, and generates ATS-safe résumés and cover letters from proven experience only.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Every container is configured through environment variables and shares one bridge network; nothing is hardcoded to a host or port. The pipeline is built around a lesson from an edge timeout: heavy work runs as background jobs that report progress and survive a closed browser, instead of one long-lived request. Fit scoring is retrieval-grounded — the model sees the evidence row for a skill before it may claim it. Scraping is rate-limit-aware, and when a board throttles a query the run records the gap rather than inventing data.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It shows workflow orchestration, relational data modelling, API design, retrieval-grounded LLM use, and honest measurement. The numbers are deliberately unflattering: over the sample, the contract radar captured 1,664 contracts and drafted 1,236 proposals, while the job dashboard held 50 roles with a single application sent. The bottleneck was execution, not sourcing — which is exactly the kind of finding an instrumented pipeline should surface.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "It runs my search only; it is single-user and internal, with no customers or revenue. Scrapers are brittle and rate-limited, so coverage is a floor, not a census. With no proposals sent, conversion is unproven, and there are no invoices. It removes drudgery from the front of the funnel; it cannot apply for me, and it does not pretend to.",
        ],
      },
    ],
  },
  {
    slug: "agent-test",
    eyebrow: "Case Study",
    title: "Agent-Test & Command Deck",
    summary:
      "A disposable-container test harness and a config-driven Docker control plane that gate my own deploys without ever touching the running stack.",
    status: "Internal · disposable containers · single-operator",
    tech: [
      "Docker",
      "pytest",
      "pyflakes",
      "Browserless",
      "Bash",
      "Cloudflare Access",
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "I run several self-hosted tools on one host, and every change carries the same risk: a test or a migration reaching the running stack. Manual checks were inconsistent and easy to skip, and a bad deploy could take down the tooling I depend on. I needed a gate that was reproducible, isolated from the running host, and strict enough to trust on a bad day.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "Agent-Test is a CI harness that runs each stage in a throwaway container on an isolated network. It covers static analysis, unit tests, API tests, browser UI checks through Browserless, and scans for hardcoded hosts, ports and credentials. Command Deck is the companion: a config-driven Docker control plane with health probes, sitting behind Cloudflare Access, that starts, stops and inspects containers from a browser.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Each run launches containers with --rm on a disposable network, checks out the branch under test, and runs a pinned command. A stage that fails stops the merge — no partial green. Static analysis treats an undefined name from pyflakes as a real bug, not a warning. One-off and eval containers are labelled so the observer ignores a clean exit but still alerts on a non-zero or unknown one; a harness must never mask a real failure. Container definitions live in configuration rather than ad-hoc commands, health probes report state, and the control plane is reachable only through an access policy.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It demonstrates CI/CD design, container isolation, deterministic gating, infrastructure-as-configuration, and a security posture that assumes the worst case. The recoverable failure is the unit of design: disposable containers, pinned checks, and a gate that refuses to pass silently.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "It is internal tooling that gates my own deploys; it is not hosted CI and has no users beyond me. It depends on a single host and a single Docker daemon, so a host outage stops the gate too. UI coverage runs through one headless browser and is not exhaustive, and the checks are only as good as the assertions I remember to write.",
        ],
      },
    ],
  },
  {
    slug: "coin-cascade",
    eyebrow: "Case Study",
    title: "Coin Cascade",
    summary:
      "A physics-based coin-pusher incremental, built web-first in TypeScript. In development; public release planned.",
    status: "In development · public release planned",
    tech: [
      "TypeScript",
      "Vite",
      "Three.js",
      "Rapier · WASM",
      "Canvas 2D",
      "PWA",
    ],
    trailer: {
      poster: "/media/coin-cascade-trailer-poster.jpg",
      src: "/media/coin-cascade-trailer.mp4",
      type: "video/mp4",
      caption: "Captured from a private test build.",
    },
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Coin pushers are a feel problem. The loop only works if the pile looks and behaves like real coins — settling, jamming, spilling over the ledge — and if the economy rewards patience without turning into a slot machine. I wanted to prototype that feel quickly in a browser, then tune it without a new build for every number.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "Coin Cascade is a physics-based coin-pusher incremental. Coins fall through a plinko tower onto a pusher shelf and get shoved over the ledge; whatever you push off is currency for upgrades that make the whole machine bigger, faster and richer. Special buckets trigger a BONUS SPIN wheel for coins, multipliers and free upgrades. The first playable core — tower, buckets, wheel, one-way pusher, five upgrades, save/load and a phone-friendly UI — came together in nine days across 368 commits.",
        ],
      },
      {
        heading: "How it's built",
        paragraphs: [
          "It is web-first with zero runtime dependencies: Vite and TypeScript, Canvas 2D with Rapier's WebAssembly 2D physics, and a 3D cabinet in Three.js with Rapier 3D. The simulation runs on a fixed timestep. The pusher is deliberately one-way — solid on the forward stroke and a pass-through sensor on the return — so it sweeps coins toward the tray instead of dragging or crushing them. Everything tunable lives in JSON loaded at runtime: physics, board and plinko layout, economy and upgrade curves, wheel weights, theme colours, and the 3D scene geometry and audio. The soundtrack is synthesised at runtime, so there are no audio assets and the offline PWA still works. Publishing goes through a deploy arbiter and an automated health check of the running build; saves stay in localStorage.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It is a rapid-iteration exercise with real constraints: a fixed-timestep physics loop, an economy that has to stay balanced under tuning, configuration-driven design with no hardcoded gameplay, and a test suite of 83 files and roughly 10,000 lines covering physics, the one-way pusher and the economy maths. The 3D codebase alone is about 24,000 lines.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "Coin Cascade is in development, running as a private test build; public release is planned. There are no accounts and no cross-device sync — saves are per browser. The playable core is early: more module types, taller-board growth and extra mini-games are ahead. Packaging as a desktop build and the optional player-feedback pipeline are both unfinished, and none of the numbers above are a promise of scope or timing.",
        ],
      },
    ],
  },
];

export function getWorkCaseStudy(slug: string): WorkCaseStudy | undefined {
  return workCaseStudies.find((study) => study.slug === slug);
}
