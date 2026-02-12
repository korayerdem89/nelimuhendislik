import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Home,
  Building2,
  Car,
  Trees,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { getProjectBySlug, projectStatusLabels } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projeler" replace />;
  }

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
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
                className="rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Satista"
                          ? "bg-neli-600 text-white"
                          : "bg-white/90 text-foreground"
                      }`}
                    >
                      {projectStatusLabels[project.status]}
                    </span>
                  </div>
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
                    <p className="text-xs text-foreground/60 mb-1">Teslim Yili</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-neli-600" />
                      {project.year}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cream-100">
                    <p className="text-xs text-foreground/60 mb-1">Proje Tipi</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-neli-600" />
                      {project.type}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-cream-100">
                    <p className="text-xs text-foreground/60 mb-1">Toplam Daire</p>
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
                      <p className="font-medium text-foreground">{project.details.totalBlocks}</p>
                    </div>
                    <div className="rounded-lg bg-cream-100 p-3">
                      <p className="text-foreground/60 mb-1">Peyzaj Alanı</p>
                      <p className="font-medium text-foreground">
                        {project.details.landscapeRatio}
                      </p>
                    </div>
                    <div className="rounded-lg bg-cream-100 p-3">
                      <p className="text-foreground/60 mb-1">Otopark</p>
                      <p className="font-medium text-foreground">{project.details.parking}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white p-5 md:p-6 shadow-soft"
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
              <div className="mt-4 rounded-lg bg-cream-100 p-4 text-sm text-foreground/70">
                <p className="font-medium text-foreground mb-1">Adres Bilgisi</p>
                <p>
                  {project.details.neighborhood}, {project.details.district}, {project.details.city}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-white p-5 md:p-6 shadow-soft"
            >
              <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-4">
                Öne Çıkan Özellikler
              </h3>
              <ul className="space-y-3">
                {project.details.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 rounded-lg border border-cream-300 p-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neli-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{highlight}</span>
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
                Projede yer alan daire tipleri ve adet dağılımı aşağıdaki gibidir.
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
                    <tr key={unitType.type} className="border-t border-cream-300">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {unitType.type}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80">{unitType.count}</td>
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
                <p className="text-xs text-foreground/60 mb-1">Otopark Çözümü</p>
                <p className="text-lg font-serif font-medium text-foreground flex items-center gap-2">
                  <Car className="w-4 h-4 text-neli-600" />
                  {project.details.parking}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-neli-600/5 border border-neli-600/20 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm md:text-base font-medium text-foreground">
                  Proje hakkında detaylı bilgi ve güncel durum almak için bize ulaşın.
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
