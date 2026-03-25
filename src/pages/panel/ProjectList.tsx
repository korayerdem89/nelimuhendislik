import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  X,
  LayoutPanelTop,
  ChevronUp,
  ChevronDown,
  Save,
  Info,
} from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { invalidateProjectsCache } from "@/data/projects";

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
  const [homeFeaturedIds, setHomeFeaturedIds] = useState<number[]>([]);
  const [homeFeaturedSaving, setHomeFeaturedSaving] = useState(false);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get<Project[]>("/api/admin/projects"),
      api.get<{ ids: number[] }>("/api/admin/projects/home-featured"),
    ])
      .then(([projList, featured]) => {
        setProjects(projList);
        const ids = Array.isArray(featured.ids)
          ? featured.ids
              .map((x) => Number(x))
              .filter((n) => Number.isInteger(n) && n > 0)
              .slice(0, 3)
          : [];
        setHomeFeaturedIds(ids);
      })
      .catch(() => {
        toast.error("Projeler yüklenemedi");
        setProjects([]);
        setHomeFeaturedIds([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" projesini silmek istediğinize emin misiniz?`)) return;
    await api.delete(`/api/admin/projects/${id}`);
    toast.success("Proje silindi");
    loadData();
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
    loadData();
  };

  const handleBulkStatus = async (status: string) => {
    const count = selectedIds.size;
    await api.post("/api/admin/projects/bulk-status", {
      ids: [...selectedIds],
      status,
    });
    toast.success(`${count} proje → ${status}`);
    clearSelection();
    loadData();
  };

  const toggleHomeFeatured = (id: number) => {
    setHomeFeaturedIds((prev) => {
      const i = prev.indexOf(id);
      if (i >= 0) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        toast.warning("Vitrinde en fazla 3 proje olabilir. Önce birini vitrinden çıkarın.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const moveHomeFeatured = (index: number, dir: -1 | 1) => {
    setHomeFeaturedIds((prev) => {
      const j = index + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const saveHomeFeatured = async () => {
    setHomeFeaturedSaving(true);
    try {
      const { ids } = await api.put<{ ids: number[] }>("/api/admin/projects/home-featured", {
        ids: homeFeaturedIds,
      });
      const normalized = Array.isArray(ids)
        ? ids
            .map((x) => Number(x))
            .filter((n) => Number.isInteger(n) && n > 0)
            .slice(0, 3)
        : [];
      setHomeFeaturedIds(normalized);
      invalidateProjectsCache();
      toast.success("Ana sayfa vitrini kaydedildi. Ana sayfayı yenilediğinizde veya sekmeye döndüğünüzde güncel liste görünür.");
    } catch (e) {
      console.error(e);
      toast.error("Kaydedilemedi. Oturumunuzun açık olduğundan emin olun.");
    } finally {
      setHomeFeaturedSaving(false);
    }
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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Projeler</h1>
        <div className="flex flex-wrap items-center gap-2">
          {projects.length > 0 && (
            <Button variant="outline" size="sm" onClick={toggleSelectAll}>
              {selectedIds.size === projects.length ? (
                <>
                  <CheckSquare className="w-3.5 h-3.5 mr-1" /> İptal
                </>
              ) : (
                <>
                  <Square className="w-3.5 h-3.5 mr-1" /> Tümünü Seç
                </>
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

      <section
        className="rounded-2xl border border-orange-200/80 bg-gradient-to-br from-orange-50/90 via-white to-amber-50/50 p-5 sm:p-6 shadow-sm ring-1 ring-orange-100/60"
        aria-labelledby="vitrin-heading"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4 min-w-0 flex-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-800 shadow-inner ring-1 ring-orange-200/80">
              <LayoutPanelTop className="w-5 h-5" strokeWidth={2} aria-hidden />
            </div>
            <div className="min-w-0">
              <h2 id="vitrin-heading" className="text-base font-semibold text-gray-900">
                Ana sayfa vitrini
              </h2>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-xl">
                Ziyaretçilerin ilk gördüğü üç projeyi buradan seçin. Kartlardaki{" "}
                <span className="inline-flex items-center gap-0.5 align-middle text-orange-800 font-medium">
                  <LayoutPanelTop className="w-3.5 h-3.5" />
                  vitrin
                </span>{" "}
                düğmesiyle ekleyip çıkarın; sırayı oklarla değiştirip{" "}
                <strong className="font-medium text-gray-800">Kaydet</strong> ile yayınlayın.
              </p>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/70 border border-orange-100/90 px-3 py-2 text-xs text-gray-600">
                <Info className="w-3.5 h-3.5 shrink-0 text-orange-600 mt-0.5" aria-hidden />
                <span>
                  Liste boş bırakılıp kaydedilirse ana sayfa, veritabanındaki <strong>en yeni 3 projeyi</strong> göstermeye devam eder.
                </span>
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={saveHomeFeatured}
            disabled={homeFeaturedSaving}
            className="shrink-0 bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {homeFeaturedSaving ? "Kaydediliyor…" : "Vitrini kaydet"}
          </Button>
        </div>

        {homeFeaturedIds.length > 0 && (
          <div className="mt-5 pt-5 border-t border-orange-200/60">
            <p className="text-xs font-medium uppercase tracking-wide text-orange-900/70 mb-3">
              Yayın sırası (soldan sağa)
            </p>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {homeFeaturedIds.map((id, index) => {
                const p = projects.find((x) => x.id === id);
                return (
                  <li
                    key={id}
                    className="flex min-w-0 flex-1 sm:flex-initial sm:max-w-[220px] items-center gap-3 rounded-xl border border-orange-200/90 bg-white/90 p-2 pr-2 shadow-sm"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-orange-100 ring-1 ring-orange-200/80">
                      {p?.image ? (
                        <img
                          src={getImageUrl(p.image)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-orange-300">
                          <LayoutPanelTop className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-orange-900">
                        <LayoutPanelTop className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        <span className="text-xs font-semibold">Sıra {index + 1}</span>
                      </div>
                      <p className="truncate text-sm font-medium text-gray-900">{p?.name ?? `Proje #${id}`}</p>
                    </div>
                    <div className="flex flex-col shrink-0 gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveHomeFeatured(index, -1)}
                        disabled={index === 0}
                        className="rounded-md p-1 text-gray-500 hover:bg-orange-100 hover:text-orange-900 disabled:opacity-25"
                        aria-label="Yukarı taşı"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveHomeFeatured(index, 1)}
                        disabled={index === homeFeaturedIds.length - 1}
                        className="rounded-md p-1 text-gray-500 hover:bg-orange-100 hover:text-orange-900 disabled:opacity-25"
                        aria-label="Aşağı taşı"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {hasSelection && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-sm font-medium text-gray-700">{selectedIds.size} seçili</span>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <Button key={s} size="sm" variant="outline" onClick={() => handleBulkStatus(s)}>
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
              type="button"
              onClick={clearSelection}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              aria-label="Seçimi temizle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const isSelected = selectedIds.has(project.id);
          const homeIdx = homeFeaturedIds.indexOf(project.id);
          const onVitrin = homeIdx >= 0;
          return (
            <article
              key={project.id}
              className={[
                "rounded-2xl border overflow-hidden transition-shadow duration-200 group relative flex flex-col",
                isSelected
                  ? "border-blue-400 ring-2 ring-blue-200/80 shadow-md"
                  : onVitrin
                    ? "border-orange-200/90 bg-gradient-to-b from-orange-50/95 via-orange-50/40 to-amber-50/30 ring-2 ring-orange-200/70 shadow-md shadow-orange-100/50"
                    : "border-gray-200/90 bg-white hover:shadow-md hover:border-gray-300/90",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => toggleSelect(project.id)}
                className="absolute top-3 left-3 z-20 p-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200/90 text-gray-500 hover:text-gray-800 shadow-sm"
                aria-label="Toplu işlem için seç"
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleHomeFeatured(project.id)}
                className={[
                  "absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl border-2 shadow-sm transition-colors",
                  onVitrin
                    ? "border-orange-400 bg-orange-500 text-white hover:bg-orange-600"
                    : "border-gray-200/90 bg-white/95 text-gray-400 hover:text-orange-700 hover:border-orange-300 hover:bg-orange-50/90",
                ].join(" ")}
                title={
                  onVitrin
                    ? "Ana sayfa vitrininden çıkar"
                    : "Ana sayfa vitrinine ekle (en fazla 3)"
                }
                aria-pressed={onVitrin}
                aria-label={onVitrin ? `Vitrinde, sıra ${homeIdx + 1}` : "Vitrine ekle"}
              >
                <LayoutPanelTop className="w-[18px] h-[18px]" strokeWidth={2.25} />
              </button>

              {project.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-orange-100/30">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {onVitrin && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 pt-10 bg-gradient-to-t from-orange-950/75 via-orange-900/25 to-transparent">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-2 ring-white/30">
                        <LayoutPanelTop className="w-3.5 h-3.5 opacity-95" strokeWidth={2.5} />
                        Ana sayfada · {homeIdx + 1}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className={`p-4 flex flex-col flex-1 ${onVitrin ? "bg-orange-50/20" : ""}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{project.location}</p>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                      project.status === "Satışta"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-200/60"
                        : project.status === "İnşaat"
                          ? "bg-orange-50 text-orange-800 ring-1 ring-orange-200/60"
                          : "bg-gray-100 text-gray-600 ring-1 ring-gray-200/80"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                {onVitrin && (
                  <p className="mb-3 text-xs font-medium text-orange-800 flex items-center gap-1">
                    <LayoutPanelTop className="w-3.5 h-3.5 shrink-0" />
                    Ana sayfa vitrininde yayında
                  </p>
                )}
                <div className="flex items-center gap-1 mt-auto pt-1">
                  <Link
                    to={`/panel/projeler/${project.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                    aria-label="Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id, project.name)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    aria-label="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 rounded-2xl border border-dashed border-gray-200">
            Henüz proje yok.
          </div>
        )}
      </div>
    </div>
  );
}
