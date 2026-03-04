import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { media } from "../db/schema.js";
import { logActivity } from "../lib/log-activity.js";
import sharp from "sharp";
import { mkdir, stat, unlink } from "fs/promises";
import { resolve, extname } from "path";
import { existsSync } from "fs";

const mediaRoutes = new Hono();
const UPLOAD_DIR = resolve(process.cwd(), "uploads");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/avif",
]);

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
  try {
    await ensureUploadDir();
  } catch (err) {
    console.error("Upload dizini oluşturulamadı:", err);
    return c.json({ error: "Sunucuda yükleme dizini oluşturulamadı." }, 500);
  }

  let formData: FormData;
  try {
    formData = await c.req.formData();
  } catch {
    return c.json({ error: "Dosya verisi okunamadı. Geçersiz form gönderimi." }, 400);
  }

  const file = formData.get("file") as File | null;
  const altText = (formData.get("altText") as string) || "";
  if (!file) {
    return c.json({ error: "Dosya seçilmedi." }, 400);
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return c.json({ error: "Unsupported file type. JPEG, PNG, WebP, GIF veya AVIF yükleyin." }, 400);
  }

  if (file.size > MAX_FILE_SIZE) {
    return c.json({ error: "File too large. Maksimum 10 MB yüklenebilir." }, 400);
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch {
    return c.json({ error: "Dosya içeriği okunamadı." }, 400);
  }

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

  let metadata: sharp.Metadata;
  try {
    metadata = await sharp(buffer).metadata();

    await sharp(buffer)
      .webp({ quality: 85 })
      .toFile(filePath);

    await sharp(buffer)
      .resize(300, 300, { fit: "cover" })
      .webp({ quality: 70 })
      .toFile(thumbPath);
  } catch (err) {
    console.error("Sharp görsel işleme hatası:", err);
    return c.json({ error: "Görsel işlenemedi. Dosya bozuk veya desteklenmeyen bir format olabilir." }, 422);
  }

  let fileSize = buffer.length;
  try {
    const fileStats = await stat(filePath);
    fileSize = fileStats.size;
  } catch {
    // stat başarısız olursa orijinal buffer boyutunu kullan
  }

  const result = db
    .insert(media)
    .values({
      filename,
      originalName: file.name,
      mimeType: "image/webp",
      size: fileSize,
      altText,
      path: `/uploads/${filename}`,
      thumbnailPath: `/uploads/thumbnails/${thumbFilename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
    })
    .returning()
    .get();

  logActivity("upload", "media", result.originalName, "admin", result.id);

  return c.json({
    ...result,
    originalSize: buffer.length,
    originalFormat: metadata.format || ext.replace(".", ""),
  }, 201);
});

mediaRoutes.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const item = db.select().from(media).where(eq(media.id, id)).get();
  if (!item) return c.json({ error: "Not found" }, 404);

  const result = db
    .update(media)
    .set({ altText: body.altText ?? item.altText })
    .where(eq(media.id, id))
    .returning()
    .get();

  return c.json(result);
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
