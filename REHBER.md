# Neli Muhendislik — Kurulum ve Yonetim Rehberi

Bu rehber, projeyi sifirdan bir VPS sunucuya kurmani, admin panelini kullanmani ve guncelleme yapmani adim adim anlatiyor. Teknik bilgin olmasa bile bu rehberi takip ederek her seyi yapabilirsin.

---

## ICINDEKILER

1. [Proje Nedir, Ne Yapar?](#1-proje-nedir-ne-yapar)
2. [Projenin Yapisi (Dosya ve Klasorler)](#2-projenin-yapisi)
3. [Bilgisayarinda Gelistirme (Lokal Calistirma)](#3-lokal-calistirma)
4. [VPS Sunucu Secimi](#4-vps-sunucu-secimi)
5. [VPS'e Ilk Kurulum (Sifirdan)](#5-vpse-ilk-kurulum)
6. [Domain Baglama ve SSL (HTTPS)](#6-domain-baglama-ve-ssl)
7. [Admin Paneline Giris](#7-admin-paneline-giris)
8. [Admin Panelini Kullanma](#8-admin-panelini-kullanma)
9. [Guncelleme Yapma (Yeni Kod Yukleme)](#9-guncelleme-yapma)
10. [Yedekleme](#10-yedekleme)
11. [Sorun Giderme](#11-sorun-giderme)
12. [Onemli Bilgiler ve Guvenlik](#12-onemli-bilgiler-ve-guvenlik)

---

## 1. Proje Nedir, Ne Yapar?

Bu proje iki parcadan olusur:

| Parca | Teknoloji | Ne Yapar? |
|-------|-----------|-----------|
| **Web Sitesi (Frontend)** | React + Vite | Kullanicilarin gordugu site (ana sayfa, projeler, blog, iletisim vs.) |
| **Backend (Sunucu)** | Hono + Bun | Admin paneli API'si, veritabani, resim yukleme islemlerini yapar |
| **Veritabani** | SQLite | Blog yazilari, projeler, harita pinleri, ayarlar burada tutulur |
| **Admin Paneli** | React (ayni proje icinde) | `/panel` adresinden ulasilan yonetim ekrani |

Yani tek bir proje icinde hem web sitesi hem de yonetim paneli var.

---

## 2. Projenin Yapisi

```
nelimuhendislik/
├── src/                    ← Web sitesi + Admin paneli (React)
│   ├── pages/              ← Sayfa bilesenleri (Home, Blog, Projects...)
│   ├── pages/panel/        ← Admin panel sayfalari
│   ├── components/         ← Ortak bilesenler
│   ├── data/               ← API'den veri cekme fonksiyonlari
│   ├── hooks/              ← React hook'lari (auth, settings)
│   └── lib/                ← API istemcisi (api.ts)
│
├── server/                 ← Backend (Hono sunucu)
│   ├── index.ts            ← Ana sunucu dosyasi
│   ├── db/
│   │   ├── schema.ts       ← Veritabani tablo yapilari
│   │   ├── index.ts        ← Veritabani baglantisi
│   │   └── seed.ts         ← Ornek veri yukleme scripti
│   ├── routes/             ← API endpoint'leri (blog, projects, media...)
│   ├── middleware/          ← Auth kontrolu (JWT)
│   └── lib/                ← Yardimci fonksiyonlar (log-activity)
│
├── deploy/                 ← Sunucu kurulum dosyalari
│   ├── nginx.conf          ← Nginx ayarlari
│   ├── neli.service         ← Systemd servis dosyasi
│   ├── setup.sh            ← Ilk kurulum scripti
│   └── deploy.sh           ← Guncelleme scripti
│
├── uploads/                ← Yuklenen gorseller (sunucuda olusur)
├── dist/                   ← Build sonrasi olusur (bun run build)
├── data.db                 ← SQLite veritabani dosyasi
├── .env                    ← Gizli ayarlar (sifreler, anahtarlar)
├── .env.example            ← .env ornegi
├── drizzle.config.ts       ← Veritabani migration ayarlari
├── package.json            ← Proje bagimliliklari ve komutlar
└── vite.config.ts          ← Vite (frontend build) ayarlari
```

---

## 3. Lokal Calistirma

Bilgisayarinda test etmek icin:

### Gereksinimler
- **Bun** kurulu olmali: https://bun.sh
- **Git** kurulu olmali

### Adimlar

```bash
# 1. Projeyi klonla
git clone <REPO_URL> nelimuhendislik
cd nelimuhendislik

# 2. Bagimliliklari yukle
bun install

# 3. .env dosyasini olustur
cp .env.example .env
```

Simdi `.env` dosyasini ac ve icini doldur:

```
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
VITE_API_URL=
JWT_SECRET=herhangi-bir-gizli-anahtar-yaz-buraya
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

> **NOT:** `VITE_API_URL` bos birakilmali (lokal gelistirmede Vite proxy kullaniyor).

```bash
# 4. Veritabani tablolarini olustur
bunx drizzle-kit push

# 5. Ornek verileri yukle (ilk seferde)
bun run db:seed

# 6. Backend ve Frontend'i ayni anda baslat
bun run dev:server
# Yeni terminal ac:
bun run dev
```

Artik:
- **Web sitesi:** http://localhost:5173
- **Admin paneli:** http://localhost:5173/panel/login

---

## 4. VPS Sunucu Secimi

### Onerilen Saglayicilar

| Saglayici | Minimum Plan | Aylik Fiyat |
|-----------|-------------|-------------|
| **Hetzner** | CX22 (2 CPU, 4GB RAM) | ~€4-5 |
| **Contabo** | VPS S (4 CPU, 8GB RAM) | ~€5-6 |
| **DigitalOcean** | Basic (1 CPU, 2GB RAM) | ~$6 |
| **Turk Saglayicilar** | (Turhost, Natro vs.) | Degisken |

### Minimum Gereksinimler
- **OS:** Ubuntu 22.04 veya 24.04 LTS
- **RAM:** En az 1GB (2GB onerilen)
- **Disk:** En az 20GB SSD
- **CPU:** 1 vCPU yeterli

> **TAVSIYE:** Hetzner CX22 fiyat/performans olarak en iyi secenektir.

---

## 5. VPS'e Ilk Kurulum

VPS'ini aldiktan sonra SSH ile baglan:

```bash
ssh root@SUNUCU_IP_ADRESI
```

Sifre ile veya SSH key ile giris yap.

### Adim 1: Sistemi Guncelle

```bash
apt update && apt upgrade -y
```

### Adim 2: Gerekli Yazilimlari Kur

```bash
# Git kur
apt install -y git curl nginx

# Bun kur
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Bun'in kuruldugundan emin ol
bun --version
```

### Adim 3: Projeyi Sunucuya Yukle

```bash
# Proje klasorunu olustur
mkdir -p /var/www/nelimuhendislik
cd /var/www/nelimuhendislik

# Git ile klonla
git clone <REPO_URL> .
```

> **NOT:** `<REPO_URL>` yerine kendi GitHub/GitLab repo adresini yaz.
>
> Eger repo private ise SSH key veya personal access token kullanman gerekir.

### Adim 4: .env Dosyasini Ayarla

```bash
cp .env.example .env
nano .env
```

Icerigi su sekilde doldur:

```
VITE_WEB3FORMS_ACCESS_KEY=gercek_web3forms_anahtarin
VITE_API_URL=
JWT_SECRET=BURAYA_COK_GUCLU_BIR_ANAHTAR_YAZ
PORT=3001
CORS_ORIGIN=https://SENIN_DOMAININ.com
```

**JWT_SECRET icin guclu bir anahtar olustur:**

```bash
openssl rand -hex 32
```

Bu komutun ciktisini kopyala, `JWT_SECRET=` satirina yapistir.

> **CORS_ORIGIN** = senin web site adresi. Ornek: `https://neli.tr` veya `https://nelimuhendislik.com`

`.env` dosyasini kaydet: `Ctrl+O`, `Enter`, `Ctrl+X`

### Adim 5: Bagimliliklari Yukle ve Build Et

```bash
bun install
bun run build
```

### Adim 6: Veritabanini Olustur

```bash
# Tablolari olustur
bunx drizzle-kit push

# Mevcut verileri yukle (blog, projeler vs.)
bun run db:seed
```

### Adim 7: Gorseller Icin Klasor Olustur

```bash
mkdir -p uploads/thumbnails
chown -R www-data:www-data uploads/
```

### Adim 8: Backend Servisini Kur

Backend'in sunucu her acildiginda otomatik baslamasi icin bir "systemd servisi" olusturuyoruz.

```bash
cp deploy/neli.service /etc/systemd/system/neli.service
```

Simdi servisi kontrol et ve bun yolunu dogrula:

```bash
nano /etc/systemd/system/neli.service
```

`ExecStart` satirindaki bun yolunun dogru oldugundan emin ol:

```bash
which bun
```

Bu komutun ciktisi ne ise (ornegin `/root/.bun/bin/bun`), `ExecStart` satirinda onu kullan:

```
ExecStart=/root/.bun/bin/bun run server/index.ts
```

Kaydet ve servisi baslat:

```bash
systemctl daemon-reload
systemctl enable neli
systemctl start neli
```

**Calisiyor mu kontrol et:**

```bash
systemctl status neli
```

Yesil "active (running)" yazmali.

Ayrica test et:

```bash
curl http://localhost:3001/api/health
```

`{"status":"ok"}` donmeli.

### Adim 9: Nginx'i Ayarla

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/neli
```

Simdi dosyayi ac ve domain adini duzenle:

```bash
nano /etc/nginx/sites-available/neli
```

`server_name` satirlarinda `neli.tr` yazan yerleri **kendi domaininle** degistir. Ornegin:

```
server_name nelimuhendislik.com www.nelimuhendislik.com;
```

Kaydet, sonra aktif et:

```bash
ln -sf /etc/nginx/sites-available/neli /etc/nginx/sites-enabled/
```

Varsayilan nginx config'i kaldir (cakisma olmasin):

```bash
rm -f /etc/nginx/sites-enabled/default
```

Test et ve baslat:

```bash
nginx -t
systemctl reload nginx
```

`nginx -t` komutu "test is successful" diyorsa her sey dogru.

---

## 6. Domain Baglama ve SSL

### Domain DNS Ayarlari

Domain saglayicinda (GoDaddy, Namecheap, Cloudflare vs.) sunlari ekle:

| Tip | Ad | Deger |
|-----|------|-------|
| A | @ | SUNUCU_IP_ADRESI |
| A | www | SUNUCU_IP_ADRESI |

DNS yayilimi 5 dakika ile 24 saat arasinda surebilir. Genelde 10-30 dakikada olur.

### SSL Sertifikasi (HTTPS)

DNS yayildiktan sonra:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d SENIN_DOMAININ.com -d www.SENIN_DOMAININ.com
```

E-posta adresini gir, sartlari kabul et. Certbot otomatik olarak Nginx config'ine SSL ekler.

**Test et:** Tarayicida `https://SENIN_DOMAININ.com` ac. Kilit ikonu gorunmeli.

> SSL sertifikasi 90 gunde bir yenilenir. Certbot bunu otomatik yapar (cron ile).

---

## 7. Admin Paneline Giris

### Ilk Giris (Admin Hesabi Olusturma)

1. Tarayicini ac
2. `https://SENIN_DOMAININ.com/panel/login` adresine git
3. **Ilk giriste** ekranda "Admin Hesabi Olustur" yazisini goreceksin
4. Bir **kullanici adi** ve **sifre** belirle (sifre en az 6 karakter)
5. "Hesap Olustur" butonuna tikla

Bu islem sadece **bir kez** yapilir. Artik bu bilgilerle giris yapabilirsin.

### Sonraki Girisler

1. `https://SENIN_DOMAININ.com/panel/login` adresine git
2. Kullanici adi ve sifreni gir
3. "Giris Yap" butonuna tikla

> **UYARI:** Sifreni unutma! Sifre sifirlama ekrani henuz yok. Sifreni unutursan veritabanindan manuel silmen gerekir (Sorun Giderme bolumune bak).

---

## 8. Admin Panelini Kullanma

Giris yaptiktan sonra sol tarafta bir menu goreceksin:

### Dashboard
- Toplam blog, proje, pin, medya sayilari
- Son yapilan islemler (etkinlik logu)
- Hizli islem linkleri

### Blog Yazilari
- **Yeni Yazi:** "Yeni Yazi" butonuna tikla
- **Baslik** yaz → URL otomatik olusur (Turkce karakterler otomatik cevirilir)
- **Ozet** yaz (liste sayfasinda goruntulenir)
- **Icerik** HTML olarak yaz. Desteklenen etiketler: `<h2>`, `<h3>`, `<p>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`
- **Kapak gorseli** yukle (1:1 oran, on izleme gosterilir)
- **Kategori** sec, **etiketler** virgul ile ayirarak yaz
- **Durum:** "Taslak" veya "Yayinda" sec. Taslak yazilar sitede gorunmez.
- **SEO ayarlari:** Meta baslik, aciklama ve anahtar kelimeler
- "Kaydet" butonuna tikla

**Toplu Islem:** Blog listesinde checkbox'lari isaretleyerek birden fazla yaziyi ayni anda yayinla, taslaga al veya sil.

### Projeler
- "Yeni Proje" butonuna tikla
- Temel bilgileri gir (ad, lokasyon, yil, tip, durum)
- Proje detaylari (mahalle, ilce, sehir, daire tipleri, one cikan ozellikler)
- Insaat asamalarini guncelle (Bekliyor / Devam Ediyor / Tamamlandi)
- Kapak gorseli ve lokasyon haritasi gorseli yukle
- "Kaydet" butonuna tikla

**Toplu Islem:** Proje kartlarinda checkbox'lar ile birden fazla projenin durumunu degistir veya sil.

### Harita Pinleri
- "Yeni Pin" butonuna tikla
- Pin adi, mahalle, ilce bilgilerini gir
- **Haritaya tiklayarak** koordinat sec (enlem/boylam otomatik dolar)
- Gorsel URL'si ve link ekle
- "Kaydet" butonuna tikla

### Medya Kutuphanesi
- Gorselleri surekle-birak veya "Gorsel Yukle" butonuyla yukle
- Birden fazla gorsel ayni anda yuklenebilir
- Yuklenen gorseller otomatik olarak:
  - WebP formatina donusturulur (dosya boyutu kucalir)
  - 300x300 thumbnail olusturulur
- Gorsel yolunu kopyalamak icin kopyala ikonuna tikla
- Gorseli silmek icin cop kutusu ikonuna tikla

### Etkinlik Logu
- Panelde yapilan tum islemler burada listelenir
- Kim, ne zaman, ne yapti gorebilirsin
- Dashboard'da da son 8 islem gorunur

### Site Ayarlari
- **Firma Bilgileri:** Ad, e-posta, telefon, adres, calisma saatleri
- **Firma Logosu:** Yeni logo yukle
- **Sosyal Medya:** Instagram, LinkedIn, X, Facebook linkleri
- **SEO Varsayilanlari:** Varsayilan baslik, aciklama, anahtar kelimeler
- **Harita:** Iletisim sayfasi Google Maps embed URL'si
- **Blog Kategorileri:** Yeni kategori ekle veya sil
- "Tumunu Kaydet" butonuna tikla

> **NOT:** Ayarlar degistiginde footer, iletisim sayfasi ve sosyal medya linkleri otomatik guncellenir.

---

## 9. Guncelleme Yapma

Kodda degisiklik yaptiktan ve GitHub'a push'ladiktan sonra sunucuyu guncellemek icin:

### Yontem 1: Manuel (Onerilen)

```bash
ssh root@SUNUCU_IP_ADRESI
cd /var/www/nelimuhendislik

# Son kodu cek
git pull origin main

# Bagimliliklari guncelle
bun install

# Frontend'i yeniden build et
bun run build

# Veritabani sema degisikliklerini uygula (varsa)
bunx drizzle-kit push

# Backend'i yeniden baslat
systemctl restart neli
```

### Yontem 2: Script ile

```bash
ssh root@SUNUCU_IP_ADRESI
cd /var/www/nelimuhendislik
bash deploy/deploy.sh
```

### Sadece Backend Degistiyse

```bash
systemctl restart neli
```

### Sadece Frontend Degistiyse

```bash
cd /var/www/nelimuhendislik
bun run build
```

Nginx otomatik olarak yeni `dist/` klasorunu sunar, restart gerekmez.

---

## 10. Yedekleme

### Veritabani Yedegi

Veritabani tek bir dosya: `data.db`. Yedeklemek icin:

```bash
# Yedek al
cp /var/www/nelimuhendislik/data.db /root/backup_$(date +%Y%m%d).db
```

### Yuklenen Gorseller Yedegi

```bash
# uploads klasorunu yedekle
tar -czf /root/uploads_backup_$(date +%Y%m%d).tar.gz /var/www/nelimuhendislik/uploads/
```

### Otomatik Yedekleme (Cron ile)

```bash
crontab -e
```

En alta su satiri ekle (her gece saat 3'te yedek alir):

```
0 3 * * * cp /var/www/nelimuhendislik/data.db /root/backups/data_$(date +\%Y\%m\%d).db && tar -czf /root/backups/uploads_$(date +\%Y\%m\%d).tar.gz /var/www/nelimuhendislik/uploads/ 2>/dev/null
```

Backup klasorunu olusturmayi unutma:

```bash
mkdir -p /root/backups
```

### Yedegi Geri Yukleme

```bash
# Backend'i durdur
systemctl stop neli

# Veritabanini geri yukle
cp /root/backups/data_20260304.db /var/www/nelimuhendislik/data.db

# Gorselleri geri yukle
tar -xzf /root/backups/uploads_20260304.tar.gz -C /

# Backend'i tekrar baslat
systemctl start neli
```

---

## 11. Sorun Giderme

### Backend Calismiyorsa

```bash
# Durumu kontrol et
systemctl status neli

# Son hatalari gor
journalctl -u neli -n 50 --no-pager

# Canli log izle
journalctl -u neli -f
```

### Nginx Calismiyorsa

```bash
# Config dogru mu?
nginx -t

# Nginx durumu
systemctl status nginx

# Nginx hata loglari
tail -50 /var/log/nginx/error.log
```

### Site Acilmiyorsa

1. DNS dogru mu? `ping SENIN_DOMAININ.com` ile kontrol et
2. Nginx calisiyor mu? `systemctl status nginx`
3. Backend calisiyor mu? `systemctl status neli`
4. Backend'e ulasilabiliyor mu? `curl http://localhost:3001/api/health`
5. Firewall port acik mi? `ufw status` (80 ve 443 acik olmali)

Firewall ayarlari:

```bash
ufw allow 80
ufw allow 443
ufw allow 22
ufw enable
```

### Admin Sifresini Unuttuysan

```bash
cd /var/www/nelimuhendislik

# Admin kullaniciyi sil (yeniden olusturabilirsin)
bun -e "
import { Database } from 'bun:sqlite';
const db = new Database('data.db');
db.run('DELETE FROM admin_users');
console.log('Admin kullanici silindi. /panel/login adresine gidip yeni hesap olusturabilirsin.');
"

# Backend'i yeniden baslat
systemctl restart neli
```

Sonra `https://SENIN_DOMAININ.com/panel/login` adresine git ve yeni admin hesabi olustur.

### Disk Dolu Hatalari

```bash
# Disk kullanimini gor
df -h

# En buyuk dosyalari bul
du -sh /var/www/nelimuhendislik/uploads/*

# Eski yedekleri temizle
rm /root/backups/data_2026*.db
rm /root/backups/uploads_2026*.tar.gz
```

### Veritabani Bozulduysa

```bash
cd /var/www/nelimuhendislik

# Backend'i durdur
systemctl stop neli

# Veritabanini yedekle (bozuk haliyle bile)
cp data.db data_bozuk_$(date +%Y%m%d).db

# Yeni bos veritabani olustur
rm data.db
bunx drizzle-kit push

# Isterseniz seed verilerini tekrar yukle
bun run db:seed

# Backend'i baslat
systemctl start neli
```

---

## 12. Onemli Bilgiler ve Guvenlik

### .env Dosyasi

- `.env` dosyasi **ASLA** GitHub'a yuklenmemeli (zaten `.gitignore`'da)
- `JWT_SECRET` guclu ve benzersiz olmali (en az 32 karakter)
- `CORS_ORIGIN` degeri production'da tam domain adresi olmali

### Dosya Yapisi (Neyin Nerede Oldugu)

| Dosya/Klasor | Nerede | Aciklama |
|---|---|---|
| `data.db` | Proje koku | Tum veriler burada (blog, projeler, ayarlar...) |
| `uploads/` | Proje koku | Yuklenen gorseller |
| `dist/` | Proje koku | Build edilmis web sitesi (Nginx bunu sunar) |
| `.env` | Proje koku | Gizli ayarlar |
| Nginx config | `/etc/nginx/sites-available/neli` | Web sunucu ayarlari |
| Systemd servis | `/etc/systemd/system/neli.service` | Backend servis ayarlari |

### Portlar

| Port | Kullanim |
|------|----------|
| 22 | SSH (sunucuya baglanma) |
| 80 | HTTP (otomatik HTTPS'e yonlendirir) |
| 443 | HTTPS (web sitesi) |
| 3001 | Backend API (sadece lokal, disari acik degil) |

### Faydali Komutlar

```bash
# Backend durumu
systemctl status neli

# Backend'i yeniden baslat
systemctl restart neli

# Backend loglarini izle
journalctl -u neli -f

# Nginx'i yeniden yukle (config degisikliginden sonra)
nginx -t && systemctl reload nginx

# Disk kullanimini gor
df -h

# Proje klasor boyutu
du -sh /var/www/nelimuhendislik/

# SSL sertifikasini yenile (otomatik olur ama manuel gerekirse)
certbot renew
```

### Panel URL'leri

| Sayfa | URL |
|-------|-----|
| Giris | `/panel/login` |
| Dashboard | `/panel` |
| Blog Listesi | `/panel/blog` |
| Yeni Blog Yazisi | `/panel/blog/yeni` |
| Blog Duzenle | `/panel/blog/ID` |
| Proje Listesi | `/panel/projeler` |
| Yeni Proje | `/panel/projeler/yeni` |
| Proje Duzenle | `/panel/projeler/ID` |
| Harita Pinleri | `/panel/harita` |
| Medya Kutuphanesi | `/panel/medya` |
| Etkinlik Logu | `/panel/etkinlik` |
| Site Ayarlari | `/panel/ayarlar` |

---

## HIZLI REFERANS

### Ilk Kurulum (Tek Sefer)

```bash
ssh root@SUNUCU_IP
apt update && apt upgrade -y
apt install -y git curl nginx
curl -fsSL https://bun.sh/install | bash && source ~/.bashrc
cd /var/www && git clone <REPO> nelimuhendislik && cd nelimuhendislik
cp .env.example .env && nano .env          # JWT_SECRET ve CORS_ORIGIN doldur
bun install && bun run build
bunx drizzle-kit push && bun run db:seed
mkdir -p uploads/thumbnails && chown -R www-data:www-data uploads/
cp deploy/neli.service /etc/systemd/system/ && systemctl daemon-reload && systemctl enable neli && systemctl start neli
cp deploy/nginx.conf /etc/nginx/sites-available/neli && nano /etc/nginx/sites-available/neli  # domain duzelt
ln -sf /etc/nginx/sites-available/neli /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx && certbot --nginx -d DOMAIN.com -d www.DOMAIN.com
```

### Guncelleme (Her Seferinde)

```bash
ssh root@SUNUCU_IP
cd /var/www/nelimuhendislik
git pull origin main && bun install && bun run build && bunx drizzle-kit push && systemctl restart neli
```
