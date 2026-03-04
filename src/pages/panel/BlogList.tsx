import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, EyeOff, CheckSquare, Square, X } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  status: string;
  featured: boolean;
  coverImage: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const fetchPosts = () => {
    api
      .get<BlogPost[]>("/api/admin/blog")
      .then(setPosts)
      .finally(() => setLoading(false));
  };

  useEffect(fetchPosts, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) return;
    await api.delete(`/api/admin/blog/${id}`);
    toast.success("Blog yazısı silindi");
    fetchPosts();
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
      prev.size === posts.length
        ? new Set()
        : new Set(posts.map((p) => p.id)),
    );
  }, [posts]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const handleBulkDelete = async () => {
    const count = selectedIds.size;
    if (!confirm(`${count} yazıyı silmek istediğinize emin misiniz?`)) return;
    await api.post("/api/admin/blog/bulk-delete", { ids: [...selectedIds] });
    toast.success(`${count} yazı silindi`);
    clearSelection();
    fetchPosts();
  };

  const handleBulkStatus = async (status: string) => {
    const count = selectedIds.size;
    const label = status === "published" ? "yayında" : "taslak";
    await api.post("/api/admin/blog/bulk-status", {
      ids: [...selectedIds],
      status,
    });
    toast.success(`${count} yazı ${label} olarak güncellendi`);
    clearSelection();
    fetchPosts();
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
        <h1 className="text-2xl font-semibold text-gray-900">Blog Yazıları</h1>
        <Link to="/panel/blog/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yazı
          </Button>
        </Link>
      </div>

      {hasSelection && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-sm font-medium text-gray-700">
            {selectedIds.size} seçili
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkStatus("published")}
            >
              <Eye className="w-3 h-3 mr-1" />
              Yayınla
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkStatus("draft")}
            >
              <EyeOff className="w-3 h-3 mr-1" />
              Taslağa Al
            </Button>
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="w-10 px-4 py-3">
                  <button
                    onClick={toggleSelectAll}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {selectedIds.size === posts.length && posts.length > 0 ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Yazı
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Kategori
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Durum
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Tarih
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className={`hover:bg-gray-50 transition-colors ${selectedIds.has(post.id) ? "bg-blue-50/40" : ""}`}
                >
                  <td className="w-10 px-4 py-3">
                    <button
                      onClick={() => toggleSelect(post.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {selectedIds.has(post.id) ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {post.coverImage && (
                        <img
                          src={getImageUrl(post.coverImage)}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate max-w-xs">
                          {post.title}
                        </div>
                        {post.featured && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            Öne Çıkan
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">
                      {post.category || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        post.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.status === "published" ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {post.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("tr-TR")
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/panel/blog/${post.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Henüz blog yazısı yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
