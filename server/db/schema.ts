import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  category: text("category").notNull().default(""),
  tags: text("tags").notNull().default("[]"),
  authorName: text("author_name").notNull().default("Neli Mühendislik"),
  authorAvatar: text("author_avatar").notNull().default("/site-logo.webp"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  metaTitle: text("meta_title").notNull().default(""),
  metaDescription: text("meta_description").notNull().default(""),
  metaKeywords: text("meta_keywords").notNull().default(""),
  publishedAt: text("published_at"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  location: text("location").notNull().default(""),
  year: text("year").notNull().default(""),
  type: text("type").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  status: text("status").notNull().default("Satışta"),
  detailsJson: text("details_json").notNull().default("{}"),
  phasesJson: text("phases_json").notNull().default("[]"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const mapPins = sqliteTable("map_pins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => projects.id),
  name: text("name").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  neighborhood: text("neighborhood").notNull().default(""),
  district: text("district").notNull().default(""),
  image: text("image").notNull().default(""),
  href: text("href").notNull().default("/projeler"),
});

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull().default(""),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const media = sqliteTable("media", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  thumbnailPath: text("thumbnail_path"),
  width: integer("width"),
  height: integer("height"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
