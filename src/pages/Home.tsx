import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Building2, HardHat, Award, Users } from "lucide-react";
import HeroSection from "../components/HeroSection";
import TimelineMilestones from "@/components/sections/TimelineMilestones";
import PrimaryCtaSection from "@/components/sections/PrimaryCtaSection";
import ProjectsMapSection from "@/components/sections/ProjectsMapSection";

const stats = [
  { icon: Building2, value: "15+", label: "Tamamlanan Proje" },
  { icon: HardHat, value: "4+", label: "Yıllık Deneyim" },
  { icon: Award, value: "100%", label: "Müşteri Memnuniyeti" },
  { icon: Users, value: "500+", label: "Mutlu Aile" },
];

const featuredProjects = [
  {
    id: 1,
    name: "Valorya 5",
    location: "İzmir",
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    status: "Satışta",
  },
  {
    id: 2,
    name: "Valorya 4",
    location: "İzmir",
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "Satışta",
  },
  {
    id: 3,
    name: "Serenità Park",
    location: "Karşıyaka, İzmir",
    type: "Toplu Konut",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    status: "Tamamlandı",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Neli Mühendislik Kuruldu",
    description:
      'İzmir\'de "Ayrıcalıklı hissetmek herkesin hakkı" prensibiyle yola çıktık.',
  },
  {
    year: "2022",
    title: "İlk Projelerimiz",
    description: "Valorya 1 ve Valorya 2 projelerimizin temellerini attık.",
  },
  {
    year: "2023",
    title: "Büyüme ve Gelişme",
    description: "Serenità Park ve Valorya 3 projelerimizi tamamladık.",
  },
  {
    year: "2024",
    title: "Yeni Hedefler",
    description:
      "Valorya 4 ve Valorya 5 projelerimizle büyümeye devam ediyoruz.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isProjectsInView = useInView(projectsRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section ref={heroRef} className="bg-white border-b border-gray-100">
        <div className="container-padding py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-1">
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-neli-600" />
                    <span className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-xs md:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                    alt="Neli Mühendislik"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 w-24 md:w-48 h-24 md:h-48 bg-neli-600/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 w-16 md:w-32 h-16 md:h-32 border-2 border-neli-600/20 rounded-2xl -z-10" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                  Hakkımızda
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-tight mb-6">
                  Özel Hissettiren Tasarımlara Giden Yolda
                  <span className="text-neli-600"> Hep Biz Varız</span>
                </h2>
                <p className="text-foreground/60 leading-relaxed mb-6 text-sm md:text-base">
                  2021 yılında İzmir tabanlı olarak kurulan şirketimiz,
                  <span className="text-foreground font-medium">
                    {" "}
                    &quot;Ayrıcalıklı hissetmek herkesin hakkı&quot;{" "}
                  </span>
                  prensibiyle yola çıkmıştır.
                </p>
                <p className="text-foreground/60 leading-relaxed mb-8 text-sm md:text-base">
                  Müşteri talep ve ihtiyaçlarını, detaylara verdiğimiz özen ile
                  kaliteden taviz vermeyen, konforlu ve estetik tasarımlarla
                  karşılıyoruz. İtibarlı çözüm ortaklarımız, uzman
                  tedarikçilerimiz ve nitelikli işgücümüzle teknoloji, bilim ve
                  yaratıcılığımızı buluşturuyoruz.
                </p>
                <Link
                  to="/kurumsal"
                  className="inline-flex items-center gap-2 text-neli-600 font-medium hover:text-neli-700 transition-colors duration-300"
                >
                  <span>Daha Fazla Bilgi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={projectsRef} className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-12"
            >
              <div>
                <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
                  Satışı Devam Eden
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                  Projelerimiz
                </h2>
              </div>
              <Link
                to="/projeler"
                className="inline-flex items-center gap-2 text-neli-600 font-medium hover:text-neli-700 transition-colors duration-300"
              >
                <span>Tüm Projeler</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <Link to="/projeler">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 md:mb-4">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 md:top-4 left-3 md:left-4">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Satışta"
                              ? "bg-neli-600 text-white"
                              : "bg-white/90 text-foreground"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                        <h3 className="text-lg md:text-xl font-serif font-medium text-white mb-1">
                          {project.name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-12"
            >
              <div>
                <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
                  Nelİ
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                  Faaliyet Haritası
                </h2>
              </div>
            </motion.div>
            <ProjectsMapSection title="Faaliyet Haritası" />
          </div>
        </div>
      </section>
      <TimelineMilestones
        eyebrow="Hikayemizin Devamı"
        title="Kilometre Taşları"
        milestones={milestones}
      />

      <PrimaryCtaSection
        title="Hayalinizdeki Yaşam İçin"
        highlightText="Bize Ulaşın"
        description="Size özel ayrıcalıklar ve öncelikli fırsatlar için formu doldurun, en kısa sürede size dönüş yapalım."
      />
    </main>
  );
}
