import { Hono } from "hono";
import { desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { activityLog } from "../db/schema.js";

const activityRoutes = new Hono();

activityRoutes.get("/", (c) => {
  const limit = Number(c.req.query("limit")) || 50;
  const entries = db
    .select()
    .from(activityLog)
    .orderBy(desc(activityLog.createdAt))
    .limit(limit)
    .all();
  return c.json(entries);
});

export default activityRoutes;
