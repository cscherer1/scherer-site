import { Link } from "react-router-dom";
import styles from "./work.module.css";
import { workCaseStudies } from "./content";

export default function WorkIndexPage() {
  return (
    <main className={styles.main}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>Work</div>
        <h1 className={`${styles.heading} sectionTitle`}>Case Studies</h1>
        <p className={styles.blurb}>
          Deep dives on four systems I designed, built and run from Las Vegas:
          three internal, self-hosted tools that power my own work, and a game in
          development. Each one covers the problem, the build, the architecture,
          what it proves and where it stops.
        </p>
      </header>

      <ul className={styles.grid}>
        {workCaseStudies.map((study) => (
          <li key={study.slug} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.status}>{study.status}</span>
              {study.trailer ? (
                <span className={styles.trailerBadge}>Trailer</span>
              ) : null}
            </div>

            <h2 className={styles.cardTitle}>{study.title}</h2>
            <p className={styles.cardSummary}>{study.summary}</p>

            <ul className={styles.chips}>
              {study.tech.slice(0, 6).map((tech) => (
                <li key={tech} className={styles.chip}>
                  {tech}
                </li>
              ))}
            </ul>

            <div className={styles.cardFooter}>
              <Link className={styles.btn} to={`/work/${study.slug}`}>
                Read case study →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
