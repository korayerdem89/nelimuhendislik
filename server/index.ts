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
import publicRoutes from "./routes/public.js";

const app = new Hono();

app.use("*", cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use("/uploads/*", serveStatic({ root: "." }));

app.route("/api/auth", authRoutes);
app.route("/api/public", publicRoutes);

app.use("/api/admin/*", authMiddleware);
app.route("/api/admin/blog", blogRoutes);
app.route("/api/admin/projects", projectRoutes);
app.route("/api/admin/map-pins", mapPinRoutes);
app.route("/api/admin/settings", settingsRoutes);
app.route("/api/admin/media", mediaRoutes);
app.route("/api/admin/activity", activityRoutes);

app.get("/api/health", (c) => c.json({ status: "ok" }));

const PORT = Number(process.env.PORT) || 3001;

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
