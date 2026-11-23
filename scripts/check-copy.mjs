#!/usr/bin/env node
// Stale-copy guard.
//
// The public site must not tell employers a relocation story that is no longer
// true: Christian settled in Las Vegas on 2026-11-23 and the UK move was
// cancelled. This check scans source text and the text of every served PDF for
// the old relocation copy so it cannot come back silently. It runs as
// `prebuild`, so a stale string or resume blocks the production build.
//
// A line that legitimately needs a forbidden phrase carries a `copy-ok` comment
// and is skipped. Known-stale resume PDFs are pinned by SHA-256 with a bug
// reference and reported as warnings until the owner regenerates them; any new
// PDF hash that still carries the copy fails the check.
import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TARGETS = ["src", "public", ".env.example"];
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".html",
  ".css",
  ".md",
  ".json",
  ".txt",
  ".svg",
  ".xml",
  ".env",
  ".example",
]);
const FORBIDDEN = [
  /brighton/i,
  /greater london/i,
  /relocating to/i,
  /uk move/i,
];
const ALLOW_MARKER = "copy-ok";

// Exact bytes of PDFs that are known to carry the stale copy. The pin is
// deliberately tied to the hash: once a résumé is regenerated (clean text) it
// passes on its own, and a different stale PDF fails instead of warning.
const STALE_PDFS = new Map([
  [
    "a049fa4a41453504f73523ed8a58ae982dcaefe8ad6fb773c27da4a9f2f7f2a4",
    "BUG-1123-05",
  ],
]);

const errors = [];
const warnings = [];
let textFiles = 0;
let pdfFiles = 0;

function relative(file) {
  return path.relative(ROOT, file) || file;
}

function isForbidden(line) {
  return FORBIDDEN.some((pattern) => pattern.test(line));
}

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

async function scanText(file) {
  const content = await readFile(file, "utf8");
  textFiles += 1;
  let allowNext = false;
  content.split(/\r?\n/).forEach((line, index) => {
    if (allowNext) {
      allowNext = false;
      return;
    }
    // The marker may sit on the offending line or on the line above it.
    if (line.includes(ALLOW_MARKER)) {
      allowNext = true;
      return;
    }
    if (!isForbidden(line)) return;
    errors.push({
      kind: "text",
      file: relative(file),
      line: index + 1,
      detail: line.trim(),
    });
  });
}

async function extractPdf(file) {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(await readFile(file));
  const doc = await getDocument({ data, useSystemFonts: true, verbosity: 0 })
    .promise;
  try {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
      const page = await doc.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(" "));
    }
    return pages.join("\n").replace(/\s+/g, " ");
  } finally {
    await doc.destroy();
  }
}

async function scanPdf(file) {
  pdfFiles += 1;
  const text = await extractPdf(file);
  const hits = FORBIDDEN.filter((pattern) => pattern.test(text));
  if (!hits.length) return;

  const hash = createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
  const bug = STALE_PDFS.get(hash);
  const detail = hits
    .map((pattern) => {
      const match = text.match(pattern);
      const at = match ? match.index ?? 0 : 0;
      return text.slice(Math.max(0, at - 50), at + 90).trim();
    })
    .join(" | ");

  if (bug) {
    warnings.push({
      kind: "pdf",
      file: relative(file),
      detail: `${bug} known stale résumé, regenerate before publishing: "${detail}"`,
    });
  } else {
    errors.push({
      kind: "pdf",
      file: relative(file),
      detail: `stale relocation copy in served PDF: "${detail}"`,
    });
  }
}

async function main() {
  for (const target of TARGETS) {
    const full = path.join(ROOT, target);
    let info;
    try {
      info = await stat(full);
    } catch {
      continue;
    }
    const files = info.isDirectory() ? await collect(full) : [full];
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === ".pdf") await scanPdf(file);
      else if (!ext || TEXT_EXTENSIONS.has(ext)) await scanText(file);
    }
  }

  for (const warning of warnings) {
    console.warn(`copy-guard WARNING ${warning.file}: ${warning.detail}`);
  }

  if (errors.length) {
    for (const error of errors) {
      const where =
        error.kind === "text" ? `${error.file}:${error.line}` : error.file;
      console.error(`copy-guard FAIL ${where}: ${error.detail}`);
    }
    console.error(
      `\ncopy-guard: ${errors.length} stale relocation reference(s) found. ` +
        "Update the copy (or add a `copy-ok` comment if it is genuinely generic)."
    );
    process.exit(1);
  }

  console.log(
    `copy-guard: ${textFiles} text file(s) and ${pdfFiles} PDF(s) scanned, no stale relocation copy.`
  );
}

main().catch((error) => {
  console.error(`copy-guard: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
