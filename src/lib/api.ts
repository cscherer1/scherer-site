// src/lib/api.ts
import type { ProjectsDto, LoginResponse, CreateProjectRequest, Project } from "./types";
import { getToken } from "./auth";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

/** Generic JSON fetcher with Authorization header if a token exists */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const token = getToken();

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const details = await res.text().catch(() => "");
    throw new Error(
      `HTTP ${res.status} ${res.statusText}${details ? ` — ${details.slice(0, 200)}` : ""}`
    );
  }

  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

/** Convenience function for the Projects page */
export function fetchProjects() {
  return api<ProjectsDto>("/api/projects");
}

/** POST /api/auth/login — returns { token } */
export function login(password: string) {
  return api<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

/** POST /api/projects — creates a project (requires Bearer token) */
export function createProject(payload: CreateProjectRequest) {
  return api<Project>("/api/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
