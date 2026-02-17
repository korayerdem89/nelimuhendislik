export type ProjectStatus = "İnşaat" | "Satışta" | "Tamamlandı";

export type PhaseStatus = "completed" | "active" | "pending";

export interface ProjectPhase {
  id: string;
  name: string;
  status: PhaseStatus;
  completedDate?: string;
}

export interface ProjectUnitType {
  type: string;
  count: number;
  grossArea: string;
  netArea: string;
}

export interface ProjectDetails {
  neighborhood: string;
  district: string;
  city: string;
  locationImage: string;
  highlights: string[];
  unitTypes: ProjectUnitType[];
  totalUnits: number;
  totalBlocks: number;
  landscapeRatio: string;
  parking: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  year: string;
  type: string;
  description: string;
  image: string;
  status: ProjectStatus;
  details: ProjectDetails;
  phases: ProjectPhase[];
}

// Default construction phases for all projects
export const defaultPhases: Omit<ProjectPhase, "status" | "completedDate">[] = [
  { id: "design", name: "Proje Tasarımı" },
  { id: "permit", name: "Ruhsat" },
  { id: "foundation", name: "Temel" },
  { id: "structure", name: "Kaba İnşaat" },
  { id: "finishing", name: "İnce İşler" },
  { id: "mep", name: "Mekanik & Elektrik" },
  { id: "landscape", name: "Peyzaj" },
  { id: "handover", name: "Teslim" },
];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  Satışta: "Satışta",
  Tamamlandı: "Tamamlandı",
  İnşaat: "İnşaat",
};

export const projects: Project[] = [
  {
    id: 1,
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
        "Üniversiteye, Sanayi Bölgesine yürüyüş mesafesi, yatırım amaçlı en ideal konum",
        "Zemin güçlendirmesiyle depreme karşı oldukça güçlü yapı",
        "Enerji verimliliği yuksek yapı kabuğu",
        "Akıllı ev altyapisina uyumlu bina",
        "1. kalite malzemelerle inşa edilmiş yapı",
        "3 katlı, toplam 6 daire içeren apartman projesi",
      ],
      unitTypes: [
        { type: "1+1", count: 6, grossArea: "50", netArea: "43 m2" },
        {
          type: "1+1 Daire",
          count: 6,
          grossArea: "50 m2",
          netArea: "43 m2",
        },
      ],
      totalUnits: 6,
      totalBlocks: 1,
      landscapeRatio: "12%",
      parking: "Mevcut Değil",
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
    id: 2,
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
        "Üniversiteye, Sanayi Bölgesine yakın, yatırım amaçlı ideal konum",
        "Depreme karşı oldukça güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "Akıllı ev altyapısına uyumlu bina",
        "1. kalite malzemelerle inşa edilmiş yapı",
        "4 katlı, toplam 16 daire içeren apartman projesi",
      ],
      unitTypes: [
        { type: "1+1", count: 1, grossArea: "152 m2", netArea: "122 m2" },
        { type: "2+1", count: 11, grossArea: "176 m2", netArea: "143 m2" },
        { type: "3+1", count: 4, grossArea: "214 m2", netArea: "176 m2" },
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
      {
        id: "handover",
        name: "Teslim",
        status: "pending",
        completedDate: "",
      },
    ],
  },
  {
    id: 3,
    slug: "valorya-3",
    name: "Valorya 3",
    location: "İzmir",
    year: "2023",
    type: "Apartman",
    description: "Premium kalite standartlarinda tasarlanmis villa kompleksi.",
    image: "/projects/valorya3/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Balatcik Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya3/map.webp",
      highlights: [
        "Üniversiteye, Sanayi Bölgesine yürüme mesafesi, yatırım amaçlı en ideal konum",
        "Depreme karşı oldukça güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "Akıllı ev altyapisina uyumlu bina",
        "1. kalite malzemelerle inşa edilmiş yapı",
        "3 katlı, toplam 29 daire içeren apartman projesi",
      ],
      unitTypes: [
        { type: "1+1", count: 22, grossArea: "50 m2", netArea: "45 m2" },
        { type: "2+1", count: 6, grossArea: "90 m2", netArea: "80 m2" },
        { type: "3+1", count: 1, grossArea: "100 m2", netArea: "92 m2" },
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
      {
        id: "landscape",
        name: "Peyzaj",
        status: "pending",
        completedDate: "",
      },
      {
        id: "handover",
        name: "Teslim",
        status: "pending",
        completedDate: "",
      },
    ],
  },
  {
    id: 4,
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
        "Bayraklı'de Karşıyaka'ya yakın, yüksek talep gören konum",
        "Depreme karşı oldukça güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "Akıllı ev altyapısına uyumlu bina",
        "1. kalite malzemelerle inşa edilmiş yapı",
        "4 katlı, toplam 16 daire içeren apartman projesi",
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
      {
        id: "foundation",
        name: "Temel",
        status: "pending",
        completedDate: "",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "pending",
        completedDate: "",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "pending",
        completedDate: "",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "pending",
        completedDate: "",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "pending",
        completedDate: "",
      },
      {
        id: "handover",
        name: "Teslim",
        status: "pending",
        completedDate: "",
      },
    ],
  },
  {
    id: 5,
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
        "Deprem yonetmeligine uygun guclu tasiyici sistem",
        "Mahremiyet odakli villa yerlesimi",
        "Fonksiyonel mutfak ve yasam hacmi organizasyonu",
      ],
      unitTypes: [
        { type: "3+1", count: 10, grossArea: "160 m2", netArea: "128 m2" },
        { type: "4+1", count: 6, grossArea: "196 m2", netArea: "158 m2" },
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
      {
        id: "permit",
        name: "Ruhsat",
        status: "pending",
        completedDate: "",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "pending",
        completedDate: "",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "pending",
        completedDate: "",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "pending",
        completedDate: "",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "pending",
        completedDate: "",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "pending",
        completedDate: "",
      },
      {
        id: "handover",
        name: "Teslim",
        status: "pending",
        completedDate: "",
      },
    ],
  },
  {
    id: 6,
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
        "Sadelik ve fonksiyonelligi birlestiren cephe dili",
        "Butik olcekte guvenli komsuluk yasami",
        "Uzun omurlu malzeme secimi",
        "Her dairede gun isigi ve havalandirma onceligi",
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
        completedDate: "Şubat 2021",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Mayıs 2021",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Temmuz 2021",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Aralık 2021",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Nisan 2022",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Haziran 2022",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "completed",
        completedDate: "Ağustos 2022",
      },
      {
        id: "handover",
        name: "Teslim",
        status: "completed",
        completedDate: "Eylül 2022",
      },
    ],
  },
  {
    id: 7,
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
        "Nitelikli cephe ve ortak alan detaylari",
        "Yuksek tavanli dairelerde ferah hacimler",
        "Akustik konforu guclendiren duvar sistemleri",
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
        completedDate: "Mart 2022",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Haziran 2022",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Ağustos 2022",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Şubat 2023",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Haziran 2023",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Ağustos 2023",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "completed",
        completedDate: "Ekim 2023",
      },
      {
        id: "handover",
        name: "Teslim",
        status: "completed",
        completedDate: "Kasım 2023",
      },
    ],
  },
  {
    id: 8,
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
        "Ortak bahce ve yuruyus akslariyla guclu site yasami",
        "Aile odakli plan tipleri ve fonksiyonel depolama",
        "Sosyal alanlara yakin konum avantaji",
        "Yonetilebilir isletme giderleri icin verimli altyapi",
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
        status: "completed",
        completedDate: "Haziran 2021",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Kasım 2021",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Mart 2022",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Mayıs 2022",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "completed",
        completedDate: "Temmuz 2022",
      },
      {
        id: "handover",
        name: "Teslim",
        status: "completed",
        completedDate: "Ağustos 2022",
      },
    ],
  },
  {
    id: 9,
    slug: "serenita-prestige",
    name: "Serenita Prestige",
    location: "Narlıdere, İzmir",
    year: "2026",
    type: "Villa",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitaprestige/cover.webp",
    status: "İnşaat",
    details: {
      neighborhood: "Sahilevleri Mahallesi",
      district: "Narlıdere",
      city: "İzmir",
      locationImage: "/projects/serenitaprestige/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslariyla guclu site yasami",
        "Aile odakli plan tipleri ve fonksiyonel depolama",
        "Sosyal alanlara yakin konum avantaji",
        "Yonetilebilir isletme giderleri icin verimli altyapi",
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
        status: "completed",
        completedDate: "Eylül 2025",
      },
      { id: "structure", name: "Kaba İnşaat", status: "active" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    id: 10,
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
        "Ortak bahce ve yuruyus akslariyla guclu site yasami",
        "Aile odakli plan tipleri ve fonksiyonel depolama",
        "Sosyal alanlara yakin konum avantaji",
        "Yonetilebilir isletme giderleri icin verimli altyapi",
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
        completedDate: "Ocak 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Nisan 2025",
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

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
