// src/components/SEO/SEOHead.tsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'service';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOProps> = ({
  title = "Gas e Power - Confronta e Risparmia su Luce, Gas e Internet | Consulenza Gratuita",
  description = "🔥 Risparmia fino a €300/anno sulla bolletta! Confronta GRATIS le migliori offerte di luce, gas e internet. Consulenza telefonica immediata ☎️ 02 4013 7880",
  keywords = "confronto offerte luce, confronto offerte gas, risparmio bolletta, offerte energia elettrica, offerte gas metano, cambio fornitore energia, consulenza energetica gratuita",
  image = "https://gasepower.it/img/social/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Gas e Power",
  canonicalUrl,
  structuredData
}) => {
  const location = useLocation();
  const currentUrl = `https://tuodominio.it${location.pathname}`;
  const canonical = canonicalUrl || currentUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Gas e Power" />
      <meta property="og:locale" content="it_IT" />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:image:alt" content={title} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;