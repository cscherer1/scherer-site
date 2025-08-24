import { useEffect, useState } from "react";
import styles from "./projects.module.css";

import { fetchProjects } from "../../lib/api";
import type { ProjectsDto } from "../../lib/types";
import { projectsContent as localFallback } from "./content";

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = import.meta.env.VITE_API_URL; // e.g., https://localhost:7210

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        if (apiBase) {
          const res = await fetchProjects();
          if (!cancelled) setData(res);
        } else {
          if (!cancelled) setData(localFallback);
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
          setData(localFallback); // graceful fallback
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  return (
    <main className={styles.main}>
      {/* subtle background like landing */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>Projects</div>
        <h1 className={`${styles.heading} sectionTitle`}>{data?.heading ?? "Selected Work"}</h1>
        <p className={styles.blurb}>
          A mix of professional and
          personal work. Built with pragmatic patterns, clean code, and a focus on maintainability.
        </p>
      </header>

      {!apiBase && (
        <div className={styles.state}>Using local fallback content (API URL not configured).</div>
      )}
      {error && <div className={styles.state}>Using fallback — API error: {error}</div>}
      {loading && !data && <div className={styles.state}>Loading…</div>}

      {data && (
        <ul className={styles.grid}>
          {data.items.map((p) => (
            <li key={p.id} className={styles.card}>
              <div className={styles.cardTitleRow}>
                <div className={styles.cardTitle}>{p.title}</div>
                <span className={styles.dates}>{p.year}</span>
              </div>

              <div className={styles.meta}>
                <span className={styles.role}>{p.role}</span>
                <ul className={styles.chips}>
                  {(p.tech ?? []).slice(0, 5).map((t, i) => (
                    <li key={i} className={styles.chip}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.cardBlurb}>{p.blurb}</p>

              {(p.link?.trim() || p.repo?.trim()) && (
                <div className={styles.cardFooter}>
                  {p.link?.trim() && (
                    <a
                      className={styles.btn}
                      href={p.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Live
                    </a>
                  )}
                  {p.repo?.trim() && (
                    <a
                      className={styles.btn}
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Repo
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
