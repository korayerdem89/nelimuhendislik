import { and, desc, eq, notInArray, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogPosts } from "../db/schema.js";

/** Eski örnek yazılar — Blog ve sitemap’te yok; seed ile DB’den de silinir. */
export const EXCLUDED_PUBLIC_BLOG_SLUGS = [
  "izmir-konut-projelerinde-dikkat-edilmesi-gerekenler",
  "modern-mimari-trendleri-2026",
  "valorya-projeleri-ile-yeni-bir-yasam",
  "restorasyon-projelerinde-dikkat-edilmesi-gerekenler",
  "evinizi-degerlendirecek-dekorasyon-onerileri",
  "serenita-prestige-ayricalikli-yasamin-adresi",
] as const;

/** Blog.tsx’in `fetchBlogPosts()` ile aynı kayıt kümesi (yayımda, kapak dolu, hariç slug yok). */
export function getPublicBlogListingCondition() {
  return and(
    eq(blogPosts.status, "published"),
    sql`trim(${blogPosts.coverImage}) != ''`,
    notInArray(blogPosts.slug, [...EXCLUDED_PUBLIC_BLOG_SLUGS]),
  );
}

export function listPublicBlogPosts() {
  return db
    .select()
    .from(blogPosts)
    .where(getPublicBlogListingCondition())
    .orderBy(desc(blogPosts.publishedAt))
    .all();
}

export function selectPublicBlogPostsForSitemap() {
  return db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(getPublicBlogListingCondition())
    .orderBy(desc(blogPosts.publishedAt))
    .all();
}

export function getPublicBlogDetailCondition(slug: string) {
  return and(eq(blogPosts.slug, slug), getPublicBlogListingCondition());
}
