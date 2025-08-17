import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>Christian Scherer — Portfolio</div>
    </header>
  );
}
