import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { authMiddleware } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import projectRoutes from "./routes/projects.js";
import mapPinRoutes from "./routes/map-pins.js";
import settingsRoutes from "./routes/settings.js";
import mediaRoutes from "./routes/media.js";
import activityRoutes from "./routes/activity.js";
import milestonesRoutes from "./routes/milestones.js";
import publicRoutes from "./routes/public.js";
import odooRoutes from "./routes/odoo.js";
import sitemapRoutes from "./routes/sitemap.js";
import { PROJECT_ROOT } from "./paths.js";

const app = new Hono();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use("*", cors({
  origin: (origin) => {
    if (!origin) return allowedOrigins[0];
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  credentials: true,
}));

app.use("/uploads/*", serveStatic({ root: PROJECT_ROOT }));

app.route("/", sitemapRoutes);
app.route("/api/auth", authRoutes);
app.route("/api/public", publicRoutes);
app.route("/api/odoo", odooRoutes);

app.use("/api/admin/*", authMiddleware);
app.route("/api/admin/blog", blogRoutes);
app.route("/api/admin/projects", projectRoutes);
app.route("/api/admin/map-pins", mapPinRoutes);
app.route("/api/admin/settings", settingsRoutes);
app.route("/api/admin/media", mediaRoutes);
app.route("/api/admin/activity", activityRoutes);
app.route("/api/admin/milestones", milestonesRoutes);

app.get("/api/health", (c) => c.json({ status: "ok" }));

const PORT = Number(process.env.PORT) || 3001;

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
