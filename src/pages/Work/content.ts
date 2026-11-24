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
    title: "OP-E Console, Secure-Term & Encrypted Voice",
    summary:
      "The private, self-hosted control surface I use every day to operate a coding agent: an encrypted console, a browser terminal, and local speech — one workspace, one operator, no third-party UI in the loop.",
    status: "Private · self-hosted · single-operator",
    tech: [
      "TypeScript",
      "React 19",
      "WebCrypto · AES-GCM",
      "Python",
      "tmux",
      "Cloudflare Access",
      "Uptime Kuma",
      "SQLite FTS5",
      "faster-whisper",
      "Kokoro TTS",
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "I drive a coding agent for hours at a time, and a normal chat window is a poor control surface. It forgets context between sessions, hides what a run costs, offers no durable memory, and gives me no way to watch or take over the machine from another device. I wanted one private place where I could start work, watch it, audit what happened, and step in — without routing the session through a third-party UI.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "OP-E is a self-hosted, single-operator console built around a local OpenCode/DeepSeek agent. The web front end is TypeScript and React 19. A browser terminal pairs an SSH-backed web terminal with tmux, so a session survives a dropped connection. Around the chat I added the things I kept reaching for: session resume, screenshot attachments, per-session and all-session cost analytics, real-time health, an isolated workspace, a feed of work milestones, a read-only observer that triages anomalies, a full-text recall index over past work, a four-model council with an independent verifier and judge, a supervised remote-desktop gateway, and a live architecture view.",
          "Secure-Term is the terminal half: a browser terminal with end-to-end encrypted input and output, a local agent bridge, and a session that can be resumed from a phone. Encrypted voice is the newest layer: a Record button sends AES-GCM ciphertext to a local faster-whisper service; a Listen button fetches an encrypted summary, sends it to a local Kokoro/Piper voice, and plays the returned WAV in the phone browser. No cloud STT/TTS and no Web Speech API are in the private path.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Chat payloads are sealed in the browser with AES-GCM through WebCrypto; the key never leaves the client. A small Python process bridges the UI to the agent process and to tmux, streams updates over Server-Sent Events, and answers read-only queries for health, cost and recall. The observer and the recall index are deliberately read-only: they report, and never edit code or restart a process. The model council is heterogeneous on purpose — different vendors for red-team, architecture, maintenance and judging — so one model's blind spot does not become the system's. Speech is local and encrypted in transit with the same session key; audio plays on the phone, never on the host. It runs behind Cloudflare Access with Uptime Kuma watching liveness, and every host, port and credential comes from environment configuration.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It is evidence of end-to-end encryption in a real daily workflow, of agent operations and observability, of secure remote administration, of local speech in a privacy-sensitive path, and of multi-model orchestration with explicit read-only boundaries. It is also a study in building a tool for exactly one user and keeping that claim honest.",
        ],
      },
      {
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "The console holds live session keys, agent memory, operational notes, infrastructure names, and the design of the encryption and access boundaries. Publishing the source would expose the security model and the operator's working context, not just generic UI code. What is public is the architecture, the threat model, the observable outcomes and this case study; no keys, hostnames, session data or personal memory are published.",
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
    title: "Career Automation Stack — JobDashboard, Career OS & Contract Radar",
    summary:
      "A self-hosted job and contract pipeline that scrapes postings, grounds every skill in evidence, scores fit with a config-driven rubric, and drafts tailored applications — pointed at my own search.",
    status: "Private · self-hosted · single-operator",
    tech: [
      "n8n",
      "NocoDB",
      "PostgreSQL",
      "FastAPI",
      "JobSpy",
      "Docker",
      "Cloudflare Access",
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
          "The stack runs as containers on one private Docker network. n8n orchestrates, NocoDB is the system of record, and PostgreSQL backs both. A small Python wrapper around JobSpy brings LinkedIn, Indeed and Glassdoor results in as clean, typed listings. A skill-inventory worker refuses to record a skill without a source: GitHub repositories and languages, tech named on this site, or a manually confirmed list. A FastAPI dashboard reads the data, and a contract-radar branch captures contract listings and drafts proposals. The Career OS view combines jobs, contracts and the daily operating state.",
          "The job pipeline has three layers: discovery (config-driven searches, metro/remote filters, title exclusions, a rolling cap), qualification (a config-driven rubric over weighted skill coverage, title level, years, clearance/travel and location), and application (tailored résumé, cover letter, ATS report, status tracking, follow-ups). Every tunable — search terms, included and excluded titles, metro terms, tech aliases, weights — lives in Settings or environment configuration, not in the workflow source.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Every container is configured through environment variables and shares one bridge network; nothing is hardcoded to a host or port. The pipeline is built around a lesson from an edge timeout: heavy work runs as background jobs that report progress and survive a closed browser, instead of one long-lived request. Fit scoring is retrieval-grounded — the model sees the evidence row for a skill before it may claim it. Scraping is rate-limit-aware, and when a board throttles a query the run records the gap rather than inventing data. Missing LinkedIn descriptions are filled through a guest endpoint using a VPN egress, then every job is rescored so the ranking is not based on a blank page.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It shows workflow orchestration, relational data modelling, API design, retrieval-grounded LLM use, config-driven ranking, and honest measurement. The numbers are deliberately unflattering in places: over the sample, the contract radar captured 1,664 contracts and drafted 1,236 proposals, while the job dashboard held a broad role pool with a single application sent at the time. The bottleneck was execution, not sourcing — which is exactly the kind of finding an instrumented pipeline should surface.",
        ],
      },
      {
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "The system holds personal job-search and contract data, employer and recruiter information, API tokens, LLM prompts, and the exact searches and weighting that encode one person's strategy. That is not a public dataset, and the credentials are live. What is public is the architecture, the data model, the config-driven design, the measured outcomes and the case study; secrets and personal records stay on the host.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "It runs my search only; it is single-user and internal, with no customers or revenue. Scrapers are brittle and rate-limited, so coverage is a floor, not a census. The ranking is a screening aid, not a guarantee of qualification. It removes drudgery from the front of the funnel; it cannot apply for me, and it does not pretend to.",
        ],
      },
    ],
  },
  {
    slug: "agent-test",
    eyebrow: "Case Study",
    title: "Agent-Test — Disposable-Container Verification",
    summary:
      "A CI harness that runs every check in a throwaway container on an isolated network, so a test or migration can never reach the running stack.",
    status: "Private · disposable containers · single-operator",
    tech: ["Docker", "pytest", "pyflakes", "Browserless", "Bash", "Cloudflare Access"],
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
          "Agent-Test is a CI harness that runs each stage in a throwaway container on an isolated network. It covers static analysis, unit tests, API tests, browser UI checks through Browserless, and scans for hardcoded hosts, ports and credentials. The same gate runs for human changes and agent changes: if it is not green, it does not merge.",
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
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "The harness encodes the host's service topology, test credentials references, internal ports and the deploy path. Publishing it would describe the private stack more precisely than is useful. What is public is the pattern: disposable containers, pinned commands, strict static analysis, and a merge gate that treats an undefined name as a build failure.",
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
      "A physics-based coin-pusher incremental, built web-first in TypeScript. In development as a private test build; public release planned.",
    status: "In development · private test build · public release planned",
    tech: ["TypeScript", "Vite", "Three.js", "Rapier · WASM", "Canvas 2D", "PWA"],
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
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "Coin Cascade is a commercial game in development. The source contains the full simulation, economy curves, art pipeline, level design and anti-cheat thinking; publishing it before release would give away the product and the tuning. What is public is the trailer, the technical case study, and — at release — the playable build. The private repository stays private until the commercial decision changes.",
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
  {
    slug: "ouroborn",
    eyebrow: "Case Study",
    title: "Ouroborn — A Panel of Local Language Models That Deliberate",
    summary:
      "An original multi-agent design where several small language models answer independently, argue over blind rounds, and a separate model reads the verdict. Everything runs locally — nothing leaves the machine.",
    status: "Private research prototype · local models · no cloud",
    tech: ["Python", "Ollama", "SQLite", "Docker", "LLM", "FastAPI"],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A single small model asked a hard question will produce a fluent answer whether or not it knows anything. For evaluation tasks — architecture review, code review, technical judgment — a fluent wrong answer is worse than no answer. The idea behind Ouroborn: several models, forced to answer independently and then confront each other's reasoning, expose the places where fluency was covering for nothing. What comes back is not one model's guess but a reading of where a panel actually landed — including where it split.",
        ],
      },
      {
        heading: "How it works — four stages",
        paragraphs: [
          "Witnesses testify. Specialist models answer the question once, directly, and do not participate further; small models are often poor at structured deliberation but good at a single plain answer.",
          "The jury answers independently. Each juror sees the question but not the other jurors. Round zero is genuinely independent — no anchoring, no consensus to defer to.",
          "The jury deliberates. In each subsequent round every juror sees the others' answers under blind labels, freshly shuffled per juror, and must state the strongest argument against their own position before defending it.",
          "The foreman reads the verdict. A separate model — never a juror — reads the final answers, groups them by what they actually recommend, and presents each member's reasoning. The foreman is a presenter, not a judge: it never decides who is right and never introduces a fact the jury did not state.",
        ],
      },
      {
        heading: "What the empirical work found",
        paragraphs: [
          "Peer voting at 7–8B is unreliable: panels that unanimously recommend the same thing routinely show a three-way split in the tally, because the models cannot reliably tell that two phrasings of the same conclusion are the same conclusion. So the foreman reads answers, not votes. Weak models make poor jurors and adequate witnesses; the witness/jury split exists because some models cannot follow the deliberation format at all. Every fault above was caught by asking questions with checkable answers. A system like this will produce a fluent, well-formatted, entirely wrong verdict without any outward sign; the only defense is testing it where the truth is already known.",
        ],
      },
      {
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "Ouroborn is original research: the prompt design, the round structure, the blind-labelling choices, the failure catalogue and the model roster are the contribution. The code contains those experiments and the local model configuration. What is public is the design write-up, the empirical findings and the honest limits; the implementation stays private while the research is developed.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "It is a research prototype with one operator and no external users. Multi-model deliberation is still unproven against a single strong model on a blinded benchmark; the panel can share correlated priors and amplify error. It runs on local hardware, so model size and latency are constrained, and the verdict is only as good as the questions used to calibrate it.",
        ],
      },
    ],
  },
  {
    slug: "home-infrastructure",
    eyebrow: "Case Study",
    title: "Zero Trust Home Infrastructure",
    summary:
      "A private production platform on owned hardware: no open inbound ports, identity-aware access, encrypted backups, a disaster-recovery bootstrap, and a health watchdog that notices when something stops.",
    status: "Private production platform · single-operator",
    tech: [
      "Linux",
      "Docker",
      "Cloudflare Zero Trust",
      "AdGuard Home",
      "Python",
      "age encryption",
      "Bash",
      "BLE / Python",
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "I run my own tools, backups, media, health and AI services on hardware I own. The default home-server pattern — port-forward a pile of containers and hope — is unacceptable: every exposed admin port is an attack surface, every manual backup is a restore you have not tested, and a move to a new network should not mean rebuilding from memory.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "A headless NUC is the always-on command center; a GPU desktop and a small edge node are execution nodes; a separate backup destination holds a second copy. Everything is Docker on a private bridge network. Public access is only through Cloudflare Zero Trust tunnels and Access policies — there are no open inbound admin ports. A config-driven control plane discovers containers, groups them by function, streams host and per-container stats, runs health probes, and starts/stops/restarts through a guarded action layer.",
          "The operations layer is the part that matters: a daily backup job snapshots SQLite, Postgres, the career volumes and appdata, encrypts the archive with age, and pulls a copy to a second machine. A sanitized disaster-recovery repository pins every service, keeps secrets out of source, and includes a host-detecting bootstrap that rebuilds the stack — distro, UID/GID, storage and ports are detected, not assumed. A dead-man watchdog checks backup, monitoring, DNS, container health and public port drift, and alerts when a freshness signal goes stale.",
        ],
      },
      {
        heading: "The experiments that did not ship",
        paragraphs: [
          "The newest experiment is a BLE peer-mesh survey: small towers advertise beacons, a scanner records peer RSSI, and a solver estimates the physical layout with a gate on connectivity, RMS, worst-link and stability. The first live run was rejected by the gate because the desktop had only one peer neighbour and the map collapsed. The lesson was more valuable than a fake success: the gate now refuses a degenerate layout and leaves the measured chain map in place. Weak links and a gated map are recorded as evidence, not hidden.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It demonstrates zero-trust access design, infrastructure-as-configuration, encrypted backup/restore, host-detecting disaster recovery, health observability, and a security posture that assumes the network will change. The restore path was tested into disposable databases and a fresh clone, not against the live stack.",
        ],
      },
      {
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "The platform encodes private network topology, tunnel identifiers, access policies, credential locations, backup keys, service inventory and the physical layout of the nodes. That is an attack map, not a portfolio piece. What is public is the architecture, the zero-trust and backup/restore patterns, the measured outcomes, and a sanitized rebuild pattern that can be shared without the secrets.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "It is a single-operator platform with no SLA. A host outage stops the local services and the gate; the offsite copy and Cloudflare edge reduce, but do not remove, that risk. The BLE survey is experimental and gated; the desktop link is currently too weak for a stable 4-node fit, so the measured chain layout remains authoritative. Some services are intentionally single-instance because the value does not justify the operational cost.",
        ],
      },
    ],
  },
  {
    slug: "private-health",
    eyebrow: "Case Study",
    title: "Private Health — Records-Grounded, Guardrailed",
    summary:
      "A private, self-hosted health assistant for a household member: records retrieval with citation verification, a heterogeneous model panel, per-person guardrails, and a read-only learning loop — built around consent, not engagement.",
    status: "Private · household · records-grounded",
    tech: ["FastAPI", "SQLite FTS5", "SSE", "Python", "LLM panel", "Cloudflare Access"],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A household member's medical records were scattered across PDFs, scans and notes, and a generic chat model was a poor interface to them: it hedged, injected generic skepticism, and sometimes referred to a doctor instead of answering the question the records could answer. The requirement was not a chatbot. It was a private way to ask a question and get an answer grounded in the actual record, with the source shown, and with the family's established clinical context treated as the working premise.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "A self-hosted FastAPI + SQLite FTS5 service with a mobile SPA and streaming responses. Records are ingested from read-only mounts into a local index; retrieval uses BM25 plus a curated-summary priority pass. Every excerpt is tagged, and the app verifies that each citation the model uses maps to a real loaded source; unknown tags raise a visible ungrounded warning.",
          "The answer path is a panel of heterogeneous models with role prompts, followed by a synthesizer that must preserve disagreement. Quorum rules refuse to synthesize a partial panel. Per-person clinical context and guardrails are configuration, not source: established context, dismissed diagnoses, hedge phrases, referral phrases and regeneration instructions live with the person's profile. A deterministic gate catches a reopened diagnosis, a hedge, or a reflexive referral and regenerates once with a corrective instruction.",
          "A read-only learning loop reviews corrections, hedging, referrals, failures and cost, and proposes guard/prompt changes. It never auto-applies a protected change; proposals go through a branch, a gate and a human decision.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It demonstrates retrieval-grounded generation with deterministic citation checks, per-person configuration, safety guardrails that are testable rather than prompt-only, model routing under a cost cap, and an evaluation loop that can say a panel is unproven. The honest result from the first benchmark: a cheap flash-lite model was competitive on quality at roughly a tenth of the cost, with fewer errors than the stronger model — so it stayed the default. The panel is not assumed to be better; it has to earn it.",
        ],
      },
      {
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "This system handles medical records, a household member's personal data, and the clinical context that must never become a public dataset. Consent, retention and the boundary of who can access it are the design constraints. What is public is the architecture, the citation-verification pattern, the guardrail design and the evaluation approach; no records, diagnoses, names or personal health details are published. Model inference is routed through a configured provider, so that privacy boundary is documented rather than assumed.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "It is a household tool, not a medical device and not a clinician. Scanned PDFs without OCR can extract poorly; the evaluation set is small enough that only large quality differences are resolvable; and a model panel can share correlated priors. It is built for one family's records and workflow, not as a general health product.",
        ],
      },
    ],
  },
  {
    slug: "flip-scout",
    eyebrow: "Case Study",
    title: "Flip Scout — Photo-to-Profit for a Private Reseller",
    summary:
      "A private thrift-flipping assistant: photo → identify → comparable sales → fees and profit → max buy and a listing draft. Built around verified comps and guardrails, not marketplace automation.",
    status: "Private · small-business tool · access-controlled",
    tech: ["Python", "FastAPI", "PWA", "Vision models", "SQLite", "Cloudflare Access", "JWT"],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A reseller's real workflow starts in a thrift store with a phone photo and a price tag. The hard parts are identification, comparable sales, fee and shipping math, and a decision: what is the maximum I should pay? The failure mode is a confident valuation built on an unverified listing, or an automation that risks the seller's marketplace account.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "A photo-first PWA: item, brand, size and price-tag photos go through vision identification, then comp research, then fee/shipping/profit math, a max-buy number, a listing draft and find tracking. It handles iPhone HEIC/HEIF photos, strips EXIF, guards decompression bombs, and supports adding photos to an existing find. A listing-link import accepts a public eBay/Poshmark/Mercari/Depop/Vinted URL, fetches the public image and title, and runs the same pipeline; image download is SSRF-guarded at every redirect hop.",
          "The comp model is deliberately conservative. eBay sold pages are login-gated or blocked, Poshmark sold-out pages expose the last listed price rather than a confirmed accepted offer, and Vinted shows active asking prices. Every comp carries a link status (ok, blocked, unreachable, dead, invalid); only verified sold, last-listed-sold and manual sold comps drive valuation. Under two usable comps the answer is NEEDS COMPS, never BUY. A structured desk estimate can inform a listing price when comps are thin, but it is labelled not-a-comp and never changes the buy verdict.",
          "A read-only Reach check reads the newest public listings and reports search presence and engagement without logging in, posting or liking. Automated liking was explicitly declined: the platforms prohibit automated access and inauthentic engagement, and the risk lands on the seller's account. Read-only diagnostics are the safe substitute.",
        ],
      },
      {
        heading: "What it proves",
        paragraphs: [
          "It shows a real computer-vision workflow, conservative financial reasoning, cost caps per analysis, SSRF and image-upload hardening, Cloudflare Access JWT verification, and a clear boundary between advice and marketplace actions. The test suite covers HEIC decode, API upload, comp verification, valuation precedence and the visibility audit; the live service runs with read-only filesystem, dropped capabilities and a memory cap.",
        ],
      },
      {
        heading: "Why the code is private — and what is public",
        paragraphs: [
          "The system contains a family member's reseller workflow, marketplace identifiers, finds, costs, comps and listing drafts, plus the access configuration for a live small business. The marketplace credentials and the account are not mine to publish. What is public is the architecture, the comp-verification and valuation-precedence methodology, the cost/consent boundaries, and the case study; no seller data, marketplace tokens or personal business records are published.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "Sold-price coverage is the hard limit: eBay blocks the host and has no official sold API without approval, so eBay comps remain unverified link-outs. Fee and shipping tables are estimates. It is a single-reseller tool, not a marketplace integration, and it never posts, likes or edits on the user's behalf. The desk estimate is a fallback for thin comp data, not a substitute for a verified sale.",
        ],
      },
    ],
  },
];

export function getWorkCaseStudy(slug: string): WorkCaseStudy | undefined {
  return workCaseStudies.find((study) => study.slug === slug);
}
