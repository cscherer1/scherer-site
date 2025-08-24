import { aboutContent } from "./content";
import styles from "./about.module.css";
import profilePic from "../../assets/profile.jpg";

export default function AboutPage() {
  const a = aboutContent;

  return (
    <main className={styles.main}>
      {/* subtle background like landing */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgAurora} aria-hidden="true" />

      {/* Header: eyebrow + avatar + heading + intro */}
      <header className={styles.header}>
        <div className={styles.eyebrow}>About</div>

        <img
          src={profilePic}
          alt="Christian Scherer"
          className={styles.profile}
          width={112}
          height={112}
        />

        <div>
          {/* gradient ink matches landing (uses global .sectionTitle) */}
          <h1 className={`${styles.heading} sectionTitle`}>{a.heading}</h1>
          <p className={styles.blurb}>{a.blurb}</p>
          {/* Actions: download / open in new tab */}
          <div className={styles.actions}>
            <a
              className={styles.btn}
              href="/Christian_Scherer_Resume.pdf"
              download="Christian_Scherer_Resume.pdf"
            >
              Download Résumé (PDF)
            </a>

            <a
              className={styles.btnSecondary}
              href="/Christian_Scherer_Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open in New Tab
            </a>
          </div>

          {/* Optional: inline preview (collapsible) */}
          <details className={styles.resume}>
            <summary className={styles.resumeSummary}>Preview résumé (inline)</summary>
            <div className={styles.embed}>
              <iframe
                className={styles.embedFrame}
                src="/Christian_Scherer_Resume.pdf#toolbar=0&navpanes=0&view=FitH"
                title="Christian Scherer — Résumé PDF"
                loading="lazy"
              />
            </div>
          </details>
          <ul className={styles.list}>
            {a.highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </header>

      {/* ===== Education & Awards ===== */}
      <section className={styles.section}>
        <h2 className={styles.subheading}>Education &amp; Awards</h2>

        {/* Education */}
        <div className={styles.block}>
          <h3 className={styles.label}>Education</h3>
          <ul className={styles.eduList}>
            {a.education.map((e, i) => (
              <li key={i} className={styles.eduItem}>
                <div className={styles.eduRow}>
                  <span className={styles.entity}>{e.school}</span>
                </div>

                <div className={styles.meta}>
                  {e.degree}
                  {e.field ? `, ${e.field}` : ""}
                </div>

                <span className={styles.dates}>
                  {e.start} – {e.end}
                </span>

                {!!e.details?.length && (
                  <ul className={styles.chips}>
                    {e.details.map((d, j) => (
                      <li key={j} className={styles.chip}>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div className={styles.block}>
          <h3 className={styles.label}>Awards</h3>
          <ul className={styles.awardsList}>
            {a.awards.map((aw, i) => (
              <li key={i} className={styles.awardRow}>
                <span className={styles.entity}>{aw.title}</span>
                <span className={styles.muted}>
                  {aw.org ? ` • ${aw.org}` : ""}
                  {aw.year ? ` • ${aw.year}` : ""}
                </span>
                {aw.note ? <span className={styles.note}> — {aw.note}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Professional Development ===== */}
      <section className={styles.section}>
        <h2 className={styles.subheading}>Professional Development</h2>

        <ul className={styles.cards}>
          {a.professionalDevelopment.map((c, i) => (
            <li key={i} className={styles.card}>
              <div className={styles.cardTitleRow}>
                <div className={styles.cardTitle}>{c.name}</div>
              </div>

              <div className={styles.cardMeta}>
                <span className={styles.provider}>{c.provider}</span>
                <div>
                  {c.year ? <span className={styles.dates}>{c.year}</span> : null}
                  {c.status ? <span className={styles.pill}>{c.status}</span> : null}
                </div>
              </div>

              {c.note ? <div className={styles.cardNote}>{c.note}</div> : null}

              <div className={styles.cardFooter}>
                {c.link ? (
                  <a
                    className={styles.btnLink}
                    href={c.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
