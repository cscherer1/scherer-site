// src/lib/types.ts
export type Project = {
  id: string;
  title: string;
  blurb: string;
  tech: string[];
  year: number;
  role: string;
  link?: string;
  repo?: string;
};

export type ProjectsDto = {
  heading: string;
  items: Project[];
};

// === Admin / Auth ===
export type LoginResponse = {
  token: string;
};

// === Create Project (matches .NET CreateProjectRequest) ===
export type CreateProjectRequest = {
  title: string;
  blurb: string;
  tech: string[];
  year: number;
  role: string;
  link?: string;
  repo?: string;
};

// === Update Project ===
export type UpdateProjectRequest = {
  title: string;
  blurb: string;
  tech: string[];
  year: number;
  role: string;
  link?: string;
  repo?: string;
};
