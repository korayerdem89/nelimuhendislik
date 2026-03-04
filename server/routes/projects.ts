import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { projects } from "../db/schema.js";

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
  return c.json({
    ...result,
    details: JSON.parse(result.detailsJson),
    phases: JSON.parse(result.phasesJson),
  });
});

projectRoutes.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  db.delete(projects).where(eq(projects.id, id)).run();
  return c.json({ success: true });
});

export default projectRoutes;
