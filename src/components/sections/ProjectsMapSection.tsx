import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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
  image: string;
  href: string;
};

const PROJECTS: ProjectPin[] = [
  {
    id: 1,
    name: "Serenita Prestige",
    coordinates: [38.491056, 26.948444],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 2,
    name: "Valorya 3",
    coordinates: [38.517611, 27.04],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 3,
    name: "Valorya 1",
    coordinates: [38.508889, 27.039833],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 4,
    name: "Valorya 2",
    coordinates: [38.4992059, 27.0572575],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 5,
    name: "Valorya 4",
    coordinates: [38.4820951, 27.1157441],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 6,
    name: "Valorya 5",
    coordinates: [38.508107, 27.049398],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 7,
    name: "Valorya 6",
    coordinates: [38.498116, 27.057128],
    image: "/site-logo.png",
    href: "/projeler",
  },
  {
    id: 8,
    name: "Valorya 7",
    coordinates: [38.497562, 27.057069],
    image: "/site-logo.png",
    href: "/projeler",
  },
];

const mapCenter: LatLngExpression = [38.501, 27.048];

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

export default function ProjectsMapSection({
  title,
  heightClassName = "h-80 md:h-[460px] lg:h-[520px]",
}: ProjectsMapSectionProps) {
  return (
    <section
      className={`relative ${heightClassName} bg-cream-100 rounded-2xl overflow-hidden`}
    >
      <MapContainer
        center={mapCenter}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
        aria-label={title}
      >
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
                  className="mb-3 h-28 w-full rounded-md object-cover"
                  loading="lazy"
                />
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  {project.name}
                </h3>
                <Link
                  to={project.href}
                  className="inline-flex items-center justify-center rounded-md bg-neli-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-neli-700"
                >
                  Projeyi Incele
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
