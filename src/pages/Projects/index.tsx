import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./projects.module.css";

import { fetchProjects } from "../../lib/api";
import type { ProjectsDto } from "../../lib/types";
import { projectsContent as localFallback } from "./content";

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsDto | null>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = import.meta.env.VITE_API_URL; // e.g., https://localhost:7210
  const featuredIds = localFallback.items.map((p) => p.id);
  const featuredOrder = new Map(featuredIds.map((id, i) => [id, i]));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

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
          console.warn("Projects API unavailable; using local content:", msg);
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
        <h1 className={`${styles.heading} sectionTitle`}>{"Selected Work"}</h1>
        <p className={styles.blurb}>
          Integration architecture, enterprise automation, legacy-to-cloud delivery and
          applied AI, from production work and independent builds.
        </p>
      </header>

      {loading && !data && <div className={styles.state}>Loading...</div>}

      {data && (() => {
        const apiItems = data.items
          .filter((p) => featuredOrder.has(p.id))
          .sort((a, b) => (featuredOrder.get(a.id) ?? 0) - (featuredOrder.get(b.id) ?? 0));
        const items = apiItems.length === featuredIds.length ? apiItems : localFallback.items;

        return (
        <ul className={styles.grid}>
          {items.map((p) => (
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

              {p.link?.trim() || p.repo?.trim() ? (
                <div className={styles.cardFooter}>
                  {p.link?.trim() && (
                    <>
                      {p.link.startsWith("/") ? (
                        <Link className={styles.btn} to={p.link}>
                          Case Study
                        </Link>
                      ) : (
                        <a
                          className={styles.btn}
                          href={p.link}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Live
                        </a>
                      )}
                    </>
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
              ) : null}
            </li>
          ))}
        </ul>
        );
      })()}
    </main>
  );
}
