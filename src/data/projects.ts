import { api } from "@/lib/api";

export type ProjectStatus = "İnşaat" | "Satışta" | "Tamamlandı";
export type PhaseStatus = "completed" | "active" | "pending";

export interface ProjectPhase {
  id: string;
  name: string;
  status: PhaseStatus;
  completedDate?: string;
}

export interface ProjectUnitType {
  type: string;
  count: number;
  grossArea: string;
  netArea: string;
}

export interface ProjectDetails {
  neighborhood: string;
  district: string;
  city: string;
  locationImage: string;
  highlights: string[];
  unitTypes: ProjectUnitType[];
  totalUnits: number;
  totalBlocks: number;
  landscapeRatio: string;
  parking: string | "-";
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  year: string;
  type: string;
  description: string;
  image: string;
  status: ProjectStatus;
  details: ProjectDetails;
  phases: ProjectPhase[];
}

export const defaultPhases: Omit<ProjectPhase, "status" | "completedDate">[] = [
  { id: "design", name: "Proje Tasarımı" },
  { id: "permit", name: "Ruhsat" },
  { id: "foundation", name: "Temel" },
  { id: "structure", name: "Kaba İnşaat" },
  { id: "finishing", name: "İnce İşler" },
  { id: "mep", name: "Mekanik & Elektrik" },
  { id: "landscape", name: "Peyzaj" },
  { id: "handover", name: "Teslim" },
];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  Satışta: "Satışta",
  Tamamlandı: "Tamamlandı",
  İnşaat: "İnşaat",
};

let _cachedProjects: Project[] | null = null;
let _fetchPromise: Promise<Project[]> | null = null;

export async function fetchProjects(): Promise<Project[]> {
  if (_cachedProjects) return _cachedProjects;
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = api.get<Project[]>("/api/public/projects").then((data) => {
    _cachedProjects = data;
    _fetchPromise = null;
    return data;
  });

  return _fetchPromise;
}

export function invalidateProjectsCache() {
  _cachedProjects = null;
  _fetchPromise = null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await api.get<Project>(`/api/public/projects/${slug}`);
  } catch {
    return null;
  }
}
