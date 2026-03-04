import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, CheckSquare, Square, X } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  status: string;
  type: string;
  image: string;
}

const STATUS_OPTIONS = ["İnşaat", "Satışta", "Tamamlandı"];

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const fetchProjects = () => {
    api
      .get<Project[]>("/api/admin/projects")
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(fetchProjects, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" projesini silmek istediğinize emin misiniz?`)) return;
    await api.delete(`/api/admin/projects/${id}`);
    toast.success("Proje silindi");
    fetchProjects();
  };

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("/uploads")) return `${API_URL}${path}`;
    return path;
  };

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.size === projects.length
        ? new Set()
        : new Set(projects.map((p) => p.id)),
    );
  }, [projects]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const handleBulkDelete = async () => {
    const count = selectedIds.size;
    if (!confirm(`${count} projeyi silmek istediğinize emin misiniz?`)) return;
    await api.post("/api/admin/projects/bulk-delete", { ids: [...selectedIds] });
    toast.success(`${count} proje silindi`);
    clearSelection();
    fetchProjects();
  };

  const handleBulkStatus = async (status: string) => {
    const count = selectedIds.size;
    await api.post("/api/admin/projects/bulk-status", {
      ids: [...selectedIds],
      status,
    });
    toast.success(`${count} proje → ${status}`);
    clearSelection();
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
      </div>
    );
  }

  const hasSelection = selectedIds.size > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Projeler</h1>
        <div className="flex items-center gap-2">
          {projects.length > 0 && (
            <Button variant="outline" size="sm" onClick={toggleSelectAll}>
              {selectedIds.size === projects.length ? (
                <><CheckSquare className="w-3.5 h-3.5 mr-1" /> İptal</>
              ) : (
                <><Square className="w-3.5 h-3.5 mr-1" /> Tümünü Seç</>
              )}
            </Button>
          )}
          <Link to="/panel/projeler/yeni">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Proje
            </Button>
          </Link>
        </div>
      </div>

      {hasSelection && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-sm font-medium text-gray-700">
            {selectedIds.size} seçili
          </span>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <Button
                key={s}
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatus(s)}
              >
                {s}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleBulkDelete}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Sil
            </Button>
            <button
              onClick={clearSelection}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const isSelected = selectedIds.has(project.id);
          return (
            <div
              key={project.id}
              className={`bg-white rounded-xl border overflow-hidden group relative ${isSelected ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"}`}
            >
              <button
                onClick={() => toggleSelect(project.id)}
                className="absolute top-3 left-3 z-10 p-1 rounded bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-400 hover:text-gray-600"
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
              {project.image && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.location}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === "Satışta"
                        ? "bg-green-50 text-green-700"
                        : project.status === "İnşaat"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <Link
                    to={`/panel/projeler/${project.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            Henüz proje yok.
          </div>
        )}
      </div>
    </div>
  );
}
