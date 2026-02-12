import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Home, ChevronDown } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import { projects, projectStatusLabels } from "@/data/projects";

export default function Projects() {
  const [activeFilters, setActiveFilters] = useState({
    status: "Tümü",
    type: "Tümü",
    location: "Tümü",
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      status: [
        "Tümü",
        ...new Set(projects.map((project) => projectStatusLabels[project.status])),
      ],
      type: ["Tümü", ...new Set(projects.map((project) => project.type))],
      location: ["Tümü", ...new Set(projects.map((project) => project.details.district))],
    }),
    []
  );

  const filteredProjects = projects.filter((project) => {
    if (
      activeFilters.status !== "Tümü" &&
      projectStatusLabels[project.status] !== activeFilters.status
    ) {
      return false;
    }

    if (activeFilters.type !== "Tümü" && project.type !== activeFilters.type) {
      return false;
    }

    if (
      activeFilters.location !== "Tümü" &&
      project.details.district !== activeFilters.location
    ) {
      return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <PageHero
        currentPage="Projeler"
        title={
          <>
            Satışı Devam Eden & Tamamlanan
            <span className="text-neli-600"> Konut Projelerimiz</span>
          </>
        }
        description="Her projemizde kalite, konfor ve estetiği bir araya getirerek ayrıcalıklı yaşam alanları oluşturuyoruz."
      />

      {/* Filters */}
      <section className="sticky top-16 md:top-20 lg:top-24 z-30 bg-white border-b border-cream-300 py-3 md:py-4">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {/* Status Filter */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "status" ? null : "status")
                  }
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-cream-100 hover:bg-cream-200 rounded-lg text-xs md:text-sm font-medium transition-colors duration-300"
                >
                  <span>Durum: {activeFilters.status}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${
                      openDropdown === "status" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "status" && (
                  <div className="absolute top-full left-0 mt-2 w-40 md:w-48 bg-white rounded-lg shadow-soft-lg border border-cream-300 overflow-hidden z-40">
                    {filters.status.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setActiveFilters({ ...activeFilters, status });
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-3 md:px-4 py-2 text-left text-xs md:text-sm hover:bg-cream-100 transition-colors duration-300 ${
                          activeFilters.status === status
                            ? "bg-neli-600/10 text-neli-600"
                            : "text-foreground/70"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Type Filter */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "type" ? null : "type")
                  }
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-cream-100 hover:bg-cream-200 rounded-lg text-xs md:text-sm font-medium transition-colors duration-300"
                >
                  <span>Tip: {activeFilters.type}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${
                      openDropdown === "type" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "type" && (
                  <div className="absolute top-full left-0 mt-2 w-40 md:w-48 bg-white rounded-lg shadow-soft-lg border border-cream-300 overflow-hidden z-40">
                    {filters.type.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setActiveFilters({ ...activeFilters, type });
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-3 md:px-4 py-2 text-left text-xs md:text-sm hover:bg-cream-100 transition-colors duration-300 ${
                          activeFilters.type === type
                            ? "bg-neli-600/10 text-neli-600"
                            : "text-foreground/70"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Filter */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "location" ? null : "location")
                  }
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-cream-100 hover:bg-cream-200 rounded-lg text-xs md:text-sm font-medium transition-colors duration-300"
                >
                  <span>Lokasyon: {activeFilters.location}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${
                      openDropdown === "location" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "location" && (
                  <div className="absolute top-full left-0 mt-2 w-40 md:w-48 bg-white rounded-lg shadow-soft-lg border border-cream-300 overflow-hidden z-40">
                    {filters.location.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setActiveFilters({ ...activeFilters, location });
                          setOpenDropdown(null);
                        }}
                        className={`w-full px-3 md:px-4 py-2 text-left text-xs md:text-sm hover:bg-cream-100 transition-colors duration-300 ${
                          activeFilters.location === location
                            ? "bg-neli-600/10 text-neli-600"
                            : "text-foreground/70"
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/projeler/${project.slug}`} className="block">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 md:mb-4">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Satista"
                              ? "bg-neli-600 text-white"
                              : "bg-white/90 text-foreground"
                          }`}
                        >
                          {projectStatusLabels[project.status]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                        <h3 className="text-base md:text-lg lg:text-xl font-serif font-medium text-white mb-1 md:mb-2">
                          {project.name}
                        </h3>
                        <p className="text-white/70 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs text-white/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            {project.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <Home className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            {project.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <p className="text-foreground/50 text-sm md:text-base">
                  Seçilen filtrelere uygun proje bulunamadı.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
