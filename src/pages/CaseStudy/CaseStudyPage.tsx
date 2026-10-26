import { Link } from "react-router-dom";
import styles from "./casestudy.module.css";
import { caseStudies } from "./content";

type Props = {
  slug: string;
};

export default function CaseStudyPage({ slug }: Props) {
  const cs = caseStudies[slug];

  if (!cs) {
    return (
      <main className={styles.main}>
        <h2>Case study not found</h2>
        <Link to="/projects">← Back to Projects</Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>{cs.eyebrow}</div>
        <h1 className={`${styles.heading} sectionTitle`}>{cs.title}</h1>
        <p className={styles.summary}>{cs.summary}</p>

        <div className={styles.meta}>
          <span className={styles.role}>{cs.role} · {cs.year}</span>
          <ul className={styles.chips}>
            {cs.tech.map((t, i) => (
              <li key={i} className={styles.chip}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {cs.sections.map((s) => (
        <section key={s.heading} className={styles.section}>
          <h2 className={styles.sectionHeading}>{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}
        </section>
      ))}

      <footer className={styles.footer}>
        <Link to="/projects" className={styles.back}>
          ← Back to Projects
        </Link>
      </footer>
    </main>
  );
}
