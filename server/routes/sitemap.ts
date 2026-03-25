import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogPosts, projects } from "../db/schema.js";

const SITE_URL = "https://neli.tr";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/projeler", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
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
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const project of allProjects) {
    const lastmod = project.updatedAt?.split("T")[0] || today;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/projeler/${project.slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const post of publishedPosts) {
    const lastmod = post.updatedAt?.split("T")[0] || today;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return c.text(xml, 200, { "Content-Type": "application/xml" });
});

sitemapRoutes.get("/robots.txt", (c) => {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return c.text(robots, 200, { "Content-Type": "text/plain" });
});

export default sitemapRoutes;
