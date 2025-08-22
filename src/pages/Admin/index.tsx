import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import styles from "./admin.module.css";

import { login, createProject } from "../../lib/api";
import { setToken, clearToken, isAuthed } from "../../lib/auth";

export default function AdminPage() {
  // ---- auth state ----
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(isAuthed());

  // ---- create form state ----
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [techCsv, setTechCsv] = useState(""); // comma-separated
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitOk, setSubmitOk] = useState<string | null>(null);
  
  useEffect(() => {
    // Set title
    const prevTitle = document.title;
    document.title = "Admin — Christian Scherer";

    // Add robots noindex
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, []);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthing(true);
    try {
      const res = await login(password.trim());
      setToken(res.token);
      setAuthed(true);
      setPassword("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setAuthError(msg || "Login failed");
    } finally {
      setAuthing(false);
    }
  }

  function handleLogout() {
    clearToken();
    setAuthed(false);
    setSubmitOk(null);
    setSubmitError(null);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSubmitOk(null);
    setSubmitError(null);
    setSubmitting(true);
    try {
      const tech = techCsv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        blurb: blurb.trim(),
        tech,
        year: Number(year),
        role: role.trim(),
        link: link.trim() || undefined,
        repo: repo.trim() || undefined,
      };

      const created = await createProject(payload);
      setSubmitOk(`Created: ${created.title} (id: ${created.id})`);

      // clear form (keep year)
      setTitle("");
      setBlurb("");
      setTechCsv("");
      setRole("");
      setLink("");
      setRepo("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(msg || "Create failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Admin</h2>

      {!authed ? (
        <section className={styles.card}>
          <form onSubmit={handleLogin}>
            <div className={styles.row}>
              <label htmlFor="pwd">Password</label>
              <input
                id="pwd"
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter admin password"
              />
            </div>

            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.btnAccent}`} disabled={authing}>
                {authing ? "Signing in…" : "Sign in"}
              </button>
            </div>

            {authError && <div className={styles.error}>{authError}</div>}
            <div className={styles.note}>
              Token is held in memory only (cleared on refresh). Configure VITE_API_URL for API
              access.
            </div>
          </form>
        </section>
      ) : (
        <>
          <div className={styles.actions}>
            <button className={styles.btn} onClick={handleLogout}>
              Log out
            </button>
          </div>

          <section className={styles.card} style={{ marginTop: 16 }}>
            <h3 className={styles.heading} style={{ marginTop: 0 }}>
              Create Project
            </h3>
            <form onSubmit={handleCreate}>
              <div className={styles.row}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="blurb">Blurb</label>
                <textarea
                  id="blurb"
                  className={styles.textarea}
                  value={blurb}
                  onChange={(e) => setBlurb(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="tech">Tech (comma-separated)</label>
                <input
                  id="tech"
                  className={styles.input}
                  value={techCsv}
                  onChange={(e) => setTechCsv(e.target.value)}
                  placeholder="C#, React, Vite, ..."
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="year">Year</label>
                <input
                  id="year"
                  className={styles.input}
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="role">Role</label>
                <input
                  id="role"
                  className={styles.input}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="link">Link (optional)</label>
                <input
                  id="link"
                  className={styles.input}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="repo">Repo (optional)</label>
                <input
                  id="repo"
                  className={styles.input}
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                />
              </div>

              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnAccent}`} disabled={submitting}>
                  {submitting ? "Creating…" : "Create"}
                </button>
              </div>

              {submitError && <div className={styles.error}>{submitError}</div>}
              {submitOk && <div className={styles.success}>{submitOk}</div>}
            </form>
          </section>
        </>
      )}
    </main>
  );
}
