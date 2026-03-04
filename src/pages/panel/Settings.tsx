import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/panel/ImageUploader";
import { invalidateSettingsCache } from "@/hooks/use-site-settings";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    api
      .get<Record<string, string>>("/api/admin/settings")
      .then((data) => {
        setSettings(data);
        try {
          const cats = JSON.parse(data.blog_categories || "[]");
          setCategories(cats.filter((c: string) => c !== "Tümü"));
        } catch {
          setCategories([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...settings,
        blog_categories: JSON.stringify(["Tümü", ...categories]),
      };
      await api.put("/api/admin/settings", payload);
      invalidateSettingsCache();
      toast.success("Ayarlar kaydedildi");
    } catch {
      toast.error("Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
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
        <h1 className="text-2xl font-semibold text-gray-900">Site Ayarları</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-medium text-gray-900">Firma Bilgileri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Firma Adı
              </label>
              <Input
                value={settings.company_name || ""}
                onChange={(e) => updateSetting("company_name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                E-posta
              </label>
              <Input
                value={settings.email || ""}
                onChange={(e) => updateSetting("email", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Telefon 1
              </label>
              <Input
                value={settings.phone || ""}
                onChange={(e) => updateSetting("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Telefon 2
              </label>
              <Input
                value={settings.phone2 || ""}
                onChange={(e) => updateSetting("phone2", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Adres
              </label>
              <Textarea
                value={settings.address || ""}
                onChange={(e) => updateSetting("address", e.target.value)}
                rows={2}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Çalışma Saatleri
              </label>
              <Textarea
                value={settings.working_hours || ""}
                onChange={(e) => updateSetting("working_hours", e.target.value)}
                rows={2}
              />
            </div>
          </div>
          <div className="max-w-xs">
            <ImageUploader
              value={settings.company_logo || ""}
              onChange={(path) => updateSetting("company_logo", path)}
              aspect="1/1"
              label="Firma Logosu"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-medium text-gray-900">Sosyal Medya</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Instagram
              </label>
              <Input
                value={settings.social_instagram || ""}
                onChange={(e) =>
                  updateSetting("social_instagram", e.target.value)
                }
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                LinkedIn
              </label>
              <Input
                value={settings.social_linkedin || ""}
                onChange={(e) =>
                  updateSetting("social_linkedin", e.target.value)
                }
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                X (Twitter)
              </label>
              <Input
                value={settings.social_twitter || ""}
                onChange={(e) =>
                  updateSetting("social_twitter", e.target.value)
                }
                placeholder="https://x.com/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Facebook
              </label>
              <Input
                value={settings.social_facebook || ""}
                onChange={(e) =>
                  updateSetting("social_facebook", e.target.value)
                }
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-medium text-gray-900">SEO Varsayılanları</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Varsayılan Başlık
              </label>
              <Input
                value={settings.seo_default_title || ""}
                onChange={(e) =>
                  updateSetting("seo_default_title", e.target.value)
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Varsayılan Açıklama
              </label>
              <Textarea
                value={settings.seo_default_description || ""}
                onChange={(e) =>
                  updateSetting("seo_default_description", e.target.value)
                }
                rows={2}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Varsayılan Anahtar Kelimeler
              </label>
              <Input
                value={settings.seo_default_keywords || ""}
                onChange={(e) =>
                  updateSetting("seo_default_keywords", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-medium text-gray-900">Harita</h3>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              İletişim Sayfası Harita Embed URL
            </label>
            <Textarea
              value={settings.maps_embed_url || ""}
              onChange={(e) => updateSetting("maps_embed_url", e.target.value)}
              rows={2}
              className="font-mono text-xs"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-medium text-gray-900">Blog Kategorileri</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-lg text-sm"
              >
                {cat}
                <button
                  onClick={() =>
                    setCategories(categories.filter((c) => c !== cat))
                  }
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Yeni kategori..."
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
            />
            <Button type="button" variant="outline" onClick={addCategory}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
