import { Link, useParams } from "react-router-dom";
import styles from "./work.module.css";
import { getWorkCaseStudy } from "./content";

export default function WorkDetailPage() {
  const { slug } = useParams();
  const study = slug ? getWorkCaseStudy(slug) : undefined;

  if (!study) {
    return (
      <main className={styles.main}>
        <div className={styles.notFound}>
          <h1 className={`${styles.heading} sectionTitle`}>
            Case study not found
          </h1>
          <Link className={styles.back} to="/work">
            ← Back to Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>{study.eyebrow}</div>
        <h1 className={`${styles.heading} sectionTitle`}>{study.title}</h1>
        <p className={styles.summary}>{study.summary}</p>

        <div className={styles.meta}>
          <span className={styles.status}>{study.status}</span>
          <ul className={styles.chips}>
            {study.tech.map((tech) => (
              <li key={tech} className={styles.chip}>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {study.trailer ? (
        <figure className={styles.trailer}>
          <video
            className={styles.video}
            controls
            preload="metadata"
            poster={study.trailer.poster}
          >
            <source src={study.trailer.src} type={study.trailer.type} />
          </video>
          <figcaption className={styles.caption}>
            {study.trailer.caption}
          </figcaption>
        </figure>
      ) : null}

      {study.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.sectionHeading}>{section.heading}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <footer className={styles.footer}>
        <Link className={styles.back} to="/work">
          ← Back to Work
        </Link>
      </footer>
    </main>
  );
}
