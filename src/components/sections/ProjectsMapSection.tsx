import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import type { LatLngExpression } from "leaflet";

interface ProjectsMapSectionProps {
  title: string;
  heightClassName?: string;
}

type ProjectPin = {
  id: number;
  name: string;
  coordinates: [number, number];
  neighborhood: string;
  district: string;
  image: string;
  href: string;
};

const PROJECTS: ProjectPin[] = [
  {
    id: 1,
    name: "Serenita Prestige",
    coordinates: [38.491056, 26.948444],
    neighborhood: "Sasalı",
    district: "Çiğli",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 2,
    name: "Valorya 3",
    coordinates: [38.517611, 27.04],
    neighborhood: "Balatcik Mahallesi",
    district: "Cigli",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 3,
    name: "Valorya 1",
    coordinates: [38.508889, 27.039833],
    neighborhood: "Balatcik Mahallesi",
    district: "Cigli",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 4,
    name: "Valorya 2",
    coordinates: [38.4992059, 27.0572575],
    neighborhood: "Kucukcigli Mahallesi",
    district: "Cigli",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 5,
    name: "Valorya 4",
    coordinates: [38.4820951, 27.1157441],
    neighborhood: "Postacılar Mahallesi",
    district: "Karsiyaka",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 6,
    name: "Valorya 5",
    coordinates: [38.508107, 27.049398],
    neighborhood: "Kucukcigli Mahallesi",
    district: "Cigli",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 7,
    name: "Valorya 6",
    coordinates: [38.498116, 27.057128],
    neighborhood: "Kucukcigli Mahallesi",
    district: "Cigli",
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 8,
    name: "Valorya 7",
    coordinates: [38.497562, 27.057069],
    neighborhood: "Kucukcigli Mahallesi",
    district: "Cigli",
    image: "/site-logo.png",
    href: "/projeler",
  },
];

const mapCenter: LatLngExpression = [38.501, 27.048];
const defaultZoom = 12;
const focusZoom = 16;

const smallPinIcon = divIcon({
  className: "project-map-pin",
  html: `
    <div style="
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      background: #a51422;
      border: 2px solid #FFFFFF;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      position: relative;
      transform: translate(-9px, -18px);
    ">
      <span style="
        position: absolute;
        left: 50%;
        bottom: -8px;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 8px solid #a51422;
      "></span>
    </div>
  `,
  iconSize: [18, 26],
  iconAnchor: [9, 26],
  popupAnchor: [0, -22],
});

interface FlyToProjectProps {
  selectedProject: ProjectPin | null;
}

function FlyToProject({ selectedProject }: FlyToProjectProps) {
  const map = useMap();

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    map.flyTo(selectedProject.coordinates, focusZoom, {
      duration: 0.8,
      animate: true,
    });
  }, [map, selectedProject]);

  return null;
}

export default function ProjectsMapSection({
  title,
  heightClassName = "h-80 md:h-[460px] lg:h-[520px]",
}: ProjectsMapSectionProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const selectedProject =
    PROJECTS.find((project) => project.id === selectedProjectId) ?? null;

  return (
    <section
      className={`relative ${heightClassName} bg-cream-100 rounded-2xl overflow-hidden`}
    >
      <div className="absolute right-3 top-3 z-[600] w-[min(340px,calc(100%-24px))] rounded-xl border border-white/70 bg-white/90 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
          Proje Rehberi
        </p>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Tum Projeler ve Lokasyonlari
        </h3>
        <div className="max-h-48 overflow-y-auto pr-1 md:max-h-56">
          <ul className="space-y-1.5">
            {PROJECTS.map((project) => {
              const isActive = project.id === selectedProjectId;

              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition-all ${
                      isActive
                        ? "border-neli-600 bg-neli-600/10 shadow-sm"
                        : "border-cream-300 bg-white/90 hover:border-neli-600/40 hover:bg-cream-100"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">
                      {project.name}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {project.neighborhood}, {project.district}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        aria-label={title}
      >
        <FlyToProject selectedProject={selectedProject} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />

        {PROJECTS.map((project) => (
          <Marker
            key={project.id}
            position={project.coordinates}
            icon={smallPinIcon}
          >
            <Popup closeButton minWidth={220}>
              <div className="w-[220px]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="mb-3 aspect-[1/1] w-full rounded-md object-cover"
                  loading="lazy"
                />
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  {project.name}
                </h3>
                <Link
                  to={project.href}
                  className="inline-flex items-center justify-center rounded-md  px-3 py-2 text-xs font-medium bg-neli-600 transition-colors hover:bg-neli-700"
                >
                  <span className="text-white"> Projeyi Incele</span>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
