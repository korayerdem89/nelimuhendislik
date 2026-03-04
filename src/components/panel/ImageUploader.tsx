import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: number;
  path: string;
  thumbnailPath: string | null;
  originalName: string;
}

interface ImageUploaderProps {
  value: string;
  onChange: (path: string) => void;
  aspect?: "1/1" | "16/9" | "4/3";
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
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

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await api.upload<MediaItem>(
          "/api/admin/media/upload",
          formData,
        );
        onChange(result.path);
      } catch (err) {
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
      if (file?.type.startsWith("image/")) {
        handleUpload(file);
      }
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-3 h-3 mr-1" />
          Değiştir
        </Button>
      )}
    </div>
  );
}
