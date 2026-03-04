import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Building2,
  MapPin,
  Settings,
  Image,
  Clock,
  BookOpen,
  Milestone,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { href: "/panel", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/panel/blog", icon: FileText, label: "Blog Yazıları" },
  { href: "/panel/projeler", icon: Building2, label: "Projeler" },
  { href: "/panel/harita", icon: MapPin, label: "Harita Pinleri" },
  { href: "/panel/medya", icon: Image, label: "Medya" },
  { href: "/panel/etkinlik", icon: Clock, label: "Etkinlik Logu" },
  { href: "/panel/milestones", icon: Milestone, label: "Kilometre Taşları" },
  { href: "/panel/ayarlar", icon: Settings, label: "Ayarlar" },
  { href: "/panel/rehber", icon: BookOpen, label: "Rehber" },
];

export default function PanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { logout, username } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to="/panel" className="flex items-center gap-2">
            <img src="/site-logo.webp" alt="Neli" className="w-8 h-8" />
            <span className="font-semibold text-gray-800">Yönetim Paneli</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/panel"
                ? location.pathname === "/panel"
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Siteye Dön
          </Link>
          <div className="flex items-center justify-between px-3 py-2 mt-1">
            <span className="text-xs text-gray-500 truncate">{username}</span>
            <button
              onClick={logout}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 lg:hidden flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-medium text-gray-800">Yönetim Paneli</span>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
