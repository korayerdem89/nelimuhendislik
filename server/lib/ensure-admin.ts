import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { adminUsers } from "../db/schema.js";
import { hashPassword, verifyPassword } from "./password.js";
import { PROJECT_ROOT } from "../paths.js";
import { resolve } from "path";

const DB_PATH = resolve(PROJECT_ROOT, "data.db");

export function getAdminCredentials(): { username: string; password: string } {
  const strip = (value: string | undefined, fallback: string) => {
    if (!value?.trim()) return fallback;
    let next = value.trim();
    if (
      (next.startsWith('"') && next.endsWith('"')) ||
      (next.startsWith("'") && next.endsWith("'"))
    ) {
      next = next.slice(1, -1);
    }
    return next;
  };

  return {
    username: strip(process.env.ADMIN_USERNAME, "admin"),
    password: strip(process.env.ADMIN_PASSWORD, "Neli5921"),
  };
}

export async function ensureAdminUser(options?: {
  force?: boolean;
}): Promise<void> {
  const { username, password } = getAdminCredentials();

  if (!username) {
    throw new Error("ADMIN_USERNAME boş olamaz.");
  }

  if (password.length < 6) {
    throw new Error("ADMIN_PASSWORD en az 6 karakter olmalı.");
  }

  const existing = db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .get();

  if (!options?.force && existing) {
    const valid = await verifyPassword(password, existing.passwordHash);
    if (valid) {
      return;
    }
  }

  const passwordHash = await hashPassword(password);

  if (options?.force) {
    db.delete(adminUsers).run();
  }

  const current = db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .get();

  if (current) {
    db.update(adminUsers)
      .set({ passwordHash })
      .where(eq(adminUsers.id, current.id))
      .run();
    console.log(`[auth] Admin şifresi güncellendi: ${username}`);
    return;
  }

  db.insert(adminUsers).values({ username, passwordHash }).run();
  console.log(`[auth] Admin kullanıcı oluşturuldu: ${username}`);
}

export function getAdminDiagnostics() {
  const users = db.select().from(adminUsers).all();
  const creds = getAdminCredentials();

  return {
    dbPath: DB_PATH,
    adminCount: users.length,
    admins: users.map((user) => ({
      id: user.id,
      username: user.username,
      hashKind: user.passwordHash.startsWith("pbkdf2:")
        ? "pbkdf2"
        : user.passwordHash.startsWith("$2")
          ? "bcrypt"
          : "legacy-sha256",
      createdAt: user.createdAt,
    })),
    envUsername: creds.username,
    envPasswordLength: creds.password.length,
    envPasswordConfigured: Boolean(process.env.ADMIN_PASSWORD?.trim()),
  };
}
