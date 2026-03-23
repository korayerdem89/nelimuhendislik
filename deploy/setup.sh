#!/bin/bash
set -e

APP_DIR="/var/www/nelimuhendislik"
REPO_URL="https://github.com/korayerdem89/nelimuhendislik.git"

echo "=== Neli Muhendislik - Initial Server Setup ==="

# Install Bun
if ! command -v bun &> /dev/null; then
  curl -fsSL https://bun.sh/install | bash
  source ~/.bashrc
fi

# Make Bun available system-wide (needed for systemd www-data user)
sudo ln -sf ~/.bun/bin/bun /usr/local/bin/bun

# Clone repo
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# Copy .env.example to .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "IMPORTANT: Edit .env before continuing!"
  echo "  nano $APP_DIR/.env"
  echo ""
  echo "Set these values:"
  echo "  JWT_SECRET=$(openssl rand -hex 32)"
  echo "  CORS_ORIGIN=https://neli.tr,https://www.neli.tr"
  echo "  VITE_WEB3FORMS_ACCESS_KEY=your_key"
  echo "  ODOO_* variables (if using Odoo)"
  echo ""
  read -p "Press ENTER after editing .env to continue..."
fi

# Install deps
bun install

# Build frontend
bun run build

# Push DB schema
bunx drizzle-kit push

# Seed data
bun run db:seed

# Create uploads directory
mkdir -p uploads/thumbnails

# Setup systemd service
sudo cp deploy/neli.service /etc/systemd/system/neli.service
sudo systemctl daemon-reload
sudo systemctl enable neli
sudo systemctl start neli

# Setup Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/neli.tr
sudo ln -sf /etc/nginx/sites-available/neli.tr /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d neli.tr -d www.neli.tr

echo ""
echo "=== Setup complete! ==="
echo "1. Visit https://neli.tr/panel/login to create admin account"
echo "2. Check backend: sudo systemctl status neli"
echo "3. Check logs: sudo journalctl -u neli -f"
