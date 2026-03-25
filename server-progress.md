# Sunucu kurulumu ve ilerleme özeti (`server-progress.md`)

Bu belge, **Neli Mühendislik** projesinin yerel geliştirmeden üretim sunucusuna taşınması sürecinde yapılanları ve kullanılan teknolojileri baştan sona özetler.

---

## 1. Mimari özeti

| Katman | Teknoloji | Rol |
|--------|-----------|-----|
| **Ön yüz (SPA)** | React 19, Vite 7, TypeScript, Tailwind CSS, React Router | Tarayıcıda çalışan arayüz; `bun run build` ile `dist/` üretilir |
| **Arka uç (API)** | Hono 4, `@hono/node-server`, Bun | REST API, statik `uploads/`, sitemap/robots, Odoo proxy |
| **Veritabanı** | SQLite (`data.db`), Drizzle ORM, `bun:sqlite` | Blog, projeler, ayarlar, medya meta, vb. |
| **Web sunucusu** | Nginx | HTTPS, `dist/` servisi, `/api/` ve `/uploads/` reverse proxy, SEO yolları |
| **Süreç yöneticisi** | systemd (`neli.service`) | Backend’in sürekli çalışması, otomatik yeniden başlatma |
| **SSL** | Let’s Encrypt + Certbot | `neli.tr` / `www.neli.tr` için sertifika |
| **CRM entegrasyonu** | Odoo (XML-RPC), `xmlrpc` npm paketi | İletişim formundan CRM lead oluşturma |
| **E-posta formu** | Web3Forms (harici API) | İletişim formu bildirimleri |

**Üretim akışı (özet):**

```mermaid
flowchart LR
  subgraph client [Ziyaretçi]
    Browser[Browser]
  end
  subgraph nginx_layer [Nginx]
    Nginx[Nginx 443]
  end
  subgraph app [Sunucu]
    Dist[dist SPA]
    Bun[Bun Hono :3001]
    DB[(SQLite data.db)]
    Odoo[Odoo :8069]
  end
  Browser --> Nginx
  Nginx -->|"/"| Dist
  Nginx -->|"/api/" "/sitemap.xml" "/robots.txt"| Bun
  Nginx -->|"/uploads/"| Dist
  Bun --> DB
  Bun --> Odoo
```

---

## 2. Yerel geliştirmede yapılanlar (Windows)

- **Sorun:** Sadece `bun run dev` (Vite) çalışınca API yoktu; tarayıcı `ECONNREFUSED` alıyordu çünkü backend **3001** dinlemiyordu.
- **Çözüm:** `concurrently` ile `dev:all` script’i: aynı anda Vite + backend.
- **Port çakışması:** `bun run dev:server` “port 3001 in use” → eski süreç kapatıldı (`bun run kill` / `killserver`).
- **Vite:** `base: "/"` (üretimde SPA iç sayfalarında asset yolları için).
- **Proxy:** Geliştirmede Vite, `/api` ve `/uploads` isteklerini `localhost:3001`’e yönlendirir.

---

## 3. Depo ve deploy dosyaları

| Dosya | Amaç |
|-------|------|
| [`deploy/setup.sh`](deploy/setup.sh) | İlk kurulum: Bun symlink, clone/pull, `.env`, install, build, `drizzle-kit push`, seed, uploads, systemd, nginx, certbot |
| [`deploy/deploy.sh`](deploy/deploy.sh) | Güncelleme: `git pull`, install, build, db push, seed, `systemctl restart neli` |
| [`deploy/nginx.conf`](deploy/nginx.conf) | `neli.tr` → SPA + API proxy; `neli.net.tr` → Odoo; `/sitemap.xml`, `/robots.txt` → backend |
| [`deploy/neli.service`](deploy/neli.service) | systemd birimi: `WorkingDirectory=/var/www/nelimuhendislik`, `ExecStart=/usr/local/bin/bun run server/index.ts` |

---

## 4. Sunucuda adım adım yapılanlar

### 4.1 Ortam

- **İşletim sistemi:** Ubuntu (Debian tabanlı).
- **Erişim:** MobaXterm ile SSH; isteğe bağlı SFTP ile manuel dosya yükleme.
- **Uygulama dizini:** `/var/www/nelimuhendislik`.

### 4.2 Kodun sunucuya gelmesi

- **Git:** `git clone` veya `git pull` (tercih).
- **Manuel:** `server/`, `src/`, `deploy/`, `public/`, yapılandırma dosyaları vb. yüklenir; `node_modules/`, `dist/`, `.env` sunucuda oluşturulur.

### 4.3 Bağımlılık ve build

```bash
cd /var/www/nelimuhendislik
bun install
bun run build
bunx drizzle-kit push
bun run db:seed
mkdir -p uploads/thumbnails
```

### 4.4 Ortam değişkenleri (`.env`)

- `VITE_API_URL` üretimde **boş** (Nginx `/api/` proxy).
- `JWT_SECRET`, `PORT=3001`, `CORS_ORIGIN` (ör. `https://neli.tr,https://www.neli.tr`).
- **Odoo:** `ODOO_HOST`, `ODOO_PORT`, `ODOO_DB` (ör. veritabanı adı `neli.net.tr`), `ODOO_USERNAME`, `ODOO_PASSWORD`.

### 4.5 Bun ve systemd

- Backend **Bun** ile çalışır; systemd `www-data` kullanıcısı `/root/.bun/...` yolunu okuyamayabilir.
- **Çözüm:** Gerçek binary’yi kopyalamak: `sudo cp /root/.bun/bin/bun /usr/local/bin/bun` (döngüsel symlink hatasını önlemek için).
- Servis: `sudo cp deploy/neli.service /etc/systemd/system/`, `daemon-reload`, `enable`, `start`.
- Gerekirse `User=root` ile test (izin sorunlarında).

### 4.6 Nginx

- `neli.tr` için site etkin; **varsayılan** veya çift `neli.tr.conf` gibi eski symlink’ler kaldırıldı (aksi halde yanlış `server` veya “Welcome to nginx”).
- İlk aşamada SSL dosyası yoksa tam `deploy/nginx.conf` yüklenemeyebilir → geçici **sadece HTTP** blok, ardından `certbot --nginx`.
- **502:** Backend kapalı veya 3001’e ulaşılamıyor → `systemctl status neli`, `curl http://127.0.0.1:3001/api/health`.

### 4.7 Alan adı ve yönlendirme sorunları

- `neli.tr` → `neli.net.tr` (Odoo login): Genelde **neli.tr için Nginx/SSL yok** veya yanlış `default_server`; düzeltme Nginx + SSL ile yapıldı.

### 4.8 SSL

- Certbot ile `neli.tr` ve `www.neli.tr` için sertifika; mevcut sertifika varsa “reinstall” seçeneği kullanıldı.
- `neli.net.tr.conf` içinde UTF-8 dışı karakter uyarısı certbot’u etkileyebilir; dosya düzeltilmeli.

### 4.9 SEO / Search Console

- Dinamik [`server/routes/sitemap.ts`](server/routes/sitemap.ts): `/sitemap.xml`, `/robots.txt`.
- Nginx’te bu yollar backend’e proxy edilir.
- Search Console’da çoğunlukla **DNS doğrulaması**; `index.html` içinde gereksiz/yanlış `google-site-verification` placeholder kaldırıldı.

### 4.10 Güncelleme döngüsü

```bash
cd /var/www/nelimuhendislik
bash deploy/deploy.sh
# veya manuel: git pull, bun install, bun run build, drizzle-kit push, systemctl restart neli
```

---

## 5. Yararlı komutlar (sunucu)

| Görev | Komut |
|--------|--------|
| Backend durumu | `sudo systemctl status neli` |
| Backend log | `sudo journalctl -u neli -f` |
| Nginx test | `sudo nginx -t` |
| Nginx reload | `sudo systemctl reload nginx` |
| Sağlık kontrolü | `curl http://127.0.0.1:3001/api/health` |
| Odoo DB listesi (örnek) | `curl -s -X POST http://localhost:8069/jsonrpc -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"call","params":{"service":"db","method":"list","args":{}},"id":1}'` |

---

## 6. Özet: hangi teknolojiler kullanıldı?

- **Sunucu:** Linux (Ubuntu), SSH (MobaXterm).
- **Runtime / paket:** Bun, `bun.lock`.
- **Frontend build:** Vite, React, TypeScript.
- **API:** Hono, Node uyumlu serve (`@hono/node-server`).
- **DB:** SQLite + Drizzle Kit (`drizzle-kit push`), seed script.
- **Reverse proxy & TLS:** Nginx, Certbot.
- **Süreç:** systemd.
- **Harici:** Odoo (CRM), Web3Forms, Let’s Encrypt.

Bu dosya, proje deposunda **sunucu ve operasyon geçmişi** için referans olarak tutulur; alan adı, şifre veya sunucu IP’si burada sabitlenmez—gerçek değerler yalnızca sunucudaki `.env` ve DNS panelinde yönetilir.
