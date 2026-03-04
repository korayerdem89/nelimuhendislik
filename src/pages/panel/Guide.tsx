import { useState } from "react";
import {
  ChevronDown,
  Server,
  Layout,
  FolderTree,
  Monitor,
  Globe,
  Lock,
  LogIn,
  Sliders,
  RefreshCw,
  Database,
  AlertTriangle,
  Shield,
  Terminal,
  Copy,
  Check,
} from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
      title="Kopyala"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function CodeBlock({ children, copyText }: { children: string; copyText?: string }) {
  const text = copyText || children;
  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto font-mono leading-relaxed">
        <code>{children}</code>
      </pre>
      <CopyButton text={text.trim()} />
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  id,
  children,
  defaultOpen = false,
}: {
  icon: typeof Server;
  title: string;
  id: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
        id={id}
      >
        <div className="p-2 rounded-lg bg-gray-100 text-gray-600 flex-shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-semibold text-gray-900 flex-1">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 prose prose-sm max-w-none prose-gray">
          {children}
        </div>
      )}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {headers.map((h) => (
              <th key={h} className="text-left px-3 py-2 font-medium text-gray-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
      <span className="flex-shrink-0 font-bold">NOT:</span>
      <span>{children}</span>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

export default function Guide() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Kurulum ve Yönetim Rehberi
        </h1>
        <p className="text-sm text-gray-500">
          VPS kurulumu, admin paneli kullanımı, güncelleme ve yedekleme — her şey adım adım.
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. Proje Nedir */}
        <Section icon={Layout} title="1. Proje Nedir, Ne Yapar?" id="nedir" defaultOpen>
          <p className="text-gray-600 mb-4">Bu proje iki parçadan oluşur:</p>
          <Table
            headers={["Parça", "Teknoloji", "Ne Yapar?"]}
            rows={[
              ["Web Sitesi (Frontend)", "React + Vite", "Kullanıcıların gördüğü site (ana sayfa, projeler, blog, iletişim vs.)"],
              ["Backend (Sunucu)", "Hono + Bun", "Admin paneli API'si, veritabanı, resim yükleme işlemlerini yapar"],
              ["Veritabanı", "SQLite", "Blog yazıları, projeler, harita pinleri, ayarlar burada tutulur"],
              ["Admin Paneli", "React (aynı proje içinde)", "/panel adresinden ulaşılan yönetim ekranı"],
            ]}
          />
          <p className="text-gray-600 mt-3">Yani tek bir proje içinde hem web sitesi hem de yönetim paneli var.</p>
        </Section>

        {/* 2. Proje Yapısı */}
        <Section icon={FolderTree} title="2. Projenin Yapısı (Dosya ve Klasörler)" id="yapi">
          <CodeBlock>{`nelimuhendislik/
├── src/                    ← Web sitesi + Admin paneli (React)
│   ├── pages/              ← Sayfa bileşenleri (Home, Blog, Projects...)
│   ├── pages/panel/        ← Admin panel sayfaları
│   ├── components/         ← Ortak bileşenler
│   ├── data/               ← API'den veri çekme fonksiyonları
│   ├── hooks/              ← React hook'ları (auth, settings)
│   └── lib/                ← API istemcisi (api.ts)
│
├── server/                 ← Backend (Hono sunucu)
│   ├── index.ts            ← Ana sunucu dosyası
│   ├── db/
│   │   ├── schema.ts       ← Veritabanı tablo yapıları
│   │   ├── index.ts        ← Veritabanı bağlantısı
│   │   └── seed.ts         ← Örnek veri yükleme scripti
│   ├── routes/             ← API endpoint'leri
│   ├── middleware/          ← Auth kontrolü (JWT)
│   └── lib/                ← Yardımcı fonksiyonlar
│
├── deploy/                 ← Sunucu kurulum dosyaları
│   ├── nginx.conf          ← Nginx ayarları
│   ├── neli.service        ← Systemd servis dosyası
│   ├── setup.sh            ← İlk kurulum scripti
│   └── deploy.sh           ← Güncelleme scripti
│
├── uploads/                ← Yüklenen görseller
├── dist/                   ← Build sonrası oluşur
├── data.db                 ← SQLite veritabanı dosyası
├── .env                    ← Gizli ayarlar (şifreler, anahtarlar)
└── package.json            ← Proje bağımlılıkları ve komutlar`}</CodeBlock>
        </Section>

        {/* 3. Lokal Çalıştırma */}
        <Section icon={Monitor} title="3. Bilgisayarında Geliştirme (Lokal Çalıştırma)" id="lokal">
          <p className="text-gray-600 mb-3">Bilgisayarında test etmek için:</p>
          <h4 className="font-medium text-gray-900 mb-2">Gereksinimler</h4>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
            <li><strong>Bun</strong> kurulu olmalı: <a href="https://bun.sh" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">bun.sh</a></li>
            <li><strong>Git</strong> kurulu olmalı</li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">Adımlar</h4>
          <CodeBlock>{`# 1. Projeyi klonla
git clone <REPO_URL> nelimuhendislik
cd nelimuhendislik

# 2. Bağımlılıkları yükle
bun install

# 3. .env dosyasını oluştur
cp .env.example .env`}</CodeBlock>

          <p className="text-gray-600 my-3"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.env</code> dosyasını aç ve içini doldur:</p>
          <CodeBlock>{`VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
VITE_API_URL=
JWT_SECRET=herhangi-bir-gizli-anahtar-yaz-buraya
PORT=3001
CORS_ORIGIN=http://localhost:5173`}</CodeBlock>

          <Tip>VITE_API_URL boş bırakılmalı (lokal geliştirmede Vite proxy kullanıyor).</Tip>

          <CodeBlock>{`# 4. Veritabanı tablolarını oluştur
bunx drizzle-kit push

# 5. Örnek verileri yükle (ilk seferde)
bun run db:seed

# 6. Backend'i başlat (Terminal 1)
bun run dev:server

# 7. Frontend'i başlat (Terminal 2)
bun run dev`}</CodeBlock>

          <div className="mt-3">
            <Table
              headers={["Sayfa", "Adres"]}
              rows={[
                ["Web sitesi", "http://localhost:5173"],
                ["Admin paneli", "http://localhost:5173/panel/login"],
              ]}
            />
          </div>
        </Section>

        {/* 4. VPS Seçimi */}
        <Section icon={Server} title="4. VPS Sunucu Seçimi" id="vps">
          <h4 className="font-medium text-gray-900 mb-2">Önerilen Sağlayıcılar</h4>
          <Table
            headers={["Sağlayıcı", "Minimum Plan", "Aylık Fiyat"]}
            rows={[
              ["Hetzner", "CX22 (2 CPU, 4GB RAM)", "~€4-5"],
              ["Contabo", "VPS S (4 CPU, 8GB RAM)", "~€5-6"],
              ["DigitalOcean", "Basic (1 CPU, 2GB RAM)", "~$6"],
              ["Türk Sağlayıcılar", "Turhost, Natro vs.", "Değişken"],
            ]}
          />

          <h4 className="font-medium text-gray-900 mt-4 mb-2">Minimum Gereksinimler</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>OS:</strong> Ubuntu 22.04 veya 24.04 LTS</li>
            <li><strong>RAM:</strong> En az 1GB (2GB önerilen)</li>
            <li><strong>Disk:</strong> En az 20GB SSD</li>
            <li><strong>CPU:</strong> 1 vCPU yeterli</li>
          </ul>

          <Tip>Hetzner CX22 fiyat/performans olarak en iyi seçenektir.</Tip>
        </Section>

        {/* 5. VPS Kurulum */}
        <Section icon={Terminal} title="5. VPS'e İlk Kurulum (Sıfırdan)" id="kurulum">
          <p className="text-gray-600 mb-3">VPS'ini aldıktan sonra SSH ile bağlan:</p>
          <CodeBlock>ssh root@SUNUCU_IP_ADRESI</CodeBlock>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 1: Sistemi Güncelle</h4>
          <CodeBlock>apt update && apt upgrade -y</CodeBlock>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 2: Gerekli Yazılımları Kur</h4>
          <CodeBlock>{`# Git, Curl, Nginx kur
apt install -y git curl nginx

# Bun kur
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Bun'ın kurulduğundan emin ol
bun --version`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 3: Projeyi Sunucuya Yükle</h4>
          <CodeBlock>{`mkdir -p /var/www/nelimuhendislik
cd /var/www/nelimuhendislik
git clone <REPO_URL> .`}</CodeBlock>
          <Tip>{"<REPO_URL>"} yerine kendi GitHub/GitLab repo adresini yaz. Repo private ise SSH key veya personal access token kullanman gerekir.</Tip>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 4: .env Dosyasını Ayarla</h4>
          <CodeBlock>{`cp .env.example .env
nano .env`}</CodeBlock>
          <p className="text-gray-600 my-2">İçeriği şu şekilde doldur:</p>
          <CodeBlock>{`VITE_WEB3FORMS_ACCESS_KEY=gercek_web3forms_anahtarin
VITE_API_URL=
JWT_SECRET=BURAYA_COK_GUCLU_BIR_ANAHTAR_YAZ
PORT=3001
CORS_ORIGIN=https://SENIN_DOMAININ.com`}</CodeBlock>
          <p className="text-gray-600 my-2">JWT_SECRET için güçlü bir anahtar oluştur:</p>
          <CodeBlock>openssl rand -hex 32</CodeBlock>
          <p className="text-gray-600 my-2">Çıktıyı kopyala, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">JWT_SECRET=</code> satırına yapıştır. Dosyayı kaydet: <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs border">Ctrl+O</kbd> → <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs border">Enter</kbd> → <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-xs border">Ctrl+X</kbd></p>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 5: Bağımlılıkları Yükle ve Build Et</h4>
          <CodeBlock>{`bun install
bun run build`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 6: Veritabanını Oluştur</h4>
          <CodeBlock>{`bunx drizzle-kit push
bun run db:seed`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 7: Görseller İçin Klasör Oluştur</h4>
          <CodeBlock>{`mkdir -p uploads/thumbnails
chown -R www-data:www-data uploads/`}</CodeBlock>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 8: Backend Servisini Kur</h4>
          <p className="text-gray-600 mb-2">Backend'in sunucu her açıldığında otomatik başlaması için:</p>
          <CodeBlock>{`cp deploy/neli.service /etc/systemd/system/neli.service`}</CodeBlock>
          <p className="text-gray-600 my-2">Bun yolunu doğrula ve servisi düzenle:</p>
          <CodeBlock>{`which bun
nano /etc/systemd/system/neli.service`}</CodeBlock>
          <p className="text-gray-600 my-2"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">ExecStart</code> satırındaki bun yolunun <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">which bun</code> çıktısıyla aynı olduğundan emin ol. Sonra başlat:</p>
          <CodeBlock>{`systemctl daemon-reload
systemctl enable neli
systemctl start neli`}</CodeBlock>
          <p className="text-gray-600 my-2">Kontrol et:</p>
          <CodeBlock>{`systemctl status neli
curl http://localhost:3001/api/health`}</CodeBlock>
          <p className="text-gray-600 my-1">Yeşil "active (running)" yazmalı. curl komutu <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{`{"status":"ok"}`}</code> dönmeli.</p>

          <h4 className="font-semibold text-gray-900 mt-5 mb-2">Adım 9: Nginx'i Ayarla</h4>
          <CodeBlock>{`cp deploy/nginx.conf /etc/nginx/sites-available/neli
nano /etc/nginx/sites-available/neli`}</CodeBlock>
          <p className="text-gray-600 my-2"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">server_name</code> satırlarında <strong>kendi domainini</strong> yaz. Sonra aktif et:</p>
          <CodeBlock>{`ln -sf /etc/nginx/sites-available/neli /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx`}</CodeBlock>
          <p className="text-gray-600 my-1"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">nginx -t</code> "test is successful" diyorsa her şey doğru.</p>
        </Section>

        {/* 6. Domain ve SSL */}
        <Section icon={Globe} title="6. Domain Bağlama ve SSL (HTTPS)" id="domain">
          <h4 className="font-medium text-gray-900 mb-2">Domain DNS Ayarları</h4>
          <p className="text-gray-600 mb-3">Domain sağlayıcında (GoDaddy, Namecheap, Cloudflare vs.) şunları ekle:</p>
          <Table
            headers={["Tip", "Ad", "Değer"]}
            rows={[
              ["A", "@", "SUNUCU_IP_ADRESI"],
              ["A", "www", "SUNUCU_IP_ADRESI"],
            ]}
          />
          <p className="text-gray-600 mt-3 mb-1">DNS yayılımı 5 dakika ile 24 saat arasında sürebilir. Genelde 10-30 dakikada olur.</p>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">SSL Sertifikası (HTTPS)</h4>
          <p className="text-gray-600 mb-2">DNS yayıldıktan sonra:</p>
          <CodeBlock>{`apt install -y certbot python3-certbot-nginx
certbot --nginx -d SENIN_DOMAININ.com -d www.SENIN_DOMAININ.com`}</CodeBlock>
          <p className="text-gray-600 mt-2">E-posta adresini gir, şartları kabul et. Tarayıcıda <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">https://SENIN_DOMAININ.com</code> aç — kilit ikonu görünmeli.</p>
          <Tip>SSL sertifikası 90 günde bir yenilenir. Certbot bunu otomatik yapar.</Tip>
        </Section>

        {/* 7. Panel Giriş */}
        <Section icon={LogIn} title="7. Admin Paneline Giriş" id="giris">
          <h4 className="font-medium text-gray-900 mb-2">İlk Giriş (Admin Hesabı Oluşturma)</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
            <li>Tarayıcını aç</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">https://SENIN_DOMAININ.com/panel/login</code> adresine git</li>
            <li><strong>İlk girişte</strong> ekranda "Admin Hesabı Oluştur" yazısını göreceksin</li>
            <li>Bir <strong>kullanıcı adı</strong> ve <strong>şifre</strong> belirle (şifre en az 6 karakter)</li>
            <li>"Hesap Oluştur" butonuna tıkla</li>
          </ol>
          <Tip>Bu işlem sadece bir kez yapılır. Artık bu bilgilerle giriş yapabilirsin.</Tip>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Sonraki Girişler</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">https://SENIN_DOMAININ.com/panel/login</code> adresine git</li>
            <li>Kullanıcı adı ve şifreni gir</li>
            <li>"Giriş Yap" butonuna tıkla</li>
          </ol>
          <Warning>Şifreni unutma! Şifre sıfırlama ekranı henüz yok. Şifreni unutursan "Sorun Giderme" bölümüne bak.</Warning>
        </Section>

        {/* 8. Panel Kullanımı */}
        <Section icon={Sliders} title="8. Admin Panelini Kullanma" id="kullanim">
          <p className="text-gray-600 mb-4">Giriş yaptıktan sonra sol tarafta bir menü göreceksin:</p>

          <h4 className="font-semibold text-gray-900 mb-2">Dashboard</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            <li>Toplam blog, proje, pin, medya sayıları</li>
            <li>Son yapılan işlemler (etkinlik logu)</li>
            <li>Hızlı işlem linkleri</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mb-2">Blog Yazıları</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
            <li><strong>Yeni Yazı:</strong> "Yeni Yazı" butonuna tıkla</li>
            <li><strong>Başlık</strong> yaz → URL otomatik oluşur (Türkçe karakterler otomatik çevrilir)</li>
            <li><strong>Özet</strong> yaz (liste sayfasında görüntülenir)</li>
            <li><strong>İçerik:</strong> HTML olarak yaz. Desteklenen etiketler: h2, h3, p, strong, em, ul, ol, li</li>
            <li><strong>Kapak görseli</strong> yükle (1:1 oran, ön izleme gösterilir)</li>
            <li><strong>Kategori</strong> seç, <strong>etiketler</strong> virgülle ayırarak yaz</li>
            <li><strong>Durum:</strong> "Taslak" veya "Yayında" seç. Taslak yazılar sitede görünmez</li>
            <li><strong>SEO ayarları:</strong> Meta başlık, açıklama ve anahtar kelimeler</li>
          </ul>
          <Tip>Blog listesinde checkbox'ları işaretleyerek birden fazla yazıyı aynı anda yayınla, taslağa al veya sil.</Tip>

          <h4 className="font-semibold text-gray-900 mt-4 mb-2">Projeler</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
            <li>Temel bilgileri gir (ad, lokasyon, yıl, tip, durum)</li>
            <li>Proje detayları (mahalle, ilçe, şehir, daire tipleri, öne çıkan özellikler)</li>
            <li>İnşaat aşamalarını güncelle (Bekliyor / Devam Ediyor / Tamamlandı)</li>
            <li>Kapak görseli ve lokasyon haritası görseli yükle</li>
          </ul>
          <Tip>Proje kartlarında checkbox'lar ile birden fazla projenin durumunu değiştir veya sil.</Tip>

          <h4 className="font-semibold text-gray-900 mt-4 mb-2">Harita Pinleri</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
            <li>"Yeni Pin" butonuna tıkla</li>
            <li>Pin adı, mahalle, ilçe bilgilerini gir</li>
            <li><strong>Haritaya tıklayarak</strong> koordinat seç (enlem/boylam otomatik dolar)</li>
            <li>Görsel URL'si ve link ekle</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mt-4 mb-2">Medya Kütüphanesi</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
            <li>Görselleri sürükle-bırak veya "Görsel Yükle" butonuyla yükle</li>
            <li>Birden fazla görsel aynı anda yüklenebilir</li>
            <li>Yüklenen görseller otomatik olarak WebP'ye dönüştürülür ve thumbnail oluşturulur</li>
            <li>Görsel yolunu kopyalamak için kopyala ikonuna tıkla</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mt-4 mb-2">Etkinlik Logu</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
            <li>Panelde yapılan tüm işlemler burada listelenir</li>
            <li>Kim, ne zaman, ne yaptı görebilirsin</li>
          </ul>

          <h4 className="font-semibold text-gray-900 mt-4 mb-2">Site Ayarları</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
            <li><strong>Firma Bilgileri:</strong> Ad, e-posta, telefon, adres, çalışma saatleri</li>
            <li><strong>Firma Logosu:</strong> Yeni logo yükle</li>
            <li><strong>Sosyal Medya:</strong> Instagram, LinkedIn, X, Facebook linkleri</li>
            <li><strong>SEO Varsayılanları:</strong> Varsayılan başlık, açıklama, anahtar kelimeler</li>
            <li><strong>Harita:</strong> İletişim sayfası Google Maps embed URL'si</li>
            <li><strong>Blog Kategorileri:</strong> Yeni kategori ekle veya sil</li>
          </ul>
          <Tip>Ayarlar değiştiğinde footer, iletişim sayfası ve sosyal medya linkleri otomatik güncellenir.</Tip>
        </Section>

        {/* 9. Güncelleme */}
        <Section icon={RefreshCw} title="9. Güncelleme Yapma (Yeni Kod Yükleme)" id="guncelleme">
          <h4 className="font-medium text-gray-900 mb-2">Manuel Güncelleme (Önerilen)</h4>
          <CodeBlock>{`ssh root@SUNUCU_IP_ADRESI
cd /var/www/nelimuhendislik

git pull origin main
bun install
bun run build
bunx drizzle-kit push
systemctl restart neli`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Script ile Güncelleme</h4>
          <CodeBlock>{`ssh root@SUNUCU_IP_ADRESI
cd /var/www/nelimuhendislik
bash deploy/deploy.sh`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Kısmi Güncellemeler</h4>
          <Table
            headers={["Durum", "Komut"]}
            rows={[
              ["Sadece backend değiştiyse", "systemctl restart neli"],
              ["Sadece frontend değiştiyse", "bun run build"],
            ]}
          />
          <Tip>Frontend değişikliklerinde Nginx restart gerekmez, yeni dist/ klasörünü otomatik sunar.</Tip>
        </Section>

        {/* 10. Yedekleme */}
        <Section icon={Database} title="10. Yedekleme" id="yedekleme">
          <h4 className="font-medium text-gray-900 mb-2">Veritabanı Yedeği</h4>
          <p className="text-gray-600 mb-2">Veritabanı tek bir dosya: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">data.db</code></p>
          <CodeBlock>cp /var/www/nelimuhendislik/data.db /root/backup_$(date +%Y%m%d).db</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Görseller Yedeği</h4>
          <CodeBlock>tar -czf /root/uploads_backup_$(date +%Y%m%d).tar.gz /var/www/nelimuhendislik/uploads/</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Otomatik Yedekleme (Cron ile)</h4>
          <CodeBlock>{`mkdir -p /root/backups
crontab -e`}</CodeBlock>
          <p className="text-gray-600 my-2">En alta şu satırı ekle (her gece saat 3'te yedek alır):</p>
          <CodeBlock>{`0 3 * * * cp /var/www/nelimuhendislik/data.db /root/backups/data_$(date +\\%Y\\%m\\%d).db && tar -czf /root/backups/uploads_$(date +\\%Y\\%m\\%d).tar.gz /var/www/nelimuhendislik/uploads/ 2>/dev/null`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Yedeği Geri Yükleme</h4>
          <CodeBlock>{`systemctl stop neli
cp /root/backups/data_20260304.db /var/www/nelimuhendislik/data.db
tar -xzf /root/backups/uploads_20260304.tar.gz -C /
systemctl start neli`}</CodeBlock>
        </Section>

        {/* 11. Sorun Giderme */}
        <Section icon={AlertTriangle} title="11. Sorun Giderme" id="sorun">
          <h4 className="font-medium text-gray-900 mb-2">Backend Çalışmıyorsa</h4>
          <CodeBlock>{`systemctl status neli
journalctl -u neli -n 50 --no-pager
journalctl -u neli -f`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Nginx Çalışmıyorsa</h4>
          <CodeBlock>{`nginx -t
systemctl status nginx
tail -50 /var/log/nginx/error.log`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Site Açılmıyorsa — Kontrol Listesi</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-1 mb-4">
            <li>DNS doğru mu? → <code className="bg-gray-100 px-1 rounded text-sm">ping SENIN_DOMAININ.com</code></li>
            <li>Nginx çalışıyor mu? → <code className="bg-gray-100 px-1 rounded text-sm">systemctl status nginx</code></li>
            <li>Backend çalışıyor mu? → <code className="bg-gray-100 px-1 rounded text-sm">systemctl status neli</code></li>
            <li>Backend'e ulaşılıyor mu? → <code className="bg-gray-100 px-1 rounded text-sm">curl http://localhost:3001/api/health</code></li>
            <li>Firewall portları açık mı? → <code className="bg-gray-100 px-1 rounded text-sm">ufw status</code></li>
          </ol>
          <p className="text-gray-600 mb-2">Firewall ayarları:</p>
          <CodeBlock>{`ufw allow 80
ufw allow 443
ufw allow 22
ufw enable`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Admin Şifresini Unuttuysan</h4>
          <CodeBlock>{`cd /var/www/nelimuhendislik

bun -e "
import { Database } from 'bun:sqlite';
const db = new Database('data.db');
db.run('DELETE FROM admin_users');
console.log('Admin silindi. /panel/login adresine git ve yeni hesap oluştur.');
"

systemctl restart neli`}</CodeBlock>
          <p className="text-gray-600 mt-2">Sonra <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">/panel/login</code> adresine git ve yeni admin hesabı oluştur.</p>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Veritabanı Bozulduysa</h4>
          <CodeBlock>{`systemctl stop neli
cp data.db data_bozuk_$(date +%Y%m%d).db
rm data.db
bunx drizzle-kit push
bun run db:seed
systemctl start neli`}</CodeBlock>
        </Section>

        {/* 12. Güvenlik */}
        <Section icon={Shield} title="12. Önemli Bilgiler ve Güvenlik" id="guvenlik">
          <h4 className="font-medium text-gray-900 mb-2">.env Dosyası</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            <li><code className="bg-gray-100 px-1 rounded text-sm">.env</code> dosyası <strong>ASLA</strong> GitHub'a yüklenmemeli (zaten .gitignore'da)</li>
            <li><code className="bg-gray-100 px-1 rounded text-sm">JWT_SECRET</code> güçlü ve benzersiz olmalı (en az 32 karakter)</li>
            <li><code className="bg-gray-100 px-1 rounded text-sm">CORS_ORIGIN</code> production'da tam domain adresi olmalı</li>
          </ul>

          <h4 className="font-medium text-gray-900 mb-2">Dosya Konumları</h4>
          <Table
            headers={["Dosya/Klasör", "Konum", "Açıklama"]}
            rows={[
              ["data.db", "Proje kökü", "Tüm veriler (blog, projeler, ayarlar...)"],
              ["uploads/", "Proje kökü", "Yüklenen görseller"],
              ["dist/", "Proje kökü", "Build edilmiş web sitesi"],
              [".env", "Proje kökü", "Gizli ayarlar"],
              ["Nginx config", "/etc/nginx/sites-available/neli", "Web sunucu ayarları"],
              ["Systemd servis", "/etc/systemd/system/neli.service", "Backend servis ayarları"],
            ]}
          />

          <h4 className="font-medium text-gray-900 mt-4 mb-2">Portlar</h4>
          <Table
            headers={["Port", "Kullanım"]}
            rows={[
              ["22", "SSH (sunucuya bağlanma)"],
              ["80", "HTTP (otomatik HTTPS'e yönlendirir)"],
              ["443", "HTTPS (web sitesi)"],
              ["3001", "Backend API (sadece lokal, dışarı açık değil)"],
            ]}
          />

          <h4 className="font-medium text-gray-900 mt-4 mb-2">Faydalı Komutlar</h4>
          <CodeBlock>{`systemctl status neli          # Backend durumu
systemctl restart neli         # Backend yeniden başlat
journalctl -u neli -f          # Backend loglarını izle
nginx -t && systemctl reload nginx  # Nginx yeniden yükle
df -h                          # Disk kullanımı
du -sh /var/www/nelimuhendislik/    # Proje klasör boyutu
certbot renew                  # SSL sertifikasını yenile`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-4 mb-2">Panel URL'leri</h4>
          <Table
            headers={["Sayfa", "URL"]}
            rows={[
              ["Giriş", "/panel/login"],
              ["Dashboard", "/panel"],
              ["Blog Listesi", "/panel/blog"],
              ["Yeni Blog Yazısı", "/panel/blog/yeni"],
              ["Proje Listesi", "/panel/projeler"],
              ["Yeni Proje", "/panel/projeler/yeni"],
              ["Harita Pinleri", "/panel/harita"],
              ["Medya Kütüphanesi", "/panel/medya"],
              ["Etkinlik Logu", "/panel/etkinlik"],
              ["Site Ayarları", "/panel/ayarlar"],
              ["Rehber (bu sayfa)", "/panel/rehber"],
            ]}
          />
        </Section>

        {/* Hızlı Referans */}
        <Section icon={Lock} title="Hızlı Referans (Kopyala-Yapıştır)" id="hizli">
          <h4 className="font-medium text-gray-900 mb-2">İlk Kurulum (Tek Sefer)</h4>
          <CodeBlock copyText={`ssh root@SUNUCU_IP
apt update && apt upgrade -y
apt install -y git curl nginx
curl -fsSL https://bun.sh/install | bash && source ~/.bashrc
cd /var/www && git clone <REPO> nelimuhendislik && cd nelimuhendislik
cp .env.example .env && nano .env
bun install && bun run build
bunx drizzle-kit push && bun run db:seed
mkdir -p uploads/thumbnails && chown -R www-data:www-data uploads/
cp deploy/neli.service /etc/systemd/system/ && systemctl daemon-reload && systemctl enable neli && systemctl start neli
cp deploy/nginx.conf /etc/nginx/sites-available/neli && nano /etc/nginx/sites-available/neli
ln -sf /etc/nginx/sites-available/neli /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx && certbot --nginx -d DOMAIN.com -d www.DOMAIN.com`}>{`ssh root@SUNUCU_IP
apt update && apt upgrade -y
apt install -y git curl nginx
curl -fsSL https://bun.sh/install | bash && source ~/.bashrc
cd /var/www && git clone <REPO> nelimuhendislik && cd nelimuhendislik
cp .env.example .env && nano .env          # JWT_SECRET ve CORS_ORIGIN doldur
bun install && bun run build
bunx drizzle-kit push && bun run db:seed
mkdir -p uploads/thumbnails && chown -R www-data:www-data uploads/
cp deploy/neli.service /etc/systemd/system/ && systemctl daemon-reload && systemctl enable neli && systemctl start neli
cp deploy/nginx.conf /etc/nginx/sites-available/neli && nano /etc/nginx/sites-available/neli  # domain düzelt
ln -sf /etc/nginx/sites-available/neli /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx && certbot --nginx -d DOMAIN.com -d www.DOMAIN.com`}</CodeBlock>

          <h4 className="font-medium text-gray-900 mt-5 mb-2">Güncelleme (Her Seferinde)</h4>
          <CodeBlock copyText="ssh root@SUNUCU_IP\ncd /var/www/nelimuhendislik\ngit pull origin main && bun install && bun run build && bunx drizzle-kit push && systemctl restart neli">{`ssh root@SUNUCU_IP
cd /var/www/nelimuhendislik
git pull origin main && bun install && bun run build && bunx drizzle-kit push && systemctl restart neli`}</CodeBlock>
        </Section>
      </div>
    </div>
  );
}
