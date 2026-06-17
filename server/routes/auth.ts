import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { adminUsers } from "../db/schema.js";
import { signToken } from "../middleware/auth.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import {
  ensureAdminUser,
  getAdminCredentials,
  getAdminDiagnostics,
} from "../lib/ensure-admin.js";
import {
  isSiteAdminLogin,
  SITE_ADMIN_USERNAME,
} from "../lib/site-admin.js";

const auth = new Hono();

async function issueAdminToken(username: string, userId: number) {
  const token = await signToken({
    sub: String(userId),
    username,
  });
  return { token, username };
}

auth.post("/login", async (c) => {
  const body = await c.req.json();
  const username = (body.username as string | undefined)?.trim() ?? "";
  const password = (body.password as string | undefined) ?? "";

  if (!username || !password) {
    return c.json({ error: "Kullanıcı adı ve şifre gerekli" }, 400);
  }

  // Site admin: hash/DB/ENV bağımsız — doğrudan giriş
  if (isSiteAdminLogin(username, password)) {
    try {
      await ensureAdminUser({ force: true });
    } catch (err) {
      console.error("[auth] Site admin DB sync failed:", err);
    }

    const user = db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, SITE_ADMIN_USERNAME))
      .get();

    return c.json(
      await issueAdminToken(SITE_ADMIN_USERNAME, user?.id ?? 1),
    );
  }

  const creds = getAdminCredentials();
  const matchesConfiguredAdmin =
    username === creds.username && password === creds.password;

  if (matchesConfiguredAdmin) {
    try {
      await ensureAdminUser({ force: true });
    } catch (err) {
      console.error("[auth] Configured admin DB sync failed:", err);
    }

    const user = db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, creds.username))
      .get();

    if (user) {
      return c.json(await issueAdminToken(user.username, user.id));
    }
  }

  const user = db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .get();

  if (!user) {
    return c.json({ error: "Geçersiz kullanıcı adı veya şifre" }, 401);
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    return c.json({ error: "Geçersiz kullanıcı adı veya şifre" }, 401);
  }

  return c.json(await issueAdminToken(user.username, user.id));
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

auth.get("/diag", (c) => c.json(getAdminDiagnostics()));

export default auth;
