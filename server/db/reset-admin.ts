import { Database } from "bun:sqlite";
import { resolve } from "path";
import { PROJECT_ROOT } from "../paths.js";
import { hashPassword } from "../lib/password.js";

const DB_PATH = resolve(PROJECT_ROOT, "data.db");
const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "Neli5921";

async function main() {
  if (!username.trim()) {
    console.error("ADMIN_USERNAME boş olamaz.");
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("Şifre en az 6 karakter olmalı.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const db = new Database(DB_PATH);

  db.run("DELETE FROM admin_users");
  db.run(
    "INSERT INTO admin_users (username, password_hash, created_at) VALUES (?, ?, ?)",
    [username, passwordHash, new Date().toISOString()],
  );

  console.log(`Admin hesabı ayarlandı: kullanıcı adı="${username}"`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
