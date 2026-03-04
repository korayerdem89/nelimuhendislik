import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
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

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Projeler</h1>
        <Link to="/panel/projeler/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
          >
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
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            Henüz proje yok.
          </div>
        )}
      </div>
    </div>
  );
}
