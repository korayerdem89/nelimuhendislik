import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import type { LucideIcon } from "lucide-react";
import {
  MapPin,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  Leaf,
  Sparkles,
  TrendingUp,
  Car,
} from "lucide-react";
import { useContactSectionData } from "@/hooks/use-contact-section-data";

const SHOWCASE_BRAND_IMAGE = "/images/blog/konut-projeleri.webp";

/** Pastel arka planlar; metin koyu gri (stone-900) ile siyah kontrastı korunur */
const FEATURE_TAG_ICONS: LucideIcon[] = [
  MapPin,
  ShieldCheck,
  Leaf,
  Sparkles,
  TrendingUp,
  Car,
];

const FEATURE_TAG_PILL_CLASSES: string[] = [
  "border-sky-200/90 bg-sky-100 text-stone-900 [&>svg]:text-sky-700",
  "border-amber-200/90 bg-amber-100 text-stone-900 [&>svg]:text-amber-700",
  "border-emerald-200/90 bg-emerald-100 text-stone-900 [&>svg]:text-emerald-700",
  "border-violet-200/90 bg-violet-100 text-stone-900 [&>svg]:text-violet-700",
  "border-rose-200/90 bg-rose-100 text-stone-900 [&>svg]:text-rose-700",
  "border-teal-200/90 bg-teal-100 text-stone-900 [&>svg]:text-teal-700",
];

interface FeatureItem {
  text: string;
  image: string;
}

interface FlatType {
  label: string;
  images: string[];
  /** Seçili daire tipi görselinin altında madde madde gösterilir */
  bullets: string[];
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
    location: "Balatçık Mahallesi, Çiğli, İzmir",
    heroImage: "/projects/valorya1/cover.webp",
    heroGradientFallback: "from-neli-700 via-neli-600 to-neli-500",
    flatTypes: [
      {
        label: "1+1",
        images: ["/projects/valorya1/1.webp"],
        bullets: [
          "Kompakt ve işlevsel plan; genç profesyoneller ve yatırımcılar için uygun",
          "Salon ve yatak odası ayrımı net; günlük kullanımda ferah his",
          "Merkezi konum sayesinde ulaşım ve sosyal olanaklara yakınlık",
        ],
      },
    ],
    featureDetails: [
      {
        text: "Merkezi konum avantajı",
        image: "/features/valorya1_location.webp",
      },
      {
        text: "Depreme karşı oldukça dayanıklı yapı",
        image: "/features/earthquake.webp",
      },
      {
        text: "Enerji verimliliği yüksek, güçlü yalıtım",
        image: "/features/isolation.webp",
      },
      {
        text: "Modern ve minimalist tasarım",
        image: "/features/minimalist.webp",
      },
      {
        text: "Yüksek yatırım değeri",
        image: "/features/investment.webp",
      },
    ],
    price: "2.700.000 TL'den Başlayan Fiyatlarla",
  },
  {
    id: "valorya-2",
    name: "Valorya 2",
    tab: "Valorya 2",
    location: "KucukÇiğli Mahallesi, Çiğli, İzmir",
    heroImage: "/projects/valorya2/cover.webp",
    heroGradientFallback: "from-slate-800 via-slate-700 to-slate-600",
    flatTypes: [
      {
        label: "1+1",
        images: [
          "/projects/valorya2/4.webp",
          "/projects/valorya2/5.webp",
          "/projects/valorya2/6.webp",
          "/projects/valorya2/7.webp",
          "/projects/valorya2/8.webp",
          "/projects/valorya2/9.webp",
          "/projects/valorya2/10.webp",
          "/projects/valorya2/11.webp",
          "/projects/valorya2/12.webp",
        ],
        bullets: [
          "Geniş bahçe alanı; Dört mevsim kullanılabilen, modern peyzajlı özel bir dış yaşam sunuyor.",
          "50 m² yaşam alanı; standart 1+1’lere göre ferah plan ve günlük hareket özgürlüğü için bol iç mekan.",
          "Açık mutfak düzeni; salon ve yemek alanıyla bütünleşen, davetli sohbetlere uygun modern bir yaşam akışı.",
          "Seramikten armature, dolaplardan aydınlatmaya kadar her detayda birinci sınıf markalarla seçilmiş malzeme ve işçilik.",
        ],
      },
      {
        label: "2+1",
        images: [
          "/projects/valorya2/13.webp",
          "/projects/valorya2/14.webp",
          "/projects/valorya2/15.webp",
          "/projects/valorya2/16.webp",
          "/projects/valorya2/17.webp",
        ],
        bullets: [
          "60 m² yaşam alanı; iki yatak odası ve geniş ortak alan için dengeli, ferah bir plan.",
          "Kapı, seramik, mutfak ve banyo donanımı dahil tüm yaşam alanlarında birinci kalite malzeme ve marka tercihi.",
          "Açık mutfak düzeni; salon ve yemek alanıyla kesintisiz, ferah ve güncel bir yaşam akışı.",
          "Zemin kat veya ara kat seçenekleri; bahçe kullanımı veya yükseklik tercihinize göre planlanmış daireler.",
        ],
      },
      {
        label: "3+1",
        images: ["/projects/valorya2/2.webp", "/projects/valorya2/1.webp"],
        bullets: [
          "105 m² yaşam alanı; dubleks plan ile üst ve alt katlarda ayrışan, özel konut deneyimi.",
          "Geniş manzaralı cepheler; panoramik görüş imkânı.",
          "Geniş teras alanları; açık havada yemek ve dinlenme için ferah dış yaşam.",
          "Kapalı mutfak düzeni; koku ve gürültüyü salondan ayıran, klasik ve düzenli mutfak kullanımı.",
          "Seramik, doğrama, mutfak ve banyo donanımı dahil her detayda birinci kalite malzeme ve seçkin markalar.",
        ],
      },
    ],
    featureDetails: [
      {
        text: "Merkezi konum avantajı",
        image: "/features/valorya2_location.webp",
      },
      {
        text: "Depreme karşı oldukça dayanıklı yapı",
        image: "/features/earthquake.webp",
      },
      {
        text: "Enerji verimliliği yüksek, güçlü yalıtım",
        image: "/features/isolation.webp",
      },
      {
        text: "Modern ve minimalist tasarım",
        image: "/features/minimalist.webp",
      },
      {
        text: "Yüksek yatırım değeri",
        image: "/features/investment.webp",
      },
      {
        text: "Asansör erişimli kapalı otopark",
        image: "/features/asansor.webp",
      },
    ],
    price: "3.500.000 TL'den Başlayan Fiyatlarla",
  },
  {
    id: "valorya-3",
    name: "Valorya 3",
    tab: "Valorya 3",
    location: "Balatçık Mahallesi, Çiğli, İzmir",
    heroImage: "/projects/valorya3/cover2.webp",
    heroGradientFallback: "from-stone-800 via-stone-700 to-stone-600",
    flatTypes: [
      {
        label: "1+1",
        images: [
          "/projects/valorya3/2.webp",
          "/projects/valorya3/3.webp",
          "/projects/valorya3/4.webp",
          "/projects/valorya3/5.webp",
          "/projects/valorya3/6.webp",
        ],
        bullets: [
          "Açık mutfak düzeni; salon ve yemek alanıyla bütünleşen ferah yaşam akışı.",
          "42 m² yaşam alanı; kompakt ve işlevsel plan.",
          "Seramikten doğramaya kadar birinci kalite marka ve malzeme tercihi.",
        ],
      },
      {
        label: "2+1",
        images: [
          "/projects/valorya3/7.webp",
          "/projects/valorya3/8.webp",
          "/projects/valorya3/9.webp",
          "/projects/valorya3/11.webp",
          "/projects/valorya3/12.webp",
        ],
        bullets: [
          "Dubleks plan; üst ve alt katlarda ayrışan konforlu yaşam.",
          "Açık veya kapalı mutfak seçenekleri; tercihinize göre planlanabilir düzen.",
          "Bağımsız girişli daireler; mahremiyet ve kullanım özgürlüğü.",
          "Kapı, seramik ve donanımda birinci kalite malzeme ve işçilik.",
        ],
      },
      {
        label: "3+1",
        images: [
          "/projects/valorya3/7.webp",
          "/projects/valorya3/9.webp",
          "/projects/valorya3/11.webp",
          "/projects/valorya3/12.webp",
        ],
        bullets: [
          "Dubleks plan; üst ve alt katlarda ayrışan konforlu yaşam.",
          "Açık mutfak düzeni; bu daire tiplerinde kapalı mutfak seçeneği bulunmaz.",
          "Bağımsız girişli daireler; mahremiyet ve kullanım özgürlüğü.",
          "Kapı, seramik ve donanımda birinci kalite malzeme ve işçilik.",
        ],
      },
    ],
    featureDetails: [
      {
        text: "Merkezi konum avantajı",
        image: "/features/valorya3_location.webp",
      },
      {
        text: "Depreme karşı oldukça dayanıklı yapı",
        image: "/features/earthquake.webp",
      },
      {
        text: "Enerji verimliliği yüksek, güçlü yalıtım",
        image: "/features/isolation.webp",
      },
      {
        text: "Modern ve minimalist tasarım",
        image: "/features/minimalist.webp",
      },
      {
        text: "Yüksek yatırım değeri",
        image: "/features/investment.webp",
      },
      {
        text: "Asansör erişimli kapalı otopark",
        image: "/features/asansor.webp",
      },
    ],
    price: "3.500.000 TL'den Başlayan Fiyatlarla",
  },
];

function FeatureDetailTagPills({
  features,
  projectId,
  className,
}: {
  features: FeatureItem[];
  projectId: string;
  className: string;
}) {
  return (
    <div className={className}>
      {features.map((f, i) => {
        const Icon = FEATURE_TAG_ICONS[i % FEATURE_TAG_ICONS.length];
        const pillClass =
          FEATURE_TAG_PILL_CLASSES[i % FEATURE_TAG_PILL_CLASSES.length];
        return (
          <span
            key={`${projectId}-feature-tag-${i}-${f.text}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-xs ${pillClass}`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {f.text}
          </span>
        );
      })}
    </div>
  );
}

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: "start",
  });
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
      <div
        className="overflow-hidden rounded-2xl shadow-soft ring-1 ring-black/5"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y">
          {images.map((src, i) => (
            <div
              className="min-w-0 shrink-0 grow-0 basis-full"
              key={`${carouselKey}-${src}-${i}`}
            >
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
  const mapsOpenHref =
    addressItem?.href ||
    "https://maps.google.com/?q=Neli+Mühendislik+Karşıyaka+İzmir";

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
              Daire Satışı Olan Güncel Projelerimiz
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
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-soft-lg ring-1 ring-black/5">
                  <img
                    src={active.heroImage}
                    alt={`${active.name} proje görseli`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fallback =
                        t.nextElementSibling as HTMLElement | null;
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
                    <>
                      <FlatImageCarousel
                        images={activeFlat.images}
                        carouselKey={`${active.id}-${activeFlat.label}`}
                        altPrefix={`${active.name} ${activeFlat.label}`}
                      />
                      {activeFlat.bullets.length > 0 && (
                        <div className="mt-4 border-t border-cream-200/90 pt-4">
                          <h3 className="mb-2.5 text-sm font-semibold tracking-tight text-foreground lg:text-base">
                            {activeFlat.label} daire özellikleri
                          </h3>
                          <ul className="space-y-2 text-sm leading-relaxed text-foreground/75">
                            {activeFlat.bullets.map((line) => (
                              <li key={line} className="flex gap-2.5 pl-0.5">
                                <span
                                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neli-600"
                                  aria-hidden
                                />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
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
                      <span className="text-sm font-medium">
                        {active.location}
                      </span>
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
                    <span>WhatsApp Üzerinden Detayları Öğren</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </a>

                  {/* Quick feature pills — desktop only */}
                  <FeatureDetailTagPills
                    projectId={active.id}
                    features={active.featureDetails}
                    className="mt-5 hidden flex-wrap gap-2 lg:flex"
                  />
                </div>
              </div>
            </div>

            {/* ── Features — full width section below the 2-col grid ── */}
            <div className="mt-8 lg:mt-14">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/40 lg:mb-6 lg:text-sm">
                Proje Özellikleri
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
                    <div className="relative aspect-square overflow-hidden bg-cream-100">
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
                <p className="text-xl font-bold tracking-tight text-foreground">
                  {active.price}
                </p>
              </div>
              <a
                href={buildWhatsAppLink(active.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-4 text-[15px] font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Üzerinden Detayları Öğren</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </a>
              <FeatureDetailTagPills
                projectId={active.id}
                features={active.featureDetails}
                className="mt-4 flex flex-wrap gap-2 lg:hidden"
              />
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
            <div className="mt-6 lg:mt-0 lg:flex lg:flex-col">
              <div className="flex-1 overflow-hidden rounded-2xl border border-cream-200 shadow-soft ring-1 ring-black/5">
                <iframe
                  title="Neli Mühendislik konumu"
                  src={contactMapEmbedUrl}
                  className="aspect-square w-full border-0 lg:aspect-auto lg:h-full lg:min-h-[420px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
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
