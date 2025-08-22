import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import styles from "./admin.module.css";

import { login, createProject, fetchProjects, updateProject, deleteProject } from "../../lib/api";
import { setToken, clearToken, isAuthed } from "../../lib/auth";
import type { Project, ProjectsDto } from "../../lib/types";

export default function AdminPage() {
  // ---- auth state ----
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(isAuthed());

  // ---- list state ----
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // ---- form state (create or edit) ----
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [techCsv, setTechCsv] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitOk, setSubmitOk] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setListError(null);
    try {
      const dto: ProjectsDto = await fetchProjects();
      setItems(dto.items);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setListError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) load();
  }, [authed]);

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

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setBlurb("");
    setTechCsv("");
    setYear(new Date().getFullYear());
    setRole("");
    setLink("");
    setRepo("");
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setTitle(p.title);
    setBlurb(p.blurb);
    setTechCsv(p.tech.join(", "));
    setYear(p.year);
    setRole(p.role);
    setLink(p.link ?? "");
    setRepo(p.repo ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      await load();
      if (editingId === id) resetForm();
    } catch (e) {
      alert((e as Error).message ?? "Delete failed");
    }
  }

  function handleLogout() {
    clearToken();
    setAuthed(false);
    setSubmitOk(null);
    setSubmitError(null);
    setItems([]);
    resetForm();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitOk(null);
    setSubmitError(null);
    setSubmitting(true);
    try {
      const tech = techCsv.split(",").map(s => s.trim()).filter(Boolean);
      const payload = {
        title: title.trim(),
        blurb: blurb.trim(),
        tech,
        year: Number(year),
        role: role.trim(),
        link: link.trim() || undefined,
        repo: repo.trim() || undefined,
      };

      if (editingId) {
        const updated = await updateProject(editingId, payload);
        setSubmitOk(`Updated: ${updated.title} (id: ${updated.id})`);
      } else {
        const created = await createProject(payload);
        setSubmitOk(`Created: ${created.title} (id: ${created.id})`);
      }

      await load();
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(msg || "Save failed");
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
            <div className={styles.note}>Token lives only in memory (clears on refresh).</div>
          </form>
        </section>
      ) : (
        <>
          <div className={styles.actions}>
            <button className={styles.btn} onClick={handleLogout}>Log out</button>
          </div>

          <section className={styles.card} style={{ marginTop: 16 }}>
            <h3 className={styles.heading} style={{ marginTop: 0 }}>
              {editingId ? "Edit Project" : "Create Project"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <label htmlFor="title">Title</label>
                <input id="title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className={styles.row}>
                <label htmlFor="blurb">Blurb</label>
                <textarea id="blurb" className={styles.textarea} value={blurb} onChange={(e) => setBlurb(e.target.value)} />
              </div>
              <div className={styles.row}>
                <label htmlFor="tech">Tech (comma-separated)</label>
                <input id="tech" className={styles.input} value={techCsv} onChange={(e) => setTechCsv(e.target.value)} />
              </div>
              <div className={styles.row}>
                <label htmlFor="year">Year</label>
                <input id="year" className={styles.input} type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
              </div>
              <div className={styles.row}>
                <label htmlFor="role">Role</label>
                <input id="role" className={styles.input} value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div className={styles.row}>
                <label htmlFor="link">Link (optional)</label>
                <input id="link" className={styles.input} value={link} onChange={(e) => setLink(e.target.value)} />
              </div>
              <div className={styles.row}>
                <label htmlFor="repo">Repo (optional)</label>
                <input id="repo" className={styles.input} value={repo} onChange={(e) => setRepo(e.target.value)} />
              </div>

              <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.btnAccent}`} disabled={submitting}>
                  {submitting ? (editingId ? "Saving…" : "Creating…") : (editingId ? "Save" : "Create")}
                </button>
                {editingId && (
                  <button type="button" className={styles.btn} onClick={resetForm}>Cancel edit</button>
                )}
              </div>

              {submitError && <div className={styles.error}>{submitError}</div>}
              {submitOk && <div className={styles.success}>{submitOk}</div>}
            </form>
          </section>

          <section className={styles.card} style={{ marginTop: 16 }}>
            <h3 className={styles.heading} style={{ marginTop: 0 }}>Manage Projects</h3>
            {loading ? (
              <p className="subtle">Loading…</p>
            ) : listError ? (
              <p className={styles.error}>{listError}</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>Title</th>
                    <th className={styles.th}>Year</th>
                    <th className={styles.th}>Role</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(p => (
                    <tr key={p.id} className={styles.tr}>
                      <td className={styles.td}>
                        <div>{p.title}</div>
                        <div className={styles.small}>{p.id}</div>
                      </td>
                      <td className={styles.td}>{p.year}</td>
                      <td className={styles.td}>{p.role}</td>
                      <td className={styles.td}>
                        <button className={styles.btn} onClick={() => startEdit(p)}>Edit</button>{" "}
                        <button className={styles.btn} onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </main>
  );
}
