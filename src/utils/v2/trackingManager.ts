// Enhanced tracking utilities for v2.0 Marketing Strategy
// Tracks specific events related to the new positioning and Power Pro service

interface V2TrackingEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

// Extend Window interface for analytics tools
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

class V2TrackingManager {
  private version = '2.0';
  
  // Core v2.0 tracking events
  trackVersionView(version: '1.0' | '2.0') {
    this.sendEvent({
      action: 'version_shown',
      category: 'ab_test',
      label: version === '2.0' ? 'v2_marketing' : 'v1_legacy',
      metadata: { version }
    });
  }
  
  trackPowerProInterest(source: string) {
    this.sendEvent({
      action: 'power_pro_interest',
      category: 'engagement',
      label: source,
      value: 5, // Higher value for premium service interest
      metadata: { 
        source,
        timestamp: new Date().toISOString(),
        pricing: '1.99_eur_monthly'
      }
    });
  }
  
  trackPowerProDiscovery(source: string) {
    this.sendEvent({
      action: 'power_pro_discovery',
      category: 'engagement', 
      label: source,
      value: 3,
      metadata: { 
        source,
        cta_type: 'discover_button'
      }
    });
  }
  
  trackWaitlistSignup(email: string, source: string) {
    this.sendEvent({
      action: 'power_pro_waitlist_signup',
      category: 'conversion',
      label: source,
      value: 10, // High value for qualified leads
      metadata: {
        source,
        has_email: !!email,
        launch_target: 'september_2025',
        discount_offered: '50_percent_first_month'
      }
    });
  }
  
  trackConsultantPositioning(interaction: string) {
    this.sendEvent({
      action: 'consultant_positioning_engagement',
      category: 'brand_evolution',
      label: interaction,
      metadata: {
        new_positioning: 'energy_efficiency_consultants',
        old_positioning: 'energy_provider_comparison'
      }
    });
  }
  
  trackROICalculatorUsage(inputs: Record<string, unknown>) {
    this.sendEvent({
      action: 'roi_calculator_used',
      category: 'tool_engagement',
      label: 'power_pro_calculator',
      value: 2,
      metadata: {
        ...inputs,
        calculation_type: 'power_pro_roi'
      }
    });
  }
  
  trackServiceDetailView(serviceName: string) {
    this.sendEvent({
      action: 'service_detail_viewed',
      category: 'power_pro_exploration',
      label: serviceName,
      metadata: {
        service_category: 'power_pro_features',
        pricing_context: '1.99_monthly'
      }
    });
  }
  
  trackCaseStudyEngagement(caseStudyId: string, engagement: string) {
    this.sendEvent({
      action: 'case_study_engagement',
      category: 'social_proof',
      label: `${caseStudyId}_${engagement}`,
      metadata: {
        case_study: caseStudyId,
        engagement_type: engagement,
        social_proof_type: 'success_story'
      }
    });
  }
  
  trackBeforeAfterComparison(timeSpent: number) {
    this.sendEvent({
      action: 'before_after_comparison_viewed',
      category: 'value_proposition',
      label: 'traditional_vs_power_pro',
      value: Math.round(timeSpent / 1000), // Convert to seconds
      metadata: {
        time_spent_ms: timeSpent,
        comparison_type: 'traditional_vs_consultant'
      }
    });
  }
  
  // A/B testing utilities
  trackABVariant(testName: string, variant: string, userId: string) {
    this.sendEvent({
      action: 'ab_test_assignment',
      category: 'experiment',
      label: `${testName}_${variant}`,
      metadata: {
        test_name: testName,
        variant,
        user_id: userId,
        version: this.version
      }
    });
  }
  
  // Conversion funnel tracking
  trackFunnelStep(step: string, source: string, additionalData?: Record<string, unknown>) {
    const funnelSteps = {
      'awareness': 1,
      'interest': 2, 
      'consideration': 3,
      'intent': 4,
      'evaluation': 5,
      'purchase': 6
    };
    
    this.sendEvent({
      action: 'funnel_progression',
      category: 'conversion_funnel',
      label: `${step}_from_${source}`,
      value: funnelSteps[step as keyof typeof funnelSteps] || 0,
      metadata: {
        funnel_step: step,
        source,
        step_number: funnelSteps[step as keyof typeof funnelSteps],
        ...additionalData
      }
    });
  }
  
  // Business intelligence tracking
  trackBusinessMetric(metric: string, value: number, context?: Record<string, unknown>) {
    this.sendEvent({
      action: 'business_metric',
      category: 'kpi_tracking',
      label: metric,
      value,
      metadata: {
        metric_name: metric,
        metric_value: value,
        measurement_context: context,
        strategy_version: this.version
      }
    });
  }
  
  private sendEvent(event: V2TrackingEvent) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_1: event.metadata?.source,
        custom_parameter_2: event.metadata?.version || this.version,
        custom_parameter_3: event.metadata?.pricing || 'power_pro_1_99',
        ...event.metadata
      });
    }
    
    // Facebook Pixel Enhanced Events
    if (typeof window !== 'undefined' && window.fbq) {
      let fbEventType = 'ViewContent';
      
      // Map to Facebook events
      if (event.action.includes('waitlist') || event.action.includes('signup')) {
        fbEventType = 'Lead';
      } else if (event.action.includes('interest') || event.action.includes('discovery')) {
        fbEventType = 'InitiateCheckout';
      }
      
      window.fbq('track', fbEventType, {
        content_name: `Power Pro ${event.action}`,
        content_category: event.category,
        value: event.value || 1,
        currency: 'EUR',
        custom_data: event.metadata
      });
    }
    
    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[V2.0 TRACKING] ${event.action}:`, {
        category: event.category,
        label: event.label,
        value: event.value,
        metadata: event.metadata
      });
    }
    
    // Custom analytics endpoint (if available)
    this.sendToCustomAnalytics(event);
  }
  
  private async sendToCustomAnalytics(event: V2TrackingEvent) {
    try {
      // Replace with your actual analytics endpoint
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        await fetch('/api/analytics/v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...event,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            user_agent: navigator.userAgent,
            strategy_version: this.version
          })
        });
      }
    } catch (error) {
      console.warn('[V2 Analytics] Failed to send to custom endpoint:', error);
    }
  }
}

// Singleton instance
export const v2Tracker = new V2TrackingManager();

// Convenience hooks for React components
export const useV2Tracking = () => {
  return {
    trackPowerProInterest: (source: string) => v2Tracker.trackPowerProInterest(source),
    trackPowerProDiscovery: (source: string) => v2Tracker.trackPowerProDiscovery(source),
    trackWaitlistSignup: (email: string, source: string) => v2Tracker.trackWaitlistSignup(email, source),
    trackServiceDetail: (service: string) => v2Tracker.trackServiceDetailView(service),
    trackCaseStudy: (id: string, engagement: string) => v2Tracker.trackCaseStudyEngagement(id, engagement),
    trackROICalculator: (inputs: Record<string, unknown>) => v2Tracker.trackROICalculatorUsage(inputs),
    trackFunnelStep: (step: string, source: string, data?: Record<string, unknown>) => v2Tracker.trackFunnelStep(step, source, data)
  };
};

// A/B Testing utilities
export const useV2ABTesting = () => {
  const getUserId = () => {
    let userId = localStorage.getItem('v2_user_id');
    if (!userId) {
      userId = `v2_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('v2_user_id', userId);
    }
    return userId;
  };
  
  const getVariant = (testName: string, variants: string[]) => {
    const userId = getUserId();
    const hash = hashString(userId + testName);
    const variantIndex = Math.abs(hash) % variants.length;
    const variant = variants[variantIndex];
    
    // Track assignment
    v2Tracker.trackABVariant(testName, variant, userId);
    
    return variant;
  };
  
  return { getVariant, getUserId };
};

// Simple hash function for consistent A/B testing
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export default v2Tracker;