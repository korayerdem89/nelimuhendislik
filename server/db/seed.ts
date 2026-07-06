import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { eq, inArray } from "drizzle-orm";
import { resolve } from "path";
import { PROJECT_ROOT } from "../paths.js";
import {
  blogPosts,
  projects,
  mapPins,
  siteSettings,
  milestones,
} from "./schema.js";
import { PERSIAN_PROPERTY_TURKEY_BLOG_HTML } from "./blog-fa-html.js";
import { ARABIC_GULF_REAL_ESTATE_TURKEY_BLOG_HTML } from "./blog-ar-html.js";
import { TURKISH_IZMIR_KONUT_MUHENDISLIK_BLOG_HTML } from "./blog-tr-izmir-konut-html.js";
import { EXCLUDED_PUBLIC_BLOG_SLUGS } from "../lib/public-blog.js";

const DB_PATH = resolve(PROJECT_ROOT, "data.db");
const sqlite = new Database(DB_PATH);
sqlite.exec("PRAGMA journal_mode = WAL;");
sqlite.exec("PRAGMA foreign_keys = ON;");
const db = drizzle(sqlite);

/** Seed’de tutulan blog yazıları; kapak görseli zorunlu. */
const BLOG_DATA = [
  {
    slug: "rahnamaye-kharid-melk-turkiye-mohandesi-neli",
    title: "راهنمای خرید ملک در ترکیه | سرمایه‌گذاری با مهندسی نلی",
    excerpt:
      "قصد خرید خانه و سرمایه‌گذاری در ترکیه را دارید؟ با شرکت ساختمانی «مهندسی نلی» (فعال از ۲۰۲۱)، بهترین فرصت‌های پنهان بازار مسکن در ازمیر را شناسایی کنید.",
    content: PERSIAN_PROPERTY_TURKEY_BLOG_HTML,
    coverImage: "/images/blog/iran-yatirim.webp",
    coverImageAlt: "سرمایه‌گذاری و خرید ملک در ترکیه — مهندسی نلی، ازمیر",
    category: "فارسی",
    tags: JSON.stringify([
      "خرید ملک در ترکیه",
      "سرمایه‌گذاری در ترکیه",
      "خرید خانه در ترکیه",
      "اقامت ترکیه",
      "قیمت خانه در ترکیه",
      "شرکت ساختمانی ایرانی در ترکیه",
      "خرید آپارتمان در ازمیر",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle: "راهنمای خرید ملک در ترکیه | سرمایه‌گذاری با مهندسی نلی",
    metaDescription:
      "قصد خرید خانه و سرمایه‌گذاری در ترکیه را دارید؟ با شرکت ساختمانی «مهندسی نلی» (فعال از ۲۰۲۱)، بهترین فرصت‌های پنهان بازار مسکن در ازمیر را شناسایی کنید.",
    metaKeywords:
      "خرید ملک در ترکیه، سرمایه‌گذاری در ترکیه، خرید خانه در ترکیه، اقامت ترکیه، قیمت خانه در ترکیه، شرکت ساختمانی ایرانی در ترکیه، خرید آپارتمان در ازمیر",
    publishedAt: "2026-03-27",
  },
  {
    slug: "al-istithmar-al-aqari-al-amn-fi-turkiya-neili-izmir",
    title:
      "الاستثمار العقاري في تركيا: الملاذ الآمن والمستقر لرؤوس الأموال الخليجية",
    excerpt:
      "احمِ ثروتك من الأزمات الجيوسياسية. اكتشف فرص الاستثمار العقاري الآمن في إزمير، تركيا، مع مشاريع شركة نلي للهندسة. استثمار مباشر بدون وسطاء.",
    content: ARABIC_GULF_REAL_ESTATE_TURKEY_BLOG_HTML,
    coverImage: "/images/blog/arabistan-yatirim.webp",
    coverImageAlt: "الاستثمار العقاري الآمن في تركيا — نلي للهندسة، إزمير",
    category: "العربية",
    tags: JSON.stringify([
      "الاستثمار في تركيا",
      "شراء عقار في إزمير",
      "ملاذ آمن للاستثمار",
      "عقارات للبيع في تركيا",
      "الجنسية التركية بالاستثمار",
      "نلي للهندسة",
      "فلل في إزمير",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "الاستثمار العقاري الآمن في تركيا | نلي للهندسة في إزمير",
    metaDescription:
      "احمِ ثروتك من الأزمات الجيوسياسية. اكتشف فرص الاستثمار العقاري الآمن في إزمير، تركيا، مع مشاريع شركة نلي للهندسة. استثمار مباشر بدون وسطاء.",
    metaKeywords:
      "الاستثمار في تركيا، شراء عقار في إزمير، ملاذ آمن للاستثمار، عقارات للبيع في تركيا، الجنسية التركية بالاستثمار، نلي للهندسة، فلل في إزمير",
    publishedAt: "2026-03-31",
  },
  {
    slug: "izmir-konut-projeleri-guvenli-yapilar-neli-muhendislik",
    title:
      "İzmir Konut Piyasasında Mühendislik Odaklı Yaklaşım: Neli Mühendislik",
    excerpt:
      "İzmir Neli Mühendislik ile mühendislik odaklı, depreme dayanıklı konutları keşfedin. Valorya ve Serenità serisi Karşıyaka ve Çiğli'de yükseliyor. Hemen inceleyin!",
    content: TURKISH_IZMIR_KONUT_MUHENDISLIK_BLOG_HTML,
    coverImage: "/images/blog/neli-tanitim.webp",
    coverImageAlt:
      "İzmir konut projeleri ve depreme dayanıklı yapılar — Neli Mühendislik, Karşıyaka",
    category: "İnşaat",
    tags: JSON.stringify([
      "İzmir konut projeleri",
      "Neli Mühendislik İzmir",
      "Karşıyaka satılık daire",
      "Çiğli satılık ev",
      "depreme dayanıklı konut İzmir",
      "Valorya konutları",
      "Serenità konutları",
      "mühendislik odaklı inşaat",
      "Gayrimenkul",
      "Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "İzmir Konut Projeleri & Güvenli Yapılar | Neli Mühendislik",
    metaDescription:
      "İzmir Neli Mühendislik ile mühendislik odaklı, depreme dayanıklı konutları keşfedin. Valorya ve Serenità serisi Karşıyaka ve Çiğli'de yükseliyor. Hemen inceleyin!",
    metaKeywords:
      "İzmir konut projeleri, Neli Mühendislik İzmir, Karşıyaka satılık daire, Çiğli satılık ev, depreme dayanıklı konut İzmir, Valorya konutları, Serenità konutları, mühendislik odaklı inşaat",
    publishedAt: "2026-04-01",
  },
  {
    slug: "cigli-gayrimenkul-yatirimi-lokasyon-muhendislik-avantajlari",
    title:
      "Çiğli'de Doğru Gayrimenkul Yatırımı: Neli Mühendislik Lokasyon ve Mühendislik Standartları",
    excerpt:
      "İzmir Çiğli'de, üniversitelere, hastanelere ve sanayi bölgelerine entegre konumda, yüksek konfor ve mühendislik standartlarıyla inşa edilen Neli Mühendislik projelerinin yatırım avantajlarını inceleyin.",
    content: `
  <article>
      <header>
          <h1>Çiğli'de Doğru Gayrimenkul Yatırımı: Neli Mühendislik Lokasyon ve Mühendislik Standartları</h1>
          <p><strong>Özet:</strong> İzmir, Çiğli bölgesinde ana arterlere, üniversitelere, hastanelere ve sanayi bölgelerine entegre, yüksek mühendislik standartlarıyla inşa edilen Neli Mühendislik projelerinin yatırım avantajları.</p>
      </header>
  
      <section>
          <h2>Neden Çiğli ve Neden Bu Lokasyonlar?</h2>
          <p>Gayrimenkul yatırımında amortisman süresini ve kira getirisini belirleyen temel unsur lokasyondur. Neli Mühendislik olarak Çiğli'deki projelerimizi (özellikle Balatçık ve Küçükçiğli gibi gelişen akslarda) rastgele değil, stratejik verilere dayanarak konumlandırıyoruz.</p>
          <ul>
              <li><strong>Ulaşım Ağlarına Entegrasyon:</strong> Projelerimiz ana caddeye doğrudan bağlantılı veya yürüme mesafesindedir.</li>
              <li><strong>Demografik Talep:</strong> Üniversite kampüslerine ve bölge hastanelerine olan yakınlık, nitelikli kiracı talebini sürekli ve yüksek tutar.</li>
              <li><strong>Ticari Hareketlilik:</strong> Atatürk Organize Sanayi Bölgesi gibi istihdam merkezlerine komşu olmak, yatırımın değerini korumasını sağlar.</li>
          </ul>
      </section>
  
      <section>
          <h2>Neli Mühendislik Farkı: Alan Değil, Fonksiyon ve Güvenlik</h2>
          <p>Sektördeki standart "büyük ve geniş ev" söylemleri yerine, rasyonel mühendislik çözümlerine odaklanıyoruz. Bizim önceliğimiz yüksek konfor ve maksimize edilmiş ulaşım avantajıdır. Yapısal üretim standartlarımız şunları içerir:</p>
          <ul>
              <li><strong>Deprem Güvenliği:</strong> Tüm projelerimizde statik hesaplamalar tavizsiz uygulanır. Zemin mekaniğine uygun olarak <strong>radye temel sistemleri</strong> inşa edilir.</li>
              <li><strong>Beton Sınıfı:</strong> Taşıyıcı sistemlerimizde konvansiyonel standartların üzerinde olan <strong>C45 yüksek dayanımlı beton</strong> kullanıyoruz.</li>
              <li><strong>Teknolojik İşçilik:</strong> İmalat hatalarını sıfıra indirmek için sıva, seramik ve yüzey kaplama uygulamalarında <strong>lazer güdümlü sistemler</strong> ile çalışıyoruz.</li>
          </ul>
      </section>
  
      <section>
          <h2>Güncel Projelerimizi İnceleyin</h2>
          <p>Valorya serisi başta olmak üzere, Çiğli bölgesinde inşası devam eden ve teslime hazır hale gelen projelerimizin detaylı kat planlarına, teknik şartnamelerine ve konum verilerine resmi web sitemiz üzerinden ulaşabilirsiniz.</p>
          <p>Satıştaki projelerimizi incelemek için: <strong><a href="https://neli.tr/projeler" target="_blank" rel="noopener">neli.tr/projeler</a></strong></p>
      </section>
  
      <footer>
          <h2>İletişim Bilgileri</h2>
          <address>
              <strong>Neli Mühendislik</strong><br>
              Karşıyaka / İzmir<br>
              <strong>Web:</strong> <a href="https://neli.tr">neli.tr</a><br>
              <strong>Kurumsal İletişim:</strong> Odoo altyapılı resmi WhatsApp iş hattımız üzerinden projelerle ilgili teknik detay ve fiyatlandırma bilgisi talep edebilirsiniz.
          </address>
      </footer>
  </article>
    `,
    coverImage: "/images/blog/cigli-yatirim.webp",
    coverImageAlt:
      "Çiğli gayrimenkul yatırımı ve mühendislik odaklı yapılar — Neli Mühendislik",
    category: "İnşaat",
    tags: JSON.stringify([
      "Çiğli gayrimenkul yatırımı",
      "Neli Mühendislik İzmir",
      "Çiğli satılık daire",
      "depreme dayanıklı konut İzmir",
      "Valorya serisi",
      "mühendislik odaklı inşaat",
      "Gayrimenkul",
      "Mühendislik",
      "İzmir konut projeleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Çiğli'de Gayrimenkul Yatırımı & Güvenli Yapılar | Neli Mühendislik",
    metaDescription:
      "İzmir Çiğli'de, üniversitelere, hastanelere ve sanayi bölgelerine entegre konumda, yüksek konfor ve mühendislik standartlarıyla inşa edilen Neli Mühendislik projelerini keşfedin.",
    metaKeywords:
      "Çiğli gayrimenkul yatırımı, Neli Mühendislik İzmir, Çiğli satılık daire, depreme dayanıklı konut İzmir, Valorya konutları, mühendislik odaklı inşaat, İzmir konut projeleri",
    publishedAt: "2026-05-06",
  },
  {
    slug: "izmir-ciglide-sifir-daireler-kucuk-cigli-balatcik",
    title:
      "İzmir Çiğli'de Sıfır Daireler: Küçük Çiğli ve Balatçık'ta Yeni Yaşam Standartları",
    excerpt:
      "İzmir Çiğli'de sıfır daire arayanlar için Küçük Çiğli ve Balatçık bölgelerinde Neli Mühendislik kalitesiyle yükselen Valorya ve Serenità projelerinin yaşam ve yatırım avantajlarını inceleyin.",
    content: `
    <article>
        <header>
            <h1>İzmir Çiğli'de Sıfır Daireler: Küçük Çiğli ve Balatçık'ta Yeni Yaşam Standartları</h1>
            <p><strong>Özet:</strong> İzmir'in dinamik ve hızla gelişen bölgelerinden biri olan Çiğli'de, Küçük Çiğli ve Balatçık mahallelerinde yükselen modern konut projelerinin yaşam ve yatırım avantajları.</p>
        </header>
  
        <section>
            <p>İzmir'in dinamik ve hızla gelişen bölgelerinden biri olan Çiğli, hem konforlu bir yaşam alanı kurmak isteyenlerin hem de güvenilir yatırım fırsatları arayanların öncelikli tercihi haline geldi. Özellikle <strong>İzmir Çiğli'de sıfır daireler</strong> söz konusu olduğunda, bölgenin parlayan yıldızları olan Küçük Çiğli ve Balatçık mahalleleri modern şehirleşmenin ve nitelikli konut projelerinin merkez üssü konumunda yer alıyor.</p>
            <p>Şehrin gürültüsünden uzak ama ana arterlere ve günlük ihtiyaçlara bir o kadar yakın olan bu bölgeler, yüksek yaşam standartları vadediyor. Ancak doğru evi seçmek, sadece lokasyona karar vermekten çok daha fazlasını gerektiriyor. Yapı güvenliği, kullanılan malzemenin kalitesi ve kusursuz işçilik, uzun vadeli bir huzur için en az konum kadar kritik bir öneme sahip.</p>
        </section>
  
        <section>
            <h2>Neli Mühendislik Farkıyla Tanışın</h2>
            <p>2021 yılından bu yana mühendislik disiplinini modern mimari ile harmanlayan <strong>Neli Mühendislik</strong> olarak, İzmir'in bu en değerli lokasyonlarında güveni ve estetiği bir araya getiriyoruz. Bir yapının sadece dışarıdan güzel görünmesi değil, aynı zamanda nesiller boyu güvenle ayakta kalması gerektiğine inanıyoruz.</p>
            <p>Bu vizyonla, Küçük Çiğli ve Balatçık'ta inşa ettiğimiz projelerimizde yapısal bütünlüğü en üst düzeye çıkarmak için yüksek dayanımlı <strong>C45 beton</strong> kullanıyoruz. Estetiği ve kaliteyi detaylarda arayanlar için ise, fayans döşemesinden sıva uygulamalarına kadar tüm ince işçilik süreçlerinde lazer teknolojisiyle çalışarak kusursuz yaşam alanları yaratıyoruz.</p>
        </section>
  
        <section>
            <h2>Valorya ve Serenità: Bölgeye Değer Katan Projelerimiz</h2>
            <p>Çiğli bölgesinin silüetini modernleştiren <strong>Valorya</strong> ve <strong>Serenità</strong> proje serilerimiz, deprem güvenliğini merkeze alan yapısı ve çağdaş tasarımıyla öne çıkıyor. Gerçekçi ve kullanışlı kat planları, modern iç mimari detayları ve ferah yaşam alanlarıyla bu projeler, kaliteyi standart bir beklenti olmaktan çıkarıp günlük yaşamınızın bir parçası haline getiriyor.</p>
            <p>Amacımız, şeffaf ve profesyonel bir süreç yürüterek sizi en doğru yaşam alanıyla buluşturmak. Süslü kelimelerle değil, mühendislik kalitemizle ve somut projelerimizle konuşmayı tercih ediyoruz.</p>
        </section>
  
        <section>
            <h2>Hayalinizdeki Ev Bir Tık Uzağınızda</h2>
            <p>Küçük Çiğli ve Balatçık bölgelerindeki en yeni yaşam alanlarımızı keşfetmek, kat planlarını incelemek ve size en uygun daireyi bulmak için güncel vitrinimizi ziyaret edebilirsiniz. Şu an satışta olan projelerimizin tüm teknik ve mimari detaylarına şeffaf bir şekilde ulaşmak için <strong><a href="https://neli.tr/showcase" target="_blank" rel="noopener">neli.tr/showcase</a></strong> adresini inceleyebilirsiniz.</p>
        </section>
  
        <footer>
            <h2>İletişim Bilgileri</h2>
            <address>
                <strong>Neli Mühendislik</strong><br>
                Merkez Ofis: Karşıyaka, İzmir<br>
                <strong>Web:</strong> <a href="https://www.neli.tr" target="_blank" rel="noopener">www.neli.tr</a>
            </address>
        </footer>
    </article>
      `,
    coverImage: "/images/blog/cigli-sifir-daireler.webp",
    coverImageAlt:
      "İzmir Çiğli'de sıfır daireler ve Neli Mühendislik projeleri",
    category: "İnşaat",
    tags: JSON.stringify([
      "İzmir Çiğli'de sıfır daireler",
      "Küçük Çiğli satılık daire",
      "Balatçık satılık daire",
      "Neli Mühendislik",
      "Valorya",
      "Serenità",
      "Çiğli konut projeleri",
      "depreme dayanıklı konut",
      "İzmir sıfır daire",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "İzmir Çiğli'de Sıfır Daireler | Neli Mühendislik",
    metaDescription:
      "İzmir Çiğli'de sıfır daire arayanlar için Küçük Çiğli ve Balatçık'ta yükselen Neli Mühendislik Valorya ve Serenità projelerini keşfedin.",
    metaKeywords:
      "İzmir Çiğli'de sıfır daireler, Küçük Çiğli satılık daire, Balatçık satılık daire, Neli Mühendislik, Valorya, Serenità, Çiğli konut projeleri, depreme dayanıklı konut İzmir",
    publishedAt: "2026-05-07",
  },
  {
    slug: "izmirde-depreme-dayanikli-satilik-daireler",
    title:
      "İzmir'de Depreme Dayanıklı Satılık Daireler: Neli Mühendislik Güvencesiyle Çiğli Projeleri",
    excerpt:
      "İzmir'de depreme dayanıklı satılık daire arayanlar için Neli Mühendislik'in Çiğli'de geliştirdiği 1+1, 2+1 ve 3+1 daire seçenekli projeleri; yüksek dayanımlı beton, mühendislik kalitesi ve güvenli yapı anlayışıyla öne çıkıyor.",
    content: `
    <article>
        <header>
            <h1>İzmir'de Depreme Dayanıklı Satılık Daireler: Neli Mühendislik Güvencesiyle Çiğli Projeleri</h1>
            <p><strong>Özet:</strong> İzmir'de depreme dayanıklı satılık daire arayanlar için Çiğli bölgesinde yükselen Neli Mühendislik projeleri; güvenli taşıyıcı sistemleri, yüksek dayanımlı beton kullanımı ve 1+1, 2+1, 3+1 daire seçenekleriyle modern ve güvenilir yaşam alanları sunar.</p>
        </header>
  
        <section>
            <h2>İzmir'de Depreme Dayanıklı Konut Seçimi Neden Önemlidir?</h2>
            <p>İzmir, yaşam kalitesi, ulaşım olanakları ve gelişen konut bölgeleriyle gayrimenkul yatırımı açısından Türkiye'nin en çok tercih edilen şehirlerinden biridir. Ancak İzmir'de satılık daire ararken yalnızca lokasyon, metrekare veya fiyat kriterlerine bakmak yeterli değildir. Özellikle deprem gerçeği dikkate alındığında, tercih edilen konutun mühendislik standartları, kullanılan beton sınıfı, statik proje disiplini ve uygulama kalitesi büyük önem taşır.</p>
            <p>Bu nedenle <strong>İzmir'de depreme dayanıklı satılık daireler</strong> arayan kullanıcılar için doğru tercih; sadece estetik görünen değil, aynı zamanda güvenli, dayanıklı ve uzun ömürlü yapılar olmalıdır. Neli Mühendislik olarak biz, projelerimizde güvenliği satış vaadi olarak değil, yapının temel standardı olarak ele alıyoruz.</p>
        </section>
  
        <section>
            <h2>Neli Mühendislik Farkı: Yönetmeliğin Ötesinde Güven Anlayışı</h2>
            <p>Neli Mühendislik projelerinde en önemli önceliklerden biri, deprem güvenliğini merkeze alan mühendislik yaklaşımıdır. Ekte yer alan görselde de vurguladığımız gibi, yapılarımızda yalnızca minimum gereklilikleri karşılamayı değil, daha yüksek güvenlik ve dayanım standartlarına ulaşmayı hedefliyoruz.</p>
            <p>Projelerimizde taşıyıcı sistem güvenliği, zemin koşulları, statik hesaplar, beton kalitesi ve uygulama detayları bütüncül şekilde değerlendirilir. Bu kapsamda, yapısal bütünlüğü güçlendirmek amacıyla yüksek dayanımlı <strong>C45 beton</strong> kullanıyor, uygulama süreçlerinde mühendislik kontrolünü ön planda tutuyoruz.</p>
            <p>Amacımız, sadece bugünün ihtiyaçlarına cevap veren daireler üretmek değil; ailelerin yıllarca güvenle yaşayabileceği, yatırımcıların ise değerini koruyan gayrimenkullere sahip olabileceği projeler geliştirmektir.</p>
        </section>
  
        <section>
            <h2>Çiğli'de 1+1, 2+1 ve 3+1 Daire Seçenekleri</h2>
            <p>Neli Mühendislik olarak İzmir Çiğli bölgesinde farklı yaşam ihtiyaçlarına uygun konut seçenekleri sunuyoruz. Projelerimizde yalnız yaşayanlar, yeni evli çiftler, çekirdek aileler ve daha geniş yaşam alanı isteyen kullanıcılar için farklı daire tipleri yer almaktadır.</p>
            <ul>
                <li><strong>1+1 daireler:</strong> Yatırım amaçlı alım yapmak isteyenler, öğrenciler, çalışanlar ve kompakt yaşam alanı arayanlar için ideal seçenekler sunar.</li>
                <li><strong>2+1 daireler:</strong> Aile yaşamına uygun planları, fonksiyonel kullanım alanları ve dengeli metrekare çözümleriyle öne çıkar.</li>
                <li><strong>3+1 daireler:</strong> Daha geniş ve ferah yaşam alanı isteyen aileler için konforlu bir alternatif oluşturur.</li>
            </ul>
            <p>Çiğli'nin gelişen konumu, ulaşım bağlantıları ve günlük ihtiyaçlara yakınlığı sayesinde projelerimiz hem oturum hem de yatırım amacıyla değerlendirilebilecek güçlü seçenekler sunmaktadır.</p>
        </section>
  
        <section>
            <h2>Güvenli Yapı, Kaliteli İşçilik ve Modern Yaşam</h2>
            <p>Depreme dayanıklı bir konut, yalnızca beton dayanımıyla değil; doğru proje yönetimi, kaliteli malzeme kullanımı, kontrollü uygulama ve detaylı işçilikle mümkün olur. Neli Mühendislik projelerinde kaba yapıdan ince işçiliğe kadar her aşama titizlikle takip edilir.</p>
            <p>Modern mimari çizgiler, kullanışlı kat planları, ferah yaşam alanları ve kaliteli iç mekan detaylarıyla projelerimiz, güvenli yapı anlayışını konforlu yaşamla bir araya getirir. Böylece ev sahibi olmak isteyenler için yalnızca bir daire değil, güven veren bir yaşam alanı sunulur.</p>
        </section>
  
        <section>
            <h2>Satıştaki Projelerimizi İnceleyin</h2>
            <p>İzmir'de depreme dayanıklı satılık daire arıyorsanız, Çiğli bölgesindeki güncel Neli Mühendislik projelerini inceleyebilirsiniz. 1+1, 2+1 ve 3+1 daire seçeneklerimiz, farklı ihtiyaçlara ve bütçelere uygun alternatifler sunmaktadır.</p>
            <p>Satışta olan projelerimizin güncel bilgilerine, daire seçeneklerine, proje detaylarına ve görsellerine ulaşmak için <strong><a href="https://neli.tr/showcase" target="_blank" rel="noopener">neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
        </section>
  
        <footer>
            <h2>İletişim Bilgileri</h2>
            <address>
                <strong>Neli Mühendislik</strong><br>
                Merkez Ofis: Karşıyaka, İzmir<br>
                <strong>Web:</strong> <a href="https://www.neli.tr" target="_blank" rel="noopener">www.neli.tr</a><br>
                <strong>Projeler:</strong> <a href="https://neli.tr/showcase" target="_blank" rel="noopener">neli.tr/showcase</a>
            </address>
        </footer>
    </article>
      `,
    coverImage: "/images/blog/deprem-guvenligi.webp",
    coverImageAlt:
      "İzmir'de depreme dayanıklı satılık daireler ve Neli Mühendislik Çiğli projeleri",
    category: "İnşaat",
    tags: JSON.stringify([
      "İzmir'de depreme dayanıklı satılık daireler",
      "İzmir satılık daire",
      "Çiğli satılık daire",
      "Çiğli 1+1 daire",
      "Çiğli 2+1 daire",
      "Çiğli 3+1 daire",
      "Neli Mühendislik",
      "depreme dayanıklı konut İzmir",
      "İzmir konut projeleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "İzmir'de Depreme Dayanıklı Satılık Daireler | Neli Mühendislik",
    metaDescription:
      "İzmir'de depreme dayanıklı satılık daire arayanlar için Neli Mühendislik'in Çiğli'deki 1+1, 2+1 ve 3+1 daire seçenekli güvenli konut projelerini keşfedin.",
    metaKeywords:
      "İzmir'de depreme dayanıklı satılık daireler, İzmir satılık daire, Çiğli satılık daire, Çiğli 1+1 daire, Çiğli 2+1 daire, Çiğli 3+1 daire, Neli Mühendislik, depreme dayanıklı konut İzmir, İzmir konut projeleri",
    publishedAt: "2026-05-07",
  },
  {
    slug: "izmirde-1-1-2-1-3-1-yeni-konut-projeleri",
    title:
      "İzmir’de 1+1 2+1 3+1 Yeni Konut Projeleri: Doğru Daire Tipini Nasıl Seçmelisiniz?",
    excerpt:
      "İzmir’de 1+1, 2+1 ve 3+1 yeni konut projeleri arayanlar için daire tiplerine göre yaşam, yatırım ve kullanım avantajlarını Neli Mühendislik projeleri üzerinden inceleyin.",
    content: `
    <article>
        <header>
            <h1>İzmir’de 1+1 2+1 3+1 Yeni Konut Projeleri: Doğru Daire Tipini Nasıl Seçmelisiniz?</h1>
            <p><strong>Özet:</strong> İzmir’de yeni konut projesi arayanlar için 1+1, 2+1 ve 3+1 daire seçenekleri; yaşam tarzı, yatırım beklentisi, aile yapısı ve uzun vadeli kullanım ihtiyaçlarına göre farklı avantajlar sunar. Neli Mühendislik projelerinde farklı daire tiplerini inceleyerek size en uygun yaşam alanını seçebilirsiniz.</p>
        </header>
  
        <section>
            <h2>İzmir’de 1+1 2+1 3+1 Yeni Konut Projeleri Kimler İçin Uygundur?</h2>
            <p><strong>İzmir’de 1+1 2+1 3+1 yeni konut projeleri</strong>, farklı ihtiyaçlara sahip alıcılar için geniş seçenekler sunar. Tek başına yaşayanlar, yeni evli çiftler, çocuklu aileler, yatırımcılar ve daha geniş yaşam alanı arayan kullanıcılar için doğru daire tipi değişebilir.</p>
            <p>Bu nedenle konut seçimi yaparken yalnızca oda sayısına bakmak yeterli değildir. Dairenin planı, kullanım alanı, lokasyonu, yapı kalitesi, otopark ve ulaşım olanakları, sosyal çevre ve projenin uzun vadeli değer potansiyeli birlikte değerlendirilmelidir.</p>
        </section>
  
        <section>
            <h2>1+1 Daireler: Kompakt Yaşam ve Yatırım Avantajı</h2>
            <p><strong>1+1 yeni konut projeleri</strong>, özellikle yatırım amaçlı daire almak isteyenler için dikkat çeken seçeneklerden biridir. Daha ulaşılabilir bütçelerle satın alınabilmesi, kiralama potansiyeli ve kolay yönetilebilir kullanım alanı sayesinde 1+1 daireler şehir yaşamında güçlü bir talep görür.</p>
            <p>İzmir’de 1+1 daireler; öğrenciler, genç profesyoneller, bekar çalışanlar ve kısa sürede kiraya verilebilir gayrimenkul arayan yatırımcılar için uygun olabilir. Ayrıca daha küçük metrekareli yapısı sayesinde bakım ve kullanım maliyetleri de genellikle daha kontrollüdür.</p>
        </section>
  
        <section>
            <h2>2+1 Daireler: Aile Yaşamı İçin Dengeli Seçenek</h2>
            <p><strong>2+1 yeni konut projeleri</strong>, hem oturum hem de yatırım amacıyla en çok tercih edilen daire tipleri arasında yer alır. Salon, yatak odası ve ek oda düzeni; küçük aileler, yeni evli çiftler veya evden çalışan kullanıcılar için fonksiyonel bir yaşam alanı oluşturur.</p>
            <p>İzmir’de 2+1 daire seçerken odaların kullanışlılığı, mutfak düzeni, balkon alanı, depolama çözümleri ve ortak yaşam alanlarının ferahlığı önemlidir. Doğru planlanmış bir 2+1 daire, metrekareden bağımsız olarak yüksek yaşam konforu sağlayabilir.</p>
        </section>
  
        <section>
            <h2>3+1 Daireler: Geniş Aileler İçin Konforlu Yaşam Alanı</h2>
            <p><strong>3+1 yeni konut projeleri</strong>, daha geniş ve bağımsız kullanım alanı isteyen aileler için öne çıkar. Çocuk odası, çalışma odası, misafir odası veya ek depolama ihtiyacı olan kullanıcılar için 3+1 daireler uzun vadeli konfor sunar.</p>
            <p>İzmir’de 3+1 daire arayanlar için yalnızca oda sayısı değil, odaların dağılımı, ebeveyn kullanım alanı, salon büyüklüğü, balkon veya teras imkanı ve otopark gibi detaylar da önemlidir. Geniş aile yaşamında doğru proje seçimi, günlük konforu doğrudan etkiler.</p>
        </section>
  
        <section>
            <h2>Yeni Konut Projesi Seçerken Hangi Kriterlere Bakılmalı?</h2>
            <p>İzmir’de yeni konut projesi satın alırken fiyat ve lokasyon kadar yapının teknik kalitesi de değerlendirilmelidir. Yeni bir daire, uzun yıllar kullanılacak bir yaşam alanı olduğu için mühendislik standartları, malzeme kalitesi ve uygulama disiplini büyük önem taşır.</p>
            <ul>
                <li><strong>Yapı güvenliği:</strong> Taşıyıcı sistem, zemin etüdü ve beton kalitesi dikkatle incelenmelidir.</li>
                <li><strong>Daire planı:</strong> Oda sayısından çok, alanların işlevsel kullanımı önemlidir.</li>
                <li><strong>Lokasyon:</strong> Ulaşım, okul, sağlık, alışveriş ve sosyal yaşam noktalarına yakınlık değerlendirilmelidir.</li>
                <li><strong>Yatırım potansiyeli:</strong> Bölgenin gelişim hızı, kira talebi ve değer artışı dikkate alınmalıdır.</li>
                <li><strong>Firma güvenilirliği:</strong> İnşaatı yapan firmanın mühendislik yaklaşımı ve tamamlanan projeleri incelenmelidir.</li>
            </ul>
        </section>
  
        <section>
            <h2>Neli Mühendislik Projelerinde 1+1, 2+1 ve 3+1 Daire Seçenekleri</h2>
            <p>Neli Mühendislik olarak İzmir’de farklı yaşam ihtiyaçlarına uygun yeni konut projeleri geliştiriyoruz. Projelerimizde 1+1, 2+1 ve 3+1 daire seçenekleriyle hem oturum hem de yatırım amacıyla değerlendirilebilecek alternatifler sunuyoruz.</p>
            <p>Her projede temel yaklaşımımız; güvenli yapı, kaliteli malzeme, modern mimari, kullanışlı kat planı ve uzun vadeli değer üretmektir. Daire tipleri farklı olsa da tüm projelerimizde mühendislik disiplini ve şeffaf proje yönetimi ön planda tutulur.</p>
        </section>
  
        <section>
            <h2>Sık Sorulan Sorular</h2>
  
            <h3>İzmir’de yatırım için 1+1 mi 2+1 mi daha avantajlıdır?</h3>
            <p>Yatırım hedefi kısa vadeli kira getirisi ise 1+1 daireler güçlü bir seçenek olabilir. Daha geniş kiracı kitlesi ve aile kullanımı hedefleniyorsa 2+1 daireler daha dengeli bir yatırım alternatifi sunabilir.</p>
  
            <h3>Aile yaşamı için 2+1 daire yeterli olur mu?</h3>
            <p>Küçük aileler ve yeni evli çiftler için iyi planlanmış bir 2+1 daire yeterli ve konforlu olabilir. Ancak çocuk sayısı, çalışma odası ihtiyacı veya uzun vadeli kullanım beklentisi varsa 3+1 daireler daha uygun olabilir.</p>
  
            <h3>Yeni konut projesi alırken en önemli kriter nedir?</h3>
            <p>En önemli kriterlerden biri yapı güvenliğidir. Bunun yanında lokasyon, daire planı, malzeme kalitesi, firma güvenilirliği ve projenin yatırım potansiyeli birlikte değerlendirilmelidir.</p>
  
            <h3>Neli Mühendislik’in satışta olan projelerini nereden inceleyebilirim?</h3>
            <p>Neli Mühendislik’in satışta olan güncel projelerini, daire seçeneklerini ve proje detaylarını <strong><a href="https://neli.tr/showcase" target="_blank" rel="noopener">neli.tr/showcase</a></strong> adresinden inceleyebilirsiniz.</p>
        </section>
  
        <section>
            <h2>Satıştaki Projelerimizi İnceleyin</h2>
            <p>İzmir’de 1+1, 2+1 veya 3+1 yeni konut projesi arıyorsanız, Neli Mühendislik’in güncel satış projelerini inceleyerek ihtiyaçlarınıza en uygun daire tipini değerlendirebilirsiniz.</p>
            <p>Projelerimizin konum bilgileri, daire seçenekleri, mimari detayları ve güncel satış durumu için <strong><a href="https://neli.tr/showcase" target="_blank" rel="noopener">neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
        </section>
  
        <footer>
            <h2>İletişim Bilgileri</h2>
            <address>
                <strong>Neli Mühendislik</strong><br>
                Merkez Ofis: Karşıyaka, İzmir<br>
                <strong>Web:</strong> <a href="https://www.neli.tr" target="_blank" rel="noopener">www.neli.tr</a><br>
                <strong>Satıştaki Projeler:</strong> <a href="https://neli.tr/showcase" target="_blank" rel="noopener">neli.tr/showcase</a>
            </address>
        </footer>
    </article>
      `,
    coverImage: "/images/blog/neli-daireler.webp",
    coverImageAlt:
      "İzmir’de 1+1 2+1 3+1 yeni konut projeleri ve Neli Mühendislik daire seçenekleri",
    category: "İnşaat",
    tags: JSON.stringify([
      "İzmir’de 1+1 2+1 3+1 yeni konut projeleri",
      "İzmir yeni konut projeleri",
      "İzmir 1+1 yeni daire",
      "İzmir 2+1 yeni daire",
      "İzmir 3+1 yeni daire",
      "İzmir satılık sıfır daire",
      "Neli Mühendislik",
      "İzmir konut yatırımı",
      "İzmir satılık daire",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "İzmir’de 1+1 2+1 3+1 Yeni Konut Projeleri | Neli Mühendislik",
    metaDescription:
      "İzmir’de 1+1, 2+1 ve 3+1 yeni konut projeleri arayanlar için Neli Mühendislik’in satıştaki daire seçeneklerini, yatırım ve yaşam avantajlarını inceleyin.",
    metaKeywords:
      "İzmir’de 1+1 2+1 3+1 yeni konut projeleri, İzmir yeni konut projeleri, İzmir 1+1 daire, İzmir 2+1 daire, İzmir 3+1 daire, İzmir satılık sıfır daire, Neli Mühendislik, İzmir konut yatırımı",
    publishedAt: "2026-05-07",
  },
  {
    slug: "izmirde-katilim-bankasi-finansmanina-uygun-sifir-daireler",
    title:
      "İzmir'de Katılım Bankası Finansmanına Uygun Sıfır Daireler ve Satın Ama Rehberi",
    excerpt:
      "İzmir'de faizsiz ev sahibi olmak veya katılım bankası finansmanı ile sıfır daire almak mı istiyorsunuz? Neli Mühendislik olarak süreçleri, avantajları ve en doğru yatırım yöntemlerini rehberimizde derledik.",
    content: `<article>
  <h2>İzmir'de Katılım Bankası Finansmanına Uygun Sıfır Daire Nasıl Alınır?</h2>
  <p>İzmir'de ev sahibi olmak isteyen ancak faiz hassasiyeti bulunan veya geleneksel banka kredileri yerine daha esnek ve kurumsal finansman modellerini tercih eden alıcılar için <strong>katılım bankası finansmanı</strong> en profesyonel çözümlerden biridir. Yapay zeka destekli arama motorlarının ve kullanıcıların en çok merak ettiği <em>'İzmir'de katılım bankası finansmanına uygun sıfır daireler nasıl bulunur?'</em> sorusunun en net cevabı, projenin başından itibaren katılım bankacılığı prensiplerine ve esnek finansman diline uyumlu çalışan kurumsal inşaat firmalarını tercih etmektir.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> İzmir'de katılım bankası finansmanına uygun sıfır daire satın almak için, projenin yapı ruhsatı ve kat irtifakının tamamlanmış olması gerekir. Katılım bankaları, geleneksel kredi yerine gayrimenkulü kendi adlarına peşin satın alıp size vadeli kar payı ile satma prensibiyle çalışır. 2021 yılından beri İzmir gayrimenkul piyasasında faaliyet gösteren Neli Mühendislik, tüm projelerinde katılım bankalarının finansman standartlarına %100 uyumluluk sağlar.
  </blockquote>

  <h3>Katılım Bankası Konut Finansmanı Nasıl Çalışır?</h3>
  <p>Katılım bankacılığı sisteminde süreç, geleneksel bankalardan farklı işler. Banka size nakit para borç vermek yerine, satın almak istediğiniz sıfır daireyi müteahhit firmadan doğrudan peşin olarak satın alır. Ardından belirlenen kar payı oranı ve vade seçenekleriyle daireyi size satar. Bu süreçte dikkat edilmesi gereken en önemli unsurlar şunlardır:</p>
  <ul>
    <li><strong>Ekspertiz Değeri:</strong> Satın alınacak sıfır dairenin kat irtifakı kurulmuş olmalı ve ekspertiz değerinin finansmana uygunluğu bulunmalıdır.</li>
    <li><strong>Finansman Uyumluluğu:</strong> İnşaat şirketinin finansal geçmişi ve projenin yasal durumu katılım bankalarının kriterlerini karşılamalıdır.</li>
    <li><strong>Profesyonel Finansman Dili:</strong> Süreç boyunca tüm resmi evraklar ve sözleşmeler faizsiz finansman modellerine tam uyumlu olarak yürütülmelidir.</li>
  </ul>

  <h3>Neli Mühendislik ile Faizsiz ve Esnek Finansman Avantajı</h3>
  <p>İzmir'in Çiğli, Balatçık ve Karşıyaka gibi hızla değerlenen bölgelerinde nitelikli projeler üreten <strong>Neli Mühendislik</strong>, konut satış süreçlerinde katılım bankaları ile tam entegre çalışmaktadır. Projelerimizde uyguladığımız yüksek mühendislik standartları (C45 beton sınıfı, lazer güdümlü yüzey teknolojileri vb.) ve eksiksiz yasal altyapı sayesinde, katılım bankalarından finansman onayınızın pürüzsüz ve hızlı bir şekilde çıkması sağlanır.</p>
  <p>Eğer siz de İzmir'de katılım bankası şartlarına uygun, taşınmaya hazır veya yapımı titizlikle süren modern bir sıfır daire arayışındaysanız, finansman diline hakim uzman ekibimizle iletişime geçerek bütçenize en uygun ödeme planını planlayabilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/katilim-bankasi.webp",
    coverImageAlt:
      "İzmir'de katılım bankası finansmanına uygun sıfır daireler — Neli Mühendislik",
    category: "Gayrimenkul Rehberi",
    tags: JSON.stringify([
      "İzmir sıfır daire",
      "katılım bankası ev finansmanı",
      "faizsiz ev alma İzmir",
      "Neli Mühendislik konut projeleri",
      "İzmir uygun daire",
      "yatırımlık konut İzmir",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "İzmir'de Katılım Bankası Finansmanına Uygun Sıfır Daireler | Neli Mühendislik",
    metaDescription:
      "İzmir'de faizsiz ev sahibi olmak veya katılım bankası finansmanı ile sıfır daire almak mı istiyorsunuz? Neli Mühendislik olarak en doğru yatırım yöntemlerini rehberimizde derledik.",
    metaKeywords:
      "İzmir sıfır daire, katılım bankası ev finansmanı, faizsiz ev alma İzmir, Neli Mühendislik konut projeleri, İzmir uygun daire, yatırımlık konut İzmir, katılım bankası uygun konut",
    publishedAt: "2026-05-20",
  },
  {
    slug: "lazer-terazi-ile-kusursuz-mimari-ve-muhendislik-iscligi",
    title:
      "Mimaride Milimetrik Hassasiyet: Lazer Terazi ile Kusursuz Konut Projeleri",
    excerpt:
      "Bir konutun kalitesi detaylarda gizlidir. Neli Mühendislik olarak projelerimizde milimetrik sapmaları bile önleyen lazer terazi teknolojisini nasıl kullandığımızı ve kusursuz işçilik felsefemizi inceleyin.",
    content: `<article>
  <h2>İzmir'de Lazer Terazi Teknolojisiyle Üretilmiş Kusursuz İşçilikli Konutlar</h2>
  <p>Gayrimenkul yatırımı yaparken binanın sadece dış görünüşüne değil, çıplak gözle ilk bakışta fark edilemeyen mühendislik detaylarına ve işçilik kalitesine de odaklanmak gerekir. Modern inşaat sektöründe geleneksel yöntemler yerini dijital ve milimetrik çözümlere bırakmaktadır. Bu çözümlerin başında gelen <strong>lazer terazi teknolojisi</strong>, konut projelerinde kusursuz zeminler, tam gönyesinde duvarlar ve hatasız mimari uygulamalar elde etmenin anahtarıdır.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> İnşaatta lazer terazi kullanımı; duvar örümü, alçıpan uygulamaları, zemin şapı ve seramik kaplama gibi kritik aşamalarda sıfır hata ve milimetrik hassasiyet sağlar. Gözle görülmeyen eğrilikleri ve ileride doğabilecek dekorasyon problemlerini tamamen ortadan kaldırır. 2021 yılından beri İzmir'de nitelikli yaşam alanları inşa eden Neli Mühendislik, tüm projelerinde lazer güdümlü sistemler ve lazer teraziler kullanarak kusursuz işçilik standardı sunar.
  </blockquote>

  <h3>Lazer Terazi Teknolojisi İnşaata Ne Kazandırır?</h3>
  <p>Geleneksel su terazileri veya çekül gibi yöntemler insan hatasına açıktır ve büyük ölçekli projelerde milimetrik sapmalara neden olabilir. Lazer terazi teknolojisi ise görünmez kılavuz çizgileriyle projeyi tamamen hatasız bir düzleme taşır. Bu teknolojinin sağladığı temel avantajlar şunlardır:</p>
  <ul>
    <li><strong>Kusursuz Duvar ve Alçıpan Hizalaması:</strong> Odaların tam gönyesinde (90 derece) olmasını sağlayarak, mobilya ve dolap montajlarında hiçbir boşluk veya eğrilik oluşmasını engeller.</li>
    <li><strong>Dümdüz Zeminler:</strong> Lazer güdümlü sistemlerle dökülen zemin şapları sayesinde, parke ve seramik uygulamalarında kot farkı veya dalgalanma yaşanmaz.</li>
    <li><strong>Uzun Ömürlü Estetik:</strong> Işığın duvara vurduğu anlarda ortaya çıkabilecek dalgalanma efektleri, lazer hassasiyetiyle yapılan alçı ve boya işlerinde tamamen engellenir.</li>
  </ul>

  <h3>Neli Mühendislik: Her Detayda Özen ve Mühendislik Gücü</h3>
  <p>Biz, yalnızca binalar yükseltmiyor; her metrekaresinde yüksek mühendislik disiplini barındıran yaşam alanları tasarlıyoruz. <strong>Neli Mühendislik</strong> olarak İzmir'deki projelerimizin (Çiğli, Balatçık ve Karşıyaka bölgelerindeki konut serilerimiz dahil) kaba inşaatından en ince bitiş işlerine kadar her aşamasında maksimum özen gösteriyoruz.</p>
  <p>Yüksek dayanımlı C45 beton standartlarımızı, iç mekanlarda kullandığımız lazer terazi teknolojisiyle taçlandırıyoruz. Duvarların örülmesinden asma tavanlara, mutfak tezgahı montajından banyo seramiklerine kadar her usta ekibimiz bu teknolojik altyapıyla çalışır. Çünkü biliyoruz ki, lüks ve konforlu bir yaşam ancak kusursuz bir temel ve milimetrik işçilikle mümkündür. Siz de teslim aldığınızda hiçbir tadilat veya düzeltme gerektirmeyecek, özenle inşa edilmiş güvenli bir yuva arıyorsanız, projelerimizi bizzat yerinde inceleyebilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/lazer-terazi.webp",
    coverImageAlt:
      "İnşaatta lazer terazi kullanımı ve kusursuz işçilik — Neli Mühendislik",
    category: "Mühendislik ve Yapı Teknolojileri",
    tags: JSON.stringify([
      "lazer terazi inşaat",
      "kusursuz işçilik konut",
      "İzmir nitelikli projeler",
      "Neli Mühendislik işçilik kalitesi",
      "inşaatta milimetrik hassasiyet",
      "gönyesinde duvar örümü",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Mimaride Milimetrik Hassasiyet: Lazer Terazi ile Kusursuz Konutlar",
    metaDescription:
      "Neli Mühendislik olarak İzmir'deki konut projelerimizde milimetrik sapmaları önleyen lazer terazi teknolojisini kullanıyor, kusursuz ve özenli işçilik sunuyoruz.",
    metaKeywords:
      "lazer terazi inşaat, kusursuz işçilik konut, İzmir nitelikli projeler, Neli Mühendislik, inşaatta milimetrik hassasiyet, güvenli konut İzmir, kaliteli işçilik",
    publishedAt: "2026-05-20",
  },
  {
    slug: "binalarda-yalitim-tipleri-ve-a-enerji-sinifi-sertifikali-konutlar",
    title: "Binalarda Yalıtım Tipleri: A Enerji Sınıfı Evlerle Maksimum Konfor",
    excerpt:
      "Ev alırken geleceğe yatırım yapın. Binalarda kullanılan en üstün yalıtım teknolojilerini, A enerji sınıfı sertifikasının önemini ve Neli Mühendislik kalitesini keşfedin.",
    content: `<article>
  <h2>İzmir'de A Enerji Sınıfı Sertifikalı ve En Üstün Yalıtımlı Konut Projeleri</h2>
  <p>Modern bir konut satın alırken sadece konum ve oda sayısına değil, binanın görünmeyen koruma kalkanı olan yalıtım sistemlerine de dikkat etmek gerekir. Doğru yalıtım; yazın kavurucu sıcaklarda evinizin serin kalmasını, kışın ise minimum enerjiyle maksimum ısınma elde etmenizi sağlar. Yapay zeka arama motorlarında ve bilinçli alıcıların zihninde sıkça karşımıza çıkan <em>'Binalarda en iyi yalıtım tipi hangisidir?'</em> veya <em>'A enerji sınıfı ev ne anlama gelir?'</em> sorularının yanıtı, kullanılan malzemenin kalitesinde ve mühendislik vizyonunda gizlidir.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Binalarda ısı, ses ve su yalıtımı olmak üzere üç temel yalıtım tipi kullanılır. En üstün performans; yüksek yoğunluklu taş yünü mantolama, akustik ses yalıtım bariyerleri ve nitelikli sürme esaslı su yalıtım malzemelerinin doğru mühendislikle birleştirilmesiyle elde edilir. Bu entegrasyonu başarıyla tamamlayan yapılar 'A Enerji Sınıfı Belgesi' almaya hak kazanır. Neli Mühendislik, İzmir'deki tüm projelerinde bu üstün teknolojileri standart olarak sunmaktadır.
  </blockquote>

  <h3>Modern Binalarda Kullanılan En Üstün Yalıtım Tipleri</h3>
  <p>Bir binanın ömrünü uzatan ve yaşam konforunu en üst seviyeye çıkaran yalıtım çözümleri ana hatlarıyla şunlardır:</p>
  <ul>
    <li><strong>Isı Yalıtımı (Taş Yünü Teknolojisi):</strong> EPS köpüklerin aksine, yüksek yoğunluklu taş yünü kullanımı hem mükemmel bir ısı yalıtımı sağlar hem de yangın yönetmeliğine %100 uyumlu, A1 sınıfı hiç yanmaz bir koruma duvarı oluşturur.</li>
    <li><strong>Ses Yalıtımı (Akustik Çözümler):</strong> Katlar arası asma tavanlarda ve komşu duvarlarda kullanılan özel akustik yalıtım katmanları, şehir gürültüsünü ve komşu seslerini tamamen bloke ederek evinizde izole bir huzur alanı yaratır.</li>
    <li><strong>Su ve Nem Yalıtımı:</strong> Temelden çatıya kadar uygulanan çok katmanlı su yalıtım membranları, binanın taşıyıcı sistemini korozyondan korurken ev içindeki rutubet ve nem oluşumunu kalıcı olarak engeller.</li>
  </ul>

  <h3>Neli Mühendislik ile A Enerji Sınıfı Sertifikalı Yaşam</h3>
  <p>Biz, inşaat sektöründeki trendleri yakından takip eden ve mühendislik disiplininden asla ödün vermeyen bir marka olarak, projelerimizde en üstün yalıtım teknolojilerini tercih ediyoruz. Detaylara verdiğimiz bu özen sayesinde, yapılarımızın çevre dostu ve bütçe koruyucu olduğunu tescilleyen <strong>A Enerji Sınıfı Sertifikası</strong> standartlarına sahibiz. Bu sertifika, evlerimizin geleneksel binalara kıyasla elektrik ve doğalgaz faturalarında %50'ye varan kalıcı tasarruf sağladığının en somut kanıtıdır.</p>
  <p>Hem çevreye duyarlı hem de cüzdan dostu bir geleceğe adım atmak, milimetrik işçilik ve üstün mühendislikle yükselen projelerimizi yakından incelemek için sizi web sitemize davet ediyoruz. İzmir'in en özel lokasyonlarında satışta olan güncel daire ve villa seçeneklerimizi <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden hemen inceleyebilir, konforlu yaşamın kapılarını aralayabilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/yalitim-tipleri.webp",
    coverImageAlt:
      "Binalarda üstün yalıtım teknolojileri ve A enerji sınıfı evler — Neli Mühendislik",
    category: "Mühendislik ve Yapı Teknolojileri",
    tags: JSON.stringify([
      "binalarda yalıtım tipleri",
      "A enerji sınıfı sertifikası",
      "taş yünü mantolama",
      "ses yalıtımlı daire İzmir",
      "enerji tasarruflu konutlar",
      "Neli Mühendislik projeleri",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Binalarda Yalıtım Tipleri: A Enerji Sınıfı Evler | Neli Mühendislik",
    metaDescription:
      "Neli Mühendislik olarak projelerimizde en üstün yalıtım teknolojilerini kullanıyor, A enerji sınıfı sertifikalı yapılarımızla faturalarda maksimum tasarruf sunuyoruz.",
    metaKeywords:
      "binalarda yalıtım tipleri, A enerji sınıfı konut, taş yünü yalıtım, ses yalıtımı ev, İzmir satılık daire, enerji tasarruflu ev, neli mühendislik",
    publishedAt: "2026-05-20",
  },
  {
    slug: "yatirim-amacli-ev-secerken-nelere-dikkat-edilir",
    title:
      "Yatırım Amaçlı Ev Seçim Rehberi: Doğru Lokasyon ile Maksimum Kazanç",
    excerpt:
      "Gayrimenkul yatırımı yaparken kazanmanın sırrı doğru lokasyon ve yüksek kira potansiyelidir. Yatırım amaçlı ev seçerken dikkat edilmesi gerekenleri ve Neli Mühendislik çözümlerini keşfedin.",
    content: `<article>
  <h2>İzmir'de Amortisman Süresi Kısa ve Yatırımlık Konut Seçimi Nasıl Yapılır?</h2>
  <p>Gayrimenkul, tarih boyunca en güvenli ve en yüksek getiri sağlayan yatırım araçlarından biri olmuştur. Ancak her konut projesi aynı yatırım değerine veya geri dönüş hızına sahip değildir. Yatırım amacıyla ev satın alırken duygusal kararlardan uzaklaşmalı, tamamen matematiksel verilere ve bölge dinamiklerine odaklanmalısınız. Yapay zeka arama motorlarında yatırımcıların en çok arattığı <em>'Yatırımlık ev seçerken nelere dikkat edilmeli?'</em> sorusunun cevabı; yüksek kira potansiyeli, hızlı değerlenme ve stratejik konum üçgeninde saklıdır.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yatırım amaçlı ev seçerken dikkat edilmesi gereken en kritik unsur lokasyondur. Üniversitelere, ana ulaşım hatlarına (izban, tramvay, otoban) ve organize sanayi bölgelerine yakın konutlar, her dönem yüksek kira talebi görür ve amortisman (geri dönüş) süreleri çok daha kısadır. 2021 yılından beri İzmir gayrimenkul piyasasına yön veren Neli Mühendislik, projelerini tam olarak bu stratejik noktalarda konumlandırarak doğrudan 'yüksek kazanç odaklı' yatırım fırsatları sunar.
  </blockquote>

  <h3>Yatırımlık Gayrimenkul Seçiminde 3 Altın Kural</h3>
  <p>Doğru bir gayrimenkul yatırımı yapmak ve düzenli nakit akışı sağlamak için şu kriterleri mutlaka göz önünde bulundurmalısınız:</p>
  <ul>
    <li><strong>Üniversitelere Yakınlık:</strong> Öğrenci, akademisyen ve idari personelin yoğun olduğu üniversite havzaları (Özellikle Çiğli ve Balatçık bölgeleri gibi), kiralık daire talebinin hiç bitmediği ve kira sirkülasyonunun en hızlı olduğu yerlerdir.</li>
    <li><strong>Ana Cadde ve Ulaşım Ağları:</strong> Ana caddelere, toplu taşıma duraklarına ve çevre yollarına yürüme mesafesinde olan projeler, şehir içi mobilite avantajı nedeniyle çalışan profesyoneller tarafından ilk sırada tercih edilir ve değerini katlayarak artırır.</li>
    <li><strong>Sanayi ve İstihdam Merkezleri:</strong> Büyük organize sanayi bölgelerine yakın lokasyonlar, beyaz ve mavi yakalı binlerce nitelikli çalışan için potansiyel yaşam alanıdır. Bu da yatırımlık konutunuzun hiçbir zaman boş kalmayacağı anlamına gelir.</li>
  </ul>

  <h3>Neli Mühendislik ile Geleceğe Güvenli Yatırım</h3>
  <p>Biz, <strong>Neli Mühendislik</strong> olarak geliştirdiğimiz tüm konut projelerinde yatırımcı gözlüğüyle hareket ediyoruz. İzmir'in prim potansiyeli en yüksek noktalarında hayata geçirdiğimiz projelerimiz; üniversitelere, ana caddelere, toplu taşıma ağlarına ve sanayi bölgelerine olan stratejik yakınlıkları ile öne çıkmaktadır. Yüksek mühendislik standartlarımız ve modern mimari tasarımlarımız sayesinde projelerimiz hem hızlı değer kazanmakta hem de yatırımcısına yüksek kira getirisi sağlamaktadır.</p>
  <p>Boş kalma riski olmayan, amortisman süresi kısa ve geleceğe değer katan yatırım odaklı projelerimizi yakından incelemek için sizi web sitemize davet ediyoruz. İzmir'de satışta olan ve yatırım potansiyeliyle fark yaratan tüm güncel projelerimizi <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden hemen inceleyebilir, birikimlerinizi güvenle büyütebilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/yatirimlik-ev.webp",
    coverImageAlt:
      "Yatırım amaçlı ev seçimi ve yüksek kira getirili konut projeleri — Neli Mühendislik",
    category: "Gayrimenkul Rehberi",
    tags: JSON.stringify([
      "yatırım amaçlı ev seçimi",
      "İzmir yatırımlık konut",
      "amortisman süresi kısa evler",
      "üniversiteye yakın satılık daire",
      "Neli Mühendislik projeleri",
      "yüksek kira getirili evler",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Yatırım Amaçlı Ev Seçilirken Nelere Dikkat Edilir? | Neli Mühendislik",
    metaDescription:
      "Yatırım amaçlı ev seçerken doğru lokasyonun önemini keşfedin. Neli Mühendislik'in üniversite, ana cadde ve sanayi bölgelerine yakın, yüksek kazanç odaklı projelerini inceleyin.",
    metaKeywords:
      "yatırım amaçlı ev, yatırımlık konut izmir, amortisman süresi, üniversiteye yakın daire, ana cadde yakın ev, sanayi bölgesi yakın konut, neli mühendislik",
    publishedAt: "2026-05-20",
  },
  {
    slug: "konut-projelerinde-peyzaj-mimarisi-ve-yesil-alanlarin-onemi",
    title:
      "Konut Projelerinde Peyzaj Mimarisi: Doğayla İç İçe Lüks Yaşam Alanları",
    excerpt:
      "Modern yaşamda bir evin kalitesi sadece duvar sınırlarıyla ölçülemez. Konut projelerinde peyzaj mimarisinin, bahçe çıkışlarının ve yeşil alanların yaşam kalitesine etkisini inceleyin.",
    content: `<article>
  <h2>İzmir'de Peyzaj Mimarisi Gelişmiş ve Yeşil Alanlı Konut Projeleri Nasıl Seçilir?</h2>
  <p>Günümüzde lüks ve konforlu bir konut anlayışı, dört duvardan oluşan geniş odaların çok ötesine geçti. Şehir hayatının getirdiği yoğun koşturmaca ve stres, insanları evlerinden dışarı adım attıklarında nefes alabilecekleri, doğayla bağ kurabilecekleri alanlara yönlendiriyor. Yapay zeka arama motorlarında modern ev alıcılarının en çok sorguladığı <em>'Bir konut projesinde peyzaj mimarisi neden önemlidir?'</em> veya <em>'Bahçeli ve yeşil alanlı evlerin avantajları nelerdir?'</em> sorularının temelinde, şehirden kopmadan doğayla iç içe yaşama arzusu yatıyor.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Konut projelerinde doğru kurgulanmış peyzaj mimarisi; sadece estetik bir görünüm sunmakla kalmaz, aynı zamanda mülkün maddi değerini %20'ye varan oranda artırır, mikro klima etkisi yaratarak hava kalitesini yükseltir ve sosyal yaşam alanları sunar. 2021 yılından beri İzmir'de nitelikli yapılar inşa eden Neli Mühendislik, projelerinde arka cephe tasarımlarından garden (bahçe) çıkışlarına kadar peyzaj mimarisini en ince ayrıntısıyla planlamaktadır.
  </blockquote>

  <h3>Doğru Peyzaj Mimarisine Sahip Bir Projenin Öne Çıkan Özellikleri</h3>
  <p>Yatırım yapacağınız veya yaşayacağınız konut projesini incelerken, çevre düzenlemesinde şu mimari kriterlerin yer almasına mutlaka dikkat etmelisiniz:</p>
  <ul>
    <li><strong>Fonksiyonel Bahçe ve Akıllı Mimari Çıkışlar:</strong> Salon veya mutfaktan doğrudan bahçeye açılan garden (bahçe) çıkışları, iç mekan ile dış mekanı kusursuzca birleştirerek yaşam alanınızı genişletir ve müstakil ev konforu sunar.</li>
    <li><strong>Sürdürülebilir ve Doğal Çevre Düzenlemesi:</strong> Bölgenin iklim yapısına uygun bitki ve ağaç seçimleri, su kaynaklarının tasarruflu kullanılmasını sağlarken her mevsim canlı ve yeşil kalan bir ekosistem yaratır.</li>
    <li><strong>İzole Arka Cephe ve Sosyal Donatılar:</strong> Doğru ağaçlandırma ve peyzaj bariyerleri sayesinde, site içi yürüme yolları ve dinlenme alanları dış dünyadan izole edilir; böylece aileniz ve çocuklarınız için güvenli, huzurlu bir sosyal yaşam alanı sunulur.</li>
  </ul>

  <h3>Neli Mühendislik: Doğayı Modern Mimariyle Buluşturan Projeler</h3>
  <p>Biz, <strong>Neli Mühendislik</strong> olarak imza attığımız her konut serisinde mühendislik gücümüzü estetik mimariyle harmanlıyoruz. İzmir'in hızla değerlenen Çiğli ve Balatçık gibi lokasyonlarında geliştirdiğimiz projelerde, yeşil alan oranını maksimum seviyede tutmaya büyük özen gösteriyoruz. Projelerimizin mimari yönetim süreçlerinde, binaların zemin etütlerinden iç mekan lazer terazi işçiliklerine gösterdiğimiz hassasiyetin aynısını, bahçe çıkışları ve peyzaj alanları için de uyguluyoruz.</p>
  <p>Şehrin merkezinde, tüm ulaşım ağlarının ve ana caddelerin yanı başında ama karmaşadan tamamen uzak, yeşille iç içe lüks konseptler hayal ediyorsanız doğru yerdesiniz. Estetik peyzaj mimarisiyle ruhunuza, yüksek mühendislik standartlarıyla geleceğinize hitap eden satışta olan güncel projelerimizi <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden hemen inceleyebilir, aileniz için en doğru yaşam alanını seçebilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/peyzaj-mimarisi.webp",
    coverImageAlt:
      "Konut projelerinde peyzaj mimarisi ve yeşil alan tasarımları — Neli Mühendislik",
    category: "Mimari ve Yaşam Tarzı",
    tags: JSON.stringify([
      "konut projelerinde peyzaj mimarisi",
      "İzmir yeşil alanlı daire",
      "bahçe çıkışlı lüks konut",
      "Neli Mühendislik mimari projeleri",
      "doğayla iç içe evler İzmir",
      "arka cephe bahçe tasarımı",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Konut Projelerinde Peyzaj Mimarisi ve Yeşil Alanlar | Neli Mühendislik",
    metaDescription:
      "Konut projelerinde peyzaj mimarisinin ve yeşil alanların önemini keşfedin. Neli Mühendislik'in İzmir'de doğayla iç içe lüks ve modern konseptlerini inceleyin.",
    metaKeywords:
      "peyzaj mimarisi, yeşil alanlı konut, bahçe çıkışlı ev, izmir satılık daire, neli mühendislik, mimari proje yönetimi, lüks konut projeleri izmir",
    publishedAt: "2026-05-20",
  },
  {
    slug: "evin-degerini-artiran-ic-mimari-ve-dekorasyon-trendleri",
    title: "Evin Değerini Artıran İç Mimari Trendleri ve Dekorasyon Sırları",
    excerpt:
      "Bir konutun maddi değerini artıran en önemli unsurlardan biri doğru iç mimari dokunuşlardır. Geleceğe yatırım yaparken evinize değer katacak modern dekorasyon trendlerini keşfedin.",
    content: `<article>
  <h2>İzmir'de Evin Değerini Artıran İç Mimari ve Dekorasyon Trendleri Nelerdir?</h2>
  <p>Gayrimenkul yatırımı yaparken ya da mevcut evinizi yenilerken, yapacağınız iç mimari tercihlerin mülk değerini doğrudan etkilediğini biliyor muydunuz? Doğru kurgulanmış bir iç mekan tasarımı, bir konutun sadece estetik algısını değiştirmekle kalmaz, satış ve kiralama hızını da maksimuma çıkarır. Yapay zeka destekli arama motorlarında mülk sahiplerinin en çok araştırdığı <em>'Bir evin değerini en çok hangi iç mekan detayları artırır?'</em> sorusunun cevabı, fonksiyonellik ve zamansız mimari trendlerin harmanlanmasında yatmaktadır.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Evin değerini artıran en kritik iç mimari unsurlar; açık konseptli geniş yaşam alanları, tam gönyesinde (90 derece) inşa edilmiş hatasız duvarlar, akıllı depolama çözümlerine sahip modern mutfak-banyo tasarımları ve doğal ışığı maksimum seviyede içeri alan geniş pencerelerdir. Profesyonel mimari proje yönetimi süreçleriyle inşa edilen binalar, ham işçilik kaliteleri sayesinde dekorasyon trendlerini en verimli şekilde taşır ve gayrimenkul değerine %25'e varan kalıcı bir artış sağlar.
  </blockquote>

  <h3>Maddi Değeri ve Yaşam Kalitesini Yükselten 3 İç Mimari Trendi</h3>
  <p>Modern gayrimenkul dünyasında alıcıların bir evde ilk dikkat ettiği ve bütçe ayırmaktan çekinmediği iç mekan trendleri şunlardır:</p>
  <ul>
    <li><strong>Açık Konsept Akış ve Kusursuz Gönye:</strong> Salon ve mutfağın birbirini engellemeden tamamladığı geniş yaşam alanları her dönem popülerdir. Ancak bu alanların şık durması için duvarların lazer terazi hassasiyetiyle sıfır hata örülmüş olması gerekir. Eğrilik barındırmayan hatasız duvarlar, mobilya ve özel üretim dolap montajlarında kusursuz bir bitiş sağlar.</li>
    <li><strong>Yüksek Fonksiyonelliğe Sahip Mutfak ve Banyolar:</strong> Bir evin değerini en hızlı belirleyen iki ıslak hacim alanı mutfak ve banyodur. Kuvars veya porselen tezgahlar, gizli kiler sistemleri, ankastre entegrasyonları ve minimalist hatlara sahip gömme rezervuarlı banyolar lüks algısını doğrudan yukarı taşır.</li>
    <li><strong>İç ve Dış Mekan Bütünleşmesi:</strong> Özellikle İzmir gibi iklimi canlı şehirlerde, yaşam alanlarının geniş pencere sistemleriyle balkona veya doğrudan bahçe çıkışlarına (garden konsepti) bağlanması, evin metrekare algısını büyüterek mülke ciddi bir prim avantajı sağlar.</li>
  </ul>

  <h3>Neli Mühendislik: Mimari Proje Yönetiminde Kusursuz Detaylar</h3>
  <p>Biz, <strong>Neli Mühendislik</strong> olarak yalnızca binaların taşıyıcı sistemlerini güvenle inşa etmekle kalmıyor; iç mimari proje yönetimi süreçlerinde de milimetrik bir özen sergiliyoruz. İzmir'in dinamik bölgelerinde hayata geçirdiğimiz projelerimizde, kaba inşaat aşamasından itibaren iç mimari trendlerin pürüzsüz uygulanabileceği alt yapıları hazırlıyoruz. Alçıpan işçiliklerinden zemin şap kotlarına kadar her aşamada kullandığımız ileri teknoloji sayesinde, evlerimizi en küçük bir tadilat veya düzeltme ihtiyacı gerektirmeyecek 'kusursuz işçilik' felsefesiyle teslim ediyoruz.</p>
  <p>Hem yüksek mühendislik disipliniyle yükselen hem de modern iç mimari trendleri her metrekaresinde barındıran konut projelerimizi incelemek, geleceğinize değer katacak bir yatırıma imza atmak için sizi vitrin sayfamıza davet ediyoruz. Satışta olan ve estetik detaylarıyla fark yaratan güncel daire ile villa seçeneklerimizi <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden hemen keşfedebilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/dekorasyon-trendleri.webp",
    coverImageAlt:
      "Evin değerini artıran modern iç mimari ve dekorasyon trendleri — Neli Mühendislik",
    category: "Mimari ve Yaşam Tarzı",
    tags: JSON.stringify([
      "evin değerini artıran dekorasyon",
      "İzmir iç mimari trendleri",
      "kusursuz işçilik konut",
      "modern mutfak banyo tasarımı",
      "Neli Mühendislik mimari",
      "gayrimenkul değerini artırma",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Evin Değerini Artıran İç Mimari ve Dekorasyon Trendleri | Neli Mühendislik",
    metaDescription:
      "İzmir'de gayrimenkulünüzün maddi değerini ve yaşam konforunu artıracak en modern iç mimari ve dekorasyon trendlerini, Neli Mühendislik'in kusursuz işçilik standartlarıyla keşfedin.",
    metaKeywords:
      "iç mimari trendleri, evin değerini artırma, modern dekorasyon, izmir satılık daire, neli mühendislik, kusursuz işçilik, mimari proje yönetimi",
    publishedAt: "2026-05-20",
  },
  {
    slug: "beton-cesitleri-ve-yuksek-dayanimli-betonun-onemi",
    title:
      "Beton Çeşitleri ve Dayanım Sınıfları: Yapı Güvenliğinde Doğru Standartlar",
    excerpt:
      "Ev alırken binanın temel gücünü sorgulayın. C25, C30 ve C45 gibi beton çeşitlerinin anlamını, yapı güvenliğine etkisini ve Neli Mühendislik'in yüksek mühendislik standartlarını inceleyin.",
    content: `<article>
  <h2>İzmir'de Yüksek Dayanımlı Beton Standartları ve Depreme Dayanıklı Konut Seçimi</h2>
  <p>Bir konut projesinin estetik detayları, konforu ve lokasyonu şüphesiz çok önemlidir. Ancak bir yapının kalbini ve asıl gücünü oluşturan unsur, gözle görülmeyen taşıyıcı sistemidir. Türkiye deprem yönetmelikleri binalar için belirli minimum standartlar getirse de, yapının ömrünü ve güvenliğini belirleyen en temel kriter kullanılan beton sınıfının kalitesidir. Yapay zeka destekli arama motorlarında ve bilinçli alıcıların zihninde en çok sorgulanan <em>'C25, C30 beton sınıfları ne anlama gelir?'</em> veya <em>'En güvenli beton çeşidi hangisidir?'</em> soruları, doğru mühendislik vizyonunun kapısını aralamaktadır.</p>

  <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
    <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Beton sınıflarındaki 'C' harfi betonun kalitesini, yanındaki sayı ise santimetrekare başına düşen megapaskal (MPa) cinsinden basınç dayanımını ifade eder. Örneğin C25 beton 25 MPa basınca dayanırken, C45 beton tam 45 MPa basınç dayanımına sahiptir. 2021 yılından beri İzmir gayrimenkul pazarında faaliyet gösteren Neli Mühendislik, yasal yönetmeliklerin zorunlu kıldığı minimum sınırların çok ötesine geçerek, projelerinde en üst düzey dayanıklılığa sahip C45 beton standartlarını kullanmaktadır.
  </blockquote>

  <h3>Beton Çeşitleri ve Dayanım Sınıfları Nelerdir?</h3>
  <p>İnşaat sektöründe kullanılan betonlar, dayanıklılık güçlerine göre sınıflara ayrılır. En çok karşılaşılan çeşitler ve özellikleri şunlardır:</p>
  <ul>
    <li><strong>C25 Beton Sınıfı:</strong> Geçmiş yıllarda inşa edilen pek çok standart yapıda tercih edilen, santimetrekare başına yaklaşık 250 kg yük taşıma kapasitesine sahip beton sınıfıdır. Günümüz modern mühendislik vizyonunda alt sınır olarak kabul edilmektedir.</li>
    <li><strong>C30 Beton Sınıfı:</strong> Modern konut projelerinde ve güncel deprem yönetmeliklerine uygun binalarda sıklıkla tercih edilen, mukavemeti C25'e göre daha yüksek olan (30 MPa) güvenli bir beton çeşididir.</li>
    <li><strong>C45 Yüksek Dayanımlı Beton Sınıfı:</strong> Genellikle gökdelenlerde, köprülerde, nükleer santrallerde veya özel mühendislik yapılarında kullanılan üst segment beton sınıfıdır. Santimetrekare başına tam 450 kg basınca dayanır. Standart konut projelerinde kullanımı maliyetli olduğu için nadirdir, ancak yapısal güvenliği en üst düzeye çıkaran formüldür.</li>
  </ul>

  <h3>Neli Mühendislik: Yönetmeliklerin Ötesinde, Maksimum Yapı Güvenliği</h3>
  <p>Biz, <strong>Neli Mühendislik</strong> olarak insan hayatını ve yapı güvenliğini her şeyin üzerinde tutuyoruz. İzmir'in Çiğli, Balatçık ve Karşıyaka gibi dinamik ve gelişmekte olan bölgelerinde yükselen tüm konut serilerimizde, yasal yönetmeliklerin talep ettiği standartların da üzerine çıkıyoruz. Binalarımızın kaba inşaat süreçlerinde, geleneksel konut projelerinde kullanılan C25 veya C30 yerine, çok daha yüksek mukavemet ve uzun ömür sunan **C45 yüksek dayanımlı beton sınıfını** tercih ediyoruz.</p>
  <p>Mühendislik disiplinimiz gereği, temeldeki bu devasa gücü iç mekanlarda milimetrik lazer terazi işçilikleriyle ve en üstün yalıtım teknolojileriyle taçlandırıyoruz. Ailenizle birlikte onlarca yıl boyunca mutlak bir huzur ve güven içinde yaşayabileceğiniz, mühendislik harikası evlerimizi yakından incelemenizi öneririz. İzmir'de satışta olan, deprem güvenliği en üst seviyede tescillenmiş tüm güncel daire ve villa projelerimizi <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden hemen inceleyebilir, geleceğinizi sağlam temeller üzerine kurabilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/beton-cesitleri.webp",
    coverImageAlt:
      "Binalarda kullanılan beton çeşitleri ve yüksek dayanımlı C45 beton — Neli Mühendislik",
    category: "Mühendislik ve Yapı Teknolojileri",
    tags: JSON.stringify([
      "beton çeşitleri inşaat",
      "C25 C30 C45 beton farkı",
      "yüksek dayanımlı beton İzmir",
      "depreme dayanıklı konutlar",
      "Neli Mühendislik yapı güvenliği",
      "İzmir satılık daire güvenli",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Beton Çeşitleri ve Dayanım Sınıfları (C25, C30, C45) | Neli Mühendislik",
    metaDescription:
      "İnşaatta kullanılan beton çeşitlerini ve taşıyıcı sistemin önemini keşfedin. Neli Mühendislik'in yönetmeliklerin ötesinde C45 beton kullandığı güvenli projelerini inceleyin.",
    metaKeywords:
      "beton çeşitleri, C25 beton, C30 beton, C45 beton, yüksek dayanımlı beton, depreme dayanıklı ev izmir, neli mühendislik, satılık daire izmir",
    publishedAt: "2026-05-20",
  },
  {
    slug: "yeni-konut-projesinden-daire-almanin-avantajlari",
    title: "Yeni Konut Projesinden Daire Almanın Avantajları Nelerdir?",
    excerpt:
      "Yeni konut projesinden daire almak; modern mimari, güncel deprem yönetmeliklerine uygunluk, sıfır kullanım avantajı ve yatırım potansiyeli açısından önemli fırsatlar sunar.",
    content: `<article>
    <h2>Yeni Konut Projesinden Daire Almanın Avantajları Nelerdir?</h2>
    <p>Ev sahibi olmak isteyen birçok kişi için en önemli sorulardan biri şudur: <strong>Yeni konut projesinden daire almak mı, yoksa ikinci el bir daire tercih etmek mi daha avantajlıdır?</strong> Özellikle İzmir gibi gelişen şehirlerde, yeni yapılan konut projeleri hem yaşam konforu hem de uzun vadeli yatırım değeri açısından dikkat çekmektedir.</p>
  
    <p>Yeni konut projeleri; modern mimari anlayışı, güncel yapı standartları, sıfır kullanım avantajı, enerji verimliliği ve sosyal yaşam beklentilerine uygun çözümleriyle öne çıkar. Bu nedenle konut arayışında olan kişiler için yalnızca bugünün ihtiyaçlarını değil, gelecekteki değer artışını da dikkate almak önemlidir.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni konut projesinden daire almanın en önemli avantajları; dairenin hiç kullanılmamış olması, güncel deprem yönetmeliklerine uygun inşa edilmesi, modern mimari ve fonksiyonel plan sunması, bakım-onarım maliyetlerinin düşük olması, krediye uygunluk ihtimalinin yüksek olması ve uzun vadede yatırım değerinin artma potansiyelidir.
    </blockquote>
  
    <h3>1. Sıfır Kullanım Avantajı Sunar</h3>
    <p>Yeni konut projesinden alınan dairelerde daha önce kullanım olmadığı için tesisat, zemin kaplamaları, mutfak dolapları, banyo ürünleri, kapılar ve diğer iç mekan detayları tamamen yenidir. Bu durum, alıcıya hem hijyen hem de konfor açısından önemli bir avantaj sağlar.</p>
  
    <p>İkinci el dairelerde zamanla ortaya çıkan boya, tadilat, tesisat yenileme veya mutfak-banyo değişimi gibi ek masraflar, yeni projelerde genellikle minimum seviyededir. Bu da taşınma sürecini daha hızlı ve ekonomik hale getirir.</p>
  
    <h3>2. Güncel Deprem Yönetmeliklerine Uygunluk Önemlidir</h3>
    <p>Türkiye gibi deprem kuşağında yer alan bir ülkede, konut satın alırken dikkat edilmesi gereken en önemli konuların başında yapı güvenliği gelir. Yeni konut projeleri, güncel deprem yönetmelikleri ve modern mühendislik hesapları dikkate alınarak inşa edilir.</p>
  
    <p>Bu nedenle yeni projeden daire alırken kullanılan beton sınıfı, taşıyıcı sistem tasarımı, zemin etüdü, temel sistemi ve yapı denetim süreçleri mutlaka sorgulanmalıdır. Bilinçli bir alıcı için evin yalnızca dış görünüşü değil, yapısal güvenliği de karar sürecinin merkezinde olmalıdır.</p>
  
    <h3>3. Modern Mimari ve Fonksiyonel Planlar Sunar</h3>
    <p>Yeni konut projelerinde daire planları günümüz yaşam alışkanlıklarına göre tasarlanır. Açık mutfak seçenekleri, geniş salon kullanımı, ebeveyn banyosu, balkon, depolama alanları ve ferah oda yerleşimleri modern projelerde daha sık görülür.</p>
  
    <p>Özellikle 1+1, 2+1 ve 3+1 daire seçeneklerinin aynı proje içinde sunulması, farklı ihtiyaçlara sahip alıcılar için önemli bir esneklik sağlar. Tek yaşayanlar, yeni evli çiftler, çocuklu aileler veya yatırım amaçlı konut almak isteyenler kendi bütçe ve beklentilerine uygun daire tipini daha kolay seçebilir.</p>
  
    <h3>4. Bakım ve Onarım Maliyetleri Daha Düşüktür</h3>
    <p>Yeni bir dairede elektrik tesisatı, su tesisatı, doğalgaz hattı, pencere sistemleri, yalıtım uygulamaları ve iç mekan ürünleri sıfır olduğu için kısa vadede bakım ve onarım ihtiyacı daha azdır. Bu durum, ev sahibine taşındıktan sonra ek masraf çıkma riskini azaltır.</p>
  
    <p>İkinci el konutlarda sık karşılaşılan eski tesisat, nem, yalıtım eksikliği, kapı-pencere deformasyonu veya ortak alan yenileme ihtiyacı gibi konular, yeni projelerde çok daha kontrollü şekilde yönetilir.</p>
  
    <h3>5. Enerji Verimliliği ve Yalıtım Avantajı Sağlar</h3>
    <p>Yeni konut projelerinde ısı yalıtımı, ses yalıtımı, kaliteli doğrama sistemleri ve enerji verimliliği sağlayan yapı malzemeleri daha fazla önem kazanmıştır. Bu da hem yaşam konforunu artırır hem de uzun vadede enerji giderlerini azaltmaya yardımcı olur.</p>
  
    <p>İyi tasarlanmış bir yalıtım sistemi; yaz aylarında serin, kış aylarında ise daha sıcak bir iç mekan deneyimi sunar. Aynı zamanda komşu dairelerden veya dış ortamdan gelen seslerin azaltılması da günlük yaşam kalitesini doğrudan etkiler.</p>
  
    <h3>6. Krediye Uygunluk ve Tapu Süreci Daha Net Olabilir</h3>
    <p>Yeni konut projelerinden daire alırken proje belgeleri, ruhsat durumu, yapı kullanma izin belgesi, tapu süreci ve banka kredisine uygunluk gibi konular daha planlı ilerleyebilir. Özellikle kurumsal firmalar tarafından geliştirilen projelerde alıcılar için süreç daha şeffaf ve takip edilebilir olur.</p>
  
    <p>Konut kredisi kullanmayı düşünen alıcılar için dairenin krediye uygun olması önemli bir avantajdır. Bu nedenle satın alma kararı vermeden önce tapu durumu, iskan süreci ve banka değerlendirmesi hakkında detaylı bilgi alınmalıdır.</p>
  
    <h3>7. Yatırım Değeri ve Prim Potansiyeli Yüksektir</h3>
    <p>Yeni konut projeleri, özellikle gelişmekte olan bölgelerde uzun vadeli değer artışı potansiyeli taşıyabilir. Ulaşım bağlantıları, çevredeki sosyal donatılar, okul, hastane, alışveriş alanları ve bölgenin gelişim hızı konut değerini etkileyen önemli faktörlerdir.</p>
  
    <p>İzmir gibi sürekli gelişen bir şehirde, doğru lokasyonda yer alan yeni konut projeleri hem oturum hem de yatırım amacıyla değerlendirilebilir. Özellikle teslim aşamasında veya satış süreci devam eden projeler, erken karar veren alıcılar için avantajlı fırsatlar sunabilir.</p>
  
    <h3>8. Ortak Alanlar ve Güncel Yaşam Standartları</h3>
    <p>Yeni konut projelerinde otopark, asansör, güvenli giriş, peyzaj alanı, modern bina girişi ve ortak kullanım alanları daha planlı şekilde tasarlanır. Bu detaylar, yalnızca estetik açıdan değil, günlük yaşam kolaylığı açısından da önemlidir.</p>
  
    <p>Özellikle aileler için güvenli bina girişi, düzenli otopark alanı ve bakımlı ortak alanlar konut tercihinde belirleyici olabilir. Yeni projelerde bu ihtiyaçlar proje tasarımının başından itibaren dikkate alınır.</p>
  
    <h3>Yeni Konut Projesinden Daire Alırken Nelere Dikkat Edilmeli?</h3>
    <p>Yeni konut projesinden daire alırken yalnızca fiyat karşılaştırması yapmak yeterli değildir. Alıcıların şu başlıklara özellikle dikkat etmesi gerekir:</p>
  
    <ul>
      <li><strong>Firma güvenilirliği:</strong> Projeyi yapan firmanın geçmiş işleri ve mühendislik yaklaşımı incelenmelidir.</li>
      <li><strong>Lokasyon:</strong> Bölgenin ulaşım, sosyal yaşam ve yatırım potansiyeli değerlendirilmelidir.</li>
      <li><strong>Yapı güvenliği:</strong> Beton sınıfı, zemin etüdü, taşıyıcı sistem ve yapı denetim süreci sorgulanmalıdır.</li>
      <li><strong>Daire planı:</strong> Oda yerleşimi, metrekare kullanımı, cephe ve ışık alma durumu kontrol edilmelidir.</li>
      <li><strong>Teslim durumu:</strong> Dairenin teslim tarihi, tapu süreci ve iskan durumu netleştirilmelidir.</li>
      <li><strong>Satış sonrası destek:</strong> Firma ile iletişim, garanti ve olası teknik destek süreçleri öğrenilmelidir.</li>
    </ul>
  
    <h3>Neli Mühendislik Satışta Olan Sıfır Daireleriyle Yanınızda</h3>
    <p><strong>Neli Mühendislik</strong> olarak İzmir'de modern yaşam ihtiyaçlarına uygun, güvenli, fonksiyonel ve kaliteli sıfır daire projeleri geliştiriyoruz. Konut sahibi olmak isteyenler için 1+1, 2+1 ve 3+1 daire seçenekleriyle farklı ihtiyaçlara hitap eden projelerimizi satışa sunuyoruz.</p>
  
    <p>Yeni konut projesinden daire almanın avantajlarını değerlendirirken, yalnızca bugünkü ihtiyaçlarınızı değil, gelecekteki yaşam konforunuzu ve yatırım değerinizi de düşünmelisiniz. Neli Mühendislik olarak amacımız; sağlam mühendislik anlayışı, kaliteli malzeme kullanımı ve doğru lokasyon seçimiyle uzun yıllar güvenle yaşayabileceğiniz konutlar üretmektir.</p>
  
    <p>İzmir'de satışta olan sıfır dairelerimizi ve güncel konut projelerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz. Size uygun 1+1, 2+1 veya 3+1 daire seçeneklerini görüntüleyerek Neli Mühendislik projeleri hakkında detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/yeni-konut-projesi.webp",
    coverImageAlt:
      "Yeni konut projesinden daire almanın avantajları — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "yeni konut projesinden daire almanın avantajları",
      "sıfır daire almanın avantajları",
      "İzmir yeni konut projeleri",
      "İzmir sıfır daire",
      "Çiğli satılık sıfır daire",
      "1+1 2+1 3+1 sıfır daire",
      "Neli Mühendislik projeleri",
      "konut satın alma rehberi",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Yeni Konut Projesinden Daire Almanın Avantajları | Neli Mühendislik",
    metaDescription:
      "Yeni konut projesinden daire almanın avantajlarını keşfedin. Sıfır kullanım, güncel deprem yönetmeliği, modern mimari, düşük bakım maliyeti ve yatırım potansiyeli hakkında bilgi alın.",
    metaKeywords:
      "yeni konut projesinden daire almanın avantajları, sıfır daire almanın avantajları, İzmir yeni konut projeleri, İzmir sıfır daire, Çiğli satılık daire, Neli Mühendislik",
    publishedAt: "2026-06-01",
  },
  {
    slug: "yeni-binalarda-cati-izolasyonu-nasil-olmali",
    title: "Yeni Binalarda Çatı İzolasyonu Nasıl Olmalı?",
    excerpt:
      "Yeni binalarda çatı izolasyonu; su yalıtımı, ısı yalıtımı, buhar dengeleme ve doğru uygulama detaylarıyla birlikte düşünülmelidir. Sağlam bir çatı sistemi, binanın ömrünü ve yaşam konforunu doğrudan etkiler.",
    content: `<article>
    <h2>Yeni Binalarda Çatı İzolasyonu Nasıl Olmalı?</h2>
    <p>Yeni bir bina satın alırken çoğu kişi dairenin konumuna, oda sayısına, mutfak ve banyo detaylarına odaklanır. Ancak binanın uzun ömürlü, konforlu ve güvenli olması için gözden kaçırılmaması gereken en önemli konulardan biri <strong>çatı izolasyonu</strong>dur. Çünkü çatı, binayı yağmur, kar, sıcaklık farkı, nem ve dış ortam koşullarına karşı koruyan en kritik yapı elemanlarından biridir.</p>
  
    <p>Özellikle yeni binalarda çatı izolasyonu yalnızca su sızıntısını önlemek için değil; ısı kaybını azaltmak, enerji verimliliğini artırmak, nem ve küf oluşumunu engellemek, üst katlarda yaşam konforunu yükseltmek ve binanın taşıyıcı sistemini korumak için de doğru şekilde yapılmalıdır.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni binalarda çatı izolasyonu; su yalıtımı, ısı yalıtımı, buhar kontrolü, eğim betonu, drenaj detayları ve doğru malzeme uygulamasıyla birlikte planlanmalıdır. İyi yapılmış bir çatı izolasyonu; yağmur suyu sızıntılarını önler, enerji tasarrufu sağlar, nem ve küf oluşumunu engeller, üst katlarda konforu artırır ve binanın kullanım ömrünü uzatır.
    </blockquote>
  
    <h3>Çatı İzolasyonu Neden Önemlidir?</h3>
    <p>Çatı, binanın dış etkenlere en fazla maruz kalan bölümlerinden biridir. Yağmur, rüzgar, güneş, sıcaklık değişimleri ve nem zamanla çatı yüzeyinde deformasyona neden olabilir. Eğer çatı izolasyonu doğru yapılmazsa, kısa süre içinde su sızıntıları, rutubet, tavan lekeleri, küf oluşumu ve ısı kaybı gibi problemler ortaya çıkabilir.</p>
  
    <p>Yeni binalarda bu sorunların baştan önlenmesi, ileride oluşabilecek yüksek tadilat maliyetlerini azaltır. Bu nedenle çatı izolasyonu, inşaat sürecinin sonradan düşünülecek bir detayı değil, proje aşamasından itibaren planlanması gereken temel bir yapı güvenliği unsurudur.</p>
  
    <h3>Yeni Binalarda Çatı İzolasyonu Hangi Katmanlardan Oluşmalı?</h3>
    <p>Doğru bir çatı izolasyonu tek bir malzeme uygulamasından ibaret değildir. Çatının eğimi, kullanım amacı, iklim koşulları ve proje detaylarına göre farklı katmanlar birlikte değerlendirilmelidir. Genel olarak yeni binalarda çatı izolasyonu şu başlıklardan oluşmalıdır:</p>
  
    <ul>
      <li><strong>Eğim düzenlemesi:</strong> Yağmur suyunun çatıda birikmemesi için doğru eğim verilmelidir.</li>
      <li><strong>Su yalıtımı:</strong> Yağmur ve kar sularının binaya sızmasını önleyen ana koruma katmanıdır.</li>
      <li><strong>Isı yalıtımı:</strong> Yazın aşırı ısınmayı, kışın ise ısı kaybını azaltmaya yardımcı olur.</li>
      <li><strong>Buhar kontrolü:</strong> İç mekandan gelen nemin yalıtım katmanlarına zarar vermesini engeller.</li>
      <li><strong>Drenaj detayları:</strong> Suyun çatı yüzeyinden güvenli şekilde uzaklaştırılmasını sağlar.</li>
      <li><strong>Koruyucu kaplama:</strong> Yalıtım malzemesinin dış etkenlere karşı daha uzun ömürlü olmasına katkı sağlar.</li>
    </ul>
  
    <h3>1. Çatıda Su Yalıtımı Mutlaka Yapılmalıdır</h3>
    <p>Çatı izolasyonunun en temel amacı, yağmur ve kar sularının bina içine sızmasını önlemektir. Su yalıtımı yapılmayan veya hatalı yapılan çatılarda zamanla tavanlarda lekelenme, sıva kabarması, boya dökülmesi, rutubet ve küf oluşumu görülebilir.</p>
  
    <p>Yeni binalarda su yalıtımı yapılırken yalnızca düz yüzeyler değil; baca dipleri, parapetler, gider ağızları, köşe birleşimleri ve teras çatı detayları da dikkatle çözülmelidir. Çünkü çatı sızıntıları çoğu zaman yüzeyden değil, birleşim ve detay noktalarından kaynaklanır.</p>
  
    <h3>2. Isı Yalıtımı Enerji Verimliliği Sağlar</h3>
    <p>Çatıdan kaynaklanan ısı kayıpları, özellikle üst kat dairelerde enerji tüketimini doğrudan etkileyebilir. Kış aylarında ısınma giderlerinin artması, yaz aylarında ise dairenin fazla ısınması çoğu zaman yetersiz çatı ısı yalıtımından kaynaklanır.</p>
  
    <p>Doğru uygulanan çatı ısı yalıtımı, iç mekan sıcaklığının daha dengeli kalmasına yardımcı olur. Bu da hem yaşam konforunu artırır hem de doğalgaz ve klima kullanım maliyetlerini azaltabilir. Yeni binalarda enerji verimliliği açısından çatı yalıtımı, dış cephe yalıtımı kadar önemli bir konudur.</p>
  
    <h3>3. Çatıda Su Birikmesini Önleyen Eğim Detayı Olmalıdır</h3>
    <p>Çatıda yalıtım malzemesi ne kadar kaliteli olursa olsun, suyun yüzeyde uzun süre birikmesi zamanla risk oluşturabilir. Bu nedenle yeni binalarda çatı eğimi doğru hesaplanmalı ve yağmur suyunun giderlere yönlendirilmesi sağlanmalıdır.</p>
  
    <p>Özellikle teras çatılarda eğim betonu, süzgeç yerleşimi ve gider detayları büyük önem taşır. Suyun çatıda göllenmesi, yalıtım katmanlarını zorlayabilir ve ilerleyen yıllarda sızıntı ihtimalini artırabilir.</p>
  
    <h3>4. Buhar ve Nem Kontrolü Göz Ardı Edilmemelidir</h3>
    <p>Çatı izolasyonunda yalnızca dışarıdan gelen suya karşı önlem almak yeterli değildir. İç mekandan yükselen sıcak hava ve nem de çatı katmanlarında yoğuşmaya neden olabilir. Bu durum zamanla yalıtım malzemesinin performansını düşürebilir ve küf oluşumuna zemin hazırlayabilir.</p>
  
    <p>Bu nedenle yeni binalarda buhar dengeleyici katmanlar, havalandırma detayları ve doğru malzeme seçimi birlikte değerlendirilmelidir. Özellikle üst katlarda sağlıklı ve konforlu yaşam alanları oluşturmak için nem kontrolü önemlidir.</p>
  
    <h3>5. Çatı Yalıtımında Malzeme Kalitesi Kadar İşçilik de Önemlidir</h3>
    <p>Çatı izolasyonunda kullanılan malzemenin kaliteli olması önemlidir; ancak doğru işçilik olmadan kaliteli malzeme tek başına yeterli değildir. Ek yerlerinin hatalı yapılması, köşe dönüşlerinin zayıf bırakılması, gider çevrelerinin iyi çözülmemesi veya yalıtım katmanının korunmaması ileride ciddi sorunlara yol açabilir.</p>
  
    <p>Bu nedenle yeni binalarda çatı izolasyonu profesyonel ekipler tarafından, proje detaylarına uygun şekilde uygulanmalıdır. Uygulama sonrası kontrol yapılmalı ve özellikle su tahliye noktalarının doğru çalıştığından emin olunmalıdır.</p>
  
    <h3>Yeni Bina Alırken Çatı İzolasyonu Nasıl Kontrol Edilir?</h3>
    <p>Yeni bir daire satın almayı düşünen kullanıcılar, çatı izolasyonunu doğrudan göremeyebilir. Ancak doğru soruları sorarak binanın yalıtım kalitesi hakkında fikir sahibi olabilirler. Daire almadan önce şu konular mutlaka sorgulanmalıdır:</p>
  
    <ul>
      <li>Çatıda su yalıtımı yapıldı mı?</li>
      <li>Isı yalıtımı için hangi malzemeler kullanıldı?</li>
      <li>Teras veya çatı eğimi su birikmesini önleyecek şekilde çözüldü mü?</li>
      <li>Gider, süzgeç ve drenaj detayları doğru planlandı mı?</li>
      <li>Çatı birleşim noktalarında ek yalıtım uygulandı mı?</li>
      <li>Üst kat dairelerde ısı ve nem konforu için gerekli önlemler alındı mı?</li>
    </ul>
  
    <h3>Neli Mühendislik Olarak Çatıda Gerekli Tüm Yalıtımları Yapıyoruz</h3>
    <p><strong>Neli Mühendislik</strong> olarak geliştirdiğimiz konut projelerinde yalnızca daire içi estetiğe değil, binanın uzun ömürlü ve güvenli olmasını sağlayan teknik detaylara da büyük önem veriyoruz. Çatı izolasyonu da bu yaklaşımın en önemli parçalarından biridir.</p>
  
    <p>Projelerimizde çatıda gerekli su yalıtımı, ısı yalıtımı, eğim ve drenaj detayları titizlikle planlanır. Yağmur suyunun binaya zarar vermemesi, üst katlarda yaşam konforunun korunması, nem ve rutubet riskinin azaltılması için uygulama süreçleri dikkatle takip edilir.</p>
  
    <p>Bizim için kaliteli konut üretimi yalnızca güzel görünen yaşam alanları inşa etmek değildir. Aynı zamanda temelden çatıya kadar her detayın mühendislik disipliniyle çözülmesi, uzun yıllar güvenle kullanılabilecek yapılar ortaya çıkarılmasıdır.</p>
  
    <h3>İzmir’de Satışta Olan Sıfır Dairelerimizi İnceleyin</h3>
    <p>Yeni bina alırken çatı izolasyonu, yapı güvenliği, malzeme kalitesi ve mühendislik detayları mutlaka değerlendirilmelidir. Neli Mühendislik olarak İzmir’de satışta olan sıfır daire projelerimizde bu teknik detaylara önem veriyor; konforlu, güvenli ve uzun ömürlü yaşam alanları sunmayı hedefliyoruz.</p>
  
    <p>Satışta olan güncel projelerimizi, 1+1, 2+1 ve 3+1 sıfır daire seçeneklerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz. Size uygun daire seçeneklerini görüntüleyerek Neli Mühendislik projeleri hakkında detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/cati-yalitimi.webp",
    coverImageAlt:
      "Yeni binalarda çatı izolasyonu ve yalıtım uygulamaları — Neli Mühendislik",
    category: "Mühendislik ve Yapı Teknolojileri",
    tags: JSON.stringify([
      "yeni binalarda çatı izolasyonu nasıl olmalı",
      "çatı izolasyonu nasıl yapılır",
      "çatı su yalıtımı",
      "çatı ısı yalıtımı",
      "yeni bina çatı yalıtımı",
      "çatıdan su sızıntısı nasıl önlenir",
      "İzmir sıfır daire",
      "Neli Mühendislik projeleri",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Yeni Binalarda Çatı İzolasyonu Nasıl Olmalı? | Neli Mühendislik",
    metaDescription:
      "Yeni binalarda çatı izolasyonu nasıl olmalı? Su yalıtımı, ısı yalıtımı, eğim, drenaj ve nem kontrolü hakkında bilgi alın. Neli Mühendislik’in satışta olan sıfır daire projelerini inceleyin.",
    metaKeywords:
      "yeni binalarda çatı izolasyonu nasıl olmalı, çatı izolasyonu, çatı su yalıtımı, çatı ısı yalıtımı, yeni bina yalıtımı, İzmir sıfır daire, Neli Mühendislik",
    publishedAt: "2026-06-01",
  },
  {
    slug: "yeni-bina-alirken-yapi-denetim-raporu-neden-onemlidir",
    title: "Yeni Bina Alırken Yapı Denetim Raporu Neden Önemlidir?",
    excerpt:
      "Yeni bina alırken yapı denetim raporu; binanın ruhsatlı, yönetmeliklere uygun, denetlenmiş ve güvenli şekilde inşa edilip edilmediğini anlamak için kontrol edilmesi gereken en önemli belgelerden biridir.",
    content: `<article>
    <h2>Yeni Bina Alırken Yapı Denetim Raporu Neden Önemlidir?</h2>
    <p>Yeni bir daire satın alırken çoğu kişi öncelikle konuma, metrekareye, oda sayısına, cepheye ve fiyat avantajına odaklanır. Ancak bir konutun gerçekten güvenli ve uzun ömürlü olup olmadığını anlamak için yalnızca görünen detaylara bakmak yeterli değildir. Binanın ruhsatlı, projeye uygun ve teknik standartlara göre inşa edilip edilmediğini gösteren en önemli süreçlerden biri <strong>yapı denetim süreci</strong>dir.</p>
  
    <p>Özellikle sıfır daire almayı düşünen kullanıcılar için <strong>yapı denetim raporu</strong>, satın alınacak binanın mühendislik açısından kontrol edildiğini gösteren önemli bir güven unsurudur. Bu rapor ve yapı denetim süreci; temel, beton, demir donatı, taşıyıcı sistem, proje uygunluğu ve uygulama kalitesi gibi kritik konuların denetlendiğini ortaya koyar.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni bina alırken yapı denetim raporu önemlidir çünkü binanın ruhsatlı projesine, güncel yönetmeliklere, zemin etüdüne, beton ve demir donatı standartlarına uygun şekilde inşa edilip edilmediğini anlamaya yardımcı olur. Yapı denetim süreci; alıcının yalnızca estetik değil, güvenlik ve teknik kalite açısından da doğru karar vermesini sağlar.
    </blockquote>
  
    <h3>Yapı Denetim Raporu Nedir?</h3>
    <p>Yapı denetim raporu, bir binanın inşaat sürecinde belirli teknik kontrollerden geçtiğini gösteren belge ve kayıtların genel ifadesidir. Bu süreçte yapı denetim firmaları; binanın onaylı mimari, statik, mekanik ve elektrik projelerine uygun yapılıp yapılmadığını kontrol eder.</p>
  
    <p>Yapı denetim yalnızca inşaat bittikten sonra yapılan bir kontrol değildir. Temel aşamasından kaba inşaata, beton dökümünden demir donatı kontrollerine, tesisat uygulamalarından yapı kullanma izni sürecine kadar birçok aşamada denetim yapılır. Bu nedenle yeni bina alırken yapı denetim sürecinin tamamlanmış olması, alıcı için önemli bir güven göstergesidir.</p>
  
    <h3>Yeni Bina Alırken Yapı Denetim Raporu Neden Kontrol Edilmeli?</h3>
    <p>Yeni bir bina dışarıdan modern, estetik ve kaliteli görünebilir. Fakat binanın asıl güvenliği, görünmeyen taşıyıcı sisteminde ve uygulama kalitesinde saklıdır. Yapı denetim süreci, bu görünmeyen teknik detayların kontrol altında tutulmasını sağlar.</p>
  
    <p>Bu nedenle daire satın almadan önce binanın ruhsat durumu, yapı denetim süreci, iskan belgesi ve projeye uygunluğu hakkında bilgi almak gerekir. Özellikle deprem güvenliği açısından taşıyıcı sistemin doğru uygulanmış olması büyük önem taşır.</p>
  
    <h3>1. Binanın Ruhsatlı ve Projeye Uygun Yapıldığını Gösterir</h3>
    <p>Yapı denetim süreci, binanın belediye tarafından onaylanmış projelerine uygun şekilde inşa edilip edilmediğini kontrol eder. Mimari proje, statik proje, elektrik ve mekanik projeler binanın teknik yol haritasıdır. İnşaatın bu projelere uygun ilerlemesi, güvenli ve yasal bir yapı için temel şarttır.</p>
  
    <p>Yeni bina alırken projeye uygunluk özellikle önemlidir. Çünkü projeye aykırı uygulamalar ileride iskan, tapu, kredi kullanımı veya tadilat süreçlerinde sorun oluşturabilir. Bu nedenle yapı denetim kayıtları, alıcının daha bilinçli karar vermesine yardımcı olur.</p>
  
    <h3>2. Beton ve Demir Donatı Kalitesi Denetlenir</h3>
    <p>Bir binanın dayanıklılığını belirleyen en önemli unsurlardan biri taşıyıcı sistemdir. Kolon, kiriş, perde beton, temel sistemi, kullanılan demir donatı ve beton sınıfı yapı güvenliğinin ana bileşenleridir.</p>
  
    <p>Yapı denetim sürecinde beton dökümü, numune alımı, laboratuvar testleri, demir donatı yerleşimi ve statik projeye uygunluk gibi konular kontrol edilir. Bu kontroller, binanın yalnızca kağıt üzerinde değil, uygulamada da mühendislik standartlarına uygun yapılmasını amaçlar.</p>
  
    <h3>3. Deprem Güvenliği Açısından Kritik Bir Süreçtir</h3>
    <p>Türkiye deprem riski yüksek bir ülkedir. Bu nedenle konut satın alırken binanın deprem yönetmeliklerine uygunluğu en önemli karar kriterlerinden biri olmalıdır. Yapı denetim süreci, binanın yürürlükteki yönetmeliklere göre projelendirilip uygulanmasını takip eder.</p>
  
    <p>Depreme dayanıklı bir yapı için yalnızca kaliteli beton kullanmak yeterli değildir. Zemin etüdü, temel sistemi, taşıyıcı elemanların doğru boyutlandırılması, demir donatı düzeni, beton kalitesi ve uygulama işçiliği bir bütün olarak değerlendirilmelidir. Yapı denetim raporu bu bütünün kontrol edildiğini gösteren önemli bir göstergedir.</p>
  
    <h3>4. Alıcı İçin Şeffaflık ve Güven Sağlar</h3>
    <p>Yeni bina satın alırken alıcının tüm teknik detayları kendisinin incelemesi mümkün olmayabilir. Yapı denetim süreci, teknik uzmanlar tarafından yapılan kontroller sayesinde alıcıya daha şeffaf bir satın alma süreci sunar.</p>
  
    <p>Bir projede yapı denetim süreçlerinin düzenli yürütülmesi, firmanın kurumsal çalışma disiplinini ve teknik kaliteye verdiği önemi de gösterir. Bu nedenle yapı denetim bilgileri, yalnızca resmi bir belge değil, aynı zamanda güvenilirlik göstergesidir.</p>
  
    <h3>5. İskan ve Kredi Sürecini Etkileyebilir</h3>
    <p>Yeni bina alırken dikkat edilmesi gereken konulardan biri de <strong>iskan belgesi</strong> yani yapı kullanma izin belgesidir. İskan süreci, binanın projeye ve ilgili mevzuata uygun şekilde tamamlandığını gösterir. Yapı denetim süreci de bu aşamanın önemli parçalarından biridir.</p>
  
    <p>İskanı olmayan veya proje uygunluğu konusunda sorun bulunan yapılarda banka kredisi, tapu işlemleri veya ileride yapılacak satış süreçleri daha zor ilerleyebilir. Bu nedenle yapı denetim durumu ve iskan süreci, konut alıcısı için yalnızca teknik değil, aynı zamanda finansal açıdan da önemlidir.</p>
  
    <h3>6. Satın Alma Sonrası Riskleri Azaltır</h3>
    <p>Yapı denetim raporu ve denetim süreci, satın alma sonrası karşılaşılabilecek bazı risklerin azaltılmasına yardımcı olur. Projeye aykırı imalatlar, eksik uygulamalar, taşıyıcı sistem hataları veya teknik kusurlar ileride ciddi maliyetlere yol açabilir.</p>
  
    <p>Yeni bina alırken bu sürecin baştan sorgulanması, alıcının daha güvenli bir yatırım yapmasını sağlar. Özellikle uzun yıllar oturulacak veya yatırım amacıyla alınacak bir dairede, teknik güvenlik en az lokasyon ve fiyat kadar önemlidir.</p>
  
    <h3>Yeni Bina Alırken Yapı Denetimle İlgili Hangi Sorular Sorulmalı?</h3>
    <p>Yeni bir daire satın almadan önce yapı denetim süreciyle ilgili bazı temel sorular sormak gerekir. Bu sorular, binanın teknik kalitesi hakkında daha net fikir verir:</p>
  
    <ul>
      <li>Binanın yapı ruhsatı var mı?</li>
      <li>Yapı denetim firması tarafından süreç takip edildi mi?</li>
      <li>Beton numune testleri ve laboratuvar kontrolleri yapıldı mı?</li>
      <li>Statik proje ve uygulama birbiriyle uyumlu mu?</li>
      <li>Zemin etüdü yapıldı mı?</li>
      <li>Binanın iskan belgesi alındı mı veya süreç hangi aşamada?</li>
      <li>Kullanılan beton sınıfı ve taşıyıcı sistem detayları hakkında bilgi veriliyor mu?</li>
      <li>Projede yapı güvenliğiyle ilgili ek mühendislik önlemleri var mı?</li>
    </ul>
  
    <h3>Yapı Denetim Raporu Tek Başına Yeterli midir?</h3>
    <p>Yapı denetim süreci çok önemli olsa da, bilinçli bir konut alıcısı yalnızca tek bir belgeye bakarak karar vermemelidir. Binanın lokasyonu, zemin yapısı, malzeme kalitesi, firma güvenilirliği, mimari planı, yalıtım detayları ve satış sonrası destek süreçleri birlikte değerlendirilmelidir.</p>
  
    <p>Bu nedenle yeni bina alırken hem resmi belgeleri hem de projeyi geliştiren firmanın mühendislik yaklaşımını incelemek gerekir. Güvenilir firmalar, konut alıcılarına yalnızca daire özelliklerini değil, yapının teknik altyapısını da açık şekilde anlatmalıdır.</p>
  
    <h3>Neli Mühendislik Olarak Yapı Güvenliğine Önem Veriyoruz</h3>
    <p><strong>Neli Mühendislik</strong> olarak geliştirdiğimiz konut projelerinde yalnızca estetik ve fonksiyonel daireler üretmeyi değil, aynı zamanda güvenli ve uzun ömürlü yapılar inşa etmeyi hedefliyoruz. Bizim için kaliteli konut anlayışı; temelden çatıya kadar her aşamanın mühendislik disipliniyle planlanması ve uygulanmasıdır.</p>
  
    <p>Projelerimizde yapı güvenliği, malzeme kalitesi, doğru uygulama, yalıtım detayları ve teknik süreçler titizlikle ele alınır. Yeni bina alırken yapı denetim sürecinin ve teknik kalite detaylarının önemini bilen alıcılar için güven veren, modern ve yaşanabilir konutlar sunmayı amaçlıyoruz.</p>
  
    <p>Neli Mühendislik olarak satışta olan sıfır daire projelerimizde; modern yaşam ihtiyaçlarına uygun planlar, güvenli yapı anlayışı ve kaliteli mühendislik yaklaşımıyla hareket ediyoruz. 1+1, 2+1 ve 3+1 daire seçeneklerimizi inceleyerek size uygun yaşam alanını kolayca değerlendirebilirsiniz.</p>
  
    <h3>İzmir’de Satışta Olan Sıfır Dairelerimizi İnceleyin</h3>
    <p>Yeni bina alırken yapı denetim raporu, yapı güvenliği, iskan süreci ve firma güvenilirliği mutlaka dikkate alınmalıdır. Neli Mühendislik olarak İzmir’de satışta olan sıfır daire projelerimizde teknik detaylara önem veriyor; güvenli, kaliteli ve uzun ömürlü yaşam alanları sunmayı hedefliyoruz.</p>
  
    <p>Güncel projelerimizi ve satışta olan 1+1, 2+1 ve 3+1 sıfır daire seçeneklerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz. Neli Mühendislik projelerini görüntüleyerek size en uygun daire hakkında detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/yapi-denetim.webp",
    coverImageAlt:
      "Yeni bina alırken yapı denetim raporu ve yapı güvenliği — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "yeni bina alırken yapı denetim raporu neden önemlidir",
      "yapı denetim raporu nedir",
      "yeni bina alırken nelere dikkat edilmeli",
      "sıfır daire alırken yapı güvenliği",
      "depreme dayanıklı bina nasıl anlaşılır",
      "iskan belgesi neden önemlidir",
      "İzmir sıfır daire",
      "Neli Mühendislik projeleri",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Yeni Bina Alırken Yapı Denetim Raporu Neden Önemlidir? | Neli Mühendislik",
    metaDescription:
      "Yeni bina alırken yapı denetim raporu neden önemlidir? Ruhsat, iskan, beton kalitesi, deprem güvenliği ve teknik denetim süreci hakkında bilgi alın. Neli Mühendislik’in satışta olan sıfır daire projelerini inceleyin.",
    metaKeywords:
      "yeni bina alırken yapı denetim raporu neden önemlidir, yapı denetim raporu, yapı denetim nedir, sıfır daire alırken nelere dikkat edilmeli, deprem güvenliği, iskan belgesi, İzmir sıfır daire, Neli Mühendislik",
    publishedAt: "2026-06-01",
  },
  {
    slug: "konut-projelerinde-kullanilan-malzeme-kalitesi-nasil-anlasilir",
    title: "Konut Projelerinde Kullanılan Malzeme Kalitesi Nasıl Anlaşılır?",
    excerpt:
      "Konut projelerinde kullanılan malzeme kalitesi; yapı güvenliği, yaşam konforu, enerji verimliliği ve uzun vadeli değer açısından büyük önem taşır. Daire alırken beton, demir, yalıtım, doğrama, tesisat ve iç mekan malzemeleri dikkatle değerlendirilmelidir.",
    content: `<article>
    <h2>Konut Projelerinde Kullanılan Malzeme Kalitesi Nasıl Anlaşılır?</h2>
    <p>Yeni bir daire satın alırken çoğu kişi lokasyon, fiyat, oda sayısı, cephe ve metrekare gibi kriterlere odaklanır. Ancak bir konutun gerçek değerini belirleyen en önemli unsurlardan biri de <strong>kullanılan malzeme kalitesidir</strong>. Çünkü kaliteli malzeme; binanın güvenliğini, dayanıklılığını, konforunu ve uzun yıllar sorunsuz kullanılmasını doğrudan etkiler.</p>
  
    <p>Konut projelerinde malzeme kalitesi yalnızca gözle görünen seramik, kapı, mutfak dolabı veya parke gibi detaylarla sınırlı değildir. Binanın temelinden çatısına kadar kullanılan beton, demir, yalıtım malzemeleri, doğrama sistemleri, elektrik tesisatı, su tesisatı ve ortak alan uygulamaları da kalite değerlendirmesinin önemli parçalarıdır.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Konut projelerinde kullanılan malzeme kalitesi; beton sınıfı, demir donatı uygulaması, ısı ve su yalıtımı, pencere-doğrama sistemi, elektrik ve su tesisatı, zemin kaplamaları, mutfak-banyo ürünleri ve işçilik kalitesi incelenerek anlaşılır. Kaliteli malzeme kullanılan projeler daha güvenli, konforlu, enerji verimli ve uzun ömürlü olur.
    </blockquote>
  
    <h3>Malzeme Kalitesi Konut Alırken Neden Önemlidir?</h3>
    <p>Bir konut projesinde kullanılan malzemeler, binanın yalnızca bugünkü görünümünü değil, gelecekteki performansını da belirler. Kalitesiz veya standart altı malzeme kullanımı; kısa sürede tadilat ihtiyacı, ısı kaybı, su sızıntısı, ses problemi, tesisat arızası ve estetik deformasyon gibi sorunlara yol açabilir.</p>
  
    <p>Bu nedenle daire satın alırken yalnızca dairenin yeni olması yeterli değildir. Hangi malzemelerin kullanıldığı, bu malzemelerin hangi standartlara uygun olduğu ve uygulamanın nasıl yapıldığı da mutlaka sorgulanmalıdır.</p>
  
    <h3>1. Beton Sınıfı ve Taşıyıcı Sistem Kalitesi Sorgulanmalıdır</h3>
    <p>Bir binanın güvenliği açısından en kritik konuların başında beton kalitesi ve taşıyıcı sistem uygulaması gelir. Kolon, kiriş, perde beton, temel sistemi ve döşeme gibi taşıyıcı elemanlar binanın ana iskeletini oluşturur.</p>
  
    <p>Konut alırken kullanılan beton sınıfı, beton numune testleri, zemin etüdü, statik proje uygunluğu ve yapı denetim süreci hakkında bilgi alınmalıdır. Güçlü bir taşıyıcı sistem, kaliteli konut anlayışının temelidir.</p>
  
    <h3>2. Demir Donatı Uygulaması Yapı Güvenliğini Etkiler</h3>
    <p>Betonarme yapılarda yalnızca beton kalitesi değil, demir donatı uygulaması da büyük önem taşır. Donatı çapları, yerleşim aralıkları, etriye sıklaştırmaları, kolon-kiriş birleşimleri ve projeye uygunluk yapı güvenliği açısından kritik detaylardır.</p>
  
    <p>Bu detaylar doğrudan gözle görülmese de, yapı denetim süreci ve proje uygulama disiplini sayesinde kontrol edilir. Güvenilir firmalar, taşıyıcı sistemin yönetmeliklere uygun şekilde uygulanmasına büyük önem verir.</p>
  
    <h3>3. Isı Yalıtımı ve Mantolama Kalitesi İncelenmelidir</h3>
    <p>Yeni konut projelerinde ısı yalıtımı, yaşam konforu ve enerji tasarrufu açısından önemli bir kriterdir. Kaliteli mantolama uygulaması, kışın ısı kaybını azaltırken yaz aylarında da iç mekanın daha dengeli sıcaklıkta kalmasına yardımcı olur.</p>
  
    <p>Daire alırken dış cephede hangi yalıtım malzemesinin kullanıldığı, uygulama kalınlığı, detay çözümleri ve işçilik kalitesi hakkında bilgi alınmalıdır. İyi yapılmış bir ısı yalıtımı, uzun vadede doğalgaz ve klima maliyetlerini azaltmaya katkı sağlar.</p>
  
    <h3>4. Su Yalıtımı ve Çatı İzolasyonu Göz Ardı Edilmemelidir</h3>
    <p>Malzeme kalitesini anlamanın önemli yollarından biri de binanın su yalıtım detaylarını incelemektir. Temel, bodrum, teras, balkon, ıslak hacimler ve çatı bölgelerinde doğru su yalıtımı yapılması binanın uzun ömürlü olması için gereklidir.</p>
  
    <p>Eksik veya hatalı su yalıtımı; rutubet, küf, boya kabarması, tavan lekesi ve betonarme elemanlarda zarar gibi ciddi sorunlara neden olabilir. Bu yüzden yeni bina alırken çatı izolasyonu, temel yalıtımı ve banyo-balkon yalıtım detayları mutlaka sorgulanmalıdır.</p>
  
    <h3>5. Pencere ve Doğrama Sistemleri Konforu Belirler</h3>
    <p>Pencere ve doğrama kalitesi, dairenin ısı, ses ve hava yalıtımı performansını doğrudan etkiler. Kaliteli doğrama sistemleri; dış ortamdan gelen sesi azaltır, ısı kaybını önler ve iç mekanda daha konforlu bir yaşam sunar.</p>
  
    <p>Daire alırken kullanılan cam tipi, doğrama markası, profil kalitesi, conta sistemi ve montaj işçiliği değerlendirilmelidir. Özellikle yoğun caddeye, rüzgara veya dış sese açık bölgelerde doğrama kalitesi daha da önemli hale gelir.</p>
  
    <h3>6. Elektrik ve Su Tesisatı Kaliteli Malzemelerle Yapılmalıdır</h3>
    <p>Elektrik ve su tesisatı, daire içinde uzun yıllar sorunsuz kullanım için dikkat edilmesi gereken teknik detaylardır. Kalitesiz kablo, boru, sigorta, vana veya bağlantı elemanları ilerleyen dönemlerde arıza, kaçak veya güvenlik riski oluşturabilir.</p>
  
    <p>Yeni konut projelerinde elektrik panosu, priz yerleşimi, aydınlatma altyapısı, internet ve uydu tesisatı, temiz su ve pis su hatları doğru planlanmalıdır. Bu alanlarda kaliteli malzeme ve düzgün işçilik, satın alma sonrası konforu doğrudan etkiler.</p>
  
    <h3>7. İç Mekan Malzemeleri Uzun Ömürlü Olmalıdır</h3>
    <p>Daire içinde kullanılan kapılar, parke, seramik, mutfak dolapları, banyo dolapları, vitrifiye ürünleri ve armatürler hem estetik hem de kullanım ömrü açısından önemlidir. Kaliteli iç mekan malzemeleri, dairenin değerini ve yaşam konforunu artırır.</p>
  
    <p>Özellikle mutfak ve banyo gibi yoğun kullanılan alanlarda neme dayanıklı, sağlam ve kolay temizlenebilir malzemeler tercih edilmelidir. Daire gezisi sırasında kapak menteşeleri, çekmece rayları, tezgah uygulaması, seramik işçiliği ve derz detayları dikkatle incelenmelidir.</p>
  
    <h3>8. İşçilik Kalitesi Malzeme Kadar Önemlidir</h3>
    <p>Konut projelerinde kaliteli malzeme kullanılması tek başına yeterli değildir. Malzemenin doğru uygulanması da en az malzeme seçimi kadar önemlidir. Hatalı işçilik, en kaliteli ürünlerin bile kısa sürede problem çıkarmasına neden olabilir.</p>
  
    <p>Seramiklerde eğrilik, kapılarda boşluk, pencere kenarlarında hava sızıntısı, duvarlarda dalgalanma, süpürgeliklerde açıklık veya banyo giderlerinde eğim problemi gibi detaylar işçilik kalitesi hakkında fikir verir.</p>
  
    <h3>Konut Alırken Malzeme Kalitesi Nasıl Kontrol Edilir?</h3>
    <p>Yeni bir daire satın almadan önce malzeme kalitesini değerlendirmek için şu sorular mutlaka sorulmalıdır:</p>
  
    <ul>
      <li>Kullanılan beton sınıfı nedir?</li>
      <li>Binanın yapı denetim süreci tamamlandı mı?</li>
      <li>Dış cephede hangi ısı yalıtım malzemesi kullanıldı?</li>
      <li>Çatı, temel, balkon ve ıslak hacimlerde su yalıtımı yapıldı mı?</li>
      <li>Pencere ve doğrama sistemi hangi özelliklere sahip?</li>
      <li>Elektrik ve su tesisatında hangi standartlar uygulandı?</li>
      <li>Mutfak ve banyo dolaplarında hangi malzemeler kullanıldı?</li>
      <li>Zemin kaplamaları, kapılar, seramikler ve armatürler hangi kalitede?</li>
      <li>İşçilik detayları düzgün ve temiz mi?</li>
      <li>Satış sonrası teknik destek sağlanıyor mu?</li>
    </ul>
  
    <h3>Malzeme Kalitesi Yatırım Değerini Etkiler mi?</h3>
    <p>Evet, konut projelerinde kullanılan malzeme kalitesi yatırım değerini doğrudan etkiler. Kaliteli malzeme ve doğru işçilikle inşa edilen projeler zaman içinde daha az bakım ihtiyacı doğurur, daha konforlu bir yaşam sunar ve ikinci el değerini daha iyi koruyabilir.</p>
  
    <p>Özellikle İzmir gibi konut talebinin yüksek olduğu şehirlerde, alıcılar artık yalnızca lokasyona değil, binanın teknik kalitesine de dikkat etmektedir. Bu nedenle malzeme kalitesi yüksek projeler hem oturum hem de yatırım amacıyla daha avantajlı hale gelebilir.</p>
  
    <h3>Neli Mühendislik Olarak Kaliteli Malzeme ve Güvenli Yapı Anlayışıyla Çalışıyoruz</h3>
    <p><strong>Neli Mühendislik</strong> olarak geliştirdiğimiz konut projelerinde, yalnızca estetik görünüme değil, yapı güvenliğini ve uzun ömürlü kullanım konforunu sağlayan tüm teknik detaylara önem veriyoruz. Bizim için kaliteli konut üretimi; temelden çatıya kadar doğru malzeme, doğru mühendislik ve doğru işçilik anlayışıyla mümkündür.</p>
  
    <p>Projelerimizde taşıyıcı sistemden yalıtım detaylarına, iç mekan uygulamalarından ortak alan kalitesine kadar her aşamayı dikkatle planlıyoruz. Amacımız; konut alıcılarına güvenli, konforlu, modern ve uzun yıllar değerini koruyacak yaşam alanları sunmaktır.</p>
  
    <p>Konut projelerinde kullanılan malzeme kalitesini sorgulayan bilinçli alıcılar için Neli Mühendislik projeleri, güven veren mühendislik yaklaşımı ve detaylara verilen önemle öne çıkar.</p>
  
    <h3>İzmir’de Satışta Olan Sıfır Dairelerimizi İnceleyin</h3>
    <p>Yeni bir daire satın alırken malzeme kalitesi, yapı güvenliği, yalıtım detayları, tesisat kalitesi ve işçilik mutlaka değerlendirilmelidir. Neli Mühendislik olarak İzmir’de satışta olan sıfır daire projelerimizde bu detaylara önem veriyor; farklı ihtiyaçlara uygun modern yaşam alanları sunuyoruz.</p>
  
    <p>Satışta olan güncel projelerimizi ve 1+1, 2+1, 3+1 sıfır daire seçeneklerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz. Size uygun daire seçeneklerini görüntüleyerek Neli Mühendislik projeleri hakkında detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/malzeme-kalitesi.webp",
    coverImageAlt:
      "Konut projelerinde kullanılan malzeme kalitesi ve yapı güvenliği — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "konut projelerinde kullanılan malzeme kalitesi nasıl anlaşılır",
      "konut alırken malzeme kalitesi",
      "sıfır daire alırken nelere dikkat edilmeli",
      "yeni bina malzeme kalitesi",
      "inşaatta kaliteli malzeme kullanımı",
      "daire alırken yapı kalitesi",
      "İzmir sıfır daire",
      "Neli Mühendislik projeleri",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Konut Projelerinde Kullanılan Malzeme Kalitesi Nasıl Anlaşılır? | Neli Mühendislik",
    metaDescription:
      "Konut projelerinde kullanılan malzeme kalitesi nasıl anlaşılır? Beton, demir, yalıtım, doğrama, tesisat, iç mekan malzemeleri ve işçilik kalitesi hakkında bilgi alın. Neli Mühendislik’in satışta olan sıfır daire projelerini inceleyin.",
    metaKeywords:
      "konut projelerinde kullanılan malzeme kalitesi nasıl anlaşılır, konut alırken malzeme kalitesi, sıfır daire alırken nelere dikkat edilmeli, yeni bina malzeme kalitesi, inşaat malzeme kalitesi, İzmir sıfır daire, Neli Mühendislik",
    publishedAt: "2026-06-01",
  },
  {
    slug: "temel-yalitimi-yapilmayan-binalarda-ne-olur",
    title: "Temel Yalıtımı Yapılmayan Binalarda Ne Olur?",
    excerpt:
      "Temel yalıtımı yapılmayan binalarda su, nem, rutubet, küf, kötü koku ve yapı elemanlarında zamanla hasar oluşabilir. Sağlıklı, güvenli ve uzun ömürlü bir bina için temel yalıtımı kritik öneme sahiptir.",
    content: `<article>
    <h2>Temel Yalıtımı Yapılmayan Binalarda Ne Olur?</h2>
    <p>Bir binanın sağlamlığı yalnızca görünen cephe, daire içi malzemeler veya modern mimari detaylarla değerlendirilmez. Yapının uzun ömürlü ve güvenli olması için en kritik bölümlerden biri <strong>temel sistemi</strong>dir. Temel, binanın yükünü zemine aktaran ana yapı elemanıdır ve sürekli olarak toprak, yeraltı suyu, nem ve dış etkilere maruz kalır.</p>
  
    <p>Bu nedenle <strong>temel yalıtımı</strong>, yeni bina inşaatlarında ihmal edilmemesi gereken en önemli teknik uygulamalardan biridir. Temel yalıtımı yapılmayan veya hatalı yapılan binalarda zamanla su sızıntısı, rutubet, küf, kötü koku, bodrum kat problemleri ve betonarme yapı elemanlarında hasar gibi ciddi sorunlar ortaya çıkabilir.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Temel yalıtımı yapılmayan binalarda zemin suyu ve nem zamanla yapıya sızabilir. Bu durum bodrum katlarda rutubet, küf, kötü koku, boya ve sıva kabarması, ısı kaybı, donatı korozyonu ve betonarme elemanlarda dayanım kaybı gibi sorunlara yol açabilir. Doğru temel yalıtımı, binanın ömrünü uzatır ve yapı güvenliğini korur.
    </blockquote>
  
    <h3>Temel Yalıtımı Nedir?</h3>
    <p>Temel yalıtımı, binanın toprakla temas eden temel, perde duvar, bodrum ve zemin altı bölümlerinin suya ve neme karşı korunması için yapılan uygulamaların genel adıdır. Bu yalıtım sayesinde yeraltı suyu, yağmur suyu veya zeminden gelen nemin bina içine ve taşıyıcı sisteme zarar vermesi önlenir.</p>
  
    <p>Temel yalıtımı; su yalıtım membranları, sürme yalıtım malzemeleri, drenaj levhaları, bohçalama sistemi, drenaj boruları ve koruyucu katmanlar gibi farklı tekniklerle uygulanabilir. Hangi yöntemin kullanılacağı, zemin durumu, yeraltı su seviyesi, bina tipi ve proje detaylarına göre belirlenmelidir.</p>
  
    <h3>Temel Yalıtımı Neden Önemlidir?</h3>
    <p>Temel ve bodrum katlar, binanın en fazla nem ve su etkisine maruz kalan bölümleridir. Bu alanlarda doğru yalıtım yapılmadığında su, zamanla betonarme yüzeylerden veya birleşim noktalarından içeri girebilir. Başlangıçta küçük nemlenme gibi görünen problemler, ilerleyen yıllarda daha büyük yapı sorunlarına dönüşebilir.</p>
  
    <p>Temel yalıtımı, yalnızca konfor için değil, aynı zamanda yapı güvenliği için de önemlidir. Çünkü su ve nem, betonarme sistemdeki demir donatıya zarar verebilir. Donatının paslanması ise zamanla taşıyıcı sistem performansını olumsuz etkileyebilir.</p>
  
    <h3>1. Bodrum Katlarda Rutubet ve Kötü Koku Oluşabilir</h3>
    <p>Temel yalıtımı yapılmayan binalarda en sık görülen sorunlardan biri bodrum katlarda rutubet oluşmasıdır. Zeminden gelen nem, bodrum duvarlarında ve zemin döşemelerinde kendini gösterebilir. Bu durum zamanla kötü kokuya, hava kalitesinin düşmesine ve yaşam alanlarının sağlıksız hale gelmesine neden olabilir.</p>
  
    <p>Bodrum katların depo, otopark, teknik alan veya yaşam alanı olarak kullanıldığı yapılarda temel yalıtımı daha da büyük önem taşır. Yalıtımsız bodrumlarda eşyalar zarar görebilir, duvar yüzeylerinde kabarma oluşabilir ve ortam sürekli nemli kalabilir.</p>
  
    <h3>2. Küf ve Sağlıksız İç Mekan Problemleri Görülebilir</h3>
    <p>Nemli ortamlar, küf ve mantar oluşumu için uygun zemin hazırlar. Temel yalıtımı eksik olan binalarda nem yalnızca bodrum katla sınırlı kalmayabilir; kapiler etkiyle üst katlara doğru da ilerleyebilir. Bu durum duvarlarda lekelenme, boya kabarması ve küf oluşumu şeklinde görülebilir.</p>
  
    <p>Küf oluşumu, özellikle çocuklar, yaşlılar ve hassas bünyeye sahip kişiler için rahatsız edici bir yaşam ortamı oluşturabilir. Bu nedenle temel yalıtımı, sağlıklı iç mekan kalitesi açısından da önemli bir yapı detayıdır.</p>
  
    <h3>3. Betonarme Elemanlarda Donatı Korozyonu Riski Artar</h3>
    <p>Temel yalıtımı yapılmayan binalarda su ve nem, betonarme elemanların içine zamanla nüfuz edebilir. Betonun içinde bulunan çelik donatılar nemle temas ettiğinde paslanma, yani korozyon riski artar.</p>
  
    <p>Donatı korozyonu, betonarme yapıların uzun vadeli dayanıklılığını olumsuz etkileyebilir. Paslanan demir hacim olarak genişleyebilir, beton yüzeyinde çatlaklara ve dökülmelere neden olabilir. Bu nedenle temel yalıtımı, taşıyıcı sistemin korunması açısından hayati bir uygulamadır.</p>
  
    <h3>4. Boya, Sıva ve Kaplama Malzemelerinde Hasar Oluşabilir</h3>
    <p>Zeminden veya temel çevresinden gelen nem, iç mekan kaplamalarında estetik ve teknik sorunlara yol açabilir. Duvarlarda boya kabarması, sıva dökülmesi, seramik arkasında boşluk oluşması, parke deformasyonu ve kaplama malzemelerinde lekelenme görülebilir.</p>
  
    <p>Bu tür sorunlar yalnızca görsel açıdan rahatsız edici değildir. Aynı zamanda sürekli bakım ve tadilat maliyeti oluşturur. Temel yalıtımı doğru yapılmış bir binada bu riskler önemli ölçüde azaltılabilir.</p>
  
    <h3>5. Isı Kaybı ve Enerji Verimsizliği Oluşabilir</h3>
    <p>Temel ve bodrum katlarda nemin artması, iç mekan konforunu ve enerji performansını da etkileyebilir. Nemli yapı elemanları ısı yalıtım performansını düşürebilir. Bu durum özellikle zemin katlarda soğuk zemin hissi, ısı kaybı ve daha yüksek enerji tüketimi olarak hissedilebilir.</p>
  
    <p>Sağlıklı bir bina için su yalıtımı ve ısı yalıtımı birlikte değerlendirilmelidir. Temel bölgesinde doğru yalıtım detayları, yapının enerji verimliliğine ve yaşam konforuna katkı sağlar.</p>
  
    <h3>6. Bina Ömrü Kısalabilir</h3>
    <p>Bir binanın uzun yıllar güvenli ve sorunsuz şekilde kullanılabilmesi için suya ve neme karşı korunması gerekir. Temel yalıtımı yapılmayan binalarda nemin taşıyıcı sisteme ve iç mekanlara sürekli etki etmesi, yapının kullanım ömrünü olumsuz etkileyebilir.</p>
  
    <p>Temel yalıtımı inşaat aşamasında doğru yapılmadığında, sonradan müdahale etmek hem daha zor hem de daha maliyetli olabilir. Bu nedenle temel yalıtımı, bina tamamlandıktan sonra değil, proje ve uygulama aşamasında planlanması gereken bir konudur.</p>
  
    <h3>Temel Yalıtımı Nasıl Yapılmalıdır?</h3>
    <p>Temel yalıtımı, zemin koşullarına ve proje detaylarına göre profesyonel şekilde uygulanmalıdır. Standart bir uygulama yaklaşımında şu başlıklar dikkate alınır:</p>
  
    <ul>
      <li><strong>Zemin etüdü:</strong> Zeminin su durumu, geçirgenliği ve yeraltı su seviyesi değerlendirilmelidir.</li>
      <li><strong>Su yalıtım sistemi:</strong> Temel ve perde duvarlar uygun yalıtım malzemeleriyle korunmalıdır.</li>
      <li><strong>Bohçalama detayı:</strong> Temel altı ve yan yüzeyler suya karşı bütüncül şekilde sarılmalıdır.</li>
      <li><strong>Drenaj sistemi:</strong> Binanın çevresindeki suyun temelden uzaklaştırılması sağlanmalıdır.</li>
      <li><strong>Koruyucu katman:</strong> Yalıtım malzemesi dolgu sırasında zarar görmeyecek şekilde korunmalıdır.</li>
      <li><strong>Uygulama kontrolü:</strong> Ek yerleri, köşeler, perde-temel birleşimleri ve detay noktaları dikkatle kontrol edilmelidir.</li>
    </ul>
  
    <h3>Yeni Bina Alırken Temel Yalıtımı Nasıl Sorgulanır?</h3>
    <p>Yeni bir daire satın alırken temel yalıtımını doğrudan görmek çoğu zaman mümkün olmayabilir. Ancak doğru sorular sorularak binanın teknik kalitesi hakkında fikir edinilebilir. Daire almadan önce şu konular mutlaka sorulmalıdır:</p>
  
    <ul>
      <li>Binada temel yalıtımı yapıldı mı?</li>
      <li>Temel ve perde duvarlarda hangi su yalıtım sistemi kullanıldı?</li>
      <li>Bodrum katlarda drenaj sistemi var mı?</li>
      <li>Yeraltı su seviyesi ve zemin etüdü dikkate alındı mı?</li>
      <li>Temel-perde birleşim noktalarında ek yalıtım önlemleri alındı mı?</li>
      <li>Bodrum, otopark veya zemin katlarda rutubet belirtisi var mı?</li>
      <li>Firma uygulama detayları hakkında şeffaf bilgi veriyor mu?</li>
    </ul>
  
    <h3>Temel Yalıtımı Sonradan Yapılabilir mi?</h3>
    <p>Temel yalıtımı bazı durumlarda sonradan güçlendirilebilir veya lokal müdahaleler yapılabilir. Ancak bu işlemler genellikle zor, maliyetli ve sınırlı etkiye sahip olabilir. Çünkü temel ve perde duvarların dış yüzeylerine ulaşmak çoğu zaman kazı, drenaj yenileme ve detaylı uygulama gerektirir.</p>
  
    <p>Bu nedenle en doğru yaklaşım, temel yalıtımının bina inşa edilirken eksiksiz şekilde yapılmasıdır. Yeni bina alırken inşaat sürecinde bu detayların planlanmış ve uygulanmış olması, alıcı için önemli bir avantajdır.</p>
  
    <h3>Neli Mühendislik Olarak Temel Yalıtımına Önem Veriyoruz</h3>
    <p><strong>Neli Mühendislik</strong> olarak konut projelerimizde yalnızca daire içi estetik detaylara değil, binanın uzun ömürlü ve güvenli olmasını sağlayan teknik uygulamalara da büyük önem veriyoruz. Temel yalıtımı, bu anlayışın en önemli yapı taşlarından biridir.</p>
  
    <p>Projelerimizde temel, perde duvar, drenaj ve su yalıtımı detayları mühendislik disipliniyle ele alınır. Zeminden gelebilecek su ve nem risklerine karşı gerekli önlemler planlanır; yapının uzun yıllar güvenli, sağlıklı ve konforlu şekilde kullanılabilmesi hedeflenir.</p>
  
    <p>Bizim için kaliteli konut üretimi; görünmeyen ama yapının geleceğini belirleyen teknik detayları doğru çözmekle başlar. Temelden çatıya kadar her aşamada güvenli, dayanıklı ve uzun ömürlü yapılar üretmeye odaklanıyoruz.</p>
  
    <h3>İzmir’de Satışta Olan Sıfır Dairelerimizi İnceleyin</h3>
    <p>Yeni bina alırken temel yalıtımı, yapı güvenliği, malzeme kalitesi, çatı izolasyonu ve firma güvenilirliği mutlaka değerlendirilmelidir. Neli Mühendislik olarak İzmir’de satışta olan sıfır daire projelerimizde bu teknik detaylara önem veriyor; güvenli, konforlu ve uzun ömürlü yaşam alanları sunmayı hedefliyoruz.</p>
  
    <p>Satışta olan güncel projelerimizi ve 1+1, 2+1, 3+1 sıfır daire seçeneklerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz. Neli Mühendislik projelerini görüntüleyerek size uygun daire hakkında detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/temel-yalitimi.webp",
    coverImageAlt:
      "Temel yalıtımı yapılmayan binalarda su, nem ve rutubet riskleri — Neli Mühendislik",
    category: "Mühendislik ve Yapı Teknolojileri",
    tags: JSON.stringify([
      "temel yalıtımı yapılmayan binalarda ne olur",
      "temel yalıtımı neden önemlidir",
      "binalarda temel su yalıtımı",
      "bodrum rutubeti nasıl önlenir",
      "temelden su alan bina",
      "yeni bina temel yalıtımı",
      "İzmir sıfır daire",
      "Neli Mühendislik projeleri",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Temel Yalıtımı Yapılmayan Binalarda Ne Olur? | Neli Mühendislik",
    metaDescription:
      "Temel yalıtımı yapılmayan binalarda ne olur? Su sızıntısı, rutubet, küf, donatı korozyonu, yapı hasarı ve enerji kaybı risklerini öğrenin. Neli Mühendislik’in satışta olan sıfır daire projelerini inceleyin.",
    metaKeywords:
      "temel yalıtımı yapılmayan binalarda ne olur, temel yalıtımı, temel su yalıtımı, bodrum rutubeti, temelden su alan bina, yeni bina temel yalıtımı, İzmir sıfır daire, Neli Mühendislik",
    publishedAt: "2026-06-01",
  },
  {
    slug: "betonarmenin-avantajlari-nelerdir",
    title: "Betonarmenin Avantajları Nelerdir?",
    excerpt:
      "Betonarme yapılar; dayanıklılık, yangın direnci, uzun ömür, ekonomik uygulanabilirlik ve deprem yönetmeliklerine uygun tasarım avantajlarıyla modern konut projelerinde en çok tercih edilen taşıyıcı sistemlerden biridir.",
    content: `<article>
    <h2>Betonarmenin Avantajları Nelerdir?</h2>
    <p>İnşaat sektöründe bir binanın güvenli, uzun ömürlü ve sağlam olması için en önemli konulardan biri taşıyıcı sistem seçimidir. Türkiye’de konut projelerinde en yaygın kullanılan taşıyıcı sistemlerden biri <strong>betonarme yapı sistemi</strong>dir. Betonarme; betonun basınca dayanıklı yapısı ile çeliğin çekme dayanımını bir araya getiren güçlü bir yapı teknolojisidir.</p>
  
    <p>Ev satın almak isteyen kullanıcılar için betonarme sistemin ne olduğu ve hangi avantajları sunduğu önemli bir konudur. Çünkü binanın dış görünüşü, iç mimarisi ve lokasyonu kadar, taşıyıcı sisteminin doğru tasarlanması da güvenli yaşam açısından belirleyici rol oynar.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Betonarmenin avantajları; yüksek dayanım, uzun ömür, yangına karşı direnç, farklı mimari tasarımlara uyum, ekonomik uygulanabilirlik, yerel malzeme ve işçilikle üretilebilmesi, bakım kolaylığı ve deprem yönetmeliklerine uygun şekilde tasarlanabilmesidir. Doğru projelendirilmiş ve kaliteli malzemeyle uygulanmış betonarme yapılar, güvenli ve konforlu yaşam alanları sunar.
    </blockquote>
  
    <h3>Betonarme Nedir?</h3>
    <p>Betonarme, beton ve çelik donatının birlikte kullanıldığı taşıyıcı yapı sistemidir. Beton, basınç kuvvetlerine karşı yüksek dayanım gösterirken; çelik donatı, çekme kuvvetlerine karşı yapıya direnç kazandırır. Bu iki malzemenin birlikte çalışması sayesinde kolon, kiriş, döşeme, perde beton ve temel gibi taşıyıcı elemanlar oluşturulur.</p>
  
    <p>Betonarme sistem, özellikle konut projelerinde güvenilirliği ve uygulanabilirliği nedeniyle sıkça tercih edilir. Doğru mühendislik hesapları, kaliteli beton, uygun demir donatı ve kontrollü işçilikle betonarme yapılar uzun yıllar güvenle kullanılabilir.</p>
  
    <h3>1. Yüksek Taşıma Kapasitesi Sunar</h3>
    <p>Betonarme yapıların en önemli avantajlarından biri yüksek taşıma kapasitesidir. Kolon, kiriş, döşeme ve perde beton elemanları sayesinde binanın düşey ve yatay yükleri güvenli şekilde taşınabilir. Bu özellik, çok katlı konut projelerinde betonarmeyi güçlü bir seçenek haline getirir.</p>
  
    <p>Doğru tasarlanmış betonarme sistemlerde bina yükleri dengeli şekilde temele aktarılır. Bu da yapının güvenli, dengeli ve uzun ömürlü olmasına katkı sağlar.</p>
  
    <h3>2. Deprem Yönetmeliklerine Uygun Tasarlanabilir</h3>
    <p>Türkiye gibi deprem riski yüksek bir ülkede yapı güvenliği büyük önem taşır. Betonarme sistemler, güncel deprem yönetmeliklerine uygun şekilde projelendirildiğinde deprem etkilerine karşı güvenli bir yapı performansı sunabilir.</p>
  
    <p>Depreme dayanıklı betonarme yapı için yalnızca beton kullanılması yeterli değildir. Zemin etüdü, statik proje, temel sistemi, kolon-kiriş-perde yerleşimi, demir donatı düzeni, beton sınıfı ve uygulama işçiliği birlikte değerlendirilmelidir. Bu nedenle betonarme sistemin avantajı, doğru mühendislik disipliniyle birleştiğinde ortaya çıkar.</p>
  
    <h3>3. Uzun Ömürlü ve Dayanıklıdır</h3>
    <p>Kaliteli malzeme ve doğru uygulama ile inşa edilen betonarme yapılar uzun yıllar dayanıklılığını koruyabilir. Betonarme sistem, dış etkilere karşı dirençli bir yapı oluşturur ve bakım süreçleri doğru yönetildiğinde uzun kullanım ömrü sunar.</p>
  
    <p>Bu uzun ömürlü yapı karakteri, hem oturum amaçlı ev alacak kişiler hem de yatırım amaçlı konut satın almayı düşünen kullanıcılar için önemli bir avantajdır. Sağlam bir taşıyıcı sistem, konutun değerini uzun vadede korumasına yardımcı olur.</p>
  
    <h3>4. Yangına Karşı Direnci Yüksektir</h3>
    <p>Betonarme yapıların bir diğer önemli avantajı yangına karşı dayanıklı olmasıdır. Beton, yanıcı bir malzeme değildir ve çelik donatıyı belirli ölçüde dış etkilerden korur. Bu nedenle betonarme sistemler, yangın güvenliği açısından avantajlı yapı çözümleri arasında yer alır.</p>
  
    <p>Yangın güvenliği yalnızca taşıyıcı sistemle sınırlı değildir; elektrik tesisatı, yangın merdiveni, kaçış yolları ve bina içi güvenlik önlemleri de önemlidir. Ancak betonarmenin doğal yangın direnci, yapı güvenliği açısından olumlu bir katkı sağlar.</p>
  
    <h3>5. Farklı Mimari Tasarımlara Uyum Sağlar</h3>
    <p>Betonarme sistemler, farklı mimari ihtiyaçlara uyum sağlayabilen esnek bir taşıyıcı sistemdir. Konut projelerinde farklı daire tipleri, balkonlar, geniş salonlar, otopark alanları, ticari alanlar ve ortak kullanım bölümleri betonarme sistemle planlanabilir.</p>
  
    <p>Bu esneklik, modern konut projelerinde hem estetik hem de fonksiyonel çözümler geliştirmeyi kolaylaştırır. 1+1, 2+1 ve 3+1 gibi farklı daire seçeneklerinin aynı proje içinde oluşturulabilmesi betonarme sistemin pratik avantajlarından biridir.</p>
  
    <h3>6. Ekonomik ve Yaygın Uygulanabilir Bir Sistemdir</h3>
    <p>Betonarme yapı sistemi, Türkiye’de malzeme temini ve uygulama tecrübesi açısından oldukça yaygındır. Beton, demir donatı, kalıp sistemleri ve uygulama ekipleri kolay ulaşılabilir olduğu için betonarme sistemler konut projelerinde ekonomik ve uygulanabilir çözümler sunar.</p>
  
    <p>Bu yaygınlık, inşaat sürecinin planlanmasını ve kontrolünü de kolaylaştırır. Ancak burada önemli olan, maliyet avantajı sağlarken kalite standartlarından ödün vermemektir. Kaliteli betonarme yapı, doğru malzeme seçimi ve kontrollü işçilikle mümkün olur.</p>
  
    <h3>7. Ses ve Isı Konforuna Katkı Sağlayabilir</h3>
    <p>Betonarme elemanlar, yapı kütlesi sayesinde ses ve ısı performansına katkı sağlayabilir. Özellikle doğru yalıtım uygulamalarıyla desteklenen betonarme yapılarda yaşam konforu artar. Dış cephe mantolaması, çatı izolasyonu, temel yalıtımı ve kaliteli doğrama sistemleriyle birlikte betonarme yapı daha konforlu hale gelir.</p>
  
    <p>Bu nedenle betonarme sistem tek başına değil, yalıtım ve malzeme kalitesiyle birlikte değerlendirilmelidir. İyi tasarlanmış bir betonarme konut projesi, hem güvenli hem de konforlu yaşam alanı sunar.</p>
  
    <h3>8. Bakım ve Onarım Açısından Avantajlıdır</h3>
    <p>Betonarme yapılar doğru inşa edildiğinde sık bakım gerektirmeden uzun yıllar kullanılabilir. Taşıyıcı sistemin korunması, su yalıtımının doğru yapılması ve yapı elemanlarının nemden uzak tutulması bu noktada önemlidir.</p>
  
    <p>Özellikle temel yalıtımı, çatı izolasyonu ve dış cephe uygulamaları betonarme sistemin uzun ömürlü kalmasını destekler. Nem, su sızıntısı ve donatı korozyonu gibi risklerin önlenmesi, betonarme yapının performansını korumasına yardımcı olur.</p>
  
    <h3>Betonarme Yapılarda Kalite Nasıl Anlaşılır?</h3>
    <p>Bir betonarme yapının kaliteli olup olmadığını anlamak için yalnızca binanın dış görünüşüne bakmak yeterli değildir. Konut alıcılarının şu başlıklara dikkat etmesi gerekir:</p>
  
    <ul>
      <li><strong>Beton sınıfı:</strong> Projede kullanılan betonun dayanım sınıfı sorgulanmalıdır.</li>
      <li><strong>Demir donatı:</strong> Donatı uygulamasının statik projeye uygun olup olmadığı önemlidir.</li>
      <li><strong>Zemin etüdü:</strong> Binanın zemine uygun şekilde projelendirilip projelendirilmediği değerlendirilmelidir.</li>
      <li><strong>Yapı denetim süreci:</strong> Beton numuneleri, laboratuvar testleri ve uygulama kontrolleri takip edilmelidir.</li>
      <li><strong>Temel sistemi:</strong> Temel tipi, su yalıtımı ve drenaj detayları sorgulanmalıdır.</li>
      <li><strong>Perde beton ve taşıyıcı sistem:</strong> Deprem güvenliği açısından taşıyıcı sistem kurgusu önemlidir.</li>
      <li><strong>İşçilik kalitesi:</strong> Kaliteli malzeme kadar doğru uygulama da gereklidir.</li>
    </ul>
  
    <h3>Betonarme Sistem Tek Başına Yeterli midir?</h3>
    <p>Betonarme sistem güçlü ve güvenilir bir yapı teknolojisidir; ancak tek başına yeterli değildir. Bir binanın gerçekten güvenli ve uzun ömürlü olması için betonarme sistemin doğru projelendirilmesi, kaliteli malzemeyle uygulanması ve yapı denetim süreçlerinin titizlikle yürütülmesi gerekir.</p>
  
    <p>Ayrıca su yalıtımı, çatı izolasyonu, ısı yalıtımı, ses yalıtımı, tesisat kalitesi ve iç mekan uygulamaları da yapının genel performansını etkiler. Bu nedenle konut satın alırken binanın tüm teknik detayları bir bütün olarak değerlendirilmelidir.</p>
  
    <h3>Neli Mühendislik Olarak Yüksek Kaliteli Betonarme Projeler Geliştiriyoruz</h3>
    <p><strong>Neli Mühendislik</strong> olarak konut projelerimizde sağlam mühendislik anlayışını, kaliteli malzeme kullanımı ve titiz uygulama süreçleriyle birleştiriyoruz. Bizim için betonarme yapı yalnızca bir inşaat yöntemi değil; güvenli, uzun ömürlü ve değerini koruyan yaşam alanlarının temelidir.</p>
  
    <p>Projelerimizde taşıyıcı sistemden temel detaylarına, beton kalitesinden donatı uygulamasına, yalıtım çözümlerinden iç mekan malzemelerine kadar her aşamayı mühendislik disipliniyle ele alıyoruz. Amacımız, kullanıcılarımıza yalnızca estetik daireler değil; aynı zamanda güven veren, kaliteli ve dayanıklı betonarme yapılar sunmaktır.</p>
  
    <p>Yüksek kaliteli betonarme projelerimizde modern yaşam ihtiyaçlarına uygun planlar, sağlam taşıyıcı sistem yaklaşımı, doğru malzeme seçimi ve uzun ömürlü yapı detayları ön plandadır. Bu sayede Neli Mühendislik projeleri, hem oturum hem de yatırım amacıyla konut arayan kullanıcılar için güvenilir seçenekler sunar.</p>
  
    <h3>İzmir’de Satışta Olan Sıfır Dairelerimizi İnceleyin</h3>
    <p>Betonarmenin avantajlarını değerlendirirken binanın yalnızca dış görünüşüne değil, taşıyıcı sistem kalitesine, kullanılan malzemelere ve mühendislik yaklaşımına da dikkat etmek gerekir. Neli Mühendislik olarak İzmir’de satışta olan sıfır daire projelerimizde yüksek kaliteli betonarme yapı anlayışını benimsiyor; güvenli, konforlu ve uzun ömürlü yaşam alanları sunuyoruz.</p>
  
    <p>Satışta olan güncel projelerimizi ve 1+1, 2+1, 3+1 sıfır daire seçeneklerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz. Size uygun daire seçeneklerini görüntüleyerek Neli Mühendislik projeleri hakkında detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/betonarme-yapilar.webp",
    coverImageAlt:
      "Betonarmenin avantajları ve yüksek kaliteli betonarme yapı sistemi — Neli Mühendislik",
    category: "Mühendislik ve Yapı Teknolojileri",
    tags: JSON.stringify([
      "betonarmenin avantajları nelerdir",
      "betonarme yapı avantajları",
      "betonarme bina nedir",
      "betonarme yapı güvenliği",
      "depreme dayanıklı betonarme bina",
      "yüksek kaliteli betonarme projeler",
      "İzmir sıfır daire",
      "Neli Mühendislik projeleri",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle: "Betonarmenin Avantajları Nelerdir? | Neli Mühendislik",
    metaDescription:
      "Betonarmenin avantajları nelerdir? Betonarme yapıların dayanıklılık, deprem güvenliği, yangın direnci, uzun ömür ve ekonomik uygulanabilirlik avantajlarını öğrenin. Neli Mühendislik’in yüksek kaliteli betonarme projelerini inceleyin.",
    metaKeywords:
      "betonarmenin avantajları nelerdir, betonarme yapı avantajları, betonarme bina nedir, depreme dayanıklı betonarme bina, yüksek kaliteli betonarme projeler, İzmir sıfır daire, Neli Mühendislik",
    publishedAt: "2026-06-02",
  },
  {
    slug: "gercekci-3d-kat-plani-gorsellestirme-ile-mekan-tasarimi",
    title:
      "Gerçekçi 3D Kat Planı Görselleştirme ile Ev Satın Almadan Önce Mekan Tasarımı",
    excerpt:
      "Topraktan veya inşaat aşamasında ev alırken mekanın bitmiş halini hayal etmek zor olabilir. Yüksek kaliteli 3D render ve kat planı görselleştirme teknolojilerinin ev alma deneyiminizi nasıl güvenli ve öngörülebilir kıldığını keşfedin.",
    content: `<article>
    <h2>Topraktan Ev Alırken Gerçekçi 3D Görselleştirme Neden Önemlidir?</h2>
    <p>Yeni bir eve yatırım yaparken, özellikle inşaat aşamasındaki projelerde en büyük zorluklardan biri, kağıt üzerindeki iki boyutlu planların bitmiş halini zihinde doğru canlandırabilmektir. Günümüzde modern arama motorlarında sıklıkla aratılan <em>'Henüz bitmemiş evin içi nasıl görünür?'</em> veya <em>'3 boyutlu kat planı ev alırken neden önemlidir?'</em> soruları, ev alıcılarının bu süreçteki haklı belirsizliklerini yansıtır. İşte bu noktada yüksek kaliteli mimari görselleştirme teknolojileri devreye girerek, gelecekteki yaşam alanınızı gerçeğe en yakın haliyle deneyimlemenizi sağlar.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Gerçekçi 3D kat planı görselleştirme, inşaat aşamasındaki bir evin odalarının genişliğini, ışık alış açısını, eşya yerleşimini ve malzeme dokularını önceden görmenizi sağlayan ileri düzey bir mimari teknolojidir. Bu sayede ev alıcıları satın alma kararını sürprizlerle karşılaşmadan, mekanın ferahlığını ve tasarım detaylarını önceden deneyimleyerek güvenle verebilir.
    </blockquote>
  
    <h3>İleri Düzey Mimari Görselleştirmenin Ev Sahiplerine Sağladığı Avantajlar</h3>
    <p>İleri düzey render motorları kullanılarak hazırlanan görseller ve parametrik dış cephe tasarımları, geleneksel maketlerin ötesine geçerek size detaylı bir rehberlik sunar. Bir projeyi 3D görselleştirmeler üzerinden incelemenin temel avantajları şunlardır:</p>
    <ul>
      <li><strong>Gerçekçi Mekan Algısı ve Eşya Yerleşimi:</strong> Odanın sadece metrekare cinsinden büyüklüğünü değil, mevcut mobilyalarınızın o alana nasıl uyum sağlayacağını rahatlıkla planlayabilirsiniz.</li>
      <li><strong>Malzeme ve Doku Uyumunu Görme:</strong> Zemin kaplamalarından mutfak dolaplarının rengine, banyo seramiklerinden duvar dokularına kadar her unsurun birbiriyle uyumunu yüksek çözünürlüklü olarak inceleme fırsatı bulursunuz.</li>
      <li><strong>Işık, Ferahlık ve Tasarım Simülasyonu:</strong> Profesyonel 3D render çalışmaları, evin doğal ışığı nasıl aldığını ve aydınlatma elemanlarının mekana katacağı derinliği gerçeğe en yakın şekilde simüle eder.</li>
    </ul>
  
    <h3>Neli Mühendislik Projelerinde Şeffaf ve Gerçekçi Tasarım Deneyimi</h3>
    <p>Biz, <strong>Neli Mühendislik</strong> olarak İzmir'de hayata geçirdiğimiz Valorya ve Serenità serisi projelerimizde şeffaflığı ve mühendislik kalitesini en ön planda tutuyoruz. İnşaat öncesinde ve süreç boyunca en gelişmiş 3 boyutlu mimari görselleştirme araçlarını kullanarak, sizlere sadece bir kat planı değil, yaşam alanınızın dijital ikizini sunmaya gayret ediyoruz.</p>
    <p>İzmir'in değerlenen bölgeleri Çiğli ve Balatçık'taki yüksek standartlara sahip projelerimizi incelerken, estetik ve mühendisliği buluşturan yaşam alanlarını henüz inşaat aşamasındayken bile tüm netliğiyle deneyimleyebilirsiniz. Gelecekteki evinizin mimari detaylarını şimdiden keşfetmek ve güncel projelerimizi yakından incelemek için satış ofislerimizi ziyaret edebilir veya <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden detaylı bilgi alabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/gercekci-3d.webp",
    coverImageAlt:
      "Gerçekçi 3D kat planı görselleştirme ve iç mekan tasarımı — Neli Mühendislik",
    category: "Mimari ve Yaşam Tarzı",
    tags: JSON.stringify([
      "3d kat planı",
      "mimari görselleştirme",
      "iç mekan tasarımı",
      "Neli Mühendislik projeleri",
      "topraktan ev almak",
      "İzmir konut projeleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "3D Kat Planı Görselleştirme ile Mekan Tasarımı | Neli Mühendislik",
    metaDescription:
      "Gerçekçi 3D kat planı görselleştirme teknolojileri ile ev satın almadan önce mekan tasarımını keşfedin. Neli Mühendislik projelerinde gelecekteki evinizi şimdiden inceleyin.",
    metaKeywords:
      "3d kat planı, mimari görselleştirme, iç mekan tasarımı, izmir satılık daire, topraktan ev almak, neli mühendislik, render, valorya, mekan tasarımı",
    publishedAt: "2026-06-08",
  },
  {
    slug: "topraktan-ev-alirken-muhendislik-kalitesi-nasil-anlasilir",
    title:
      "Topraktan Ev Alırken İnşaat Firmasının Mühendislik Kalitesi Nasıl Anlaşılır?",
    excerpt:
      "Topraktan veya inşaat aşamasında ev alırken yatırımınızı güvence altına almanın en önemli adımı, doğru inşaat firmasını seçmektir. Bir projenin mühendislik kalitesini ve firmanın güvenilirliğini anlamanızı sağlayacak kritik ipuçlarını keşfedin.",
    content: `<article>
    <h2>Proje Aşamasında Konut Alırken Nelere Dikkat Edilmeli?</h2>
    <p>Henüz temeli yeni atılmış veya inşaat halindeki bir projeden konut satın almak, karlı bir yatırım olmasının yanı sıra evinizi baştan tasarlama özgürlüğü sunar. Ancak arama motorlarında yatırımcıların en çok sorduğu <em>'Topraktan ev alırken nelere dikkat edilmeli?'</em> veya <em>'İnşaat firmasının güvenilir ve kaliteli olduğu nasıl anlaşılır?'</em> sorularının temelinde, yapının uzun ömürlülüğüne ve güvenliğine duyulan haklı hassasiyet yatar. Bir firmanın mühendislik kalitesini teknik detaylara boğulmadan anlamanın bazı net kriterleri vardır.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Topraktan ev alırken bir inşaat firmasının mühendislik kalitesini anlamak için; firmanın sunduğu teknik şartname şeffaflığına, zemin etüt raporlarına ve kullandığı yapı malzemesi standartlarına (örneğin standart üstü yüksek dayanımlı beton sınıfları) dikkat edilmelidir. Güvenilir firmalar, projelerinin statik altyapısını ve önceki projelerindeki referanslarını müşterileriyle açıkça paylaşmaktan çekinmezler.
    </blockquote>
  
    <h3>Mühendislik Kalitesini Gösteren 3 Kritik Detay</h3>
    <p>Sadece dış görünüşe veya bitmiş örnek dairelere aldanmamak, projenin görünmeyen kısımlarını da sorgulamak gerekir. Yatırımınızı yaparken şu detayları mutlaka inceleyin:</p>
    <ul>
      <li><strong>Yüksek Standartlı Yapı Malzemeleri:</strong> Sadece yasal zorunlulukları değil, ekstra güvenlik sağlayan malzemeleri tercih eden firmaları inceleyin. Örneğin, standartların ötesinde C45 yüksek dayanımlı beton kullanan projeler, yapının uzun ömürlü ve depreme karşı maksimum dirençli olmasını sağlar.</li>
      <li><strong>Teknolojik Altyapı ve Hassas İşçilik:</strong> İnşaat aşamasında kullanılan teknolojiler kalitenin aynasıdır. Zemin uygulamalarında lazer güdümlü tesviye sistemleri kullanan firmalar, sadece kaba inşaatta değil, ince işçilikte de hatasız ve kusursuz yüzeyler oluşturmayı hedefler.</li>
      <li><strong>Şeffaf İletişim ve Proje Dokümantasyonu:</strong> Firmanın proje ile ilgili sorularınıza ne kadar net yanıt verdiği çok önemlidir. İletişim dili şeffaf, yapıcı ve profesyonel olan firmalar, olası kriz durumlarında da çözüm odaklı yaklaşım sergiler.</li>
    </ul>
  
    <h3>Neli Mühendislik ile Güvenilir ve Şeffaf Yatırım</h3>
    <p>İzmir genelinde konut inşa eden Neli Mühendislik olarak, temeli atılan her yapıda şeffaflığı ve yüksek güvenlik standartlarını ön planda tutuyoruz. Özellikle Çiğli ve Balatçık bölgelerinde hayata geçirdiğimiz projelerimizde, yatırımcılarımıza sürecin en başından itibaren detaylı bilgilendirme sağlıyoruz.</p>
    <p>Valorya ve Serenità serisi konut projelerimizde, yüksek mühendislik standartlarını modern yaşam alanlarına nasıl entegre ettiğimizi incelemek ve topraktan ev alma sürecini güvenle deneyimlemek için satış ofislerimizde sizleri ağırlamaktan memnuniyet duyarız. Güncel ve gelecek projelerimiz hakkında detaylı teknik bilgi almak için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/topraktan-ev.webp",
    coverImageAlt:
      "Topraktan ev alırken inşaat firmasının mühendislik kalitesini anlamanın yolları — Neli Mühendislik",
    category: "Rehber ve Yatırım",
    tags: JSON.stringify([
      "topraktan ev almak",
      "mühendislik kalitesi",
      "inşaat firması seçimi",
      "C45 beton avantajları",
      "Neli Mühendislik",
      "güvenilir müteahhit",
      "İzmir gayrimenkul yatırımı",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Topraktan Ev Alırken Mühendislik Kalitesi Nasıl Anlaşılır? | Neli",
    metaDescription:
      "Topraktan veya proje aşamasında ev alırken inşaat firmasının mühendislik kalitesi nasıl anlaşılır? Güvenli yatırım, malzeme standartları ve şeffaflık ipuçları.",
    metaKeywords:
      "topraktan ev almak, mühendislik kalitesi, inşaat firması seçimi, izmir konut projeleri, c45 beton, neli mühendislik, güvenilir müteahhit, gayrimenkul rehberi",
    publishedAt: "2026-06-08",
  },
  {
    slug: "yeni-bitmis-dairelerde-alcipan-ve-modern-aydinlatma",
    title:
      "Yeni Bitmiş Dairelerde Alçıpan ve Modern İç Mekan Aydınlatma Fikirleri",
    excerpt:
      "Yeni bir evin atmosferini belirleyen en güçlü detaylar tavan mimarisi ve ışıktır. Yaşam alanlarınıza ferahlık ve modern bir kimlik kazandıracak alçıpan tasarımları ile yenilikçi aydınlatma fikirlerini inceleyin.",
    content: `<article>
    <h2>İç Mekanlarda Işık ve Mimarinin Kusursuz Uyumu</h2>
    <p>Yeni bir yaşam alanına adım attığınızda, mekanın ferahlığını ve ruhunu hissettiren ilk unsur genellikle tavan yüksekliği ve ışığın odaya nasıl yayıldığıdır. Dekorasyon aşamasındaki ev sahiplerinin arama motorlarında sıklıkla araştırdığı <em>'Alçıpan tavan mekanı nasıl geniş gösterir?'</em> veya <em>'Modern salonlarda hangi aydınlatma sistemleri tercih edilmeli?'</em> gibi sorular, iç mekan kurgusunda ışığın ne kadar belirleyici olduğunu gösteriyor. Doğru planlanmış bir alçıpan ve aydınlatma sistemi, sadece karanlığı aydınlatmakla kalmaz; odanın tüm enerjisini dönüştürür.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni bitmiş dairelerde alçıpan uygulamaları ve modern iç mekan aydınlatmaları; odalara derinlik katar, bölgesel ışıklandırma ile mekanları işlevlerine göre ayırır ve estetik bir değer yaratır. Özellikle gizli LED'ler, spot ışıklar ve endirekt aydınlatma sistemleri gözü yormadan mekanı aydınlatırken, sade tasarımlı asma tavanlar evin genel modern kimliğini ve mimari kalitesini vurgular.
    </blockquote>
  
    <h3>Modern Evlerde Alçıpan ve Aydınlatma Trendleri</h3>
    <p>Mekanınızın potansiyelini en üst düzeye çıkarmak için göz önünde bulundurabileceğiniz bazı modern yaklaşımlar şunlardır:</p>
    <ul>
      <li><strong>Endirekt (Gizli) Aydınlatma ile Derinlik Algısı:</strong> Alçıpan havuzlarının içine yerleştirilen sıcak tonlu LED şeritler, ışığın doğrudan göze gelmesini engelleyerek tavandan süzülmesini sağlar. Bu yöntem, özellikle salon ve yatak odalarında dinlendirici bir atmosfer yaratır.</li>
      <li><strong>Işıkla Mekan Bölme (Zoning):</strong> Açık plan mutfak ve salon tasarımlarında, oturma alanı ile yemek alanı arasındaki sınırı duvarlar yerine farklı alçıpan tavan formları ve bölgesel spot ışıklarıyla belirlemek mekana modern bir akıcılık kazandırır.</li>
      <li><strong>Sade ve Minimalist Çizgiler:</strong> Geçmişin ağır ve karmaşık tavan motifleri yerine, artık daha düz hatlara sahip, ince detaylarla zenginleştirilmiş minimalist alçıpan tasarımları tercih edilerek evlerdeki ferahlık hissi korunmaktadır.</li>
    </ul>
  
    <h3>İnce İşçilikte Neli Mühendislik Yaklaşımı</h3>
    <p><strong>Neli Mühendislik</strong> olarak, bir yapının güvenliği kadar iç mekanındaki estetik detayların da yaşam kalitesini doğrudan etkilediğine inanıyoruz. İzmir Göztepe bölgesindeki projelerimizde yürüttüğümüz alçıpan ve ince işçilik uygulamalarındaki hassasiyetimizi, inşa ettiğimiz tüm konut projelerine taşıyoruz.</p>
    <p>Valorya ve Serenità serisi yaşam alanlarımızda, modern iç mimari trendlerini mühendislik disipliniyle uygulayarak, estetik ve konforu bir arada sunmayı hedefliyoruz. İnce işçiliğin ön planda olduğu, modern aydınlatma sistemleriyle zenginleştirilmiş ferah dairelerimizi yakından görmek ve vizyonumuz hakkında bilgi almak isterseniz <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfamızı ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/bitmis-dairelerde.webp",
    coverImageAlt:
      "Yeni bitmiş dairelerde modern alçıpan ve iç mekan aydınlatma tasarımları — Neli Mühendislik",
    category: "İç Mimari ve Dekorasyon",
    tags: JSON.stringify([
      "alçıpan tavan",
      "modern aydınlatma",
      "iç mekan tasarımı",
      "gizli aydınlatma",
      "Neli Mühendislik ince işçilik",
      "İzmir lüks konut",
      "ev dekorasyonu",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Yeni Dairelerde Alçıpan ve Modern Aydınlatma Fikirleri | Neli",
    metaDescription:
      "Yeni bitmiş dairelerde yaşam alanlarına derinlik ve şıklık katan alçıpan tasarımlarını ve modern iç mekan aydınlatma trendlerini keşfedin.",
    metaKeywords:
      "alçıpan modelleri, modern aydınlatma, iç mekan tasarımı, gizli led aydınlatma, neli mühendislik, asma tavan dekorasyonu, izmir konut projeleri",
    publishedAt: "2026-06-08",
  },
  {
    slug: "parametrik-cephe-tasarimi-ile-modern-mimari",
    title: "Parametrik Cephe Tasarımı ile Modern Konut Mimarisi Trendleri",
    excerpt:
      "Modern konut projelerinde estetik ve fonksiyonelliği buluşturan parametrik cephe tasarımlarının, yapıların değerini ve şehir siluetini nasıl dönüştürdüğünü keşfedin.",
    content: `<article>
    <h2>Modern Mimaride Cephe Tasarımının Evrimi</h2>
    <p>Bir yapının dış cephesi, sadece iç mekanı dış etkenlerden koruyan bir kabuk değil, aynı zamanda binanın karakterini ve vizyonunu yansıtan en önemli mimari unsurdur. Günümüzde estetik beklentileri yüksek ev alıcılarının arama motorlarında sıkça araştırdığı <em>'Modern dış cephe tasarımları nasıl olmalı?'</em> veya <em>'Parametrik mimari konutlara nasıl uygulanır?'</em> soruları, klasik tasarımlardan sıyrılıp yenilikçi formlar arayışında olunduğunu gösteriyor. İleri mühendislik hesaplamalarıyla şekillenen parametrik tasarım, lüks konut mimarisinde sınırları yeniden çiziyor.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Parametrik cephe tasarımı, bilgisayar algoritmaları kullanılarak hesaplanan birbirine uyumlu geometrik ve akışkan formların dış cepheye uygulanmasıdır. Bu yöntem, konutlara modern, dinamik ve lüks bir görsel kimlik kazandırmasının yanı sıra; binanın güneş ışığını alma açısını optimize eder, rüzgar yükünü dengeler ve yapının genel yatırım değerini doğrudan artırır.
    </blockquote>
  
    <h3>Parametrik Tasarımın Konut Projelerine Kattığı Değerler</h3>
    <p>Parametrik tasarım, estetik görünümünün ötesinde yapıya birçok fonksiyonel özellik de katar. Yeni bir ev seçerken bu mimari yaklaşımın size sunacağı başlıca avantajlar şunlardır:</p>
    <ul>
      <li><strong>Dinamik ve Özgün Siluet:</strong> Birbirini tekrar eden standart bloklar yerine, her açıdan farklı bir derinlik ve hareket hissi veren cepheler, yaşadığınız yapıyı çevresindeki diğer binalardan anında ayırarak prestij katar.</li>
      <li><strong>Doğal Işık ve İklimlendirme Kontrolü:</strong> Cephedeki panellerin veya formların konumlandırılması, güneş ışığının iç mekana en verimli şekilde girmesini sağlarken, yaz aylarında aşırı ısınmayı önleyen gölgelendirme alanları yaratır.</li>
      <li><strong>Malzeme Optimizasyonu ve Dayanıklılık:</strong> Algoritmik hesaplamalar sayesinde cephede kullanılacak malzemeler (kompozit, metal, ahşap veya cam) binanın statik yapısına en uygun ağırlıkta ve dayanıklılıkta seçilir.</li>
    </ul>
  
    <h3>Neli Mühendislik ile Yenilikçi Dış Cephe Çözümleri</h3>
    <p><strong>Neli Mühendislik</strong> olarak, imza attığımız projelerin sadece iç mekanlarında değil, dış görünümlerinde de şehrin modern dokusuna değer katmayı hedefliyoruz. İzmir'in hızla gelişen lokasyonları olan Çiğli ve Balatçık'taki projelerimizde, sıradanlıktan uzak, göz alıcı ve mühendislik harikası cephe tasarımlarına yer veriyoruz.</p>
    <p>Valorya ve Serenità serisi yaşam alanlarımızda kullandığımız parametrik dış cephe detayları, yapıların uzun yıllar boyunca güncel ve estetik kalmasını sağlamaktadır. Hem yatırım değerini koruyan hem de görsel bir şölen sunan mimari vizyonumuzu incelemek, çağdaş konut projelerimizi keşfetmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/parametrik-tasarim.webp",
    coverImageAlt:
      "Parametrik cephe tasarımı ve modern mimari konut projeleri — Neli Mühendislik",
    category: "Mimari ve Yaşam Tarzı",
    tags: JSON.stringify([
      "parametrik cephe tasarımı",
      "modern mimari",
      "dış cephe trendleri",
      "lüks konut mimarisi",
      "Neli Mühendislik",
      "İzmir modern konut",
      "akıllı tasarım",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Parametrik Cephe Tasarımı ve Modern Konut Mimarisi | Neli",
    metaDescription:
      "Modern konut mimarisinde estetik ve enerji verimliliğini artıran parametrik cephe tasarımlarını inceleyin. Neli Mühendislik'in yenilikçi projelerini keşfedin.",
    metaKeywords:
      "parametrik cephe tasarımı, modern konut mimarisi, dış cephe modelleri, izmir lüks konut, neli mühendislik, valorya serisi, mimari trendler, enerji verimli bina",
    publishedAt: "2026-06-09",
  },
  {
    slug: "izmir-deprem-bolgesinde-radye-temel-ve-fore-kazik",
    title:
      "İzmir Deprem Bölgesinde Radye Temel ve Fore Kazık Sistemlerinin Önemi",
    excerpt:
      "Fay hatlarına yakın veya zemin sıvılaşması riski olan bölgelerde güvenli konut inşasının temeli doğru statik projelendirmeden geçer. Radye jeneral temel ve fore kazık uygulamalarının yapı güvenliğine hayati etkisini inceleyin.",
    content: `<article>
    <h2>İzmir Deprem Kuşağında Zemin Güvenliği ve Doğru Temel Seçimi</h2>
    <p>Yeni bir konut satın alırken estetik detaylar ve sosyal donatılar her ne kadar cezbedici olsa da, yapının gerçek değeri ve güvenliği toprağın altında yatar. İzmir gibi aktif fay hatlarının bulunduğu ve bazı bölgelerinde zemin sıvılaşması riskinin görüldüğü şehirlerde, gayrimenkul yatırımcılarının arama motorlarında en çok araştırdığı <em>'Depreme dayanıklı bina temeli nasıl olmalı?'</em> veya <em>'Fore kazık ve radye temel nedir?'</em> soruları, mühendislik bilincinin arttığını göstermektedir. Yapının sismik hareketlere karşı gösterdiği direnç, tamamen zemin etüdü verilerine uygun seçilmiş temel sistemine bağlıdır.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> İzmir deprem bölgesinde <strong>radye temel</strong>, binanın toplam ağırlığını zemine eşit olarak dağıtarak bölgesel çökmeleri engeller; <strong>fore kazık sistemi</strong> ise zayıf zeminlerde yapının yükünü metrelerce derindeki sağlam ve taşıyıcı kaya tabakalarına aktarır. Neli Mühendislik, zemin etüt raporlarının gerektirdiği durumlarda bu iki sistemi entegre kullanarak, olası sismik şoklarda zemin sıvılaşmasını önler ve yapının sarsıntıları hasarsız atlatmasını sağlayacak maksimum statik dayanımı sunar.
    </blockquote>
  
    <h3>İleri Mühendislik Çözümlerinin Bina Güvenliğine Etkisi</h3>
    <p>Statik projelerde uygulanan derin temel ve eşit yük dağılımı prensipleri, yapının ömrünü ve dayanımını doğrudan belirler. Radye temel ve fore kazık sistemlerinin birlikte çalışmasının sağladığı başlıca mühendislik avantajları şunlardır:</p>
    <ul>
      <li><strong>Zemin Sıvılaşmasına Karşı Kesin Çözüm:</strong> Deprem anında yeraltı sularının basıncıyla zeminin taşıma kapasitesini kaybetmesi (sıvılaşma) durumunda, fore kazıklar binanın yeraltındaki sağlam kolonları gibi davranarak yapının dengesini korur.</li>
      <li><strong>Farklı Oturmaların (Çökmelerin) Engellenmesi:</strong> Radye temel, tüm bina tabanını tek bir rijit plak halinde kapladığı için yapının bir tarafının diğerinden daha fazla çökmesini (farklı oturmayı) ve kolonlarda oluşabilecek kesme kuvvetlerini engeller.</li>
      <li><strong>Sismik Dalgalara Karşı Esneklik ve Direnç:</strong> Doğru hesaplanmış kazık çapları ve derinlikleri, yatay deprem yüklerine karşı zemin içinde ekstra bir sürtünme ve tutunma yüzeyi yaratarak binanın devrilme riskini ortadan kaldırır.</li>
    </ul>
  
    <h3>Neli Mühendislik: Statik Güvenlikte Tavizsiz Yaklaşım</h3>
    <p><strong>Neli Mühendislik</strong> olarak, İzmir genelinde hayata geçirdiğimiz tüm projelerde kozmetik güzellikten önce "sıfır risk" prensibiyle hareket ediyoruz. İnşaata başlamadan önce bölgenin sismik geçmişini ve zemin laboratuvar sonuçlarını titizlikle analiz ediyor, tasarımlarımızı yürürlükteki deprem yönetmeliklerinin de ötesindeki standartlarda projelendiriyoruz.</p>
    <p>Yüksek dayanımlı C45 beton kullanımından nervürlü çelik donatı işçiliğine, radye jeneral temelden fore kazık uygulamalarına kadar işin mutfağında uyguladığımız ileri mühendislik teknikleri ile aileniz için sadece şık değil, uykularınızın bölünmeyeceği kadar güvenli yaşam alanları inşa ediyoruz. Şeffaf mühendislik vizyonumuzu ve güvenle yaşayacağınız güncel projelerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/radye-temel.webp",
    coverImageAlt:
      "İzmir deprem bölgesinde radye temel ve fore kazık uygulamaları ile statik güvenlik — Neli Mühendislik",
    category: "Mühendislik ve Altyapı",
    tags: JSON.stringify([
      "radye temel",
      "fore kazık",
      "İzmir deprem güvenliği",
      "zemin sıvılaşması",
      "Neli Mühendislik statik projeleri",
      "depreme dayanıklı ev",
      "zemin etüdü",
    ]),
    featured: true,
    status: "published" as const,
    metaTitle:
      "Radye Temel ve Fore Kazık Sistemlerinin Önemi | Neli Mühendislik",
    metaDescription:
      "İzmir deprem bölgesinde radye temel ve fore kazık sistemlerinin bina güvenliğine etkisini keşfedin. Neli Mühendislik'in yüksek statik standartlarını inceleyin.",
    metaKeywords:
      "radye temel, fore kazık, izmir deprem, zemin etüdü, zemin sıvılaşması, statik proje, neli mühendislik, depreme dayanıklı bina, yapı güvenliği",
    publishedAt: "2026-06-09",
  },
  {
    slug: "cok-katli-konutlarda-katlar-arasi-akustik-ses-yalitimi",
    title:
      "Çok Katlı Lüks Konutlarda Katlar Arası Ses Geçişini Engelleyen Akustik Yalıtım Çözümleri",
    excerpt:
      "Çok katlı apartman yaşantısında mahremiyeti korumak ve huzurlu bir yaşam alanı sağlamak için doğru ses yalıtımı şarttır. Alt ve üst katlar arasındaki ses geçişini engelleyen profesyonel akustik izolasyon çözümlerini keşfedin.",
    content: `<article>
    <h2>Çok Katlı Yapılarda Akustik Konfor ve Mahremiyetin Önemi</h2>
    <p>Şehir hayatının merkezinde, modern ve prestijli bir konutta yaşamanın en temel beklentilerinden biri ev içindeki huzurun korunmasıdır. Ev alıcılarının arama motorlarında sıklıkla araştırdığı <em>'Üst kattan gelen ayak sesi nasıl engellenir?'</em> veya <em>'Apartmanlarda katlar arası ses yalıtımı nasıl yapılmalı?'</em> gibi sorular, geleneksel yapılarda sıklıkla karşılaşılan akustik sorunların altını çizmektedir. Nitelikli bir mühendislik projesinde, estetik mimari kadar mahremiyetin korunmasını sağlayan akustik yalıtım çözümleri de yapı kalitesinin vazgeçilmez bir parçasıdır.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Çok katlı konutlarda katlar arası ses geçişini engellemek için, topuk ve eşya çekme gibi <strong>darbe seslerine</strong> karşı şap altında yüksek yoğunluklu akustik şilteler; konuşma ve televizyon gibi <strong>hava doğuşlu seslere</strong> karşı ise asma tavan aralarında taş yünü paneller kullanılmalıdır. Bu profesyonel akustik yalıtım katmanları, ses dalgalarını sönümleyerek katlar arası desibel (dB) geçişini minimuma indirir ve izole, sessiz bir yaşam alanı sunar.
    </blockquote>
  
    <h3>Profesyonel Ses Yalıtımında Kullanılan İleri Teknikler</h3>
    <p>Modern bir binada akustik konforu sağlamak, sadece duvar kalınlığıyla değil, katmanlı yalıtım malzemelerinin doğru mühendislik hesaplarıyla uygulanmasıyla mümkündür. Konut projelerinde dikkat edilmesi gereken temel akustik çözümler şunlardır:</p>
    <ul>
      <li><strong>Şap Altı Darbe Sesi Yalıtımı:</strong> Zemine dökülen şap ile betonarme döşeme arasına yerleştirilen kauçuk veya polietilen esaslı akustik şilteler, titreşimlerin alt kata iletilmesini keser. Bu uygulama, özellikle çocuklu aileler için üst düzey bir konfor sağlar.</li>
      <li><strong>Asma Tavan İçi Akustik Bariyerler:</strong> Tavan mimarisinde kullanılan alçıpan sistemlerinin içerisine yerleştirilen yüksek yoğunluklu taş yünü veya cam yünü paneller, havadaki ses dalgalarını emerek yankılanmayı ve komşular arası ses transferini önler.</li>
      <li><strong>Tesisat ve Şaft İzolasyonu:</strong> Atık su borularının ve havalandırma şaftlarının etrafına sarılan elastomerik kauçuk köpükleri veya akustik süngerler, tesisattan kaynaklanan su ve hava akış seslerinin yaşam alanlarına ulaşmasını engeller.</li>
    </ul>
  
    <h3>Neli Mühendislik Projelerinde Sessiz ve Huzurlu Yaşam Alanları</h3>
    <p><strong>Neli Mühendislik</strong> olarak, bir evin sadece güvenli ve şık olmasını değil, aynı zamanda sakinlerine tam bir izolasyon ve huzur sunmasını hedefliyoruz. Çiğli ve Balatçık gibi İzmir'in değerli lokasyonlarında hayata geçirdiğimiz Valorya serisi ve Serenità Prestige gibi projelerimizde, akustik konforu standart bir özellik olarak sunuyoruz.</p>
    <p>Zemin uygulamalarında kullandığımız lazer güdümlü tesviye sistemleri sayesinde elde ettiğimiz pürüzsüz yüzeyler, şap altı akustik izolasyon malzemelerinin zemine kusursuz bir şekilde oturmasını ve maksimum performans göstermesini sağlar. Hem yüksek statik güvenlik hem de üst düzey akustik yalıtımla donatılmış modern yaşam alanlarımızı yakından incelemek için satış ofislerimizi ziyaret edebilir veya <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresinden güncel projelerimize göz atabilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/ses-yalitimi.webp",
    coverImageAlt:
      "Çok katlı lüks konutlarda şap altı ve asma tavan akustik ses yalıtımı — Neli Mühendislik",
    category: "Mühendislik ve Altyapı",
    tags: JSON.stringify([
      "akustik ses yalıtımı",
      "katlar arası ses yalıtımı",
      "şap altı izolasyon",
      "lüks konut projeleri",
      "Neli Mühendislik",
      "İzmir satılık daire",
      "Serenità Prestige",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Konutlarda Katlar Arası Ses Yalıtımı ve Akustik Çözümler | Neli",
    metaDescription:
      "Çok katlı konutlarda mahremiyeti sağlayan katlar arası ses yalıtımı ve akustik çözümleri keşfedin. Neli Mühendislik'in huzurlu yaşam alanlarını inceleyin.",
    metaKeywords:
      "katlar arası ses yalıtımı, akustik izolasyon, şap altı yalıtım, darbe sesi yalıtımı, izmir lüks konut, neli mühendislik, serenita prestige, valorya",
    publishedAt: "2026-06-09",
  },
  {
    slug: "santiye-asamasinda-total-station-ile-milimetrik-olcum",
    title:
      "Şantiye Aşamasında Total Station Cihazları ile Milimetrik Ölçümün Önemi",
    excerpt:
      "Kusursuz bir yapı inşa etmenin sırrı, temelin atıldığı ilk günden itibaren sıfır hata ile ilerlemektir. İnşaat projelerinde Total Station cihazlarıyla yapılan milimetrik harita ve kot ölçümlerinin bina kalitesine ve ince işçiliğe etkisini keşfedin.",
    content: `<article>
    <h2>İnşaatta Kusursuzluğun Temeli: İleri Ölçüm Teknolojileri</h2>
    <p>Bir konut projesinin kalitesi, henüz temeli bile atılmadan arazide yapılan ölçümlerle şekillenmeye başlar. Günümüzde inşaat süreçlerini yakından takip eden bilinçli alıcıların arama motorlarında yönelttiği <em>'İnşaatta kot farkı ve aks hatası neden olur?'</em> veya <em>'Total Station cihazı inşaatta ne işe yarar?'</em> gibi sorular, projenin kağıt üzerindeki mükemmelliğinin sahaya nasıl aktarıldığını sorgulamaktadır. Geleneksel ölçüm aletlerinin yerini alan optik ve lazer teknolojileri, mimari ve statik projelerin milimi milimine gerçeğe dönüşmesini sağlar.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Şantiye aşamasında kullanılan Total Station (Elektronik Takeometre) cihazları; binanın köşe noktalarını, kolon akslarını ve kat kotlarını (yüksekliklerini) lazer teknolojisiyle milimetrik olarak ölçen ileri düzey harita mühendisliği ekipmanlarıdır. Bu cihazların kullanımı statik güvenliği artırır, bina geometrisindeki sapmaları engeller ve seramik döşemesinden mutfak dolabı montajına kadar tüm ince işçilik aşamalarının kusursuz ve pürüzsüz ilerlemesini sağlar.
    </blockquote>
  
    <h3>Milimetrik Ölçümün Yapı Kalitesine Sağladığı Avantajlar</h3>
    <p>Şantiyede sıfır hata prensibiyle çalışmak, sadece binanın dış görünüşünü değil, uzun vadeli kullanım konforunu da doğrudan etkiler. Total Station ile yapılan ölçümlerin projelere kattığı teknik değerler şunlardır:</p>
    <ul>
      <li><strong>Statik Güvenlik ve Doğru Yük Dağılımı:</strong> Kolon ve perde betonlarının projede belirtilen koordinatlara milimetrik olarak oturtulması, binanın taşıyıcı sisteminin kusursuz çalışmasını ve deprem yüklerinin doğru aktarılmasını sağlar.</li>
      <li><strong>Kusursuz Kat Yükseklikleri (Kot Uygulaması):</strong> Katlar arasındaki kot farklarının lazer hassasiyetiyle belirlenmesi; merdiven rıht yüksekliklerinin eşit olmasını ve asansör sistemlerinin sorunsuz çalışmasını garanti eder.</li>
      <li><strong>İnce İşçilikte Hata Payının Ortadan Kalkması:</strong> Duvarların tam gönyesinde ve terazisinde örülmesi; ileriki aşamalarda yapılacak lazer güdümlü şap, alçıpan, seramik ve mobilya montajı işlemlerinde boşluk, eğrilik veya uyumsuzluk oluşmasını engeller.</li>
    </ul>
  
    <h3>Neli Mühendislik ile Sıfır Hata ve Yüksek Kalite</h3>
    <p><strong>Neli Mühendislik</strong> olarak, nitelikli bir yapının temelinde yatan en önemli unsurun "hassasiyet" olduğuna inanıyoruz. Çiğli ve Balatçık lokasyonlarında geliştirdiğimiz Valorya ve Serenità serisi projelerimizde, hafriyat aşamasından anahtar teslimine kadar en gelişmiş ölçüm ve haritalama teknolojilerini kullanıyoruz.</p>
    <p>Şantiyelerimizde Total Station cihazlarıyla sağladığımız kaba inşaat doğruluğunu, iç mekanlarda kullandığımız lazer güdümlü tesviye sistemleriyle destekleyerek yaşam alanlarınızda kusursuz bir mimari bütünlük yakalıyoruz. Kaliteyi şansa bırakmayan, ileri mühendislik donanımlarına sahip modern projelerimizi incelemek ve yatırım fırsatlarını değerlendirmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/total-station.webp",
    coverImageAlt:
      "Şantiye aşamasında Total Station ile milimetrik harita ve kot ölçümü — Neli Mühendislik",
    category: "Mühendislik ve Altyapı",
    tags: JSON.stringify([
      "total station",
      "milimetrik ölçüm",
      "kot ölçümü",
      "harita mühendisliği",
      "şantiye teknolojileri",
      "Neli Mühendislik",
      "inşaat kalitesi",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "İnşaatta Total Station ve Milimetrik Ölçümün Önemi | Neli",
    metaDescription:
      "Şantiye aşamasında Total Station cihazları ile yapılan milimetrik harita ve kot ölçümlerinin bina kalitesine etkisini keşfedin. İleri mühendislik standartlarını inceleyin.",
    metaKeywords:
      "total station, milimetrik ölçüm, kot ölçümü, harita mühendisliği, inşaat teknolojileri, izmir şantiye, neli mühendislik, ince işçilik, statik proje, valorya",
    publishedAt: "2026-06-09",
  },
  {
    slug: "daire-tesliminde-eksik-is-kontrolu-nasil-yapilir",
    title: "Daire Tesliminde Eksik İş Kontrolü Nasıl Yapılır?",
    excerpt:
      "Yeni bir daire teslim alırken yalnızca anahtarı almak yeterli değildir. Kapı, pencere, seramik, tesisat, elektrik, mutfak, banyo ve ortak alan kontrolleriyle eksik işlerin nasıl tespit edileceğini öğrenin.",
    content: `<article>
    <h2>Yeni Daire Tesliminde Eksik İş Kontrolü Neden Önemlidir?</h2>
    <p>Yeni bir konut satın alan kişiler için en heyecan verici aşamalardan biri daire teslim günüdür. Ancak bu süreç yalnızca anahtarın alınmasıyla tamamlanmaz. Teslim aşamasında yapılacak dikkatli bir eksik iş kontrolü, ilerleyen dönemde oluşabilecek tadilat masraflarını, zaman kaybını ve kullanım konforunu etkileyen sorunları büyük ölçüde azaltır. Bu nedenle yeni daire tesliminde kapıdan pencereye, seramikten tesisata, elektrik sisteminden sabit mobilyalara kadar her detay sistemli şekilde incelenmelidir.</p>
  
    <p>Günümüzde bilinçli konut alıcılarının arama motorlarında sıkça sorduğu <em>'Daire teslim alırken nelere dikkat edilmeli?'</em>, <em>'Yeni ev tesliminde eksik işler nasıl kontrol edilir?'</em> veya <em>'Daire teslim tutanağına neler yazılır?'</em> gibi sorular, bu sürecin ne kadar önemli olduğunu gösterir. Doğru yapılan bir teslim kontrolü, hem alıcıyı korur hem de yüklenici firmanın tamamlaması gereken işleri net biçimde ortaya koyar.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Daire tesliminde eksik iş kontrolü; kapı, pencere, duvar, tavan, zemin, seramik, elektrik, su tesisatı, mutfak, banyo, balkon ve ortak alanların tek tek incelenmesiyle yapılır. Tespit edilen eksikler teslim tutanağına açık ve anlaşılır şekilde yazılmalı, mümkünse fotoğrafla belgelenmeli ve tamamlanma süreci kayıt altına alınmalıdır.
    </blockquote>
  
    <h3>Daire Tesliminde İlk Kontrol Edilmesi Gereken Alanlar</h3>
    <p>Daire teslim kontrolü yapılırken en doğru yöntem, konutu oda oda ve belirli bir sıra ile incelemektir. Böylece gözden kaçabilecek küçük detaylar daha kolay fark edilir. Kontrolün mümkünse gündüz saatlerinde ve doğal ışık altında yapılması önerilir. Çünkü boya hataları, yüzey dalgalanmaları, cam çizikleri ve seramik ton farkları gün ışığında daha net görülebilir.</p>
    <ul>
      <li><strong>Giriş Kapısı ve İç Kapılar:</strong> Kapıların rahat açılıp kapanması, kilitlerin sorunsuz çalışması, kasa ve pervazlarda açıklık olmaması gerekir. Kapı yüzeylerinde çizik, darbe veya kaplama hatası bulunup bulunmadığı kontrol edilmelidir.</li>
      <li><strong>Pencere ve Doğramalar:</strong> Pencereler sürtmeden açılıp kapanmalı, contalar tam oturmalı ve camlarda çatlak ya da çizik olmamalıdır. Rüzgar ve su sızdırma ihtimaline karşı doğrama birleşimleri dikkatle incelenmelidir.</li>
      <li><strong>Duvar ve Tavan Yüzeyleri:</strong> Boya dalgalanması, alçı çatlağı, kabarma, nem izi veya renk farklılığı olup olmadığı kontrol edilmelidir. Özellikle köşe birleşimleri ve tavan-duvar kesişimleri dikkatle incelenmelidir.</li>
      <li><strong>Zemin Kaplamaları:</strong> Seramik, parke veya diğer döşeme kaplamalarında kırık, çizik, boşluk sesi, kot farkı ve derz hatası olup olmadığına bakılmalıdır.</li>
    </ul>
  
    <h3>Elektrik ve Tesisat Kontrolü Nasıl Yapılmalı?</h3>
    <p>Yeni daire tesliminde elektrik ve mekanik tesisat kontrolleri yalnızca kullanım konforu için değil, güvenlik açısından da önemlidir. Bu nedenle prizlerin, anahtarların, aydınlatma çıkışlarının, su giderlerinin ve armatür bağlantılarının çalışır durumda olup olmadığı mutlaka test edilmelidir.</p>
    <ul>
      <li><strong>Priz ve Anahtarlar:</strong> Tüm prizlerin, anahtarların ve aydınlatma noktalarının çalışıp çalışmadığı kontrol edilmelidir. Gevşek monte edilmiş prizler teslim tutanağına yazılmalıdır.</li>
      <li><strong>Sigorta Panosu:</strong> Sigorta panosunun düzenli, ulaşılabilir ve güvenli şekilde monte edilmiş olması gerekir. Şalterlerin doğru çalışıp çalışmadığı gözlemlenmelidir.</li>
      <li><strong>Su Tesisatı:</strong> Mutfak, banyo, lavabo ve çamaşır makinesi alanlarında su akışı ve gider tahliyesi kontrol edilmelidir. Musluk bağlantılarında sızıntı olup olmadığına bakılmalıdır.</li>
      <li><strong>Banyo ve Balkon Giderleri:</strong> Duş alanı, süzgeçler ve balkon giderlerinde suyun doğru eğimle tahliye olup olmadığı test edilmelidir. Su birikmesi varsa bu durum eksik iş olarak belirtilmelidir.</li>
    </ul>
  
    <h3>Mutfak, Banyo ve Sabit Mobilyalarda Nelere Bakılır?</h3>
    <p>Mutfak dolapları, banyo dolapları, vestiyerler ve diğer sabit mobilyalar teslim sırasında mutlaka açılıp kapatılarak kontrol edilmelidir. Dolap kapaklarının ayarı, menteşelerin sağlamlığı, çekmecelerin ray sistemi ve kulpların montaj kalitesi kullanım konforunu doğrudan etkiler.</p>
    <p>Özellikle mutfak ve banyo gibi yoğun kullanılan alanlarda küçük görünen montaj hataları zaman içinde daha büyük sorunlara dönüşebilir. Dolap kapaklarında sürtme, tezgah birleşimlerinde açıklık, lavabo altında sızıntı, aynalarda çizik veya silikon uygulamalarında boşluk varsa bunlar teslim tutanağına açık şekilde yazılmalıdır.</p>
  
    <h3>Eksik İşler Teslim Tutanağına Nasıl Yazılmalı?</h3>
    <p>Daire tesliminde tespit edilen her eksik, mümkün olduğunca net ve anlaşılır ifadelerle kayıt altına alınmalıdır. Örneğin sadece <em>'banyoda sorun var'</em> yazmak yerine, <em>'ebeveyn banyosu duş giderinde su tahliyesi yavaş'</em> gibi daha açık bir ifade kullanılmalıdır. Bu yöntem, eksik işin daha hızlı ve doğru şekilde tamamlanmasını sağlar.</p>
    <ul>
      <li><strong>Alan Belirtin:</strong> Eksik işin hangi oda, banyo, balkon veya ortak alanda olduğu açıkça yazılmalıdır.</li>
      <li><strong>Sorunu Net Tarif Edin:</strong> Çizik, kırık, sızıntı, boşluk, eğim hatası veya çalışmayan ekipman gibi sorunlar ayrıntılı belirtilmelidir.</li>
      <li><strong>Fotoğrafla Belgeleyin:</strong> Mümkünse her eksik iş fotoğraf veya video ile kayıt altına alınmalıdır.</li>
      <li><strong>Tutanak Nüshasını Saklayın:</strong> İmzalanan teslim tutanağının bir nüshası alıcıda kalmalıdır.</li>
    </ul>
  
    <h3>Daire Teslim Kontrol Listesi Nasıl Hazırlanır?</h3>
    <p>Daire tesliminde kontrol listesi hazırlamak, sürecin daha düzenli ilerlemesini sağlar. Liste oda oda hazırlanmalı ve her alan ayrı başlık altında incelenmelidir. Salon, mutfak, yatak odaları, banyo, antre, balkon ve varsa teras alanı ayrı ayrı değerlendirilmelidir.</p>
    <ul>
      <li>Kapılar, kilitler, menteşeler ve pervazlar</li>
      <li>Pencereler, camlar, doğramalar ve contalar</li>
      <li>Duvar, tavan, boya ve alçı yüzeyleri</li>
      <li>Seramik, parke, süpürgelik ve derz uygulamaları</li>
      <li>Elektrik prizleri, anahtarlar ve sigorta panosu</li>
      <li>Su tesisatı, giderler, bataryalar ve vitrifiye ürünleri</li>
      <li>Mutfak dolapları, tezgah, çekmece ve menteşe sistemleri</li>
      <li>Banyo dolapları, aynalar, duş alanı ve silikon detayları</li>
      <li>Balkon, teras, korkuluk ve gider eğimleri</li>
      <li>Ortak alanlar, bina girişi, otopark ve asansör kullanımı</li>
    </ul>
  
    <h3>Neli Mühendislik ile Kontrollü ve Güvenilir Teslim Süreci</h3>
    <p><strong>Neli Mühendislik</strong> olarak, bir konutun değerinin yalnızca lokasyon, mimari veya metrekare ile sınırlı olmadığını biliyoruz. Teslim kalitesi, ince işçilik, tesisat düzeni, sabit mobilya uygulamaları ve ortak alan detayları uzun vadeli yaşam konforunun temel parçalarıdır. Bu nedenle İzmir Çiğli, Küçük Çiğli ve Balatçık çevresinde geliştirdiğimiz projelerde inşaat sürecinden teslim aşamasına kadar kalite kontrol odaklı ilerliyoruz.</p>
    <p>Yeni bir daire satın alırken yalnızca bugünkü görünümü değil, uzun yıllar boyunca sağlayacağı konforu da değerlendirmek gerekir. Neli Mühendislik projelerinde modern mimari, dikkatli uygulama ve teslim süreci bütüncül bir kalite anlayışıyla ele alınır. Güncel konut seçeneklerimizi incelemek ve yaşamınıza uygun projeleri görmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/teslim-kontrol.webp",
    coverImageAlt:
      "Daire tesliminde eksik iş kontrolü yapan yeni konut alıcısı — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "daire teslimi",
      "eksik iş kontrolü",
      "konut teslim tutanağı",
      "yeni daire kontrolü",
      "ev alırken dikkat edilmesi gerekenler",
      "Neli Mühendislik",
      "İzmir Çiğli konut projeleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Daire Tesliminde Eksik İş Kontrolü Nasıl Yapılır? | Neli",
    metaDescription:
      "Yeni daire tesliminde kapı, pencere, tesisat, elektrik, seramik, mutfak ve banyo kontrolleri nasıl yapılır? Eksik iş kontrol listesi ve teslim tutanağı önerilerini inceleyin.",
    metaKeywords:
      "daire tesliminde eksik iş kontrolü nasıl yapılır, daire teslimi, eksik iş kontrolü, konut teslim tutanağı, yeni daire kontrol listesi, ev tesliminde nelere dikkat edilmeli, izmir yeni konut, neli mühendislik",
    publishedAt: "2026-06-15",
  },
  {
    slug: "yeni-daire-alirken-iskan-belgesi-neden-onemlidir",
    title: "Yeni Daire Alırken İskan Belgesi Neden Önemlidir?",
    excerpt:
      "Yeni bir daire satın alırken konum, fiyat ve metrekare kadar iskan belgesi de dikkatle incelenmelidir. Yapı kullanma izin belgesinin ne anlama geldiğini, konut alıcısı için neden önemli olduğunu ve iskan kontrolünün nasıl yapılması gerektiğini öğrenin.",
    content: `<article>
    <h2>Yeni Daire Alırken İskan Belgesi Neden Kontrol Edilmelidir?</h2>
    <p>Yeni bir daire satın alırken çoğu kişi öncelikle konuma, metrekareye, oda sayısına, manzaraya ve ödeme seçeneklerine odaklanır. Ancak bir konutun güvenli, yasal ve sorunsuz şekilde kullanılabilmesi için dikkat edilmesi gereken en önemli belgelerden biri <strong>iskan belgesi</strong>, yani resmi adıyla <strong>yapı kullanma izin belgesi</strong>dir. Bu belge, yapının ruhsat ve onaylı projelerine uygun şekilde tamamlandığını ve kullanımına izin verildiğini gösteren temel resmi evraklardan biridir.</p>
  
    <p>Günümüzde ev almayı düşünen kullanıcıların arama motorlarında sıkça yönelttiği <em>'İskan belgesi olmayan daire alınır mı?'</em>, <em>'Yeni dairede iskan neden önemlidir?'</em> veya <em>'Yapı kullanma izin belgesi ne işe yarar?'</em> gibi sorular, konut satın alma sürecinde belgenin ne kadar kritik olduğunu gösterir. Çünkü iskan belgesi yalnızca teknik bir evrak değil; tapu, abonelik, kredi, kullanım güvenliği ve uzun vadeli yatırım değeri açısından da önemli bir göstergedir.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni daire alırken iskan belgesi önemlidir çünkü binanın ruhsatına, mimari ve teknik projelerine uygun şekilde tamamlandığını ve kullanılabilir durumda olduğunu gösterir. İskan belgesi; elektrik, su ve doğalgaz abonelikleri, banka kredisi süreçleri, tapu işlemleri, yapı güvenliği ve konutun gelecekteki satış değeri açısından alıcıya güven sağlar. Bu nedenle daire satın almadan önce yapı kullanma izin belgesinin varlığı mutlaka kontrol edilmelidir.
    </blockquote>
  
    <h3>İskan Belgesi Nedir?</h3>
    <p>İskan belgesi, bir yapının inşaat süreci tamamlandıktan sonra ilgili idare tarafından verilen ve yapının kullanımına izin verildiğini gösteren belgedir. Resmi adı <strong>yapı kullanma izin belgesi</strong>dir. Bu belge, binanın yalnızca fiziksel olarak tamamlandığını değil, aynı zamanda ruhsat ve onaylı projelerine uygun şekilde yapıldığını da ifade eder.</p>
    <p>Bir yapının iskan alabilmesi için mimari proje, statik proje, elektrik tesisatı, mekanik tesisat, yangın güvenliği, ortak alanlar, otopark, asansör ve diğer teknik uygulamalar yönünden ilgili mevzuat ve onaylı projelerle uyumlu olması beklenir. Bu nedenle iskan belgesi, konut alıcısı için yapının resmi kullanım sürecine hazır olduğunun önemli bir göstergesidir.</p>
  
    <h3>İskan Belgesi Olmayan Dairede Ne Gibi Sorunlar Yaşanabilir?</h3>
    <p>İskan belgesi bulunmayan bir dairede ilk bakışta her şey tamamlanmış gibi görünebilir. Daire boyanmış, mutfak dolapları takılmış, banyolar yapılmış ve bina kullanılabilir hale gelmiş olabilir. Ancak resmi kullanım izni alınmamış bir yapıda ilerleyen dönemde çeşitli idari, teknik ve finansal sorunlarla karşılaşma ihtimali vardır.</p>
    <ul>
      <li><strong>Abonelik Sorunları:</strong> Elektrik, su ve doğalgaz aboneliklerinde yapı kullanma izin belgesinin varlığı önem taşıyabilir. İskan süreci tamamlanmamış yapılarda abonelik işlemleri daha karmaşık hale gelebilir.</li>
      <li><strong>Kredi Kullanımında Zorluk:</strong> Bankalar, konut kredisi değerlendirmesinde dairenin tapu durumu, yapı ruhsatı ve iskan gibi belgelerini inceleyebilir. İskan eksikliği kredi sürecini olumsuz etkileyebilir.</li>
      <li><strong>Tapu ve Kat Mülkiyeti Süreçleri:</strong> İskan belgesi, kat mülkiyetine geçiş sürecinde önemli belgelerden biridir. Bu nedenle dairenin hukuki durumunu değerlendirirken dikkate alınmalıdır.</li>
      <li><strong>Satış Değeri Riski:</strong> İskan problemi olan konutlar, ileride yeniden satılmak istendiğinde alıcılar ve bankalar tarafından daha dikkatli incelenebilir. Bu durum satış süresini ve değer algısını etkileyebilir.</li>
    </ul>
  
    <h3>Yeni Daire Alırken İskan Belgesi Nasıl Kontrol Edilir?</h3>
    <p>Yeni bir daire satın almadan önce iskan belgesinin varlığı yalnızca sözlü beyanla geçiştirilmemelidir. Alıcı, yapı kullanma izin belgesini görmeli ve belgedeki bilgilerin satın alınacak bağımsız bölümle uyumlu olup olmadığını kontrol etmelidir. Özellikle proje adı, ada-parsel bilgisi, bağımsız bölüm durumu ve binanın resmi kayıtları dikkatle incelenmelidir.</p>
    <ul>
      <li><strong>Belgeyi Talep Edin:</strong> Satıcıdan veya yüklenici firmadan yapı kullanma izin belgesinin bir örneği istenmelidir.</li>
      <li><strong>Tapu Bilgileriyle Karşılaştırın:</strong> Ada, parsel, bağımsız bölüm ve yapı bilgileri tapu kayıtlarıyla uyumlu olmalıdır.</li>
      <li><strong>Belediye veya İlgili İdareden Kontrol Edin:</strong> Gerekirse yapının iskan durumu ilgili belediye veya yetkili idare üzerinden sorgulanmalıdır.</li>
      <li><strong>Kat Mülkiyeti Durumuna Bakın:</strong> Kat irtifakı ve kat mülkiyeti ayrımı incelenmeli, tapu türünün ne ifade ettiği anlaşılmalıdır.</li>
    </ul>
  
    <h3>İskan Belgesi Konutun Değerini Nasıl Etkiler?</h3>
    <p>Bir konutun değeri yalnızca metrekaresi, oda sayısı veya lokasyonuyla belirlenmez. Belgelerinin eksiksiz olması, projenin güvenilirliği ve kullanım sürecinin sorunsuz ilerlemesi de yatırım değerini doğrudan etkiler. İskan belgesi olan bir daire, alıcı açısından daha şeffaf ve güvenli bir tercih olarak değerlendirilir.</p>
    <p>Özellikle İzmir gibi konut talebinin yüksek olduğu bölgelerde, alıcılar artık yalnızca dairenin görünümüne değil; projenin teknik altyapısına, yapı denetim sürecine, tapu durumuna ve iskan belgesine de dikkat etmektedir. Bu nedenle iskan belgesi, hem oturum amaçlı alımlarda hem de yatırım amaçlı konut tercihlerinde önemli bir güven unsurudur.</p>
  
    <h3>İskan Belgesi ile Kat Mülkiyeti Arasında Nasıl Bir Bağlantı Vardır?</h3>
    <p>Konut satın alma sürecinde sıkça karıştırılan konulardan biri de iskan belgesi ile kat mülkiyeti arasındaki ilişkidir. Kat irtifakı, inşaat süreci devam ederken veya yapı henüz tamamlanmadan kurulan bir mülkiyet türüdür. Kat mülkiyeti ise yapı tamamlandıktan ve gerekli resmi süreçler ilerledikten sonra bağımsız bölümlerin tamamlanmış yapı üzerinde tescil edilmesini ifade eder.</p>
    <p>İskan belgesi, kat mülkiyetine geçiş sürecinde önemli bir aşamadır. Bu nedenle yeni daire alırken tapuda kat irtifakı mı yoksa kat mülkiyeti mi yazdığı incelenmeli, iskan durumuyla birlikte değerlendirilmelidir. Böylece alıcı, satın aldığı dairenin yalnızca fiziksel durumunu değil, hukuki ve resmi durumunu da daha sağlıklı analiz edebilir.</p>
  
    <h3>Yeni Konut Projesi Seçerken Belgeler Neden İncelenmelidir?</h3>
    <p>Yeni konut projelerinde örnek daire, cephe tasarımı, sosyal alanlar ve ödeme koşulları alıcılar için güçlü karar kriterleri olabilir. Ancak güvenilir bir satın alma süreci için proje belgelerinin de dikkatle incelenmesi gerekir. Yapı ruhsatı, tapu bilgileri, yapı kullanma izin belgesi, kat mülkiyeti durumu ve proje uygunluğu, konutun uzun vadeli güvenilirliğini gösteren temel başlıklardır.</p>
    <ul>
      <li>Projenin ruhsatlı olup olmadığı kontrol edilmelidir.</li>
      <li>Yapı kullanma izin belgesi talep edilmelidir.</li>
      <li>Tapu türü ve bağımsız bölüm bilgileri incelenmelidir.</li>
      <li>Ortak alanların projeye uygun tamamlanıp tamamlanmadığına bakılmalıdır.</li>
      <li>Satış öncesi tüm belgeler mümkünse uzman desteğiyle değerlendirilmelidir.</li>
    </ul>
  
    <h3>Neli Mühendislik ile Güvenilir ve Şeffaf Konut Süreci</h3>
    <p><strong>Neli Mühendislik</strong> olarak, konut satın alma sürecinde güvenin yalnızca güzel bir daire sunmakla değil, şeffaf ve düzenli bir proje yönetimiyle sağlandığını biliyoruz. İzmir Çiğli, Küçük Çiğli ve Balatçık çevresinde geliştirdiğimiz projelerde; mimari planlama, mühendislik uygulamaları, yapı denetim süreçleri, ince işçilik ve teslim aşamalarını bütüncül bir kalite anlayışıyla ele alıyoruz.</p>
    <p>Yeni bir daire satın alırken iskan belgesi, tapu durumu ve teslim kalitesi gibi detayların dikkatle değerlendirilmesi gerekir. Neli Mühendislik projelerinde amacımız, alıcıların yalnızca bugünkü ihtiyaçlarına değil, uzun vadeli yaşam konforuna ve yatırım güvenliğine de cevap veren konutlar üretmektir. Güncel projelerimizi incelemek ve size uygun konut seçeneklerini görmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/iskan-belgesi.webp",
    coverImageAlt:
      "Yeni daire alırken iskan belgesi ve yapı kullanma izin belgesi kontrolü — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "iskan belgesi",
      "yapı kullanma izin belgesi",
      "yeni daire alırken",
      "konut satın alma",
      "kat mülkiyeti",
      "tapuda dikkat edilmesi gerekenler",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Yeni Daire Alırken İskan Belgesi Neden Önemlidir? | Neli",
    metaDescription:
      "Yeni daire alırken iskan belgesi neden önemlidir? Yapı kullanma izin belgesi, abonelik, tapu, kredi, kat mülkiyeti ve konut değeri açısından ne ifade eder öğrenin.",
    metaKeywords:
      "yeni daire alırken iskan belgesi neden önemlidir, iskan belgesi, yapı kullanma izin belgesi, iskan olmayan daire alınır mı, kat mülkiyeti, konut satın alma rehberi, izmir yeni daire, neli mühendislik",
    publishedAt: "2026-06-15",
  },
  {
    slug: "kat-irtifaki-ile-kat-mulkiyeti-arasindaki-fark-nedir",
    title: "Kat İrtifakı ile Kat Mülkiyeti Arasındaki Fark Nedir?",
    excerpt:
      "Yeni bir daire satın alırken tapuda yazan kat irtifakı ve kat mülkiyeti ifadeleri büyük önem taşır. Bu iki kavram arasındaki farkları, konut alıcısı için ne anlama geldiğini ve tapu kontrolünde nelere dikkat edilmesi gerektiğini öğrenin.",
    content: `<article>
    <h2>Konut Alırken Tapuda Yazılan İfade Neden Önemlidir?</h2>
    <p>Yeni bir daire satın alırken çoğu kişi dairenin konumuna, metrekaresine, oda sayısına, manzarasına ve fiyatına odaklanır. Ancak konutun resmi durumunu anlamak için tapuda yazan mülkiyet türü de mutlaka incelenmelidir. Tapu kaydında görülen <strong>kat irtifakı</strong> ve <strong>kat mülkiyeti</strong> ifadeleri, satın alınacak bağımsız bölümün hukuki ve yapısal süreci hakkında önemli bilgiler verir.</p>
  
    <p>Ev almayı düşünen kullanıcıların arama motorlarında sıkça sorduğu <em>'Kat irtifakı olan daire alınır mı?'</em>, <em>'Kat mülkiyeti tapusu ne demek?'</em> veya <em>'Kat irtifakı ile kat mülkiyeti arasındaki fark nedir?'</em> gibi sorular, tapu bilgisinin konut satın alma kararında ne kadar etkili olduğunu gösterir. Bu farkı bilmek, alıcının yalnızca dairenin fiziksel özelliklerini değil, resmi durumunu da doğru değerlendirmesini sağlar.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Kat irtifakı, inşaat süreci devam eden veya henüz resmi kullanım süreci tamamlanmamış yapılarda bağımsız bölümlerin arsa payı üzerinden kurulan mülkiyet hakkıdır. Kat mülkiyeti ise yapı tamamlandıktan ve gerekli resmi süreçler ilerledikten sonra bağımsız bölümlerin tamamlanmış yapı üzerinde tescil edilmesini ifade eder. Yeni daire alırken kat mülkiyeti, genellikle yapının tamamlanma ve kullanım süreci açısından daha güçlü bir resmi gösterge olarak değerlendirilir.
    </blockquote>
  
    <h3>Kat İrtifakı Nedir?</h3>
    <p><strong>Kat irtifakı</strong>, bir arsa üzerinde yapılacak veya yapımı devam eden binada ileride oluşacak bağımsız bölümler için kurulan mülkiyet hakkıdır. Başka bir ifadeyle kat irtifakı, henüz tamamlanmamış ya da resmi kullanım süreci tamamlanmamış bir yapıda daire, dükkan veya diğer bağımsız bölümlerin arsa paylarıyla ilişkilendirilmesini sağlar.</p>
    <p>Kat irtifakı tapusu, projede hangi bağımsız bölümün hangi arsa payına sahip olduğunu gösterir. Bu nedenle özellikle inşaat halindeki projelerde sık karşılaşılan bir tapu türüdür. Ancak kat irtifakı, yapının tamamen bitmiş ve tüm resmi kullanım süreçlerinin tamamlanmış olduğu anlamına tek başına gelmez. Bu nedenle alıcı, kat irtifakı bulunan bir daireyi değerlendirirken yapı ruhsatı, proje uygunluğu, iskan durumu ve teslim sürecini birlikte incelemelidir.</p>
  
    <h3>Kat Mülkiyeti Nedir?</h3>
    <p><strong>Kat mülkiyeti</strong>, tamamlanmış bir yapıda bulunan bağımsız bölümlerin ayrı ayrı mülkiyet hakkı olarak tapuya tescil edilmesidir. Daire, dükkan, ofis veya depo gibi bağımsız bölümler kat mülkiyeti ile resmi olarak tanımlanır. Kat mülkiyeti bulunan bir tapu, yapının tamamlanmış olması ve bağımsız bölümlerin resmi kayıtlarda daha net şekilde ayrılmış olması açısından konut alıcısına güven verir.</p>
    <p>Yeni bir daire satın alırken tapuda kat mülkiyeti yazması, alıcı açısından önemli bir avantaj olarak görülür. Çünkü bu durum, yapının tamamlanma süreci, bağımsız bölüm ayrımı ve resmi kayıt düzeni açısından daha ileri bir aşamayı ifade eder. Ancak yine de tapu bilgileri, iskan belgesi, proje uygunluğu ve satış sözleşmesi birlikte değerlendirilmelidir.</p>
  
    <h3>Kat İrtifakı ile Kat Mülkiyeti Arasındaki Temel Farklar</h3>
    <p>Kat irtifakı ve kat mülkiyeti arasındaki farkı anlamak, konut satın alma sürecinde daha bilinçli karar vermeyi sağlar. Bu iki kavram birbirine yakın görünse de, yapının tamamlanma aşaması ve resmi kayıt durumu açısından farklı anlamlar taşır.</p>
    <ul>
      <li><strong>Yapının Aşaması:</strong> Kat irtifakı genellikle inşaatı devam eden veya resmi tamamlanma süreci henüz bitmemiş yapılarla ilişkilidir. Kat mülkiyeti ise tamamlanmış yapıdaki bağımsız bölümleri ifade eder.</li>
      <li><strong>Resmi Kullanım Süreci:</strong> Kat mülkiyeti, yapının tamamlanmış ve bağımsız bölümlerin resmi olarak ayrılmış olduğunu gösteren daha güçlü bir tapu aşamasıdır.</li>
      <li><strong>Alıcı Güveni:</strong> Kat mülkiyeti bulunan daireler, tapu ve kullanım süreci açısından alıcıya daha net bir tablo sunar. Kat irtifakı bulunan dairelerde ise iskan ve proje uygunluğu ayrıca kontrol edilmelidir.</li>
      <li><strong>Kredi ve Satış Süreci:</strong> Bankalar konut kredisi değerlendirmesinde tapu türünü, yapı durumunu ve resmi belgeleri dikkate alabilir. Bu nedenle tapu türü finansman sürecinde de önemlidir.</li>
    </ul>
  
    <h3>Kat İrtifakı Olan Daire Alınır mı?</h3>
    <p>Kat irtifakı olan bir daire, her durumda sorunlu anlamına gelmez. Özellikle inşaatı devam eden veya yeni tamamlanmak üzere olan projelerde kat irtifakı tapusuyla satış yapılması sık karşılaşılan bir durumdur. Ancak bu noktada alıcının dikkat etmesi gereken konu, yalnızca tapu türüne bakmak değil, projenin genel resmi durumunu birlikte değerlendirmektir.</p>
    <p>Kat irtifakı olan bir daire alınmadan önce yapı ruhsatı, onaylı proje, iskan süreci, bağımsız bölüm bilgileri, arsa payı ve teslim şartları kontrol edilmelidir. Ayrıca satın alınacak dairenin projede belirtilen bağımsız bölümle uyumlu olup olmadığı mutlaka incelenmelidir. Bu kontroller, alıcının ileride tapu, kullanım veya satış aşamasında sorun yaşamaması açısından önemlidir.</p>
  
    <h3>Kat Mülkiyeti Tapusu Neden Avantajlıdır?</h3>
    <p>Kat mülkiyeti tapusu, konut alıcısı için daha tamamlanmış ve daha net bir resmi durumu ifade eder. Bu nedenle oturum amaçlı daire alımlarında da yatırım amaçlı konut tercihlerinde de önemli bir güven unsurudur. Kat mülkiyeti olan bir daire, bağımsız bölümün yapı üzerinde resmi olarak tanımlandığını gösterir.</p>
    <ul>
      <li><strong>Daha Net Tapu Durumu:</strong> Bağımsız bölüm, tapu kayıtlarında daha açık şekilde yer alır.</li>
      <li><strong>Satışta Güven Avantajı:</strong> Gelecekte daire satılırken alıcılar kat mülkiyeti tapusunu daha güven verici bulabilir.</li>
      <li><strong>Kredi Sürecinde Kolaylık:</strong> Bankalar değerlendirme yaparken tapu türünü ve yapının resmi durumunu dikkate alabilir.</li>
      <li><strong>Yatırım Değeri:</strong> Belgeleri daha net olan konutlar, uzun vadeli yatırım açısından daha güçlü bir algı oluşturabilir.</li>
    </ul>
  
    <h3>Tapu Kontrolünde Nelere Dikkat Edilmeli?</h3>
    <p>Yeni daire satın almadan önce tapu bilgileri dikkatle incelenmelidir. Tapuda yazan bağımsız bölüm numarası, arsa payı, ada-parsel bilgisi ve mülkiyet türü satışa konu olan daireyle uyumlu olmalıdır. Sadece dairenin gezilip beğenilmesi yeterli değildir; resmi belgelerin de satın alınacak konutla birebir örtüşmesi gerekir.</p>
    <ul>
      <li>Tapuda kat irtifakı mı kat mülkiyeti mi yazdığı kontrol edilmelidir.</li>
      <li>Ada, parsel ve bağımsız bölüm numarası incelenmelidir.</li>
      <li>Satın alınacak dairenin proje üzerindeki konumu ile tapu bilgileri karşılaştırılmalıdır.</li>
      <li>İskan belgesi ve yapı kullanma izin süreci araştırılmalıdır.</li>
      <li>Gerekirse tapu ve belediye kayıtları uzman desteğiyle değerlendirilmelidir.</li>
    </ul>
  
    <h3>İzmir’de Yeni Daire Alırken Tapu ve Belge Kontrolünün Önemi</h3>
    <p>İzmir, özellikle Çiğli, Küçük Çiğli ve Balatçık gibi gelişen bölgeleriyle yeni konut projelerine olan ilginin arttığı şehirlerden biridir. Bu bölgelerde daire satın alırken yalnızca projenin konumu ve mimari özellikleri değil, tapu türü, iskan durumu ve proje belgeleri de dikkatle değerlendirilmelidir. Çünkü doğru belgelerle desteklenen bir konut, hem güvenli yaşam hem de uzun vadeli yatırım açısından daha sağlam bir temel oluşturur.</p>
    <p>Kat irtifakı ve kat mülkiyeti farkını bilen bir alıcı, satın alma sürecinde daha doğru sorular sorar. Böylece yalnızca bugünkü fiyat avantajına değil, dairenin gelecekteki kullanım, satış ve yatırım değerine de odaklanabilir.</p>
  
    <h3>Neli Mühendislik ile Şeffaf ve Güvenilir Konut Yaklaşımı</h3>
    <p><strong>Neli Mühendislik</strong> olarak, konut satın alma sürecinde güvenin yalnızca modern mimariyle değil, doğru belge yönetimi ve şeffaf bilgilendirme ile sağlandığını biliyoruz. İzmir Çiğli, Küçük Çiğli ve Balatçık çevresinde geliştirdiğimiz projelerde; mühendislik kalitesi, yapı güvenliği, teslim süreci ve resmi süreçlerin düzenli ilerlemesi bizim için bütüncül kalite anlayışının parçalarıdır.</p>
    <p>Yeni bir daire satın alırken kat irtifakı, kat mülkiyeti, iskan belgesi ve teslim kalitesi gibi konuların birlikte değerlendirilmesi gerekir. Neli Mühendislik projelerinde amacımız, alıcıların hem bugünkü yaşam ihtiyaçlarına hem de uzun vadeli yatırım beklentilerine cevap veren güvenilir konutlar üretmektir. Güncel projelerimizi incelemek ve size uygun konut seçeneklerini görmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/tapu-farki.webp",
    coverImageAlt:
      "Kat irtifakı ile kat mülkiyeti arasındaki farkı gösteren tapu ve konut belgeleri — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "kat irtifakı",
      "kat mülkiyeti",
      "tapu kontrolü",
      "yeni daire alırken",
      "iskan belgesi",
      "konut satın alma",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Kat İrtifakı ile Kat Mülkiyeti Arasındaki Fark Nedir? | Neli",
    metaDescription:
      "Kat irtifakı ile kat mülkiyeti arasındaki fark nedir? Yeni daire alırken tapu türü, iskan belgesi, kredi süreci ve konut değeri açısından nelere dikkat edilmeli öğrenin.",
    metaKeywords:
      "kat irtifakı ile kat mülkiyeti arasındaki fark nedir, kat irtifakı, kat mülkiyeti, tapu kontrolü, yeni daire alırken tapu, iskan belgesi, konut satın alma rehberi, izmir yeni daire, neli mühendislik",
    publishedAt: "2026-06-15",
  },
  {
    slug: "brut-metrekare-ile-net-metrekare-farki-nasil-hesaplanir",
    title: "Brüt Metrekare ile Net Metrekare Farkı Nasıl Hesaplanır?",
    excerpt:
      "Yeni bir daire satın alırken ilanda yazan metrekare bilgisi her zaman yaşam alanını tam olarak göstermez. Brüt metrekare ve net metrekare farkını, daire karşılaştırması yaparken nelere dikkat edilmesi gerektiğini öğrenin.",
    content: `<article>
    <h2>Daire Alırken Metrekare Bilgisi Neden Doğru Okunmalıdır?</h2>
    <p>Yeni bir daire satın alırken en çok dikkat edilen kriterlerden biri metrekaredir. Ancak konut ilanlarında görülen metrekare değeri her zaman dairenin kullanılabilir yaşam alanını ifade etmeyebilir. Bu nedenle <strong>brüt metrekare</strong> ve <strong>net metrekare</strong> kavramlarını doğru anlamak, hem fiyat karşılaştırması yapmak hem de gerçek yaşam alanını değerlendirmek açısından büyük önem taşır.</p>
    <p>Konut alıcılarının arama motorlarında sıkça sorduğu <em>'Brüt metrekare ile net metrekare farkı nedir?'</em>, <em>'Net metrekare nasıl hesaplanır?'</em> veya <em>'Daire alırken hangi metrekareye bakılmalı?'</em> gibi sorular, bu konunun satın alma kararında ne kadar etkili olduğunu gösterir. Çünkü aynı brüt metrekareye sahip iki daire, planlama farkları nedeniyle birbirinden çok farklı kullanılabilir alanlar sunabilir.</p>

<blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
  <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Brüt metrekare, dairenin duvarları, ortak alan payları ve bazı projelerde balkon, merdiven, asansör holü gibi alanların dahil edilmesiyle ifade edilen toplam alan bilgisidir. Net metrekare ise daire içinde fiilen kullanılabilen yaşam alanını gösterir. Daire alırken gerçek kullanım konforunu anlamak için yalnızca brüt metrekareye değil, net metrekareye, oda dağılımına, plan verimliliğine ve balkon/teras gibi alanların nasıl hesaplandığına dikkat edilmelidir.
</blockquote>

<h3>Brüt Metrekare Nedir?</h3>
<p><strong>Brüt metrekare</strong>, bir dairenin toplam alanını daha geniş kapsamlı şekilde ifade eden metrekare bilgisidir. Bu alan hesabına yalnızca dairenin iç yaşam alanı değil, bazı durumlarda duvar kalınlıkları, balkonlar, merdiven boşlukları, asansör holleri, kat koridorları ve ortak alan payları da dahil edilebilir. Bu nedenle brüt metrekare, alıcının daire içinde birebir kullanacağı alanı tek başına göstermez.</p>

<p>Brüt metrekare özellikle proje tanıtımlarında ve konut ilanlarında sık kullanılan bir ifadedir. Ancak her projede brüt alan hesabının kapsamı aynı olmayabilir. Bir projede balkon brüt alana dahil edilirken, başka bir projede ortak alan payı daha farklı şekilde hesaplanabilir. Bu nedenle daire alırken brüt metrekarenin hangi alanları kapsadığı mutlaka sorulmalıdır.</p>

<h3>Net Metrekare Nedir?</h3>
<p><strong>Net metrekare</strong>, daire içinde fiilen kullanılabilen alanı ifade eder. Salon, yatak odaları, mutfak, banyo, antre, koridor ve kullanım alanına dahil edilen iç bölümler net metrekare hesabında değerlendirilir. Net alan, alıcının günlük yaşamda gerçekten kullanacağı alanı gösterdiği için konut seçiminde çok daha açıklayıcı bir veridir.</p>

<p>Net metrekare, özellikle aynı oda sayısına sahip daireleri karşılaştırırken önemlidir. Örneğin iki farklı 2+1 daire aynı brüt metrekareye sahip olabilir; ancak birinde koridor alanı fazla, diğerinde salon ve odalar daha verimli planlanmış olabilir. Bu durumda net alanı daha iyi kullanılan daire, günlük yaşamda daha geniş ve konforlu hissedilebilir.</p>

<h3>Brüt ve Net Metrekare Arasındaki Fark Nasıl Hesaplanır?</h3>
<p>Brüt ve net metrekare arasındaki fark, dairenin toplam gösterilen alanı ile fiilen kullanılabilen iç alanı arasındaki farktır. Basit şekilde ifade etmek gerekirse, brüt metrekareden ortak alan payları, duvar kalınlıkları, tesisat boşlukları ve kullanılmayan alanlar çıkarıldığında net metrekareye daha yakın bir değer elde edilir.</p>
<ul>
  <li><strong>Brüt Metrekare:</strong> Dairenin toplam proje alanını ve bazı ortak alan paylarını içerebilir.</li>
  <li><strong>Net Metrekare:</strong> Daire içinde günlük yaşamda kullanılabilen gerçek alanı gösterir.</li>
  <li><strong>Fark:</strong> Brüt alandan ortak alan, duvar, boşluk ve kullanım dışı alanların çıkarılmasıyla ortaya çıkar.</li>
</ul>

<p>Örneğin bir daire ilanda 100 m² brüt olarak belirtilmiş olabilir. Ancak dairenin net kullanılabilir alanı 75 m² ise, alıcı günlük yaşamda 75 m² üzerinden bir kullanım alanına sahip olacaktır. Bu nedenle fiyat değerlendirmesi yaparken yalnızca brüt metrekareye değil, net metrekare başına düşen maliyete de bakmak daha doğru bir analiz sağlar.</p>

<h3>Daire Alırken Hangi Metrekareye Bakılmalı?</h3>
<p>Daire alırken hem brüt hem net metrekare birlikte değerlendirilmelidir. Brüt metrekare, projenin genel alan büyüklüğü hakkında fikir verirken; net metrekare, dairenin gerçek yaşam konforunu anlamayı sağlar. Bu nedenle yalnızca ilanda yazan büyük metrekare değerine göre karar vermek doğru değildir.</p>
<ul>
  <li><strong>Yaşam Konforu İçin:</strong> Net metrekare ve oda dağılımı incelenmelidir.</li>
  <li><strong>Fiyat Karşılaştırması İçin:</strong> Net metrekare başına düşen fiyat hesaplanmalıdır.</li>
  <li><strong>Plan Verimliliği İçin:</strong> Koridor, antre ve kullanılmayan alanların oranına bakılmalıdır.</li>
  <li><strong>Balkon ve Teras İçin:</strong> Bu alanların brüt ve net hesaba nasıl dahil edildiği sorulmalıdır.</li>
</ul>

<h3>Plan Verimliliği Metrekareden Daha Önemli Olabilir mi?</h3>
<p>Bir dairenin konforunu yalnızca metrekare büyüklüğü belirlemez. Planın doğru çözülmüş olması, alanların verimli kullanılması ve odalar arasındaki dağılım günlük yaşam kalitesini doğrudan etkiler. Büyük görünen ancak uzun koridorlara, kullanışsız köşelere veya dar odalara sahip bir daire; daha küçük ama iyi planlanmış bir daireden daha az kullanışlı olabilir.</p>

<p>Bu nedenle yeni daire alırken salon genişliği, mutfak düzeni, yatak odalarının ölçüsü, banyo konumu, depolama alanı, balkon kullanımı ve antre planı birlikte incelenmelidir. İyi planlanmış bir dairede her metrekare gerçek bir kullanım değerine dönüşür.</p>

<h3>Brüt Metrekare Yanıltıcı Olabilir mi?</h3>
<p>Brüt metrekare tek başına değerlendirildiğinde alıcıya olduğundan daha büyük bir yaşam alanı algısı verebilir. Özellikle ortak alan paylarının fazla olduğu projelerde brüt ve net alan arasındaki fark artabilir. Bu durum, daireleri karşılaştırırken yanlış sonuçlara yol açabilir.</p>

<p>Bu nedenle bir konut projesini incelerken şu sorular mutlaka sorulmalıdır:</p>
<ul>
  <li>İlanda yazan metrekare brüt mü, net mi?</li>
  <li>Net kullanım alanı kaç metrekaredir?</li>
  <li>Balkon, teras veya bahçe alanı metrekareye dahil mi?</li>
  <li>Ortak alan payı brüt hesaba nasıl yansıtılmıştır?</li>
  <li>Dairenin mimari planında kullanılmayan alan oranı yüksek mi?</li>
</ul>

<h3>Metrekare Karşılaştırması Yaparken Nelere Dikkat Edilmeli?</h3>
<p>Aynı bölgede iki farklı daireyi karşılaştırırken yalnızca toplam fiyat veya brüt metrekare üzerinden değerlendirme yapmak eksik bir analiz olabilir. Daha doğru bir karşılaştırma için net metrekare, oda dağılımı, cephe, kat konumu, balkon kullanımı, malzeme kalitesi ve bina ortak alanları birlikte düşünülmelidir.</p>

<ul>
  <li><strong>Net Metrekare Başına Fiyat:</strong> Gerçek kullanım alanı üzerinden maliyet analizi yapılmasını sağlar.</li>
  <li><strong>Oda Kullanışlılığı:</strong> Odaların sadece sayısı değil, ölçüleri ve yerleşimi önemlidir.</li>
  <li><strong>Balkon ve Teras Alanı:</strong> Açık alanların gerçekten kullanılabilir olup olmadığı değerlendirilmelidir.</li>
  <li><strong>Ortak Alan Kalitesi:</strong> Asansör, otopark, bina girişi ve merdiven alanları yaşam kalitesini etkiler.</li>
</ul>

<h3>Neli Mühendislik ile Verimli Planlanan Yaşam Alanları</h3>
<p><strong>Neli Mühendislik</strong> olarak, bir dairenin değerini yalnızca brüt metrekare büyüklüğüyle değil, yaşam alanlarının ne kadar verimli kullanıldığıyla değerlendiriyoruz. İzmir Çiğli, Küçük Çiğli ve Balatçık çevresinde geliştirdiğimiz konut projelerinde planlama sürecini; oda kullanışlılığı, doğal ışık, balkon ve teras kullanımı, mutfak düzeni ve günlük yaşam konforu gibi detaylarla birlikte ele alıyoruz.</p>
<p>Yeni bir daire satın alırken metrekare bilgisini doğru okumak, uzun vadede daha bilinçli bir tercih yapmanızı sağlar. Neli Mühendislik projelerinde modern mimari, fonksiyonel planlama ve kaliteli uygulama anlayışıyla yaşam alanlarının her metrekaresine gerçek değer katmayı hedefliyoruz. Güncel projelerimizi incelemek ve size uygun konut seçeneklerini görmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
</article>`,
    coverImage: "/images/blog/net-brut.webp",
    coverImageAlt:
      "Brüt metrekare ile net metrekare farkını gösteren modern daire planı — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "brüt metrekare",
      "net metrekare",
      "daire metrekare hesabı",
      "konut satın alma",
      "yeni daire alırken",
      "plan verimliliği",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Brüt Metrekare ile Net Metrekare Farkı Nasıl Hesaplanır? | Neli",
    metaDescription:
      "Brüt metrekare ile net metrekare farkı nedir? Yeni daire alırken gerçek kullanım alanı, plan verimliliği ve net metrekare hesabında nelere dikkat edilmeli öğrenin.",
    metaKeywords:
      "brüt metrekare ile net metrekare farkı nasıl hesaplanır, brüt metrekare, net metrekare, daire metrekare hesabı, yeni daire alırken metrekare, konut satın alma rehberi, plan verimliliği, izmir yeni daire, neli mühendislik",
    publishedAt: "2026-06-15",
  },
  {
    slug: "brut-metrekare-ile-net-metrekare-farki-nasil-hesaplanir",
    title: "Brüt Metrekare ile Net Metrekare Farkı Nasıl Hesaplanır?",
    excerpt:
      "Ev satın alırken ya da kiralarken en sık karşılaşılan tuzaklardan biri metrekare hesaplamalarıdır. Brüt metrekare ile net metrekare arasındaki farkları, doğru hesaplama yöntemlerini ve dikkat etmeniz gerekenleri rehberimizden öğrenin.",
    content: `<article>
    <h2>Konut Seçerken Metrekare Kavramı Neden Önemlidir?</h2>
    <p>Yeni bir eve taşınırken veya yatırım amacıyla gayrimenkul incelerken ilk baktığımız özelliklerden biri konutun genişliğidir. Ancak ilanlarda gördüğünüz "120 m² geniş daire" ifadesi taşındığınızda size çok daha dar gelebilir. Bunun temel sebebi, gayrimenkul sektöründe kullanılan <strong>brüt metrekare</strong> ve <strong>net metrekare</strong> kavramları arasındaki farktır.</p>
    
    <p>Konut alıcılarının arama motorlarında sıkça arattığı <em>'Brüt metrekare nedir?'</em>, <em>'Net metrekare nasıl hesaplanır?'</em> veya <em>'Süpürülebilir alan ne demek?'</em> gibi sorular, yaşam alanlarının gerçek boyutunu öğrenme ihtiyacından doğar. Bu iki kavram arasındaki farkı bilmek, hem ödediğiniz paranın karşılığını tam olarak almanızı sağlar hem de taşınma sonrasında mobilyalarınızın yerleşimiyle ilgili sürpriz yaşamanızı engeller.</p>
    
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Brüt metrekare, konutun dış duvar sınırları dahil olmak üzere merdiven boşlukları, asansörler ve sosyal alanlar gibi ortak kullanım alanlarından daireye düşen payı içeren toplam alandır. Net metrekare ise sadece konutun duvarları arasında kalan, doğrudan kullanabileceğiniz ve "süpürülebilir alan" olarak adlandırılan gerçek yaşam alanıdır. Doğru bir hesaplama için iç duvarlar arası mesafe oda oda ölçülüp toplanmalı, brüt alandan ortak paylar düşülmelidir.
    </blockquote>
    
    <h3>Brüt Metrekare Nedir ve Neleri Kapsar?</h3>
    <p><strong>Brüt metrekare</strong>, bir bağımsız bölümün yapısal olarak kapladığı toplam alanı ifade eder. Ancak brüt metrekare kendi içinde ikiye ayrılır: <strong>Dış Brüt (Toplam Brüt)</strong> ve <strong>İç Brüt</strong>.</p>
    <p>Dış brüt alan hesaplanırken dairenin kendi alanı haricinde apartman merdiveni, asansör boşluğu, yangın merdiveni, koridorlar, sığınak ve hatta otopark ile sosyal tesis gibi alanlardan o dairenin arsa payına düşen metrekare miktarı da eklenir. İç brüt ise sadece dairenin dış duvar sınırları içinde kalan, duvar kalınlıklarını ve varsa balkonları da içeren alanıdır. İlanlarda genellikle konutu daha büyük göstermek amacıyla toplam dış brüt metrekare tercih edilir.</p>
    
    <h3>Net Metrekare Nedir? (Süpürülebilir Alan)</h3>
    <p><strong>Net metrekare</strong>, konutun içinde duvarların arasında kalan ve fiziksel olarak adım atıp mobilya yerleştirebileceğiniz net yaşam alanıdır. Sektörde bu alana <strong>"süpürülebilir alan"</strong> da denmektedir.</p>
    <p>Net metrekare hesaplanırken iç duvar kalınlıkları, kolonlar, tesisat boşlukları ve şaftlar hesaba katılmaz. Salon, odalar, mutfak, banyo, antre ve hol gibi alanların taban yüzey ölçümlerinin toplamıdır. Balkonların net alana dahil edilip edilmeyeceği Çevre, Şehircilik ve İklim Değişikliği Bakanlığı yönetmeliklerine göre değişiklik gösterse de, açık balkonlar genellikle net süpürülebilir alanın dışında tutulmalıdır.</p>
    
    <h3>Brüt Metrekare ile Net Metrekare Farkı Nasıl Hesaplanır?</h3>
    <p>Bir konutun net alanını ve uğrayabileceğiniz metrekare kaybını hesaplamak için izleyebileceğiniz en güvenilir yöntemler şunlardır:</p>
    <ul>
      <li><strong>Oda Oda Lazer Metre ile Ölçüm:</strong> Evin her odasının (salon, mutfak, yatak odaları, banyo vb.) boyunu ve enini lazer metre ile ölçüp birbiriyle çarpın. Çıkan tüm oda sonuçlarını topladığınızda evinizin gerçek <strong>net metrekaresini</strong> bulursunuz.</li>
      <li><strong>Yönetmelik Standartlarını İnceleme:</strong> Planlı Alanlar Tip İmar Yönetmeliği'ne göre projelerde net ve brüt alanların açıkça belirtilmesi zorunludur. Satış ofislerinden onaylı mimari projeyi talep ederek tablodaki net/brüt değerlerini kontrol edebilirsiniz.</li>
      <li><strong>Fark Oranına Dikkat Etme:</strong> Türkiye genelindeki konut projelerinde brüt ile net alan arasında ortalama %25 ila %35 arasında bir fark (kayıp oranı) bulunur. Örneğin; brüt alanı 120 m² olan bir dairenin net alanı projesine göre yaklaşık 85-90 m² civarındadır.</li>
    </ul>
    
    <h3>Gayrimenkul Alırken Metrekare Tuzaklarına Düşmemek İçin Öneriler</h3>
    <p>İlan sitelerinde ya da satış pazarlamalarında mağduriyet yaşamamak adına alıcıların şu adımlara dikkat etmesi kritik önem taşır:</p>
    <ul>
      <li>Sadece "Dairemiz 150 metrekaredir" ifadesiyle yetinmeyin; mutlaka <strong>"Net kullanım alanı kaç metrekare?"</strong> sorusunu yöneltin.</li>
      <li>Mümkünse daireyi fiziki olarak ziyaret edin ve yanınızda bir şerit metre veya lazer metre bulundurarak kabaca ölçüm yapın.</li>
      <li>Tapu senedinde yazan metrekare değerinin çoğunlukla "arsa payı" olduğunu, dairenin net metrekaresini göstermediğini unutmayın. Gerçek değerler için belediyedeki <strong>onaylı mimari projeyi</strong> inceleyin.</li>
      <li>Balkon, teras veya depo gibi alanların net metrekareye dahil edilip edilmediğini netleştirin.</li>
    </ul>
    
    <h3>İzmir’de Doğru Metrekare ve Güvenilir Proje Analizi</h3>
    <p>İzmir, özellikle Çiğli, Küçük Çiğli ve Balatçık gibi yeni nesil yapılaşmanın yoğun olduğu bölgelerde hızlı bir gayrimenkul büyümesi yaşamaktadır. Bu bölgelerdeki modern sitelerde kapalı otoparklar, geniş havuzlar ve sosyal tesisler oldukça yaygındır. Ancak ortak alanlar genişledikçe, dairelerin brüt metrekaresi ile net metrekaresi arasındaki makas da açılabilmektedir.</p>
    <p>İzmir'de yeni bir daire satın alırken, ilanlardaki yüksek metrekarelerin ne kadarının sosyal alan payı ne kadarının evin içi olduğunu bilmek bütçenizi doğru yönetmenizi sağlar. Doğru metrekare analizi, uzun vadede mülkünüzü satarken veya kiraya verirken de size değer kaybettirmeyecek doğru bir yatırım konumu sunar.</p>
    
    <h3>Neli Mühendislik ile Şeffaf Metrekare ve Mühendislik Güvencesi</h3>
    <p><strong>Neli Mühendislik</strong> olarak, nitelikli yaşam alanları inşa ederken en büyük önceliğimizi şeffaflık ve güven üzerine kuruyoruz. İzmir Çiğli, Küçük Çiğli ve Balatçık bölgelerinde hayata geçirdiğimiz tüm projelerimizde, alıcılarımıza brüt ve net metrekare oranlarını tüm dürüstlüğüyle, mimari planlar üzerinden eksiksiz aktarıyoruz.</p>
    <p>Projelendirmeden teslime kadar mühendislik disiplinlerinden ödün vermeden, her metrekaresi verimli şekilde tasarlanmış, kayıp alanı minimumda tutulmuş fonksiyonel konutlar üretiyoruz. Siz de metrekare aldatmacalarından uzak, her detayıyla şeffaf ve güvenilir konut projelerimizi yakından incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilir, yaşam standardınıza en uygun daireyi güvenle seçebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/brut-net.webp",
    coverImageAlt:
      "Brüt metrekare ve net metrekare hesaplama yöntemlerini gösteren mimari plan ve lazer metre ölçümü — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "brüt metrekare",
      "net metrekare",
      "metrekare hesaplama",
      "süpürülebilir alan",
      "daire ölçümü",
      "konut satın alma",
      "Neli Mühendislik",
      "izmir satılık daire",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Brüt Metrekare ile Net Metrekare Farkı Nasıl Hesaplanır? | Neli",
    metaDescription:
      "Brüt metrekare ile net metrekare farkı nasıl hesaplanır? Ev alırken süpürülebilir alan (net m²) nasıl ölçülür, imar yönetmeliği metrekare standartları nelerdir öğrenin.",
    metaKeywords:
      "brüt metrekare ile net metrekare farkı nasıl hesaplanır, brüt metrekare nedir, net metrekare hesaplama, süpürülebilir alan nedir, daire metrekare hesaplama, ev alırken metrekare kontrolü, neli mühendislik, izmir çiğli konut projeleri",
    publishedAt: "2026-06-15",
  },
  {
    slug: "yeni-dairede-su-tesisati-ve-gider-kontrolu-nasil-yapilir",
    title: "Yeni Dairede Su Tesisatı ve Gider Kontrolü Nasıl Yapılır?",
    excerpt:
      "Yeni bir eve taşınırken gözden kaçan en kritik detaylardan biri su tesisatıdır. Gelecekte büyük masraflarla karşılaşmamak için tesisat ve gider kontrolü adımlarını keşfedin.",
    content: `<article>
    <h2>Ev Alırken veya Kiralarken Su Tesisatını İncelemek Neden Önemlidir?</h2>
    <p>Yeni bir dairenin boyası, mutfak dolapları veya zemin kaplamaları ilk bakışta göz kamaştırıcı görünebilir. Ancak bir evin konforunu ve kalitesini belirleyen en temel unsurlar, genellikle duvarların ve fayansların arkasında gizlidir. Bu unsurların başında da hiç şüphesiz temiz ve atık su tesisat sistemleri gelir.</p>
    
    <p>Konut alıcılarının veya yeni kiracıların arama motorlarında sıkça sorguladığı <em>'Yeni dairede su tesisatı testi nasıl yapılır?'</em>, <em>'Giderlerde tıkanıklık kontrolü'</em> veya <em>'Banyo su sızıntısı nasıl anlaşılır?'</em> gibi konular, taşındıktan sonra yaşanabilecek mağduriyetlerin önüne geçmek için hayati önem taşır. Tesisatta oluşabilecek küçük bir sızıntı veya hatalı bir gider eğimi, hem kendi dairenize hem de alt komşunuza ciddi zararlar vererek yüksek maliyetli tadilat süreçlerine yol açabilir.</p>
    
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni dairede su tesisatı ve gider kontrolü; tüm muslukların aynı anda açılarak su basıncının test edilmesi, vanalar kapatıldığında su sayacının dönüp dönmediğinin incelenmesi ve giderlere bol miktarda su dökülerek akış hızının gözlemlenmesiyle yapılır. Ayrıca banyo ve mutfak zeminindeki süzgeçlerin eğimi, dolap içlerindeki bağlantı noktalarında nemlenme olup olmadığı ve duvarlarda renk değişimi (rutubet) titizlikle kontrol edilmelidir.
    </blockquote>
    
    <h3>Temiz Su Tesisatı Kontrolü: Adım Adım Yapılması Gerekenler</h3>
    <p>Dairedeki temiz su borularında sızıntı, çatlak veya basınç problemi olup olmadığını anlamak için teslim alma aşamasında şu adımları mutlaka uygulamalısınız:</p>
    <ul>
      <li><strong>Sayaç ve Kaçak Testi:</strong> Evdeki tüm muslukları, rezervuarları ve vanaları tamamen kapatın. Ardından daireye ait su sayacını gözlemleyin. Eğer hiçbir su kullanımı yokken sayaç dönmeye devam ediyorsa, duvar arkasında veya zemin altında gizli bir temiz su kaçağı var demektir.</li>
      <li><strong>Basınç ve Debi Kontrolü:</strong> Kombi/şofben bağlantılarını ve muslukları açarak suyun akış gücünü kontrol edin. Birden fazla musluğu aynı anda açtığınızda su basıncında aşırı bir düşüş yaşanıyorsa, boru çapları hatalı seçilmiş veya tesisatta tıkanıklık olabilir.</li>
      <li><strong>Batarya ve Bağlantı Noktaları:</strong> Lavabo ve evye altlarında bulunan taharet musluklarını, esnek hortumları (fleks) ve vana bağlantılarını elinizle kontrol edin. Parmaklarınıza ıslaklık geliyorsa bağlantı elemanlarının yenilenmesi gerekir.</li>
    </ul>
    
    <h3>Atık Su Giderleri ve Süzgeç Kontrolü</h3>
    <p>Kullanılan suyun sorunsuz bir şekilde binanın ana kanalizasyon hattına ulaşması gerekir. Atık su ve gider hatlarını test etmek için şu yöntemleri kullanabilirsiniz:</p>
    <p>Mutfak evyesi, banyo lavabosu, duş teknesi ve klozet giderlerine bir kova dolusu suyu hızlıca dökün. Su saniyeler içinde göllenmeden akıp gidiyorsa gider eğimi ve boru çapı doğrudur. Eğer su yavaş gidiyor veya geri tepiyorsa, inşaat esnasında boruların içine harç, alçı gibi yabancı maddeler kaçmış olabilir.</p>
    <p>Özellikle banyo zemininde yer alan süzgeçlerin çevresindeki derz dolgularını inceleyin. Zemine dökülen suyun banyo kapısına değil, doğrudan süzgece doğru akıp akmadığını (meyil kontrolü) gözlemleyin. Yanlış verilen zemin eğimleri banyoda sürekli su birikmesine neden olur.</p>
    
    <h3>Gizli Nem ve Rutubet Belirtilerine Dikkat Edin</h3>
    <p>Yeni bitmiş projelerde veya yeni boyanmış dairelerde tesisat kaçakları kendisini hemen göstermeyebilir. Bu durumlarda ipuçlarını takip etmek gerekir: Banyoya komşu olan odaların duvar diplerini, süpürgelikleri ve mutfak tezgahının arkasında kalan duvarları dikkatlice inceleyin. Boyada kabarma, dökülme, sarı lekeler veya küf kokusu, o bölgenin yakınından geçen bir boruda sızıntı olduğuna işaret eder.</p>
    
    <h3>Yeni Konut Alırken Mühendislik Standartlarının Önemi</h3>
    <p>Su tesisatında sonradan yaşanacak sorunların büyük kısmı, inşaat aşamasında kaliteli malzeme kullanılmamasından, boru kaynaklarının doğru ısıda yapılmamasından veya projeye uygun eğim verilmemesinden kaynaklanır. İzmir'in Çiğli, Küçük Çiğli ve Balatçık gibi yeni konut projeleriyle büyüyen bölgelerinde daire seçerken, yapının sadece görünen yüzeylerine değil; projenin arkasındaki mühendislik ve denetim kalitesine de odaklanmak gerekir.</p>
    
    <h3>Neli Mühendislik ile Altyapıda Sıfır Hata Yaklaşımı</h3>
    <p><strong>Neli Mühendislik</strong> olarak, İzmir Çiğli ve Balatçık bölgelerinde hayata geçirdiğimiz projelerde sadece estetik mimariye değil, binalarımızın görünmeyen altyapı kalitesine de maksimum özen gösteriyoruz. Projelerimizde kullanılan tüm temiz ve atık su boruları, armatürler ve yalıtım malzemeleri dünya standartlarında olup, teslim aşamasından önce yüksek basınç testlerine (test pompalama işlemleri) tabi tutulmaktadır.</p>
    
    <p>Bizim için mühendislik, konut sakinlerinin taşındıktan sonra hiçbir altyapı sürpriziyle karşılaşmaması demektir. Tesisatından yalıtımına kadar her detayı titizlikle denetlenmiş, güvenli ve uzun ömürlü projelerimizi incelemek, güncel konut seçeneklerimize göz atmak için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresimizi ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/su-tesisati.webp",
    coverImageAlt:
      "Yeni bir dairede banyo ve mutfak su tesisatı ile gider borularının kontrol edilmesi — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "su tesisatı kontrolü",
      "gider testi",
      "yeni daire alırken",
      "su kaçağı tespiti",
      "altyapı kontrolü",
      "konut muayenesi",
      "Neli Mühendislik",
      "izmir yeni konut",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Yeni Dairede Su Tesisatı ve Gider Kontrolü Nasıl Yapılır? | Neli",
    metaDescription:
      "Yeni dairede su tesisatı ve gider kontrolü nasıl yapılır? Ev alırken gizli su kaçakları, gider tıkanıklıkları ve banyo eğim testleri hakkında bilmeniz gerekenler.",
    metaKeywords:
      "yeni dairede su tesisatı ve gider kontrolü nasıl yapılır, daire su tesisatı testi, ev alırken su kaçağı kontrolü, gider tıkanıklığı nasıl anlaşılır, banyo süzgeç eğimi, tesisat kontrol rehberi, neli mühendislik",
    publishedAt: "2026-06-15",
  },
  {
    slug: "daire-yonu-ve-cephe-secimi-yasam-konforunu-nasil-etkiler",
    title: "Daire Yönü ve Cephe Seçimi Yaşam Konforunu Nasıl Etkiler?",
    excerpt:
      "Yeni bir ev ararken en çok duyduğunuz terimlerden biri de 'güney cephe'dir. Peki, bir dairenin hangi yöne baktığı neden bu kadar önemli? Yön ve cephe seçiminin ev içindeki sıcaklık, doğal ışık ve enerji faturası üzerindeki etkilerini, İzmir gibi sıcak iklime sahip şehirler için özel ipuçlarıyla öğrenin.",
    content: `<article>
    <h2>Ev Alırken Neden Yön ve Cepheye Dikkat Etmelisiniz?</h2>
    <p>Yeni bir konut satın alma veya kiralama sürecinde genellikle oda sayısı, metrekare ve fiyat gibi faktörlere odaklanırız. Ancak, evin yaşam konforunu ve uzun vadeli maliyetlerini belirleyen en kritik ve değiştirilemez özelliklerinden biri, hangi yöne baktığıdır. Sektörde sıkça kullanılan <strong>daire yönü</strong> ve <strong>cephe seçimi</strong> kavramları, bir evin ne kadar doğal ışık alacağını, kışın ne kadar ısınacağını ve yazın ne kadar serin kalacağını doğrudan belirler.</p>
    
    <p>Konut arayışındaki kullanıcıların arama motorlarında sıkça sorguladığı <em>'Hangi cephe daire daha iyi?'</em>, <em>'Güney cephe evin avantajları nelerdir?'</em> veya <em>'İzmir'de hangi yön tercih edilmeli?'</em> gibi sorular, doğru cephe seçiminin sadece bir tercih değil, yaşam kalitesi için bir zorunluluk olduğunu gösterir. Doğru yönlendirilmiş bir daire, hem fiziksel hem de psikolojik iyi oluşunuza katkıda bulunur.</p>
    
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Daire yönü, bir evin gün boyunca güneş ışığıyla olan ilişkisini belirler ve yaşam konforunu sıcaklık, doğal aydınlatma, enerji verimliliği ve hatta nem oranı üzerinden doğrudan etkiler. Türkiye gibi kuzey yarım kürede yer alan bir ülkede, <strong>güney cephe</strong> daireler kışın maksimum güneş ışığı ve ısı alarak enerji tasarrufu sağladığı ve aydınlık olduğu için genellikle en çok tercih edilen ve değerli cephedir. Kuzey cepheler ise daha serin ve loş olur, bu da onları çok sıcak iklimler için bir alternatif yapabilir.
    </blockquote>
    
    <h3>Farklı Yönlerin (Cephelerin) Özellikleri ve Konfora Etkileri</h3>
    <p>Her cephenin kendine özgü avantajları ve dezavantajları vardır ve seçim, kişisel yaşam tarzınıza ve bulunduğunuz şehrin iklimine göre değişmelidir. İşte Türkiye şartlarında ana yönlerin analizleri:</p>
    
    <h4>1. Güney Cephe: Klasik Tercih</h4>
    <p>Türkiye'de en çok talep gören ve genellikle en değerli olan cephedir. Güneşi en uzun süre ve en dik açıyla alan yöndür.</p>
    <ul>
      <li><strong>Konfor Etkisi:</strong> Kışın gün boyu doğal ısınma sağlar, bu da ısıtma faturalarını düşürür. Sürekli aydınlıktır, bu da psikolojik olarak daha huzurlu bir ortam yaratır.</li>
      <li><strong>Kimler İçin Uygun:</strong> Isınma maliyetlerini düşürmek isteyenler, evde çok vakit geçirenler ve aydınlık sevenler için idealdir.</li>
    </ul>
    
    <h4>2. Kuzey Cephe: Serin ve Stabil</h4>
    <p>Güneş ışığını en az alan yöndür. Genellikle daha loş ve serin olur.</p>
    <ul>
      <li><strong>Konfor Etkisi:</strong> Yazın kavurucu sıcaklarda doğal bir serinlik sağlar, bu da klima kullanımını azaltabilir. Işık gün boyunca stabildir. Ancak kışın ısınmak zordur ve nem sorunu yaşanabilir.</li>
      <li><strong>Kimler İçin Uygun:</strong> İzmir gibi çok sıcak bölgelerde yaşayanlar veya sabah erken evden çıkıp akşam dönenler için bir seçenek olabilir.</li>
    </ul>
    
    <h4>3. Doğu Cephe: Sabahın Enerjisi</h4>
    <p>Güneşin doğduğu yöndür. Sabahın erken saatlerinden öğleye kadar güneş alır.</p>
    <ul>
      <li><strong>Konfor Etkisi:</strong> Sabahları canlı ve aydınlık bir başlangıç sunar. Öğleden sonra ise serinlemeye başlar. Yazın sabah güneşiyle ısınmak keyifli olabilir, ancak kışın öğleden sonra soğuk olabilir.</li>
      <li><strong>Kimler İçin Uygun:</strong> Sabah insanları ve yatak odalarının aydınlık olmasını sevenler için harikadır.</li>
    </ul>
    
    <h4>4. Batı Cephe: Akşamın Sıcaklığı</h4>
    <p>Güneşin battığı yöndür. Öğleden sonra ve akşamüstü en yoğun güneşi alır.</p>
    <ul>
      <li><strong>Konfor Etkisi:</strong> Yazın öğleden sonra evin aşırı ısınmasına neden olabilir, bu da klima maliyetini artırır. Ancak kışın akşamüstü güneşinin sıcaklığı hoş olabilir.</li>
      <li><strong>Kimler İçin Uygun:</strong> Akşamları evde vakit geçirenler ve kışın daha fazla ısı arayanlar için bir seçenek olabilir.</li>
    </ul>
    
    <h3>Cephe Seçiminde Diğer Önemli Faktörler</h3>
    <p>Sadece yönlendirme değil, cephenin kalitesini etkileyen diğer unsurlar da vardır:</p>
    <ul>
      <li><strong>Manzara ve Açıklık:</strong> Bir cephe güney olsa bile, önünde başka bir bina varsa ışık alımı engellenir. Açık cephe, manzaralı cephe her zaman daha ferah bir his verir.</li>
      <li><strong>Kat Yüksekliği:</strong> Üst katlar daha fazla güneş alır ve daha az gölgelenir. Giriş katları genellikle daha az ışık alır ve daha serindir.</li>
      <li><strong>Bina Yalıtımı:</strong> İyi bir yalıtım, yanlış cephenin olumsuz etkilerini (Kuzeyin soğuğu veya Batının aşırı sıcaklığı) hafifletebilir.</li>
    </ul>
    
    <h3>İzmir’de Yön ve Cephe Seçiminin Önemi</h3>
    <p>İzmir, Akdeniz iklimine sahip, yazları sıcak ve kurak, kışları ılıman geçen bir şehirdir. Bu iklim yapısı, cephe seçimini diğer bölgelere göre daha kritik hale getirir. İzmir Çiğli, Küçük Çiğli ve Balatçık gibi gelişen bölgelerde yeni konut projelerini değerlendirirken, sadece güney cepheye odaklanmak her zaman doğru olmayabilir.</p>
    <p>İzmir'de daire seçerken dikkat edilmesi gerekenler:</p>
    <ul>
      <li><strong>Yaz Sıcakları ile Mücadele:</strong> İzmir'de yazın aşırı ısınmayı önlemek için, batı cepheler veya tam güney cepheler yerine, sabah güneşi alan doğu cepheler veya serin kuzey cepheler daha konforlu olabilir.</li>
      <li><strong>Rüzgar Faktörü:</strong> İzmir'de denizden esen serinletici imbat rüzgarı, yaz konforu için çok değerlidir. Bu rüzgarı alan cepheler (genellikle batı ve kuzeybatı) klima ihtiyacını azaltabilir.</li>
      <li><strong>Proje Tasarımı:</strong> Neli Mühendislik gibi kaliteli inşaat firmaları, İzmir'in iklimini dikkate alarak projelerinde gölgeleme elemanları, balkon tasarımları ve yüksek yalıtım standartları kullanarak her cephede konforu maksimize etmeyi amaçlar.</li>
    </ul>
    
    <h3>Neli Mühendislik ile Konfor Odaklı Mühendislik Yaklaşımı</h3>
    <p><strong>Neli Mühendislik</strong> olarak, İzmir Çiğli ve Balatçık çevresindeki projelerimizde, mühendislik kalitesini sadece yapının sağlamlığıyla değil, yaşam konforuyla da bütünleştiriyoruz. Biliyoruz ki, bir evin yönü ve cephesi, sadece güneş açısı değil, sizin huzurunuzdur.</p>
    <p>Projelerimizi tasarlarken; güneş analizi yaparak dairelerin ışık alma sürelerini optimize ediyor, rüzgar yönlerini dikkate alarak doğal havalandırmayı önemsiyoruz. Neli Mühendislik projelerinde, her detayıyla konforunuzun düşünüldüğü, iklime duyarlı ve enerji verimli konutlar bulabilirsiniz. İzmir'deki güncel projelerimizi incelemek ve cephe seçeneklerini değerlendirmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/daire-yonu.webp",
    coverImageAlt:
      "Daire yönü ve cephe seçiminin konfor üzerindeki etkisini gösteren güneş yolları ve insan konfor ikonları — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "daire yönü",
      "cephe seçimi",
      "konut konforu",
      "güney cephe",
      "kuzey cephe",
      "ev alırken cephe",
      "Neli Mühendislik",
      "izmir satılık daire",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Daire Yönü ve Cephe Seçimi Yaşam Konforunu Nasıl Etkiler? | Neli",
    metaDescription:
      "Daire yönü ve cephe seçimi yaşam konforunu nasıl etkiler? Güney cephe avantajları, kuzey cephe dezavantajları, İzmir'de cephe seçimi ve enerji tasarrufu ipuçları.",
    metaKeywords:
      "daire yönü ve cephe seçimi yaşam konforunu nasıl etkiler, daire cephe seçimi, güney cephe avantajları, kuzey cephe konforu, batı cephe ısınma, doğu cephe sabah güneşi, daire yönü enerji tasarrufu, neli mühendislik",
    publishedAt: "2026-06-15",
  },
  {
    slug: "apartmanlarda-otopark-hakki-nasil-belirlenir",
    title:
      "Apartmanlarda Otopark Hakkı Nasıl Belirlenir: Hukuki ve Pratik Rehber",
    excerpt:
      "Büyükşehirlerde gayrimenkul yatırımı yaparken en çok karşılaşılan krizlerden biri otopark sorunudur. Apartman ve sitelerde otopark hakkının hukuki olarak nasıl belirlendiğini ve yasal sınırlarını net bir şekilde öğrenin.",
    content: `<article>
    <h2>Apartman ve Sitelerde Otopark Paylaşımı ve Yasal Çerçeve</h2>
    <p>Şehir merkezlerinde gayrimenkul yatırımı yaparken veya yeni bir konuta taşınırken karşılaşılan en net sorunlardan biri otopark kapasitesi ve paylaşımıdır. Dijital platformlarda sıklıkla aratılan <em>'Apartmanlarda otopark kime aittir?'</em> veya <em>'Tapuda otopark hakkı yazar mı?'</em> soruları, mülk sahiplerinin bu konudaki belirsizlikleri giderme ihtiyacından doğar. Bir projede otopark alanlarının kullanımı rastgele yapılmaz; tamamen Kat Mülkiyeti Kanunu'na ve binanın resmi mimari temellerine dayanır.</p>
  
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Apartman ve sitelerde otopark hakkı, öncelikle ilgili belediyeye sunulan <strong>Mimari Proje</strong> ve tapu siciline kaydedilen <strong>Yönetim Planı</strong> ile belirlenir. Eğer mimari projede veya yönetim planında bağımsız bölümlere (dairelere) özel numaralandırılmış bir otopark tahsisi yapılmamışsa, otopark ortak alan sayılır ve her kat maliki tapusundaki <strong>arsa payı oranında</strong> otoparkı kullanım hakkına sahip olur.
    </blockquote>
  
    <h3>Otopark Hakkını Belirleyen Temel Unsurlar</h3>
    <p>Yatırımınızı yaparken otopark kullanım hakkınızı garanti altına almak ve ileride komşularla yaşanabilecek anlaşmazlıkların önüne geçmek için şu hukuki belgelere dikkat edilmelidir:</p>
    <ul>
      <li><strong>Tapu Yönetim Planı:</strong> Tapu sicilinde yer alan yönetim planı, ortak alanların anayasasıdır. Otoparkın kullanım şekli ve kuralları burada yazar. Yönetim planında aksi bir karar yoksa, Kat Mülkiyeti Kanunu'nun genel hükümleri uygulanır.</li>
      <li><strong>Arsa Payı Esası:</strong> Projede net bir tahsis yapılmamış ortak otopark alanlarında, hiçbir kat maliki otoparkı tek başına sahiplenemez. Kullanım hakkı arsa payı oranına göre adil şekilde paylaştırılır.</li>
    </ul>
  
    <h3>Neli Mühendislik Projelerinde Net ve Sorunsuz Otopark Çözümleri</h3>
    <p><strong>Neli Mühendislik</strong> olarak, ürettiğimiz her konutta hukuki altyapıyı baştan sağlam kuruyor; sorun üreten değil, çözüm sunan yaşam alanları inşa ediyoruz. Çiğli ve Karşıyaka bölgelerinde yükselen Valorya ile Serenità serisi projelerimizde, gelecekte komşular arası kriz yaratabilecek otopark paylaşımı gibi detayları projelendirme aşamasında netleştiriyoruz.</p>
    <p>Otopark kapasitelerini sadece yönetmelik sınırlarında bırakmıyor, bağımsız bölümlerin gerçek ihtiyaçlarını karşılayacak genişlikte ve düzende tasarlıyoruz. Mühendislik zekasıyla planlanmış, hukuki sınırları net çizilmiş, güvenilir ve şeffaf projelerimizi yerinde incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresini ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/otopark-hakki.webp",
    coverImageAlt:
      "Apartman ve sitelerde otopark hakkı ve yasal düzenlemeler — Neli Mühendislik",
    category: "Rehber ve Yatırım",
    tags: JSON.stringify([
      "otopark hakkı",
      "kat mülkiyeti kanunu",
      "mimari proje",
      "yönetim planı",
      "gayrimenkul hukuku",
      "Neli Mühendislik",
      "İzmir konut projeleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Apartmanlarda Otopark Hakkı Nasıl Belirlenir? | Neli Mühendislik",
    metaDescription:
      "Apartman ve sitelerde otopark hakkının hukuki olarak nasıl belirlendiğini, mimari proje ve arsa payı oranlarının önemini anlatan yatırımcı rehberi.",
    metaKeywords:
      "otopark hakkı, apartman otopark yasası, kat mülkiyeti kanunu otopark, arsa payı otopark, yönetim planı, neli mühendislik, gayrimenkul rehberi",
    publishedAt: "2026-06-16",
  },
  {
    slug: "yeni-nesil-binalarda-tasiyici-sistem-guvenligini-artiran-muhendislik-detaylari",
    title:
      "Yeni Nesil Binalarda Taşıyıcı Sistem Güvenliğini Artıran Mühendislik Detayları",
    excerpt:
      "Bir yapının estetiği kadar görünmeyen taşıyıcı sistemi de hayati önem taşır. Deprem güvenliğini en üst seviyeye çıkaran yeni nesil mühendislik detaylarını ve C45 yüksek mukavemetli betonun rolünü keşfedin.",
    content: `<article>
      <h2>Modern Mimaride Görünmeyen Güvenlik: Taşıyıcı Sistemler</h2>
      <p>Bir konut projesini incelerken dış cephe tasarımı, iç mekan genişliği veya kullanılan mutfak dolapları ilk bakışta dikkat çeken unsurlardır. Ancak bir yapının asıl kalitesi ve ömrü, duvarların ardında ve zeminin altında gizlidir. Yeni nesil binalarda yaşam alanlarının güvenliğini belirleyen en temel unsur, doğru planlanmış ve uygulanmış taşıyıcı sistemlerdir.</p>
      
      <p>Deprem kuşağında yer alan bölgelerde konut alıcılarının zihninde yer eden <em>'Binalarda deprem güvenliği nasıl sağlanır?'</em>, <em>'Radye temel nedir?'</em> veya <em>'Yüksek dayanımlı betonun önemi nedir?'</em> gibi sorular, doğrudan doğru mühendislik çözümleriyle yanıt bulur. Güvenli bir yapı, sadece yönetmeliklere uymakla kalmayıp, malzeme kalitesinden işçilik hassasiyetine kadar her aşamada en üst standartları hedefleyen bir mühendislik vizyonu gerektirir.</p>
      
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni nesil binalarda taşıyıcı sistem güvenliği; zemin yapısına tam uyumlu radye jeneral temel sistemlerinin seçilmesi, C45 gibi yüksek mukavemetli beton sınıflarının kullanılması ve güçlü kolon-kiriş birleşim noktalarının inşa edilmesiyle artırılır. Doğru mühendislik yaklaşımı, yapının esnekliğini ve dayanımını optimize ederek deprem yüklerini güvenli bir şekilde zemine aktarmasını sağlar.
      </blockquote>
      
      <h3>C45 Yüksek Mukavemetli Beton ve Yapı Ömrü</h3>
      <p>Taşıyıcı sistemlerin omurgasını beton ve çelik oluşturur. Geleneksel projelerde standart beton sınıfları tercih edilirken, yeni nesil güvenli yapılarda C45 yüksek mukavemetli beton kullanımı kritik bir fark yaratır:</p>
      <ul>
        <li><strong>Yüksek Basınç Dayanımı:</strong> C45 beton, santimetrekare başına 450 kilogramlık bir basınca dayanabilir. Bu yüksek dayanım, özellikle zemin katlarda ve taşıyıcı kolonlarda deprem anında oluşabilecek dikey ve yatay yükleri minimum deformasyonla karşılar.</li>
        <li><strong>Korozyon Direnci ve Uzun Ömür:</strong> Yoğun yapısı sayesinde dış etkenlere ve neme karşı yüksek direnç gösterir. Bu durum, betonun içindeki çelik donatının paslanmasını engeller ve yapının ömrünü onlarca yıl uzatır.</li>
      </ul>
      
      <h3>Doğru Temel Mühendisliği ve Zemin İlişkisi</h3>
      <p>En güçlü taşıyıcı sistem bile doğru bir temel üzerine inşa edilmediği sürece işlevini tam olarak yerine getiremez. Özellikle alüvyonel zemin yapısına sahip bölgelerde, yapı yükünü geniş bir alana yayarak yer hareketlerine karşı tek bir blok halinde hareket eden radye temel sistemleri zorunludur. Doğru zemin etüdü verileriyle tasarlanan derin temeller, binanın zeminle olan bağını maksimum seviyeye çıkarır.</p>
      <p>Kolon ve kirişlerin birleştiği düğüm noktalarındaki demir donatı işçiliği, sistemin esnekliğini belirler. Deprem dalgalarının yarattığı enerjiyi sönümleyebilmek için sıkılaştırılmış sargı donatıları ve milimetrik projelendirme esastır. Bu aşamada yapılan en küçük bir işçilik hatası bile statik sistemin zayıflamasına neden olabilir.</p>
      
      <h3>Geleceğe Yatırım Yaparken Mühendislik Standartlarını Sorgulayın</h3>
      <p>İzmir'in Çiğli, Karşıyaka ve Balatçık gibi hızla gelişen ve modern konut projelerine ev sahipliği yapan bölgelerinde gayrimenkul yatırımı yaparken, sadece lokasyona veya daire içi lükse odaklanmak yeterli değildir. Gerçek lüks ve konfor, ailenizle içinde güvenle uyuyabileceğiniz sağlam bir altyapıyla başlar. Bu nedenle, konut satın almadan önce projelerin statik çözümleri ve malzeme kalitesi mutlaka sorgulanmalıdır.</p>
      
      <h3>Neli Mühendislik ile Güvenli Gelecek</h3>
      <p><strong>Neli Mühendislik</strong> olarak, imzamızı attığımız her projede yapı güvenliğini en üst seviyede tutuyoruz. İzmir Çiğli ve çevresindeki projelerimizde, standartların ötesine geçerek C45 yüksek mukavemetli beton uyguluyor, statik hesaplamalardan şantiyedeki demir bağlama işçiliğine kadar her adımı titizlikle denetliyoruz.</p>
      
      <p>Bizim için mühendislik, estetik ile sarsılmaz bir güvenliği aynı yapıda buluşturmaktır. Detaylı teknik standartlarla inşa ettiğimiz ve geleceğe güvenli birer yatırım olarak sunduğumuz güncel projelerimizi incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfamızı ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/tasiyici-sistem.webp",
    coverImageAlt:
      "Yeni nesil binalarda taşıyıcı sistem, demir donatı ve C45 beton uygulaması — Neli Mühendislik",
    category: "Mühendislik ve Yapı Güvenliği",
    tags: JSON.stringify([
      "taşıyıcı sistem güvenliği",
      "C45 beton",
      "deprem güvenliği",
      "radye temel",
      "yüksek mukavemetli beton",
      "statik proje",
      "Neli Mühendislik",
      "izmir güvenli konut",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Yeni Nesil Binalarda Taşıyıcı Sistem Güvenliği | Neli Mühendislik",
    metaDescription:
      "Yeni nesil binalarda taşıyıcı sistem güvenliğini artıran teknik detaylar nelerdir? C45 yüksek mukavemetli betonun ve radye temelin deprem dayanımına etkisi.",
    metaKeywords:
      "yeni nesil binalarda taşıyıcı sistem güvenliğini artıran mühendislik detayları, C45 beton dayanımı, radye temel nedir, binalarda deprem güvenliği, statik hesaplama, yapı güvenliği kriterleri, neli mühendislik",
    publishedAt: "2026-06-25",
  },
  {
    slug: "izmir-cigli-ve-karsiyaka-zemin-yapisina-uygun-temel-sistemleri",
    title: "İzmir Çiğli ve Karşıyaka Zemin Yapısına Uygun Temel Sistemleri",
    excerpt:
      "Deprem kuşağında yer alan İzmir Çiğli ve Karşıyaka bölgelerinde güvenli bir yapı inşa etmenin ilk şartı doğru temel seçimidir. Bölgenin zemin özelliklerini ve en uygun mühendislik çözümlerini inceleyin.",
    content: `<article>
      <h2>Kuzey İzmir’in Zemin Profili ve Yapı Güvenliği İlişkisi</h2>
      <p>Bir yapının deprem altındaki davranışı, sadece üst yapının sağlamlığına değil, yapının oturduğu zemin ile temelin kurduğu bağa doğrudan bağlıdır. İzmir'in özellikle Çiğli, Karşıyaka ve Balatçık gibi düzlük alanlarında yer alan yapı stoklarında ve yeni projelerde zemin yapısının doğru analiz edilmesi, mühendislik süreçlerinin en kritik aşamasıdır.</p>
      
      <p>Bu bölgelerde konut arayışında olan veya yatırım planlayan kişilerin arama motorlarında sıkça araştırdığı <em>'Çiğli zemin yapısı sağlam mı?'</em>, <em>'Alüvyon zeminde hangi temel kullanılır?'</em> veya <em>'Zemin iyileştirme nedir?'</em> gibi sorular, binaların güvenliğiyle doğrudan ilgilidir. Sektördeki mühendislik vizyonu, zemin özelliklerini bir dezavantaj olmaktan çıkarıp, doğru temel ve iyileştirme yöntemleriyle sarsılmaz birer güvenli yaşam alanına dönüştürmeyi gerektirir.</p>
      
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> İzmir Çiğli ve Karşıyaka gibi alüvyonal zemin yapısına ve yüksek yeraltı su seviyesine sahip bölgelerde en güvenli temel sistemi, bina yükünü geniş bir alana eşit yayan radye jeneral temeldir. Zemin taşıma kapasitesinin düşük olduğu parsellerde ise radye temel öncesinde jet grouting veya fore kazık yöntemleriyle zemin iyileştirmesi yapılması mühendislik açısından zorunludur.
      </blockquote>
      
      <h3>Çiğli ve Karşıyaka Bölgelerinde Zemin Özellikleri</h3>
      <p>Mühendislik literatüründe alüvyonal zeminler olarak adlandırılan Çiğli ve Karşıyaka kıyı şeritleri ile ovaları, gevşek sıkılıktaki kum, kil ve silt tabakalarından oluşur. Bu tür zeminlerin iki temel özelliği bulunur:</p>
      <ul>
        <li><strong>Yüksek Yeraltı Su Seviyesi:</strong> Yüzeye yakın konumdaki yeraltı suyu, deprem dalgalarının geçişi sırasında zemin sıvılaşması riskini doğurabilir. Bu risk, doğru mühendislik önlemleriyle tamamen bertaraf edilmelidir.</li>
        <li><strong>Düşük Taşıma Kapasitesi:</strong> Gevşek tabakalar, üzerlerine binen bina yükü altında oturma eğilimi gösterir. Bu durum, binanın altına yapılacak mühendislik müdahalesinin önemini artırır.</li>
      </ul>
      
      <h3>Güvenliğin Temeli: Zemin İyileştirme ve Radye Temel</h3>
      <p>Bahsedilen zemin özelliklerine sahip bölgelerde doğrudan geleneksel tekil veya sürekli temel sistemlerinin kullanılması yapı güvenliği açısından uygun değildir. Modern mühendislik standartları gereği iki aşamalı bir çözüm uygulanır:</p>
      <p><strong>1. Zemin İyileştirme (Jet Grouting ve Fore Kazık):</strong> Temel kazısı öncesinde, zeminin derinliklerine yüksek basınçla çimento şerbeti püskürtülerek (Jet Grouting) veya belirli çaplarda betonarme kazıklar çakılarak (Fore Kazık) zemin altındaki gevşek tabakalar sertleştirilir. Bu işlem, zeminin taşıma kapasitesini artırır ve sıvılaşma riskini sıfıra indirir.</p>
      <p><strong>2. Radye Jeneral Temel:</strong> İyileştirilmiş zemin üzerine inşa edilen radye temel, binanın tüm yükünü tek bir büyük plaka halinde zemine yayar. Bu sayede deprem anında bina zeminle birlikte homojen bir şekilde hareket eder ve bölgesel kırılma veya yan yatmaların önüne geçilir.</p>
      
      <h3>Doğru Malzeme Seçimi: C45 Beton Teknolojisi</h3>
      <p>Zemin altındaki yüksek nem ve su seviyesi, temel içindeki demir donatının zamanla paslanmasına (korozyon) neden olabilir. Yeni nesil güvenli yapılarda bu durumun önüne geçmek için su geçirimsizliği yüksek ve yoğun dokulu beton sınıfları tercih edilmelidir. C45 yüksek mukavemetli beton kullanımı, hem temelin mekanik direncini maksimuma çıkarır hem de kimyasal yapısıyla donatıyı dış etkilerden koruyarak binanın ömrünü güvence altına alır.</p>
      
      <h3>Neli Mühendislik ile Altyapı Güvencesi</h3>
      <p><strong>Neli Mühendislik</strong> olarak, İzmir Çiğli, Karşıyaka ve Balatçık bölgelerinde hayata geçirdiğimiz tüm projelerde zemin etüdü verilerini en ince detayına kadar analiz ediyoruz. Parselin ihtiyacına göre jet grouting ve fore kazık gibi zemin iyileştirme yöntemlerini eksiksiz uyguluyor, temellerimizde C45 yüksek mukavemetli beton kullanarak yapı güvenliğini şansa bırakmıyoruz.</p>
      
      <p>Geleceğe güvenle bakmanızı sağlayan, her aşaması yüksek mühendislik standartlarıyla denetlenmiş konut projelerimizi incelemek ve güncel portföyümüze göz atmak için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfamızı ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/zemin-ve-temel.webp",
    coverImageAlt:
      "İzmir Çiğli ve Karşıyaka bölgelerinde zemin yapısına uygun radye temel ve zemin iyileştirme çalışmaları — Neli Mühendislik",
    category: "Mühendislik ve Yapı Güvenliği",
    tags: JSON.stringify([
      "zemin yapısı",
      "temel sistemleri",
      "radye temel",
      "izmir zemin etüdü",
      "çiğli konut projeleri",
      "karşıyaka inşaat",
      "zemin iyileştirme",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "İzmir Çiğli ve Karşıyaka Zemin Yapısına Uygun Temel Sistemleri",
    metaDescription:
      "İzmir Çiğli ve Karşıyaka zemin yapısına uygun temel sistemleri nelerdir? Alüvyonal zeminlerde deprem güvenliği için radye temel ve zemin iyileştirme yöntemleri.",
    metaKeywords:
      "izmir çiğli ve karşıyaka zemin yapısına uygun temel sistemleri, çiğli zemin yapısı, karşıyaka radye temel, zemin iyileştirme yöntemleri, fore kazık nedir, jet grouting uygulaması, neli mühendislik",
    publishedAt: "2026-06-26",
  },
  {
    slug: "luks-konut-insaatinda-sakul-ve-gonye-hatalarini-sifira-indiren-teknolojiler",
    title:
      "Lüks Konut İnşaatında Şakul ve Gönye Hatalarını Sıfıra İndiren Teknolojiler",
    excerpt:
      "Bir konutun gerçek kalitesi ince işçiliğindeki milimetrik hassasiyette gizlidir. Lazer hizalama teknolojileriyle duvar, zemin ve kaplama imalatlarında şakul ve gönye hatalarının nasıl sıfıra indirildiğini inceleyin.",
    content: `<article>
      <h2>İnce İşçilikte Kalitenin Temeli: Milimetrik Hassasiyet</h2>
      <p>Kaba inşaatı tamamlanmış bir yapının gerçek bir yaşam alanına dönüşmesi, ince işçilik aşamasında başlar. Duvarların örülmesi, sıva yapılması, zemin şapının atılması ve seramiklerin döşenmesi gibi adımlar, dairenin nihai estetiğini ve kullanım konforunu belirler. Ancak bu aşamalarda yapılan en ufak ölçüm hataları; tam kapanmayan kapılar, duvara tam oturmayan dolaplar veya eğri görünen fayans derzleri olarak karşımıza çıkar.</p>
      
      <p>Sektörde sıklıkla karşılaşılan <em>'Duvar neden yamuk duruyor?'</em> veya <em>'Seramiklerin arası neden eşit değil?'</em> gibi müşteri şikayetlerinin temelinde, geleneksel ölçüm yöntemlerinin (su terazisi, çekül, ip çekme) barındırdığı hata payları yatar. Lüks ve nitelikli konut inşaatında bu hata paylarına yer yoktur. Kalite, göz kararı ile değil, net mühendislik verileri ve ileri teknoloji ile sağlanır.</p>
      
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Lüks konut inşaatında şakul (düşey doğruluk) ve gönye (dik açı) hatalarını sıfıra indirmek için 3 boyutlu lazer nivo cihazları ve lazer hizalama sistemleri kullanılır. Bu teknolojiler; sıva, şap, seramik ve mobilya montajı aşamalarında milimetrik referans çizgileri oluşturarak insan kaynaklı ölçüm hatalarını tamamen ortadan kaldırır ve kusursuz yüzeyler elde edilmesini sağlar.
      </blockquote>
      
      <h3>Geleneksel Yöntemlerin Eksiklikleri ve Lazer Teknolojisi</h3>
      <p>İnşaat terminolojisinde <strong>şakul</strong>, bir duvarın veya kolonun yere tam dik (90 derece) olup olmadığını; <strong>gönye</strong> ise iki duvarın birleştiği köşenin tam dik açıya sahip olup olmadığını ifade eder. Geleneksel el aletleri ile yapılan ölçümlerde, ustanın bakış açısı veya aletin kalibrasyon bozukluğu nedeniyle santimetreyi bulan sapmalar yaşanabilir.</p>
      
      <p>Günümüzde mühendislik standartlarını yakalamak için üretim sürecinin merkezine lazer teknolojisi entegre edilmelidir:</p>
      <ul>
        <li><strong>Lazerli Sıva ve Şap Uygulaması:</strong> Duvar yüzeylerine sıva yapılmadan veya zemine şap dökülmeden önce, mekana kurulan lazer cihazları x, y ve z eksenlerinde kesintisiz referans çizgileri yansıtır. Bu sayede yüzeydeki dalgalanmalar tamamen giderilir.</li>
        <li><strong>Kusursuz Seramik ve Kaplama İşçiliği:</strong> Banyo ve mutfaklarda seramik döşenirken lazer terazi kullanılması, derz çizgilerinin baştan sona ip gibi dümdüz ilerlemesini sağlar. Eğim verilmesi gereken ıslak hacimlerde ise suyun süzgece doğru kusursuz akışı milimetrik olarak hesaplanır.</li>
        <li><strong>Mobilya ve Doğrama Montajında Sorunsuzluk:</strong> Gönyesi tam olan (köşeleri net 90 derece) odalarda, mutfak dolapları, süpürgelikler ve iç kapılar boşluk kalmaksızın yerine oturur. Silikon veya dolgu malzemesi ile hata kapatma ihtiyacı ortadan kalkar.</li>
      </ul>
      
      <h3>Görsel Algı Değil, Matematiksel Doğruluk</h3>
      <p>Bir yapının duvar doğrultuları (hizaları) belirlenirken herkesin anlayamayacağı karmaşık terimlerin arkasına sığınmak yerine, ortaya çıkan işin kusursuzluğuna odaklanmak gerekir. Duvarın yere tam dik basması ve zemin eğiminin sıfır hata ile dökülmesi, o yapının arkasındaki disiplinli şantiye yönetiminin en net göstergesidir.</p>
      
      <h3>Neli Mühendislik ile Hatasız Üretim Standartları</h3>
      <p><strong>Neli Mühendislik</strong> olarak, İzmir'in Çiğli ve Karşıyaka ilçelerindeki projelerimizde kaba inşaattaki sağlamlığı (C45 beton ve ileri temel sistemleri), ince işçilikteki kusursuzlukla tamamlıyoruz. Şantiyelerimizde tüm ölçüm, hizalama ve imalat süreçlerini lazer güdümlü sistemlerle gerçekleştiriyor, insan kaynaklı hata payını üretim sürecinden çıkarıyoruz.</p>
      
      <p>Tamamen mühendislik disipliniyle yönetilen, "göz kararı" değil "milimetrik doğruluk" prensibiyle inşa edilmiş yaşam alanlarımızı keşfetmek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresindeki projelerimizi inceleyebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/lazer-hizalama.webp",
    coverImageAlt:
      "İnşaatta lazer nivo ile şakul, gönye ölçümü ve kusursuz seramik döşeme işçiliği — Neli Mühendislik",
    category: "İnşaat Teknolojileri ve İşçilik",
    tags: JSON.stringify([
      "lazer terazi",
      "şakul ve gönye",
      "kusursuz işçilik",
      "lazerli sıva",
      "inşaat kalitesi",
      "ince işçilik",
      "Neli Mühendislik",
      "izmir nitelikli konut",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Lüks Konutta Şakul ve Gönye Hatalarını Önleyen Teknolojiler",
    metaDescription:
      "İnşaatta şakul ve gönye nedir? Lazer terazi sistemleriyle sıva, şap ve seramik işçiliğinde hataları sıfıra indiren yeni nesil inşaat teknolojileri.",
    metaKeywords:
      "lüks konut inşaatında şakul ve gönye hatalarını sıfıra indiren teknolojiler, inşaatta lazer terazi kullanımı, şakul nedir, gönye nedir, lazerli sıva ve şap, hatasız seramik işçiliği, neli mühendislik",
    publishedAt: "2026-06-27",
  },
  {
    slug: "insaat-kalitesini-belirleyen-gorunmeyen-detaylar-temel-izolasyon-yontemleri",
    title:
      "İnşaat Kalitesini Belirleyen Görünmeyen Detaylar: Temel İzolasyon Yöntemleri",
    excerpt:
      "Bir yapının uzun ömürlü ve sağlıklı olması, temellerinin korunmasına bağlıdır. Binanızın sağlığını belirleyen, ancak genellikle görünmeyen temel izolasyon yöntemlerini keşfedin.",
    content: `<article>
      <h2>Binanın Sağlığı Temelden Başlar: Temel İzolasyonun Önemi</h2>
      <p>Bir konut projesinde estetik detaylar, mutfak tezgahları veya boya renkleri ilk bakışta dikkat çeker. Ancak bir yapının gerçek kalitesi, uzun ömürlülüğü ve sağlığı, duvarların ve fayansların arkasında, genellikle gözden uzak olan detaylarda gizlidir. Bu detayların en kritiği, yapının temelini dış etkilerden koruyan izolasyon sistemleridir.</p>
      
      <p>Konut alıcılarının veya inşaat profesyonellerinin arama motorlarında sıkça sorguladığı <em>'Temel su yalıtımı nasıl yapılır?'</em>, <em>'Binada nem neden olur?'</em> veya <em>'Temel ısı yalıtımı gerekli mi?'</em> gibi konular, yapının sağlığını doğrudan etkiler. Temelde oluşabilecek su sızıntıları, nem, küf ve korozyon, taşıyıcı sistemin zayıflamasına og uzun vadede ciddi güvenlik sorunlarına yol açabilir.</p>
      
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> İnşaat kalitesini belirleyen en önemli görünmeyen detay, temel izolasyonudur. Temel izolasyonu, su yalıtımı (membran veya likit sistemler) ve ısı yalıtımı (XPS/EPS levhalar) uygulamalarını içerir. Bu uygulamalar, betonarme temeli yeraltı suyu, nem ve korozyondan korurken, binanın enerji verimliliğini artırır ve sağlıklı bir yaşam ortamı sağlar. Drenaj sistemiyle desteklenen doğru izolasyon, binanın temel taşıdır.
      </blockquote>
      
      <h3>Su İzolasyonu: Betonarme Temelin Koruması</h3>
      <p>Temel betonarme sisteminin su ve nemle temasını kesmek, korozyonu önlemek ve yapının taşıma kapasitesini korumak için su yalıtımı hayati önem taşır. Sıklıkla kullanılan yöntemler şunlardır:</p>
      <ul>
        <li><strong>Membran Sistemleri:</strong> Bitüm esaslı veya sentetik (PVC, TPO) membranlar, temel tabanına og perdelerine uygulanarak suyun betonla temasını engeller. Çift katmanlı uygulamalar daha yüksek güvenlik sağlar.</li>
        <li><strong>Likit Membranlar:</strong> Sürülebilir veya püskürtülebilir likit yalıtım malzemeleri, zor detaylarda og girintili çıkıntılı yüzeylerde eksiksiz bir koruma sağlar. Ek yerinin olmaması bir avantajdır.</li>
        <li><strong>Kristalize Su Yalıtımı:</strong> Betona karıştırılarak veya sonradan uygulanarak, beton içindeki gözenekleri dolduran kristaller oluşturur og betonu su geçirmez hale getirir. Hem içten hem dıştan uygulanabilir.</li>
      </ul>
      
      <h3>Isı İzolasyonu: Enerji Verimliliği og Konfor</h3>
      <p>Temel perdelerine og tabanına uygulanan ısı yalıtımı, binanın enerji verimliliğini artırır og zemin kattaki dairelerin konforunu sağlar:</p>
      <ul>
        <li><strong>Yüksek Mukavemetli Levhalar:</strong> Extrüde Polistiren (XPS) veya Ekspande Polistiren (EPS) levhalar, temel üzerine yerleştirilerek ısı kaybını önler. Yüksek taşıma kapasitesi nedeniyle genellikle XPS tercih edilir.</li>
        <li><strong>Uygulama Alanları:</strong> Temel pabuçları üzerine, temel perdelerinin dışına og hatta bazı projelerde temel taban altına uygulanabilir. Doğru detaylandırma, ısı köprülerini ortadan kaldırır.</li>
      </ul>
      
      <h3>Drenaj Sistemi: Suyun Yönetimi</h3>
      <p>Su og ısı izolasyonunu tamamlayan en önemli unsurlardan biri, temel çevresindeki drenaj sistemidir. Drenaj, yeraltı suyunu og yüzey sularını binadan uzaklaştırarak izolasyon sistemine binen yükü azaltır. Genellikle drenaj boruları, filtre tabakası og suyun toplanıp tahliye edildiği bir sistemden oluşur.</p>
      
      <h3>Sonuç og Mühendislik Standartları</h3>
      <p>Temel izolasyonu, bir yapının görünmeyen ancak kalitesini, ömrünü og sağlığını belirleyen en kritik mühendislik uygulamalarından biridir. Kaliteli malzeme kullanımı, doğru uygulama yöntemleri og mühendislik denetimi, bu izolasyonun başarısını garanti eder. İzmir'in Çiğli og Karşıyaka gibi bölgelerinde, alüvyonal zemin yapısı og yüksek yeraltı su seviyesi nedeniyle temel izolasyonuna ekstra özen gösterilmelidir.</p>
      
      <h3>Neli Mühendislik ile Altyapı Güvencesi</h3>
      <p><strong>Neli Mühendislik</strong> olarak, İzmir Çiğli og Karşıyaka bölgelerinde hayata geçirdiğimiz projelerde temel izolasyonuna maksimum önem veriyoruz. Projelerimizde dünya standartlarında su og ısı yalıtım malzemeleri kullanıyor, her aşamada titizlikle denetliyoruz. Bizim için mühendislik, binanın sadece görünen yüzeyini değil, görünmeyen altyapı kalitesini de güvence altına almaktır.</p>
      
      <p>Geleceğe güvenli og uzun ömürlü bir yatırım yapmak için temel izolasyonundan taşıyıcı sistemine kadar her detayı titizlikle planlanmış projelerimizi inceleyebilir, güncel konut seçeneklerimize göz atmak için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresimizi ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/temel-izolasyon.webp",
    coverImageAlt:
      "İnşaatta temel su og ısı izolasyon uygulaması — Neli Mühendislik",
    category: "Mühendislik Standartları",
    tags: JSON.stringify([
      "temel izolasyonu",
      "su yalıtımı",
      "ısı yalıtımı",
      "drenaj sistemleri",
      "inşaat kalitesi",
      "yapı ömrü",
      "Neli Mühendislik",
      "mühendislik çözümleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "İnşaat Kalitesini Belirleyen Temel İzolasyon Yöntemleri | Neli Mühendislik",
    metaDescription:
      "İnşaat kalitesini belirleyen görünmeyen detaylar: Temel izolasyon yöntemleri. Binanızın sağlığını etkileyen su og ısı yalıtımı uygulamalarını keşfedin.",
    metaKeywords:
      "inşaat kalitesini belirleyen görünmeyen detaylar temel izolasyon yöntemleri, temel su yalıtımı, temel ısı yalıtımı, drenaj sistemi, temel koruma, yapı sağlığı, korozyon önleme, neli mühendislik",
    publishedAt: "2026-07-01",
  },
  {
    slug: "uzun-omurlu-binalarda-statik-hesaplamalarin-mimariye-entegrasyonu",
    title: "Uzun Ömürlü Binalarda Statik Hesaplamaların Mimariye Entegrasyonu",
    excerpt:
      "Estetik bir tasarımın yıllarca güvenle ayakta kalabilmesi, arkasındaki güçlü statik hesaplamalara bağlıdır. Mimari planların mühendislik gerçekleriyle nasıl entegre edildiğini ve yapı ömrüne etkisini inceleyin.",
    content: `<article>
      <h2>Estetik ve Güvenlik Arasındaki Denge</h2>
      <p>Bir konut projesinin dışarıdan bakıldığındaki estetiği ve iç mekanlardaki ferahlık, mimari başarının bir göstergesidir. Ancak bu mimari kurgunun onlarca yıl boyunca, özellikle de deprem gibi sarsıcı dış etkenlere karşı ayakta kalabilmesi tamamen görünmeyen matematiksel hesaplamalara dayanır. Kusursuz bir yapı, mimari hayal gücünün mühendislik gerçekleriyle tam uyum içinde çalışmasıyla ortaya çıkar.</p>
      
      <p>Son kullanıcılar genellikle konutun metrekaresi veya cephesiyle ilgilense de, arka planda taşıyıcı sistemin mimari plana nasıl yerleştirildiği yapının asıl karakterini belirler. Kolonların, kirişlerin ve perdelerin doğru konumlandırılması, sadece binanın ayakta kalmasını sağlamakla kalmaz, aynı zamanda iç mekan kullanım kalitesini de doğrudan etkiler.</p>
      
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Statik hesaplamaların mimariye entegrasyonu; binanın taşıyıcı kolon ve kiriş hatlarının, yaşam alanlarını bölmeyecek ve yapı yükünü zemine en dengeli şekilde aktaracak biçimde tasarlanmasıdır. Bu entegrasyon, yüksek mukavemetli malzemeler (örneğin C45 beton) kullanılarak geniş açıklıkların güvenle geçilmesini sağlar ve yapının deprem davranışını kusursuz hale getirir.
      </blockquote>
      
      <h3>Taşıyıcı Sistem Hatlarının Yaşam Alanlarına Uyumu</h3>
      <p>İyi bir projede mimari plan çizilmeden önce statik gereksinimler göz önünde bulundurulur. Odaların ortasına denk gelen kolonlar veya tavan yüksekliğini daraltan gereksiz kiriş sarkmaları, statik ve mimari disiplinlerin birbirinden kopuk çalışmasının sonucudur.</p>
      <p>Modern mühendislikte, binanın iskeletini oluşturan ana taşıyıcı hatlar, mimari duvarların ve bölmelerin içerisine gizlenir. Düşey yüklerin ve yanal deprem kuvvetlerinin temele eksiksiz aktarılabilmesi için taşıyıcı elemanların sürekliliği şarttır. Bir katın taşıyıcı düzeninin, alt kattaki duvar planıyla örtüşmemesi yapısal zafiyet yaratır. Bu nedenle, katlar arası kolon sürekliliği milimetrik olarak planlanmalıdır.</p>
      
      <h3>Malzeme Mukavemetinin Tasarıma Etkisi</h3>
      <p>Geçmişte geniş salonlar veya büyük vitrin pencereleri tasarlamak, standart beton sınıflarının taşıma kapasitesi nedeniyle zordu ve daha sık kolon yerleşimi gerektiriyordu. Günümüzde C45 yüksek mukavemetli beton gibi ileri yapı malzemelerinin kullanılması, statik sınırları genişletmiştir.</p>
      <p>C45 betonun sunduğu yüksek basınç dayanımı sayesinde, kolon kesitleri mimariyi boğmayacak optimum boyutlarda tutulabilirken, yapının taşıma kapasitesinden ve güvenliğinden hiçbir taviz verilmez. Bu durum, mimarlara daha geniş ve aydınlık yaşam alanları tasarlama özgürlüğü sunar.</p>
      
      <h3>Uzun Vadeli Yatırım ve Mühendislik Disiplini</h3>
      <p>Gayrimenkul yatırımı yapılırken yapının sadece bugünkü görünümüne değil, yarınki sağlamlığına odaklanmak gerekir. İzmir'in Karşıyaka ve Çiğli bölgelerinde yeni konut projeleri incelenirken, binanın mimari şıklığının yanı sıra statik altyapısının hangi standartlarda çözüldüğü sorgulanmalıdır.</p>
      
      <h3>Neli Mühendislik ile Disiplinlerarası Uyum</h3>
      <p><strong>Neli Mühendislik</strong> olarak, hayata geçirdiğimiz tüm projelerde mimari tasarımı ve statik mühendisliği tek bir vücut olarak ele alıyoruz. Şantiyelerimizde, masada çözülmüş olan kusursuz entegrasyonu, C45 yüksek mukavemetli beton ve ileri teknoloji ölçüm sistemleriyle gerçeğe dönüştürüyoruz.</p>
      
      <p>Mühendislik temelleri üzerine inşa edilmiş, hem estetik hem de sarsılmaz yaşam alanlarımızı detaylı incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfasındaki güncel projelerimize göz atabilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/statik-mimari.webp",
    coverImageAlt:
      "Mimari planlama ve statik mühendislik hesaplamalarının entegrasyonu — Neli Mühendislik",
    category: "Mühendislik ve Mimari",
    tags: JSON.stringify([
      "statik proje",
      "mimari entegrasyon",
      "taşıyıcı sistem",
      "yapı ömrü",
      "C45 beton",
      "inşaat mühendisliği",
      "deprem dayanımı",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Statik Hesaplamaların Mimariye Entegrasyonu | Neli Mühendislik",
    metaDescription:
      "Uzun ömürlü binalarda statik hesaplamaların mimariye entegrasyonu nasıl sağlanır? Estetik ve taşıyıcı sistem güvenliği arasındaki mühendislik ilişkisi.",
    metaKeywords:
      "statik hesaplama, mimari statik entegrasyon, taşıyıcı kolon dizilimi, uzun ömürlü binalar, C45 beton kullanımı, depreme dayanıklı mimari tasarım, neli mühendislik",
    publishedAt: "2026-06-28",
  },
  {
    slug: "c45-yuksek-mukavemetli-beton-ile-standart-beton-arasindaki-dayanim-farklari",
    title:
      "C45 Yüksek Mukavemetli Beton ile Standart Beton Arasındaki Dayanım Farkları",
    excerpt:
      "İnşaat projelerinde yapı güvenliği ve uzun ömürlülüğün temel sırrı doğru beton sınıfında yatar. C45 yüksek mukavemetli betonun standart beton sınıflarına göre taşıma kapasitesi ve deprem dayanımındaki farklarını inceleyin.",
    content: `<article>
      <h2>Görünmeyen Güç: Beton Sınıfı Neden Önemlidir?</h2>
      <p>Bir gayrimenkul yatırımı yaparken alıcıların büyük bir kısmı genellikle iç mimari detaylara, mutfak kalitesine veya cephe tasarımına odaklanır. Ancak bir yapının gerçek değeri, dayanıklılığı ve yatırım potansiyeli taşıyıcı sistemindeki betonun kalitesiyle doğrudan ilişkilidir. Binaların güvenliğini sağlayan en kritik yapı taşı, şüphesiz ki kullanılan beton sınıfıdır.</p>
      
      <p>Arama motorlarında sıklıkla karşılaştığımız <em>'C45 beton nedir?'</em>, <em>'Hangi beton sınıfı daha sağlam?'</em> veya <em>'İzmir deprem yönetmeliğine uygun beton hangisi?'</em> gibi sorular, bilinçli konut alıcılarının yapı güvenliğine verdiği önemi gösterir. Günümüzde birçok standart projede minimum yönetmelik şartları sağlanmaya çalışılırken, lüks ve nitelikli konut üretiminde yüksek mukavemetli beton sınıfları tercih edilmektedir.</p>
      
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> C45 yüksek mukavemetli beton, santimetrekare başına 450 kilogram (45 MPa) yük taşıma kapasitesine sahiptir. Geleneksel projelerde kullanılan standart C25 veya C30 beton sınıflarına kıyasla yaklaşık %50 ila %80 oranında daha fazla basınç dayanımı sunar. Bu ekstra güç, binanın deprem anındaki direncini artırır, beton içindeki donatıyı korozyondan korur ve yapının ömrünü nesiller boyu uzatır.
      </blockquote>
      
      <h3>Basınç Dayanımı: Rakamların Söylediği Gerçekler</h3>
      <p>Beton sınıflarındaki "C" (Concrete) harfinin yanındaki rakamlar, betonun 28 günlük kürlenme süresi sonundaki silindir basınç dayanımını Megapascal (MPa) cinsinden ifade eder. Aradaki farkı somutlaştırmak gerekirse:</p>
      <ul>
        <li><strong>Standart Beton (C25 - C30):</strong> Genellikle geleneksel konut inşaatlarında yönetmeliklerin izin verdiği alt veya orta sınır sınıflarıdır. Taşıma kapasiteleri santimetrekarede 250 ila 300 kilogram arasındadır.</li>
        <li><strong>Yüksek Mukavemetli Beton (C45):</strong> Özel mühendislik projelerinde ve nitelikli lüks konutlarda kullanılır. Taşıma kapasitesi santimetrekarede 450 kilogramdır. Bu yüksek taşıma kapasitesi, taşıyıcı kolonların daha ince tasarlanabilmesine (mimari ferahlık) ve çok daha büyük yüklerin güvenle zemine aktarılmasına olanak tanır.</li>
      </ul>
      
      <h3>Çevresel Etkilere Karşı Maksimum Koruma (Korozyon Direnci)</h3>
      <p>İzmir gibi denize kıyısı olan ve nem oranının yüksek olduğu bölgelerde, binaların en büyük düşmanı depremden önce <strong>korozyon</strong> yani demir donatının paslanmasıdır. C45 beton, standart betonlara göre çok daha yoğun ve boşluksuz bir yapıya sahiptir. Su geçirgenliği neredeyse sıfıra yakın olduğu için, dışarıdaki nemin veya yeraltı suyunun betonun içine girip çelik donatıya ulaşmasını engeller. Bu durum, binanın yapısal sağlığını onlarca yıl ilk günkü gibi korur.</p>
      
      <h3>Deprem Güvenliğinde Fark Yaratan Sertlik ve Esneklik</h3>
      <p>Yüksek mukavemetli beton sadece dikey yükleri taşımakla kalmaz, deprem anında ortaya çıkan yatay ve kesme kuvvetlerine karşı da olağanüstü bir direnç gösterir. Nitelikli demir işçiliği ile birleştiğinde (örneğin sıklaştırılmış sargı donatıları), kolon-kiriş birleşim noktalarında yaşanabilecek hasar riskini minimuma indirir. Kısacası, C45 beton kullanılmış bir yapıda güvenlik, bir ihtimal değil, doğrudan mühendislik hesaplamalarının sonucudur.</p>
      
      <h3>Neli Mühendislik: Standartların Ötesinde Üretim</h3>
      <p><strong>Neli Mühendislik</strong> olarak, İzmir Çiğli, Karşıyaka ve Balatçık bölgelerinde inşa ettiğimiz tüm projelerde, yapı güvenliğini minimum yönetmelik şartlarına değil, maksimum mühendislik standartlarına göre kurguluyoruz. Bu yüzden projelerimizin tamamında <strong>C45 yüksek mukavemetli beton</strong> kullanıyoruz. Bizim için bir yapının değeri, geçici reklam terimleriyle değil; kullanılan malzemenin tonajı, dayanımı ve kusursuz işçiliğiyle ölçülür.</p>
      
      <p>Hem güvenli bir yaşam alanı hem de yüksek ROI (Yatırım Getirisi) potansiyeline sahip, statik hesaplamaları eksiksiz gayrimenkul seçenekleri için projelerimizi <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfamızdan detaylıca inceleyebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/c45-beton.webp",
    coverImageAlt:
      "C45 yüksek mukavemetli beton ile standart beton arasındaki basınç ve taşıma kapasitesi farkı — Neli Mühendislik",
    category: "Yapı Malzemeleri ve Teknolojileri",
    tags: JSON.stringify([
      "C45 beton",
      "yüksek mukavemetli beton",
      "beton sınıfları",
      "basınç dayanımı",
      "deprem güvenliği",
      "korozyon direnci",
      "Neli Mühendislik",
      "izmir inşaat kalitesi",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "C45 Beton ile Standart Beton Arasındaki Dayanım Farkları | Neli",
    metaDescription:
      "C45 yüksek mukavemetli betonun özellikleri nelerdir? Standart beton sınıflarına göre taşıma kapasitesi, korozyon direnci ve deprem güvenliği farklarını inceleyin.",
    metaKeywords:
      "c45 yüksek mukavemetli beton ile standart beton arasındaki dayanım farkları, C45 beton nedir, yüksek mukavemetli beton taşıma kapasitesi, C25 C30 C45 beton farkı, korozyon direnci, depreme dayanıklı beton, neli mühendislik",
    publishedAt: "2026-06-29",
  },
  {
    slug: "bilincli-konut-alicilari-icin-muteahhit-secerken-dikkat-edilmesi-gereken-teknik-kriterler",
    title:
      "Bilinçli Konut Alıcıları İçin Müteahhit Seçerken Dikkat Edilmesi Gereken Teknik Kriterler",
    excerpt:
      "Bir konut projesini değerlendirirken makyajlanmış detaylara değil, yapının arkasındaki mühendislik kalitesine odaklanın. Doğru inşaat firmasını seçmenizi sağlayacak net teknik kriterleri inceleyin.",
    content: `<article>
    <h2>Dış Görünüşün Ötesine Geçmek: Gerçek Kalite Nerede Başlar?</h2>
    <p>Yeni bir yaşam alanı veya yatırım amaçlı bir gayrimenkul arayışına girdiğinizde, karşınıza çıkan ilk unsurlar genellikle şık cephe tasarımları, peyzaj alanları ve iç mimari detaylardır. Ancak bilinçli bir alıcı, bir binanın gerçek değerinin mutfak dolaplarında değil; temelinde, kolonlarında ve işçiliğindeki hassasiyette yattığını bilir.</p>
    
    <p>Arama motorlarında sıkça karşılaştığımız <em>'Güvenilir müteahhit nasıl anlaşılır?'</em>, <em>'Ev alırken inşaat kalitesi nasıl sorgulanır?'</em> veya <em>'Sağlam bina kriterleri nelerdir?'</em> gibi sorular, yatırımını riske atmak istemeyen alıcıların en doğal refleksidir. Doğru firmayı seçmek; sadece bir ev satın almak değil, geleceğinizi ve bütçenizi güvence altına almaktır.</p>
    
    <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
      <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Bilinçli konut alıcıları müteahhit seçerken; projede kullanılan beton sınıfını (tercihen C45 yüksek mukavemetli), zemin iyileştirme ve radye temel uygulamalarını, ince işçilikte lazerli ölçüm sistemlerinin kullanılıp kullanılmadığını ve firmanın geçmiş projelerindeki mühendislik şeffaflığını doğrudan sorgulamalıdır. Estetikten önce statik güvenliği ön planda tutan firmalar tercih edilmelidir.
    </blockquote>
    
    <h3>1. Taşıyıcı Sistem ve Malzeme Standartlarını Sorgulayın</h3>
    <p>Görüşmeye gittiğiniz satış ofisinde veya şantiyede sormanız gereken ilk soru, duvarların rengi değil, binanın iskeletidir. Minimum yönetmelik şartlarıyla yetinen projeler yerine, mühendislik sınırlarını zorlayan yapıları tercih etmelisiniz:</p>
    <ul>
      <li><strong>Beton Sınıfı:</strong> Standart C25 veya C30 yerine, yüksek taşıma kapasitesine ve korozyon direncine sahip <strong>C45 yüksek mukavemetli beton</strong> kullanan projeler, yapının deprem güvenliğini ve ömrünü doğrudan artırır.</li>
      <li><strong>Zemin-Temel İlişkisi:</strong> Alüvyonal zeminlerde sadece temel atmak yetmez. Fore kazık veya jet grouting gibi zemin iyileştirme çalışmalarının eksiksiz yapıldığından emin olun.</li>
    </ul>
    
    <h3>2. İnce İşçilikte "Göz Kararı" Değil, "Milimetrik Hassasiyet" Arayın</h3>
    <p>Kaba inşaatı sağlam bir binanın kalitesini, ince işçilikteki kusursuzluk belirler. Geleneksel yöntemlerle (ip, su terazisi) yapılan sıva, şap ve seramik uygulamalarında insan kaynaklı hata payı yüksektir. Bilinçli bir alıcı, üretim süreçlerinde <strong>lazer hizalama ve lazerli terazi sistemleri</strong> kullanan, şakul (düşey doğruluk) ve gönye (dik açı) hatalarını sıfıra indiren, mühendislik disipliniyle çalışan firmaları seçmelidir.</p>
    
    <h3>3. Geçmiş Projeler ve Şeffaf İletişim</h3>
    <p>Firmanın geçmişte teslim ettiği projeler, gelecekte yapacağı işin en net teminatıdır. Zamanında ve taahhüt edildiği kalitede teslim edilmiş yapılar, firmanın operasyonel gücünü gösterir. Aynı zamanda, satış sürecinde size abartılı reklam sloganlarıyla değil, doğrudan teknik verilerle ve şeffaf bir iletişim diliyle yaklaşan profesyonellerle çalışmak soru işaretlerini ortadan kaldırır.</p>
    
    <h3>Neli Mühendislik Vizyonu: Net Çözümler, Sağlam Temeller</h3>
    <p><strong>Neli Mühendislik</strong> olarak, İzmir Çiğli, Karşıyaka ve Balatçık bölgelerinde hayata geçirdiğimiz Valorya ve Serenità serisi projelerimizde, mühendislik etiğini her şeyin önünde tutuyoruz. Bizim için lüks; C45 betonun gücü, lazerle ölçülmüş kusursuz bir zemin ve sorunsuz bir altyapıdır. Üretim sürecinin her aşamasında "göz kararına" yer bırakmayan teknik standartlar uyguluyoruz.</p>
    
    <p>Siz de yatırımınızı sadece bugünün estetiğine değil, yarının güvenliğine yapmak istiyorsanız; yüksek mühendislik standartlarıyla inşa ettiğimiz güncel konut projelerimizi detaylıca incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> adresimizi ziyaret edebilirsiniz.</p>
  </article>`,
    coverImage: "/images/blog/muteahhit-secimi.webp",
    coverImageAlt:
      "Konut alıcıları için müteahhit seçimi ve teknik mühendislik kriterleri — Neli Mühendislik",
    category: "Konut Satın Alma Rehberi",
    tags: JSON.stringify([
      "müteahhit seçimi",
      "teknik kriterler",
      "C45 beton",
      "lazerli işçilik",
      "inşaat kalitesi",
      "gayrimenkul yatırımı",
      "Neli Mühendislik",
      "izmir konut projeleri",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Müteahhit Seçerken Dikkat Edilmesi Gereken Teknik Kriterler | Neli",
    metaDescription:
      "Bilinçli konut alıcıları için müteahhit seçerken dikkat edilmesi gereken teknik kriterler nelerdir? C45 beton, lazerli işçilik ve mühendislik standartları.",
    metaKeywords:
      "müteahhit seçerken dikkat edilmesi gereken teknik kriterler, güvenilir inşaat firması seçimi, izmir müteahhit, c45 beton kullanımı, lazer terazi işçilik, yapı kalitesi nasıl anlaşılır, neli mühendislik",
    publishedAt: "2026-06-30",
  },
  {
    slug: "izmir-yeni-binalarda-topraklama-kacak-akim-rolesi-kontrolu",
    title:
      "İzmir’de Yeni Binalarda Topraklama ve Kaçak Akım Rölesi Nasıl Kontrol Edilir?",
    excerpt:
      "Yeni bir daire teslim alırken elektrik panosunda kaçak akım rölesi bulunması tek başına yeterli değildir. Topraklama sisteminin, koruma iletkenlerinin ve kaçak akım rölesinin doğru çalışıp çalışmadığının nasıl kontrol edildiğini öğrenin.",
    content: `<article>
      <h2>Yeni Bir Binada Elektrik Güvenliği Nasıl Anlaşılır?</h2>
      <p>Yeni bir konut satın alırken çoğu kişi dairenin mimarisini, kullanılan seramikleri, mutfak dolaplarını ve kapı sistemlerini ayrıntılı biçimde inceler. Ancak binanın en önemli güvenlik bileşenlerinden biri olan elektrik tesisatı çoğu zaman yalnızca prizlerin çalışıp çalışmadığı kontrol edilerek geçilir.</p>
  
      <p>Bir prizde elektrik bulunması, tesisatın güvenli olduğu anlamına gelmez. Elektrik güvenliği; doğru projelendirilmiş bir topraklama sistemi, kesintisiz koruma iletkenleri, uygun sigortalar, eş potansiyel bağlantılar ve doğru seçilmiş kaçak akım koruma cihazlarının birlikte çalışmasıyla sağlanır.</p>
  
      <p>Özellikle yeni bina veya sıfır daire teslimlerinde elektrik panosunda bir kaçak akım rölesinin bulunması olumlu bir işarettir. Bununla birlikte rölenin doğru bağlandığı, uygun hassasiyet değerine sahip olduğu ve gerektiğinde devreyi yeterli sürede açtığı ölçümle doğrulanmalıdır.</p>
  
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni bir binada topraklama ve kaçak akım rölesi kontrolü yalnızca elektrik panosundaki test düğmesine basılarak yapılamaz. Kullanıcı, rölenin üzerindeki 30 mA değerini ve test düğmesine basıldığında elektriği kesip kesmediğini kontrol edebilir. Kesin güvenlik değerlendirmesi için ise yetkili bir elektrik uzmanı tarafından koruma iletkeni sürekliliği, topraklama veya çevrim empedansı, yalıtım direnci, nötr-toprak bağlantıları ile kaçak akım rölesinin açma akımı ve açma süresi ölçülmelidir.
      </blockquote>
  
      <h3>Topraklama Sistemi Ne İşe Yarar?</h3>
      <p>Topraklama sistemi, bir elektrikli cihazın metal gövdesinde veya tesisatın herhangi bir bölümünde oluşabilecek hata akımının güvenli bir yol üzerinden toprağa ve koruma sistemine aktarılmasını sağlar. Bu sayede cihaz gövdesine dokunan kişinin tehlikeli bir gerilime maruz kalma riski azaltılır ve koruma cihazlarının devreyi açması kolaylaştırılır.</p>
  
      <p>Binalarda prizlere kadar ulaşan sarı-yeşil renkli koruma iletkeni, elektrik panosundaki koruma barasına ve binanın ana topraklama sistemine kesintisiz olarak bağlanmalıdır. Bir prizde topraklama kontağının bulunması, koruma iletkeninin gerçekten bağlı ve işlevsel olduğunu tek başına kanıtlamaz.</p>
  
      <p>Bu nedenle yeni konut kontrolünde yalnızca priz görünümüne bakılması yeterli değildir. Koruma iletkeninin sürekliliği ve arıza durumunda koruma cihazlarını çalıştırabilecek elektriksel koşullar, uygun ölçüm cihazlarıyla kontrol edilmelidir.</p>
  
      <h3>Kaçak Akım Rölesi Ne İşe Yarar?</h3>
      <p>Kaçak akım rölesi veya teknik adıyla artık akım koruma cihazı, faz iletkeninden çıkan akımla nötr iletkeninden geri dönen akımı karşılaştırır. Akımın bir bölümü insan vücudu, cihaz gövdesi, nemli bir yüzey veya başka bir hata yolu üzerinden devreden ayrılırsa röle bu farkı algılar ve elektrik beslemesini keser.</p>
  
      <p>Konutlardaki son kullanıcı devrelerinde insan hayatını koruma amacıyla genellikle 30 mA hassasiyet değerine sahip kaçak akım koruma cihazları kullanılır. Elektrik panosunda yalnızca daha yüksek eşik değerine sahip bir ana koruma cihazının bulunması, daire içindeki son devreler için gereken 30 mA seviyesindeki ek korumanın yerine geçmez.</p>
  
      <p>Kaçak akım rölesi ile otomatik sigorta aynı görevi yapmaz. Otomatik sigorta aşırı yük ve kısa devre akımlarına karşı koruma sağlarken kaçak akım rölesi, faz ve nötr arasındaki akım farkını takip eder. Güvenli bir tesisatta bu iki koruma işlevi birlikte sağlanmalıdır.</p>
  
      <h3>Ev Sahibi Kaçak Akım Rölesini Nasıl Kontrol Edebilir?</h3>
      <p>Elektrik panosunda kaçak akım rölesinin üzerinde genellikle “T”, “Test” veya benzer biçimde işaretlenmiş bir test düğmesi bulunur. Kullanıcı tarafından yapılabilecek temel kontrol, üreticinin kullanım talimatlarına uygun biçimde bu düğmeye basılmasıdır.</p>
  
      <ol>
        <li>Elektrik kesintisinden etkilenebilecek bilgisayar, modem, alarm sistemi ve benzeri cihazları güvenli biçimde kapatın.</li>
        <li>Elektrik panosunda kaçak akım rölesi olduğu belirtilen cihazı tespit edin.</li>
        <li>Cihazın üzerinde 30 mA veya “0.03 A” gibi hassasiyet bilgisinin bulunup bulunmadığını kontrol edin.</li>
        <li>Test düğmesine basın ve rölenin açarak ilgili devrelerin elektriğini kesip kesmediğini gözlemleyin.</li>
        <li>Röle açmıyorsa cihazı zorlamayın ve panoya müdahale etmeden yetkili bir elektrik uzmanına başvurun.</li>
      </ol>
  
      <p>Test düğmesinin çalışması, rölenin iç mekanizmasının temel işlevini yerine getirebildiğini gösterir. Ancak bu test; prizlerdeki topraklama bağlantısını, koruma iletkenlerinin sürekliliğini, tesisatın yalıtım durumunu veya rölenin gerçek kaçak akımdaki açma süresini doğrulamaz.</p>
  
      <p><strong>Önemli güvenlik uyarısı:</strong> Elektrik panosunun kapağını sökmek, kablolara dokunmak, faz-nötr veya nötr-toprak arasında deneysel bağlantı yapmak son derece tehlikelidir. Pano içindeki kontroller yalnızca yetkili kişiler tarafından ve uygun ölçüm ekipmanları kullanılarak gerçekleştirilmelidir.</p>
  
      <h3>Profesyonel Topraklama Kontrolünde Hangi Ölçümler Yapılır?</h3>
      <p>Topraklama sisteminin uygunluğu tek bir ölçüm değerine bakılarak belirlenmez. Binanın şebeke sistemi, koruma düzeni, sigorta özellikleri ve kaçak akım koruma cihazları birlikte değerlendirilmelidir. Profesyonel kontrolde aşağıdaki işlemler uygulanabilir:</p>
  
      <ul>
        <li><strong>Koruma iletkeni süreklilik testi:</strong> Prizlerdeki ve metal gövdeli ekipmanlardaki koruma iletkenlerinin ana topraklama barasına kesintisiz bağlanıp bağlanmadığı kontrol edilir.</li>
        <li><strong>Topraklama direnci ölçümü:</strong> Tesisat ve topraklama sisteminin türüne uygun yöntem kullanılarak topraklayıcının elektriksel performansı ölçülür.</li>
        <li><strong>Çevrim empedansı ölçümü:</strong> Bir arıza meydana geldiğinde oluşacak akımın sigorta veya koruma cihazını yeterli sürede açtırıp açtıramayacağı değerlendirilir.</li>
        <li><strong>Yalıtım direnci testi:</strong> Kablolardaki yalıtımın bozulup bozulmadığı ve istenmeyen kaçakların bulunup bulunmadığı kontrol edilir.</li>
        <li><strong>Kaçak akım rölesi testi:</strong> Rölenin açma akımı ve açma süresi özel bir test cihazıyla ölçülür.</li>
        <li><strong>Polarite kontrolü:</strong> Faz, nötr ve koruma iletkenlerinin priz ve diğer ekipmanlara doğru biçimde bağlandığı doğrulanır.</li>
        <li><strong>Eş potansiyel bağlantı kontrolü:</strong> Binadaki erişilebilir metal bölümlerin ve gerekli tesisat elemanlarının uygun koruma bağlantılarına sahip olup olmadığı incelenir.</li>
      </ul>
  
      <h3>Topraklama Direnci Kaç Ohm Olmalıdır?</h3>
      <p>Topraklama konusunda en sık yapılan hatalardan biri, her bina için geçerli tek bir ohm değerinin bulunduğunu düşünmektir. “Topraklama mutlaka 1 ohm olmalıdır” veya “10 ohmun altındaysa güvenlidir” gibi genel ifadeler her tesis için teknik olarak doğru değildir.</p>
  
      <p>Kabul edilebilir değer; binadaki TT, TN-S veya TN-C-S gibi şebeke düzenine, kullanılan koruma cihazlarına, cihazların açma akımlarına ve arıza durumundaki dokunma gerilimine göre değerlendirilir. Bu nedenle ölçülen değer, elektrik projesi ve koruma sistemiyle birlikte uzman tarafından yorumlanmalıdır.</p>
  
      <p>Ölçüm raporunda yalnızca elde edilen direnç değerinin yazması yeterli değildir. Ölçüm yöntemi, ölçüm noktası, kullanılan cihaz, koruma elemanının özellikleri, sınır değer ve uygunluk sonucu da açık biçimde belirtilmelidir.</p>
  
      <h3>Yeni Bir Daire Teslim Alırken Panoda Nelere Bakılmalıdır?</h3>
      <p>Daire tesliminden önce elektrik panosu üzerinde kullanıcı tarafından yapılabilecek güvenli görsel kontroller şunlardır:</p>
  
      <ul>
        <li>Kaçak akım rölesinin bulunması ve üzerinde test düğmesi olması,</li>
        <li>Rölenin hassasiyet değerinin okunabilir durumda olması,</li>
        <li>Aydınlatma, priz, mutfak cihazları ve klima gibi devrelerin etiketlenmiş olması,</li>
        <li>Panoda açıkta kablo, kırık parça, yanık izi veya yoğun ısınma belirtisi bulunmaması,</li>
        <li>Pano kapağının güvenli biçimde kapanması,</li>
        <li>Sigortaların dairedeki devrelere uygun biçimde ayrılması,</li>
        <li>Elektrik projesi ile mevcut uygulamanın birbiriyle uyumlu olması.</li>
      </ul>
  
      <p>Ancak panonun dışarıdan düzenli görünmesi elektriksel ölçümlerin yerine geçmez. Özellikle daire satın alma, kiralama veya yapı teslimi öncesinde ölçüm sonuçlarının yazılı raporla sunulması önemli bir güvenlik göstergesidir.</p>
  
      <h3>Topraklama Ölçüm Raporunda Hangi Bilgiler Bulunmalıdır?</h3>
      <p>Profesyonel bir elektrik tesisatı ve topraklama kontrol raporunda aşağıdaki bilgilerin bulunması beklenir:</p>
  
      <ul>
        <li>Binanın ve ölçüm yapılan bağımsız bölümün açık bilgileri,</li>
        <li>Kontrol tarihi ve ölçüm noktalarının tanımları,</li>
        <li>Kullanılan ölçüm cihazının marka, model ve seri numarası,</li>
        <li>Cihazın geçerli kalibrasyon bilgisi,</li>
        <li>Koruma iletkeni, topraklama ve çevrim empedansı ölçümleri,</li>
        <li>Kaçak akım rölesinin tipi, anma akımı ve kaçak akım hassasiyeti,</li>
        <li>Rölenin ölçülen açma akımı ve açma süresi,</li>
        <li>Tespit edilen kusurlar ve önerilen düzeltmeler,</li>
        <li>Sonuç bölümünde uygunluk değerlendirmesi,</li>
        <li>Kontrolü gerçekleştiren yetkili kişinin bilgileri ve onayı.</li>
      </ul>
  
      <h3>Kaçak Akım Rölesi Sürekli Atıyorsa Ne Yapılmalıdır?</h3>
      <p>Kaçak akım rölesinin sık sık açması her zaman rölenin arızalı olduğu anlamına gelmez. Nem alan bir cihaz, bozulmuş kablo yalıtımı, hatalı nötr bağlantısı, farklı devrelerde ortak nötr kullanılması, arızalı beyaz eşya veya tesisat içerisindeki bir kaçak buna neden olabilir.</p>
  
      <p>Röle sürekli açıyorsa cihazı devre dışı bırakmak, köprülemek veya daha yüksek kaçak akım değerine sahip bir cihazla rastgele değiştirmek güvenli bir çözüm değildir. Hatanın kaynağı ölçüm cihazlarıyla tespit edilmeli ve gerekli onarım yapıldıktan sonra sistem yeniden test edilmelidir.</p>
  
      <h3>İzmir’de Yeni Binalarda Elektrik Tesisatı Kontrolü Neden Önemlidir?</h3>
      <p>İzmir’de yeni konut projeleri değerlendirilirken deprem güvenliği, beton sınıfı ve temel sistemi kadar elektrik tesisatı güvenliği de sorgulanmalıdır. Topraklama tesisatı, yalnızca yapım aşamasında tamamlanan bir imalat değil, binanın kullanım ömrü boyunca işlevini koruması gereken bir güvenlik sistemidir.</p>
  
      <p>Özellikle nem, korozyon, tadilatlar, sonradan eklenen yüksek güçlü cihazlar ve hatalı kullanıcı müdahaleleri zaman içerisinde elektrik tesisatının performansını etkileyebilir. Bu nedenle teslim sırasında yapılan ilk doğrulama kadar, gerekli dönemlerde gerçekleştirilen profesyonel kontroller de önemlidir.</p>
  
      <h3>Sık Sorulan Sorular</h3>
  
      <h4>Kaçak akım rölesinin bulunması topraklamanın sağlam olduğunu gösterir mi?</h4>
      <p>Hayır. Kaçak akım rölesi ve topraklama birbirini tamamlayan fakat farklı görevleri olan koruma sistemleridir. Rölenin bulunması, prizlerdeki koruma iletkeninin kesintisiz veya topraklama sisteminin uygun olduğunu tek başına kanıtlamaz.</p>
  
      <h4>Priz test cihazı topraklama kontrolü için yeterli midir?</h4>
      <p>Basit priz test cihazları bazı bağlantı hatalarını gösterebilir ancak topraklama direncini, çevrim empedansını, koruma iletkeninin gerçek performansını ve kaçak akım rölesinin açma süresini kapsamlı biçimde ölçemez.</p>
  
      <h4>Test düğmesine basıldığında röle açmıyorsa ne yapılmalıdır?</h4>
      <p>Röle açmıyorsa elektrik panosuna müdahale edilmemeli ve tesisat yetkili bir elektrik uzmanına kontrol ettirilmelidir. Rölenin mekanizması, bağlantısı veya besleme düzeni arızalı olabilir.</p>
  
      <h4>Yeni daire tesliminde elektrik ölçüm raporu istenebilir mi?</h4>
      <p>Evet. Daire sahibi veya alıcı; elektrik tesisatı, topraklama sistemi ve kaçak akım koruma cihazlarına ilişkin test ve uygunluk belgelerini talep edebilir. Yazılı ölçüm raporu, tesisatın yalnızca görsel olarak değil teknik olarak da kontrol edildiğini gösterir.</p>
  
      <h3>Neli Mühendislik Projelerinde Elektrik Güvenliği</h3>
      <p><strong>Neli Mühendislik</strong> olarak bir konutun güvenliğini yalnızca taşıyıcı sistem ve beton kalitesiyle sınırlı görmüyoruz. Elektrik tesisatından su yalıtımına, mimari detaylardan kullanılan malzemelere kadar yapının bütün bileşenlerini birbiriyle uyumlu bir mühendislik sistemi olarak ele alıyoruz.</p>
  
      <p>İzmir'de geliştirdiğimiz güncel konut projelerini, daire seçeneklerini ve uygulama detaylarını incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfasını ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/topraklama-kontrolu.webp",
    coverImageAlt:
      "Yeni bir konutun elektrik panosunda topraklama ve kaçak akım rölesi kontrolü — Neli Mühendislik",
    category: "Elektrik Tesisatı ve Yapı Güvenliği",
    tags: JSON.stringify([
      "topraklama kontrolü",
      "kaçak akım rölesi",
      "elektrik tesisatı",
      "30 mA kaçak akım",
      "yeni bina kontrolü",
      "elektrik güvenliği",
      "İzmir konut projeleri",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Yeni Binalarda Topraklama ve Kaçak Akım Kontrolü | Neli",
    metaDescription:
      "İzmir’de yeni binalarda topraklama ve kaçak akım rölesi nasıl kontrol edilir? Daire tesliminde yapılması gereken elektrik güvenliği testleri.",
    metaKeywords:
      "İzmir yeni bina topraklama kontrolü, kaçak akım rölesi testi, 30 mA kaçak akım rölesi, daire elektrik tesisatı kontrolü, topraklama ölçüm raporu, yeni daire teslim kontrolü, elektrik panosu güvenliği, neli mühendislik",
    publishedAt: "2026-07-06",
  },
  {
    slug: "yeni-konut-projelerinde-elektrikli-arac-sarj-altyapisi",
    title:
      "Yeni Konut Projelerinde Elektrikli Araç Şarj Altyapısı Nasıl Hazırlanır?",
    excerpt:
      "Elektrikli araç şarj altyapısının sonradan eklenmesi yüksek maliyetlere, yetersiz elektrik kapasitesine ve ortak alan sorunlarına yol açabilir. Yeni konut projelerinde güç hesabından kablo güzergâhına, sayaç sisteminden dinamik yük yönetimine kadar doğru altyapının nasıl hazırlanması gerektiğini inceleyin.",
    content: `<article>
      <h2>Elektrikli Araç Şarj Altyapısı Neden Proje Aşamasında Planlanmalıdır?</h2>
      <p>Elektrikli araç kullanımının yaygınlaşmasıyla birlikte konut projelerinin otoparkları yalnızca araçların bırakıldığı alanlar olmaktan çıkmaktadır. Yeni nesil otoparkların, araçların güvenli biçimde şarj edilebildiği enerji altyapılarına dönüşmesi gerekmektedir.</p>
  
      <p>Bir binaya elektrikli araç şarj ünitesi eklemek, otopark duvarına cihaz monte etmekten ibaret değildir. Binanın mevcut elektrik gücü, ana dağıtım panosu, kablo kesitleri, topraklama sistemi, sayaç düzeni, yangın güvenliği, otopark yerleşimi ve gelecekte kullanılması beklenen araç sayısı birlikte değerlendirilmelidir.</p>
  
      <p>Şarj altyapısının bina tamamlandıktan sonra kurulması; beton yüzeylerin kırılması, yeni kablo tavaları yapılması, ortak alanlarda tadilat gerçekleştirilmesi ve elektrik aboneliğinin güçlendirilmesi gibi ek maliyetler doğurabilir. Buna karşılık altyapının mimari ve elektrik projeleri hazırlanırken çözülmesi, gelecekte kurulacak cihazlar için güvenli ve ölçeklenebilir bir sistem oluşturur.</p>
  
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni konut projelerinde elektrikli araç şarj altyapısı; binanın elektrik gücü ve eş zamanlı kullanım ihtiyacı hesaplanarak, ana panodan otoparka uygun kablo güzergâhları, rezerv borular, şarj panoları, koruma cihazları, topraklama, sayaç sistemi ve dinamik yük yönetimi hazırlanarak oluşturulur. Sistem yalnızca bugünkü araç sayısına göre değil, gelecekte otoparktaki daha fazla aracın şarj edilebileceği şekilde ölçeklenebilir olarak tasarlanmalıdır.
      </blockquote>
  
      <h3>1. Otopark Kapasitesi ve Gelecekteki Şarj Talebi Belirlenmelidir</h3>
      <p>Şarj altyapısı tasarımının ilk aşaması, projedeki toplam otopark sayısını ve bu otoparkların gelecekte ne kadarının elektrikli araçlar tarafından kullanılabileceğini belirlemektir. Yalnızca ilk teslim tarihinde kurulacak şarj ünitesi sayısına göre yapılan bir tasarım, birkaç yıl içinde yetersiz kalabilir.</p>
  
      <p>Örneğin ilk aşamada yalnızca birkaç araç için şarj ünitesi kurulacak olsa bile diğer park yerlerine ulaşabilecek rezerv kablo kanalları ve borular bırakılabilir. Böylece ilerleyen dönemlerde yeni bir şarj noktası eklenmesi gerektiğinde beton kırmaya veya ortak alanlarda kapsamlı tadilat yapmaya ihtiyaç duyulmaz.</p>
  
      <p>Altyapı planlanırken aşağıdaki sorulara cevap verilmelidir:</p>
  
      <ul>
        <li>Binada toplam kaç araçlık otopark bulunmaktadır?</li>
        <li>İlk teslim tarihinde kaç şarj ünitesi kurulacaktır?</li>
        <li>Beş veya on yıl içerisinde kaç park yerinin şarj noktasına dönüşmesi beklenmektedir?</li>
        <li>Park yerleri bağımsız bölümlere tahsisli mi, yoksa ortak kullanımlı mıdır?</li>
        <li>Enerji tüketimi hangi sayaç veya kullanıcı üzerinden ücretlendirilecektir?</li>
        <li>Şarj noktaları yalnızca bina sakinlerine mi, yoksa dış kullanıcılara da mı hizmet verecektir?</li>
      </ul>
  
      <h3>2. Binanın Elektrik Güç Kapasitesi Hesaplanmalıdır</h3>
      <p>Elektrikli araç şarj cihazları, uzun süre boyunca yüksek güç çekebilen elektrikli ekipmanlardır. Bu nedenle binanın mevcut kurulu gücüne yalnızca şarj cihazlarının etiket güçlerini eklemek doğru bir tasarım yöntemi değildir.</p>
  
      <p>Elektrik mühendisi tarafından binanın konut, asansör, hidrofor, otopark, aydınlatma, ısıtma, soğutma ve diğer ortak alan yükleri değerlendirilmelidir. Daha sonra elektrikli araçların hangi saatlerde ve kaç adet eş zamanlı olarak şarj edilebileceği hesaplanmalıdır.</p>
  
      <p>Bu hesaplama sonucunda aşağıdaki bileşenlerin yeterliliği kontrol edilir:</p>
  
      <ul>
        <li>Binanın elektrik bağlantı ve sözleşme gücü,</li>
        <li>Trafo veya şebeke besleme kapasitesi,</li>
        <li>Ana dağıtım panosu ve bara kapasitesi,</li>
        <li>Ana besleme kablolarının kesitleri,</li>
        <li>Ortak alan sayacı ve enerji ölçüm sistemi,</li>
        <li>Şarj panolarına ayrılabilecek rezerv güç.</li>
      </ul>
  
      <p>Yeterli güç bulunmaması halinde dağıtım şirketinden güç artırımı talep edilmesi, yeni bir ortak alan aboneliği oluşturulması veya dinamik yük yönetimi uygulanması gerekebilir. Bu nedenle şarj altyapısının elektrik projesi hazırlanırken ilgili elektrik dağıtım kuruluşunun görüş ve bağlantı koşulları dikkate alınmalıdır.</p>
  
      <h3>3. AC ve DC Şarj Sistemi Arasındaki Fark Doğru Değerlendirilmelidir</h3>
      <p>Elektrikli araçlar temel olarak alternatif akımla çalışan AC şarj cihazları veya doğru akımla çalışan DC hızlı şarj cihazları üzerinden şarj edilebilir. Konut projelerinde araçlar çoğunlukla gece boyunca uzun süre park edildiği için AC şarj sistemleri genellikle daha uygulanabilir bir çözüm sunar.</p>
  
      <p>DC hızlı şarj cihazları ise daha yüksek elektrik gücü, daha büyük ekipman alanı ve daha kapsamlı altyapı gerektirebilir. Bu nedenle konut projesinde cihaz türü yalnızca şarj hızına bakılarak değil, binanın elektrik kapasitesi ve kullanım senaryosu birlikte değerlendirilerek seçilmelidir.</p>
  
      <p>Şarj gücü belirlenirken aşağıdaki unsurlar göz önünde bulundurulmalıdır:</p>
  
      <ul>
        <li>Araçların ortalama otoparkta kalma süresi,</li>
        <li>Binanın kullanılabilir elektrik kapasitesi,</li>
        <li>Aynı anda şarj edilmesi beklenen araç sayısı,</li>
        <li>Araçların tek faz veya üç faz şarj desteği,</li>
        <li>Kullanıcıların günlük ortalama enerji ihtiyacı,</li>
        <li>Gelecekte sisteme eklenecek şarj noktaları.</li>
      </ul>
  
      <h3>4. Dinamik Yük Yönetimi Kullanılmalıdır</h3>
      <p>Bir otoparktaki bütün şarj cihazlarının aynı anda tam güçle çalışması, binanın elektrik kapasitesinin aşılmasına neden olabilir. Bu durum ana sigortaların açmasına, kabloların aşırı yüklenmesine veya yüksek bağlantı gücü yatırımı yapılmasına yol açabilir.</p>
  
      <p>Dinamik yük yönetimi sistemi, binanın anlık elektrik tüketimini takip ederek şarj cihazlarına aktarılabilecek kullanılabilir gücü otomatik biçimde belirler. Binanın diğer tüketimleri yükseldiğinde araçlara ayrılan şarj gücü azaltılır; tüketim düştüğünde ise araçlara daha fazla güç verilebilir.</p>
  
      <p>Birden fazla aracın şarj edildiği sistemlerde mevcut güç, kullanıcılar veya cihazlar arasında dengeli biçimde dağıtılabilir. Böylece yalnızca birkaç aracın bütün kapasiteyi kullanması önlenir ve binanın elektrik altyapısı aşırı yüklenmeden daha fazla şarj noktası işletilebilir.</p>
  
      <p>Dinamik yük yönetimi özellikle aşağıdaki avantajları sağlar:</p>
  
      <ul>
        <li>Binanın ana elektrik gücünün aşılmasını önler.</li>
        <li>Gereksiz güç artırımı ve trafo yatırımı ihtiyacını azaltabilir.</li>
        <li>Birden fazla şarj cihazının koordineli çalışmasını sağlar.</li>
        <li>Gelecekte sisteme yeni cihazların eklenmesini kolaylaştırır.</li>
        <li>Enerji kullanımının kullanıcı bazında takip edilmesine yardımcı olur.</li>
      </ul>
  
      <h3>5. Otoparkta Rezerv Boru ve Kablo Güzergâhları Bırakılmalıdır</h3>
      <p>Yeni konut projelerinde yapılabilecek en değerli hazırlıklardan biri, henüz şarj cihazı kurulmayacak park yerlerine kadar rezerv elektrik boruları ve uygun kablo güzergâhları bırakmaktır.</p>
  
      <p>Kablo güzergâhları elektrik odasından veya şarj panosundan başlayarak otoparktaki park yerlerine güvenli biçimde ulaşmalıdır. Güzergâhların araç hareketleri, su tesisatı, yangın hatları, havalandırma kanalları ve diğer mekanik tesisatlarla çakışmaması gerekir.</p>
  
      <p>Projede aşağıdaki altyapı bileşenlerinin önceden hazırlanması önemlidir:</p>
  
      <ul>
        <li>Ana elektrik odasından otoparka ulaşan rezerv kablo tavaları,</li>
        <li>Her otopark bölgesine ayrılmış elektrik tesisat şaftları,</li>
        <li>Gelecekte kullanılabilecek boş borular ve çekme telleri,</li>
        <li>Kablo geçişlerinde uygun yangın durdurucu detaylar,</li>
        <li>Şarj cihazlarının bağlanabileceği pano ve dağıtım noktaları,</li>
        <li>Data kablosu veya kablosuz haberleşme için iletişim altyapısı.</li>
      </ul>
  
      <p>Rezerv boruların çapı ve kablo tavalarının kapasitesi yalnızca ilk kurulacak cihazlar için değil, gelecekteki toplam şarj noktası hedefi dikkate alınarak belirlenmelidir.</p>
  
      <h3>6. Şarj Cihazları İçin Ayrı Elektrik Panosu Tasarlanmalıdır</h3>
      <p>Çok sayıda şarj noktasının doğrudan mevcut ortak alan panosuna düzensiz biçimde bağlanması, işletme ve bakım sorunlarına neden olabilir. Bunun yerine elektrikli araç şarj sistemleri için ayrı bir dağıtım panosu veya panolar grubu tasarlanması daha kontrollü bir altyapı oluşturur.</p>
  
      <p>Şarj panosunda her şarj noktası için uygun koruma ve ayırma elemanları bulunmalıdır. Cihazların enerji hatları etiketlenmeli, hangi sigortanın hangi park yerine ait olduğu açıkça belirtilmelidir.</p>
  
      <p>Şarj panosunda proje gereksinimlerine göre şu bileşenler yer alabilir:</p>
  
      <ul>
        <li>Ana kesici ve ayırıcılar,</li>
        <li>Her şarj hattına ait aşırı akım ve kısa devre koruması,</li>
        <li>Uygun kaçak akım ve doğru akım kaçağı koruması,</li>
        <li>Darbe gerilimlerine karşı koruma elemanları,</li>
        <li>Enerji analizörü ve sayaçlar,</li>
        <li>Dinamik yük yönetimi kontrol ekipmanları,</li>
        <li>Uzaktan izleme ve haberleşme bileşenleri,</li>
        <li>Gelecekteki genişleme için yedek sigorta ve pano alanı.</li>
      </ul>
  
      <h3>7. Her Şarj Noktası İçin Uygun Koruma Sistemi Kurulmalıdır</h3>
      <p>Elektrikli araç şarj sistemlerinde yalnızca standart bir priz kullanılması, sürekli ve yüksek güçlü şarj işlemleri için uygun bir çözüm olmayabilir. Şarj cihazı, kendisine ayrılmış elektrik hattı ve gerekli koruma elemanlarıyla birlikte projelendirilmelidir.</p>
  
      <p>Her cihazın elektrik hattı; cihazın gücüne, kablo uzunluğuna, döşeme biçimine, ortam sıcaklığına ve gerilim düşümüne göre hesaplanmalıdır. Bir şarj hattına birden fazla cihazın kontrolsüz biçimde bağlanması önlenmelidir.</p>
  
      <p>Koruma sisteminin aşağıdaki risklere karşı çözüm sunması gerekir:</p>
  
      <ul>
        <li>Aşırı akım ve kısa devre,</li>
        <li>Alternatif veya doğru akım kaçakları,</li>
        <li>Topraklama hataları,</li>
        <li>Aşırı gerilim ve yıldırım kaynaklı darbeler,</li>
        <li>Kablo ve bağlantı noktalarında aşırı ısınma,</li>
        <li>Yetkisiz kullanım veya fiziksel müdahale.</li>
      </ul>
  
      <p>Kullanılacak koruma cihazlarının türü ve teknik değerleri, şarj cihazı üreticisinin gereksinimleriyle birlikte elektrik mühendisi tarafından belirlenmelidir.</p>
  
      <h3>8. Topraklama ve Eş Potansiyel Bağlantılar Kontrol Edilmelidir</h3>
      <p>Elektrikli araç şarj ünitesi, araç gövdesiyle doğrudan elektriksel etkileşim kuran bir sistemdir. Bu nedenle binanın topraklama altyapısı ve koruma iletkenlerinin sürekliliği büyük önem taşır.</p>
  
      <p>Şarj cihazlarının bağlanacağı koruma hattı, binanın ana topraklama sistemine kesintisiz biçimde bağlanmalıdır. Otoparktaki metal kablo tavaları, panolar ve ilgili metal ekipmanlar için gerekli eş potansiyel bağlantılar oluşturulmalıdır.</p>
  
      <p>Kurulum tamamlandıktan sonra yalnızca görsel kontrol yapılmamalı; yetkili uzmanlar tarafından uygun elektriksel ölçümler gerçekleştirilmelidir. Ölçüm sonuçları kayıt altına alınmalı ve sistem devreye alma raporuyla birlikte bina yönetimine teslim edilmelidir.</p>
  
      <h3>9. Kullanıcı Bazlı Sayaç ve Ücretlendirme Sistemi Kurulmalıdır</h3>
      <p>Apartman ve sitelerde yaşanan en önemli sorunlardan biri, elektrikli araçların tükettiği enerjinin ortak elektrik giderine nasıl yansıtılacağıdır. Şarj altyapısı kurulurken enerji ölçüm ve ücretlendirme modeli baştan belirlenmelidir.</p>
  
      <p>Uygulanabilecek yöntemlerden bazıları şunlardır:</p>
  
      <ul>
        <li>Her şarj noktası için ayrı enerji sayacı kullanılması,</li>
        <li>Kullanıcıların kart veya mobil uygulamayla tanımlanması,</li>
        <li>Tüketimin daire veya kullanıcı hesabına kaydedilmesi,</li>
        <li>Ortak alan sayacı üzerinden tüketim bazlı tahsilat yapılması,</li>
        <li>Şarj hizmetinin lisanslı bir şarj ağı işletmecisi üzerinden sunulması.</li>
      </ul>
  
      <p>Her şarj cihazının doğrudan ilgili dairenin sayacına bağlanması bazı projelerde uygulanabilir olsa da uzun kablo güzergâhları, farklı kolon hatları ve ortak alan geçişleri nedeniyle her bina için uygun olmayabilir. Merkezi şarj panosu ve kullanıcı bazlı ölçüm sistemi, çok sayıda araç bulunan projelerde daha yönetilebilir bir çözüm sağlayabilir.</p>
  
      <h3>10. Ticari ve Özel Kullanım Modeli Birbirinden Ayrılmalıdır</h3>
      <p>Bir konut projesinde yalnızca kat maliklerinin veya bina sakinlerinin kullanacağı şarj sistemiyle, dışarıdaki kullanıcılara ücret karşılığında hizmet verecek ticari şarj istasyonu aynı işletme modeline sahip değildir.</p>
  
      <p>Şarj noktalarının yalnızca bina sakinlerine hizmet vermesi planlanıyorsa ortak gider paylaşımı, kullanıcı tanımlama ve tüketim ölçümü gibi konular çözümlenmelidir. Şarj hizmeti dış kullanıcılara açılacak ve ticari olarak işletilecekse EPDK düzenlemeleri, şarj ağı işletmeciliği, belediye izinleri ve ilgili diğer yükümlülükler ayrıca değerlendirilmelidir.</p>
  
      <p>Bu nedenle projenin başlangıcında şu karar açık biçimde verilmelidir:</p>
  
      <ul>
        <li>Şarj noktaları özel kullanım için mi kurulacaktır?</li>
        <li>Yalnızca site sakinleri mi erişebilecektir?</li>
        <li>Enerji bedeli kullanıcılar arasında nasıl paylaşılacaktır?</li>
        <li>Hizmet lisanslı bir işletmeciye mi verilecektir?</li>
        <li>Dışarıdan gelen araçlara ticari şarj hizmeti sunulacak mıdır?</li>
      </ul>
  
      <h3>11. Otopark Yerleşimi ve Fiziksel Koruma Sağlanmalıdır</h3>
      <p>Şarj cihazlarının konumu belirlenirken yalnızca en yakın elektrik bağlantı noktası dikkate alınmamalıdır. Araçların park biçimi, şarj soketlerinin araçlardaki farklı konumları, kablo uzunluğu ve yaya hareketleri birlikte değerlendirilmelidir.</p>
  
      <p>Cihazların araç çarpmasına açık noktalarda bulunması halinde koruyucu bariyer veya babalar kullanılabilir. Şarj kablolarının yürüyüş yollarında takılma riski oluşturması önlenmelidir.</p>
  
      <p>Yerleşim planında şu konular dikkate alınmalıdır:</p>
  
      <ul>
        <li>Şarj kablosunun araca güvenli biçimde ulaşması,</li>
        <li>Cihazın araç manevralarından korunması,</li>
        <li>Yangın çıkışları ve kaçış yollarının kapatılmaması,</li>
        <li>Havalandırma sistemlerinin engellenmemesi,</li>
        <li>Su birikmesi ve mekanik hasar riskinin azaltılması,</li>
        <li>Engelli otoparklarının kullanımının sınırlandırılmaması,</li>
        <li>Bakım personelinin cihaza kolay ulaşabilmesi.</li>
      </ul>
  
      <h3>12. Kapalı Otoparklarda Yangın Güvenliği Bir Bütün Olarak Ele Alınmalıdır</h3>
      <p>Elektrikli araç şarj altyapısı kapalı otoparkın yangın güvenliği sistemlerinden bağımsız düşünülmemelidir. Yangın algılama, acil durum aydınlatması, havalandırma, kaçış yönlendirmeleri ve yangın söndürme altyapısı birlikte değerlendirilmelidir.</p>
  
      <p>Elektrik panolarının ve kablo güzergâhlarının yangına karşı uygun bölümlerde konumlandırılması, kablo geçişlerinde yangın durdurucu uygulamalar yapılması ve acil durumda şarj sisteminin enerjisinin güvenli biçimde kesilebilmesi önemlidir.</p>
  
      <p>Şarj cihazlarının yangın çıkışlarının önüne, kaçış merdivenlerine veya itfaiye müdahalesini zorlaştıracak noktalara yerleştirilmemesi gerekir. Uygulanacak tedbirler projenin kullanım şekline, otoparkın açık veya kapalı olmasına ve ilgili yangın mevzuatına göre yetkili uzmanlar tarafından belirlenmelidir.</p>
  
      <h3>13. Güneş Enerjisi ve Enerji Depolama Sistemleriyle Uyum Düşünülmelidir</h3>
      <p>Yeni konut projelerinde elektrikli araç şarj altyapısı, çatı veya cephe üzerindeki güneş enerjisi sistemleriyle birlikte planlanabilir. Gündüz saatlerinde üretilen güneş enerjisinin ortak alanlarda veya araç şarjında değerlendirilmesi, binanın şebekeden çektiği enerjiyi azaltabilir.</p>
  
      <p>Ancak güneş enerjisi üretimi gün içerisinde değişken olduğu için üretim, bina tüketimi ve şarj talebi bir enerji yönetim sistemi üzerinden takip edilmelidir. Şarj cihazlarının yalnızca anlık güneş üretimine göre değil, binanın toplam elektrik sistemiyle uyumlu biçimde çalışması sağlanmalıdır.</p>
  
      <p>Gelecekte batarya depolama sistemi kurulması düşünülüyorsa elektrik odalarında, panolarda ve iletişim altyapısında gerekli rezervlerin proje aşamasında bırakılması uzun vadeli avantaj sağlar.</p>
  
      <h3>14. Şarj Cihazlarının Haberleşme Altyapısı Hazırlanmalıdır</h3>
      <p>Akıllı şarj cihazları yalnızca elektrik enerjisi aktarmakla kalmaz; kullanıcı tanımlama, enerji ölçme, uzaktan kontrol, arıza bildirimi ve yük yönetimi gibi işlevler de sunabilir.</p>
  
      <p>Kapalı otoparklarda mobil iletişim sinyali zayıf olabileceği için cihazların haberleşme yöntemi önceden belirlenmelidir. Ethernet kablosu, kablosuz ağ, hücresel bağlantı veya merkezi kontrol sistemi için gerekli altyapı proje aşamasında hazırlanabilir.</p>
  
      <p>Şarj sistemi için güvenilir haberleşme altyapısı kurulması şu işlevleri kolaylaştırır:</p>
  
      <ul>
        <li>Kullanıcıların kart veya uygulamayla tanımlanması,</li>
        <li>Tüketim bilgilerinin kayıt altına alınması,</li>
        <li>Uzaktan yazılım güncellemesi yapılması,</li>
        <li>Arızaların bina yönetimine bildirilmesi,</li>
        <li>Şarj gücünün merkezi olarak sınırlandırılması,</li>
        <li>Enerji raporlarının oluşturulması.</li>
      </ul>
  
      <h3>15. Devreye Alma Testleri ve Proje Teslim Belgeleri Hazırlanmalıdır</h3>
      <p>Şarj cihazlarının montajının tamamlanması sistemin kullanıma hazır olduğu anlamına gelmez. Enerji verilmeden önce elektrik tesisatının koruma, topraklama, haberleşme ve yük yönetimi işlevleri test edilmelidir.</p>
  
      <p>Devreye alma aşamasında aşağıdaki kontroller gerçekleştirilebilir:</p>
  
      <ul>
        <li>Koruma iletkeni sürekliliği,</li>
        <li>Yalıtım direnci,</li>
        <li>Topraklama ve çevrim empedansı,</li>
        <li>Kaçak akım koruma düzeni,</li>
        <li>Faz sırası ve gerilim değerleri,</li>
        <li>Acil enerji kesme fonksiyonu,</li>
        <li>Dinamik yük yönetimi senaryoları,</li>
        <li>Sayaç ve kullanıcı tanımlama sistemi,</li>
        <li>Uzaktan izleme ve haberleşme bağlantıları.</li>
      </ul>
  
      <p>Bina yönetimine uygulama projeleri, tek hat şemaları, cihaz kılavuzları, test raporları, garanti belgeleri ve bakım talimatları teslim edilmelidir. Bu belgeler ileride yapılacak bakım ve kapasite artırımı çalışmalarını kolaylaştırır.</p>
  
      <h3>Otopark Yönetmeliğinde Elektrikli Araç Şarj Alanı Zorunluluğu</h3>
      <p>Otopark Yönetmeliği kapsamında zorunlu otopark adedi 20 ve üzeri olan yeni yapılacak yapılarda, zorunlu otopark alanlarının bir adetten az olmamak üzere en az yüzde 5'inin ilgili standartlara göre şarj ünitesi dâhil elektrikli araçlara uygun biçimde düzenlenmesi şartı bulunmaktadır.</p>
  
      <p>Bu oran yalnızca mevzuatta belirtilen asgari gerekliliği ifade eder. Projede gelecekte oluşacak gerçek kullanım talebinin daha yüksek olacağı öngörülüyorsa ilave park yerleri için rezerv elektrik altyapısı hazırlanması gerekir.</p>
  
      <p>Mevzuatın istediği sayı kadar cihaz kurup geri kalan otoparklarda hiçbir altyapı bırakmamak, binanın uzun vadeli ihtiyacını karşılamayabilir. Doğru mühendislik yaklaşımı, asgari yasal şartlarla birlikte projenin gelecek yıllardaki elektrikli araç kullanımını da dikkate almaktır.</p>
  
      <h3>Yeni Konut Projesinde Uygulanabilecek Örnek Altyapı Planı</h3>
      <p>Elektrikli araç şarj altyapısı aşağıdaki aşamalarla planlanabilir:</p>
  
      <ol>
        <li>Toplam otopark sayısı ve gelecekteki şarj noktası hedefi belirlenir.</li>
        <li>Binanın elektrik güç analizi ve eş zamanlı tüketim hesabı yapılır.</li>
        <li>Elektrik dağıtım kuruluşundan gerekli bağlantı görüşü alınır.</li>
        <li>Şarj sistemine ayrılacak ana pano ve rezerv güç belirlenir.</li>
        <li>Otopark boyunca kablo tavaları ve rezerv borular projelendirilir.</li>
        <li>Her şarj noktası için ayrı koruma ve enerji ölçümü planlanır.</li>
        <li>Dinamik yük yönetimi ve kullanıcı tanımlama sistemi seçilir.</li>
        <li>Topraklama, yangın güvenliği ve fiziksel koruma detayları çözülür.</li>
        <li>İlk aşamada kurulacak cihazlar devreye alınır.</li>
        <li>Gelecekteki cihazlar için pano, kablo ve iletişim rezervi bırakılır.</li>
      </ol>
  
      <h3>Sık Sorulan Sorular</h3>
  
      <h4>Her otopark yerine hemen şarj cihazı kurulması gerekir mi?</h4>
      <p>Her park yerine ilk günden cihaz kurulması zorunlu veya ekonomik olmayabilir. Ancak gelecekte cihaz eklenebilmesi için rezerv boru, kablo tavası, pano alanı ve elektrik kapasitesi hazırlanması önemli bir avantaj sağlar.</p>
  
      <h4>Elektrikli araç normal prizden şarj edilebilir mi?</h4>
      <p>Araç üreticisinin izin verdiği taşınabilir şarj ekipmanları belirli koşullarda kullanılabilir. Ancak sürekli araç şarjı için standart prizlerin kapasitesi, kablo hattı ve koruma sistemi ayrıca değerlendirilmelidir. Yeni projelerde araca özel şarj cihazı ve ayrı elektrik hattı hazırlanması daha güvenli ve kontrol edilebilir bir çözümdür.</p>
  
      <h4>Şarj cihazı doğrudan dairenin sayacına bağlanabilir mi?</h4>
      <p>Teknik olarak bazı projelerde mümkün olabilir. Bununla birlikte daire sayacıyla park yeri arasındaki mesafe, ortak alan geçişleri, kablo kesiti ve bina elektrik mimarisi incelenmelidir. Çok sayıda araç bulunan yapılarda merkezi pano ve kullanıcı bazlı sayaç sistemi daha uygulanabilir olabilir.</p>
  
      <h4>Binanın elektrik gücü bütün araçlara yetmezse ne olur?</h4>
      <p>Dinamik yük yönetimiyle araçlara aktarılan güç sınırlandırılabilir ve mevcut kapasite araçlar arasında paylaştırılabilir. Yine de toplam talep yüksekse bağlantı gücünün artırılması veya elektrik altyapısının güçlendirilmesi gerekebilir.</p>
  
      <h4>Şarj cihazlarının tükettiği elektrik ortak gidere mi yazılır?</h4>
      <p>Bu durum kurulan ölçüm ve işletme modeline bağlıdır. Kullanıcı bazlı sayaç, kart veya uygulama sistemi kullanılarak her aracın tüketimi ayrı kaydedilebilir ve ilgili kullanıcıdan tahsil edilebilir.</p>
  
      <h4>Şarj altyapısı için belediye veya elektrik dağıtım şirketi onayı gerekir mi?</h4>
      <p>Projenin kullanım modeli, cihaz gücü, elektrik bağlantısı ve ticari işletme durumuna göre ilgili elektrik dağıtım kuruluşunun görüşü ile belediye veya diğer yetkili kurumların izinleri gerekebilir. Uygulama öncesinde güncel yerel şartlar ve mevzuat kontrol edilmelidir.</p>
  
      <h4>Elektrikli araç şarj altyapısı dairenin değerini etkiler mi?</h4>
      <p>Şarj altyapısının hazır olması, elektrikli araç kullanan veya gelecekte kullanmayı planlayan alıcılar açısından önemli bir tercih nedeni olabilir. Kablo güzergâhları, ölçüm sistemi ve güç kapasitesi hazırlanmış bir bina, sonradan altyapı kurulması gereken yapılara göre daha kullanışlı ve geleceğe hazırdır.</p>
  
      <h3>Geleceğe Hazır Konut Projesi Nasıl Olmalıdır?</h3>
      <p>Geleceğe hazır bir konut projesi yalnızca birkaç şarj cihazının monte edildiği bina değildir. Elektrik gücü, kablo altyapısı, sayaç sistemi, yük yönetimi, yangın güvenliği ve kullanıcı deneyimi birlikte planlanmış olmalıdır.</p>
  
      <p>Doğru hazırlanmış bir şarj altyapısı, binanın elektrik sistemini aşırı yüklemeden daha fazla aracın şarj edilmesini sağlar. Aynı zamanda bina sakinleri arasında enerji giderlerinin adil paylaşılmasına ve ileride yapılacak kapasite artışlarının daha düşük maliyetle gerçekleştirilmesine yardımcı olur.</p>
  
      <h3>Neli Mühendislik ile Geleceğe Hazır Yaşam Alanları</h3>
      <p><strong>Neli Mühendislik</strong> olarak konut projelerini yalnızca bugünün ihtiyaçlarına göre değil, gelecekte değişecek ulaşım ve enerji alışkanlıklarını dikkate alarak değerlendiriyoruz. Elektrik altyapısından otopark yerleşimine, yapı güvenliğinden enerji verimliliğine kadar bütün sistemlerin birbiriyle uyumlu çalışmasını önemsiyoruz.</p>
  
      <p>İzmir'de geliştirdiğimiz güncel konut projelerini, daire seçeneklerini ve mühendislik yaklaşımımızı incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' rel='noopener noreferrer' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfasını ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/elektrikli-arac.webp",
    coverImageAlt:
      "Yeni konut projesinin kapalı otoparkında elektrikli araç şarj altyapısı — Neli Mühendislik",
    category: "Elektrik Tesisatı ve Akıllı Binalar",
    tags: JSON.stringify([
      "elektrikli araç şarj altyapısı",
      "konut şarj istasyonu",
      "otopark elektrik tesisatı",
      "dinamik yük yönetimi",
      "elektrikli araç şarj ünitesi",
      "akıllı bina sistemleri",
      "İzmir konut projeleri",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Konutlarda Elektrikli Araç Şarj Altyapısı | Neli Mühendislik",
    metaDescription:
      "Yeni konut projelerinde elektrikli araç şarj altyapısı nasıl hazırlanır? Güç hesabı, kablolama, sayaç, yük yönetimi ve güvenlik detayları.",
    metaKeywords:
      "yeni konut projelerinde elektrikli araç şarj altyapısı, apartman elektrikli araç şarj istasyonu, otopark şarj ünitesi altyapısı, dinamik yük yönetimi, elektrikli araç şarj panosu, site otoparkı şarj cihazı, İzmir yeni konut projeleri, Neli Mühendislik",
    publishedAt: "2026-07-06",
  },
  {
    slug: "yeni-binalarda-isi-koprusu-kuf-olusumu-nasil-onlenir",
    title:
      "Yeni Binalarda Isı Köprüsü Nasıl Önlenir ve Küf Oluşumu Nasıl Engellenir?",
    excerpt:
      "Yeni bir binada duvar köşelerinde, kolon çevrelerinde veya pencere kenarlarında oluşan küf yalnızca boya problemi değildir. Isı köprülerinin nasıl oluştuğunu, yoğuşma riskini artıran uygulama hatalarını ve kesintisiz ısı yalıtımıyla küfün nasıl önlenebileceğini inceleyin.",
    content: `<article>
      <h2>Yeni Binalarda Isı Köprüsü ve Küf Neden Oluşur?</h2>
      <p>Yeni bir binanın dış cephesinde ısı yalıtımı bulunması, yapının her noktasında aynı ısıl performansın sağlandığı anlamına gelmez. Kolon, kiriş, döşeme kenarı, balkon bağlantısı, pencere çevresi ve çatı-duvar birleşimi gibi detaylar doğru çözülmediğinde ısı yalıtım katmanı kesintiye uğrayabilir.</p>
  
      <p>Isının çevresindeki yapı elemanlarına göre daha kolay geçtiği bu bölgeler <strong>ısı köprüsü</strong> olarak adlandırılır. Kış aylarında iç ortam ısısı bu noktalardan daha hızlı dışarı aktarılır ve iç yüzey sıcaklığı duvarın diğer bölümlerine göre düşer. Soğuyan yüzey, iç ortam havasındaki nemin yoğunlaşmasına elverişli hale gelir.</p>
  
      <p>Yüzey sıcaklığının yeterince düşmesi ve iç ortam neminin yüksek olması halinde önce görünmeyen bir nemlenme, ardından lekelenme, boya kabarması, kötü koku ve küf oluşumu meydana gelebilir. Bu nedenle küf problemi yalnızca yüzeyin temizlenmesiyle değil, nemin ve düşük yüzey sıcaklığının kaynağı belirlenerek çözülmelidir.</p>
  
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Yeni binalarda ısı köprülerini ve küf oluşumunu önlemek için ısı yalıtımı bina kabuğu boyunca kesintisiz uygulanmalı; kolon, kiriş, döşeme kenarı, balkon, pencere çevresi, çatı ve temel birleşimleri projede ayrıntılı olarak çözülmelidir. Ayrıca yağmur ve tesisat sızıntıları engellenmeli, pencere montaj boşlukları hava ve su geçirmez biçimde kapatılmalı ve iç ortam nemi düzenli havalandırmayla kontrol altında tutulmalıdır.
      </blockquote>
  
      <h3>Isı Köprüsü Nedir?</h3>
      <p>Isı köprüsü, bina kabuğunun çevresindeki alanlara göre daha yüksek ısı iletimine sahip bölümüdür. Bu durum yapı elemanının geometrisinden, farklı malzemelerin birleşmesinden veya ısı yalıtımının kesintiye uğramasından kaynaklanabilir.</p>
  
      <p>Örneğin dış duvardaki dolgu malzemesinin ısıl performansı ile betonarme kolonun ısıl performansı aynı değildir. Kolonun dış yüzeyi yeterli yalıtım kalınlığıyla kaplanmazsa betonarme bölüm, dış duvar içerisinde ısı kaybının yoğunlaştığı bir hat oluşturabilir.</p>
  
      <p>Isı köprüleri genellikle iki ana grupta değerlendirilir:</p>
  
      <ul>
        <li><strong>Malzeme kaynaklı ısı köprüleri:</strong> Isı iletkenlik değerleri farklı yapı malzemelerinin birleştiği bölgelerde oluşur. Betonarme kolon ile dolgu duvar birleşimi buna örnektir.</li>
        <li><strong>Geometrik ısı köprüleri:</strong> Dış yüzey alanının iç yüzey alanından daha büyük olduğu bina köşeleri, çıkmalar ve birleşim detaylarında meydana gelir.</li>
      </ul>
  
      <p>Bunun yanında yalıtım levhaları arasındaki boşluklar, hatalı dübel uygulamaları, eksik yalıtım, metal bağlantı parçaları ve yanlış pencere montajları da yerel ısı köprüleri oluşturabilir.</p>
  
      <h3>Isı Köprüsü Küf Oluşumuna Nasıl Neden Olur?</h3>
      <p>İç ortam havası belirli miktarda su buharı içerir. Havanın taşıyabileceği nem miktarı sıcaklığa bağlıdır. Sıcak ve nemli iç ortam havası, sıcaklığı daha düşük bir yüzeyle karşılaştığında yüzeye yakın hava tabakası soğur.</p>
  
      <p>Yüzey sıcaklığı kritik seviyenin altına düştüğünde yüzey bağıl nemi yükselir. Şartların devam etmesi halinde önce küf gelişimine uygun nem koşulları, daha ileri durumda ise yüzey yoğuşması meydana gelebilir.</p>
  
      <p>Küf oluşması için duvar üzerinde gözle görülür su damlalarının bulunması şart değildir. Uzun süre yüksek kalan yüzey nemi de küf sporlarının gelişmesi için uygun ortam oluşturabilir. Bu nedenle duvarın kuru görünmesi, detayın güvenli olduğu anlamına gelmez.</p>
  
      <p>Isı köprüsü bulunan bölgelerde aşağıdaki süreç yaşanabilir:</p>
  
      <ol>
        <li>İç ortam ısısı yapı elemanından daha hızlı dışarı aktarılır.</li>
        <li>Duvarın veya tavanın iç yüzey sıcaklığı düşer.</li>
        <li>Soğuk yüzeye yakın havanın bağıl nemi yükselir.</li>
        <li>Yüzey uzun süre nemli kalır veya yoğuşma oluşur.</li>
        <li>Boya, sıva ve duvar kaplaması üzerinde küf gelişmeye başlar.</li>
      </ol>
  
      <h3>Isı Köprüsü ile Su Sızıntısı Nasıl Ayırt Edilir?</h3>
      <p>Duvar üzerindeki her nem ve küf lekesi ısı köprüsünden kaynaklanmaz. Çatıdan veya cepheden alınan yağmur suyu, temiz su tesisatı kaçağı, atık su hattı sorunu, balkon süzgeci sızıntısı, temel nemi ve klima drenaj hattı gibi farklı nedenler benzer belirtiler gösterebilir.</p>
  
      <p>Isı köprüsüne bağlı küf çoğunlukla kış aylarında; dış duvar köşelerinde, kolon-kiriş hatlarında, pencere kenarlarında ve mobilya arkasında belirginleşir. Lekeler genellikle soğuk yüzey geometrisini takip eder.</p>
  
      <p>Su sızıntısında ise aşağıdaki belirtiler görülebilir:</p>
  
      <ul>
        <li>Yağmur sonrasında büyüyen veya rengi koyulaşan lekeler,</li>
        <li>Belirli bir tesisatın kullanımıyla artan nem,</li>
        <li>Sıvada kabarma, tuzlanma veya yüzeyden malzeme dökülmesi,</li>
        <li>Mevsimden bağımsız olarak devam eden yoğun ıslaklık,</li>
        <li>Tavan veya duvar üzerinde düzensiz su izleri.</li>
      </ul>
  
      <p>Doğru teşhis için nem ölçümü, termal kamera incelemesi, tesisat basınç testi ve cephe-su yalıtımı kontrolleri birlikte değerlendirilebilir. Yalnızca küfün görüntüsüne bakarak kesin neden belirlemek her zaman mümkün değildir.</p>
  
      <h3>Yeni Binalarda Isı Köprüsü En Çok Nerelerde Görülür?</h3>
      <p>Isı köprüleri, bina kabuğunda farklı yapı elemanlarının birleştiği veya yalıtım katmanının devamlılığının zorlaştığı bölgelerde yoğunlaşır.</p>
  
      <p>Yeni konut projelerinde özellikle şu detaylar kontrol edilmelidir:</p>
  
      <ul>
        <li>Betonarme kolon ile dolgu duvar birleşimleri,</li>
        <li>Kirişlerin ve döşeme kenarlarının dış cepheye ulaştığı hatlar,</li>
        <li>Balkon döşemelerinin iç döşemeyle birleştiği bölgeler,</li>
        <li>Pencere ve dış kapı kasalarının çevresi,</li>
        <li>Pencere denizlikleri ve lento bölgeleri,</li>
        <li>Dış duvarların iç köşeleri,</li>
        <li>Teras ve çatı parapetleri,</li>
        <li>Çatı ile dış duvar birleşimleri,</li>
        <li>Zemin kat döşemesi ile dış duvar birleşimi,</li>
        <li>Bodrum tavanı ve ısıtılan hacim sınırları,</li>
        <li>Konsol çıkmalar ve kapalı çıkmalar,</li>
        <li>Cephedeki metal ankraj ve bağlantı elemanları,</li>
        <li>Tesisat şaftları ve yalıtımın kesildiği geçişler.</li>
      </ul>
  
      <h3>Kolon ve Kirişlerde Isı Köprüsü Nasıl Önlenir?</h3>
      <p>Betonarme kolon ve kirişler, dolgu duvar malzemelerine göre farklı ısı iletim özelliklerine sahiptir. Bu elemanların dış yüzeylerinin yalıtımsız bırakılması veya yetersiz kalınlıkta yalıtılması durumunda cephede betonarme iskeleti takip eden soğuk bölgeler oluşabilir.</p>
  
      <p>En etkili yaklaşım, dış cephe ısı yalıtımının kolon, kiriş ve dolgu duvar yüzeyleri boyunca kesintisiz devam etmesidir. Yalıtım levhalarının betonarme yüzeylerde inceltilmesi, tamamen kesilmesi veya yalnızca dolgu duvar üzerine uygulanması ısı köprüsü riskini artırır.</p>
  
      <p>Uygulama sırasında şu ayrıntılara dikkat edilmelidir:</p>
  
      <ul>
        <li>Yalıtım levhaları arasında açık derz bırakılmamalıdır.</li>
        <li>Levha birleşimleri kolon ve duvar birleşim çizgileriyle mümkün olduğunca çakıştırılmamalıdır.</li>
        <li>Yüzey bozuklukları yapıştırıcı kalınlığıyla rastgele kapatılmamalıdır.</li>
        <li>Dübel sayısı, tipi ve yerleşimi sistem detayına uygun olmalıdır.</li>
        <li>Köşelerde fileli köşe profilleri ve yeterli donatı filesi kullanılmalıdır.</li>
        <li>Farklı malzemelerin birleştiği bölgelerde çatlak riskine karşı uygun sıva ve file detayları uygulanmalıdır.</li>
      </ul>
  
      <h3>Döşeme Kenarlarında Kesintisiz Yalıtım Neden Önemlidir?</h3>
      <p>Kat döşemelerinin dış cepheye ulaştığı döşeme alınları, binalarda uzun ve kesintisiz ısı köprüsü hatları oluşturabilir. Bu bölgelerin yalnızca duvar yüzeyiyle aynı hizada sıvanması, betonarme döşeme kenarının doğrudan dış ortamla temas etmesine neden olur.</p>
  
      <p>Dış cephe yalıtımı döşeme alınlarını da kaplayarak katlar boyunca devam etmelidir. Isı yalıtım levhalarının kat hizalarında kesilmesi veya dekoratif cephe detayları nedeniyle inceltilmesi, iç yüzeyde tavan-duvar birleşimlerinin soğumasına yol açabilir.</p>
  
      <p>Döşeme kenarlarındaki ısı köprüleri, daire içerisinde çoğunlukla dış duvarın tavanla birleştiği hatta yatay küf lekeleri olarak ortaya çıkar. Bu belirti yalnızca boya yenilenerek kalıcı biçimde giderilemez.</p>
  
      <h3>Balkon Döşemeleri Neden Kritik Bir Isı Köprüsüdür?</h3>
      <p>İç mekândaki betonarme döşemenin kesintisiz biçimde dışarı uzanarak balkon oluşturması, iç ve dış ortam arasında güçlü bir ısı iletim yolu meydana getirebilir. Balkon döşemesinin yalnızca üst veya alt yüzeyine sınırlı yalıtım uygulanması, birleşim bölgesindeki ısı akışını tamamen ortadan kaldırmayabilir.</p>
  
      <p>Balkon detayları proje aşamasında değerlendirilerek aşağıdaki çözümlerden uygun olanı seçilebilir:</p>
  
      <ul>
        <li>Taşıyıcı sisteme uygun ısı yalıtımlı balkon bağlantı elemanlarının kullanılması,</li>
        <li>Balkonun ana bina taşıyıcı sisteminden bağımsız olarak tasarlanması,</li>
        <li>Balkon döşemesinin üst, alt ve alın yüzeylerinde süreklilik sağlayan yalıtım detaylarının hazırlanması,</li>
        <li>Kapı eşiği, su yalıtımı ve ısı yalıtımının birlikte çözülmesi.</li>
      </ul>
  
      <p>Taşıyıcı sisteme ilişkin balkon çözümleri mutlaka statik proje müellifiyle birlikte değerlendirilmelidir. Isı köprüsünü azaltmak amacıyla betonarme taşıyıcı elemanlarda proje dışı kesme, delme veya değişiklik yapılmamalıdır.</p>
  
      <h3>Pencere Çevresindeki Isı Köprüleri Nasıl Önlenir?</h3>
      <p>Pencereler, dış duvardaki ısı yalıtım sisteminin kesintiye uğradığı en hassas noktalardan biridir. Yüksek performanslı bir pencere doğraması kullanılsa bile kasa ile duvar birleşimi yanlış çözülürse hava sızıntısı, yüzey soğuması ve küf meydana gelebilir.</p>
  
      <p>Pencere montajında yalnızca kasa ile duvar arasındaki boşluğa köpük uygulanması, uzun vadeli hava ve nem kontrolü için tek başına yeterli bir detay değildir. Montaj birleşiminin iç, orta ve dış katmanları kullanım şartlarına uygun biçimde çözülmelidir.</p>
  
      <p>Pencere detayında şu konular önemlidir:</p>
  
      <ul>
        <li>Doğramanın ısı yalıtım düzlemine uygun konumlandırılması,</li>
        <li>Dış cephe yalıtımının pencere kasasına doğru devam ettirilmesi,</li>
        <li>Pencere sövelerinin yeterli kalınlıkta yalıtılması,</li>
        <li>Kasa-duvar birleşiminin hava ve su sızdırmazlığının sağlanması,</li>
        <li>Dış tarafta yağmur suyunun tahliye edilebilmesi,</li>
        <li>Denizlik altında yalıtım ve su yalıtımı sürekliliğinin korunması,</li>
        <li>Isı iletkenliği yüksek metal parçaların kontrol edilmesi,</li>
        <li>İç yüzeyde soğuk hava sızıntısı oluşturacak boşlukların kapatılması.</li>
      </ul>
  
      <h3>Doğrama Seçimi Küf Riskini Etkiler mi?</h3>
      <p>Doğramanın çerçeve sistemi, cam özellikleri, ara boşluk yapısı, sızdırmazlık contaları ve montaj kalitesi pencerenin iç yüzey sıcaklığını etkiler. Isıl performansı yetersiz bir pencere sisteminde cam kenarları ve çerçeveler soğuyabilir.</p>
  
      <p>Bununla birlikte yüksek performanslı ve hava sızdırmaz yeni doğramalar takıldığında binanın kontrolsüz doğal hava değişimi azalabilir. Kullanıcı havalandırma alışkanlıklarını değiştirmezse iç ortam nemi yükselerek duvar köşelerinde küf riskini artırabilir.</p>
  
      <p>Bu nedenle pencere seçimi ile havalandırma çözümü birlikte düşünülmelidir. Hava sızdırmazlık enerji verimliliği açısından önemlidir; ancak içeride oluşan su buharının kontrollü biçimde dışarı atılması da gerekir.</p>
  
      <h3>Çatı ve Parapet Birleşimlerinde Isı Köprüsü Nasıl Önlenir?</h3>
      <p>Çatı döşemesi, teras, parapet ve dış duvar birleşimleri hem ısı hem de su yalıtımı açısından kritik detaylardır. Isı yalıtımının parapet dibinde veya çatı kenarında kesilmesi, üst kat dairelerin tavan köşelerinde yüzey sıcaklığının düşmesine neden olabilir.</p>
  
      <p>Parapet duvarlarının yalnızca dış yüzeyinin yalıtılması her durumda yeterli olmayabilir. Parapetin üstü, iç yüzeyi, dış yüzeyi ve çatı yalıtımı arasındaki süreklilik proje detayında birlikte değerlendirilmelidir.</p>
  
      <p>Çatı detaylarında şu konular kontrol edilmelidir:</p>
  
      <ul>
        <li>Çatı ısı yalıtımının dış duvar yalıtımıyla kesintisiz birleşmesi,</li>
        <li>Parapetlerde ısı yalıtımının sürekliliği,</li>
        <li>Su yalıtımının parapete yeterli yükseklikte döndürülmesi,</li>
        <li>Harpuşta ve kapak elemanlarında yağmur suyu tahliyesi,</li>
        <li>Süzgeç ve iniş noktalarının doğru konumlandırılması,</li>
        <li>Çatı kaplaması altındaki havalandırma gereksinimleri,</li>
        <li>Yalıtımı delen metal bağlantıların etkisi.</li>
      </ul>
  
      <h3>Zemin, Temel ve Bodrum Kat Birleşimleri Nasıl Çözülmelidir?</h3>
      <p>Isıtılan yaşam alanlarının zeminle, açık otoparkla, bodrumla veya ısıtılmayan hacimlerle sınır oluşturduğu bölgelerde ısı yalıtımı sürekliliği korunmalıdır. Dış duvar yalıtımının zemin seviyesinde sonlandırılması, döşeme kenarında soğuk bir hat oluşturabilir.</p>
  
      <p>Subasman, temel ve bodrum duvarlarında kullanılacak ısı yalıtım malzemeleri; neme, zemin basıncına ve uygulama koşullarına uygun seçilmelidir. Isı yalıtımı ile su yalıtımı birbirine zarar vermeyecek ve süreklilik oluşturacak biçimde detaylandırılmalıdır.</p>
  
      <p>Zemin katlardaki küf problemi değerlendirilirken yalnızca ısı köprüsü değil, zeminden yükselen nem, drenaj eksikliği, temel su yalıtımı ve dış zemin kotları da kontrol edilmelidir.</p>
  
      <h3>Dıştan Isı Yalıtımı Isı Köprülerine Karşı Neden Etkilidir?</h3>
      <p>Dıştan uygulanan kesintisiz ısı yalıtımı, betonarme taşıyıcı elemanlar ile dolgu duvarları dış ortamdan ortak bir yalıtım katmanıyla ayırır. Böylece yapı kabuğundaki sıcaklık farklılıkları ve ısı köprüsü etkileri azaltılabilir.</p>
  
      <p>Dıştan yalıtımın başlıca avantajları şunlardır:</p>
  
      <ul>
        <li>Kolon, kiriş ve döşeme alınlarını birlikte kaplayabilmesi,</li>
        <li>İç yüzey sıcaklıklarının daha dengeli kalmasına yardımcı olması,</li>
        <li>Taşıyıcı sistemin sıcaklık değişimlerinden daha az etkilenmesi,</li>
        <li>İç mekânda kullanım alanı kaybı oluşturmaması,</li>
        <li>Doğru uygulandığında çok sayıdaki doğrusal ısı köprüsünü azaltması.</li>
      </ul>
  
      <p>Ancak dıştan yalıtım yapılması bütün ısı köprülerinin otomatik olarak çözüldüğü anlamına gelmez. Balkonlar, pencere montajları, parapetler, metal bağlantılar, giriş saçakları ve tesisat geçişleri ayrıca detaylandırılmalıdır.</p>
  
      <h3>İçten Isı Yalıtımı Küf Sorununu Çözer mi?</h3>
      <p>İçten ısı yalıtımı bazı mevcut bina uygulamalarında gerekli olabilir; ancak yoğuşma ve ısı köprüsü hesabı yapılmadan uygulanması halinde duvarın iç katmanlarında nem birikimi riski oluşturabilir.</p>
  
      <p>İçten yalıtım uygulandığında mevcut duvar daha soğuk kalabilir. Buhar kontrol katmanındaki süreksizlikler, priz boşlukları veya birleşim hatları üzerinden yapı elemanına ulaşan nem iç katmanlarda yoğuşabilir.</p>
  
      <p>Ayrıca içten yalıtımın döşeme, iç duvar ve kolon birleşimlerinde kesilmesi yeni ısı köprüleri oluşturabilir. Bu nedenle içten yalıtım, yalnızca malzeme levhasının duvara yapıştırılması olarak görülmemeli; uzmanlar tarafından higrotermal performans ve birleşim detayları değerlendirilmelidir.</p>
  
      <h3>Buhar Kesici Her Duvara Uygulanmalı mıdır?</h3>
      <p>Buhar kesici veya buhar kontrol katmanı ihtiyacı; yapının iklim bölgesine, iç ortam kullanımına, duvar katmanlarına, yalıtımın konumuna ve malzemelerin su buharı geçirgenliğine göre belirlenir.</p>
  
      <p>Her duvar sistemine aynı katmanın eklenmesi doğru değildir. Yanlış konumlandırılan buhar geçirimsiz katman, yapı elemanı içerisinde nemin hapsolmasına neden olabilir.</p>
  
      <p>Duvar ve çatı katmanlarının tasarımında şu değerlendirmeler yapılmalıdır:</p>
  
      <ul>
        <li>İç ve dış ortam sıcaklıkları,</li>
        <li>İç ortam nem yükü,</li>
        <li>Malzemelerin su buharı geçirgenliği,</li>
        <li>Yalıtım katmanının konumu,</li>
        <li>Katmanlar arası yoğuşma riski,</li>
        <li>Yapı elemanının kuruma yönü ve kuruma kapasitesi.</li>
      </ul>
  
      <h3>Havalandırma Küf Oluşumunu Nasıl Engeller?</h3>
      <p>İnsanların solunumu, duş, yemek pişirme, çamaşır kurutma ve temizlik gibi günlük faaliyetler iç ortamda su buharı oluşturur. Bu nem düzenli olarak dışarı atılmazsa iç ortam bağıl nemi yükselir.</p>
  
      <p>Havalandırma duvar yüzeyindeki ısı köprüsünü ortadan kaldırmaz; ancak havadaki nemi azaltarak soğuk yüzeylerde küf ve yoğuşma oluşma riskini düşürür. Kalıcı çözüm için hem yapı kabuğu hem de iç ortam nemi birlikte kontrol edilmelidir.</p>
  
      <p>Konutlarda şu uygulamalar yararlı olabilir:</p>
  
      <ul>
        <li>Gün içerisinde düzenli ve etkili doğal havalandırma yapılması,</li>
        <li>Banyo ve mutfak aspiratörlerinin doğrudan dış ortama tahliye edilmesi,</li>
        <li>Duş sonrasında banyo neminin kısa sürede uzaklaştırılması,</li>
        <li>Çamaşırların mümkün olduğunca yaşam alanlarında kurutulmaması,</li>
        <li>Mekanik havalandırma menfezlerinin kapatılmaması,</li>
        <li>Gerekli projelerde ısı geri kazanımlı havalandırma sistemlerinin değerlendirilmesi,</li>
        <li>İç ortam neminin bir nem ölçerle takip edilmesi.</li>
      </ul>
  
      <p>Pencereleri bütün gün çok az açık bırakmak yerine, dış ortam koşulları uygunsa kısa süreli ve etkili çapraz havalandırma yapmak iç ortam havasının daha hızlı yenilenmesine yardımcı olabilir.</p>
  
      <h3>Mobilya Yerleşimi Küf Oluşumunu Etkiler mi?</h3>
      <p>Büyük dolapların ve yatak başlıklarının soğuk dış duvarlara tamamen yaslanması, duvar yüzeyindeki hava dolaşımını azaltabilir. Yüzey yeterince ısınamaz ve duvar ile mobilya arasında nemli bir mikroklima oluşabilir.</p>
  
      <p>Özellikle dış duvar köşelerinde, kuzeye bakan cephelerde ve ısı köprüsü riski bulunan bölgelerde mobilya ile duvar arasında hava dolaşımına izin verecek boşluk bırakılması yararlı olabilir.</p>
  
      <p>Ancak mobilyayı duvardan uzaklaştırmak yapısal ısı köprüsünü çözmez. Bu uygulama yalnızca yüzeydeki hava hareketini iyileştirerek riski azaltabilir. Duvar sıcaklığı teknik olarak yetersizse yalıtım detayı ayrıca düzeltilmelidir.</p>
  
      <h3>Isıtma Şekli Küf Riskini Nasıl Etkiler?</h3>
      <p>Konutun bazı odalarının sürekli soğuk bırakılması, kapıların kapalı tutulması veya ısıtmanın uzun süre tamamen durdurulması dış duvarların yüzey sıcaklığını düşürebilir. Nemli hava daha soğuk odalara taşındığında bu yüzeylerde küf oluşabilir.</p>
  
      <p>Dengeli ve kontrollü ısıtma, iç yüzey sıcaklıklarının aşırı düşmesini önlemeye yardımcı olur. Bununla birlikte yalnızca ortam sıcaklığını yükseltmek, su sızıntısı veya ciddi bir ısı köprüsü problemini ortadan kaldırmaz.</p>
  
      <p>Enerji verimli bir yapıda amaç; yüksek enerji tüketerek yüzeyleri sıcak tutmak yerine, iyi tasarlanmış bina kabuğu sayesinde düşük enerjiyle dengeli iç ortam şartları oluşturmaktır.</p>
  
      <h3>Termal Kamera ile Isı Köprüsü Tespit Edilebilir mi?</h3>
      <p>Termal kamera, yapı yüzeylerindeki sıcaklık farklılıklarını görüntüleyerek ısı köprüleri, yalıtım boşlukları ve hava sızıntıları hakkında önemli bilgiler sağlayabilir. Ancak termal görüntü tek başına kesin teşhis olarak değerlendirilmemelidir.</p>
  
      <p>Doğru termal inceleme için iç ve dış ortam arasında yeterli sıcaklık farkı bulunması, güneş ışınımı, rüzgâr, yağmur ve ısıtma koşulları gibi etkenlerin dikkate alınması gerekir.</p>
  
      <p>Termal kamera incelemesi şu kontrollerle desteklenebilir:</p>
  
      <ul>
        <li>İç ortam sıcaklığı ve bağıl nem ölçümü,</li>
        <li>Temaslı yüzey sıcaklığı ölçümü,</li>
        <li>Duvar ve sıva nemi ölçümü,</li>
        <li>Hava sızdırmazlık incelemesi,</li>
        <li>Elektrik ve mekanik tesisat kaçağı kontrolü,</li>
        <li>Proje ve uygulama detaylarının karşılaştırılması.</li>
      </ul>
  
      <h3>Yüzey Sıcaklığı ve Çiy Noktası Neden Birlikte Değerlendirilir?</h3>
      <p>Çiy noktası, havadaki su buharının mevcut nem koşullarında yoğuşmaya başlayabileceği sıcaklıktır. İç yüzey sıcaklığı çiy noktası sıcaklığına yaklaştıkça yoğuşma riski yükselir.</p>
  
      <p>Ancak küf gelişimi gözle görülür yoğuşma başlamadan önce de mümkün olabilir. Bu nedenle değerlendirme yalnızca “duvarda su damlası var mı?” sorusuna indirgenmemelidir. İç yüzey sıcaklığının ve yüzey bağıl neminin küf gelişimine elverişli koşullarda ne kadar süre kaldığı da önemlidir.</p>
  
      <p>Profesyonel hesaplamalarda dış iklim verileri, iç ortam sıcaklığı, nem sınıfı, yapı elemanının ısıl direnci ve birleşim geometrisi birlikte değerlendirilir.</p>
  
      <h3>Isı Köprüsü Proje Aşamasında Nasıl Hesaplanır?</h3>
      <p>Isı köprülerinin etkisi, yalnızca duvarın metrekare başına ısı geçirgenlik değeriyle belirlenemez. Duvar, döşeme, çatı ve pencere gibi yapı elemanlarının birleşimlerinde oluşan ilave ısı akışı ayrıca değerlendirilmelidir.</p>
  
      <p>Projede doğrusal ve noktasal ısı köprüleri hesaplanabilir. Karmaşık detaylarda iki veya üç boyutlu ısı akışı analizleri kullanılarak iç yüzey sıcaklıkları ve ısı kayıpları belirlenebilir.</p>
  
      <p>Hesaplamalarda özellikle şu sonuçlar incelenir:</p>
  
      <ul>
        <li>Birleşim detayındaki ilave ısı kaybı,</li>
        <li>En düşük iç yüzey sıcaklığı,</li>
        <li>Yüzey yoğuşması ve küf oluşumu riski,</li>
        <li>Yalıtım katmanının sürekliliği,</li>
        <li>Malzeme ve bağlantı alternatiflerinin performansı.</li>
      </ul>
  
      <h3>TS 825:2024 Kapsamında Isı Yalıtımı Neden Önemlidir?</h3>
      <p>Türkiye’de yeni binaların ısı yalıtımı ve enerji performansı, yürürlükteki mevzuat ve güncel standartlar doğrultusunda projelendirilmelidir. TS 825:2024 Binalarda Isı Yalıtım Kuralları standardı, 1 Nisan 2025 itibarıyla zorunlu standart olarak uygulanmaya başlanmıştır.</p>
  
      <p>Güncel düzenlemelerle iklim bölgeleri ve enerji performansı hesaplama yaklaşımı yenilenmiştir. Ancak bir yapının yalnızca toplam enerji ihtiyacı sınırlarını karşılaması, her birleşim detayında küf riskinin ortadan kalktığı anlamına gelmez.</p>
  
      <p>Isı yalıtım raporundaki hesapların uygulama projeleriyle uyumlu olması, proje detaylarının şantiyede doğru uygulanması ve özellikle ısı köprülerinin saha kontrolleriyle doğrulanması gerekir.</p>
  
      <h3>Şantiyede Isı Yalıtımı Uygulanırken Nelere Dikkat Edilmelidir?</h3>
      <p>İyi hazırlanmış bir ısı yalıtım projesi, uygulama sırasında yapılan hatalar nedeniyle performansını kaybedebilir. Bu nedenle malzeme seçimi kadar işçilik ve kalite kontrolü de önemlidir.</p>
  
      <p>Şantiye uygulamasında aşağıdaki kontroller yapılmalıdır:</p>
  
      <ul>
        <li>Yalıtım malzemesinin projedeki tür, kalınlık ve teknik özelliklerle uyumlu olması,</li>
        <li>Yüzeyin uygulamaya uygun, temiz ve taşıyıcı durumda bulunması,</li>
        <li>Yalıtım levhalarının şaşırtmalı ve boşluksuz yerleştirilmesi,</li>
        <li>Levhalar arasındaki büyük boşlukların sıva veya yapıştırıcıyla doldurulmaması,</li>
        <li>Kolon, kiriş ve döşeme alınlarında yalıtımın devam etmesi,</li>
        <li>Pencere söveleri ve denizlik altlarının yalıtılması,</li>
        <li>Dübel ve yapıştırıcı uygulamasının sistem tarifine uygun olması,</li>
        <li>Donatı filesinin yeterli bindirme payıyla uygulanması,</li>
        <li>Kapı, pencere ve cephe birleşimlerinin su sızdırmazlığının sağlanması,</li>
        <li>Teras, parapet ve temel birleşimlerinde ısı-su yalıtımı sürekliliğinin korunması.</li>
      </ul>
  
      <h3>Yeni Daire Teslim Alırken Isı Köprüsü Nasıl Kontrol Edilir?</h3>
      <p>Daire teslimi sırasında ısı köprülerinin tamamı gözle tespit edilemeyebilir. Özellikle yaz aylarında yapılan kontrollerde iç ve dış ortam sıcaklıkları birbirine yakın olduğundan soğuk yüzeyler belirgin olmayabilir.</p>
  
      <p>Bununla birlikte alıcılar aşağıdaki konuları kontrol edebilir:</p>
  
      <ul>
        <li>Dış duvar köşelerinde renk değişimi veya nem kokusu bulunup bulunmadığı,</li>
        <li>Pencere çevrelerinde çatlak, açıklık ve hava sızıntısı olup olmadığı,</li>
        <li>Denizlik altlarında su izi veya boya kabarması bulunup bulunmadığı,</li>
        <li>Tavan-duvar birleşimlerinde yatay lekeler görülüp görülmediği,</li>
        <li>Banyo ve mutfak havalandırmasının çalışıp çalışmadığı,</li>
        <li>Çatı, balkon ve teras süzgeçlerinin doğru çalışıp çalışmadığı,</li>
        <li>Isı yalıtım projesi ve Enerji Kimlik Belgesi'nin bulunup bulunmadığı,</li>
        <li>Uygulanan dış cephe sisteminin malzeme ve kalınlık bilgilerinin belgelenip belgelenmediği.</li>
      </ul>
  
      <p>Daha kapsamlı bir inceleme için uygun hava koşullarında termal kamera kontrolü ve yüzey sıcaklığı ölçümü yapılabilir.</p>
  
      <h3>Küflenen Duvarın Üzerini Boyamak Yeterli midir?</h3>
      <p>Küflü yüzeyin temizlenmesi ve yeniden boyanması, görünümü geçici olarak iyileştirebilir. Ancak ısı köprüsü, su sızıntısı veya yüksek iç ortam nemi devam ediyorsa küf kısa süre sonra yeniden oluşabilir.</p>
  
      <p>Kalıcı çözüm için aşağıdaki sıra izlenmelidir:</p>
  
      <ol>
        <li>Nemin kaynağı belirlenmelidir.</li>
        <li>Su sızıntısı varsa onarılmalıdır.</li>
        <li>Isı köprüsü ve yalıtım süreksizliği düzeltilmelidir.</li>
        <li>Havalandırma ve ısıtma koşulları iyileştirilmelidir.</li>
        <li>Yüzey tamamen kuruduktan sonra uygun temizlik ve yenileme işlemi yapılmalıdır.</li>
      </ol>
  
      <p>Küf temizliği sırasında sporların yaşam alanına yayılmaması ve kullanılan ürünlerin yüzey malzemesine zarar vermemesi gerekir. Geniş alanlara yayılan veya sürekli tekrarlayan küf problemlerinde uzman desteği alınmalıdır.</p>
  
      <h3>Isı Yalıtımı Kalınlığı Tek Başına Yeterli midir?</h3>
      <p>Isı yalıtımının kalınlığı bina performansı açısından önemlidir; ancak tek başına yeterli değildir. Çok kalın bir yalıtım levhası kullanılması, yanlış balkon, pencere veya parapet detaylarını otomatik olarak düzeltmez.</p>
  
      <p>Başarılı bir bina kabuğu için şu dört unsur birlikte sağlanmalıdır:</p>
  
      <ul>
        <li>İklim koşullarına uygun yalıtım kalınlığı,</li>
        <li>Düşük ısı iletkenliğine sahip uygun malzeme,</li>
        <li>Bina kabuğu boyunca kesintisiz uygulama,</li>
        <li>Doğru hava, su ve buhar kontrolü.</li>
      </ul>
  
      <p>Bu nedenle ürün etiketi kadar sistemin tamamı ve uygulama detayları değerlendirilmelidir.</p>
  
      <h3>Isı Köprüleri Enerji Tüketimini Nasıl Etkiler?</h3>
      <p>Isı köprüleri yalnızca küf ve yüzey yoğuşması problemi oluşturmaz. Bina kabuğundaki ilave ısı kayıpları nedeniyle kışın ısıtma, yazın ise soğutma ihtiyacını artırabilir.</p>
  
      <p>Yüzey sıcaklıklarının dengesiz olması kullanıcıların konforunu da etkiler. Oda havası yeterli sıcaklıkta olsa bile soğuk duvar ve pencere yüzeyleri nedeniyle kullanıcı kendisini rahatsız hissedebilir ve ısıtma sistemini daha yüksek sıcaklıkta çalıştırabilir.</p>
  
      <p>Kesintisiz ve doğru tasarlanmış yalıtım sistemi; enerji tüketimini azaltmanın yanında iç yüzey sıcaklıklarını daha dengeli tutarak yaşam konforunu iyileştirir.</p>
  
      <h3>Sık Sorulan Sorular</h3>
  
      <h4>Yeni bir binada küf oluşması normal midir?</h4>
      <p>Yeni yapılarda sıva, şap ve beton gibi malzemelerin içerdiği yapım nemi bir süre devam edebilir. Ancak tekrarlayan veya belirli yapı detaylarını takip eden küf normal kabul edilmemeli; havalandırma, su sızıntısı ve ısı köprüsü açısından incelenmelidir.</p>
  
      <h4>Dış cephede mantolama varsa küf oluşur mu?</h4>
      <p>Evet. Yalıtımın kesintiye uğraması, pencere çevrelerinin hatalı uygulanması, balkon ısı köprüleri, su sızıntıları veya yetersiz havalandırma nedeniyle yalıtımlı binalarda da küf oluşabilir.</p>
  
      <h4>Küf yalnızca kuzey cephede mi oluşur?</h4>
      <p>Kuzeye bakan ve daha az güneş alan yüzeylerde risk artabilir; ancak küf bütün cephelerde oluşabilir. Belirleyici olan yüzey sıcaklığı, nem, hava dolaşımı ve yapı detaylarıdır.</p>
  
      <h4>Pencere camındaki buğulanma ısı köprüsü olduğunu gösterir mi?</h4>
      <p>Camın oda tarafındaki yüzeyinde oluşan buğulanma, iç ortam neminin yüksek veya cam yüzey sıcaklığının düşük olduğunu gösterebilir. Cam ünitesinin ara boşluğunda oluşan buğulanma ise yalıtım camı sızdırmazlığında sorun bulunduğuna işaret edebilir.</p>
  
      <h4>Termal kamera kontrolü hangi mevsimde yapılmalıdır?</h4>
      <p>Isı köprülerinin belirgin biçimde görüntülenebilmesi için iç ve dış ortam arasında yeterli sıcaklık farkı bulunması gerekir. Bu nedenle inceleme koşulları uzman tarafından güneş, rüzgâr, yağış ve ısıtma durumu dikkate alınarak belirlenmelidir.</p>
  
      <h4>Nem alma cihazı küfü tamamen önler mi?</h4>
      <p>Nem alma cihazı iç ortam nemini azaltarak riski düşürebilir; ancak su sızıntısını, eksik yalıtımı veya yapısal ısı köprüsünü ortadan kaldırmaz. Kalıcı çözüm için sorunun kaynağı giderilmelidir.</p>
  
      <h4>Isı köprüsü sonradan düzeltilebilir mi?</h4>
      <p>Birçok ısı köprüsü uygun dış cephe yalıtımı, pencere birleşimlerinin yenilenmesi veya çatı ve balkon detaylarının düzeltilmesiyle azaltılabilir. Ancak müdahale yöntemi taşıyıcı sistem, cephe ve su yalıtımı birlikte incelenerek belirlenmelidir.</p>
  
      <h4>Kalın perde kullanmak küfü artırır mı?</h4>
      <p>Kalın perdeler pencere ve dış duvar önündeki sıcak hava dolaşımını azaltabilir. Yüzey zaten soğuksa perde arkasında nem birikmesi kolaylaşabilir. Ancak asıl neden yine yüzey sıcaklığı ve iç ortam nem koşullarıdır.</p>
  
      <h3>Isı Köprüsüz Bir Bina İçin Bütüncül Yaklaşım</h3>
      <p>Isı köprülerini önlemek, yalnızca cepheye yalıtım levhası yerleştirmekten ibaret değildir. Mimari proje, statik sistem, cephe tasarımı, pencere montajı, çatı, su yalıtımı ve mekanik havalandırma birbirleriyle koordineli biçimde hazırlanmalıdır.</p>
  
      <p>Projede doğru çözülen detayların şantiyede aynı kaliteyle uygulanması ve uygulamanın kapatılmadan önce kontrol edilmesi gerekir. Özellikle pencere çevreleri, döşeme kenarları, balkonlar ve parapetler tamamlandıktan sonra hatalara müdahale etmek daha maliyetli olabilir.</p>
  
      <p>Uzun ömürlü ve sağlıklı bir yaşam alanı için üç temel koşul birlikte sağlanmalıdır:</p>
  
      <ul>
        <li><strong>Isıl süreklilik:</strong> Yalıtım bina kabuğu boyunca kesintisiz olmalıdır.</li>
        <li><strong>Nem kontrolü:</strong> Yağmur, tesisat ve zemin kaynaklı su yapıya girmemelidir.</li>
        <li><strong>Kontrollü havalandırma:</strong> İçeride oluşan su buharı düzenli biçimde dışarı atılmalıdır.</li>
      </ul>
  
      <h3>Neli Mühendislik ile Sağlıklı ve Enerji Verimli Yapılar</h3>
      <p><strong>Neli Mühendislik</strong> olarak konut projelerinde ısı yalıtımını yalnızca enerji tüketimini azaltan bir cephe uygulaması olarak değerlendirmiyoruz. Kolon, kiriş, döşeme, pencere, balkon, çatı ve temel birleşimlerini bir bütün olarak ele alarak yapı kabuğunun sürekliliğine önem veriyoruz.</p>
  
      <p>Doğru projelendirilmiş ve kontrollü biçimde uygulanmış yapı detayları; enerji kayıplarını azaltırken iç yüzey sıcaklıklarının dengelenmesine, yoğuşma riskinin düşürülmesine ve daha sağlıklı yaşam alanları oluşturulmasına yardımcı olur.</p>
  
      <p>İzmir'de geliştirdiğimiz güncel konut projelerini, daire seçeneklerini ve mühendislik yaklaşımımızı incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' rel='noopener noreferrer' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfasını ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/isi-koprusu.webp",
    coverImageAlt:
      "Yeni bir binada ısı köprüsü, yüzey yoğuşması ve küf oluşumunun önlenmesi — Neli Mühendislik",
    category: "Isı Yalıtımı ve Yapı Fiziği",
    tags: JSON.stringify([
      "ısı köprüsü",
      "küf oluşumu",
      "yüzey yoğuşması",
      "ısı yalıtımı",
      "termal kamera",
      "TS 825",
      "İzmir konut projeleri",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Yeni Binalarda Isı Köprüsü ve Küf Önleme | Neli Mühendislik",
    metaDescription:
      "Yeni binalarda ısı köprüsü neden oluşur? Kolon, balkon ve pencere çevresindeki yoğuşma ve küfün doğru yalıtımla nasıl önleneceğini öğrenin.",
    metaKeywords:
      "yeni binalarda ısı köprüsü nasıl önlenir, küf oluşumu nasıl engellenir, duvar köşesinde küf, pencere çevresinde yoğuşma, kolon kiriş ısı köprüsü, balkon ısı köprüsü, kesintisiz ısı yalıtımı, TS 825 2024, İzmir yeni konut projeleri, Neli Mühendislik",
    publishedAt: "2026-07-06",
  },
  {
    slug: "bina-cevresinde-yagmur-suyu-drenaji-temel-cevresi-tahliyesi",
    title:
      "Bina Çevresinde Yağmur Suyu Drenajı ve Temel Çevresi Tahliyesi Nasıl Yapılır?",
    excerpt:
      "Yağmur suyunun bina temelinden güvenli biçimde uzaklaştırılmaması; bodrum katlarda nem, su sızıntısı, küf, yalıtım hasarı ve taşıyıcı elemanlarda korozyon riskine yol açabilir. Çatı suyundan çevresel drenaj borularına, yüzey eğiminden tahliye noktasına kadar doğru drenaj sisteminin nasıl kurulması gerektiğini inceleyin.",
    content: `<article>
      <h2>Yağmur Suyu Neden Bina Temelinden Uzaklaştırılmalıdır?</h2>
      <p>Bir binanın uzun ömürlü olabilmesi için yalnızca taşıyıcı sisteminin güçlü olması yeterli değildir. Yağmur, yüzey akışı, sulama suyu ve zeminde biriken suların yapıdan kontrollü biçimde uzaklaştırılması gerekir. Parsel içerisindeki su doğru yönetilmediğinde temel ve bodrum perdeleri sürekli neme maruz kalabilir.</p>
  
      <p>Özellikle yoğun yağışlarda çatıdan, sert zeminlerden, araç yollarından ve çevredeki yüksek kotlardan gelen su bina çevresinde birikebilir. Toprağa sızan su, temel perdelerine doğru ilerleyerek su yalıtımı üzerinde basınç oluşturabilir. Yalıtımdaki küçük bir uygulama hatası veya korunmamış bir birleşim noktası zaman içerisinde bodrum katlarda nem ve su sızıntısı olarak ortaya çıkabilir.</p>
  
      <p>Doğru yağmur suyu yönetimi; suyun mümkün olduğunca bina temeline ulaşmadan yakalanması, kontrollü güzergâhlarda taşınması, gerekli durumlarda depolanması ve ilgili idarenin izin verdiği tahliye noktasına güvenli biçimde ulaştırılması esasına dayanır.</p>
  
      <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
        <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Bina çevresinde yağmur suyu drenajı; çatı inişlerinin kapalı borularla toplanması, parsel zeminine binadan uzaklaşacak yönde eğim verilmesi, yüzey sularının oluk ve süzgeçlerle yakalanması ve temel perdelerinin önünde filtreli çevresel drenaj sistemi kurulmasıyla yapılır. Drenaj boruları uygun eğimle kontrol bacalarına ve izin verilen tahliye noktasına bağlanmalı; temel ve bodrum perdelerinde ayrıca kesintisiz su yalıtımı uygulanmalıdır. Drenaj levhası veya drenaj borusu tek başına su yalıtımı yerine geçmez.
      </blockquote>
  
      <h3>Yağmur Suyu Drenajı ile Su Yalıtımı Aynı Şey midir?</h3>
      <p>Yağmur suyu drenajı ve su yalıtımı birbirini tamamlayan ancak farklı görevleri bulunan iki sistemdir. Drenaj, yapı çevresindeki suyu toplayarak uzaklaştırır. Su yalıtımı ise yapı elemanlarının su ve nemle temasını engelleyen koruyucu katmanı oluşturur.</p>
  
      <p>Drenaj sistemi suyun temel perdesi önünde birikmesini ve hidrostatik basınç oluşturmasını azaltabilir. Ancak borunun tıkanması, tahliye hattının geri tepmesi veya olağanüstü yağış oluşması halinde yapı yine suya maruz kalabilir. Bu nedenle temel ve bodrum perdeleri yalnızca drenaj sistemine güvenilerek yalıtımsız bırakılamaz.</p>
  
      <p>Aynı şekilde kaliteli bir su yalıtımı yapılmış olması da bina çevresinde su birikmesine izin verilebileceği anlamına gelmez. Sürekli su basıncı, birleşim noktalarını, tesisat geçişlerini ve uygulama kusurlarını daha fazla zorlar. Güvenli bir sistemde su yalıtımı, koruma katmanı ve drenaj birlikte çalışır.</p>
  
      <h3>Drenaj Levhası Tek Başına Su Yalıtımı Sağlar mı?</h3>
      <p>Drenaj levhaları, temel veya bodrum perdesi üzerindeki su yalıtımını dolgu sırasında oluşabilecek mekanik hasarlardan korumak ve suyun düşey yönde drenaj hattına ulaşmasına yardımcı olmak amacıyla kullanılabilir.</p>
  
      <p>Ancak drenaj levhası tek başına su geçirimsiz bir temel sistemi oluşturmaz. Levhanın ek yerleri, sabitleme noktaları ve üst bitişleri su yalıtımı gibi değerlendirilmemelidir. Önce proje koşullarına uygun su yalıtımı uygulanmalı, ardından yalıtım koruma altına alınmalıdır.</p>
  
      <h3>Drenaj Projesinden Önce Hangi Veriler İncelenmelidir?</h3>
      <p>Her bina için aynı drenaj detayı kullanılamaz. Sistem tasarlanmadan önce parselin topoğrafyası, zemin yapısı, yeraltı su seviyesi, yağış koşulları ve belediye altyapısı birlikte değerlendirilmelidir.</p>
  
      <p>Proje başlangıcında aşağıdaki bilgiler incelenmelidir:</p>
  
      <ul>
        <li>Parselin doğal ve düzenlenmiş zemin kotları,</li>
        <li>Komşu parsellerden gelebilecek yüzey suları,</li>
        <li>Yol, kaldırım ve bina giriş kotları,</li>
        <li>Zemin ve temel etüt raporundaki geçirgenlik bilgileri,</li>
        <li>Mevsimsel en yüksek yeraltı su seviyesi,</li>
        <li>Temel tipi ve bodrum kat derinliği,</li>
        <li>Çatı ve sert zeminlerden toplanacak yağmur suyu miktarı,</li>
        <li>Parselde yağmur suyu şebekesinin bulunup bulunmadığı,</li>
        <li>Cazibeli tahliye için yeterli kot farkının olup olmadığı,</li>
        <li>Taşkın veya geri tepme riski bulunan noktalar,</li>
        <li>Yağmur suyu depolama ve yeniden kullanım gereksinimleri.</li>
      </ul>
  
      <p>Bu değerlendirmeler yapılmadan yalnızca bina çevresine delikli boru döşenmesi, suyun hangi yönde hareket edeceği ve nereye tahliye edileceği çözülmediği için etkisiz kalabilir.</p>
  
      <h3>Parsel Zemini Binadan Hangi Yöne Eğimli Olmalıdır?</h3>
      <p>Bina çevresindeki bitmiş zemin, yağmur suyunu temel ve dış duvarlardan uzaklaştıracak biçimde düzenlenmelidir. Su, bina cephesine doğru akmamalı veya temel çevresinde kapalı bir çanak içerisinde birikmemelidir.</p>
  
      <p>Bahçe, yaya yolu ve araç yolu eğimleri; suyu parsel içerisindeki süzgeçlere, açık kanallara, yağmur bahçelerine, depolama sistemine veya izin verilen tahliye hattına yönlendirmelidir. Eğim değerleri yüzey kaplamasına, kullanım amacına, erişilebilirlik şartlarına ve mimari projeye göre belirlenmelidir.</p>
  
      <p>Zemin düzenlemesinde şu hatalardan kaçınılmalıdır:</p>
  
      <ul>
        <li>Peyzaj toprağının dış cephe kaplaması veya su yalıtımı bitiş kotunun üzerine yükseltilmesi,</li>
        <li>Bahçe zemininin binaya doğru eğimli bırakılması,</li>
        <li>Dış cephe dibinde su tutan çukurlar oluşturulması,</li>
        <li>Yüzey süzgeçlerinin en yüksek noktaya yerleştirilmesi,</li>
        <li>Kapı ve bodrum pencerelerinin yol seviyesinden düşük bırakılması,</li>
        <li>Komşu parsel suyunun kontrolsüz şekilde bina yönüne çevrilmesi,</li>
        <li>Geçirimsiz kaplamaların tahliye noktası olmadan uygulanması.</li>
      </ul>
  
      <h3>Çatı Yağmur Suları Nasıl Toplanmalıdır?</h3>
      <p>Çatı, bir binadaki en büyük yağmur suyu toplama yüzeylerinden biridir. Çatıdan gelen suyun doğrudan bina dibine bırakılması, kısa sürede temel çevresinde yoğun su birikmesine neden olabilir.</p>
  
      <p>Çatı eğimleri, oluklar, süzgeçler ve yağmur iniş boruları beklenen yağış debisine göre hesaplanmalıdır. İniş boruları bina cephesinde sonlandırılmamalı; kapalı bir sistemle yağmur suyu hattına, depolama tankına veya projede belirlenen güvenli tahliye noktasına bağlanmalıdır.</p>
  
      <p>Çatı drenajında şu detaylar önemlidir:</p>
  
      <ul>
        <li>Çatı yüzeyine yeterli eğim verilmesi,</li>
        <li>Süzgeçlerin suyun doğal akış yönündeki düşük noktalara yerleştirilmesi,</li>
        <li>Yaprak ve katı maddelere karşı uygun tutucular kullanılması,</li>
        <li>İniş borularında temizleme ve kontrol imkânı bulunması,</li>
        <li>Taşma halinde suyun bina içerisine yönelmemesi,</li>
        <li>Teras ve parapetlerde acil taşma ağızlarının değerlendirilmesi,</li>
        <li>İniş borusu çıkışlarının temel çevresine serbestçe boşalmaması.</li>
      </ul>
  
      <h3>Çatı İniş Boruları Temel Drenajına Bağlanabilir mi?</h3>
      <p>Çatıdan kısa sürede yüksek debide su gelebilir. Bu suyun doğrudan temel çevresindeki delikli drenaj borusuna verilmesi, drenaj sisteminin kapasitesini aşabilir ve suyu uzaklaştırmak yerine temel çevresine dağıtabilir.</p>
  
      <p>Bu nedenle çatı yağmur suları genellikle sızdırmaz, kapalı ve ayrı borularla taşınmalıdır. Temel çevresindeki delikli drenaj hattı ise zeminde ve perde önünde biriken suları toplamak için kullanılmalıdır.</p>
  
      <p>Her iki sistemin ortak bir tahliye noktasına bağlanması planlanıyorsa bağlantı; hidrolik kapasite, geri tepme riski, bakım imkânı ve yerel altyapı şartları değerlendirilerek projelendirilmelidir.</p>
  
      <h3>Temel Çevresi Drenaj Sistemi Nedir?</h3>
      <p>Temel çevresi veya çevresel drenaj sistemi, toprak altındaki düşey yapı elemanlarının önünde biriken suyun hidrostatik basınç oluşturmasını azaltmak amacıyla kurulan filtreli boru sistemidir.</p>
  
      <p>Sistem genel olarak şu bileşenlerden oluşur:</p>
  
      <ul>
        <li>Delikli veya yarıklı drenaj borusu,</li>
        <li>Yıkanmış ve uygun dane dağılımına sahip filtre agregası,</li>
        <li>İnce zemin parçacıklarını sınırlayan geotekstil filtre katmanı,</li>
        <li>Temel ve bodrum perdesi su yalıtımı,</li>
        <li>Su yalıtımını koruyan levha veya koruma katmanı,</li>
        <li>Düşey drenajı kolaylaştıran uygun sistem bileşenleri,</li>
        <li>Köşe ve yön değişimlerinde kontrol bacaları,</li>
        <li>Cazibeli çıkış hattı veya drenaj toplama çukuru,</li>
        <li>Gerekli durumlarda pompa, alarm ve yedekleme sistemi.</li>
      </ul>
  
      <h3>Drenaj Borusu Temele Göre Nereye Yerleştirilmelidir?</h3>
      <p>Drenaj borusunun kotu ve temel elemanlarına uzaklığı, geoteknik ve statik proje esaslarına göre belirlenmelidir. Boru, suyu temel perdesi önünde basınç oluşturmadan yakalayabilecek bir seviyede olmalı; ancak temel altındaki taşıyıcı zemini gevşetecek veya temel davranışını olumsuz etkileyecek biçimde yerleştirilmemelidir.</p>
  
      <p>Mevcut bir binada temel seviyesinin altına kontrolsüz biçimde kazı yapılması tehlikelidir. Böyle bir müdahale temel altındaki zeminin boşalmasına, oturmalara ve taşıyıcı sistem hasarına yol açabilir. Sonradan drenaj yapılacak yapılarda kazı etapları ve destekleme yöntemi inşaat ve geoteknik mühendisleri tarafından belirlenmelidir.</p>
  
      <p>Boru güzergâhı boyunca suyun kontrol bacalarına ve tahliye noktasına doğru sürekli akabileceği bir eğim sağlanmalıdır. Ters eğim, çökme ve boru içinde su cebi oluşmasına izin verilmemelidir.</p>
  
      <h3>Drenaj Borusunun Delikleri Hangi Yönde Olmalıdır?</h3>
      <p>Drenaj borularının delik veya yarık yönü, kullanılan boru sisteminin üretici detayına ve hidrolik tasarıma göre belirlenmelidir. Her ürün için geçerli tek bir yerleştirme kuralı kabul edilmemelidir.</p>
  
      <p>Borunun tipi, delik geometrisi, filtre malzemesi ve döşeme detayı birlikte değerlendirilmelidir. Üreticinin teknik dokümanına aykırı uygulama yapılması, borunun su toplama kapasitesini azaltabilir veya tortuyla daha hızlı tıkanmasına neden olabilir.</p>
  
      <h3>Filtre Agregası Neden Kullanılır?</h3>
      <p>Drenaj borusunun çevresindeki filtre agregası, suyun boruya kolayca ulaşmasını sağlarken ince zemin parçacıklarının boru çevresinde birikmesini azaltır. Toprak veya kazı malzemesinin doğrudan delikli borunun üzerine doldurulması, sistemin kısa sürede tıkanmasına neden olabilir.</p>
  
      <p>Kullanılacak agreganın temiz, yıkanmış ve projede belirtilen dane özelliklerine sahip olması gerekir. Kil, ince toprak veya yüksek oranda kırıntı içeren dolgu malzemeleri drenaj boşluklarını kapatabilir.</p>
  
      <p>Filtre agregasının kalınlığı ve boru çevresindeki yerleşimi; zemin özelliklerine, boru çapına ve su miktarına göre projelendirilmelidir.</p>
  
      <h3>Geotekstil Filtre Katmanı Ne İşe Yarar?</h3>
      <p>Geotekstil, ince zemin parçacıklarının filtre agregası ve drenaj borusu içerisine taşınmasını sınırlandırmak amacıyla kullanılabilir. Böylece drenaj sisteminin uzun süre geçirgen kalmasına yardımcı olur.</p>
  
      <p>Ancak her geotekstil her zemin için uygun değildir. Çok sıkı bir ürün su geçişini azaltabilir; çok geniş açıklıklı bir ürün ise ince zeminin filtre katmanına taşınmasına izin verebilir. Geotekstil seçimi zeminin tane dağılımı ve geçirgenlik özellikleri dikkate alınarak yapılmalıdır.</p>
  
      <p>Geotekstilin yırtılması, ek yerlerinin açık bırakılması veya dolgu sırasında yerinden kayması filtre sisteminin işlevini bozabilir. Uygulama, dolgu kapatılmadan önce kontrol edilmelidir.</p>
  
      <h3>Temel ve Bodrum Perdesi Su Yalıtımı Nasıl Korunmalıdır?</h3>
      <p>Temel perde duvarına uygulanan su yalıtımı, geri dolgu sırasında taş, moloz ve iş makinelerinin etkisiyle zarar görebilir. Yalıtımın üzeri uygun koruma levhası, ısı yalıtımı veya projede tanımlanan koruma sistemiyle kapatılmalıdır.</p>
  
      <p>Koruma katmanı uygulanırken su yalıtımını delen gereksiz mekanik bağlantılardan kaçınılmalıdır. Sabitleme yapılması gerekiyorsa detay, yalıtım sisteminin izin verdiği bölgelerde ve üretici talimatlarına uygun çözülmelidir.</p>
  
      <p>Özellikle aşağıdaki noktalar dolgu öncesinde kontrol edilmelidir:</p>
  
      <ul>
        <li>Temel ile perde duvarı birleşimleri,</li>
        <li>Dilatasyon ve soğuk derzler,</li>
        <li>Boru ve tesisat geçişleri,</li>
        <li>Tij delikleri ve kalıp bağlantı noktaları,</li>
        <li>Su yalıtımı ek ve bindirmeleri,</li>
        <li>Yalıtımın subasman seviyesindeki bitişi,</li>
        <li>Köşe dönüşleri ve pah uygulamaları,</li>
        <li>Drenaj levhasının üst bitiş profili.</li>
      </ul>
  
      <h3>Su Yalıtımı Hangi Taraftan Uygulanmalıdır?</h3>
      <p>Yeni yapılarda su yalıtımının temel yaklaşımı, suyun yapı elemanına ulaştığı dış taraftan uygulanmasıdır. Böylece betonarme perde ve temel elemanları suyun etkisinden korunur.</p>
  
      <p>Bodrum tamamlandıktan sonra yalnızca iç yüzeyden yapılan müdahaleler, suyun betonarme eleman içerisine girmesini her zaman engellemez. İçten yapılan uygulamalar belirli onarım koşullarında kullanılabilse de yeni yapıdaki dıştan su yalıtımının doğrudan alternatifi olarak görülmemelidir.</p>
  
      <h3>Yeraltı Suyu ile Yağmur Suyu Aynı Sistemle Yönetilebilir mi?</h3>
      <p>Yağmur suyu, yüzeyden veya çatıdan kısa sürede gelen akışı ifade eder. Yeraltı suyu ise zemin boşluklarında bulunan ve temel ile bodrum elemanlarında sürekli veya mevsimsel basınç oluşturabilen sudur.</p>
  
      <p>Temel veya bodrum perdeleri mevsimsel en yüksek yeraltı su seviyesinin altında kalıyorsa yalnızca çevresel drenaj borusuna güvenilmemelidir. Elektrik kesintisi, pompa arızası veya drenaj hattının tıkanması durumunda su seviyesi yeniden yükselebilir.</p>
  
      <p>Basınçlı su etkisi bulunan yapılarda su yalıtımı ve taşıyıcı sistem detayları bu basınca göre projelendirilmelidir. Drenaj, su basıncını azaltan ek bir önlem olabilir ancak güvenliğin tek bileşeni olmamalıdır.</p>
  
      <h3>Alansal Drenaj Ne Zaman Kullanılır?</h3>
      <p>Alansal drenaj sistemi, zemine oturan döşemelerin altında biriken suyun hidrostatik basınç oluşturmasını sınırlamak amacıyla kullanılabilir. Bu sistem yalnızca bina çevresindeki borudan farklı olarak döşeme altındaki daha geniş bir alanı kapsar.</p>
  
      <p>Alansal drenaj gereksinimi; zemin geçirgenliği, temel tipi, yeraltı su seviyesi ve döşeme altındaki su hareketi dikkate alınarak belirlenmelidir. Yanlış uygulanmış bir sistem, ince zemin taşınmasına ve temel altındaki zemin koşullarının değişmesine neden olabilir.</p>
  
      <p>Bu nedenle temel altı drenaj uygulamaları geoteknik ve statik tasarımla birlikte çözülmeli, şantiyede proje dışı drenaj kanalları açılmamalıdır.</p>
  
      <h3>Cazibeli Tahliye Mümkün Değilse Ne Yapılır?</h3>
      <p>Drenaj hattı belediye yağmur suyu şebekesine veya güvenli bir açık çıkış noktasına doğal eğimle bağlanamıyorsa su bir toplama çukurunda biriktirilerek pompayla tahliye edilebilir.</p>
  
      <p>Drenaj toplama çukuru ve pompa sistemi tasarlanırken şu bileşenler değerlendirilmelidir:</p>
  
      <ul>
        <li>Beklenen su debisine uygun çukur hacmi,</li>
        <li>Çalışma ve yedek pompa düzeni,</li>
        <li>Seviye şalterleri ve otomatik kontrol,</li>
        <li>Yüksek su seviyesi alarmı,</li>
        <li>Elektrik kesintisine karşı yedek enerji çözümü,</li>
        <li>Pompa geri dönüşünü engelleyen çekvalf,</li>
        <li>Bakım ve pompa değişimi için güvenli erişim,</li>
        <li>Tahliye borusunun donma ve hasara karşı korunması.</li>
      </ul>
  
      <p>Tek pompalı ve alarmı bulunmayan sistemlerde pompa arızası fark edilene kadar bodrum çevresinde su seviyesi yükselebilir. Su etkisinin kritik olduğu yapılarda yedekleme senaryosu hazırlanmalıdır.</p>
  
      <h3>Geri Tepme Riski Nasıl Önlenir?</h3>
      <p>Şiddetli yağışlarda belediye yağmur suyu hattının dolması halinde parsel bağlantısından binaya doğru geri akış meydana gelebilir. Özellikle yol kotunun altında bulunan bodrumlar, otopark rampaları ve düşük seviyedeki süzgeçler bu riske açıktır.</p>
  
      <p>Geri tepme riskine karşı bağlantı kotları, şebeke taşkın seviyesi ve pompa gereksinimi projede değerlendirilmelidir. Uygun yerlerde geri akışı sınırlayan ekipman kullanılabilir; ancak bu ekipmanların bakım gerektirdiği unutulmamalıdır.</p>
  
      <p>Bir çekvalfin bulunması tek başına mutlak güvenlik sağlamaz. Mekanik parçalar tortu, yaprak veya katı maddeler nedeniyle çalışmayabilir. Kritik alanlarda taşma güzergâhı, alarm ve pompalı tahliye birlikte planlanmalıdır.</p>
  
      <h3>Bodrum Otopark Rampalarında Yağmur Suyu Nasıl Durdurulur?</h3>
      <p>Açık otopark rampaları, yağmur suyunu doğrudan bodrum kata taşıyabilen geniş yüzeylerdir. Rampanın bütün yüzeyinden gelen su tek bir küçük süzgece bırakıldığında yoğun yağış sırasında taşma meydana gelebilir.</p>
  
      <p>Otopark rampalarında şu önlemler değerlendirilebilir:</p>
  
      <ul>
        <li>Rampa üst kotunda yüzey suyunu kesen doğrusal kanal,</li>
        <li>Rampa alt kotunda yeterli kapasiteli ikinci toplama kanalı,</li>
        <li>Kanallarda temizlenebilir ızgara ve tortu tutucu,</li>
        <li>Pompalı toplama çukuru ve yedek pompa,</li>
        <li>Yüksek seviye alarmı,</li>
        <li>Rampa yan duvarlarında kontrollü yüzey eğimleri,</li>
        <li>Kapalı otopark içerisine geri akışı azaltacak eşik ve kot detayları.</li>
      </ul>
  
      <p>Rampa drenajı, yalnızca ortalama yağışa göre değil projenin taşkın ve şiddetli yağış senaryoları dikkate alınarak hesaplanmalıdır.</p>
  
      <h3>Işıklık ve İngiliz Bahçelerinde Drenaj Nasıl Yapılır?</h3>
      <p>Bodrum pencerelerinin önündeki ışıklıklar ve İngiliz bahçeleri, çevredeki zeminden daha düşük kotta bulunduğu için su biriktirmeye eğilimlidir. Bu alanların tabanına yalnızca küçük bir süzgeç yerleştirilmesi her koşulda yeterli olmayabilir.</p>
  
      <p>Işıklık çevresindeki zemin suyu açıklıktan uzaklaştırılmalı, üst bölümde su girişini azaltan detaylar oluşturulmalı ve tabandaki süzgecin tıkanmaya karşı erişilebilir olması sağlanmalıdır.</p>
  
      <p>Işıklık tahliyesi geri tepme riski bulunan bir hatta bağlanıyorsa pompalı çözüm gerekebilir. Pencere alt kotu ile olası su seviyesi arasında güvenli kot farkı bırakılmalıdır.</p>
  
      <h3>İstinat Duvarlarının Arkasında Drenaj Neden Gereklidir?</h3>
      <p>İstinat duvarının arkasında biriken su, duvar üzerinde ilave basınç oluşturabilir. Yalnızca zemin yüküne göre tasarlanan bir duvarın arkasında su birikmesine izin verilmesi yapısal riskleri artırabilir.</p>
  
      <p>İstinat duvarı drenajında su yalıtımı, filtreli dolgu, drenaj borusu ve güvenli tahliye çıkışı birlikte çözülmelidir. Barbakan delikleri kullanılan projelerde suyun bina girişlerine, kaldırıma veya komşu parsele kontrolsüz biçimde akmasına izin verilmemelidir.</p>
  
      <p>İstinat duvarı drenajı ile bina temel drenajının bağlantısı, her iki sistemin debileri ve kotları hesaplanarak yapılmalıdır. İstinat duvarından gelen yüksek miktardaki su doğrudan bina temeline yönlendirilmemelidir.</p>
  
      <h3>Peyzaj Sulaması Temel Çevresini Nasıl Etkiler?</h3>
      <p>Otomatik sulama sistemleri yanlış konumlandırıldığında dış duvar ve temel çevresi düzenli olarak ıslanabilir. Sulama başlıklarının cepheye doğru çalışması veya bitki yataklarının bina dibinde çanak oluşturması su yalıtımını gereksiz yere zorlar.</p>
  
      <p>Peyzaj tasarımında şu önlemler alınmalıdır:</p>
  
      <ul>
        <li>Sulama başlıkları bina cephesinden uzağa yönlendirilmelidir.</li>
        <li>Damla sulama debileri bitki ve zemin ihtiyacına göre ayarlanmalıdır.</li>
        <li>Bina dibinde sürekli su isteyen bitkiler kullanılmamalıdır.</li>
        <li>Bitki toprağı su yalıtımı bitiş kotunun üzerine çıkarılmamalıdır.</li>
        <li>Peyzaj alanlarının taşma güzergâhları belirlenmelidir.</li>
        <li>Ağaç köklerinin drenaj borularına ulaşma riski değerlendirilmelidir.</li>
      </ul>
  
      <h3>Yağmur Suyu Atık Su Kanalına Bağlanabilir mi?</h3>
      <p>Yağmur suyu ve evsel atık su sistemlerinin bağlantı esasları yerel idarenin altyapı düzenine göre belirlenir. Ayrık sistem bulunan bölgelerde yağmur suyu, evsel atık su kanalına kontrolsüz biçimde bağlanmamalıdır.</p>
  
      <p>Yanlış bağlantılar yoğun yağış sırasında atık su şebekesinin kapasitesini aşmasına, taşmalara ve arıtma tesislerine gereksiz temiz su taşınmasına neden olabilir. Aynı şekilde parsel drenajının nereye bağlanacağı, ilgili belediye veya su ve kanalizasyon idaresinin onayıyla belirlenmelidir.</p>
  
      <p>Yağmur suyu;</p>
  
      <ul>
        <li>Varsa yağmur suyu şebekesine,</li>
        <li>Uygun depolama ve yeniden kullanım sistemine,</li>
        <li>İzin verilen kontrollü sızdırma sistemine,</li>
        <li>Yetkili idarenin onayladığı güvenli tahliye noktasına</li>
      </ul>
  
      <p>proje koşullarına göre yönlendirilebilir. Su, komşu parsele, kaldırıma, bina girişine veya temel çevresine serbestçe boşaltılmamalıdır.</p>
  
      <h3>Yağmur Suyu Depolanarak Yeniden Kullanılabilir mi?</h3>
      <p>Çatı yüzeylerinden toplanan yağmur suyu, uygun filtreleme ve depolama sistemiyle içme suyu gerektirmeyen kullanım alanlarında değerlendirilebilir. Böylece hem şebeke suyu tüketimi hem de yoğun yağış sırasında parselden anlık tahliye edilen su miktarı azaltılabilir.</p>
  
      <p>Yağmur suyu toplama sisteminde genel olarak şu bileşenler bulunabilir:</p>
  
      <ul>
        <li>Çatı olukları ve iniş boruları,</li>
        <li>Yaprak ve kaba tortu tutucular,</li>
        <li>İlk yağış veya ön filtreleme sistemi,</li>
        <li>Uygun hacimli depolama tankı,</li>
        <li>Taşma ve güvenli tahliye hattı,</li>
        <li>Pompa ve kontrol sistemi,</li>
        <li>İçme suyu tesisatından ayrılmış kullanım hattı,</li>
        <li>Bakım ve temizlik erişimi.</li>
      </ul>
  
      <p>Yağmur suyu tesisatı ile içme suyu tesisatı arasında sağlıksız çapraz bağlantı oluşturulmamalıdır. Kullanım noktaları ve borular, içilebilir olmayan su taşıdığını gösterecek biçimde tanımlanmalıdır.</p>
  
      <h3>2026 Yılında Yağmur Suyu Toplama Sistemi Hangi Yapılarda Zorunludur?</h3>
      <p>Planlı Alanlar İmar Yönetmeliği'ndeki düzenlemeler kapsamında 1 Ocak 2026'dan sonra belirli büyüklükteki yeni yapılarda yağmur suyu toplama sistemi zorunlu hale gelmiştir.</p>
  
      <p>Depo hacmi ihtiyacının 7 m³'ün üzerinde olması şartıyla;</p>
  
      <ul>
        <li>Parsel alanı 2.000 m²'den büyük alanlardaki yapılarda,</li>
        <li>Parseldeki toplam çatı izdüşüm alanı 1.000 m²'den büyük yapılarda,</li>
        <li>Depo hacmi ihtiyacı 7 m³'ü geçen kamu yapılarında</li>
      </ul>
  
      <p>yağmur suyu toplama sistemi tesis edilmesi öngörülmektedir. Sistemlerin ruhsat eki mekanik tesisat projesinde gösterilmesi ve ilgili standartlara uygun tasarlanması gerekir.</p>
  
      <p>Yağmur suyu yalnızca zorunluluk kapsamındaki yapılarda değerlendirilen bir sistem olarak görülmemelidir. Daha küçük konut projelerinde de bahçe sulaması, ortak alan temizliği ve parsel içi taşkın kontrolü amacıyla uygulanabilir.</p>
  
      <h3>Yağmur Suyu Deposu Temel Drenajının Yerine Geçer mi?</h3>
      <p>Hayır. Yağmur suyu deposu çatıdan gelen suyu toplar. Temel drenajı ise zemin içerisinde veya bodrum perdesi önünde biriken suyu uzaklaştırır. Bu iki sistemin kaynakları ve çalışma koşulları farklıdır.</p>
  
      <p>Depo dolduğunda fazla suyun güvenli biçimde uzaklaştırılması için taşma hattı bulunmalıdır. Taşma hattının bina temelinin yakınına boşaltılması, depolama sisteminin sağladığı faydayı ortadan kaldırabilir.</p>
  
      <p>Depo, çevresel drenaj borusundan gelen kirli ve tortulu zemin sularını toplamak için tasarlanmamışsa bu sular doğrudan depoya verilmemelidir.</p>
  
      <h3>Sızdırma Kuyusu Her Parselde Kullanılabilir mi?</h3>
      <p>Yağmur suyunun zemine sızdırılması, uygun zemin ve yeraltı suyu koşullarında yüzey akışını azaltabilir. Ancak her parselde kontrolsüz sızdırma kuyusu yapılması güvenli değildir.</p>
  
      <p>Sızdırma sistemi değerlendirilirken şu koşullar incelenmelidir:</p>
  
      <ul>
        <li>Zeminin su geçirgenliği,</li>
        <li>Yeraltı su seviyesinin derinliği,</li>
        <li>Temel ve bodrum perdelerine uzaklık,</li>
        <li>Şev ve istinat yapılarının konumu,</li>
        <li>Komşu yapıların temel kotları,</li>
        <li>Zeminde oturma veya erime riski,</li>
        <li>Toprak ve yeraltı suyu kirliliği riski,</li>
        <li>Yerel idarenin izin ve bağlantı şartları.</li>
      </ul>
  
      <p>Yanlış konumlandırılmış bir sızdırma kuyusu, uzaklaştırılmak istenen suyu yeniden bina temeline yönlendirebilir. Uygulama öncesinde geoteknik ve hidrolik değerlendirme yapılmalıdır.</p>
  
      <h3>Drenaj Sisteminde Kontrol Bacaları Neden Gereklidir?</h3>
      <p>Drenaj boruları zaman içerisinde tortu, kök, ince zemin veya inşaat artıkları nedeniyle tıkanabilir. Sistem tamamen gömülmeden önce bakım ve temizlik imkânı sağlayacak kontrol bacaları oluşturulmalıdır.</p>
  
      <p>Kontrol bacaları özellikle şu noktalarda değerlendirilmelidir:</p>
  
      <ul>
        <li>Boru yönünün değiştiği köşelerde,</li>
        <li>Farklı drenaj hatlarının birleştiği noktalarda,</li>
        <li>Uzun hatlarda gerekli ara mesafelerde,</li>
        <li>Cazibeli çıkış veya pompa çukuru öncesinde,</li>
        <li>Kot değişiminin bulunduğu bölgelerde.</li>
      </ul>
  
      <p>Bacalar yüzeyden erişilebilir olmalı, peyzaj toprağı veya kaplama altında kaybolmamalıdır. Kapak kotları yağmur suyunun bacaya kontrolsüz girmesine izin vermeyecek biçimde düzenlenmelidir.</p>
  
      <h3>Drenaj Sistemi Nasıl Test Edilir?</h3>
      <p>Drenaj sistemi üzeri kapatılmadan önce boru güzergâhı, eğimleri, bağlantılar ve tahliye noktası kontrol edilmelidir. Kamera incelemesi, kot ölçümü veya kontrollü su verme yöntemiyle akışın doğru yönde gerçekleştiği doğrulanabilir.</p>
  
      <p>Test sırasında şu noktalar incelenmelidir:</p>
  
      <ul>
        <li>Borularda ters eğim veya çökme bulunup bulunmadığı,</li>
        <li>Kontrol bacalarına suyun ulaşması,</li>
        <li>Bağlantı noktalarında sızıntı veya ayrılma bulunmaması,</li>
        <li>Tahliye hattının açık ve çalışır durumda olması,</li>
        <li>Pompa ve seviye şalterlerinin devreye girmesi,</li>
        <li>Yedek pompa ve alarm sisteminin çalışması,</li>
        <li>Çatı inişlerinin doğru hatta bağlanması,</li>
        <li>Su yalıtımının dolgu öncesinde hasarsız olması.</li>
      </ul>
  
      <h3>Geri Dolgu Nasıl Yapılmalıdır?</h3>
      <p>Temel ve bodrum çevresindeki geri dolgunun rastgele hafriyat malzemesiyle yapılması, drenaj ve su yalıtımı sistemine zarar verebilir. Büyük taşlar koruma katmanını kırabilir, ince ve geçirimsiz malzemeler ise suyun temel çevresinde kalmasına neden olabilir.</p>
  
      <p>Geri dolgu malzemesi ve sıkıştırma yöntemi geoteknik rapor ile proje şartlarına uygun seçilmelidir. Dolgu tabakalar halinde yapılmalı ve sıkıştırma ekipmanının temel perdesinde aşırı yük veya yalıtım üzerinde hasar oluşturmaması sağlanmalıdır.</p>
  
      <p>Dolgu sırasında drenaj borusunun kotu bozulmamalı, kontrol bacaları yerinden hareket etmemeli ve geotekstil filtre katmanı yırtılmamalıdır.</p>
  
      <h3>Drenaj Sisteminde En Sık Yapılan Hatalar Nelerdir?</h3>
      <p>Temel çevresi drenajında sık karşılaşılan uygulama hataları şunlardır:</p>
  
      <ul>
        <li>Drenaj levhasının su yalıtımı olarak kabul edilmesi,</li>
        <li>Temel perdesinin dıştan yalıtımsız bırakılması,</li>
        <li>Delikli borunun doğrudan toprak içine gömülmesi,</li>
        <li>Filtre agregası yerine ince hafriyat kullanılması,</li>
        <li>Geotekstil filtre katmanının hiç uygulanmaması,</li>
        <li>Boruda ters eğim ve su cepleri oluşturulması,</li>
        <li>Drenaj çıkışının nereye bağlandığının çözülmemesi,</li>
        <li>Çatı inişlerinin doğrudan delikli drenaj borusuna verilmesi,</li>
        <li>Kontrol ve temizleme bacası bırakılmaması,</li>
        <li>Yalıtım korunmadan geri dolgu yapılması,</li>
        <li>Peyzaj zemininin bina yönüne eğimli bırakılması,</li>
        <li>Pompa sisteminde yedekleme ve alarm bulunmaması,</li>
        <li>Yağmur suyu ile atık su tesisatlarının hatalı bağlanması.</li>
      </ul>
  
      <h3>Temel Çevresinde Drenaj Problemi Olduğu Nasıl Anlaşılır?</h3>
      <p>Yetersiz drenaj veya su yalıtımı problemleri farklı belirtilerle ortaya çıkabilir. Özellikle yoğun yağışlardan sonra artan nem ve sızıntılar dikkatle incelenmelidir.</p>
  
      <p>Yaygın belirtiler şunlardır:</p>
  
      <ul>
        <li>Bodrum duvarlarında koyu renkli nem lekeleri,</li>
        <li>Duvar ile döşeme birleşiminden su çıkması,</li>
        <li>Boya kabarması ve sıva dökülmesi,</li>
        <li>Beton yüzeylerde beyaz tuz izleri,</li>
        <li>Bodrumda sürekli nem ve küf kokusu,</li>
        <li>Yağış sırasında pompa çukurunun hızla dolması,</li>
        <li>Bina çevresinde uzun süre kalan su birikintileri,</li>
        <li>Yağmur iniş borularının cephe dibine boşalması,</li>
        <li>İstinat duvarlarından yoğun su akışı,</li>
        <li>Temel çevresindeki zeminde çökme veya boşalma.</li>
      </ul>
  
      <p>Bu belirtilerin kaynağı yalnızca drenaj olmayabilir. Tesisat kaçağı, teras yalıtımı, cephe çatlağı ve yüksek yeraltı suyu gibi olasılıklar da kontrol edilmelidir.</p>
  
      <h3>Mevcut Bir Binaya Sonradan Drenaj Yapılabilir mi?</h3>
      <p>Mevcut yapılarda dıştan drenaj ve su yalıtımı yapılabilir; ancak temel çevresindeki kazı işlemi taşıyıcı sistem açısından dikkatle planlanmalıdır. Bina çevresinin tamamı aynı anda ve kontrolsüz biçimde kazılmamalıdır.</p>
  
      <p>Uygulama öncesinde temel tipi, temel derinliği, zemin özellikleri, komşu yapılar ve kazı güvenliği belirlenmelidir. Gerekirse çalışmalar kısa etaplar halinde ve geçici destekleme kullanılarak yürütülmelidir.</p>
  
      <p>Sonradan yapılacak uygulamada genel sıra şu şekilde olabilir:</p>
  
      <ol>
        <li>Nem ve su kaynağı teknik incelemeyle belirlenir.</li>
        <li>Temel ve zemin koşulları tespit edilir.</li>
        <li>Güvenli kazı ve destekleme yöntemi hazırlanır.</li>
        <li>Perde yüzeyi temizlenir ve gerekli onarımlar yapılır.</li>
        <li>Uygun dıştan su yalıtımı uygulanır.</li>
        <li>Yalıtım koruma altına alınır.</li>
        <li>Filtreli çevresel drenaj hattı kurulur.</li>
        <li>Kontrol bacaları ve tahliye sistemi tamamlanır.</li>
        <li>Uygun malzemeyle kontrollü geri dolgu yapılır.</li>
        <li>Yüzey eğimleri binadan uzaklaşacak şekilde düzenlenir.</li>
      </ol>
  
      <h3>Drenaj Sisteminin Bakımı Nasıl Yapılır?</h3>
      <p>Drenaj sistemleri görünmeyen yapı elemanları olduğu için çoğu zaman bakım yapılmadan kullanılmaya devam edilir. Oysa çatı olukları, süzgeçler, kontrol bacaları ve pompalar düzenli olarak kontrol edilmelidir.</p>
  
      <p>Bakım programında şu işlemler bulunabilir:</p>
  
      <ul>
        <li>Çatı olukları ve yaprak tutucuların temizlenmesi,</li>
        <li>Yağmur iniş borularındaki tıkanıklıkların giderilmesi,</li>
        <li>Bahçe ve otopark süzgeçlerinin temizlenmesi,</li>
        <li>Kontrol bacalarında tortu birikiminin incelenmesi,</li>
        <li>Drenaj hatlarının gerektiğinde kamera ile kontrol edilmesi,</li>
        <li>Pompa, şamandıra ve alarm testlerinin yapılması,</li>
        <li>Yedek pompanın çalıştırılması,</li>
        <li>Yağmur suyu deposu filtrelerinin temizlenmesi,</li>
        <li>Bahçe eğimleri ve zemin çökmelerinin kontrol edilmesi,</li>
        <li>Yoğun yağış öncesinde taşma güzergâhlarının açık tutulması.</li>
      </ul>
  
      <h3>Yeni Daire veya Bina Tesliminde Drenaj Sistemi Nasıl Kontrol Edilir?</h3>
      <p>Bir konut satın alınırken temel drenaj boruları dolgu altında kaldığı için gözle görülemeyebilir. Bu nedenle proje, fotoğraf, test ve uygulama kayıtlarının incelenmesi önemlidir.</p>
  
      <p>Teslim sırasında şu belgeler ve detaylar talep edilebilir:</p>
  
      <ul>
        <li>Zemin ve temel etüt raporu,</li>
        <li>Temel ve bodrum su yalıtımı detayları,</li>
        <li>Yağmur suyu ve drenaj tesisat projesi,</li>
        <li>Kontrol bacalarının yerleşim planı,</li>
        <li>Tahliye veya pompa sisteminin teknik bilgileri,</li>
        <li>Dolgu öncesinde çekilmiş uygulama fotoğrafları,</li>
        <li>Su yalıtımı ve drenaj test kayıtları,</li>
        <li>Pompa ve alarm kullanım talimatları,</li>
        <li>Bakım yapılacak noktaların erişim bilgileri.</li>
      </ul>
  
      <p>Ayrıca yağmur iniş borularının bina dibine boşalmadığı, bahçe zeminlerinin cepheye doğru eğimli olmadığı ve kontrol bacalarının erişilebilir olduğu yerinde kontrol edilmelidir.</p>
  
      <h3>Sık Sorulan Sorular</h3>
  
      <h4>Temel çevresine drenaj borusu döşemek zorunlu mudur?</h4>
      <p>Drenaj gereksinimi yapının temel tipi, zemin geçirgenliği, yeraltı su seviyesi ve maruz kalacağı su etkisine göre belirlenir. Her projeye aynı detay uygulanmaz; gerekli drenaj sistemi mimari, statik ve tesisat projelerinde gösterilmelidir.</p>
  
      <h4>Drenaj borusu kaç santimetre çapında olmalıdır?</h4>
      <p>Boru çapı toplanacak su miktarı, hat uzunluğu, eğim, zemin koşulları ve tahliye kapasitesine göre hidrolik hesapla belirlenmelidir. Her bina için geçerli tek bir boru çapı bulunmaz.</p>
  
      <h4>Drenaj borusunun üzerine mıcır dökmek yeterli midir?</h4>
      <p>Hayır. Agreganın temizliği ve dane özellikleri, borunun yerleşimi, geotekstil filtre katmanı, eğim, kontrol bacaları ve tahliye çıkışı birlikte çözülmelidir.</p>
  
      <h4>Drenaj suyu bahçeye bırakılabilir mi?</h4>
      <p>Suyun yeniden temel çevresine dönmeyeceği, komşu parsele zarar vermeyeceği ve zeminin sızdırmaya uygun olduğu teknik olarak doğrulanmadan kontrolsüz boşaltma yapılmamalıdır. Tahliye yöntemi ilgili idarenin şartlarına uygun olmalıdır.</p>
  
      <h4>Temel drenajı çalışıyorsa su yalıtımı gerekli midir?</h4>
      <p>Evet. Drenaj sistemi tıkanabilir, pompa arızalanabilir veya kapasitesi aşılabilir. Temel ve bodrum perdelerinde proje koşullarına uygun kesintisiz su yalıtımı ayrıca uygulanmalıdır.</p>
  
      <h4>Drenaj levhasının kabarcıklı yüzeyi hangi tarafa gelmelidir?</h4>
      <p>Yerleştirme yönü kullanılan ürünün sistem detayına göre değişebilir. Üreticinin teknik uygulama talimatı ve proje detayı esas alınmalıdır.</p>
  
      <h4>Bodrumdaki nem yalnızca temel drenajından mı kaynaklanır?</h4>
      <p>Hayır. Tesisat kaçağı, cephe ve pencere birleşimleri, teras su yalıtımı, yoğuşma, yüksek iç ortam nemi ve zemin kaynaklı kapiler nem de benzer belirtiler oluşturabilir.</p>
  
      <h4>Pompalı drenaj sistemi elektrik kesilince ne olur?</h4>
      <p>Yedek enerji veya ikinci pompa bulunmuyorsa toplama çukurundaki su seviyesi yükselerek taşabilir. Kritik projelerde yedek pompa, alarm ve alternatif enerji senaryosu hazırlanmalıdır.</p>
  
      <h4>Yağmur suyu deposunun taşma hattı nereye bağlanmalıdır?</h4>
      <p>Taşma hattı varsa yağmur suyu şebekesine veya ilgili idarenin onayladığı tahliye noktasına bağlanmalıdır. Taşan su temel çevresine, atık su hattına veya komşu parsele kontrolsüz biçimde bırakılmamalıdır.</p>
  
      <h3>Uzun Ömürlü Bir Yapıda Su Yönetimi Nasıl Olmalıdır?</h3>
      <p>Yağmur suyu yönetimi yalnızca temel çevresine bir boru yerleştirilerek çözülemez. Çatıdan başlayarak parsel çıkışına kadar suyun izleyeceği bütün güzergâh projede tanımlanmalıdır.</p>
  
      <p>Başarılı bir sistemde beş temel aşama birlikte çalışır:</p>
  
      <ol>
        <li><strong>Suyu yakalama:</strong> Çatı, teras, rampa ve sert zeminlerdeki su uygun süzgeç ve kanallarla toplanır.</li>
        <li><strong>Binadan uzaklaştırma:</strong> Yüzey kotları ve kapalı borular suyu temel çevresinden uzaklaştırır.</li>
        <li><strong>Yapıyı koruma:</strong> Temel ve bodrum perdelerinde kesintisiz su yalıtımı uygulanır.</li>
        <li><strong>Basıncı azaltma:</strong> Gerekli projelerde filtreli çevresel ve alansal drenaj sistemleri kurulur.</li>
        <li><strong>Güvenli tahliye:</strong> Su depolanır, yeniden kullanılır veya izin verilen altyapıya kontrollü biçimde iletilir.</li>
      </ol>
  
      <p>Bu sistemlerden birinin eksik olması, diğer bileşenlerin daha fazla zorlanmasına ve binanın kullanım ömrü boyunca tekrarlayan nem sorunları yaşamasına neden olabilir.</p>
  
      <h3>Neli Mühendislik ile Temelden Başlayan Yapı Güvenliği</h3>
      <p><strong>Neli Mühendislik</strong> olarak bir yapının güvenliğini yalnızca görünen mimari detaylarla değerlendirmiyoruz. Zemin ve temel çözümünden su yalıtımına, yağmur suyu tesisatından çevresel drenaja kadar binanın uzun ömürlü olmasını sağlayan bütün sistemleri birlikte ele alıyoruz.</p>
  
      <p>Özellikle temel, bodrum perdesi ve drenaj uygulamalarının geri dolgu yapılmadan önce kontrol edilmesi gerektiğini biliyor; sonradan erişilemeyecek yapı detaylarında proje ve uygulama kalitesine önem veriyoruz.</p>
  
      <p>İzmir'de geliştirdiğimiz güncel konut projelerini, daire seçeneklerini ve mühendislik yaklaşımımızı incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' rel='noopener noreferrer' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfasını ziyaret edebilirsiniz.</p>
    </article>`,
    coverImage: "/images/blog/temel-drenaji.webp",
    coverImageAlt:
      "Bina çevresinde yağmur suyu drenajı, temel su yalıtımı ve çevresel drenaj borusu uygulaması — Neli Mühendislik",
    category: "Su Yalıtımı ve Drenaj",
    tags: JSON.stringify([
      "temel drenajı",
      "yağmur suyu drenajı",
      "çevresel drenaj",
      "temel su yalıtımı",
      "bodrum su yalıtımı",
      "yağmur suyu tahliyesi",
      "İzmir konut projeleri",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle: "Bina Çevresi Yağmur Suyu ve Temel Drenajı | Neli Mühendislik",
    metaDescription:
      "Bina çevresinde yağmur suyu ve temel drenajı nasıl yapılır? Drenaj borusu, filtre agregası, su yalıtımı ve güvenli tahliye detayları.",
    metaKeywords:
      "bina çevresinde yağmur suyu drenajı, temel çevresi drenajı nasıl yapılır, temel drenaj borusu, bodrum perde su yalıtımı, çevresel drenaj sistemi, yağmur suyu tahliye hattı, drenaj levhası su yalıtımı, yağmur suyu toplama sistemi, İzmir yeni konut projeleri, Neli Mühendislik",
    publishedAt: "2026-07-06",
  },
  {
    slug: "apartmanlarda-yangin-kapisi-ve-duman-tahliye-sistemi",
    title: "Apartmanlarda Yangın Kapısı ve Duman Tahliye Sistemi Nasıl Olmalı?",
    excerpt:
      "Türkiye'deki yapı yönetmeliklerine göre apartmanlarda can güvenliğini sağlayan en önemli iki unsur yangın kapıları ve duman tahliye sistemleridir. Binaların Yangından Korunması Hakkında Yönetmelik kapsamında doğru yangın kapısı seçimi, merdiven basınçlandırma ve duman tahliyesi detaylarının nasıl tasarlanması gerektiğini inceleyin.",
    content: `<article>
        <h2>Binalarda Yangın Güvenliği Neden Proje Aşamasında Çözülmelidir?</h2>
        <p>Yangın anında binalarda yaşanan can kayıplarının en büyük nedeni doğrudan alevler değil, zehirli gazlar ve duman zehirlenmeleridir. Bu nedenle apartmanlarda ve konut projelerinde dumanın yaşam alanlarından uzaklaştırılması ve insanların güvenle tahliye edilebilmesi hayati önem taşır.</p>
    
        <p>Türkiye'de uygulanan Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY), binaların yüksekliğine, alanına ve kullanım amacına göre yangın kapısı ve duman tahliye sistemlerinin nasıl olması gerektiğini kesin kurallara bağlamıştır. Bu sistemlerin binaya sonradan entegre edilmesi hem çok maliyetli hem de mimari açıdan zorlayıcı olabilir. Doğru tasarımın henüz mimari ve mekanik projeler çizilirken yapılması şarttır.</p>
    
        <blockquote style='margin: 20px 0; padding: 10px 20px; border-left: 5px solid #b32128; background: #f9f9f9;'>
          <strong>Özet Cevap (AEO / Öne Çıkarılan Snippet):</strong> Türkiye'deki yönetmeliklere göre apartmanlarda yangın kapıları; en az 60 ila 90 dakika yangına dayanıklı, duman sızdırmaz contalı, kendiliğinden kapanabilen ve kaçış yönüne açılan yapıda olmalıdır. Duman tahliye sistemi ise binanın yüksekliğine göre doğal havalandırma (pencereler) veya mekanik sistemler (çatı tipi fanlar, merdiven basınçlandırma sistemleri) ile sağlanarak dumanın kaçış yollarına dolması engellenmelidir.
        </blockquote>
    
        <h3>1. Yönetmeliğe Uygun Yangın Kapısı Özellikleri Nelerdir?</h3>
        <p>Yangın kapıları, yangın anında alevlerin ve dumanın merdiven yuvalarına veya diğer güvenli bölgelere geçişini engellemek için tasarlanmış özel kapılardır. Standart bir çelik kapı, yangın kapısı yerine geçemez.</p>
    
        <p>Bir yangın kapısında bulunması gereken temel özellikler şunlardır:</p>
    
        <ul>
          <li><strong>Yangına Dayanım Süresi:</strong> Binanın yüksekliğine ve kullanım sınıfına göre kapıların en az 60, 90 veya 120 dakika (E, EW, EI sınıfları) bütünlüğünü ve yalıtımını koruması gerekir.</li>
          <li><strong>Duman Sızdırmazlık:</strong> Kapı kasası ve kanadı arasında, ısıya maruz kaldığında şişerek boşlukları kapatan intümesan (intumescent) contalar bulunmalıdır.</li>
          <li><strong>Kendiliğinden Kapanma (Kapı Kapatıcı):</strong> Kapıların açık unutulmasını engellemek için hidrolik kapatıcı (door closer) sistemine sahip olması zorunludur.</li>
          <li><strong>Kaçış Yönüne Açılma:</strong> Kapılar panik anında insanların yığılmasını önlemek amacıyla daima kaçış yönüne (merdivene veya dışarıya doğru) açılmalıdır.</li>
          <li><strong>Panik Bar Sistemi:</strong> Belirli bir kişi sayısını aşan alanlarda veya kaçış güzergahlarında, kapının kilitli dahi olsa içeriden itildiğinde kolayca açılmasını sağlayan panik bar donanımı bulunmalıdır.</li>
        </ul>
    
        <h3>2. Duman Tahliye Sistemi Nasıl Çalışır?</h3>
        <p>Duman tahliye sistemi, yangın sırasında oluşan sıcak dumanın ve zehirli gazların bina dışına atılmasını sağlayarak kaçış yollarını temiz tutar. İtfaiye ekiplerinin binaya güvenle girmesi ve müdahale edebilmesi için de bu sistemlerin doğru çalışması şarttır.</p>
    
        <p>Apartmanlarda duman tahliyesi iki ana yöntemle sağlanır:</p>
    
        <ul>
          <li><strong>Doğal Duman Tahliyesi:</strong> Yönetmeliğin izin verdiği yükseklikteki binalarda, merdiven sahanlıklarında bulunan ve dışarıya açılan pencereler aracılığıyla yapılır. Pencerelerin erişilebilir olması veya otomatik açılma mekanizmalarına sahip olması gerekir.</li>
          <li><strong>Mekanik Duman Tahliyesi:</strong> Doğal havalandırmanın yetersiz kaldığı durumlarda veya kapalı otopark gibi alanlarda, duman egzoz fanları ve duman damperleri kullanılarak dumanın kanallar vasıtasıyla cebri (mekanik) olarak dışarı atılması işlemidir.</li>
        </ul>
    
        <h3>3. Merdiven Yuvalarının Basınçlandırılması</h3>
        <p>Türkiye'deki yangın yönetmeliğine göre, yapı yüksekliği 51.50 metreyi geçen konut binalarında (yaklaşık 17 kat ve üzeri) yangın merdivenlerinin basınçlandırılması zorunludur. Ayrıca yüksekliği ne olursa olsun, bodrum kat sayısı dörtten fazla olan binalarda bodrum kata hizmet veren kaçış merdivenleri basınçlandırılmalıdır.</p>
    
        <p>Merdiven basınçlandırma sisteminin temel amacı şudur:</p>
    
        <p>Yangın anında merdiven yuvasına çatıdaki büyük fanlar aracılığıyla temiz hava basılır. Bu sayede merdiven boşluğunda, katlardaki basınca kıyasla daha yüksek bir hava basıncı (pozitif basınç) oluşturulur. Kat kapısı (yangın kapısı) açıldığında bile hava akımı merdivenden kata doğru olacağı için dumanın kaçış merdivenine girmesi fiziksel olarak engellenmiş olur.</p>
    
        <p>Basınçlandırma sistemi tasarlanırken dikkat edilmesi gerekenler:</p>
    
        <ul>
          <li>Kapılar kapalıyken merdiven yuvası ile bina kullanım alanları arasındaki basınç farkı en az 50 Pa olmalıdır.</li>
          <li>Kapılar açıkken hava akış hızı yönetmelikte belirtilen değerlerin altına düşmemelidir.</li>
          <li>Aşırı basınç oluşumunu engellemek için basınç tahliye damperleri (relief damper) kullanılmalıdır. Aksi takdirde yüksek basınç nedeniyle yangın kapıları itilip açılamayabilir.</li>
        </ul>
    
        <h3>4. Sistemin Otomasyonu ve Yangın Senaryosu</h3>
        <p>Mekanik duman tahliye ve basınçlandırma sistemleri tek başına bağımsız çalışamaz. Binanın yangın algılama ve ihbar sistemi ile entegre olmalıdır.</p>
    
        <p>Binadaki bir duman dedektörü yangını algıladığında yangın senaryosu devreye girer:</p>
    
        <ul>
          <li>Yangın alarm zilleri çalar ve asansörler belirlenen güvenli kata inerek kapılarını açık bırakır.</li>
          <li>Basınçlandırma fanları otomatik olarak çalışmaya başlar.</li>
          <li>Eğer varsa kapalı otopark veya sığınaklardaki duman egzoz fanları devreye girer.</li>
          <li>Taze hava damperleri açılır, yangın zonuna (bölgesine) göre ilgili duman damperleri konum değiştirir.</li>
          <li>Kapılarda bulunan elektromanyetik tutucular (eğer kapılar sürekli açık tutuluyorsa) serbest kalır ve kapılar hidrolik yaylarla otomatik olarak kapanır.</li>
        </ul>
    
        <h3>Sık Sorulan Sorular</h3>
    
        <h4>Yangın kapısını havalandırma amacıyla açık tutmak yasal mıdır?</h4>
        <p>Hayır. Yangın kapılarının takoz konularak veya iple bağlanarak açık tutulması çok tehlikeli ve mevzuata aykırıdır. Kapıların sürekli kapalı durması gerekir. Günlük kullanımda kapıların açık kalması isteniyorsa, yangın anında alarm sisteminden sinyal alarak kapıyı serbest bırakan elektromanyetik kapı tutucular kullanılmalıdır.</p>
    
        <h4>Apartmanımızda doğal havalandırma penceresi var, fan sistemine gerek var mı?</h4>
        <p>Binanızın yüksekliği ve mimari yapısı yönetmelikteki "doğal havalandırma ile çözülebilir" sınırları (konutlar için genellikle 51.50 metre altı) içindeyse ve pencerelerin alan ölçüleri yeterliyse mekanik fana ihtiyaç duyulmayabilir. Ancak tam gereksinimler mekanik tesisat projenizde hesaplanmış olmalıdır.</p>
    
        <h4>Yangın kapısı camlı olabilir mi?</h4>
        <p>Evet, olabilir. Ancak kullanılan camın standart bir cam veya telli cam olmaması gerekir. Camın da kapının kendisi gibi ilgili süre kadar (örneğin 90 dakika) yangına dayanım testlerinden geçmiş, yangın sertifikalı özel bir cam olması zorunludur.</p>
    
        <h4>Yangın kapılarının periyodik bakımı yapılmalı mıdır?</h4>
        <p>Kesinlikle. Kapı hidroliklerinin sertliği, contaların sağlamlığı, kilit ve panik bar mekanizmalarının çalışıp çalışmadığı bina yönetimi tarafından düzenli olarak kontrol ettirilmeli, sorunlu parçalar orijinal yangın dayanımlı yedek parçalarla değiştirilmelidir.</p>
    
        <h3>Neli Mühendislik ile Geleceğe Hazır Yaşam Alanları</h3>
        <p><strong>Neli Mühendislik</strong> olarak konut projelerini yalnızca bugünün ihtiyaçlarına göre değil, yönetmeliklere tam uyumlu ve can güvenliğini en üst düzeyde tutacak şekilde değerlendiriyoruz. Elektrik altyapısından yangın güvenliğine, mekanik havalandırmadan enerji verimliliğine kadar bütün sistemlerin birbiriyle uyumlu çalışmasını önemsiyoruz.</p>
    
        <p>İzmir'de geliştirdiğimiz güncel konut projelerini, daire seçeneklerini ve mühendislik yaklaşımımızı incelemek için <strong><a href='https://neli.tr/showcase' target='_blank' rel='noopener noreferrer' style='color: #b32128; font-weight: bold; text-decoration: underline;'>neli.tr/showcase</a></strong> sayfasını ziyaret edebilirsiniz.</p>
      </article>`,
    coverImage: "/images/blog/yangin-kapisi.webp",
    coverImageAlt:
      "Apartmanlarda yönetmeliğe uygun yangın kapısı ve duman tahliye sistemi — Neli Mühendislik",
    category: "Yangın Güvenlik Sistemleri",
    tags: JSON.stringify([
      "yangın kapısı",
      "duman tahliye sistemi",
      "merdiven basınçlandırma",
      "yangın yönetmeliği",
      "apartman güvenliği",
      "mekanik tesisat",
      "İzmir konut projeleri",
      "Neli Mühendislik",
    ]),
    featured: false,
    status: "published" as const,
    metaTitle:
      "Apartmanlarda Yangın Kapısı ve Duman Tahliye Sistemi | Neli Mühendislik",
    metaDescription:
      "Apartmanlarda yangın kapısı özellikleri, duman tahliye ve merdiven basınçlandırma sistemlerinin Türkiye yangın yönetmeliğine göre nasıl olması gerektiğini inceleyin.",
    metaKeywords:
      "apartmanlarda yangın kapısı ve duman tahliye sistemi nasıl olmalı, merdiven basınçlandırma zorunluluğu, yangın kapısı özellikleri, mekanik havalandırma, yangın otomasyonu, İzmir yeni konut projeleri, Neli Mühendislik",
    publishedAt: "2026-07-06",
  },
];

const PROJECT_DATA = [
  {
    slug: "valorya-1",
    name: "Valorya 1",
    location: "İzmir",
    year: "2025",
    type: "Apartman",
    description:
      "Kusursuz yalıtımlı, deprem güvenliği yüksek, 3 katlı modern apartman dairesi.",
    image: "/projects/valorya1/cover.webp",
    status: "Satışı Tamamlandı",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya1/map.webp",
      highlights: [
        "Üniversiteye, Sanayi Bölgesine yürüyüş mesafesi",
        "Zemin güçlendirmesiyle depreme karşı güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "1. kalite malzemelerle inşa edilmiş yapı",
      ],
      unitTypes: [{ type: "1+1", count: 6, grossArea: "46", netArea: "38 m2" }],
      totalUnits: 6,
      totalBlocks: 1,
      landscapeRatio: "12%",
      parking: "-",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Şubat 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Mart 2025",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Nisan 2024",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Mayıs 2024",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Haziran 2024",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "completed",
        completedDate: "Temmuz 2025",
      },
      { id: "handover", name: "Teslim", status: "completed" },
    ],
  },
  {
    slug: "valorya-2",
    name: "Valorya 2",
    location: "İzmir",
    year: "2024",
    type: "Apartman",
    description:
      "Doga ile ic ice, konforlu yasam alanlari sunan ozel villa projesi.",
    image: "/projects/valorya2/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya2/map.webp",
      highlights: [
        "Üniversiteye yakın, yatırım amaçlı ideal konum",
        "Depreme karşı güçlü yapı",
        "Enerji verimliliği yüksek yapı kabuğu",
        "4 katlı, toplam 16 daire",
      ],
      unitTypes: [
        { type: "1+1", count: 1, grossArea: "60 m2", netArea: "50 m2" },
        { type: "2+1", count: 11, grossArea: "77 m2", netArea: "65 m2" },
        { type: "3+1", count: 4, grossArea: "120 m2", netArea: "105 m2" },
      ],
      totalUnits: 16,
      totalBlocks: 1,
      landscapeRatio: "%12",
      parking: "Kapalı Otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Aralık 2024",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Ocak 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Mayıs 2025",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Haziran 2025",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Eylül 2025",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Kasım 2025",
      },
      {
        id: "landscape",
        name: "Peyzaj",
        status: "active",
        completedDate: "Şubat 2026",
      },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-3",
    name: "Valorya 3",
    location: "İzmir",
    year: "2023",
    type: "Apartman",
    description: "Premium kalite standartlarinda tasarlanmis villa kompleksi.",
    image: "/projects/valorya3/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Balatçık Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya3/map.webp",
      highlights: [
        "Üniversiteye yürüme mesafesi",
        "Depreme karşı güçlü yapı",
        "3 katlı, toplam 29 daire",
      ],
      unitTypes: [
        { type: "1+1", count: 22, grossArea: "50 m2", netArea: "45 m2" },
        { type: "2+1", count: 6, grossArea: "105 m2", netArea: "90 m2" },
        { type: "3+1", count: 1, grossArea: "110 m2", netArea: "95 m2" },
      ],
      totalUnits: 29,
      totalBlocks: 2,
      landscapeRatio: "%14",
      parking: "Kapalı otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Nisan 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Mayıs 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "completed",
        completedDate: "Haziran 2025",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "completed",
        completedDate: "Ağustos 2025",
      },
      {
        id: "finishing",
        name: "İnce İşler",
        status: "completed",
        completedDate: "Aralık 2025",
      },
      {
        id: "mep",
        name: "Mekanik & Elektrik",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      { id: "landscape", name: "Peyzaj", status: "active" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-4",
    name: "Valorya 4",
    location: "Karşıyaka, İzmir",
    year: "2023",
    type: "Apartman",
    description:
      "Yesil alanlari ve sosyal donatilariyla modern yasam kompleksi.",
    image: "/projects/valorya4/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Postacılar Mahallesi",
      district: "Karşıyaka",
      city: "İzmir",
      locationImage: "/projects/valorya4/map.webp",
      highlights: [
        "Bayraklı'ye yakın yüksek talep gören konum",
        "Depreme karşı güçlü yapı",
        "4 katlı, toplam 16 daire",
      ],
      unitTypes: [
        { type: "1+1", count: 3, grossArea: "43 m2", netArea: "41 m2" },
        { type: "2+1", count: 2, grossArea: "63 m2", netArea: "60 m2" },
        { type: "3+1", count: 1, grossArea: "150 m2", netArea: "115 m2" },
      ],
      totalUnits: 12,
      totalBlocks: 1,
      landscapeRatio: "%20",
      parking: "Kapali otopark + misafir park alani",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Şubat 2026",
      },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-5",
    name: "Valorya 5",
    location: "Çiğli, İzmir",
    year: "2022",
    type: "Villa",
    description: "Aile yasamina uygun, genis bahceli villa projesi.",
    image: "/projects/valorya5/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Balatçık Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya5/map.webp",
      highlights: [
        "Genis bahce ve acik hava yasam kurgusu",
        "Deprem yonetmeligine uygun tasiyici sistem",
        "Mahremiyet odakli villa yerlesimi",
      ],
      unitTypes: [
        { type: "5+2", count: 3, grossArea: "350 m2", netArea: "300 m2" },
      ],
      totalUnits: 16,
      totalBlocks: 1,
      landscapeRatio: "%15",
      parking: "Her villa icin ozel park alani",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      { id: "permit", name: "Ruhsat", status: "completed" },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-6",
    name: "Valorya 6",
    location: "Çiğli, İzmir",
    year: "2022",
    type: "Apartman",
    description: "Neli Muhendislik'in ilk villa projesi, zamansiz tasarim.",
    image: "/projects/valorya6/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya6/map.webp",
      highlights: [
        "Sadelik ve fonksiyonellik",
        "Butik olcekte guvenli komsuluk yasami",
      ],
      unitTypes: [
        { type: "2+1", count: 12, grossArea: "108 m2", netArea: "84 m2" },
        { type: "3+1", count: 8, grossArea: "136 m2", netArea: "106 m2" },
      ],
      totalUnits: 20,
      totalBlocks: 2,
      landscapeRatio: "%16",
      parking: "Acik otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Şubat 2026",
      },
      { id: "permit", name: "Ruhsat", status: "completed" },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "valorya-7",
    name: "Valorya 7",
    location: "Çiğli, İzmir",
    year: "2023",
    type: "Apartman",
    description:
      "Prestijli konumda, yuksek kaliteli malzemelerle insa edilmis apartman.",
    image: "/projects/valorya7/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Küçükçiğli Mahallesi",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/valorya7/map.webp",
      highlights: [
        "Merkezi konumda ulasim avantajli yasam",
        "Yuksek tavanli daireler",
      ],
      unitTypes: [
        { type: "1+1", count: 16, grossArea: "72 m2", netArea: "56 m2" },
        { type: "2+1", count: 20, grossArea: "108 m2", netArea: "84 m2" },
        { type: "3+1", count: 8, grossArea: "142 m2", netArea: "112 m2" },
      ],
      totalUnits: 44,
      totalBlocks: 1,
      landscapeRatio: "%28",
      parking: "Kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Mart 2026",
      },
      { id: "permit", name: "Ruhsat", status: "completed" },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "serenita-garden",
    name: "Serenita Garden",
    location: "Narlıdere, İzmir",
    year: "2022",
    type: "Villa",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitagarden/cover.webp",
    status: "Satışta",
    details: {
      neighborhood: "Sahilevleri Mahallesi",
      district: "Narlıdere",
      city: "İzmir",
      locationImage: "/projects/serenitagarden/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslari",
        "Aile odakli plan tipleri",
      ],
      unitTypes: [
        { type: "2+1", count: 30, grossArea: "110 m2", netArea: "85 m2" },
        { type: "3+1", count: 24, grossArea: "144 m2", netArea: "114 m2" },
      ],
      totalUnits: 54,
      totalBlocks: 3,
      landscapeRatio: "%16",
      parking: "Acik + kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2021",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Nisan 2021",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "active",
        completedDate: "Haziran 2021",
      },
      {
        id: "structure",
        name: "Kaba İnşaat",
        status: "pending",
        completedDate: "Kasım 2021",
      },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "serenita-prestige",
    name: "Serenita Prestige",
    location: "Sasalı, İzmir",
    year: "2026",
    type: "Villa",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitaprestige/cover.webp",
    status: "İnşaat",
    details: {
      neighborhood: "Sasalı",
      district: "Çiğli",
      city: "İzmir",
      locationImage: "/projects/serenitaprestige/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslari",
        "Aile odakli plan tipleri",
      ],
      unitTypes: [
        { type: "2+1", count: 30, grossArea: "110 m2", netArea: "85 m2" },
        { type: "3+1", count: 24, grossArea: "144 m2", netArea: "114 m2" },
      ],
      totalUnits: 54,
      totalBlocks: 3,
      landscapeRatio: "%46",
      parking: "Acik + kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Mart 2025",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Haziran 2025",
      },
      {
        id: "foundation",
        name: "Temel",
        status: "active",
        completedDate: "Eylül 2025",
      },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
  {
    slug: "serenita-park",
    name: "Serenita Park",
    location: "Menemen, İzmir",
    year: "2026",
    type: "Villa, Apartman",
    description: "Bahce konseptli, aile dostu toplu konut projesi.",
    image: "/projects/serenitapark/cover.webp",
    status: "İnşaat",
    details: {
      neighborhood: "Villakent Mahallesi",
      district: "Menemen",
      city: "İzmir",
      locationImage: "/projects/serenitapark/map.webp",
      highlights: [
        "Ortak bahce ve yuruyus akslari",
        "Aile odakli plan tipleri",
      ],
      unitTypes: [
        { type: "2+1", count: 30, grossArea: "110 m2", netArea: "85 m2" },
        { type: "3+1", count: 24, grossArea: "144 m2", netArea: "114 m2" },
      ],
      totalUnits: 56,
      totalBlocks: 3,
      landscapeRatio: "%16",
      parking: "Acik + kapali otopark",
    },
    phases: [
      {
        id: "design",
        name: "Proje Tasarımı",
        status: "completed",
        completedDate: "Ocak 2026",
      },
      {
        id: "permit",
        name: "Ruhsat",
        status: "completed",
        completedDate: "Şubat 2026",
      },
      { id: "foundation", name: "Temel", status: "active" },
      { id: "structure", name: "Kaba İnşaat", status: "pending" },
      { id: "finishing", name: "İnce İşler", status: "pending" },
      { id: "mep", name: "Mekanik & Elektrik", status: "pending" },
      { id: "landscape", name: "Peyzaj", status: "pending" },
      { id: "handover", name: "Teslim", status: "pending" },
    ],
  },
];

const MAP_PINS_DATA = [
  {
    name: "Serenita Prestige",
    lat: 38.491056,
    lng: 26.948444,
    neighborhood: "Sasalı",
    district: "Çiğli",
    image: "/projects/serenitaprestige/cover.webp",
    href: "/projeler",
  },
  {
    name: "Serenita Garden",
    lat: 38.4057116,
    lng: 26.9981004,
    neighborhood: "Sahilevleri Mahallesi",
    district: "Narlıdere",
    image: "/projects/serenitagarden/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 1",
    lat: 38.508889,
    lng: 27.039833,
    neighborhood: "Balatçık Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya1/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 2",
    lat: 38.4992059,
    lng: 27.0572575,
    neighborhood: "KucukÇiğli Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya2/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 3",
    lat: 38.517611,
    lng: 27.04,
    neighborhood: "Balatçık Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya3/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 4",
    lat: 38.482399,
    lng: 27.118534,
    neighborhood: "Postacılar Mahallesi",
    district: "Karsiyaka",
    image: "/projects/valorya4/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 5",
    lat: 38.508107,
    lng: 27.049398,
    neighborhood: "Esentepe Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya5/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 6",
    lat: 38.498116,
    lng: 27.057128,
    neighborhood: "KucukÇiğli Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya6/cover.webp",
    href: "/projeler",
  },
  {
    name: "Valorya 7",
    lat: 38.497562,
    lng: 27.057069,
    neighborhood: "KucukÇiğli Mahallesi",
    district: "Çiğli",
    image: "/projects/valorya7/cover.webp",
    href: "/projeler",
  },
];

const MILESTONE_DATA = [
  {
    year: "1989",
    title: "İran'da Tara Engineering Adıyla Kurulduk",
    description:
      'İran\'da "Ayrıcalıklı hissetmek herkesin hakkı" prensibiyle yola çıktık.',
    sortOrder: 0,
  },
  {
    year: "2021",
    title: "Neli Mühendislik Adıyla İzmir'de Faaliyetlere Başladık",
    description:
      "Onlarca restorasyon projesiyle kusursuz hizmet sunmaya başladık.",
    sortOrder: 1,
  },
  {
    year: "2022",
    title: "İlk İnşaat Projemiz",
    description: "Valorya 1 projesi için çalışmalar başladı.",
    sortOrder: 2,
  },
  {
    year: "2023",
    title: "Serenita Projelerine Başladık",
    description: "Serenita Prestige ve Serenita Garden projelerine başladık.",
    sortOrder: 3,
  },
  {
    year: "2024",
    title: "Yeni Projelerle Büyümeye Devam Ediyoruz",
    description: "Valorya 2 - 3 - 4 projelerinin temellerini attık.",
    sortOrder: 4,
  },
  {
    year: "2025",
    title: "Ardı Ardına Temelleri Atılan Projeler",
    description: "Valorya 5 - 6 - 7 ve Serenita Park projelerine başladık.",
    sortOrder: 5,
  },
];

const SETTINGS_DATA: Record<string, string> = {
  company_name: "Neli Mühendislik",
  company_logo: "/site-logo.webp",
  address: "Dedebaşı Mah. 6131 Sok. No:39/A\nKarşıyaka, İzmir",
  phone: "+90 554 704 90 74",
  phone2: "+90 232 441 44 42",
  email: "info@neli.tr",
  working_hours: "Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 14:00",
  social_instagram: "https://www.instagram.com/neli_muhendislik/",
  social_linkedin: "https://www.linkedin.com/company/neli-m%C3%BChendislik",
  social_twitter: "https://x.com/nelimuhendislik",
  social_facebook: "https://www.facebook.com/profile.php?id=100089633642677",
  seo_default_title: "Neli Mühendislik",
  seo_default_description:
    "Neli Mühendislik, İzmir'de modern ve kaliteli konut projeleri sunan güvenilir bir inşaat firmasıdır.",
  seo_default_keywords:
    "neli mühendislik, izmir inşaat, konut projeleri, valorya, serenita",
  seo_og_image: "https://neli.tr/og-image.jpg",
  maps_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1562.7!2d27.1057313!3d38.4680346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9dd2adbb0b9%3A0x6988352d26352bc!2zRGVkZWJhxZ_EsSwgNjEzMS4gU2suIE5vOjM5L0EsIDM1NTYwIEthcsWfxLF5YWthL8Swem1pcg!5e0!3m2!1str!2str!4v1707000000000!5m2!1str!2str",
  blog_categories: JSON.stringify([
    "Tümü",
    "İnşaat",
    "Gayrimenkul",
    "Mühendislik",
    "Mimari",
    "Projeler",
    "Restorasyon",
    "Dekorasyon",
    "فارسی",
    "العربية",
  ]),
};

async function seed() {
  console.log("Seeding database...");
  let seeded = false;

  db.delete(blogPosts)
    .where(inArray(blogPosts.slug, [...EXCLUDED_PUBLIC_BLOG_SLUGS]))
    .run();

  for (const post of BLOG_DATA) {
    const existing = db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, post.slug))
      .get();
    const now = new Date().toISOString();
    const payload = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      coverImageAlt: (post as { coverImageAlt?: string }).coverImageAlt ?? "",
      category: post.category,
      tags: post.tags,
      authorName: "Neli Mühendislik",
      authorAvatar: "/site-logo.webp",
      featured: post.featured,
      status: post.status,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      metaKeywords: post.metaKeywords,
      publishedAt: post.publishedAt,
      updatedAt: now,
    };
    if (!existing) {
      db.insert(blogPosts).values(payload).run();
      console.log(`Seeded blog post: ${post.slug}`);
      seeded = true;
    } else {
      db.update(blogPosts)
        .set(payload)
        .where(eq(blogPosts.slug, post.slug))
        .run();
      console.log(`Updated blog post: ${post.slug}`);
      seeded = true;
    }
  }

  {
    const now = new Date().toISOString();
    let inserted = 0;
    let updated = 0;
    for (const project of PROJECT_DATA) {
      const row = db
        .select()
        .from(projects)
        .where(eq(projects.slug, project.slug))
        .get();
      const payload = {
        name: project.name,
        location: project.location,
        year: project.year,
        type: project.type,
        description: project.description,
        image: project.image,
        status: project.status,
        detailsJson: JSON.stringify(project.details),
        phasesJson: JSON.stringify(project.phases),
        updatedAt: now,
      };
      if (row) {
        db.update(projects)
          .set(payload)
          .where(eq(projects.slug, project.slug))
          .run();
        updated++;
      } else {
        db.insert(projects)
          .values({ slug: project.slug, ...payload })
          .run();
        inserted++;
      }
    }
    if (inserted || updated) {
      console.log(
        `Projects synced from seed: ${inserted} inserted, ${updated} updated`,
      );
      seeded = true;
    }
  }

  if (!db.select().from(mapPins).get()) {
    for (const pin of MAP_PINS_DATA) {
      db.insert(mapPins).values(pin).run();
    }
    console.log(`Seeded ${MAP_PINS_DATA.length} map pins`);
    seeded = true;
  }

  if (!db.select().from(siteSettings).get()) {
    for (const [key, value] of Object.entries(SETTINGS_DATA)) {
      db.insert(siteSettings).values({ key, value }).run();
    }
    console.log(`Seeded ${Object.keys(SETTINGS_DATA).length} settings`);
    seeded = true;
  }

  if (!db.select().from(milestones).get()) {
    for (const m of MILESTONE_DATA) {
      db.insert(milestones).values(m).run();
    }
    console.log(`Seeded ${MILESTONE_DATA.length} milestones`);
    seeded = true;
  }

  console.log(
    seeded ? "Seed complete!" : "Database already seeded, nothing to do.",
  );
}

seed().catch(console.error);
