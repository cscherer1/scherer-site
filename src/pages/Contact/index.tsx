import { contactContent } from "./content";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>{contactContent.heading}</h2>

      <div className={styles.row}>
        <span className={styles.label}>Email</span>
        <span className={styles.value}>
          <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Phone</span>
        <span className={styles.value}>{contactContent.phone}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Location</span>
        <span className={styles.value}>{contactContent.location}</span>
      </div>

      <p className={styles.note}>{contactContent.note}</p>
    </main>
  );
}
