import { ensureAdminUser } from "../lib/ensure-admin.js";

async function main() {
  await ensureAdminUser({ force: true });
  const username = (process.env.ADMIN_USERNAME || "admin").trim();
  console.log(`Admin hesabı ayarlandı: kullanıcı adı="${username}"`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
