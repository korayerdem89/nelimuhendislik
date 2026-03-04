import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { mapPins } from "../db/schema.js";

const mapPinRoutes = new Hono();

mapPinRoutes.get("/", (c) => {
  const pins = db.select().from(mapPins).all();
  return c.json(pins);
});

mapPinRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const result = db
    .insert(mapPins)
    .values({
      projectId: body.projectId || null,
      name: body.name,
      lat: body.lat,
      lng: body.lng,
      neighborhood: body.neighborhood || "",
      district: body.district || "",
      image: body.image || "",
      href: body.href || "/projeler",
    })
    .returning()
    .get();
  return c.json(result, 201);
});

mapPinRoutes.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const result = db
    .update(mapPins)
    .set({
      ...(body.projectId !== undefined && { projectId: body.projectId }),
      ...(body.name !== undefined && { name: body.name }),
      ...(body.lat !== undefined && { lat: body.lat }),
      ...(body.lng !== undefined && { lng: body.lng }),
      ...(body.neighborhood !== undefined && {
        neighborhood: body.neighborhood,
      }),
      ...(body.district !== undefined && { district: body.district }),
      ...(body.image !== undefined && { image: body.image }),
      ...(body.href !== undefined && { href: body.href }),
    })
    .where(eq(mapPins.id, id))
    .returning()
    .get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

mapPinRoutes.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  db.delete(mapPins).where(eq(mapPins.id, id)).run();
  return c.json({ success: true });
});

export default mapPinRoutes;
