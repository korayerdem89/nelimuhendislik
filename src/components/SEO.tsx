import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const defaultMeta = {
  title: "Neli Mühendislik",
  description:
    "Neli Mühendislik, İzmir'de modern ve kaliteli konut projeleri sunan güvenilir bir inşaat firmasıdır. Valorya ve Serenita projeleriyle hayalinizdeki eve kavuşun.",
  keywords:
    "neli mühendislik, izmir inşaat, konut projeleri, valorya, serenita, çiğli konut, karşıyaka daire",
  image: "https://nelimuhendislik.com/og-image.jpg",
  url: "https://nelimuhendislik.com",
};

export default function SEO({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = "website",
}: SEOProps) {
  const fullTitle = title
    ? `${title} | Neli Mühendislik`
    : "Neli Mühendislik | İzmir'de Kaliteli Konut Projeleri";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
