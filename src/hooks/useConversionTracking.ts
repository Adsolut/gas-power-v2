import { useCallback } from 'react';
import { GTMManager } from '../utils/gtmConfig';

export interface ConversionEvent {
  action: 'click_to_call' | 'callback_request' | 'form_submit' | 'page_view' | 'engagement' | 'scroll_depth' | 'time_on_page';
  source: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface CallbackData {
  name: string;
  phone: string;
  preferredTime: string;
  source: string;
  timestamp?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// Enhanced conversion tracking hook for Gas e Power
export const useConversionTracking = () => {
  
  // Get UTM parameters for attribution
  const getUTMParameters = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get('utm_source') || localStorage.getItem('utm_source') || 'direct',
      utmMedium: urlParams.get('utm_medium') || localStorage.getItem('utm_medium') || 'none',
      utmCampaign: urlParams.get('utm_campaign') || localStorage.getItem('utm_campaign') || 'none',
      utmTerm: urlParams.get('utm_term') || localStorage.getItem('utm_term') || '',
      utmContent: urlParams.get('utm_content') || localStorage.getItem('utm_content') || ''
    };
  }, []);

  // Store UTM parameters in localStorage for session attribution
  const storeUTMParameters = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        localStorage.setItem(param, value);
      }
    });
  }, []);
  
  // Enhanced tracking with multiple analytics platforms
  const trackEvent = useCallback((event: ConversionEvent) => {
    const timestamp = new Date().toISOString();
    const utmParams = getUTMParameters();
    const sessionId = localStorage.getItem('session_id') || generateSessionId();
    
    const enhancedEvent = {
      ...event,
      timestamp,
      sessionId,
      ...utmParams,
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };
    
    // Console logging for development
    console.log(`[GAS E POWER TRACKING] ${event.action}:`, enhancedEvent);
    
    // GTM Integration
    GTMManager.trackConversion(event.action, event.source, event.value, event.metadata);
    
    // Google Analytics 4 Enhanced Events
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: 'gas_power_conversion',
        event_label: event.source,
        value: event.value || 1,
        currency: 'EUR',
        custom_parameter_1: event.source,
        custom_parameter_2: event.value,
        campaign_source: utmParams.utmSource,
        campaign_medium: utmParams.utmMedium,
        campaign_name: utmParams.utmCampaign,
        session_id: sessionId,
        ...event.metadata
      });
    }
    
    // Facebook Pixel Enhanced Events
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbEventType = event.action === 'click_to_call' ? 'Contact' : 'Lead';
      (window as any).fbq('track', fbEventType, {
        source: event.source,
        value: event.value || 1,
        currency: 'EUR',
        content_name: 'Gas e Power Energy Comparison',
        campaign_source: utmParams.utmSource
      });
    }
    
    // Send to custom analytics endpoint
    sendToAnalytics(enhancedEvent);
    
  }, [getUTMParameters]);

  // Handle direct calls with enhanced tracking
  const handleDirectCall = useCallback((source: string, phoneNumber: string = '0240137880') => {
    const callValue = getCallValue(source);
    
    trackEvent({
      action: 'click_to_call',
      source,
      value: callValue,
      metadata: { 
        phoneNumber,
        callType: 'direct',
        expectedConversionRate: getExpectedConversionRate(source)
      }
    });
    
    // Track in localStorage for offline analysis
    const callData = {
      timestamp: new Date().toISOString(),
      source,
      phoneNumber,
      value: callValue,
      sessionId: localStorage.getItem('session_id'),
      ...getUTMParameters()
    };
    
    const existingCalls = JSON.parse(localStorage.getItem('direct_calls') || '[]');
    existingCalls.push(callData);
    localStorage.setItem('direct_calls', JSON.stringify(existingCalls));
    
    window.location.href = `tel:${phoneNumber}`;
  }, [trackEvent, getUTMParameters]);

  // Handle callback requests with enhanced data collection
  const handleCallbackRequest = useCallback(async (data: CallbackData) => {
    const callbackValue = getCallbackValue(data.source);
    
    trackEvent({
      action: 'callback_request',
      source: data.source,
      value: callbackValue,
      metadata: {
        preferredTime: data.preferredTime,
        hasName: !!data.name,
        phoneLength: data.phone.length,
        leadQuality: calculateLeadQuality(data)
      }
    });

    // Enhanced callback data with attribution
    const requestData = {
      ...data,
      timestamp: new Date().toISOString(),
      id: generateRequestId(),
      sessionId: localStorage.getItem('session_id') || generateSessionId(),
      value: callbackValue,
      leadScore: calculateLeadQuality(data),
      ...getUTMParameters(),
      pageUrl: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };

    try {
      // Save to localStorage for fallback
      const existingCallbacks = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      existingCallbacks.push(requestData);
      localStorage.setItem('callbackRequests', JSON.stringify(existingCallbacks));

      // Track successful submission
      trackEvent({
        action: 'form_submit',
        source: `${data.source}_success`,
        value: callbackValue,
        metadata: { leadId: requestData.id }
      });
      
      return { success: true, data: requestData };
    } catch (error) {
      console.error('Error handling callback request:', error);
      
      // Track failed submission
      trackEvent({
        action: 'form_submit',
        source: `${data.source}_error`,
        value: 0,
        metadata: { error: error.message }
      });
      
      return { success: false, error };
    }
  }, [trackEvent, getUTMParameters]);

  // Initialize tracking on component mount
  const initializeTracking = useCallback(() => {
    // Store UTM parameters
    storeUTMParameters();
    
    // Generate or retrieve session ID
    if (!localStorage.getItem('session_id')) {
      localStorage.setItem('session_id', generateSessionId());
    }
    
    // Track page view
    trackEvent({
      action: 'page_view',
      source: 'initial_load',
      value: 1,
      metadata: {
        isFirstVisit: !localStorage.getItem('returning_visitor'),
        sessionStart: new Date().toISOString()
      }
    });
    
    // Mark as returning visitor
    localStorage.setItem('returning_visitor', 'true');
    localStorage.setItem('session_start', Date.now().toString());
    
    // Set up scroll tracking
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent({
          action: 'scroll_depth',
          source: 'page_engagement',
          value: scrollPercent,
          metadata: { scrollPercentage: scrollPercent }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set up time tracking
    const timeIntervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    timeIntervals.forEach(seconds => {
      setTimeout(() => {
        trackEvent({
          action: 'time_on_page',
          source: 'page_engagement',
          value: seconds,
          metadata: { timeSeconds: seconds }
        });
      }, seconds * 1000);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackEvent, storeUTMParameters]);

  return {
    trackEvent,
    handleDirectCall,
    handleCallbackRequest,
    initializeTracking
  };
};

// Utility functions
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getCallValue = (source: string): number => {
  const valueMap: Record<string, number> = {
    'hero': 15,
    'sticky_mobile': 12,
    'header': 10,
    'final_cta': 8,
    'process_steps': 6,
    'footer': 4
  };
  return valueMap[source] || 5;
};

const getCallbackValue = (source: string): number => {
  const valueMap: Record<string, number> = {
    'hero': 12,
    'sticky_mobile': 10,
    'header': 8,
    'final_cta': 6,
    'process_steps': 4,
    'footer': 3
  };
  return valueMap[source] || 4;
};

const getExpectedConversionRate = (source: string): number => {
  const conversionMap: Record<string, number> = {
    'sticky_mobile': 0.25,
    'hero': 0.20,
    'header': 0.15,
    'final_cta': 0.12,
    'process_steps': 0.08,
    'footer': 0.05
  };
  return conversionMap[source] || 0.10;
};

const calculateLeadQuality = (data: CallbackData): number => {
  let score = 0;
  
  // Name provided
  if (data.name && data.name.length > 2) score += 20;
  
  // Phone number format
  if (data.phone && data.phone.length >= 10) score += 30;
  
  // Preferred time shows engagement
  if (data.preferredTime && data.preferredTime !== 'anytime') score += 15;
  
  // UTM source quality
  const utmSource = localStorage.getItem('utm_source');
  if (utmSource === 'google') score += 20;
  else if (utmSource === 'facebook') score += 15;
  else if (utmSource === 'direct') score += 10;
  
  return Math.min(score, 100);
};

// Analytics utilities
const sendToAnalytics = async (data: any) => {
  try {
    // Replace with your actual analytics endpoint
    console.log('[ANALYTICS]', data);
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // });
  } catch (error) {
    console.warn('Analytics sending failed:', error);
  }
};

const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// A/B Testing utilities
export const useABTesting = () => {
  const getVariant = useCallback((testName: string, variants: string[]) => {
    // Get or create user ID for consistent variant assignment
    let userId = localStorage.getItem('ab_test_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ab_test_user_id', userId);
    }
    
    // Simple hash-based assignment
    const hash = hashCode(userId + testName);
    const variantIndex = Math.abs(hash) % variants.length;
    const variant = variants[variantIndex];
    
    // Track assignment
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test_assignment', {
        event_category: 'experiment',
        test_name: testName,
        variant: variant,
        user_id: userId
      });
    }
    
    return variant;
  }, []);

  return { getVariant };
};

// Simple hash function for A/B testing
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
