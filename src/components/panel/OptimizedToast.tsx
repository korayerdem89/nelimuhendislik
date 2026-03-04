import { toast } from "sonner";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface OptimizeInfo {
  originalName: string;
  originalSize: number;
  optimizedSize: number;
  originalFormat: string;
  width?: number | null;
  height?: number | null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFormatLabel(format: string): string {
  const map: Record<string, string> = {
    jpeg: "JPEG",
    jpg: "JPEG",
    png: "PNG",
    gif: "GIF",
    avif: "AVIF",
    webp: "WebP",
    ".jpeg": "JPEG",
    ".jpg": "JPEG",
    ".png": "PNG",
    ".gif": "GIF",
    ".avif": "AVIF",
    ".webp": "WebP",
  };
  return map[format.toLowerCase()] || format.toUpperCase();
}

function OptimizedToastContent({ info }: { info: OptimizeInfo }) {
  const saved = info.originalSize - info.optimizedSize;
  const percent = info.originalSize > 0
    ? Math.round((saved / info.originalSize) * 100)
    : 0;
  const fromFormat = getFormatLabel(info.originalFormat);
  const didShrink = saved > 0;

  return (
    <div className="flex items-start gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex-shrink-0 mt-0.5 relative">
        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
        <Sparkles className="w-3.5 h-3.5 text-amber-500 absolute -top-1 -right-1 animate-pulse" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-tight">
          Görsel optimize edilerek eklendi
        </p>

        <p
          className="text-xs text-gray-500 truncate mt-0.5"
          title={info.originalName}
        >
          {info.originalName}
        </p>

        <div className="flex items-center gap-1.5 mt-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
            {fromFormat}
          </span>
          <ArrowRight className="w-3 h-3 text-gray-400" />
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">
            WebP
          </span>

          {didShrink && (
            <span className="ml-auto text-[10px] font-semibold text-emerald-600 tabular-nums">
              %{percent} küçüldü
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400 tabular-nums">
          <span>{formatBytes(info.originalSize)}</span>
          <span>→</span>
          <span className="text-gray-600 font-medium">{formatBytes(info.optimizedSize)}</span>
          {info.width && info.height && (
            <>
              <span className="text-gray-300">·</span>
              <span>{info.width}×{info.height}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function showOptimizedToast(info: OptimizeInfo) {
  toast.custom(
    () => (
      <div className="w-[360px] bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3">
        <OptimizedToastContent info={info} />
      </div>
    ),
    { duration: 4000 },
  );
}
