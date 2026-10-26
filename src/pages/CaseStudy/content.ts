export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  tech: string[];
  year: number;
  role: string;
  sections: CaseStudySection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  jobdashboard: {
    slug: "jobdashboard",
    eyebrow: "Case Study",
    title: "JobDashboard — Self-Hosted Career Automation Stack",
    summary:
      "A five-container automation pipeline that replaces manual job hunting: n8n orchestrates, NocoDB is the system of record, and every resume is grounded in evidence-verified skills. Built the way I'd build it for a client, pointed at my own career.",
    tech: ["n8n", "NocoDB", "PostgreSQL", "Python", "FastAPI", "JobSpy", "Docker", "Cloudflare Zero Trust"],
    year: 2026,
    role: "Solutions Architect / Automation Engineer",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Job hunting is a manual, repetitive, high-friction pipeline: search boards, read listings, assess fit, tailor a resume, apply, track status. It is exactly the shape of problem I solve professionally — a multi-step workflow with messy inputs, no single source of truth, and a high cost of manual handling. So I built the pipeline I'd build for a client, pointed at my own career.",
          "The result runs on my home server as five containers on one private Docker network. It works while I sleep.",
        ],
      },
      {
        heading: "The architecture — five containers, one network",
        paragraphs: [
          "All services share a private Docker bridge network. n8n orchestrates, NocoDB is the system of record, PostgreSQL 17 backs both, and three small Python/FastAPI services do the specialized work.",
          "jobspy wraps live job board scraping (LinkedIn, Indeed, Glassdoor) into a clean typed API — n8n sends search parameters and gets structured listings back.",
          "skillinventory is the part that makes this more than a scraper: no skill enters the system without evidence. It ingests skills from GitHub (repo + languages), the portfolio site (tech mentions on pages), and a manually-confirmed LinkedIn list — each tagged with where the proof came from.",
          "resumerender turns a JSON Resume document into a clean, single-column, machine-parseable PDF — the shape ATS scanners can actually read.",
          "The dashboard (Python/FastAPI) reads and writes the NocoDB tables: jobs, skills, dropped, blacklist, settings. n8n calls the internal service URLs; nothing specialized is exposed publicly except the dashboard and n8n, both behind Cloudflare Zero Trust identity.",
        ],
      },
      {
        heading: "Three decisions worth reading",
        paragraphs: [
          "Evidence-based skills instead of self-reported ones. Every skill in the pipeline carries proof — a repo, a page, a user-confirmed list. Resumes and scoring only use verified skills. That is a data-integrity decision, and it is the same question every automation architect has to answer: where does trustworthy data come from, and how do I prove it?",
          "The Cloudflare 524 lesson. Cloudflare's edge cuts off proxied requests that take too long. Job-list pulls or LLM evaluations can exceed that limit, so heavy work runs asynchronously: a request triggers a background workflow that reports progress, and the client polls until it completes — never one long-lived request. This is the difference between 'works in dev' and 'works behind a real edge.'",
          "Operations as a first-class feature. deploy.sh does port check → build → pull → up → health wait → smoke tests (actual endpoint checks, not just 'containers started'). Backups are a documented one-liner (pg_dumpall | gzip). Log tailing, upgrade path, and Cloudflare tunnel routes with their gotchas are all written down. This is what a systems person records so the system is never a black box.",
        ],
      },
      {
        heading: "Why this is honest proof",
        paragraphs: [
          "Anyone can claim 'I automate things.' This is a system I actually operate: it runs on my hardware every day, it has recovered from real edge failures, it has a documented backup and upgrade path, and it replaced an earlier version (a Java/Angular app) by rebuilding with the right architecture instead of bolting on.",
          "For a Solutions/Integration Architect role, that is the concrete version of 'I make systems that keep working when nobody's watching.'",
        ],
      },
    ],
  },

  ouroborn: {
    slug: "ouroborn",
    eyebrow: "Case Study",
    title: "Ouroborn — A Panel of Local Language Models That Deliberate",
    summary:
      "An original multi-agent design where several small language models answer a question independently, argue about it over rounds, and a separate model reads the resulting verdict. Everything runs locally — nothing leaves the machine. Built on first principles, not as an API wrapper.",
    tech: ["Python", "Ollama", "SQLite", "Docker", "LLM", "FastAPI"],
    year: 2026,
    role: "AI Systems Engineer",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A single small model asked a hard question will produce a fluent answer whether or not it knows anything. For evaluation tasks — architecture review, code review, technical judgment — a fluent wrong answer is worse than no answer. The idea behind Ouroborn: several models, forced to answer independently and then confront each other's reasoning, expose the places where fluency was covering for nothing. What comes back is not one model's guess but a reading of where a panel actually landed — including where it split.",
          "Everything runs on local hardware via Ollama. No API calls, no data leaves the machine, and the model roster is fully under my control.",
        ],
      },
      {
        heading: "How it works — four stages",
        paragraphs: [
          "Witnesses testify. Some councils have expert witnesses — specialist models that answer the question once, directly, and do not participate further. This exists because specialist models are often poor at structured deliberation: they lose the format, echo the prompt, or emit boilerplate. Asked a single plain question, the good ones answer well. So they testify and step down.",
          "The jury answers independently. Each juror sees the question (and any testimony) but not the other jurors. Round zero is genuinely independent — no anchoring, no consensus to defer to.",
          "The jury deliberates. In each subsequent round every juror sees the others' answers under blind labels (Member A, Member B), freshly shuffled per juror. They must state the strongest argument against their own position before defending it. Blinding matters: shown real model names, small models mis-attribute positions and occasionally cite themselves as a peer.",
          "The foreman reads the verdict. A separate model — never a juror — reads the jurors' final answers, groups them by what they actually recommend, and presents each member's reasoning. It clusters by meaning, so 'improves maintainability' and 'promotes modularity' land in the same group. The foreman is a presenter, not a judge: it never decides who is right and never introduces a fact the jury did not state.",
        ],
      },
      {
        heading: "The empirical lessons (all learned the hard way)",
        paragraphs: [
          "Peer voting at 7–8B is unreliable. Jurors asked to mark whether they agree with each peer produce consistently poor votes — panels that unanimously recommend the same thing routinely show a 'three-way split' in the tally. The models cannot reliably tell that two phrasings of the same conclusion are the same conclusion. This is a property of the models, not a bug you can prompt away.",
          "So the foreman reads answers, not votes. The verdict of record comes from a capable model reading what the jurors actually concluded. The vote tally is retained as a second, independent measurement — when the two disagree sharply, that gap is informative, and deleting the votes would make the foreman unfalsifiable.",
          "Weak models make poor jurors and adequate witnesses. Some models cannot follow the deliberation format at all — one echoed its prompt back for three consecutive rounds. The witness/jury split exists because of them: asked a single direct question, the failure mode never triggers.",
          "Calibrate on questions you can grade. Every fault above was caught by asking things with checkable answers. A system like this will produce a fluent, well-formatted, entirely wrong verdict without any outward sign. The only defense is testing it where you already know the truth.",
        ],
      },
      {
        heading: "Appeals and follow-ups",
        paragraphs: [
          "A verdict is a snapshot. Rather than treat it as permanent, any finished run can be reopened: a follow-up accepts the prior finding as established and builds on it; an appeal puts the prior verdict on trial — the jury is told not to assume it was correct, and upholds it only if it survives the challenge. Both feed the same case record forward; only the framing differs. Chains of appeals stay lean automatically because the foreman's verdict is already a compressed reading.",
          "Every structural decision was made after watching something break on a question whose answer could be checked. This is the opposite of an API-call wrapper.",
        ],
      },
    ],
  },
};
