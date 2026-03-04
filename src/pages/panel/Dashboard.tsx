import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Building2, MapPin, Image, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

interface Stats {
  blogCount: number;
  projectCount: number;
  pinCount: number;
  mediaCount: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    blogCount: 0,
    projectCount: 0,
    pinCount: 0,
    mediaCount: 0,
  });

  useEffect(() => {
    Promise.all([
      api.get<unknown[]>("/api/admin/blog"),
      api.get<unknown[]>("/api/admin/projects"),
      api.get<unknown[]>("/api/admin/map-pins"),
      api.get<unknown[]>("/api/admin/media"),
    ]).then(([blog, projects, pins, media]) => {
      setStats({
        blogCount: blog.length,
        projectCount: projects.length,
        pinCount: pins.length,
        mediaCount: media.length,
      });
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
              <div className="w-4 h-4 text-gray-500">⚙</div>
              <span className="text-sm text-gray-700">
                Site Ayarlarını Düzenle
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
