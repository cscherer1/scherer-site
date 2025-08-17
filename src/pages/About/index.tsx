import { aboutContent } from "./content";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>{aboutContent.heading}</h2>
      <p className={styles.blurb}>{aboutContent.blurb}</p>
      <ul className={styles.list}>
        {aboutContent.highlights.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
