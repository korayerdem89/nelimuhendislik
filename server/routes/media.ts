import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { media } from "../db/schema.js";
import { logActivity } from "../lib/log-activity.js";
import sharp from "sharp";
import { mkdir, unlink } from "fs/promises";
import { resolve, extname } from "path";
import { existsSync } from "fs";

const mediaRoutes = new Hono();
const UPLOAD_DIR = resolve(process.cwd(), "uploads");

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
  const thumbDir = resolve(UPLOAD_DIR, "thumbnails");
  if (!existsSync(thumbDir)) {
    await mkdir(thumbDir, { recursive: true });
  }
}

mediaRoutes.get("/", (c) => {
  const items = db.select().from(media).orderBy(desc(media.createdAt)).all();
  return c.json(items);
});

mediaRoutes.post("/upload", async (c) => {
  await ensureUploadDir();
  const formData = await c.req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return c.json({ error: "No file provided" }, 400);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = extname(file.name).toLowerCase();
  const timestamp = Date.now();
  const baseName = file.name
    .replace(ext, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 50);
  const filename = `${timestamp}_${baseName}.webp`;
  const thumbFilename = `${timestamp}_${baseName}_thumb.webp`;

  const filePath = resolve(UPLOAD_DIR, filename);
  const thumbPath = resolve(UPLOAD_DIR, "thumbnails", thumbFilename);

  let sharpInstance = sharp(buffer);
  const metadata = await sharpInstance.metadata();

  await sharpInstance
    .webp({ quality: 85 })
    .toFile(filePath);

  await sharp(buffer)
    .resize(300, 300, { fit: "cover" })
    .webp({ quality: 70 })
    .toFile(thumbPath);

  const stats = existsSync(filePath)
    ? (await import("fs/promises")).then((fs) => fs.stat(filePath))
    : Promise.resolve({ size: buffer.length });
  const fileSize = (await stats).size;

  const result = db
    .insert(media)
    .values({
      filename,
      originalName: file.name,
      mimeType: "image/webp",
      size: fileSize,
      path: `/uploads/${filename}`,
      thumbnailPath: `/uploads/thumbnails/${thumbFilename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
    })
    .returning()
    .get();

  logActivity("upload", "media", result.originalName, "admin", result.id);
  return c.json(result, 201);
});

mediaRoutes.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const item = db.select().from(media).where(eq(media.id, id)).get();

  if (item) {
    const filePath = resolve(process.cwd(), item.path.slice(1));
    if (existsSync(filePath)) await unlink(filePath);
    if (item.thumbnailPath) {
      const thumbPath = resolve(process.cwd(), item.thumbnailPath.slice(1));
      if (existsSync(thumbPath)) await unlink(thumbPath);
    }
    db.delete(media).where(eq(media.id, id)).run();
    logActivity("delete", "media", item.originalName, "admin", id);
  }

  return c.json({ success: true });
});

export default mediaRoutes;
