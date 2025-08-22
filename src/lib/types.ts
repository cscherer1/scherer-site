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
