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

let _cachedPosts: BlogPost[] | null = null;
let _fetchPromise: Promise<BlogPost[]> | null = null;

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (_cachedPosts) return _cachedPosts;
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = api.get<BlogPost[]>("/api/public/blog").then((posts) => {
    _cachedPosts = posts;
    _fetchPromise = null;
    return posts;
  });

  return _fetchPromise;
}

export function invalidateBlogCache() {
  _cachedPosts = null;
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
