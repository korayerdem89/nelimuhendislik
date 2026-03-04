import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  GripVertical,
  Milestone,
} from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface MilestoneItem {
  id: number;
  year: string;
  title: string;
  description: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface MilestoneForm {
  year: string;
  title: string;
  description: string;
}

const emptyForm: MilestoneForm = { year: "", title: "", description: "" };

export default function Milestones() {
  const [items, setItems] = useState<MilestoneItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<MilestoneForm>(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<MilestoneForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get<MilestoneItem[]>("/api/admin/milestones")
      .then(setItems)
      .catch(() => toast.error("Veriler yüklenemedi."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveReorder = async (ordered: MilestoneItem[]) => {
    try {
      await api.post("/api/admin/milestones/reorder", {
        ids: ordered.map((m) => m.id),
      });
    } catch {
      toast.error("Sıralama kaydedilemedi.");
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const next = [...items];
    const swapIdx = index + direction;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    setItems(next);
    await saveReorder(next);
  };

  const handleAdd = async () => {
    if (!addForm.year.trim() || !addForm.title.trim()) {
      toast.error("Yıl ve başlık zorunludur.");
      return;
    }
    setSaving(true);
    try {
      const created = await api.post<MilestoneItem>(
        "/api/admin/milestones",
        addForm,
      );
      setItems((prev) => [...prev, created]);
      setAddForm(emptyForm);
      setShowAddForm(false);
      toast.success("Kilometre taşı eklendi.");
    } catch {
      toast.error("Eklenemedi.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: MilestoneItem) => {
    setEditingId(item.id);
    setEditForm({ year: item.year, title: item.title, description: item.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(emptyForm);
  };

  const handleUpdate = async (id: number) => {
    if (!editForm.year.trim() || !editForm.title.trim()) {
      toast.error("Yıl ve başlık zorunludur.");
      return;
    }
    setSaving(true);
    try {
      const updated = await api.put<MilestoneItem>(
        `/api/admin/milestones/${id}`,
        editForm,
      );
      setItems((prev) => prev.map((m) => (m.id === id ? updated : m)));
      cancelEdit();
      toast.success("Güncellendi.");
    } catch {
      toast.error("Güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await api.delete(`/api/admin/milestones/${id}`);
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Silindi.");
    } catch {
      toast.error("Silinemedi.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Kilometre Taşları
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Kurumsal sayfasındaki zaman çizelgesini buradan yönetin.
          </p>
        </div>
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Yeni Ekle
          </Button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5">
          <h2 className="text-sm font-semibold text-blue-900 mb-4">
            Yeni Kilometre Taşı
          </h2>
          <div className="grid sm:grid-cols-[120px_1fr] gap-3 mb-3">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Yıl *
              </label>
              <Input
                placeholder="Örn: 2025"
                value={addForm.year}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, year: e.target.value }))
                }
                className="bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Başlık *
              </label>
              <Input
                placeholder="Kısa ve açıklayıcı bir başlık"
                value={addForm.title}
                onChange={(e) =>
                  setAddForm((f) => ({ ...f, title: e.target.value }))
                }
                className="bg-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-gray-600 mb-1 block">
              Açıklama
            </label>
            <Textarea
              rows={2}
              placeholder="Kısa bir açıklama..."
              value={addForm.description}
              onChange={(e) =>
                setAddForm((f) => ({ ...f, description: e.target.value }))
              }
              className="bg-white resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAdd}
              disabled={saving}
              className="bg-gray-900 hover:bg-gray-800 text-white gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Ekleniyor..." : "Ekle"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowAddForm(false);
                setAddForm(emptyForm);
              }}
            >
              <X className="w-3.5 h-3.5 mr-1" />
              İptal
            </Button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && !showAddForm && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Milestone className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            Henüz kilometre taşı eklenmemiş.
          </p>
          <Button
            className="mt-4 bg-gray-900 hover:bg-gray-800 text-white gap-2"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4" />
            İlk taşı ekle
          </Button>
        </div>
      )}

      {/* List */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border transition-shadow ${
                editingId === item.id
                  ? "border-blue-300 shadow-md"
                  : "border-gray-200 hover:shadow-sm"
              }`}
            >
              {editingId === item.id ? (
                /* Edit mode */
                <div className="p-5">
                  <div className="grid sm:grid-cols-[120px_1fr] gap-3 mb-3">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Yıl *
                      </label>
                      <Input
                        value={editForm.year}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, year: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Başlık *
                      </label>
                      <Input
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, title: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs text-gray-600 mb-1 block">
                      Açıklama
                    </label>
                    <Textarea
                      rows={2}
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      className="resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdate(item.id)}
                      disabled={saving}
                      className="bg-gray-900 hover:bg-gray-800 text-white gap-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saving ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                    <Button variant="ghost" onClick={cancelEdit}>
                      <X className="w-3.5 h-3.5 mr-1" />
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="flex items-start gap-3 p-4">
                  {/* Drag handle / order indicator */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-0.5 pt-0.5">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                  </div>

                  {/* Year badge */}
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-neli-600/10 text-neli-600 text-xs font-bold font-serif">
                      {item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex items-center gap-1">
                    {/* Reorder */}
                    <div className="flex flex-col">
                      <button
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Yukarı taşı"
                      >
                        <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                      <button
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Aşağı taşı"
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>

                    <button
                      onClick={() => startEdit(item)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Düzenle"
                    >
                      <Pencil className="w-3.5 h-3.5 text-gray-500" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-6">
        Sıralama anında kaydedilir. Değişiklikler kurumsal sayfasına otomatik yansır.
      </p>
    </div>
  );
}
