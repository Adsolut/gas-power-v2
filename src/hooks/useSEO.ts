// src/hooks/useSEO.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GTMManager } from '../utils/gtmConfig';

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    GTMManager.push({
      event: 'page_view',
      page_url: window.location.href,
      page_path: location.pathname,
      page_title: document.title,
      page_timestamp: new Date().toISOString()
    });

    // Update canonical URL if needed
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.href);
    }

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        GTMManager.push({
          event: 'scroll_depth',
          scroll_percentage: scrollPercent,
          page_url: window.location.href,
          scroll_timestamp: new Date().toISOString()
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const updatePageTitle = (title: string) => {
    document.title = title;
    GTMManager.push({
      event: 'title_change',
      new_title: title,
      page_url: window.location.href
    });
  };

  const updateMetaDescription = (description: string) => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  };

  return {
    updatePageTitle,
    updateMetaDescription
  };
};