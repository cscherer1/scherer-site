export default function NotFoundPage() {
  return (
    <main className="container" style={{ padding: "48px 16px 64px" }}>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p className="subtle">The page you’re looking for doesn’t exist.</p>
      <a href="/" style={{ display: "inline-block", marginTop: 12 }}>
        ← Back to Home
      </a>
    </main>
  );
}
