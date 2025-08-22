// src/lib/api.ts
import type {
  ProjectsDto,
  LoginResponse,
  CreateProjectRequest,
  Project,
  UpdateProjectRequest,
} from "./types";
import { getToken } from "./auth";

/** Structured error with optional field-level messages from ASP.NET validation */
export class ApiError extends Error {
  status: number;
  statusText: string;
  body?: unknown;
  fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    statusText: string,
    body?: unknown,
    fieldErrors?: Record<string, string[]>
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    this.fieldErrors = fieldErrors;
  }
}

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

  // Parse JSON as unknown, then narrow safely
  let json: unknown;
  try {
    json = await res.clone().json();
  } catch {
    // non-JSON response; leave json = undefined
  }

  const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

  const title = isObj(json) && typeof json.title === "string" ? json.title : undefined;

  const fieldErrors =
    isObj(json) && isObj(json.errors) ? (json.errors as Record<string, string[]>) : undefined;

  if (!res.ok) {
    const statusText = title || res.statusText || "Error";
    throw new ApiError(
      `HTTP ${res.status} ${statusText}`,
      res.status,
      statusText,
      json,
      fieldErrors
    );
  }

  if (res.status === 204) return undefined as unknown as T;

  // If we already parsed JSON successfully, return it as T
  if (json !== undefined) return json as T;

  // Fallback: parse now (should be JSON if ok)
  return (await res.json()) as T;
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

/** PUT /api/projects/{id} - Updates a project (requires token) */
export function updateProject(id: string, payload: UpdateProjectRequest) {
  return api<Project>(`/api/projects/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** Delete /api/projects/{id} - Deletes a project (requires token) */
export function deleteProject(id: string) {
  return api<void>(`/api/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
