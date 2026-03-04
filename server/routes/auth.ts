import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { adminUsers } from "../db/schema.js";
import { signToken } from "../middleware/auth.js";

const auth = new Hono();

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + (process.env.JWT_SECRET || "neli-admin-secret-change-me"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

auth.post("/login", async (c) => {
  const body = await c.req.json();
  const { username, password } = body as { username: string; password: string };

  if (!username || !password) {
    return c.json({ error: "Kullanıcı adı ve şifre gerekli" }, 400);
  }

  const user = db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .get();

  if (!user) {
    return c.json({ error: "Geçersiz kullanıcı adı veya şifre" }, 401);
  }

  const hashedInput = await hashPassword(password);
  if (hashedInput !== user.passwordHash) {
    return c.json({ error: "Geçersiz kullanıcı adı veya şifre" }, 401);
  }

  const token = await signToken({
    sub: String(user.id),
    username: user.username,
  });

  return c.json({ token, username: user.username });
});

auth.post("/setup", async (c) => {
  const existingUser = db.select().from(adminUsers).get();
  if (existingUser) {
    return c.json({ error: "Admin kullanıcı zaten mevcut" }, 400);
  }

  const body = await c.req.json();
  const { username, password } = body as { username: string; password: string };

  if (!username || !password || password.length < 6) {
    return c.json({ error: "Kullanıcı adı ve en az 6 karakter şifre gerekli" }, 400);
  }

  const passwordHash = await hashPassword(password);
  db.insert(adminUsers)
    .values({ username, passwordHash })
    .run();

  const token = await signToken({ sub: "1", username });
  return c.json({ token, username });
});

auth.get("/check", async (c) => {
  const hasAdmin = db.select().from(adminUsers).get();
  return c.json({ needsSetup: !hasAdmin });
});

export default auth;
