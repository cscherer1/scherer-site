import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>© {new Date().getFullYear()} Christian Scherer</div>
        <div className={styles.right}>
          <a className={styles.link} href="mailto:cschere1@gmail.com">
            Email
          </a>
          <a
            className={styles.link}
            href="https://www.linkedin.com/in/cschere1"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={styles.link}
            href="https://github.com/cscherer1"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
