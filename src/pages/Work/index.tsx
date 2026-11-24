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
        <h1 className={`${styles.heading} sectionTitle`}>Private Systems, Public Evidence</h1>
        <p className={styles.blurb}>
          Deep dives on eight private systems I designed, built and operate from
          Las Vegas — grouped by system, not by repository. Each one covers the
          problem, the build, the architecture, what it proves, why the code stays
          private, what is public, and where it stops. The code is withheld; the
          evidence, the design decisions and the limits are not.
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
