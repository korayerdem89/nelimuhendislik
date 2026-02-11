import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Shield, Heart, BookOpen, Handshake, Gem, Leaf } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Titiz ve Disiplinli',
    description: 'Her aşamada detaylara gösterdiğimiz özen ve disiplinli çalışma anlayışımız.',
  },
  {
    icon: Lightbulb,
    title: 'Tutkulu ve Güvenilir',
    description: 'İşimizi tutkuyla yapıyor, verdiğimiz sözleri tutarak güven inşa ediyoruz.',
  },
  {
    icon: Shield,
    title: 'Kaliteli ve Özgün',
    description: 'Standartların üzerinde kalite ve her projeye özgün dokunuşlar.',
  },
  {
    icon: Heart,
    title: 'İnsana ve Doğaya Saygılı',
    description: 'Çevre dostu malzemeler ve insan sağlığını öncelikli tutan yaklaşım.',
  },
  {
    icon: BookOpen,
    title: 'Eğitim ve Bilime Dayalı',
    description: 'Sürekli gelişim ve bilimsel verilere dayalı kararlar.',
  },
  {
    icon: Handshake,
    title: 'Şeffaf İletişim',
    description: 'Proje sürecinde açık ve dürüst iletişim politikası.',
  },
];

const milestones = [
  {
    year: '2021',
    title: 'Neli Mühendislik Kuruldu',
    description: 'İzmir\'de "Ayrıcalıklı hissetmek herkesin hakkı" prensibiyle yola çıktık.',
  },
  {
    year: '2022',
    title: 'İlk Projelerimiz',
    description: 'Valorya 1 ve Valorya 2 projelerimizin temellerini attık.',
  },
  {
    year: '2023',
    title: 'Büyüme ve Gelişme',
    description: 'Serenità Park ve Valorya 3 projelerimizi tamamladık.',
  },
  {
    year: '2024',
    title: 'Yeni Hedefler',
    description: 'Valorya 4 ve Valorya 5 projelerimizle büyümeye devam ediyoruz.',
  },
];

const partners = [
  'Vitra', 'Grohe', 'Siemens', 'Bosch', 'Kale', 'E.C.A.', 'Alarko', 'Baymak'
];

export default function Corporate() {
  const headerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  
  const isHeaderInView = useInView(headerRef, { once: true });
  const isAboutInView = useInView(aboutRef, { once: true, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const isMilestonesInView = useInView(milestonesRef, { once: true, margin: '-100px' });

  return (
    <main className="min-h-screen pt-20 md:pt-24 lg:pt-28">
      {/* Hero */}
      <section ref={headerRef} className="relative py-12 md:py-16 lg:py-24 bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-foreground/50 mb-4 md:mb-6">
                <span>Anasayfa</span>
                <span>/</span>
                <span className="text-neli-600">Kurumsal</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-3 md:mb-4">
                Neli Mühendislik
                <span className="text-neli-600"> Hikayesi</span>
              </h1>
              <p className="text-foreground/60 max-w-2xl text-sm md:text-base">
                2021 yılında kurulan şirketimiz, kalite, estetik ve konforu 
                en üst düzeyde buluşturarak ayrıcalıklı yaşam alanları oluşturuyor.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground leading-tight mb-4 md:mb-6">
                  Özel Hissettiren Tasarımlara Giden Yolda
                  <span className="text-neli-600"> Hep Biz Varız</span>
                </h2>
                <div className="space-y-3 md:space-y-4 text-foreground/60 leading-relaxed text-sm md:text-base">
                  <p>
                    2021 yılında İzmir tabanlı olarak kurulan şirketimiz, 
                    <span className="text-foreground font-medium"> &quot;Ayrıcalıklı hissetmek herkesin hakkı&quot; </span> 
                    prensibiyle yola çıkmıştır.
                  </p>
                  <p>
                    Müşteri talep ve ihtiyaçlarını, detaylara verdiğimiz özen ile kaliteden taviz vermeyen, 
                    konforlu ve estetik tasarımlarla karşılıyoruz.
                  </p>
                  <p>
                    İtibarlı çözüm ortaklarımız, uzman tedarikçilerimiz ve nitelikli işgücümüzle teknoloji, 
                    bilim ve yaratıcılığımızı buluşturuyoruz.
                  </p>
                  <p>
                    Koşulsuz müşteri memnuniyeti anlayışı ile proje teslimi sonrasında da yanınızdayız.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-16"
            >
              <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
                Değerlerimiz
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                Bizi <span className="text-neli-600">Biz Yapan</span> Değerler
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group p-4 md:p-6 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-neli-600/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-neli-600 group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-5 h-5 md:w-6 md:h-6 text-neli-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base md:text-lg font-serif font-medium text-foreground mb-1 md:mb-2">{value.title}</h3>
                  <p className="text-foreground/60 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section ref={milestonesRef} className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isMilestonesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-16"
            >
              <span className="text-neli-600 text-sm font-medium tracking-wider uppercase mb-2 md:mb-4 block">
                Hikayemizin Devamı
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground">
                Kilometre Taşları
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline Line - Hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-cream-300 -translate-x-1/2" />

              {/* Timeline Items */}
              <div className="space-y-8 md:space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isMilestonesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                    className="relative md:grid md:grid-cols-[1fr_60px_1fr] md:items-start"
                  >
                    {/* Left Column */}
                    <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-4' : ''}`}>
                      {index % 2 === 0 && (
                        <>
                          <span className="text-neli-600 font-serif text-xl md:text-2xl font-bold">{milestone.year}</span>
                          <h3 className="text-base md:text-lg lg:text-xl font-serif font-medium text-foreground mt-1 md:mt-2 mb-1 md:mb-2">{milestone.title}</h3>
                          <p className="text-foreground/60 text-sm leading-relaxed">{milestone.description}</p>
                        </>
                      )}
                    </div>

                    {/* Center Dot */}
                    <div className="hidden md:flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-white border-4 border-neli-600 flex-shrink-0" />
                    </div>

                    {/* Right Column */}
                    <div className={`hidden md:block ${index % 2 !== 0 ? 'text-left pl-4' : ''}`}>
                      {index % 2 !== 0 && (
                        <>
                          <span className="text-neli-600 font-serif text-xl md:text-2xl font-bold">{milestone.year}</span>
                          <h3 className="text-base md:text-lg lg:text-xl font-serif font-medium text-foreground mt-1 md:mt-2 mb-1 md:mb-2">{milestone.title}</h3>
                          <p className="text-foreground/60 text-sm leading-relaxed">{milestone.description}</p>
                        </>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <span className="text-neli-600 font-serif text-xl font-bold">{milestone.year}</span>
                      <h3 className="text-base font-serif font-medium text-foreground mt-1 mb-1">{milestone.title}</h3>
                      <p className="text-foreground/60 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-cream-100">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 md:w-16 h-px bg-cream-300" />
                <Leaf className="w-4 h-4 md:w-5 md:h-5 text-neli-600" />
                <div className="w-10 md:w-16 h-px bg-cream-300" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-3 md:mb-4">
                Çözüm Ortaklarımız
              </h3>
              <p className="text-foreground/60 max-w-xl mx-auto mb-6 md:mb-10 text-sm md:text-base px-4 md:px-0">
                Kullandığımız bütün malzeme ve ürünlerde kaliteden ödün vermiyoruz. 
                Dünyanın önde gelen markalarıyla çalışıyoruz.
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {partners.map((partner) => (
                  <div
                    key={partner}
                    className="px-3 md:px-6 py-2 md:py-3 bg-white rounded-full text-foreground/60 text-xs md:text-sm font-medium shadow-soft"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
