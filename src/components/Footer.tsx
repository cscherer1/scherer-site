import styles from "./Footer.module.css";
import { profile } from "../config/profile";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          © {new Date().getFullYear()} {profile.name}
        </div>
        <div className={styles.right}>
          <a className={styles.link} href={`mailto:${profile.email}`}>
            Email
          </a>
          {profile.links.map((link) => (
            <a
              key={link.label}
              className={styles.link}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
