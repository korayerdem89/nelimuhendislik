#!/bin/bash
set -e

APP_DIR="/var/www/nelimuhendislik"
REPO_URL="https://github.com/korayerdem89/nelimuhendislik.git"

echo "=== Neli Muhendislik Deployment ==="

# Pull latest code
cd "$APP_DIR"
git pull origin main

# Install dependencies
bun install --frozen-lockfile

# Build frontend
bun run build

# Push DB schema (safe - only applies new changes)
bunx drizzle-kit push

# Seed if first run
bun run db:seed

# Admin giriş bilgilerini .env / varsayılanlarla senkronize et
bun run db:reset-admin
sudo chown www-data:www-data data.db data.db-wal data.db-shm 2>/dev/null || true
sudo chmod 664 data.db 2>/dev/null || true

# Restart backend
sudo systemctl restart neli
sleep 2

echo "=== Login test ==="
LOGIN_RESULT=$(curl -sS -X POST "http://127.0.0.1:3001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Neli5921"}')
echo "$LOGIN_RESULT"
if echo "$LOGIN_RESULT" | grep -q '"token"'; then
  echo "Admin login OK"
else
  echo "WARNING: Admin login failed after deploy!"
  echo "Run: curl -sS http://127.0.0.1:3001/api/auth/diag"
  exit 1
fi

echo "=== Deployment complete! ==="
echo "Check status: sudo systemctl status neli"
echo "Check logs: sudo journalctl -u neli -f"
