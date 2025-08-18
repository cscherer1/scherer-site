import { Link } from "react-router-dom";
import { landingContent } from "./content";
import styles from "./hero.module.css";

export default function Hero() {
  const { href, label, newTab } = landingContent.cta;
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <section>
      <h1 className={styles.title}>{landingContent.owner}</h1>
      <p className={`muted ${styles.role}`}>{landingContent.roles}</p>
      <p className={`subtle ${styles.tagline}`}>{landingContent.tagline}</p>

      {isExternal || newTab ? (
        <a
          href={href}
          className={styles.cta}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>
      ) : (
        <Link to={href} className={styles.cta}>
          {label}
        </Link>
      )}
    </section>
  );
}
