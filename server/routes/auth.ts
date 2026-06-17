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

const auth = new Hono();

auth.post("/login", async (c) => {
  const body = await c.req.json();
  const { username: rawUsername, password } = body as {
    username: string;
    password: string;
  };
  const username = rawUsername?.trim();

  if (!username || !password) {
    return c.json({ error: "Kullanıcı adı ve şifre gerekli" }, 400);
  }

  const creds = getAdminCredentials();
  const matchesConfiguredAdmin =
    username === creds.username && password === creds.password;

  try {
    await ensureAdminUser({ force: matchesConfiguredAdmin });
  } catch (err) {
    console.error(
      "[auth] Login öncesi admin senkronizasyonu başarısız:",
      err instanceof Error ? err.message : err,
    );
  }

  const user = db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .get();

  if (!user) {
    return c.json({ error: "Geçersiz kullanıcı adı veya şifre" }, 401);
  }

  let validPassword = await verifyPassword(password, user.passwordHash);

  if (!validPassword && matchesConfiguredAdmin) {
    try {
      const passwordHash = await hashPassword(password);
      db.update(adminUsers)
        .set({ passwordHash })
        .where(eq(adminUsers.id, user.id))
        .run();
      validPassword = await verifyPassword(password, passwordHash);
    } catch (err) {
      console.error(
        "[auth] Login sırasında şifre onarımı başarısız:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  if (!validPassword) {
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

auth.get("/diag", (c) => {
  if (process.env.NODE_ENV === "production" && process.env.ADMIN_DIAG_KEY) {
    const key = c.req.header("x-admin-diag-key");
    if (key !== process.env.ADMIN_DIAG_KEY) {
      return c.json({ error: "Unauthorized" }, 401);
    }
  }

  return c.json(getAdminDiagnostics());
});

export default auth;
