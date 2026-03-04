import { Hono } from "hono";
import { eq, asc } from "drizzle-orm";
import { db } from "../db/index.js";
import { milestones } from "../db/schema.js";
import { logActivity } from "../lib/log-activity.js";

const milestonesRoutes = new Hono();

milestonesRoutes.get("/", (c) => {
  const rows = db
    .select()
    .from(milestones)
    .orderBy(asc(milestones.sortOrder), asc(milestones.id))
    .all();
  return c.json(rows);
});

milestonesRoutes.post("/", async (c) => {
  const body = (await c.req.json()) as {
    year: string;
    title: string;
    description?: string;
    sortOrder?: number;
  };

  if (!body.year?.trim() || !body.title?.trim()) {
    return c.json({ error: "year ve title zorunludur." }, 400);
  }

  const maxOrder = db
    .select({ sortOrder: milestones.sortOrder })
    .from(milestones)
    .orderBy(asc(milestones.sortOrder))
    .all();
  const nextOrder =
    maxOrder.length > 0
      ? Math.max(...maxOrder.map((r) => r.sortOrder)) + 1
      : 0;

  const row = db
    .insert(milestones)
    .values({
      year: body.year.trim(),
      title: body.title.trim(),
      description: body.description?.trim() ?? "",
      sortOrder: body.sortOrder ?? nextOrder,
    })
    .returning()
    .get();

  logActivity("create", "milestone", row.title, "admin", row.id);
  return c.json(row, 201);
});

milestonesRoutes.post("/reorder", async (c) => {
  const { ids } = (await c.req.json()) as { ids: number[] };
  if (!Array.isArray(ids)) return c.json({ error: "ids array required" }, 400);
  for (let i = 0; i < ids.length; i++) {
    db.update(milestones)
      .set({ sortOrder: i, updatedAt: new Date().toISOString() })
      .where(eq(milestones.id, ids[i]))
      .run();
  }
  return c.json({ success: true });
});

milestonesRoutes.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = (await c.req.json()) as {
    year?: string;
    title?: string;
    description?: string;
    sortOrder?: number;
  };

  const row = db
    .update(milestones)
    .set({
      ...(body.year !== undefined && { year: body.year.trim() }),
      ...(body.title !== undefined && { title: body.title.trim() }),
      ...(body.description !== undefined && {
        description: body.description.trim(),
      }),
      ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(milestones.id, id))
    .returning()
    .get();

  if (!row) return c.json({ error: "Not found" }, 404);
  logActivity("update", "milestone", row.title, "admin", row.id);
  return c.json(row);
});

milestonesRoutes.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const row = db.select().from(milestones).where(eq(milestones.id, id)).get();
  if (!row) return c.json({ error: "Not found" }, 404);
  db.delete(milestones).where(eq(milestones.id, id)).run();
  logActivity("delete", "milestone", row.title, "admin", id);
  return c.json({ success: true });
});

export default milestonesRoutes;
