import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogPosts, projects } from "../db/schema.js";

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

const sitemapRoutes = new Hono();

sitemapRoutes.get("/sitemap.xml", (c) => {
  const allProjects = db.select({ slug: projects.slug, updatedAt: projects.updatedAt }).from(projects).all();
  const publishedPosts = db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .all();

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

  for (const post of publishedPosts) {
    const lastmod = post.updatedAt?.split("T")[0] || today;
    const loc = escapeXml(absoluteUrl(`blog/${post.slug}`));
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
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
