import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { eq } from "drizzle-orm";
import { resolve } from "path";
import { PROJECT_ROOT } from "../paths.js";
import {
  blogPosts,
  projects,
  mapPins,
  siteSettings,
  milestones,
} from "./schema.js";

const DB_PATH = resolve(PROJECT_ROOT, "data.db");
const sqlite = new Database(DB_PATH);
sqlite.exec("PRAGMA journal_mode = WAL;");
sqlite.exec("PRAGMA foreign_keys = ON;");
const db = drizzle(sqlite);

const BLOG_DATA = [
  {
    slug: "izmir-konut-projelerinde-dikkat-edilmesi-gerekenler",
    title: "İzmir Konut Projelerinde Dikkat Edilmesi Gerekenler",
    excerpt:
      "İzmir'de konut almak, zemin durumu, mühendislik kalitesi ve doğru finansman modelini bulma sürecidir.",
    content: `<p>İzmir'de konut almak, sadece bir lokasyon seçimi değil; zemin durumu, mühendislik kalitesi ve doğru finansman modelini bulma sürecidir.</p><h2>Ev Alırken Sorgulamanız Gereken 3 Temel Kriter</h2><h3>1. Deprem Güvenliği ve Beton Kalitesi</h3><p>İzmir'in tektonik yapısı gereği, binanın sadece güncel yönetmeliklere "uygun" olması asgari bir şarttır.</p><h3>2. İmalat Teknolojisi ve İşçilik</h3><p>Kaliteli bir konut, lazer ölçümlerle milimetrik olarak inşa edilmiş olmalıdır.</p><h3>3. Finansman Güvenliği ve Banka Garantörlüğü</h3><p>Firmanın arkasında banka desteğinin olması, projenin finansal olarak denetlendiğini gösterir.</p>`,
    coverImage: "/blog/konut-projeleri.webp",
    category: "İnşaat",
    tags: JSON.stringify(["konut", "izmir", "yatırım", "satın alma"]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "İzmir Konut Projelerinde Dikkat Edilmesi Gerekenler | Neli Mühendislik",
    metaDescription:
      "İzmir'de konut alırken dikkat edilmesi gerekenler: deprem güvenliği, beton kalitesi, imalat teknolojisi ve banka garantörlüğü.",
    metaKeywords:
      "izmir konut, konut satın alma, inşaat projeleri, neli mühendislik",
    publishedAt: "2026-02-15",
  },
  {
    slug: "modern-mimari-trendleri-2026",
    title: "Modern Mimari Trendleri 2026",
    excerpt:
      "2026 yılında öne çıkan mimari tasarım trendleri ve sürdürülebilir yapılaşma yaklaşımları.",
    content: `<p>Mimari dünyası her geçen gün yeniliklerle şekilleniyor.</p><h2>Sürdürülebilir Malzemeler</h2><p>Çevre dostu malzemeler ve yenilenebilir kaynakların kullanımı artıyor.</p><h2>Akıllı Ev Sistemleri</h2><p>Teknoloji entegrasyonu artık lüks değil standart.</p>`,
    coverImage: "/images/blog/mimari-trendler.webp",
    category: "Mimari",
    tags: JSON.stringify(["mimari", "trendler", "sürdürülebilirlik", "2026"]),
    featured: false,
    status: "published" as const,
    metaTitle: "Modern Mimari Trendleri 2026 | Neli Mühendislik",
    metaDescription: "2026 yılında öne çıkan mimari tasarım trendleri.",
    metaKeywords:
      "mimari trendleri 2026, modern tasarım, sürdürülebilir mimari",
    publishedAt: "2026-01-28",
  },
  {
    slug: "valorya-projeleri-ile-yeni-bir-yasam",
    title: "Valorya Projeleri ile Yeni Bir Yaşam",
    excerpt:
      "Valorya serisi projelerimizle Çiğli ve Karşıyaka'da ayrıcalıklı yaşam alanları sunuyoruz.",
    content: `<p>Valorya projelerimiz, modern yaşamın tüm ihtiyaçlarını karşılayan özel tasarımlarla öne çıkıyor.</p><h2>Valorya Farkı</h2><p>Her Valorya projesi titizlikle planlanıyor.</p>`,
    coverImage: "/images/blog/valorya-projeleri.webp",
    category: "Projeler",
    tags: JSON.stringify(["valorya", "çiğli", "karşıyaka", "konut projesi"]),
    featured: true,
    status: "published" as const,
    metaTitle: "Valorya Projeleri ile Yeni Bir Yaşam | Neli Mühendislik",
    metaDescription:
      "Valorya serisi projelerimizle Çiğli ve Karşıyaka'da ayrıcalıklı yaşam alanları.",
    metaKeywords:
      "valorya projesi, çiğli konut, karşıyaka daire, neli mühendislik",
    publishedAt: "2026-01-10",
  },
  {
    slug: "restorasyon-projelerinde-dikkat-edilmesi-gerekenler",
    title: "Restorasyon Projelerinde Dikkat Edilmesi Gerekenler",
    excerpt:
      "Tarihi yapıların restorasyonunda uzmanlık gerektiren noktalar ve doğru yaklaşım yöntemleri.",
    content: `<p>Restorasyon, modern inşaatın aksine özel bir uzmanlık ve hassasiyet gerektirir.</p><h2>Özgün Dokunun Korunması</h2><p>Tarihi yapıların ruhunu korumak için özgün malzemeler ve teknikler kullanılmalı.</p>`,
    coverImage: "/images/blog/restorasyon.webp",
    category: "Restorasyon",
    tags: JSON.stringify(["restorasyon", "tarihi yapı", "renovasyon", "izmir"]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Restorasyon Projelerinde Dikkat Edilmesi Gerekenler | Neli Mühendislik",
    metaDescription:
      "Tarihi yapı restorasyonunda uzmanlık gerektiren noktalar.",
    metaKeywords: "restorasyon, tarihi yapı restorasyonu, izmir restorasyon",
    publishedAt: "2026-03-01",
  },
  {
    slug: "evinizi-degerlendirecek-dekorasyon-onerileri",
    title: "Evinizi Değerlendirecek Dekorasyon Önerileri",
    excerpt:
      "Küçük dokunuşlarla yaşam alanlarınızı daha fonksiyonel ve estetik hale getirme ipuçları.",
    content: `<p>Dekorasyon, bir evi gerçekten ev yapan detaylardır.</p><h2>Aydınlatmanın Gücü</h2><p>Doğal ışığı maksimize eden perde seçimleri.</p>`,
    coverImage: "/images/blog/dekorasyon.webp",
    category: "Dekorasyon",
    tags: JSON.stringify(["dekorasyon", "iç mimari", "ev tasarımı"]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Evinizi Değerlendirecek Dekorasyon Önerileri | Neli Mühendislik",
    metaDescription:
      "Küçük dokunuşlarla yaşam alanlarınızı daha fonksiyonel hale getirin.",
    metaKeywords: "dekorasyon önerileri, iç mimari, ev dekorasyonu",
    publishedAt: "2026-03-01",
  },
  {
    slug: "serenita-prestige-ayricalikli-yasamin-adresi",
    title: "Serenita Prestige: Ayrıcalıklı Yaşamın Adresi",
    excerpt:
      "Serenita Prestige projemizle Karşıyaka'da konfor ve lüksü bir araya getiriyoruz.",
    content: `<p>Serenita Prestige, Neli Mühendislik'in en özel projelerinden biri.</p><h2>Prestijli Lokasyon</h2><p>Karşıyaka'nın en değerli bölgelerinden birinde yer alıyor.</p>`,
    coverImage: "/images/blog/serenita-prestige.webp",
    category: "Projeler",
    tags: JSON.stringify(["serenita", "karşıyaka", "prestijli konut"]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Serenita Prestige: Ayrıcalıklı Yaşamın Adresi | Neli Mühendislik",
    metaDescription:
      "Serenita Prestige ile Karşıyaka'da konfor ve lüks bir arada.",
    metaKeywords: "serenita prestige, karşıyaka konut, lüks konut izmir",
    publishedAt: "2026-03-01",
  },
];

const PROJECT_DATA = [
  {
    slug: "valorya-1",
    name: "Valorya 1",
    location: "İzmir",
    year: "2025",
    type: "Apartman",
    description:
      "Kusursuz yalıtımlı, deprem güvenliği yüksek, 3 katlı modern apartman dairesi.",
    image: "/projects/valorya1/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya1/map.webp",
      highlights: [
        "Üniversiteye, Sanayi Bölgesine yürüyüş mesafesi",
        "Zemin güçlendirmesiyle depreme karşı güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "1. kalite malzemelerle inşa edilmiş yapı",
      ],
      unitTypes: [{ type: "1+1", count: 6, grossArea: "46", netArea: "38 m2" }],
      totalUnits: 6,
      totalBlocks: 1,
      landscapeRatio: "12%",
      parking: "-",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Şubat 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Mart 2025",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Nisan 2024",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Mayıs 2024",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Haziran 2024",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "completed",
        completedDate: "Temmuz 2025",
      },
      { id: "handover", name: "Teslim", status: "completed" },
    ],
  },
  {
    slug: "valorya-2",
    name: "Valorya 2",
    location: "İzmir",
    year: "2024",
    type: "Apartman",
    description:
      "Doga ile ic ice, konforlu yasam alanlari sunan ozel villa projesi.",
    image: "/projects/valorya2/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya2/map.webp",
      highlights: [
        "Üniversiteye yakın, yatırım amaçlı ideal konum",
        "Depreme karşı güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "4 katlı, toplam 16 daire",
      ],
      unitTypes: [
        { type: "1+1", count: 1, grossArea: "60 m2", netArea: "50 m2" },
        { type: "2+1", count: 11, grossArea: "77 m2", netArea: "65 m2" },
        { type: "3+1", count: 4, grossArea: "120 m2", netArea: "105 m2" },
      ],
      totalUnits: 16,
      totalBlocks: 1,
      landscapeRatio: "%12",
      parking: "Kapalı Otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Aralık 2024",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Ocak 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Mayıs 2025",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Haziran 2025",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Eylül 2025",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Kasım 2025",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "active",
        completedDate: "Şubat 2026",
      },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-3",
    name: "Valorya 3",
    location: "İzmir",
    year: "2023",
    type: "Apartman",
    description: "Premium kalite standartlarinda tasarlanmis villa kompleksi.",
    image: "/projects/valorya3/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Balatçık Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya3/map.webp",
      highlights: [
        "Üniversiteye yürüme mesafesi",
        "Depreme karşı güçlü yapı",
        "3 katlı, toplam 29 daire",
      ],
      unitTypes: [
        { type: "1+1", count: 22, grossArea: "50 m2", netArea: "45 m2" },
        { type: "2+1", count: 6, grossArea: "105 m2", netArea: "90 m2" },
        { type: "3+1", count: 1, grossArea: "110 m2", netArea: "95 m2" },
      ],
      totalUnits: 29,
      totalBlocks: 2,
      landscapeRatio: "%14",
      parking: "Kapalı otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Nisan 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Mayıs 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Haziran 2025",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Ağustos 2025",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Aralık 2025",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      { id: "landscape", name: "Peyzaj", status: "active" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-4",
    name: "Valorya 4",
    location: "Karşıyaka, İzmir",
    year: "2023",
    type: "Apartman",
    description:
      "Yesil alanlari ve sosyal donatilariyla modern yasam kompleksi.",
    image: "/projects/valorya4/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Postacılar Mahallesi",
      district: "Karşıyaka",
      city: "İzmir",
      locationImage: "/projects/valorya4/map.webp",
      highlights: [
        "Bayraklı'ye yakın yüksek talep gören konum",
        "Depreme karşı güçlü yapı",
        "4 katlı, toplam 16 daire",
      ],
      unitTypes: [
        { type: "1+1", count: 3, grossArea: "82 m2", netArea: "63 m2" },
        { type: "2+1", count: 3, grossArea: "112 m2", netArea: "87 m2" },
      ],
      totalUnits: 12,
      totalBlocks: 1,
      landscapeRatio: "%40",
      parking: "Kapali otopark + misafir park alani",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Şubat 2026",
      },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-5",
    name: "Valorya 5",
    location: "Çiğli, İzmir",
    year: "2022",
    type: "Villa",
    description: "Aile yasamina uygun, genis bahceli villa projesi.",
    image: "/projects/valorya5/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Balatçık Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya5/map.webp",
      highlights: [
        "Genis bahce ve acik hava yasam kurgusu",
        "Deprem yonetmeligine uygun tasiyici sistem",
        "Mahremiyet odakli villa yerlesimi",
      ],
      unitTypes: [
        { type: "5+2", count: 3, grossArea: "350 m2", netArea: "300 m2" },
      ],
      totalUnits: 16,
      totalBlocks: 1,
      landscapeRatio: "%15",
      parking: "Her villa icin ozel park alani",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      { id: "permit", name: "Ruhsat", status: "completed" },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-6",
    name: "Valorya 6",
    location: "Çiğli, İzmir",
    year: "2022",
    type: "Apartman",
    description: "Neli Muhendislik'in ilk villa projesi, zamansiz tasarim.",
    image: "/projects/valorya6/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya6/map.webp",
      highlights: [
        "Sadelik ve fonksiyonellik",
        "Butik olcekte guvenli komsuluk yasami",
      ],
      unitTypes: [
        { type: "2+1", count: 12, grossArea: "108 m2", netArea: "84 m2" },
        { type: "3+1", count: 8, grossArea: "136 m2", netArea: "106 m2" },
      ],
      totalUnits: 20,
      totalBlocks: 2,
      landscapeRatio: "%16",
      parking: "Acik otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Şubat 2026",
      },
      { id: "permit", name: "Ruhsat", status: "completed" },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-7",
    name: "Valorya 7",
    location: "Çiğli, İzmir",
    year: "2023",
    type: "Apartman",
    description:
      "Prestijli konumda, yuksek kaliteli malzemelerle insa edilmis apartman.",
    image: "/projects/valorya7/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya7/map.webp",
      highlights: [
        "Merkezi konumda ulasim avantajli yasam",
        "Yuksek tavanli daireler",
      ],
      unitTypes: [
        { type: "1+1", count: 16, grossArea: "72 m2", netArea: "56 m2" },
        { type: "2+1", count: 20, grossArea: "108 m2", netArea: "84 m2" },
        { type: "3+1", count: 8, grossArea: "142 m2", netArea: "112 m2" },
      ],
      totalUnits: 44,
      totalBlocks: 1,
      landscapeRatio: "%28",
      parking: "Kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Mart 2026",
      },
      { id: "permit", name: "Ruhsat", status: "completed" },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "serenita-garden",
    name: "Serenita Garden",
    location: "Narlıdere, İzmir",
    year: "2022",
    type: "Villa",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitagarden/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Sahilevleri Mahallesi",
      district: "Narlıdere",
      city: "İzmir",
      locationImage: "/projects/serenitagarden/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslari",
        "Aile odakli plan tipleri",
      ],
      unitTypes: [
        { type: "2+1", count: 30, grossArea: "110 m2", netArea: "85 m2" },
        { type: "3+1", count: 24, grossArea: "144 m2", netArea: "114 m2" },
      ],
      totalUnits: 54,
      totalBlocks: 3,
      landscapeRatio: "%16",
      parking: "Acik + kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2021",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Nisan 2021",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "active",
        completedDate: "Haziran 2021",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "pending",
        completedDate: "Kasım 2021",
      },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "serenita-prestige",
    name: "Serenita Prestige",
    location: "Sasalı, İzmir",
    year: "2026",
    type: "Villa",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitaprestige/cover.webp",
    status: "İnşaat",
    details: {
      neighborhood: "Sasalı",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/serenitaprestige/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslari",
        "Aile odakli plan tipleri",
      ],
      unitTypes: [
        { type: "2+1", count: 30, grossArea: "110 m2", netArea: "85 m2" },
        { type: "3+1", count: 24, grossArea: "144 m2", netArea: "114 m2" },
      ],
      totalUnits: 54,
      totalBlocks: 3,
      landscapeRatio: "%46",
      parking: "Acik + kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Mart 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Haziran 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "active",
        completedDate: "Eylül 2025",
      },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "serenita-park",
    name: "Serenita Park",
    location: "Menemen, İzmir",
    year: "2026",
    type: "Villa, Apartman",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitapark/cover.webp",
    status: "İnşaat",
    details: {
      neighborhood: "Villakent Mahallesi",
      district: "Menemen",
      city: "İzmir",
      locationImage: "/projects/serenitapark/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslari",
        "Aile odakli plan tipleri",
      ],
      unitTypes: [
        { type: "2+1", count: 30, grossArea: "110 m2", netArea: "85 m2" },
        { type: "3+1", count: 24, grossArea: "144 m2", netArea: "114 m2" },
      ],
      totalUnits: 56,
      totalBlocks: 3,
      landscapeRatio: "%16",
      parking: "Acik + kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Şubat 2026",
      },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
];

const MAP_PINS_DATA = [
  {
    name: "Serenita Prestige",
    lat: 38.491056,
    lng: 26.948444,
    neighborhood: "Sasalı",
    district: "Çiğli",
    image: "/projects/serenitaprestige/cover.webp",
    href: "/projeler",
  },
  {
    name: "Serenita Garden",
    lat: 38.4057116,
    lng: 26.9981004,
    neighborhood: "Sahilevleri Mahallesi",
    district: "Narlıdere",
    image: "/projects/serenitagarden/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 1",
    lat: 38.508889,
    lng: 27.039833,
    neighborhood: "Balatçık Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya1/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 2",
    lat: 38.4992059,
    lng: 27.0572575,
    neighborhood: "KucukÇiğli Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya2/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 3",
    lat: 38.517611,
    lng: 27.04,
    neighborhood: "Balatçık Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya3/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 4",
    lat: 38.482399,
    lng: 27.118534,
    neighborhood: "Postacılar Mahallesi",
    district: "Karsiyaka",
    image: "/projects/valorya4/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 5",
    lat: 38.508107,
    lng: 27.049398,
    neighborhood: "Esentepe Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya5/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 6",
    lat: 38.498116,
    lng: 27.057128,
    neighborhood: "KucukÇiğli Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya6/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 7",
    lat: 38.497562,
    lng: 27.057069,
    neighborhood: "KucukÇiğli Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya7/cover.webp",
    href: "/projeler",
  },
];

const MILESTONE_DATA = [
  {
    year: "1989",
    title: "İran'da Tara Engineering Adıyla Kurulduk",
    description:
      'İran\'da "Ayrıcalıklı hissetmek herkesin hakkı" prensibiyle yola çıktık.',
    sortOrder: 0,
  },
  {
    year: "2021",
    title: "Neli Mühendislik Adıyla İzmir'de Faaliyetlere Başladık",
    description:
      "Onlarca restorasyon projesiyle kusursuz hizmet sunmaya başladık.",
    sortOrder: 1,
  },
  {
    year: "2022",
    title: "İlk İnşaat Projemiz",
    description: "Valorya 1 projesi için çalışmalar başladı.",
    sortOrder: 2,
  },
  {
    year: "2023",
    title: "Serenita Projelerine Başladık",
    description: "Serenita Prestige ve Serenita Garden projelerine başladık.",
    sortOrder: 3,
  },
  {
    year: "2024",
    title: "Yeni Projelerle Büyümeye Devam Ediyoruz",
    description: "Valorya 2 - 3 - 4 projelerinin temellerini attık.",
    sortOrder: 4,
  },
  {
    year: "2025",
    title: "Ardı Ardına Temelleri Atılan Projeler",
    description: "Valorya 5 - 6 - 7 ve Serenita Park projelerine başladık.",
    sortOrder: 5,
  },
];

const SETTINGS_DATA: Record<string, string> = {
  company_name: "Neli Mühendislik",
  company_logo: "/site-logo.webp",
  address: "Dedebaşı Mah. 6131 Sok. No:39/A\nKarşıyaka, İzmir",
  phone: "+90 554 704 90 74",
  phone2: "+90 232 441 44 42",
  email: "info@neli.tr",
  working_hours: "Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 14:00",
  social_instagram: "https://www.instagram.com/neli_muhendislik/",
  social_linkedin: "https://www.linkedin.com/company/neli-m%C3%BChendislik",
  social_twitter: "https://x.com/nelimuhendislik",
  social_facebook: "https://www.facebook.com/profile.php?id=100089633642677",
  seo_default_title: "Neli Mühendislik",
  seo_default_description:
    "Neli Mühendislik, İzmir'de modern ve kaliteli konut projeleri sunan güvenilir bir inşaat firmasıdır.",
  seo_default_keywords:
    "neli mühendislik, izmir inşaat, konut projeleri, valorya, serenita",
  seo_og_image: "https://neli.tr/og-image.jpg",
  maps_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1562.7!2d27.1057313!3d38.4680346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9dd2adbb0b9%3A0x6988352d26352bc!2zRGVkZWJhxZ_EsSwgNjEzMS4gU2suIE5vOjM5L0EsIDM1NTYwIEthcsWfxLF5YWthL8Swem1pcg!5e0!3m2!1str!2str!4v1707000000000!5m2!1str!2str",
  blog_categories: JSON.stringify([
    "Tümü",
    "İnşaat",
    "Mimari",
    "Projeler",
    "Restorasyon",
    "Dekorasyon",
  ]),
};

async function seed() {
  console.log("Seeding database...");
  let seeded = false;

  if (!db.select().from(blogPosts).get()) {
    for (const post of BLOG_DATA) {
      db.insert(blogPosts).values(post).run();
    }
    console.log(`Seeded ${BLOG_DATA.length} blog posts`);
    seeded = true;
  }

  {
    const now = new Date().toISOString();
    let inserted = 0;
    let updated = 0;
    for (const project of PROJECT_DATA) {
      const row = db
        .select()
        .from(projects)
        .where(eq(projects.slug, project.slug))
        .get();
      const payload = {
        name: project.name,
        location: project.location,
        year: project.year,
        type: project.type,
        description: project.description,
        image: project.image,
        status: project.status,
        detailsJson: JSON.stringify(project.details),
        phasesJson: JSON.stringify(project.phases),
        updatedAt: now,
      };
      if (row) {
        db.update(projects).set(payload).where(eq(projects.slug, project.slug)).run();
        updated++;
      } else {
        db.insert(projects).values({ slug: project.slug, ...payload }).run();
        inserted++;
      }
    }
    if (inserted || updated) {
      console.log(
        `Projects synced from seed: ${inserted} inserted, ${updated} updated`,
      );
      seeded = true;
    }
  }

  if (!db.select().from(mapPins).get()) {
    for (const pin of MAP_PINS_DATA) {
      db.insert(mapPins).values(pin).run();
    }
    console.log(`Seeded ${MAP_PINS_DATA.length} map pins`);
    seeded = true;
  }

  if (!db.select().from(siteSettings).get()) {
    for (const [key, value] of Object.entries(SETTINGS_DATA)) {
      db.insert(siteSettings).values({ key, value }).run();
    }
    console.log(`Seeded ${Object.keys(SETTINGS_DATA).length} settings`);
    seeded = true;
  }

  if (!db.select().from(milestones).get()) {
    for (const m of MILESTONE_DATA) {
      db.insert(milestones).values(m).run();
    }
    console.log(`Seeded ${MILESTONE_DATA.length} milestones`);
    seeded = true;
  }

  console.log(
    seeded ? "Seed complete!" : "Database already seeded, nothing to do.",
  );
}

seed().catch(console.error);
