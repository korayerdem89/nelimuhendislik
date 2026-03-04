import { Hono } from "hono";
import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { blogPosts } from "../db/schema.js";

const blog = new Hono();

blog.get("/", (c) => {
  const posts = db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.publishedAt))
    .all();
  return c.json(posts);
});

blog.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const post = db.select().from(blogPosts).where(eq(blogPosts.id, id)).get();
  if (!post) return c.json({ error: "Not found" }, 404);
  return c.json(post);
});

blog.post("/", async (c) => {
  const body = await c.req.json();
  const result = db
    .insert(blogPosts)
    .values({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt || "",
      content: body.content || "",
      coverImage: body.coverImage || "",
      category: body.category || "",
      tags: JSON.stringify(body.tags || []),
      authorName: body.authorName || "Neli Mühendislik",
      authorAvatar: body.authorAvatar || "/site-logo.webp",
      featured: body.featured || false,
      status: body.status || "draft",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      metaKeywords: body.metaKeywords || "",
      publishedAt: body.publishedAt || null,
    })
    .returning()
    .get();
  return c.json(result, 201);
});

blog.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const result = db
    .update(blogPosts)
    .set({
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.tags !== undefined && { tags: JSON.stringify(body.tags) }),
      ...(body.authorName !== undefined && { authorName: body.authorName }),
      ...(body.authorAvatar !== undefined && {
        authorAvatar: body.authorAvatar,
      }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
      ...(body.metaDescription !== undefined && {
        metaDescription: body.metaDescription,
      }),
      ...(body.metaKeywords !== undefined && {
        metaKeywords: body.metaKeywords,
      }),
      ...(body.publishedAt !== undefined && { publishedAt: body.publishedAt }),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(blogPosts.id, id))
    .returning()
    .get();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

blog.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  db.delete(blogPosts).where(eq(blogPosts.id, id)).run();
  return c.json({ success: true });
});

export default blog;
