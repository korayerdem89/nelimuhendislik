#!/bin/bash
set -e

echo "=== Neli Muhendislik - Initial Server Setup ==="

# Install Bun
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Clone repo
APP_DIR="/var/www/nelimuhendislik"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# Copy .env.example to .env and edit
cp .env.example .env
echo "IMPORTANT: Edit .env and set JWT_SECRET to a random value!"
echo "Run: openssl rand -hex 32"

# Install deps
bun install

# Build
bun run build

# Push DB
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

echo "=== Setup complete! ==="
echo "1. Edit /var/www/nelimuhendislik/.env"
echo "2. Visit https://neli.tr/panel/login to create admin account"
echo "3. Check backend: sudo systemctl status neli"
