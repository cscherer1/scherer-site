import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./projects.module.css";

import { fetchProjects } from "../../lib/api";
import type { ProjectsDto } from "../../lib/types";
import { projectsContent as localFallback } from "./content";

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsDto | null>(null);

  const apiBase = import.meta.env.VITE_API_URL; // e.g., https://localhost:7210

  useEffect(() => {
    let cancelled = false;

    async function load() {
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
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  const featuredIds = new Set(
    localFallback.items.filter((p) => p.featured).map((p) => p.id),
  );

  const source =
    data && data.items.length >= localFallback.items.length
      ? data.items
      : localFallback.items;

  const items = [...source]
    .map((p) => ({
      ...p,
      featured: (p as { featured?: boolean }).featured ?? featuredIds.has(p.id),
    }))
    .sort(
      (a, b) =>
        b.year - a.year ||
        Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
        a.title.localeCompare(b.title),
    );

  const years = [...new Set(items.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <main className={styles.main}>
      {/* subtle background like landing */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>Projects</div>
        <h1 className={`${styles.heading} sectionTitle`}>{"Selected Work"}</h1>
        <p className={styles.blurb}>
          A decade of building, from support automation in 2021 to enterprise
          integration and applied AI in 2026. The featured work is highlighted;
          the timeline shows everything I have shipped, including the smaller
          tools and automations that built the foundation.
        </p>
        <div className={styles.legend}>
          <span className={styles.legendDot} aria-hidden="true" />
          <span>{items.length} projects</span>
          <span className={styles.legendSep}>·</span>
          <span>Featured</span>
          <span className={styles.legendSep}>·</span>
          <span>Newest first</span>
        </div>
      </header>

      {items.length > 0 && (
        <div className={styles.timeline}>
          {years.map((year) => {
            const yearItems = items.filter((p) => p.year === year);

            return (
              <section className={styles.yearGroup} key={year}>
                <div className={styles.yearMarker}>
                  <span className={styles.year}>{year}</span>
                  <span className={styles.yearCount}>
                    {yearItems.length} project{yearItems.length === 1 ? "" : "s"}
                  </span>
                </div>

                <ul className={styles.grid}>
                  {yearItems.map((p) => (
                    <li
                      key={p.id}
                      className={`${styles.card} ${p.featured ? styles.featured : ""}`}
                    >
                      <div className={styles.cardTitleRow}>
                        <div className={styles.cardTitle}>{p.title}</div>
                        {p.featured && (
                          <span className={styles.featuredTag}>Featured</span>
                        )}
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
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
