import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Building2,
  MapPin,
  Image,
  ArrowRight,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Layers,
  Settings,
  Clock,
} from "lucide-react";
import { api } from "@/lib/api";

interface Stats {
  blogCount: number;
  projectCount: number;
  pinCount: number;
  mediaCount: number;
}

interface Activity {
  id: number;
  action: string;
  entityType: string;
  entityTitle: string;
  createdAt: string;
}

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
  create: "text-green-600",
  update: "text-blue-600",
  delete: "text-red-500",
  bulk_delete: "text-red-500",
  bulk_update: "text-amber-600",
  upload: "text-purple-600",
  settings_update: "text-gray-500",
};

const actionLabels: Record<string, string> = {
  create: "oluşturuldu",
  update: "güncellendi",
  delete: "silindi",
  bulk_delete: "toplu silme",
  bulk_update: "toplu güncelleme",
  upload: "yüklendi",
  settings_update: "güncellendi",
};

const entityLabels: Record<string, string> = {
  blog: "Blog",
  project: "Proje",
  map_pin: "Pin",
  media: "Medya",
  settings: "Ayarlar",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Az önce";
  if (minutes < 60) return `${minutes} dk`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} sa`;
  const days = Math.floor(hours / 24);
  return `${days} gün`;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    blogCount: 0,
    projectCount: 0,
    pinCount: 0,
    mediaCount: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    Promise.all([
      api.get<unknown[]>("/api/admin/blog"),
      api.get<unknown[]>("/api/admin/projects"),
      api.get<unknown[]>("/api/admin/map-pins"),
      api.get<unknown[]>("/api/admin/media"),
      api.get<Activity[]>("/api/admin/activity?limit=8"),
    ]).then(([blog, projects, pins, media, activity]) => {
      setStats({
        blogCount: blog.length,
        projectCount: projects.length,
        pinCount: pins.length,
        mediaCount: media.length,
      });
      setRecentActivity(activity);
    });
  }, []);

  const cards = [
    {
      label: "Blog Yazıları",
      value: stats.blogCount,
      icon: FileText,
      href: "/panel/blog",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Projeler",
      value: stats.projectCount,
      icon: Building2,
      href: "/panel/projeler",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Harita Pinleri",
      value: stats.pinCount,
      icon: MapPin,
      href: "/panel/harita",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Medya Dosyaları",
      value: stats.mediaCount,
      icon: Image,
      href: "/panel/medya",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="space-y-2">
            <Link
              to="/panel/blog/yeni"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Yeni Blog Yazısı</span>
            </Link>
            <Link
              to="/panel/projeler/yeni"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Building2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">Yeni Proje Ekle</span>
            </Link>
            <Link
              to="/panel/harita"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-700">Harita Pini Ekle</span>
            </Link>
            <Link
              to="/panel/ayarlar"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Site Ayarlarını Düzenle
              </span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Son Etkinlikler</h2>
            <Link
              to="/panel/etkinlik"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Tümünü Gör
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              Henüz etkinlik yok.
            </p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((a) => {
                const ActionIcon = actionIcons[a.action] || Clock;
                const color = actionColors[a.action] || "text-gray-400";
                return (
                  <div key={a.id} className="flex items-center gap-3">
                    <ActionIcon className={`w-3.5 h-3.5 flex-shrink-0 ${color}`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-gray-700 truncate block">
                        <span className="text-gray-500">
                          {entityLabels[a.entityType] || a.entityType}
                        </span>{" "}
                        {actionLabels[a.action] || a.action}
                        {a.entityTitle && a.action !== "settings_update" ? (
                          <span className="font-medium"> — {a.entityTitle}</span>
                        ) : null}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {timeAgo(a.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
