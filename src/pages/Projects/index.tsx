import { projectsContent } from "./content";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>{projectsContent.heading}</h2>

      <div className={styles.grid}>
        {projectsContent.items.map((p) => (
          <article key={p.id} className={styles.card}>
            <h3 className={styles.title}>{p.title}</h3>
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
    </main>
  );
}
