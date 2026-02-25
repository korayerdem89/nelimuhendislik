import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Building2, HardHat, Award, Users } from "lucide-react";
import HeroSection from "../components/HeroSection";
import TimelineMilestones from "@/components/sections/TimelineMilestones";
import PrimaryCtaSection from "@/components/sections/PrimaryCtaSection";
import ProjectsMapSection from "@/components/sections/ProjectsMapSection";
import { projects } from "@/data/projects";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";

const stats = [
  { icon: Building2, value: "15+", label: "Tamamlanan Proje" },
  { icon: HardHat, value: "5+", label: "Yıllık Deneyim" },
  { icon: Award, value: "100%", label: "Müşteri Memnuniyeti" },
  { icon: Users, value: "100+", label: "Mutlu Aile" },
];

const milestones = [
  {
    year: "1989",
    title: "İran'da Tara Enginneering Adıyla Kurulduk",
    description:
      'İran\'da "Ayrıcalıklı hissetmek herkesin hakkı" prensibiyle yola çıktık.',
  },
  {
    year: "2021",
    title: "Neli Mühendislik Adıyla İzmir'de Faaliyetlere Başladık",
    description:
      "Onlarca restorasyon projesiyle kusursuz hizmet sunmaya başladık.",
  },
  {
    year: "2023",
    title: "İlk İnşaat Projemiz",
    description: "Valorya 1 projesi ile inşaat projelerine başladık.",
  },
  {
    year: "2024",
    title: "Yeni projelerle büyümeye devam ediyoruz",
    description: "Valorya 2 projemizin temellerini attık.",
  },
  {
    year: "2025",
    title: "İlk projemiz tamamlandı",
    description:
      "Valorya 1 projemizi tamamladık. Valorya 3 projemizin temellerini attık.",
  },
  {
    year: "2026",
    title: "Yeni Hedefler",
    description:
      "Valorya 4, Valorya 5, Valorya 6 ve Valorya 7 projelerimizle büyümeye devam ediyoruz.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isProjectsInView = useInView(projectsRef, {
    once: true,
    amount: "some",
    margin: "0px 0px -300px 0px",
  });
  const isMapInView = useInView(mapRef, {
    once: true,
    amount: "some",
    margin: "0px 0px -300px 0px",
  });

  return (
    <main className="min-h-screen">
      <SEO
        title="Ana Sayfa"
        description="Neli Mühendislik, İzmir'de modern ve kaliteli konut projeleri sunan güvenilir bir inşaat firmasıdır. Valorya ve Serenita projeleriyle hayalinizdeki eve kavuşun."
        url="https://nelimuhendislik.com"
      />

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
                <OptimizedImage
                  src="/office2.webp"
                  alt="Neli Mühendislik"
                  className="rounded-2xl"
                  aspectRatio="4/3"
                />
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
                  Tüm Projeler
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
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group rounded-xl border border-cream-300 bg-white p-3"
                >
                  <Link to={`/projeler/${project.slug}`} className="block">
                    <div className="relative aspect-[1/1] rounded-xl overflow-hidden mb-3 md:mb-4">
                      <OptimizedImage
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                        priority={index === 0}
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-medium text-foreground mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {project.details.city}, {project.details.district}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={mapRef} className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : {}}
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
