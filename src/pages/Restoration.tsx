import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, Building, Clock, Users } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import PrimaryCtaSection from '@/components/sections/PrimaryCtaSection';

const restorations = [
  {
    id: 1,
    name: 'Yiğit Apartmanı',
    location: 'Alsancak, İzmir',
    year: '2024',
    scope: 'Dış Cephe, Ortak Alanlar',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    id: 2,
    name: 'Kardelen Apartmanı',
    location: 'Konak, İzmir',
    year: '2023',
    scope: 'Tam Restorasyon',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: 3,
    name: 'Hatay Apartmanı',
    location: 'Karşıyaka, İzmir',
    year: '2023',
    scope: 'Dış Cephe Yenileme',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
  },
  {
    id: 4,
    name: 'Başarı Bin Yıl Sitesi',
    location: 'Bornova, İzmir',
    year: '2022',
    scope: 'Site Geneli Restorasyon',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    id: 5,
    name: 'Damlagül Apartmanı',
    location: 'Çiğli, İzmir',
    year: '2022',
    scope: 'Dış Cephe ve Tesisat',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 6,
    name: 'Ege Apartman',
    location: 'Gaziemir, İzmir',
    year: '2021',
    scope: 'Tam Restorasyon',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
];

const services = [
  {
    title: 'Dış Cephe Yenileme',
    description: 'Binalarınızın dış görünümünü modern ve estetik bir hale getiriyoruz.',
  },
  {
    title: 'Bina Güçlendirme',
    description: 'Deprem dayanıklılığı artırma ve yapısal güçlendirme hizmetleri.',
  },
  {
    title: 'Ortak Alan Düzenleme',
    description: 'Apartman ve site içi ortak kullanım alanlarının yenilenmesi.',
  },
  {
    title: 'Çatı ve Tesisat',
    description: 'Çatı yenileme ve tesisat modernizasyonu çalışmaları.',
  },
  {
    title: 'Asansör Modernizasyonu',
    description: 'Mevcut asansör sistemlerinin güncellenmesi ve yenilenmesi.',
  },
  {
    title: 'Enerji Verimliliği',
    description: 'Isı yalıtımı ve enerji verimliliği iyileştirmeleri.',
  },
];

const stats = [
  { icon: Building, value: '10+', label: 'Restorasyon Projesi' },
  { icon: Clock, value: '%95', label: 'Zamanında Teslim' },
  { icon: Users, value: '500+', label: 'Mutlu Daire Sakini' },
];

export default function Restoration() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: '-100px' });

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      <PageHero
        currentPage="Restorasyon"
        title={
          <>
            Binalara Yeni Bir
            <span className="text-neli-600"> Yaşam Veriyoruz</span>
          </>
        }
        description="Mevcut yapıların değerini koruyarak, modern standartlara uygun restorasyon hizmetleri sunuyoruz. Tarihi dokuyu korurken, çağdaş konforu sağlıyoruz."
      />

      {/* Stats */}
      <section className="py-8 md:py-12 bg-white border-b border-cream-300">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-neli-600" />
                    <span className="text-xl md:text-2xl lg:text-4xl font-serif font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-foreground/60 text-xs md:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-16"
            >
              <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
                Hizmetlerimiz
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                Restorasyon Çözümlerimiz
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group p-4 md:p-6 bg-cream-100 rounded-xl hover:bg-neli-600/5 transition-colors duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-neli-600/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-neli-600 group-hover:scale-110 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-neli-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base md:text-lg font-serif font-medium text-foreground mb-1 md:mb-2">{service.title}</h3>
                  <p className="text-foreground/60 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section ref={projectsRef} className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-12"
            >
              <div>
                <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
                  Tamamlanan Projeler
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                  Restorasyon Projelerimiz
                </h2>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {restorations.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 md:mb-4">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                      <h3 className="text-base md:text-lg lg:text-xl font-serif font-medium text-white mb-1">{project.name}</h3>
                      <p className="text-white/70 text-xs md:text-sm mb-1 md:mb-2">{project.scope}</p>
                      <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PrimaryCtaSection
        title="Binanızı Yenilemek İçin"
        highlightText="Bize Ulaşın"
        description="Restorasyon projeleriniz için ücretsiz keşif ve fiyat teklifi alın. Uzman ekibimiz size en uygun çözümleri sunacaktır."
      />
    </main>
  );
}
