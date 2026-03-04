import { useState, useEffect } from "react";
import {
  FileText,
  Building2,
  MapPin,
  Image,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Layers,
} from "lucide-react";
import { api } from "@/lib/api";

interface Activity {
  id: number;
  action: string;
  entityType: string;
  entityId: number | null;
  entityTitle: string;
  username: string;
  details: string | null;
  createdAt: string;
}

const entityIcons: Record<string, typeof FileText> = {
  blog: FileText,
  project: Building2,
  map_pin: MapPin,
  media: Image,
  settings: Settings,
};

const actionIcons: Record<string, typeof Plus> = {
  create: Plus,
  update: Pencil,
  delete: Trash2,
  bulk_delete: Layers,
  bulk_update: Layers,
  upload: Upload,
  settings_update: Settings,
};

const actionColors: Record<string, string> = {
  create: "bg-green-50 text-green-600",
  update: "bg-blue-50 text-blue-600",
  delete: "bg-red-50 text-red-600",
  bulk_delete: "bg-red-50 text-red-600",
  bulk_update: "bg-amber-50 text-amber-600",
  upload: "bg-purple-50 text-purple-600",
  settings_update: "bg-gray-100 text-gray-600",
};

const actionLabels: Record<string, string> = {
  create: "Oluşturuldu",
  update: "Güncellendi",
  delete: "Silindi",
  bulk_delete: "Toplu Silme",
  bulk_update: "Toplu Güncelleme",
  upload: "Yüklendi",
  settings_update: "Ayarlar Güncellendi",
};

const entityLabels: Record<string, string> = {
  blog: "Blog",
  project: "Proje",
  map_pin: "Harita Pini",
  media: "Medya",
  settings: "Ayarlar",
};

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Az önce";
  if (minutes < 60) return `${minutes} dk önce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} gün önce`;
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Activity[]>("/api/admin/activity?limit=100")
      .then(setActivities)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Etkinlik Geçmişi
      </h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {activities.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            Henüz kayıtlı etkinlik yok.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {activities.map((activity) => {
              const EntityIcon =
                entityIcons[activity.entityType] || FileText;
              const ActionIcon = actionIcons[activity.action] || Pencil;
              const color = actionColors[activity.action] || "bg-gray-100 text-gray-500";

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${color}`}>
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">
                        {actionLabels[activity.action] || activity.action}
                      </span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <EntityIcon className="w-3 h-3" />
                        {entityLabels[activity.entityType] || activity.entityType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5 truncate">
                      {activity.entityTitle}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">
                    {formatRelativeTime(activity.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
