import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { siteSettings } from "../db/schema.js";
import { logActivity } from "../lib/log-activity.js";

const settingsRoutes = new Hono();

settingsRoutes.get("/", (c) => {
  const rows = db.select().from(siteSettings).all();
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return c.json(settings);
});

settingsRoutes.put("/", async (c) => {
  const body = (await c.req.json()) as Record<string, string>;

  for (const [key, value] of Object.entries(body)) {
    const existing = db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .get();

    if (existing) {
      db.update(siteSettings)
        .set({ value, updatedAt: new Date().toISOString() })
        .where(eq(siteSettings.key, key))
        .run();
    } else {
      db.insert(siteSettings).values({ key, value }).run();
    }
  }

  const rows = db.select().from(siteSettings).all();
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  logActivity("settings_update", "settings", `${Object.keys(body).length} ayar güncellendi`, "admin");
  return c.json(settings);
});

export default settingsRoutes;
