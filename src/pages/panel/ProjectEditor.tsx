import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/panel/ImageUploader";
import { toast } from "sonner";

interface UnitType {
  type: string;
  count: number;
  grossArea: string;
  netArea: string;
}

interface Phase {
  id: string;
  name: string;
  status: "completed" | "active" | "pending";
  completedDate?: string;
}

const DEFAULT_PHASES: Phase[] = [
  { id: "design", name: "Proje Tasarımı", status: "pending" },
  { id: "permit", name: "Ruhsat", status: "pending" },
  { id: "foundation", name: "Temel", status: "pending" },
  { id: "structure", name: "Kaba İnşaat", status: "pending" },
  { id: "finishing", name: "İnce İşler", status: "pending" },
  { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
  { id: "landscape", name: "Peyzaj", status: "pending" },
  { id: "handover", name: "Teslim", status: "pending" },
];

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

const STATUS_OPTIONS = ["İnşaat", "Satışta", "Tamamlandı"];

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function parseMonthYear(value: string): { month: string; year: string } {
  if (!value) return { month: "", year: "" };
  const parts = value.trim().split(" ");
  if (parts.length === 2) return { month: parts[0], year: parts[1] };
  return { month: "", year: value };
}

function MonthYearPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { month, year } = parseMonthYear(value);

  const handleChange = (newMonth: string, newYear: string) => {
    if (newMonth && newYear) {
      onChange(`${newMonth} ${newYear}`);
    } else if (newMonth || newYear) {
      onChange(newMonth ? `${newMonth} ${newYear}` : newYear);
    } else {
      onChange("");
    }
  };

  return (
    <div className="flex gap-1">
      <select
        value={month}
        onChange={(e) => handleChange(e.target.value, year)}
        className="rounded-md border border-gray-300 px-2 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-gray-900"
      >
        <option value="">Ay</option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Yıl"
        value={year}
        min={2000}
        max={2100}
        onChange={(e) => handleChange(month, e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1.5 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
  );
}

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "yeni";

  const [form, setForm] = useState({
    name: "",
    slug: "",
    location: "",
    year: new Date().getFullYear().toString(),
    type: "Apartman",
    description: "",
    image: "",
    status: "Satışta",
  });

  const [details, setDetails] = useState({
    neighborhood: "",
    district: "",
    city: "İzmir",
    locationImage: "",
    highlights: [""] as string[],
    unitTypes: [{ type: "", count: 0, grossArea: "", netArea: "" }] as UnitType[],
    totalUnits: 0,
    totalBlocks: 1,
    landscapeRatio: "",
    parking: "",
  });

  const [phases, setPhases] = useState<Phase[]>(DEFAULT_PHASES);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!isNew && id) {
      api.get<Record<string, unknown>>(`/api/admin/projects/${id}`).then((p) => {
        setForm({
          name: (p.name as string) || "",
          slug: (p.slug as string) || "",
          location: (p.location as string) || "",
          year: (p.year as string) || "",
          type: (p.type as string) || "",
          description: (p.description as string) || "",
          image: (p.image as string) || "",
          status: (p.status as string) || "Satışta",
        });
        const d = (p.details || {}) as Record<string, unknown>;
        setDetails({
          neighborhood: (d.neighborhood as string) || "",
          district: (d.district as string) || "",
          city: (d.city as string) || "İzmir",
          locationImage: (d.locationImage as string) || "",
          highlights: ((d.highlights as string[]) || [""]).length > 0 ? (d.highlights as string[]) : [""],
          unitTypes: ((d.unitTypes as UnitType[]) || []).length > 0 ? (d.unitTypes as UnitType[]) : [{ type: "", count: 0, grossArea: "", netArea: "" }],
          totalUnits: (d.totalUnits as number) || 0,
          totalBlocks: (d.totalBlocks as number) || 1,
          landscapeRatio: (d.landscapeRatio as string) || "",
          parking: (d.parking as string) || "",
        });
        setPhases(
          ((p.phases as Phase[]) || []).length > 0
            ? (p.phases as Phase[])
            : DEFAULT_PHASES,
        );
        setAutoSlug(false);
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const updateForm = useCallback(
    (field: string, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "name" && autoSlug) next.slug = slugify(value);
        return next;
      });
    },
    [autoSlug],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      toast.error("Proje adı ve slug zorunludur");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        details: {
          ...details,
          highlights: details.highlights.filter(Boolean),
          unitTypes: details.unitTypes.filter((u) => u.type),
        },
        phases,
      };
      if (isNew) {
        await api.post("/api/admin/projects", payload);
        toast.success("Proje oluşturuldu!");
      } else {
        await api.put(`/api/admin/projects/${id}`, payload);
        toast.success("Proje güncellendi!");
      }
      navigate("/panel/projeler");
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
          onClick={() => navigate("/panel/projeler")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">
          {isNew ? "Yeni Proje" : "Projeyi Düzenle"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-medium text-gray-900">Temel Bilgiler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Proje Adı</label>
                  <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">URL Slug</label>
                  <Input value={form.slug} onChange={(e) => { setAutoSlug(false); updateForm("slug", e.target.value); }} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Lokasyon</label>
                  <Input value={form.location} onChange={(e) => updateForm("location", e.target.value)} placeholder="İzmir" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Yıl</label>
                  <Input value={form.year} onChange={(e) => updateForm("year", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Tip</label>
                  <Input value={form.type} onChange={(e) => updateForm("type", e.target.value)} placeholder="Apartman / Villa" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Durum</label>
                  <select value={form.status} onChange={(e) => updateForm("status", e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Açıklama</label>
                <Textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} rows={3} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-medium text-gray-900">Proje Detayları</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mahalle</label>
                  <Input value={details.neighborhood} onChange={(e) => setDetails((d) => ({ ...d, neighborhood: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">İlçe</label>
                  <Input value={details.district} onChange={(e) => setDetails((d) => ({ ...d, district: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Şehir</label>
                  <Input value={details.city} onChange={(e) => setDetails((d) => ({ ...d, city: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Toplam Daire</label>
                  <Input type="number" value={details.totalUnits} onChange={(e) => setDetails((d) => ({ ...d, totalUnits: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Toplam Blok</label>
                  <Input type="number" value={details.totalBlocks} onChange={(e) => setDetails((d) => ({ ...d, totalBlocks: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Peyzaj Oranı</label>
                  <Input value={details.landscapeRatio} onChange={(e) => setDetails((d) => ({ ...d, landscapeRatio: e.target.value }))} placeholder="%15" />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Otopark</label>
                  <Input value={details.parking} onChange={(e) => setDetails((d) => ({ ...d, parking: e.target.value }))} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Daire Tipleri</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => setDetails((d) => ({ ...d, unitTypes: [...d.unitTypes, { type: "", count: 0, grossArea: "", netArea: "" }] }))}>
                  <Plus className="w-3 h-3 mr-1" />Ekle
                </Button>
              </div>
              {details.unitTypes.map((unit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input className="w-20" placeholder="2+1" value={unit.type} onChange={(e) => { const u = [...details.unitTypes]; u[i] = { ...u[i], type: e.target.value }; setDetails((d) => ({ ...d, unitTypes: u })); }} />
                  <Input className="w-16" type="number" placeholder="Adet" value={unit.count || ""} onChange={(e) => { const u = [...details.unitTypes]; u[i] = { ...u[i], count: Number(e.target.value) }; setDetails((d) => ({ ...d, unitTypes: u })); }} />
                  <Input className="flex-1" placeholder="Brüt m2" value={unit.grossArea} onChange={(e) => { const u = [...details.unitTypes]; u[i] = { ...u[i], grossArea: e.target.value }; setDetails((d) => ({ ...d, unitTypes: u })); }} />
                  <Input className="flex-1" placeholder="Net m2" value={unit.netArea} onChange={(e) => { const u = [...details.unitTypes]; u[i] = { ...u[i], netArea: e.target.value }; setDetails((d) => ({ ...d, unitTypes: u })); }} />
                  <button type="button" onClick={() => setDetails((d) => ({ ...d, unitTypes: d.unitTypes.filter((_, j) => j !== i) }))} className="p-1 text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Öne Çıkan Özellikler</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => setDetails((d) => ({ ...d, highlights: [...d.highlights, ""] }))}>
                  <Plus className="w-3 h-3 mr-1" />Ekle
                </Button>
              </div>
              {details.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input className="flex-1" value={h} onChange={(e) => { const hl = [...details.highlights]; hl[i] = e.target.value; setDetails((d) => ({ ...d, highlights: hl })); }} placeholder="Özellik..." />
                  <button type="button" onClick={() => setDetails((d) => ({ ...d, highlights: d.highlights.filter((_, j) => j !== i) }))} className="p-1 text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-medium text-gray-900">İnşaat Aşamaları</h3>
              {phases.map((phase, i) => (
                <div key={phase.id} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-36 flex-shrink-0">{phase.name}</span>
                  <select value={phase.status} onChange={(e) => { const p = [...phases]; p[i] = { ...p[i], status: e.target.value as Phase["status"] }; setPhases(p); }} className="rounded-md border border-gray-300 px-2 py-1.5 text-sm flex-1">
                    <option value="pending">Bekliyor</option>
                    <option value="active">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                  </select>
                  <MonthYearPicker
                    value={phase.completedDate || ""}
                    onChange={(v) => { const p = [...phases]; p[i] = { ...p[i], completedDate: v }; setPhases(p); }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <ImageUploader value={form.image} onChange={(path) => updateForm("image", path)} aspect="1/1" label="Kapak Görseli" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <ImageUploader value={details.locationImage} onChange={(path) => setDetails((d) => ({ ...d, locationImage: path }))} aspect="16/9" label="Lokasyon Haritası Görseli" />
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
