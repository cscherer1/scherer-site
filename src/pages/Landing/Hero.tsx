// src/pages/Landing/Hero.tsx
import { Link } from "react-router-dom";
import styles from "./hero.module.css";
import { landingContent } from "./content";

function isInternal(href: string) {
  return href.startsWith("/");
}

export default function Hero() {
  const { owner, roles, summary, specialties, cta, ctaSecondary, socials } = landingContent;

  return (
    <section className={styles.hero} aria-labelledby="intro-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{roles}</div>
        <h1 id="intro-heading" className={styles.title}>
          {owner}
        </h1>
        <p className={styles.summary}>{summary}</p>

        <div className={styles.pills} aria-label="Specialties">
          {specialties.map((s, i) => (
            <span key={`${s}-${i}`} className={styles.pill}>
              {s}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          {isInternal(cta.href) ? (
            <Link to={cta.href} className={styles.cta}>
              {cta.label}
            </Link>
          ) : (
            <a
              href={cta.href}
              className={styles.cta}
              target={cta.newTab ? "_blank" : "_self"}
              rel={cta.newTab ? "noopener noreferrer" : undefined}
            >
              {cta.label}
            </a>
          )}

          {isInternal(ctaSecondary.href) ? (
            <Link to={ctaSecondary.href} className={styles.ghost}>
              {ctaSecondary.label}
            </Link>
          ) : (
            <a
              href={ctaSecondary.href}
              className={styles.ghost}
              target={ctaSecondary.newTab ? "_blank" : "_self"}
              rel={ctaSecondary.newTab ? "noopener noreferrer" : undefined}
            >
              {ctaSecondary.label}
            </a>
          )}
        </div>

        <div className={styles.socials} aria-label="Social links">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
