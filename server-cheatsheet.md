# Sunucu komut cheat sheet

Kısa referans. Ayrıntılı kurulum ve geçmiş için [`server-progress.md`](server-progress.md) dosyasına bakın.

**Üretim uygulama dizini:** `/var/www/nelimuhendislik`  
**Backend:** Bun, port **3001** (Hono)  
**systemd servisi:** `neli`

---

## Yerel geliştirme (Windows)

| Amaç | Komut |
|------|--------|
| Vite + API birlikte | `bun run dev:all` |
| Sadece ön yüz | `bun run dev` |
| Sadece backend (watch) | `bun run dev:server` |
| 3001 / 5173 portlarını temizle | `bun run kill` |

---

## Sunucuya bağlanma

```bash
ssh kullanici@sunucu-ip-veya-host
cd /var/www/nelimuhendislik
```

---

## Deploy (güncelleme)

```bash
cd /var/www/nelimuhendislik
bash deploy/deploy.sh
```

**Manuel deploy (script ile aynı adımlar):**

```bash
cd /var/www/nelimuhendislik
git pull origin main
bun install --frozen-lockfile
bun run build
bunx drizzle-kit push
bun run db:seed
sudo systemctl restart neli
```

---

## İlk kurulum / ortam (hatırlatma)

```bash
cd /var/www/nelimuhendislik
bun install
bun run build
bunx drizzle-kit push
bun run db:seed
mkdir -p uploads/thumbnails
```

Tam otomasyon için: `bash deploy/setup.sh` (Bun, nginx, systemd, certbot vb. — ayrıntı `deploy/setup.sh` ve `server-progress.md`).

**Bun binary (www-data erişimi):** `sudo cp /root/.bun/bin/bun /usr/local/bin/bun`

---

## systemd — `neli` servisi

| Amaç | Komut |
|------|--------|
| Durum | `sudo systemctl status neli` |
| Başlat | `sudo systemctl start neli` |
| Durdur | `sudo systemctl stop neli` |
| Yeniden başlat | `sudo systemctl restart neli` |
| Otomatik başlat | `sudo systemctl enable neli` |
| Canlı log | `sudo journalctl -u neli -f` |
| Son N satır | `sudo journalctl -u neli -n 100 --no-pager` |

**Birimi yeniden yükleme (dosya değiştiyse):**

```bash
sudo cp /var/www/nelimuhendislik/deploy/neli.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable neli
sudo systemctl restart neli
```

---

## Nginx

| Amaç | Komut |
|------|--------|
| Yapılandırmayı test et | `sudo nginx -t` |
| Yeniden yükle (kesintisiz) | `sudo systemctl reload nginx` |
| Durum | `sudo systemctl status nginx` |

Site yapılandırması referansı: `deploy/nginx.conf`

---

## SSL (Let’s Encrypt / Certbot)

```bash
sudo certbot --nginx -d neli.tr -d www.neli.tr
sudo certbot renew --dry-run
```

---

## Sağlık ve hata ayıklama

| Amaç | Komut |
|------|--------|
| API sağlık | `curl -sS http://127.0.0.1:3001/api/health` |
| 502 sonrası | Önce `neli` çalışıyor mu ve 3001 yanıt veriyor mu kontrol et |

**Odoo — veritabanı listesi (örnek, yerelde 8069):**

```bash
curl -s -X POST http://localhost:8069/jsonrpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"call","params":{"service":"db","method":"list","args":{}},"id":1}'
```

---

## Önemli dosyalar

| Dosya | Rol |
|-------|-----|
| `deploy/deploy.sh` | Güncelleme script’i |
| `deploy/setup.sh` | İlk kurulum script’i |
| `deploy/nginx.conf` | Nginx şablonu |
| `deploy/neli.service` | systemd birimi |
| `.env` | Üretimde sunucuda; gizli anahtarlar burada (repoda yok) |

---

*Şifre, API anahtarı ve sunucu IP’si bu dosyada tutulmaz.*
