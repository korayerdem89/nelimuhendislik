import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { divIcon } from "leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import { api, API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";

interface MapPin {
  id: number;
  projectId: number | null;
  name: string;
  lat: number;
  lng: number;
  neighborhood: string;
  district: string;
  image: string;
  href: string;
}

const pinIcon = divIcon({
  className: "map-pin-admin",
  html: `<div style="width:16px;height:16px;background:#a51422;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const activePinIcon = divIcon({
  className: "map-pin-admin-active",
  html: `<div style="width:20px;height:20px;background:#16a34a;border:2px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPins() {
  const [pins, setPins] = useState<MapPin[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MapPin>>({});
  const [loading, setLoading] = useState(true);
  const markerRefs = useRef<Record<number, LeafletMarker | null>>({});

  const fetchPins = () => {
    api
      .get<MapPin[]>("/api/admin/map-pins")
      .then(setPins)
      .finally(() => setLoading(false));
  };

  useEffect(fetchPins, []);

  const selected = pins.find((p) => p.id === selectedId);

  useEffect(() => {
    if (selected) {
      setEditForm({ ...selected });
    }
  }, [selected]);

  const handleMapClick = (lat: number, lng: number) => {
    if (selectedId) {
      setEditForm((prev) => ({ ...prev, lat, lng }));
    }
  };

  const handleSave = async () => {
    if (!selectedId || !editForm.name) return;
    try {
      await api.put(`/api/admin/map-pins/${selectedId}`, editForm);
      toast.success("Pin güncellendi");
      fetchPins();
    } catch (err) {
      toast.error("Güncelleme başarısız");
    }
  };

  const handleAdd = async () => {
    try {
      const result = await api.post<MapPin>("/api/admin/map-pins", {
        name: "Yeni Pin",
        lat: 38.5,
        lng: 27.05,
        neighborhood: "",
        district: "",
        image: "",
        href: "/projeler",
      });
      fetchPins();
      setSelectedId(result.id);
      toast.success("Yeni pin eklendi");
    } catch {
      toast.error("Ekleme başarısız");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu pini silmek istediğinize emin misiniz?")) return;
    await api.delete(`/api/admin/map-pins/${id}`);
    if (selectedId === id) setSelectedId(null);
    toast.success("Pin silindi");
    fetchPins();
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
        <h1 className="text-2xl font-semibold text-gray-900">Harita Pinleri</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Pin
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {pins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => setSelectedId(pin.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedId === pin.id
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-900">{pin.name}</p>
                  <p className="text-xs text-gray-500">
                    {pin.neighborhood}, {pin.district}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(pin.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl overflow-hidden border border-gray-200 h-[400px]">
            <MapContainer
              center={[38.501, 27.048]}
              zoom={12}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains={["a", "b", "c", "d"]}
              />
              <ClickHandler onClick={handleMapClick} />
              {pins.map((pin) => (
                <Marker
                  key={pin.id}
                  position={[pin.id === selectedId && editForm.lat ? editForm.lat : pin.lat, pin.id === selectedId && editForm.lng ? editForm.lng : pin.lng]}
                  icon={pin.id === selectedId ? activePinIcon : pinIcon}
                  ref={(ref) => { markerRefs.current[pin.id] = ref; }}
                  eventHandlers={{ click: () => setSelectedId(pin.id) }}
                />
              ))}
            </MapContainer>
          </div>

          {selectedId && editForm && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <h3 className="font-medium text-gray-900 text-sm">Pin Düzenle</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Ad</label>
                  <Input value={editForm.name || ""} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Mahalle</label>
                  <Input value={editForm.neighborhood || ""} onChange={(e) => setEditForm((f) => ({ ...f, neighborhood: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">İlçe</label>
                  <Input value={editForm.district || ""} onChange={(e) => setEditForm((f) => ({ ...f, district: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Link</label>
                  <Input value={editForm.href || ""} onChange={(e) => setEditForm((f) => ({ ...f, href: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Enlem</label>
                  <Input type="number" step="0.0001" value={editForm.lat || ""} onChange={(e) => setEditForm((f) => ({ ...f, lat: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Boylam</label>
                  <Input type="number" step="0.0001" value={editForm.lng || ""} onChange={(e) => setEditForm((f) => ({ ...f, lng: Number(e.target.value) }))} />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 mb-1 block">Görsel URL</label>
                  <Input value={editForm.image || ""} onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))} placeholder="/projects/..." />
                </div>
              </div>
              <p className="text-xs text-gray-400">Koordinat seçmek için haritaya tıklayın.</p>
              <Button onClick={handleSave} size="sm">
                <Save className="w-3 h-3 mr-1" />
                Kaydet
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
