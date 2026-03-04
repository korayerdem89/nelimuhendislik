import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Info } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { showOptimizedToast } from "./OptimizedToast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

interface MediaUploadResult {
  id: number;
  path: string;
  thumbnailPath: string | null;
  originalName: string;
  size: number;
  originalSize: number;
  originalFormat: string;
  width: number | null;
  height: number | null;
}

interface ImageUploaderProps {
  value: string;
  onChange: (path: string) => void;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  aspect?: "1/1" | "16/9" | "4/3";
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  altValue = "",
  onAltChange,
  aspect = "1/1",
  label = "Görsel",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads")) return `${API_URL}${path}`;
    return path;
  };

  function validateFile(file: File): string | null {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Desteklenmeyen dosya formatı. Lütfen JPEG, PNG, WebP veya GIF yükleyin.";
    }
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return `Dosya çok büyük (${sizeMB} MB). Maksimum 10 MB yüklenebilir.`;
    }
    return null;
  }

  const handleUpload = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await api.upload<MediaUploadResult>(
          "/api/admin/media/upload",
          formData,
        );
        onChange(result.path);
        showOptimizedToast({
          originalName: result.originalName,
          originalSize: result.originalSize,
          optimizedSize: result.size,
          originalFormat: result.originalFormat,
          width: result.width,
          height: result.height,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "";

        if (message === "Unauthorized") {
          toast.error("Oturumunuz sona erdi. Lütfen tekrar giriş yapın.");
        } else if (message.includes("File too large")) {
          toast.error("Dosya sunucu tarafından reddedildi. Boyutu çok büyük.");
        } else if (message.includes("Unsupported")) {
          toast.error("Bu dosya formatı desteklenmiyor.");
        } else if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
          toast.error("Sunucuya bağlanılamadı. Lütfen sunucunun çalıştığından emin olun.");
        } else {
          toast.error("Görsel yüklenemedi. Lütfen tekrar deneyin.");
        }
        console.error("Upload failed:", err);
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Sadece görsel dosyaları yüklenebilir.");
        return;
      }
      handleUpload(file);
    },
    [handleUpload],
  );

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
      </label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg overflow-hidden transition-colors ${
          uploading
            ? "border-blue-400 bg-blue-50"
            : value
              ? "border-gray-200"
              : "border-gray-300 hover:border-gray-400"
        }`}
        style={{ aspectRatio: aspect }}
      >
        {value ? (
          <>
            <img
              src={getImageUrl(value)}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => toast.error("Görsel önizlemesi yüklenemedi. Dosya silinmiş veya yol hatalı olabilir.")}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-500 transition-colors p-4"
          >
            {uploading ? (
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <>
                <ImageIcon className="w-10 h-10" />
                <span className="text-sm">
                  Sürükle & bırak veya tıkla
                </span>
              </>
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
          e.target.value = "";
        }}
      />
      {value && (
        <div className="flex items-center gap-2 mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="w-3 h-3 mr-1" />
            Değiştir
          </Button>
        </div>
      )}

      {value && onAltChange && (
        <div className="mt-3 space-y-1.5">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            Görsel Açıklaması (SEO)
            <span className="relative group">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 leading-relaxed pointer-events-none shadow-lg">
                Arama motorları görselleri "göremez", bu açıklamayı okur. Doğru yazılmış bir açıklama, sitenizin Google Görseller'de üst sıralarda çıkmasını sağlar.
              </span>
            </span>
          </label>
          <textarea
            value={altValue}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder='Örn: "İzmir Çiğli Valorya 3 konut projesinin dış cephe görseli"'
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none placeholder:text-gray-400 placeholder:italic"
          />
          <p className="text-[11px] text-gray-400 leading-snug">
            Görselde ne olduğunu kısa ve açık bir şekilde yazın. Proje adı, konum ve görsel içeriğini belirtin.
          </p>
        </div>
      )}
    </div>
  );
}
