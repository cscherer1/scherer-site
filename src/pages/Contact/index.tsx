import styles from "./contact.module.css";
import { contactContent } from "./content";

export default function ContactPage() {
  const c = contactContent;

  return (
    <main className={styles.main}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.eyebrow}>Contact</div>
        <h1 className={`${styles.heading} sectionTitle`}>Get in Touch</h1>
        <p className={styles.blurb}>{c.note[0]}</p>
      </header>

      <section className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.label}>Email</div>
          <a className={styles.link} href={`mailto:${c.email}`}>
            {c.email}
          </a>
        </div>

        {c.phones.map((phone) => (
          <div className={styles.item} key={`${phone.label}:${phone.number}`}>
            <div className={styles.label}>{phone.label}</div>
            <a className={styles.link} href={`tel:${phone.number}`}>
              {phone.number}
            </a>
          </div>
        ))}

        <div className={styles.item}>
          <div className={styles.label}>Location</div>
          <div>{c.location}</div>
        </div>

        {c.relocation ? (
          <div className={styles.item}>
            <div className={styles.label}>Relocation</div>
            <div>{c.relocation}</div>
          </div>
        ) : null}
      </section>

      {c.note.length > 1 ? (
        <ul className={styles.notes}>
          {c.note.slice(1).map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
