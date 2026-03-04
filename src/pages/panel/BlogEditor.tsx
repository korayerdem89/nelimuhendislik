import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/panel/ImageUploader";
import { toast } from "sonner";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  authorName: string;
  featured: boolean;
  status: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  publishedAt: string | null;
}

function slugify(text: string): string {
  const charMap: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  return text
    .split("")
    .map((c) => charMap[c] || c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const CATEGORIES = ["İnşaat", "Mimari", "Projeler", "Restorasyon", "Dekorasyon"];

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "yeni";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: "",
    featured: false,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    publishedAt: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!isNew && id) {
      api.get<BlogPost>(`/api/admin/blog/${id}`).then((post) => {
        const tags = (() => {
          try {
            return JSON.parse(post.tags);
          } catch {
            return [];
          }
        })();
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          category: post.category,
          tags: Array.isArray(tags) ? tags.join(", ") : "",
          featured: post.featured,
          status: post.status,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          metaKeywords: post.metaKeywords,
          publishedAt: post.publishedAt?.split("T")[0] || "",
        });
        setAutoSlug(false);
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const updateField = useCallback(
    (field: string, value: string | boolean) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "title" && autoSlug) {
          next.slug = slugify(value as string);
        }
        return next;
      });
    },
    [autoSlug],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) {
      toast.error("Başlık ve slug zorunludur");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        publishedAt: form.publishedAt || null,
      };

      if (isNew) {
        await api.post("/api/admin/blog", payload);
        toast.success("Blog yazısı oluşturuldu!");
      } else {
        await api.put(`/api/admin/blog/${id}`, payload);
        toast.success("Blog yazısı güncellendi!");
      }
      navigate("/panel/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Kaydetme başarısız");
    } finally {
      setSaving(false);
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
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/panel/blog")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">
          {isNew ? "Yeni Blog Yazısı" : "Blog Yazısını Düzenle"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Başlık
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Blog yazısının başlığı"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  URL Slug
                </label>
                <Input
                  value={form.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    updateField("slug", e.target.value);
                  }}
                  placeholder="url-slug"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Özet
                </label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  placeholder="Kısa açıklama..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  İçerik (HTML)
                </label>
                <Textarea
                  value={form.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder="<p>Blog içeriğinizi buraya yazın...</p>"
                  rows={16}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  HTML formatında yazabilirsiniz. h2, h3, p, strong, em, ul, ol, li etiketleri desteklenir.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-medium text-gray-900">SEO Ayarları</h3>
              <Input
                value={form.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                placeholder="Meta başlık"
              />
              <Textarea
                value={form.metaDescription}
                onChange={(e) =>
                  updateField("metaDescription", e.target.value)
                }
                placeholder="Meta açıklama"
                rows={2}
              />
              <Input
                value={form.metaKeywords}
                onChange={(e) => updateField("metaKeywords", e.target.value)}
                placeholder="Anahtar kelimeler (virgülle ayırın)"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-medium text-gray-900">Yayın Ayarları</h3>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Durum
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={form.status === "draft" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateField("status", "draft")}
                  >
                    <EyeOff className="w-3 h-3 mr-1" />
                    Taslak
                  </Button>
                  <Button
                    type="button"
                    variant={
                      form.status === "published" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateField("status", "published")}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Yayında
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Kategori
                </label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">Seçin...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Etiketler
                </label>
                <Input
                  value={form.tags}
                  onChange={(e) => updateField("tags", e.target.value)}
                  placeholder="etiket1, etiket2, etiket3"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Yayın Tarihi
                </label>
                <Input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => updateField("publishedAt", e.target.value)}
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Öne Çıkan Yazı</span>
              </label>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <ImageUploader
                value={form.coverImage}
                onChange={(path) => updateField("coverImage", path)}
                aspect="1/1"
                label="Kapak Görseli (1:1)"
              />
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
