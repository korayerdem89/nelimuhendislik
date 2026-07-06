import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  /** Ana sayfa için tam başlık (suffix eklenmez) */
  isHome?: boolean;
  lang?: string;
}

const SITE_ORIGIN = "https://neli.tr";

const defaultMeta = {
  title: "Neli Mühendislik",
  description:
    "Neli Mühendislik, İzmir'de modern ve kaliteli konut projeleri sunan güvenilir bir inşaat firmasıdır. Valorya ve Serenita projeleriyle hayalinizdeki eve kavuşun.",
  keywords:
    "neli mühendislik, izmir inşaat, konut projeleri, valorya, serenita, çiğli konut, karşıyaka daire",
  image: "https://neli.tr/og-image.jpg",
  url: "https://neli.tr/",
};

const HOME_TITLE = "Neli Mühendislik | İzmir'de Kaliteli Konut Projeleri";

export default function SEO({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = "website",
  isHome = false,
  lang = "tr",
}: SEOProps) {
  const fullTitle = isHome
    ? HOME_TITLE
    : title
      ? `${title} | Neli Mühendislik`
      : HOME_TITLE;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta httpEquiv="content-language" content="tr-TR" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content="Neli Mühendislik" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical & hreflang */}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="tr" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
}

export { SITE_ORIGIN, HOME_TITLE };
