import { Hono } from "hono";
import { eq, desc, inArray } from "drizzle-orm";
import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { logActivity } from "../lib/log-activity.js";

const projectRoutes = new Hono();

projectRoutes.get("/", (c) => {
  const all = db.select().from(projects).orderBy(desc(projects.id)).all();
  const mapped = all.map((p) => ({
    ...p,
    details: JSON.parse(p.detailsJson),
    phases: JSON.parse(p.phasesJson),
  }));
  return c.json(mapped);
});

projectRoutes.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const p = db.select().from(projects).where(eq(projects.id, id)).get();
  if (!p) return c.json({ error: "Not found" }, 404);
  return c.json({
    ...p,
    details: JSON.parse(p.detailsJson),
    phases: JSON.parse(p.phasesJson),
  });
});

projectRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const result = db
    .insert(projects)
    .values({
      slug: body.slug,
      name: body.name,
      location: body.location || "",
      year: body.year || "",
      type: body.type || "",
      description: body.description || "",
      image: body.image || "",
      status: body.status || "Satışta",
      detailsJson: JSON.stringify(body.details || {}),
      phasesJson: JSON.stringify(body.phases || []),
    })
    .returning()
    .get();
  logActivity("create", "project", result.name, "admin", result.id);
  return c.json(
    { ...result, details: JSON.parse(result.detailsJson), phases: JSON.parse(result.phasesJson) },
    201,
  );
});

projectRoutes.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const result = db
    .update(projects)
    .set({
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.name !== undefined && { name: body.name }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.year !== undefined && { year: body.year }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.image !== undefined && { image: body.image }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.details !== undefined && {
        detailsJson: JSON.stringify(body.details),
      }),
      ...(body.phases !== undefined && {
        phasesJson: JSON.stringify(body.phases),
      }),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(projects.id, id))
    .returning()
    .get();
  if (!result) return c.json({ error: "Not found" }, 404);
  logActivity("update", "project", result.name, "admin", result.id);
  return c.json({
    ...result,
    details: JSON.parse(result.detailsJson),
    phases: JSON.parse(result.phasesJson),
  });
});

projectRoutes.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const p = db.select().from(projects).where(eq(projects.id, id)).get();
  db.delete(projects).where(eq(projects.id, id)).run();
  if (p) logActivity("delete", "project", p.name, "admin", id);
  return c.json({ success: true });
});

projectRoutes.post("/bulk-delete", async (c) => {
  const { ids } = (await c.req.json()) as { ids: number[] };
  if (!ids?.length) return c.json({ error: "No ids provided" }, 400);
  const items = db.select().from(projects).where(inArray(projects.id, ids)).all();
  db.delete(projects).where(inArray(projects.id, ids)).run();
  logActivity("bulk_delete", "project", `${items.length} proje silindi`, "admin", undefined, JSON.stringify(ids));
  return c.json({ success: true, count: items.length });
});

projectRoutes.post("/bulk-status", async (c) => {
  const { ids, status } = (await c.req.json()) as { ids: number[]; status: string };
  if (!ids?.length || !status) return c.json({ error: "ids and status required" }, 400);
  db.update(projects)
    .set({ status, updatedAt: new Date().toISOString() })
    .where(inArray(projects.id, ids))
    .run();
  logActivity("bulk_update", "project", `${ids.length} proje → ${status}`, "admin", undefined, JSON.stringify({ ids, status }));
  return c.json({ success: true, count: ids.length });
});

export default projectRoutes;
