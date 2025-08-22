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
      <h2 className={styles.heading}>{data?.heading ?? "Projects"}</h2>

      {!apiBase && (
        <p className="subtle">Using local fallback content (API URL not configured).</p>
      )}
      {error && (
        <p className="subtle">Using fallback — API error: {error}</p>
      )}
      {loading && !data && <p className="subtle">Loading…</p>}

      {data && (
        <div className={styles.grid}>
          {data.items.map((p) => (
            <article key={p.id} className={styles.card}>
              <h3 className={styles.title}>{p.title}</h3>
              <div className={styles.meta}>
                {p.year} · {p.role}
              </div>
              <p className={styles.blurb}>{p.blurb}</p>
              <div className={styles.tags}>
                {p.tech.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
