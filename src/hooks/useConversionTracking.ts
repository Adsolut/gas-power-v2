import { useCallback } from 'react';

export interface ConversionEvent {
  action: 'click_to_call' | 'callback_request' | 'form_submit' | 'page_view';
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
}

// Centralized conversion tracking hook
export const useConversionTracking = () => {
  
  // Track conversion events
  const trackEvent = useCallback((event: ConversionEvent) => {
    const timestamp = new Date().toISOString();
    
    // Console logging for development
    console.log(`[CONVERSION] ${event.action}:`, {
      ...event,
      timestamp
    });
    
    // Google Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: 'conversion',
        event_label: event.source,
        value: event.value || 1,
        custom_parameters: event.metadata
      });
    }
    
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', event.action === 'click_to_call' ? 'Contact' : 'Lead', {
        source: event.source,
        value: event.value || 1,
        currency: 'EUR'
      });
    }
    
    // Send to custom analytics endpoint
    sendToAnalytics({
      ...event,
      timestamp,
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer
    });
    
  }, []);

  // Handle direct calls
  const handleDirectCall = useCallback((source: string, phoneNumber: string = '0240137880') => {
    trackEvent({
      action: 'click_to_call',
      source,
      value: 10, // Peso maggiore per le chiamate dirette
      metadata: { phoneNumber }
    });
    
    window.location.href = `tel:${phoneNumber}`;
  }, [trackEvent]);

  // Handle callback requests
  const handleCallbackRequest = useCallback(async (data: CallbackData) => {
    trackEvent({
      action: 'callback_request',
      source: data.source,
      value: 8, // Valore per callback requests
      metadata: {
        preferredTime: data.preferredTime,
        hasName: !!data.name
      }
    });

    // Store callback request
    const requestData = {
      ...data,
      timestamp: new Date().toISOString(),
      id: generateRequestId()
    };

    try {
      // Save to localStorage for fallback
      const existingCallbacks = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
      existingCallbacks.push(requestData);
      localStorage.setItem('callbackRequests', JSON.stringify(existingCallbacks));

      // Send to server (replace with actual endpoint)
      console.log('Callback request stored:', requestData);
      
      return { success: true, data: requestData };
    } catch (error) {
      console.error('Error handling callback request:', error);
      return { success: false, error };
    }
  }, [trackEvent]);

  return {
    trackEvent,
    handleDirectCall,
    handleCallbackRequest
  };
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
