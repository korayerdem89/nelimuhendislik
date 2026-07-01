import { api } from "@/lib/api";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  category: string;
  tags: string[];
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  featured: boolean;
  status: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

let _fetchPromise: Promise<BlogPost[]> | null = null;

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = api.get<BlogPost[]>("/api/public/blog").then((posts) => {
    _fetchPromise = null;
    return posts;
  });

  return _fetchPromise;
}

export function invalidateBlogCache() {
  _fetchPromise = null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await api.get<BlogPost>(`/api/public/blog/${slug}`);
  } catch {
    return null;
  }
}

export function formatDate(
  dateString: string,
  locale: string = "tr-TR",
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function blogDateLocaleForCategory(category: string): string {
  if (category === "فارسی") return "fa-IR";
  if (category === "العربية") return "ar-SA";
  return "tr-TR";
}

export function blogContentLang(category: string): string {
  if (category === "فارسی") return "fa";
  if (category === "العربية") return "ar";
  return "tr";
}

export function blogIsRtlCategory(category: string): boolean {
  return category === "فارسی" || category === "العربية";
}

export function blogTagsLabel(category: string): string {
  if (category === "فارسی") return "برچسب‌ها:";
  if (category === "العربية") return "الوسوم:";
  return "Etiketler:";
}

const BLOG_CATEGORY_SHORT_LABELS: Record<string, string> = {
  "Mühendislik Standartları": "Müh. Standartları",
  "Konut Satın Alma Rehberi": "Konut Rehberi",
  "Yapı Malzemeleri ve Teknolojileri": "Yapı Malzemeleri",
  "Mühendislik ve Mimari": "Müh. & Mimari",
  "İnşaat Teknolojileri ve İşçilik": "İnşaat Teknolojisi",
  "Mühendislik ve Yapı Güvenliği": "Yapı Güvenliği",
  "Rehber ve Yatırım": "Rehber & Yatırım",
  "Mimari ve Yaşam Tarzı": "Mimari & Yaşam",
  "Mühendislik ve Altyapı": "Müh. Altyapı",
  "İç Mimari ve Dekorasyon": "İç Mimari",
  "Mühendislik ve Yapı Teknolojileri": "Yapı Teknolojisi",
  "Gayrimenkul Rehberi": "Gayrimenkul",
};

export function blogCategoryLabel(category: string): string {
  if (category === "Tümü") return category;

  const mapped = BLOG_CATEGORY_SHORT_LABELS[category];
  if (mapped) return mapped;

  return category
    .replace(/^Mühendislik ve /, "Müh. ")
    .replace(/ Rehberi$/, "")
    .replace(/ ve Teknolojileri$/, "")
    .replace(/ ve İşçilik$/, "");
}
