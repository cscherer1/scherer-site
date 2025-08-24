import styles from "./contact.module.css";
import { contactContent } from "./content"; // assumes you already have this

export default function ContactPage() {
  const c = contactContent;

  return (
    <main className={styles.main}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>Contact</div>
        <h1 className={`${styles.heading} sectionTitle`}>Get in Touch</h1>
        <p className={styles.blurb}>
          Open to in-office, hybrid, or remote full-time roles. Email preferred for first contact.
        </p>
      </header>

      <section className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.label}>Email</div>
          <a className={styles.link} href={`mailto:${c.email}`}>
            {c.email}
          </a>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Phone</div>
          <a className={styles.link} href={`tel:${c.phone}`}>
            {c.phone}
          </a>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Location</div>
          <div>{c.location}</div>
        </div>
      </section>

      {c.note?.length ? (
        <ul className={styles.notes}>
          {c.note.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
