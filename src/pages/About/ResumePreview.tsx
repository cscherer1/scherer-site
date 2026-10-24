import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import styles from "./about.module.css";

// pdf.js needs a web worker; Vite emits it eagerly via the `?url` import and
// we point the library at it. This lets us render every page of a PDF to a
// <canvas>, stacked vertically, so the whole resume shows inline (no browser
// PDF plugin, no single-page limit).
GlobalWorkerOptions.workerSrc = workerUrl;

interface ResumePreviewProps {
  /** URL of the PDF to render (any PDF — the component is fully generic). */
  src: string;
  /** Fallback link shown if rendering fails (e.g. the raw PDF URL). */
  fallbackUrl: string;
}

export default function ResumePreview({ src, fallbackUrl }: ResumePreviewProps) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    const host = pagesRef.current;
    setStatus("loading");
    setMessage("");

    if (!host) {
      setStatus("error");
      setMessage("Preview container is not available.");
      return;
    }

    void (async () => {
      try {
        const pdf = await getDocument({ url: src }).promise;
        if (cancelled) {
          void pdf.destroy();
          return;
        }

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.className = styles.pdfPageCanvas;

          host.appendChild(canvas);

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            canvas.remove();
            continue;
          }
          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
        }

        await pdf.destroy();
        if (!cancelled) setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Could not render the resume.");
      }
    })();

    return () => {
      cancelled = true;
      if (host) host.innerHTML = "";
    };
  }, [src]);

  return (
    <div className={styles.pdfEmbed}>
      {status === "loading" && (
        <div className={styles.pdfStatus}>Loading preview&hellip;</div>
      )}
      {status === "error" && (
        <div className={styles.pdfStatus} role="alert">
          {message}{"  "}
          <a href={fallbackUrl} target="_blank" rel="noreferrer noopener">
            Open the PDF instead
          </a>
        </div>
      )}
      <div
        ref={pagesRef}
        className={styles.pdfPages}
        style={status === "ready" ? undefined : { display: "none" }}
      />
    </div>
  );
}
