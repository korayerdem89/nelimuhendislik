#!/bin/bash
set -e

APP_DIR="/var/www/nelimuhendislik"

echo "=== Neli Muhendislik Deployment ==="

cd "$APP_DIR"

echo "=== Git pull ==="
git fetch origin main
git reset --hard origin/main
echo "Commit: $(git log -1 --oneline)"

echo "=== Install & build ==="
bun install --frozen-lockfile
bun run build
bunx drizzle-kit push
bun run db:seed

echo "=== Admin reset ==="
bun run db:reset-admin
sudo chown www-data:www-data data.db data.db-wal data.db-shm 2>/dev/null || true
sudo chmod 664 data.db 2>/dev/null || true

echo "=== Restart backend ==="
sudo fuser -k 3001/tcp 2>/dev/null || true
sudo systemctl daemon-reload
sudo systemctl restart neli
sleep 3

echo "=== Health check ==="
HEALTH=$(curl -sS "http://127.0.0.1:3001/api/health")
echo "$HEALTH"
if ! echo "$HEALTH" | grep -q '"authVersion":3'; then
  echo "HATA: Sunucu eski kodu çalıştırıyor (authVersion 3 yok)."
  echo "Log: sudo journalctl -u neli -n 30 --no-pager"
  exit 1
fi

echo "=== Login test ==="
LOGIN_RESULT=$(curl -sS -X POST "http://127.0.0.1:3001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Neli5921"}')
echo "$LOGIN_RESULT"
if ! echo "$LOGIN_RESULT" | grep -q '"token"'; then
  echo "HATA: Admin girişi başarısız."
  curl -sS "http://127.0.0.1:3001/api/auth/diag" || true
  exit 1
fi

echo "=== Deployment complete — Admin login OK ==="
