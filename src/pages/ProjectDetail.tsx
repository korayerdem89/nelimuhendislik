import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Home,
  Building2,
  Car,
  Trees,
  CheckCircle2,
  X,
  Check,
  Clock,
  Circle,
} from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import {
  getProjectBySlug,
  projectStatusLabels,
  type ProjectPhase,
} from "@/data/projects";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";

interface ProjectTimelineProps {
  phases: ProjectPhase[];
}

function ProjectTimeline({ phases }: ProjectTimelineProps) {
  const activeIndex = phases.findIndex((phase) => phase.status === "active");
  const completedCount = phases.filter(
    (phase) => phase.status === "completed",
  ).length;
  const progressPercentage =
    activeIndex >= 0
      ? ((activeIndex + 0.5) / phases.length) * 100
      : (completedCount / phases.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-white p-5 md:p-6 shadow-soft"
    >
      <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-6">
        İnşaat Aşamaları
      </h3>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-cream-200 rounded-full" />

          {/* Progress Line Active */}
          <div
            className="absolute top-5 left-0 h-1 bg-gradient-to-r from-neli-600 to-neli-500 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Phase Nodes */}
          <div className="relative flex justify-between">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col items-center"
                style={{ width: `${100 / phases.length}%` }}
              >
                {/* Node */}
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    phase.status === "completed"
                      ? "bg-neli-600 border-neli-600 text-white"
                      : phase.status === "active"
                        ? "bg-white border-neli-600 text-neli-600"
                        : "bg-cream-100 border-cream-300 text-foreground/40"
                  }`}
                >
                  {phase.status === "completed" ? (
                    <Check className="w-5 h-5" />
                  ) : phase.status === "active" ? (
                    <div className="relative">
                      <Clock className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neli-600 rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center px-1">
                  <p
                    className={`text-xs font-medium leading-tight ${
                      phase.status === "completed"
                        ? "text-neli-700"
                        : phase.status === "active"
                          ? "text-neli-600"
                          : "text-foreground/50"
                    }`}
                  >
                    {phase.name}
                  </p>
                  {phase.completedDate && (
                    <p className="text-[10px] text-foreground/40 mt-0.5">
                      {phase.completedDate}
                    </p>
                  )}
                  {phase.status === "active" && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-neli-100 text-neli-700 rounded-full">
                      Devam Ediyor
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-0">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative flex items-start gap-3">
            {/* Vertical Line */}
            {index < phases.length - 1 && (
              <div
                className={`absolute left-[15px] top-8 w-0.5 h-[calc(100%-8px)] ${
                  phase.status === "completed" ? "bg-neli-600" : "bg-cream-200"
                }`}
              />
            )}

            {/* Node */}
            <div
              className={`relative z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                phase.status === "completed"
                  ? "bg-neli-600 border-neli-600 text-white"
                  : phase.status === "active"
                    ? "bg-white border-neli-600 text-neli-600"
                    : "bg-cream-100 border-cream-300 text-foreground/40"
              }`}
            >
              {phase.status === "completed" ? (
                <Check className="w-4 h-4" />
              ) : phase.status === "active" ? (
                <div className="relative">
                  <Clock className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-neli-600 rounded-full animate-pulse" />
                </div>
              ) : (
                <Circle className="w-3 h-3" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              <p
                className={`text-sm font-medium ${
                  phase.status === "completed"
                    ? "text-neli-700"
                    : phase.status === "active"
                      ? "text-neli-600"
                      : "text-foreground/50"
                }`}
              >
                {phase.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {phase.completedDate && (
                  <p className="text-xs text-foreground/40">
                    {phase.completedDate}
                  </p>
                )}
                {phase.status === "active" && (
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-neli-100 text-neli-700 rounded-full">
                    Devam Ediyor
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-cream-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/60">İlerleme Durumu</span>
          <span className="font-medium text-neli-700">
            {completedCount} / {phases.length} Aşama Tamamlandı
          </span>
        </div>
        <div className="mt-2 h-2 bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-neli-600 to-neli-500 rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / phases.length) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(
    null,
  );

  const projectImage = project?.image ?? "";
  const imageBasePath = projectImage.includes("/")
    ? projectImage.slice(0, projectImage.lastIndexOf("/"))
    : "";

  useEffect(() => {
    let mounted = true;

    const preloadImage = (src: string) =>
      new Promise<string | null>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
      });

    const resolveGallery = async () => {
      if (!projectImage) {
        setGalleryImages([]);
        setActiveImageIndex(0);
        setLightboxImageIndex(null);
        return;
      }

      const numberedImages: string[] = [];
      const maxGalleryImageCount = 30;

      for (
        let imageNumber = 1;
        imageNumber <= maxGalleryImageCount;
        imageNumber += 1
      ) {
        const candidateSrc = `${imageBasePath}/${imageNumber}.webp`;
        const loadedImage = await preloadImage(candidateSrc);

        // Numbered gallery is expected to be continuous: 1.webp, 2.webp, ...
        // Stop scanning at the first missing file.
        if (!loadedImage) {
          break;
        }

        numberedImages.push(loadedImage);
      }

      if (!mounted) {
        return;
      }

      setGalleryImages([projectImage, ...numberedImages]);
      setActiveImageIndex(0);
      setLightboxImageIndex(null);
    };

    resolveGallery();

    return () => {
      mounted = false;
    };
  }, [imageBasePath, projectImage]);

  useEffect(() => {
    if (lightboxImageIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImageIndex(null);
      } else if (event.key === "ArrowRight") {
        setLightboxImageIndex((prev) =>
          prev === null ? null : (prev + 1) % galleryImages.length,
        );
      } else if (event.key === "ArrowLeft") {
        setLightboxImageIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [galleryImages.length, lightboxImageIndex]);

  const showPrevImage = () => {
    if (galleryImages.length <= 1) {
      return;
    }

    setActiveImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    if (galleryImages.length <= 1) {
      return;
    }

    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  if (!project) {
    return <Navigate to="/projeler" replace />;
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <SEO
        title={`${project.name} - ${project.details.district}, ${project.details.city}`}
        description={`${project.name} projesi - ${project.description} ${project.details.district}, ${project.details.city} konumunda.`}
        keywords={`${project.name}, ${project.details.district} konut, ${project.details.city} daire, neli mühendislik, ${project.type}`}
        url={`https://nelimuhendislik.com/projeler/${project.slug}`}
        image={`https://nelimuhendislik.com${project.image}`}
      />
      <PageHero
        currentPage="Projeler"
        title={
          <>
            {project.name}
            <span className="text-neli-600"> Proje Detayı</span>
          </>
        }
        description={project.description}
      />

      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <Link
                to="/projeler"
                className="inline-flex items-center gap-2 text-sm font-medium text-neli-600 hover:text-neli-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Tüm Projelere Dön
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-14">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white p-3 md:p-4 shadow-soft"
              >
                <div className="space-y-3">
                  <div className="relative">
                    <button
                      type="button"
                      className="relative block w-full aspect-[1/1] rounded-xl overflow-hidden group"
                      onClick={() => setLightboxImageIndex(activeImageIndex)}
                      aria-label="Gorseli buyut"
                    >
                      <img
                        src={galleryImages[activeImageIndex] ?? project.image}
                        alt={`${project.name} gorsel ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Satışta"
                              ? "bg-neli-600 text-white"
                              : "bg-white/90 text-foreground"
                          }`}
                        >
                          {projectStatusLabels[project.status]}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            showPrevImage();
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
                          aria-label="Onceki gorsel"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            showNextImage();
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
                          aria-label="Sonraki gorsel"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {galleryImages.map((imageSrc, index) => (
                        <button
                          type="button"
                          key={imageSrc}
                          onClick={() => setActiveImageIndex(index)}
                          className={`relative flex-none w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            activeImageIndex === index
                              ? "border-neli-600"
                              : "border-transparent"
                          }`}
                          aria-label={`${index + 1}. gorseli sec`}
                        >
                          <img
                            src={imageSrc}
                            alt={`${project.name} kucuk gorsel ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {galleryImages.length > 1 && (
                    <div className="flex justify-center gap-1.5">
                      {galleryImages.map((imageSrc, index) => (
                        <button
                          type="button"
                          key={`${imageSrc}-dot`}
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            activeImageIndex === index
                              ? "w-6 bg-neli-600"
                              : "w-2.5 bg-cream-300 hover:bg-cream-400"
                          }`}
                          aria-label={`${index + 1}. gorsele git`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-cream-100">
                    <p className="text-xs text-foreground/60 mb-1">Lokasyon</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-neli-600" />
                      {project.details.neighborhood}, {project.details.district}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cream-100">
                    <p className="text-xs text-foreground/60 mb-1">
                      Teslim Yili
                    </p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-neli-600" />
                      {project.year}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cream-100">
                    <p className="text-xs text-foreground/60 mb-1">
                      Proje Tipi
                    </p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-neli-600" />
                      {project.type}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cream-100">
                    <p className="text-xs text-foreground/60 mb-1">
                      Toplam Daire
                    </p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-neli-600" />
                      {project.details.totalUnits}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-cream-300">
                  <h2 className="text-lg font-serif font-medium text-foreground mb-2">
                    Proje Özeti
                  </h2>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-cream-100 p-3">
                      <p className="text-foreground/60 mb-1">Blok Sayısı</p>
                      <p className="font-medium text-foreground">
                        {project.details.totalBlocks}
                      </p>
                    </div>
                    <div className="rounded-lg bg-cream-100 p-3">
                      <p className="text-foreground/60 mb-1">Peyzaj Alanı</p>
                      <p className="font-medium text-foreground">
                        {project.details.landscapeRatio}
                      </p>
                    </div>
                    <div className="rounded-lg bg-cream-100 p-3">
                      <p className="text-foreground/60 mb-1">Otopark</p>
                      <p className="font-medium text-foreground">
                        {project.details.parking}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {lightboxImageIndex !== null && galleryImages[lightboxImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 md:p-8 flex items-center justify-center"
          onClick={() => setLightboxImageIndex(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImageIndex(null)}
            aria-label="Buyuk goruntuyu kapat"
          >
            <X className="w-5 h-5" />
          </button>

          {galleryImages.length > 1 && (
            <button
              type="button"
              className="absolute left-3 md:left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxImageIndex((prev) =>
                  prev === null
                    ? null
                    : (prev - 1 + galleryImages.length) % galleryImages.length,
                );
              }}
              aria-label="Onceki gorsel"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            className="w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="aspect-[1/1] w-full overflow-hidden rounded-xl border border-white/20">
              <img
                src={galleryImages[lightboxImageIndex]}
                alt={`${project.name} buyuk gorsel ${lightboxImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/80">
              {lightboxImageIndex + 1} / {galleryImages.length}
            </p>
          </div>

          {galleryImages.length > 1 && (
            <button
              type="button"
              className="absolute right-3 md:right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxImageIndex((prev) =>
                  prev === null ? null : (prev + 1) % galleryImages.length,
                );
              }}
              aria-label="Sonraki gorsel"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Project Timeline Section */}
      {project.phases && project.phases.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <ProjectTimeline phases={project.phases} />
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-cream-100 p-5 md:p-6 shadow-soft"
            >
              <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-4">
                Konum Görseli
              </h3>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-cream-300">
                <img
                  src={project.details.locationImage}
                  alt={`${project.name} konum`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 rounded-lg bg-white p-4 text-sm text-foreground/70">
                <p className="font-medium text-foreground mb-1">
                  Adres Bilgisi
                </p>
                <p>
                  {project.details.neighborhood}, {project.details.district},{" "}
                  {project.details.city}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-cream-100 p-5 md:p-6 shadow-soft"
            >
              <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-4">
                Öne Çıkan Özellikler
              </h3>
              <ul className="space-y-3">
                {project.details.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 rounded-lg border border-cream-300 bg-white p-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neli-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 md:mb-7"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-2">
                Daire Tipleri
              </h3>
              <p className="text-sm md:text-base text-foreground/60">
                Projede yer alan daire tipleri ve adet dağılımı aşağıdaki
                gibidir.
              </p>
            </motion.div>

            <div className="overflow-x-auto rounded-xl border border-cream-300">
              <table className="w-full min-w-[620px]">
                <thead className="bg-cream-100">
                  <tr className="text-left text-xs uppercase tracking-wider text-foreground/60">
                    <th className="px-4 py-3">Daire Tipi</th>
                    <th className="px-4 py-3">Adet</th>
                    <th className="px-4 py-3">Brüt Alan</th>
                    <th className="px-4 py-3">Net Alan</th>
                  </tr>
                </thead>
                <tbody>
                  {project.details.unitTypes.map((unitType) => (
                    <tr
                      key={unitType.type}
                      className="border-t border-cream-300"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {unitType.type}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        {unitType.count}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        {unitType.grossArea}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">
                        {unitType.netArea}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-cream-100 p-4">
                <p className="text-xs text-foreground/60 mb-1">Toplam Daire</p>
                <p className="text-lg font-serif font-medium text-foreground">
                  {project.details.totalUnits}
                </p>
              </div>
              <div className="rounded-xl bg-cream-100 p-4">
                <p className="text-xs text-foreground/60 mb-1">Peyzaj Orani</p>
                <p className="text-lg font-serif font-medium text-foreground flex items-center gap-2">
                  <Trees className="w-4 h-4 text-neli-600" />
                  {project.details.landscapeRatio}
                </p>
              </div>
              <div className="rounded-xl bg-cream-100 p-4">
                <p className="text-xs text-foreground/60 mb-1">
                  Otopark Çözümü
                </p>
                <p className="text-lg font-serif font-medium text-foreground flex items-center gap-2">
                  <Car className="w-4 h-4 text-neli-600" />
                  {project.details.parking}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-neli-600/5 border border-neli-600/20 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm md:text-base font-medium text-foreground">
                  Proje hakkında detaylı bilgi ve güncel durum almak için bize
                  ulaşın.
                </p>
              </div>
              <Link
                to="/iletisim"
                className="inline-flex items-center justify-center rounded-lg bg-neli-600 px-4 py-2 text-sm font-medium text-white hover:bg-neli-700 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
