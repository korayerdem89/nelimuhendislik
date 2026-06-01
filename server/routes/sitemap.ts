import { Hono } from "hono";
import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { selectPublicBlogPostsForSitemap } from "../lib/public-blog.js";

const SITE_URL = "https://neli.tr";

/** XML metin / href içinde &, <, >, " ve ' karakterlerini güvenli hale getirir */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const segments = path.split("/").filter(Boolean);
  return `${SITE_URL}/${segments.map((s) => encodeURIComponent(s)).join("/")}`;
}

/** Sitemap lastmod için en geç tarih (YYYY-MM-DD); blogda güncelleme veya yayın tarihi */
function latestModYmd(
  ...isoStrings: (string | null | undefined)[]
): string {
  const times = isoStrings
    .map((s) => (s ? new Date(s).getTime() : NaN))
    .filter((t) => !Number.isNaN(t));
  if (times.length === 0) {
    return new Date().toISOString().split("T")[0];
  }
  return new Date(Math.max(...times)).toISOString().split("T")[0];
}

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/projeler", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/showcase", priority: "0.85", changefreq: "weekly" },
  { path: "/kurumsal", priority: "0.7", changefreq: "monthly" },
  { path: "/iletisim", priority: "0.7", changefreq: "monthly" },
  { path: "/randevu", priority: "0.7", changefreq: "monthly" },
  { path: "/kariyer", priority: "0.5", changefreq: "monthly" },
  { path: "/finans", priority: "0.5", changefreq: "monthly" },
];

/**
 * Seed’deki BLOG_DATA ile birebir senkron statik liste.
 * DB sorgusu boş gelse veya bir slug eksik kalsa bile bu URL’ler
 * sitemap’te garanti altındadır (SEO için kritik).
 * DB’den dönen kayıt varsa onun updatedAt’i lastmod olarak tercih edilir.
 */
const BLOG_SLUGS: ReadonlyArray<{ slug: string; publishedAt: string }> = [
  {
    slug: "rahnamaye-kharid-melk-turkiye-mohandesi-neli",
    publishedAt: "2026-03-27",
  },
  {
    slug: "al-istithmar-al-aqari-al-amn-fi-turkiya-neili-izmir",
    publishedAt: "2026-03-31",
  },
  {
    slug: "izmir-konut-projeleri-guvenli-yapilar-neli-muhendislik",
    publishedAt: "2026-04-01",
  },
  {
    slug: "cigli-gayrimenkul-yatirimi-lokasyon-muhendislik-avantajlari",
    publishedAt: "2026-05-06",
  },
  {
    slug: "izmir-ciglide-sifir-daireler-kucuk-cigli-balatcik",
    publishedAt: "2026-05-07",
  },
  {
    slug: "izmirde-depreme-dayanikli-satilik-daireler",
    publishedAt: "2026-05-07",
  },
  {
    slug: "izmirde-1-1-2-1-3-1-yeni-konut-projeleri",
    publishedAt: "2026-05-07",
  },
  {
    slug: "izmirde-katilim-bankasi-finansmanina-uygun-sifir-daireler",
    publishedAt: "2026-05-20",
  },
  {
    slug: "lazer-terazi-ile-kusursuz-mimari-ve-muhendislik-iscligi",
    publishedAt: "2026-05-20",
  },
  {
    slug: "binalarda-yalitim-tipleri-ve-a-enerji-sinifi-sertifikali-konutlar",
    publishedAt: "2026-05-20",
  },
  {
    slug: "yatirim-amacli-ev-secerken-nelere-dikkat-edilir",
    publishedAt: "2026-05-20",
  },
  {
    slug: "konut-projelerinde-peyzaj-mimarisi-ve-yesil-alanlarin-onemi",
    publishedAt: "2026-05-20",
  },
  {
    slug: "evin-degerini-artiran-ic-mimari-ve-dekorasyon-trendleri",
    publishedAt: "2026-05-20",
  },
  {
    slug: "beton-cesitleri-ve-yuksek-dayanimli-betonun-onemi",
    publishedAt: "2026-05-20",
  },
  {
    slug: "yeni-konut-projesinden-daire-almanin-avantajlari",
    publishedAt: "2026-06-01",
  },
  {
    slug: "yeni-binalarda-cati-izolasyonu-nasil-olmali",
    publishedAt: "2026-06-01",
  },
  {
    slug: "yeni-bina-alirken-yapi-denetim-raporu-neden-onemlidir",
    publishedAt: "2026-06-01",
  },
  {
    slug: "konut-projelerinde-kullanilan-malzeme-kalitesi-nasil-anlasilir",
    publishedAt: "2026-06-01",
  },
  {
    slug: "temel-yalitimi-yapilmayan-binalarda-ne-olur",
    publishedAt: "2026-06-01",
  },
];

const sitemapRoutes = new Hono();

sitemapRoutes.get("/sitemap.xml", (c) => {
  const allProjects = db
    .select({ slug: projects.slug, updatedAt: projects.updatedAt })
    .from(projects)
    .all();
  /** API/blog listesiyle aynı filtre: yayımda, kapak dolu, hariç slug yok */
  const publishedPosts = selectPublicBlogPostsForSitemap();

  /**
   * DB kayıtlarını slug -> updatedAt/publishedAt eşlemesine indir.
   * Sonra statik BLOG_SLUGS üzerinden yürürken DB değerleri varsa onları kullan.
   */
  const dbPostMap = new Map<
    string,
    { updatedAt: string | null; publishedAt: string | null }
  >();
  for (const post of publishedPosts) {
    dbPostMap.set(post.slug, {
      updatedAt: post.updatedAt ?? null,
      publishedAt: post.publishedAt ?? null,
    });
  }

  /** Statik liste + DB’den gelen ekstra sluglar (DB’de var ama statik listede yoksa) */
  const mergedBlogPosts: Array<{
    slug: string;
    updatedAt: string | null;
    publishedAt: string | null;
  }> = BLOG_SLUGS.map((entry) => {
    const fromDb = dbPostMap.get(entry.slug);
    return {
      slug: entry.slug,
      updatedAt: fromDb?.updatedAt ?? null,
      publishedAt: fromDb?.publishedAt ?? entry.publishedAt,
    };
  });
  const staticSlugSet = new Set(BLOG_SLUGS.map((b) => b.slug));
  for (const post of publishedPosts) {
    if (!staticSlugSet.has(post.slug)) {
      mergedBlogPosts.push({
        slug: post.slug,
        updatedAt: post.updatedAt ?? null,
        publishedAt: post.publishedAt ?? null,
      });
    }
  }

  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of staticPages) {
    const loc = escapeXml(absoluteUrl(page.path));
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const project of allProjects) {
    const lastmod = project.updatedAt?.split("T")[0] || today;
    const loc = escapeXml(
      absoluteUrl(`projeler/${project.slug}`),
    );
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const post of mergedBlogPosts) {
    const lastmod = latestModYmd(post.updatedAt, post.publishedAt);
    const loc = escapeXml(absoluteUrl(`blog/${post.slug}`));
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.75</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return c.text(xml, 200, {
    "Content-Type": "application/xml; charset=utf-8",
  });
});

sitemapRoutes.get("/robots.txt", (c) => {
  const robots = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /panel/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  return c.text(robots, 200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
});

export default sitemapRoutes;
