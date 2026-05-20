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
    status: "Satışta",
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
        { type: "1+1", count: 3, grossArea: "82 m2", netArea: "63 m2" },
        { type: "2+1", count: 3, grossArea: "112 m2", netArea: "87 m2" },
      ],
      totalUnits: 12,
      totalBlocks: 1,
      landscapeRatio: "%40",
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
