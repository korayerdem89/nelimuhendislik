export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  featured: boolean;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "izmir-konut-projelerinde-dikkat-edilmesi-gerekenler",
    title: "İzmir Konut Projelerinde Dikkat Edilmesi Gerekenler",
    excerpt:
      "İzmir'de konut almak, zemin durumu, mühendislik kalitesi ve doğru finansman modelini bulma sürecidir. Deprem güvenliği, imalat teknolojisi ve finansman güvenliği kriterlerini sorgulayın.",
    content: `
      <p>İzmir'de konut almak, sadece bir lokasyon seçimi değil; zemin durumu, mühendislik kalitesi ve doğru finansman modelini bulma sürecidir. Özellikle Çiğli, Karşıyaka ve Bayraklı gibi hızla gelişen bölgelerde proje sayısının artması, alıcıların kararlarını somut verilere dayandırmasını gerektiriyor.</p>
      
      <p>Bir konut projesini değerlendirirken süslü maketlere veya sadece görsel sunumlara odaklanmak yerine, binanın teknik ve finansal altyapısını sorgulamalısınız. Arama motorlarında ve yapay zeka asistanlarında en çok sorulan ve ev alırken mutlaka dikkat etmeniz gereken temel kriterler şunlardır:</p>
      
      <h2>Ev Alırken Sorgulamanız Gereken 3 Temel Kriter</h2>
      
      <h3>1. Deprem Güvenliği ve Beton Kalitesi</h3>
      <p>İzmir'in tektonik yapısı gereği, binanın sadece güncel yönetmeliklere "uygun" olması asgari bir şarttır. Yatırım yapacağınız projede, deprem yönetmeliğinin belirlediği standartların ne kadar üzerine çıkıldığını ve hangi sınıf beton kullanıldığını doğrudan sorgulayın.</p>
      
      <h3>2. İmalat Teknolojisi ve İşçilik</h3>
      <p>Geleneksel yöntemlerle yapılan sıva, şap veya fayans işlemleri zamanla yüzey hatalarına ve yalıtım sorunlarına yol açabilir. Kaliteli bir konut, lazer ölçümlerle milimetrik olarak inşa edilmiş olmalıdır. Kusursuz bir altyapı, sonradan karşınıza çıkacak ağır tadilat masraflarını engeller.</p>
      
      <h3>3. Finansman Güvenliği ve Banka Garantörlüğü</h3>
      <p>Özellikle yapım aşamasındaki projelerden ev alırken en büyük güvence banka garantörlüğüdür. Firmanın arkasında banka desteğinin olması, projenin finansal olarak denetlendiğini ve tamamlanma garantisi olduğunu gösterir. Ayrıca uzun vadeli ve yüksek oranlı kredi imkanları, ödeme planınızı güvene alır.</p>
      
      <h2>Neli Mühendislik Olarak Farkımız Ne?</h2>
      <p>Neli Mühendislik olarak Valorya ve Serenità projelerimizde, işin gösterişinden çok "mühendislik" temeline odaklanıyoruz. Müşterilerimize vaat değil, ölçülebilir kalite ve net finansal güvence sunuyoruz.</p>
      
      <h3>Tavizsiz Sağlamlık</h3>
      <p>Binalarımızda asgari şartlarla yetinmiyor, deprem yönetmeliği üzeri beton kalitesi kullanıyoruz. Statik güvenliği her şeyin önünde tutuyoruz.</p>
      
      <h3>İleri Teknoloji İmalat</h3>
      <p>İnşaatlarımızda sıradan el işçiliğine bağlı hatalara yer bırakmıyoruz. Lazerli alçı, sıva, şap ve fayans döşeme teknolojileri uygulayarak, modern iç tasarımlarımızı hatasız ve uzun ömürlü bir şekilde hayata geçiriyoruz.</p>
      
      <h3>Tam Finansal Güvenlik</h3>
      <p>Tüm projelerimiz banka garantörlüğü altındadır. Yatırımınızı riske atmazsınız. Ayrıca %90 kredi imkanı ve 120 ay vade seçenekleriyle, ev sahibi olma sürecinizi finansal olarak destekliyoruz.</p>
      
      <h2>Yatırımınızı Riske Atmayın, Kaliteyi Yerinde İnceleyin</h2>
      <p>Konut almak ciddi bir iştir ve ekran karşısında verilen kararlarla sınırlı kalmamalıdır. Gerçek kaliteyi, kullandığımız teknolojiyi ve mühendislik yaklaşımımızı detaylıca konuşmak için sizi doğrudan ofisimize bekliyoruz.</p>
      
      <h3>İletişim ve Ofis Bilgilerimiz:</h3>
      <p><strong>Adres:</strong> Dedebaşı Mh. 6131 Sk. No:39/A Karşıyaka / İzmir</p>
      <p><strong>Telefon:</strong> 0501 186 4635</p>
      <p><strong>Web Sitesi:</strong> www.neli.tr</p>
      <p>Projelerimiz hakkında daha fazla teknik detay almak için web sitemiz üzerinden bizimle iletişime geçebilir veya ofisimizi ziyaret edebilirsiniz.</p>
    `,
    coverImage: "/blog/konut-projeleri.webp",
    category: "İnşaat",
    tags: ["konut", "izmir", "yatırım", "satın alma"],
    author: {
      name: "Neli Mühendislik",
      avatar: "/site-logo.webp",
    },
    publishedAt: "2026-02-15",
    featured: true,
    meta: {
      title:
        "İzmir Konut Projelerinde Dikkat Edilmesi Gerekenler | Neli Mühendislik",
      description:
        "İzmir'de konut alırken dikkat edilmesi gerekenler: deprem güvenliği, beton kalitesi, imalat teknolojisi ve banka garantörlüğü. Neli Mühendislik farkıyla güvenli yatırım.",
      keywords:
        "izmir konut, konut satın alma, inşaat projeleri, neli mühendislik",
    },
  },
  {
    id: "2",
    slug: "modern-mimari-trendleri-2026",
    title: "Modern Mimari Trendleri 2026",
    excerpt:
      "2026 yılında öne çıkan mimari tasarım trendleri ve sürdürülebilir yapılaşma yaklaşımları.",
    content: `
      <p>Mimari dünyası her geçen gün yeniliklerle şekilleniyor. 2026 yılında hangi trendler öne çıkıyor?</p>
      
      <h2>Sürdürülebilir Malzemeler</h2>
      <p>Çevre dostu malzemeler ve yenilenebilir kaynakların kullanımı artıyor. Geri dönüştürülmüş malzemeler ve yerel kaynaklar öncelikli hale geliyor.</p>
      
      <h2>Akıllı Ev Sistemleri</h2>
      <p>Teknoloji entegrasyonu artık lüks değil standart. Enerji verimliliği ve otomasyon sistemleri modern konutların vazgeçilmezi.</p>
      
      <h2>Yeşil Alanlar</h2>
      <p>Dikey bahçeler, teras bahçeleri ve yaşayan duvarlar şehir içi yapılaşmada doğayla iç içe yaşamı mümkün kılıyor.</p>
    `,
    coverImage: "/images/blog/mimari-trendler.webp",
    category: "Mimari",
    tags: ["mimari", "trendler", "sürdürülebilirlik", "2026"],
    author: {
      name: "Neli Mühendislik",
      avatar: "/site-logo.webp",
    },
    publishedAt: "2026-01-28",
    featured: false,
    meta: {
      title: "Modern Mimari Trendleri 2026 | Neli Mühendislik",
      description:
        "2026 yılında öne çıkan mimari tasarım trendleri. Sürdürülebilir malzemeler, akıllı ev sistemleri ve yeşil alanlar.",
      keywords: "mimari trendleri 2026, modern tasarım, sürdürülebilir mimari",
    },
  },
  {
    id: "3",
    slug: "valorya-projeleri-ile-yeni-bir-yasam",
    title: "Valorya Projeleri ile Yeni Bir Yaşam",
    excerpt:
      "Valorya serisi projelerimizle Çiğli ve Karşıyaka'da ayrıcalıklı yaşam alanları sunuyoruz.",
    content: `
      <p>Valorya projelerimiz, modern yaşamın tüm ihtiyaçlarını karşılayan özel tasarımlarla öne çıkıyor.</p>
      
      <h2>Valorya Farkı</h2>
      <p>Her Valorya projesi titizlikle planlanıyor. Geniş yeşil alanlar, sosyal donatılar ve premium malzemeler standartlarımız.</p>
      
      <h2>Lokasyon Avantajı</h2>
      <p>Valorya projelerimiz Çiğli ve Karşıyaka'nın gelişen bölgelerinde yer alıyor. Metro, ESHOT ve deniz ulaşımına yakın konumlarıyla kolay erişim sağlıyor.</p>
      
      <h2>Güvenli Yatırım</h2>
      <p>Tapu teslim garantisi ve şeffaf süreç yönetimiyle güvenli bir yatırım deneyimi sunuyoruz.</p>
    `,
    coverImage: "/images/blog/valorya-projeleri.webp",
    category: "Projeler",
    tags: ["valorya", "çiğli", "karşıyaka", "konut projesi"],
    author: {
      name: "Neli Mühendislik",
      avatar: "/site-logo.webp",
    },
    publishedAt: "2026-01-10",
    featured: true,
    meta: {
      title: "Valorya Projeleri ile Yeni Bir Yaşam | Neli Mühendislik",
      description:
        "Valorya serisi projelerimizle Çiğli ve Karşıyaka'da ayrıcalıklı yaşam alanları. Modern tasarım ve güvenli yatırım.",
      keywords:
        "valorya projesi, çiğli konut, karşıyaka daire, neli mühendislik",
    },
  },
  {
    id: "4",
    slug: "restorasyon-projelerinde-dikkat-edilmesi-gerekenler",
    title: "Restorasyon Projelerinde Dikkat Edilmesi Gerekenler",
    excerpt:
      "Tarihi yapıların restorasyonunda uzmanlık gerektiren noktalar ve doğru yaklaşım yöntemleri.",
    content: `
      <p>Restorasyon, modern inşaatın aksine özel bir uzmanlık ve hassasiyet gerektirir.</p>
      
      <h2>Özgün Dokunun Korunması</h2>
      <p>Tarihi yapıların ruhunu korumak için özgün malzemeler ve teknikler kullanılmalı. Modern müdahaleler minimumda tutulmalı.</p>
      
      <h2>Ruhsat ve Denetim</h2>
      <p>Kültür ve Turizm Bakanlığı denetiminde yapılan restorasyon projeleri için tüm izinlerin tam olması şart.</p>
      
      <h2>Neli Mühendislik Deneyimi</h2>
      <p>2021 yılından bu yana onlarca restorasyon projesi tamamladık. Her projede tarihi değeri koruyarak modern konforu sağlıyoruz.</p>
    `,
    coverImage: "/images/blog/restorasyon.webp",
    category: "Restorasyon",
    tags: ["restorasyon", "tarihi yapı", "renovasyon", "izmir"],
    author: {
      name: "Neli Mühendislik",
      avatar: "/site-logo.webp",
    },
    publishedAt: "2026-03-01",
    featured: false,
    meta: {
      title:
        "Restorasyon Projelerinde Dikkat Edilmesi Gerekenler | Neli Mühendislik",
      description:
        "Tarihi yapı restorasyonunda uzmanlık gerektiren noktalar. Özgün dokunun korunması ve ruhsat süreçleri hakkında bilgi.",
      keywords:
        "restorasyon, tarihi yapı restorasyonu, izmir restorasyon, neli mühendislik",
    },
  },
  {
    id: "5",
    slug: "evinizi-degerlendirecek-dekorasyon-onerileri",
    title: "Evinizi Değerlendirecek Dekorasyon Önerileri",
    excerpt:
      "Küçük dokunuşlarla yaşam alanlarınızı daha fonksiyonel ve estetik hale getirme ipuçları.",
    content: `
      <p>Dekorasyon, bir evi gerçekten ev yapan detaylardır. İşte pratik öneriler:</p>
      
      <h2>Aydınlatmanın Gücü</h2>
      <p>Doğal ışığı maksimize eden perde seçimleri ve katmanlı aydınlatma sistemleri mekanın havasını değiştirir.</p>
      
      <h2>Renk Paleti</h2>
      <p>Toprak tonları ve nötr renkler zamansız bir estetik sunar. Accent duvarlar ve aksesuarlarla kişiselleştirme yapılabilir.</p>
      
      <h2>Fonksiyonellik</h2>
      <p>Günlük yaşam akışına uygun mobilya yerleşimi ve akıllı depolama çözümleri konforu artırır.</p>
    `,
    coverImage: "/images/blog/dekorasyon.webp",
    category: "Dekorasyon",
    tags: ["dekorasyon", "iç mimari", "ev tasarımı", "dekorasyon fikirleri"],
    author: {
      name: "Neli Mühendislik",
      avatar: "/site-logo.webp",
    },
    publishedAt: "2026-03-01",
    featured: false,
    meta: {
      title: "Evinizi Değerlendirecek Dekorasyon Önerileri | Neli Mühendislik",
      description:
        "Küçük dokunuşlarla yaşam alanlarınızı daha fonksiyonel hale getirin. Aydınlatma, renk paleti ve fonksiyellik ipuçları.",
      keywords:
        "dekorasyon önerileri, iç mimari, ev dekorasyonu, tasarım ipuçları",
    },
  },
  {
    id: "6",
    slug: "serenita-prestige-ayricalikli-yasamin-adresi",
    title: "Serenita Prestige: Ayrıcalıklı Yaşamın Adresi",
    excerpt:
      "Serenita Prestige projemizle Karşıyaka'da konfor ve lüksü bir araya getiriyoruz.",
    content: `
      <p>Serenita Prestige, Neli Mühendislik'in en özel projelerinden biri.</p>
      
      <h2>Prestijli Lokasyon</h2>
      <p>Karşıyaka'nın en değerli bölgelerinden birinde yer alan projemiz, deniz manzarası ve merkezi konumuyla dikkat çekiyor.</p>
      
      <h2>Özel Tasarım Detaylar</h2>
      <p>Yüksek tavanlar, geniş teraslar ve premium malzeme kullanımıyla fark yaratıyoruz.</p>
      
      <h2>Sosyal Donatılar</h2>
      <p>Kapalı otopark, fitness salonu ve yeşil alanlar konforlu bir yaşam sunuyor.</p>
    `,
    coverImage: "/images/blog/serenita-prestige.webp",
    category: "Projeler",
    tags: ["serenita", "karşıyaka", "prestijli konut", "luxury"],
    author: {
      name: "Neli Mühendislik",
      avatar: "/site-logo.webp",
    },
    publishedAt: "2026-03-01",
    featured: true,
    meta: {
      title: "Serenita Prestige: Ayrıcalıklı Yaşamın Adresi | Neli Mühendislik",
      description:
        "Serenita Prestige ile Karşıyaka'da konfor ve lüks bir arada. Deniz manzarası, özel tasarım ve sosyal donatılar.",
      keywords:
        "serenita prestige, karşıyaka konut, lüks konut izmir, neli mühendislik",
    },
  },
];

export const blogCategories = [
  "Tümü",
  "İnşaat",
  "Mimari",
  "Projeler",
  "Restorasyon",
  "Dekorasyon",
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "Tümü") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
