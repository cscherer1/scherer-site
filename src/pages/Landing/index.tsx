import Hero from "./Hero";
import styles from "./hero.module.css";

export default function LandingPage() {
  return (
    <main className={styles.main}>
      <Hero />
      <section id="projects" className={styles.section}>
        <h2 style={{ marginTop: 0 }}>Projects</h2>
        <p className="subtle">Coming soon…</p>
      </section>
    </main>
  );
}
