import { useState, useEffect, useRef, useCallback } from "react";
import { Upload, Trash2, Copy, Check, Type, Info } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { showOptimizedToast } from "@/components/panel/OptimizedToast";

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  thumbnailPath: string | null;
  altText: string;
  width: number | null;
  height: number | null;
  createdAt: string;
}

interface MediaUploadResult extends MediaItem {
  originalSize: number;
  originalFormat: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [editingAltId, setEditingAltId] = useState<number | null>(null);
  const [altDraft, setAltDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    api
      .get<MediaItem[]>("/api/admin/media")
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(fetchMedia, []);

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    let failCount = 0;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const result = await api.upload<MediaUploadResult>(
          "/api/admin/media/upload",
          formData,
        );
        showOptimizedToast({
          originalName: result.originalName,
          originalSize: result.originalSize,
          optimizedSize: result.size,
          originalFormat: result.originalFormat,
          width: result.width,
          height: result.height,
        });
      } catch {
        failCount++;
        toast.error(`${file.name} yüklenemedi`);
      }
    }

    if (failCount > 0 && failCount < files.length) {
      toast.warning(`${failCount} görsel yüklenemedi.`);
    }

    setUploading(false);
    fetchMedia();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu görseli silmek istediğinize emin misiniz?")) return;
    await api.delete(`/api/admin/media/${id}`);
    toast.success("Görsel silindi");
    fetchMedia();
  };

  const copyPath = (item: MediaItem) => {
    navigator.clipboard.writeText(item.path);
    setCopiedId(item.id);
    toast.success("Yol kopyalandı");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const startEditAlt = useCallback((item: MediaItem) => {
    setEditingAltId(item.id);
    setAltDraft(item.altText || "");
  }, []);

  const saveAlt = useCallback(async (id: number) => {
    try {
      await api.put(`/api/admin/media/${id}`, { altText: altDraft });
      setItems((prev) =>
        prev.map((item) => item.id === id ? { ...item, altText: altDraft } : item),
      );
      toast.success("Görsel açıklaması kaydedildi.");
    } catch {
      toast.error("Açıklama kaydedilemedi.");
    }
    setEditingAltId(null);
  }, [altDraft]);

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
        <h1 className="text-2xl font-semibold text-gray-900">Medya Kütüphanesi</h1>
        <Button onClick={() => inputRef.current?.click()} disabled={uploading}>
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Yükleniyor..." : "Görsel Yükle"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleUpload(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-gray-400 transition-colors"
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">
          Görselleri sürükleyip bırakın veya yukarıdaki butona tıklayın
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
          >
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src={`${API_URL}${item.thumbnailPath || item.path}`}
                alt={item.altText || item.originalName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-700 truncate" title={item.originalName}>
                {item.originalName}
              </p>
              <p className="text-xs text-gray-400">
                {formatBytes(item.size)}
                {item.width && item.height && ` · ${item.width}x${item.height}`}
              </p>

              {editingAltId === item.id ? (
                <div className="mt-2 space-y-1.5">
                  <textarea
                    value={altDraft}
                    onChange={(e) => setAltDraft(e.target.value)}
                    placeholder='Örn: "İzmir Çiğli Valorya 3 projesinin dış cephe görseli"'
                    rows={2}
                    autoFocus
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none placeholder:italic placeholder:text-gray-400"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        saveAlt(item.id);
                      }
                      if (e.key === "Escape") setEditingAltId(null);
                    }}
                  />
                  <div className="flex items-start gap-1.5 text-[10px] text-gray-400 leading-snug">
                    <Info className="w-3 h-3 mt-px flex-shrink-0" />
                    <span>
                      Arama motorları görseli "göremez", bu metni okur. İyi bir açıklama Google Görseller sıralamanızı yükseltir.
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="sm"
                      className="h-6 text-[10px] px-2"
                      onClick={() => saveAlt(item.id)}
                    >
                      Kaydet
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] px-2"
                      onClick={() => setEditingAltId(null)}
                    >
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-1.5">
                  {item.altText ? (
                    <p
                      className="text-[10px] text-emerald-600 truncate cursor-pointer hover:text-emerald-700"
                      title={`SEO Açıklaması: ${item.altText}`}
                      onClick={() => startEditAlt(item)}
                    >
                      {item.altText}
                    </p>
                  ) : (
                    <button
                      onClick={() => startEditAlt(item)}
                      className="flex items-center gap-1 text-[10px] text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <Type className="w-3 h-3" />
                      SEO açıklaması ekle
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-center gap-1 mt-1.5">
                <button
                  onClick={() => copyPath(item)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors rounded"
                  title="Yolu kopyala"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors rounded"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            Henüz yüklenmiş görsel yok.
          </div>
        )}
      </div>
    </div>
  );
}
