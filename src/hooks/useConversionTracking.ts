// src/hooks/useConversionTracking.ts
import { useCallback, useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

interface TrackingEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export const useConversionTracking = () => {
  useEffect(() => {
    // Initialize Google Analytics if not already present
    if (!window.gtag && import.meta.env.VITE_GA4_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA4_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', import.meta.env.VITE_GA4_MEASUREMENT_ID);
    }
  }, []);

  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: new Date().toISOString(),
        environment: import.meta.env.VITE_ENV || 'development'
      });
    }
    
    // Also log to console in development
    if (import.meta.env.VITE_DEBUG === 'true') {
      console.log('[Analytics Event]', eventName, parameters);
    }
  }, []);

  const trackConversion = useCallback((conversionType: string, value?: number, currency: string = 'EUR') => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency,
      send_to: import.meta.env.VITE_GA4_MEASUREMENT_ID
    });
  }, [trackEvent]);

  const trackPageView = useCallback((path: string, title?: string) => {
    trackEvent('page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }, [trackEvent]);

  const trackUserEngagement = useCallback((engagementType: string, details?: Record<string, unknown>) => {
    trackEvent('user_engagement', {
      engagement_type: engagementType,
      ...details
    });
  }, [trackEvent]);

  const trackPowerProEvent = useCallback((action: string, details?: Record<string, unknown>) => {
    trackEvent('power_pro_event', {
      action: action,
      ...details
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackConversion,
    trackPageView,
    trackUserEngagement,
    trackPowerProEvent
  };
};

export default useConversionTracking;
