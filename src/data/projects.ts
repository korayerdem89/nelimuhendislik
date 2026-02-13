export type ProjectStatus = "İnşaat" | "Satışta" | "Tamamlandı";

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
}

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
    year: "2024",
    type: "Apartman",
    description:
      "Kusursuz yalıtımlı, deprem güvenliği yüksek, modern apartman dairesi.",
    image: "/projects/valorya1/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/site-logo.png",
      highlights: [
        "Ferah cephe tasarimi ve gun isigi odakli planlama",
        "Aile yasamina uygun sosyal alan kurgusu",
        "Enerji verimliligi yuksek yapi kabugu",
        "Akilli ev altyapisina uyumlu teknik sistemler",
      ],
      unitTypes: [
        { type: "2+1", count: 18, grossArea: "118 m2", netArea: "92 m2" },
        { type: "3+1", count: 16, grossArea: "146 m2", netArea: "116 m2" },
        {
          type: "4+1 Dubleks",
          count: 8,
          grossArea: "188 m2",
          netArea: "154 m2",
        },
      ],
      totalUnits: 42,
      totalBlocks: 3,
      landscapeRatio: "%48",
      parking: "Kapalı otopark",
    },
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
      locationImage: "/site-logo.png",
      highlights: [
        "Dusuk katli ve butik yerlesim plani",
        "Bahce kullanimi oncelikli konut tipolojisi",
        "Sessiz sokak dokusuna uyumlu dis mimari",
        "Guvenlik ve kontrollu giris altyapisi",
      ],
      unitTypes: [
        { type: "3+1", count: 12, grossArea: "152 m2", netArea: "122 m2" },
        { type: "4+1", count: 10, grossArea: "176 m2", netArea: "143 m2" },
        { type: "5+1", count: 4, grossArea: "214 m2", netArea: "176 m2" },
      ],
      totalUnits: 26,
      totalBlocks: 2,
      landscapeRatio: "%52",
      parking: "Acik + kapali otopark",
    },
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
      locationImage: "/site-logo.png",
      highlights: [
        "Genis balkon ve teras odakli daire tasarimi",
        "Isi ve ses yalitiminda yuksek performans",
        "Ortaya alinmis yesil avlu kurgusu",
        "Marka urunlerle guclendirilmis teknik altyapi",
      ],
      unitTypes: [
        { type: "2+1", count: 20, grossArea: "112 m2", netArea: "88 m2" },
        { type: "3+1", count: 14, grossArea: "142 m2", netArea: "112 m2" },
      ],
      totalUnits: 34,
      totalBlocks: 2,
      landscapeRatio: "%44",
      parking: "Kapali otopark",
    },
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
      locationImage: "/site-logo.png",
      highlights: [
        "Cocuk oyun ve dinlenme alanlariyla guclu sosyal yasam",
        "Yaya dostu ic sokak ve meydan kurgusu",
        "Toplu ulasim ve ana arterlere hizli erisim",
        "Aydinlik ic mekanlar icin optimize planlama",
      ],
      unitTypes: [
        { type: "1+1", count: 24, grossArea: "82 m2", netArea: "63 m2" },
        { type: "2+1", count: 36, grossArea: "112 m2", netArea: "87 m2" },
        { type: "3+1", count: 18, grossArea: "146 m2", netArea: "114 m2" },
      ],
      totalUnits: 78,
      totalBlocks: 4,
      landscapeRatio: "%40",
      parking: "Kapali otopark + misafir park alani",
    },
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
      locationImage: "/site-logo.png",
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
      landscapeRatio: "%55",
      parking: "Her villa icin ozel park alani",
    },
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
      locationImage: "/site-logo.png",
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
      landscapeRatio: "%36",
      parking: "Acik otopark",
    },
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
      locationImage: "/site-logo.png",
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
      locationImage: "/site-logo.png",
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
  },
  {
    id: 9,
    slug: "serenita-prestige",
    name: "Serenita Prestige",
    location: "Narlıdere, İzmir",
    year: "2022",
    type: "Villa",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitaprestige/cover.webp",
    status: "İnşaat",
    details: {
      neighborhood: "Sahilevleri Mahallesi",
      district: "Narlıdere",
      city: "İzmir",
      locationImage: "/site-logo.png",
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
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
