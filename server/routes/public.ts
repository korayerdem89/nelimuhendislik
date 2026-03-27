import { Hono } from "hono";
import { eq, desc, asc, inArray, and, ne } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogPosts, projects, mapPins, siteSettings, milestones } from "../db/schema.js";

const publicRoutes = new Hono();

const HOME_FEATURED_KEY = "home_featured_project_ids";

function mapProjectRow(p: (typeof projects.$inferSelect)) {
  return {
    ...p,
    details: JSON.parse(p.detailsJson),
    phases: JSON.parse(p.phasesJson),
  };
}

publicRoutes.onError((err, c) => {
  console.error(`[public ${c.req.method} ${c.req.path}]`, err);
  return c.json({ error: "Server error", detail: err.message }, 500);
});

publicRoutes.get("/blog", (c) => {
  const posts = db
    .select()
    .from(blogPosts)
    .where(
      and(eq(blogPosts.status, "published"), ne(blogPosts.coverImage, "")),
    )
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
  if (
    !post ||
    post.status !== "published" ||
    !post.coverImage?.trim()
  ) {
    return c.json({ error: "Not found" }, 404);
  }
  return c.json({ ...post, tags: JSON.parse(post.tags) });
});

publicRoutes.get("/projects", (c) => {
  const all = db.select().from(projects).orderBy(desc(projects.id)).all();
  return c.json(all.map(mapProjectRow));
});

function getHomeFeaturedProjectsPayload() {
  const row = db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, HOME_FEATURED_KEY))
    .get();
  let ids: number[] = [];
  if (row?.value) {
    try {
      const parsed = JSON.parse(row.value) as unknown;
      if (Array.isArray(parsed)) {
        ids = parsed
          .map((x) => Number(x))
          .filter((n) => Number.isInteger(n) && n > 0)
          .slice(0, 3);
      }
    } catch {
      ids = [];
    }
  }

  const all = db.select().from(projects).orderBy(desc(projects.id)).all();
  if (ids.length === 0) {
    return all.slice(0, 3).map(mapProjectRow);
  }

  const rows = db
    .select()
    .from(projects)
    .where(inArray(projects.id, ids))
    .all();
  const byId = new Map(rows.map((p) => [p.id, p]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean) as typeof rows;
  if (ordered.length === 0) {
    return all.slice(0, 3).map(mapProjectRow);
  }
  return ordered.map(mapProjectRow);
}

function applyNoStore(c: { header: (k: string, v: string) => void }) {
  c.header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  c.header("Pragma", "no-cache");
}

/** Ana sayfa vitrini — `/projects/:slug` ile çakışmayan adres (önbellek kapalı). */
publicRoutes.get("/home-featured-projects", (c) => {
  applyNoStore(c);
  return c.json(getHomeFeaturedProjectsPayload());
});

/** Eski istemciler için aynı yanıt. */
publicRoutes.get("/projects/home-featured", (c) => {
  applyNoStore(c);
  return c.json(getHomeFeaturedProjectsPayload());
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

publicRoutes.get("/milestones", (c) => {
  const rows = db
    .select()
    .from(milestones)
    .orderBy(asc(milestones.sortOrder), asc(milestones.id))
    .all();
  return c.json(rows);
});

export default publicRoutes;
