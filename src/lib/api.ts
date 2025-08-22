// src/lib/api.ts
import type { ProjectsDto } from "./types";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

/** Generic JSON fetcher with simple error handling */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

if (!res.ok) {
  const details = await res.text().catch(() => ""); // <- no empty catch block
  throw new Error(
    `HTTP ${res.status} ${res.statusText}${details ? ` — ${details.slice(0, 200)}` : ""}`
  );
}

  // 204 No Content guard
  if (res.status === 204) return undefined as unknown as T;

  return res.json() as Promise<T>;
}

/** Convenience function for the Projects page */
export function fetchProjects() {
  return api<ProjectsDto>("/api/projects");
}
