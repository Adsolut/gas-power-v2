// src/hooks/useSEO.ts
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
  nofollow?: boolean;
}

export const useSEO = () => {
  const location = useLocation();

  const setMetaTag = useCallback((name: string, content: string, isProperty: boolean = false) => {
    const attributeName = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attributeName}="${name}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, name);
      document.head.appendChild(element);
    }
    
    element.content = content;
  }, []);

  const initSEO = useCallback((config: SEOConfig) => {
    // Set title
    if (config.title) {
      document.title = config.title;
      setMetaTag('og:title', config.title, true);
      setMetaTag('twitter:title', config.title);
    }

    // Set description
    if (config.description) {
      setMetaTag('description', config.description);
      setMetaTag('og:description', config.description, true);
      setMetaTag('twitter:description', config.description);
    }

    // Set keywords
    if (config.keywords) {
      setMetaTag('keywords', config.keywords);
    }

    // Set Open Graph image
    if (config.ogImage) {
      const imageUrl = config.ogImage.startsWith('http') 
        ? config.ogImage 
        : `${window.location.origin}${config.ogImage}`;
      setMetaTag('og:image', imageUrl, true);
      setMetaTag('twitter:image', imageUrl);
    }

    // Set Open Graph type
    setMetaTag('og:type', config.ogType || 'website', true);

    // Set canonical URL
    if (config.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = config.canonicalUrl;
    }

    // Set robots meta
    if (config.noindex || config.nofollow) {
      const robotsContent = [
        config.noindex ? 'noindex' : 'index',
        config.nofollow ? 'nofollow' : 'follow'
      ].join(', ');
      setMetaTag('robots', robotsContent);
    }

    // Set structured data
    if (config.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(config.structuredData);
    }

    // Set Twitter card type
    setMetaTag('twitter:card', 'summary_large_image');

    // Set OG URL
    setMetaTag('og:url', window.location.href, true);
  }, [setMetaTag]);

  // Auto-update URL-based meta tags on route change
  useEffect(() => {
    setMetaTag('og:url', window.location.href, true);
  }, [location, setMetaTag]);

  const updateTitle = useCallback((title: string) => {
    document.title = title;
    setMetaTag('og:title', title, true);
    setMetaTag('twitter:title', title);
  }, [setMetaTag]);

  const updateDescription = useCallback((description: string) => {
    setMetaTag('description', description);
    setMetaTag('og:description', description, true);
    setMetaTag('twitter:description', description);
  }, [setMetaTag]);

  return {
    initSEO,
    updateTitle,
    updateDescription,
    setMetaTag
  };
};

export default useSEO;
