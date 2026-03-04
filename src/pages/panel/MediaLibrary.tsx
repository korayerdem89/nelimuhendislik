import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Copy, Check } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  thumbnailPath: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
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
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await api.upload("/api/admin/media/upload", formData);
      } catch {
        toast.error(`${file.name} yüklenemedi`);
      }
    }
    setUploading(false);
    toast.success("Görseller yüklendi");
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
                alt={item.originalName}
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
