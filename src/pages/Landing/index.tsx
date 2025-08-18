import Hero from "./Hero";
import styles from "./hero.module.css";

export default function LandingPage() {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
}
