import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogPosts, projects, mapPins, siteSettings } from "../db/schema.js";

const publicRoutes = new Hono();

publicRoutes.get("/blog", (c) => {
  const posts = db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .all();
  return c.json(
    posts.map((p) => ({ ...p, tags: JSON.parse(p.tags) })),
  );
});

publicRoutes.get("/blog/:slug", (c) => {
  const slug = c.req.param("slug");
  const post = db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .get();
  if (!post || post.status !== "published") {
    return c.json({ error: "Not found" }, 404);
  }
  return c.json({ ...post, tags: JSON.parse(post.tags) });
});

publicRoutes.get("/projects", (c) => {
  const all = db.select().from(projects).orderBy(desc(projects.id)).all();
  return c.json(
    all.map((p) => ({
      ...p,
      details: JSON.parse(p.detailsJson),
      phases: JSON.parse(p.phasesJson),
    })),
  );
});

publicRoutes.get("/projects/:slug", (c) => {
  const slug = c.req.param("slug");
  const p = db.select().from(projects).where(eq(projects.slug, slug)).get();
  if (!p) return c.json({ error: "Not found" }, 404);
  return c.json({
    ...p,
    details: JSON.parse(p.detailsJson),
    phases: JSON.parse(p.phasesJson),
  });
});

publicRoutes.get("/map-pins", (c) => {
  const pins = db.select().from(mapPins).all();
  return c.json(pins);
});

publicRoutes.get("/settings", (c) => {
  const rows = db.select().from(siteSettings).all();
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return c.json(settings);
});

export default publicRoutes;
