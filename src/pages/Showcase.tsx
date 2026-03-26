import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  MapPin,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { useContactSectionData } from "@/hooks/use-contact-section-data";

const SHOWCASE_BRAND_IMAGE = "/blog/konut-projeleri.webp";

interface FeatureItem {
  text: string;
  image: string;
}

interface FlatType {
  label: string;
  images: string[];
}

interface ProjectData {
  id: string;
  name: string;
  tab: string;
  location: string;
  heroImage: string;
  heroGradientFallback: string;
  flatTypes: FlatType[];
  featureDetails: FeatureItem[];
  price: string;
}

const projects: ProjectData[] = [
  {
    id: "valorya-1",
    name: "Valorya 1",
    tab: "Valorya 1",
    location: "Çiğli, İzmir",
    heroImage: "/projects/serenitaprestige/1.webp",
    heroGradientFallback: "from-neli-700 via-neli-600 to-neli-500",
    flatTypes: [
      {
        label: "1+1",
        images: [
          "/projects/serenitaprestige/1.webp",
          "/projects/serenitaprestige/2.webp",
          "/projects/serenitaprestige/3.webp",
        ],
      },
    ],
    featureDetails: [
      { text: "Modern ve minimalist tasarım", image: "/projects/serenitaprestige/1.webp" },
      { text: "Merkezi konum avantajı", image: "/projects/serenitaprestige/2.webp" },
      { text: "Yüksek yatırım değeri", image: "/projects/serenitaprestige/3.webp" },
      { text: "Sosyal yaşam alanları", image: "/blog/konut-projeleri.webp" },
    ],
    price: "3.500.000 TL'den Başlayan Fiyatlarla",
  },
  {
    id: "valorya-2",
    name: "Valorya 2",
    tab: "Valorya 2",
    location: "Karşıyaka, İzmir",
    heroImage: "/projects/valorya2/1.webp",
    heroGradientFallback: "from-slate-800 via-slate-700 to-slate-600",
    flatTypes: [
      { label: "1+1", images: ["/projects/valorya2/1.webp", "/projects/valorya2/2.webp"] },
      { label: "2+1", images: ["/projects/valorya2/2.webp", "/projects/valorya2/3.webp"] },
      { label: "3+1", images: ["/projects/valorya2/3.webp", "/projects/valorya2/1.webp", "/projects/valorya2/2.webp"] },
    ],
    featureDetails: [
      { text: "Lüks iç mekan tasarımı", image: "/projects/valorya2/1.webp" },
      { text: "Deniz manzaralı daireler", image: "/projects/valorya2/2.webp" },
      { text: "Akıllı ev sistemleri", image: "/projects/valorya2/3.webp" },
      { text: "Yeşil yaşam konsepti", image: "/projects/serenitaprestige/1.webp" },
    ],
    price: "4.200.000 TL'den Başlayan Fiyatlarla",
  },
  {
    id: "valorya-3",
    name: "Valorya 3",
    tab: "Valorya 3",
    location: "Bornova, İzmir",
    heroImage: "/projects/serenitaprestige/2.webp",
    heroGradientFallback: "from-stone-800 via-stone-700 to-stone-600",
    flatTypes: [
      { label: "1+1", images: ["/projects/serenitaprestige/1.webp", "/projects/valorya2/1.webp"] },
      { label: "2+1", images: ["/projects/serenitaprestige/2.webp", "/projects/valorya2/2.webp"] },
      { label: "3+1", images: ["/projects/serenitaprestige/3.webp", "/projects/valorya2/3.webp", "/projects/serenitaprestige/1.webp"] },
    ],
    featureDetails: [
      { text: "Geniş bahçe katı seçenekleri", image: "/projects/serenitaprestige/1.webp" },
      { text: "Spor ve wellness alanları", image: "/projects/serenitaprestige/2.webp" },
      { text: "24 saat güvenlik", image: "/projects/serenitaprestige/3.webp" },
      { text: "Metro hattına yakın konum", image: "/projects/valorya2/2.webp" },
    ],
    price: "5.100.000 TL'den Başlayan Fiyatlarla",
  },
];

function buildWhatsAppLink(projectName: string): string {
  const message = `Merhaba, ${projectName} hakkında detaylı bilgi ve fiyatları öğrenmek istiyorum.`;
  return `https://wa.me/905011864635?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------ */
/*  Embla carousel for flat-type images                               */
/* ------------------------------------------------------------------ */
function FlatImageCarousel({
  images,
  carouselKey,
  altPrefix,
}: {
  images: string[];
  carouselKey: string;
  altPrefix: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("reInit", sync);
    emblaApi.on("select", sync);
    queueMicrotask(sync);
    return () => {
      emblaApi.off("reInit", sync);
      emblaApi.off("select", sync);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    queueMicrotask(() => setSelected(emblaApi.selectedScrollSnap()));
  }, [emblaApi, carouselKey, images]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl shadow-soft ring-1 ring-black/5" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, i) => (
            <div className="min-w-0 shrink-0 grow-0 basis-full" key={`${carouselKey}-${src}-${i}`}>
              <div className="aspect-square">
                <img
                  src={src}
                  alt={`${altPrefix} — görsel ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md backdrop-blur-sm transition hover:bg-white active:scale-95"
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md backdrop-blur-sm transition hover:bg-white active:scale-95"
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-neli-600" : "w-1.5 bg-cream-400"}`}
                aria-label={`Görsel ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                         */
/* ------------------------------------------------------------------ */
export default function Showcase() {
  const { contactInfo, contactMapEmbedUrl } = useContactSectionData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [flatTypeIndex, setFlatTypeIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const flatTabsRef = useRef<HTMLDivElement>(null);
  const activeFlatTabRef = useRef<HTMLButtonElement>(null);
  const active = projects[activeIndex];
  const activeFlat = active.flatTypes[flatTypeIndex] ?? active.flatTypes[0];

  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const tab = activeTabRef.current;
      container.scrollTo({
        left: tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeFlatTabRef.current && flatTabsRef.current) {
      const container = flatTabsRef.current;
      const tab = activeFlatTabRef.current;
      container.scrollTo({
        left: tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [flatTypeIndex, activeIndex]);

  const addressItem = contactInfo.find((c) => c.title === "Adres");
  const mapsOpenHref = addressItem?.href || "https://maps.google.com/?q=Neli+Mühendislik+Karşıyaka+İzmir";

  return (
    <div className="min-h-screen bg-cream-50/80">
      {/* ====== Brand banner — full width ====== */}
      <div className="relative h-40 w-full overflow-hidden sm:h-48 lg:h-72 xl:h-80">
        <img
          src={SHOWCASE_BRAND_IMAGE}
          alt="Neli Mühendislik"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/5" />
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-full max-w-md px-4 lg:bottom-8 lg:max-w-5xl lg:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 lg:text-xs">
            Konut &amp; Yaşam
          </p>
          <p
            className="mt-0.5 text-xl font-bold tracking-tight text-white drop-shadow-sm lg:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Neli Mühendislik
          </p>
        </div>
      </div>

      {/* ====== Sticky nav — header + tabs ====== */}
      <div className="sticky top-0 z-50 border-b border-cream-300/80 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <div className="mx-auto max-w-md lg:max-w-5xl">
          <div className="flex h-12 items-center justify-center px-4 lg:h-14 lg:justify-start">
            <h1
              className="text-base font-bold tracking-tight text-foreground lg:text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Neli Mühendislik
            </h1>
          </div>
          <div className="border-t border-cream-200/80">
            <div
              ref={tabsRef}
              className="flex gap-1.5 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  ref={i === activeIndex ? activeTabRef : null}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setFlatTypeIndex(0);
                  }}
                  className={`relative flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-foreground text-white shadow-sm"
                      : "bg-cream-100 text-foreground/50 hover:bg-cream-200 hover:text-foreground/70"
                  }`}
                >
                  {project.tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====== Content ====== */}
      <main className="mx-auto max-w-md px-4 pb-10 pt-5 lg:max-w-5xl lg:px-6 lg:pb-16 lg:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* ── Desktop: 2-column  |  Mobile: stacked ── */}
            <div className="lg:grid lg:grid-cols-5 lg:gap-10">
              {/* LEFT column (3/5) — visuals */}
              <div className="lg:col-span-3">
                {/* Hero — wide 16:9 */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-soft-lg ring-1 ring-black/5">
                  <img
                    src={active.heroImage}
                    alt={`${active.name} proje görseli`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fallback = t.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                  <div
                    className={`absolute inset-0 hidden bg-gradient-to-br ${active.heroGradientFallback}`}
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white lg:p-6">
                    <p className="text-xs font-medium uppercase tracking-widest text-white/75 lg:text-sm">
                      {active.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/90 lg:text-base">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-white/80 lg:h-4 lg:w-4" />
                      {active.location}
                    </p>
                  </div>
                </div>

                {/* Flat types — below hero on both mobile & desktop */}
                <div className="mt-6 lg:mt-8">
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-foreground/40">
                    Daire tipleri
                  </p>
                  <div
                    ref={flatTabsRef}
                    className="mb-4 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {active.flatTypes.map((ft, i) => (
                      <button
                        key={ft.label}
                        ref={i === flatTypeIndex ? activeFlatTabRef : null}
                        type="button"
                        onClick={() => setFlatTypeIndex(i)}
                        className={`flex-shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                          i === flatTypeIndex
                            ? "border-neli-600 bg-neli-600 text-white shadow-sm"
                            : "border-cream-300 bg-white text-foreground/60 hover:border-cream-400 hover:text-foreground"
                        }`}
                      >
                        {ft.label}
                      </button>
                    ))}
                  </div>
                  {activeFlat && (
                    <FlatImageCarousel
                      images={activeFlat.images}
                      carouselKey={`${active.id}-${activeFlat.label}`}
                      altPrefix={`${active.name} ${activeFlat.label}`}
                    />
                  )}
                </div>
              </div>

              {/* RIGHT column (2/5) — info sidebar (desktop) */}
              <div className="mt-6 lg:col-span-2 lg:mt-0">
                {/* Desktop: sticky sidebar */}
                <div className="lg:sticky lg:top-[7.5rem]">
                  {/* Title & location */}
                  <div className="space-y-1.5">
                    <h2
                      className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {active.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-foreground/55">
                      <MapPin className="h-4 w-4 shrink-0 text-neli-600" />
                      <span className="text-sm font-medium">{active.location}</span>
                    </div>
                  </div>

                  <div className="my-5 h-px bg-cream-300/70 lg:my-6" />

                  {/* Price */}
                  <div className="rounded-xl border border-cream-300/60 bg-white p-5 text-center shadow-xs lg:p-6">
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-foreground/40">
                      Başlangıç Fiyatı
                    </p>
                    <p className="text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                      {active.price}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href={buildWhatsAppLink(active.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-4 text-[15px] font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Sohbete Geri Dön ve Detayları Öğren</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </a>

                  {/* Quick feature pills — desktop only */}
                  <div className="mt-5 hidden flex-wrap gap-2 lg:flex">
                    {active.featureDetails.map((f) => (
                      <span
                        key={f.text}
                        className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-medium text-foreground/70"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {f.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Features — full width section below the 2-col grid ── */}
            <div className="mt-8 lg:mt-14">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/40 lg:mb-6 lg:text-sm">
                Öne çıkanlar
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                {active.featureDetails.map((item, i) => (
                  <motion.div
                    key={`${active.id}-${item.text}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group overflow-hidden rounded-2xl border border-cream-200/90 bg-white shadow-xs transition-shadow hover:shadow-soft"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
                      <p className="absolute bottom-3 left-4 right-4 text-[15px] font-semibold leading-snug text-white drop-shadow-sm lg:text-base">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile-only: price + CTA repeat (desktop has them in sidebar) */}
            <div className="mt-8 lg:hidden">
              <div className="rounded-xl border border-cream-300/60 bg-white p-5 text-center shadow-xs">
                <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-foreground/40">
                  Başlangıç Fiyatı
                </p>
                <p className="text-xl font-bold tracking-tight text-foreground">{active.price}</p>
              </div>
              <a
                href={buildWhatsAppLink(active.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-4 text-[15px] font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Sohbete Geri Dön ve Detayları Öğren</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ====== Contact section ====== */}
        <section className="mt-12 border-t border-cream-300/80 pt-10 lg:mt-20 lg:pt-14">
          <div className="mb-6 lg:mb-10">
            <h3
              className="text-center text-lg font-bold text-foreground lg:text-left lg:text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Bize ulaşın
            </h3>
            <p className="mt-1 text-center text-sm text-foreground/50 lg:text-left">
              Sorularınız için ofisimizi ziyaret edebilir veya arayabilirsiniz.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Contact cards */}
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "div";
                const props = item.href
                  ? {
                      href: item.href,
                      target: item.title === "Adres" ? "_blank" : undefined,
                      rel: "noopener noreferrer" as const,
                    }
                  : {};
                return (
                  <Wrapper
                    key={item.title}
                    {...props}
                    className={`flex gap-3 rounded-xl border border-cream-200 bg-white p-4 shadow-xs transition hover:border-cream-300 hover:shadow-soft ${
                      item.href ? "cursor-pointer" : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neli-600/10 text-neli-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/40">
                        {item.title}
                      </p>
                      <p className="mt-0.5 whitespace-pre-line text-sm font-medium text-foreground/80">
                        {item.content}
                      </p>
                      {item.href && item.title === "Adres" && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-neli-600">
                          Haritada aç
                          <ExternalLink className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Map */}
            <div className="mt-6 lg:mt-0">
              <div className="overflow-hidden rounded-2xl border border-cream-200 shadow-soft ring-1 ring-black/5">
                <div className="aspect-video w-full bg-cream-100 lg:aspect-auto lg:h-full lg:min-h-[320px]">
                  <iframe
                    title="Neli Mühendislik konumu"
                    src={contactMapEmbedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
              <a
                href={mapsOpenHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-cream-300 bg-white py-3 text-sm font-semibold text-foreground/80 transition hover:bg-cream-50"
              >
                <MapPin className="h-4 w-4 text-neli-600" />
                Google Haritalar'da yol tarifi
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-foreground/30 lg:mt-14">
            Neli Mühendislik · Güvenilir yaşam alanları
          </p>
        </section>
      </main>
    </div>
  );
}
