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

# Restart backend
sudo systemctl restart neli

echo "=== Deployment complete! ==="
echo "Check status: sudo systemctl status neli"
echo "Check logs: sudo journalctl -u neli -f"
