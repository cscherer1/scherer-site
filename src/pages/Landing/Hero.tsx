import { landingContent } from "./content";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section>
      <h1 className={styles.title}>{landingContent.owner}</h1>
      <p className={`muted ${styles.role}`}>{landingContent.roles}</p>
      <p className={`subtle ${styles.tagline}`}>{landingContent.tagline}</p>
      <a href={landingContent.cta.href} className={styles.cta}>
        {landingContent.cta.label}
      </a>
    </section>
  );
}
