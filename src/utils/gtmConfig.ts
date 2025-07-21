// src/utils/gtmConfig.ts
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Tracking IDs:
// GTM Container ID: GTM-PMLRZS68
// Google Analytics 4 ID: G-QK1QV0MMWG
// Google Ads Conversion ID: AW-11559010191 (TROVATO!)
// Phone Conversion: AW-11559010191/GITxCLHKjegaEI__4Ycr
export class GTMManager {
  static push(data: GTMEvent) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push(data);
      console.log('[GTM Event]', data);
    }
  }

  // Conversion events for Gas e Power - OTTIMIZZATO PER GOOGLE ADS
  static trackConversion(action: string, source: string, value?: number, metadata?: Record<string, any>) {
    // Standard GTM event
    this.push({
      event: 'gas_power_conversion',
      conversion_action: action,
      conversion_source: source,
      conversion_value: value || 1,
      conversion_timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
      ...metadata
    });

    // NUOVO: Evento specifico per Google Ads
    if (action === 'click_to_call') {
      this.trackGoogleAdsConversion('phone_call', source, value || 10);
    } else if (action === 'callback_request') {
      this.trackGoogleAdsConversion('lead_generation', source, value || 8);
    }
  }

  // NUOVO: Eventi specifici per Google Ads Conversions
  static trackGoogleAdsConversion(conversionName: string, source: string, value: number) {
    // Evento generico per Google Ads
    this.push({
      event: 'conversion',
      google_conversion_name: conversionName,
      google_conversion_value: value,
      google_conversion_currency: 'EUR',
      google_conversion_source: source,
      send_to: 'AW-CONVERSION_ID/' + conversionName // Da configurare con il tuo Conversion ID
    });

    // Evento specifico per chiamate
    if (conversionName === 'phone_call') {
      this.push({
        event: 'phone_call_conversion',
        call_source: source,
        call_value: value,
        currency: 'EUR'
      });
    }

    // Evento specifico per lead
    if (conversionName === 'lead_generation') {
      this.push({
        event: 'lead_conversion', 
        lead_source: source,
        lead_value: value,
        currency: 'EUR'
      });
    }

    console.log(`[GOOGLE ADS CONVERSION] ${conversionName} from ${source} value €${value}`);
  }

  static trackCallClick(source: string, phoneNumber: string = '+390240137880') {
    // Evento GTM standard
    this.push({
      event: 'click_to_call',
      click_source: source,
      phone_number: phoneNumber,
      click_timestamp: new Date().toISOString(),
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });

    // NUOVO: Evento immediato per Google Ads
    this.trackGoogleAdsConversion('phone_call', source, 10);
  }

  static trackCallbackRequest(source: string, leadData: any) {
    // Evento GTM standard
    this.push({
      event: 'callback_request',
      request_source: source,
      lead_quality: leadData.leadScore || 0,
      has_name: !!leadData.name,
      phone_length: leadData.phone?.length || 0,
      preferred_time: leadData.preferredTime,
      request_timestamp: new Date().toISOString(),
      session_id: localStorage.getItem('session_id'),
      utm_source: localStorage.getItem('utm_source'),
      utm_medium: localStorage.getItem('utm_medium'),
      utm_campaign: localStorage.getItem('utm_campaign')
    });

    // NUOVO: Evento immediato per Google Ads
    this.trackGoogleAdsConversion('lead_generation', source, leadData.leadScore ? 12 : 8);
  }

  static trackPartnerClick(partnerName: string, source: string) {
    this.push({
      event: 'partner_click',
      partner_name: partnerName,
      click_source: source,
      click_timestamp: new Date().toISOString(),
      page_url: window.location.href
    });
  }

  static trackGenerateLead(leadSource: string, leadValue: number, leadData: any) {
    // Enhanced Ecommerce per GA4
    this.push({
      event: 'generate_lead',
      currency: 'EUR',
      value: leadValue,
      lead_source: leadSource,
      lead_quality: leadData.leadScore,
      items: [{
        item_id: `lead_${leadSource}_${Date.now()}`,
        item_name: `Gas e Power Lead - ${leadSource}`,
        item_category: 'energy_comparison',
        item_brand: 'Gas e Power',
        price: leadValue,
        quantity: 1
      }]
    });

    // NUOVO: Conversione Google Ads
    this.trackGoogleAdsConversion('lead_generation', leadSource, leadValue);
  }

  // NUOVO: Debug function per verificare il tracking
  static debugTracking() {
    console.log('🔍 [GTM DEBUG] Verifica configurazione tracking:');
    console.log('dataLayer presente:', typeof (window as any).dataLayer !== 'undefined');
    console.log('GTM Container ID: GTM-PMLRZS68');
    console.log('GA4 Property ID: G-QK1QV0MMWG');
    
    if (typeof (window as any).dataLayer !== 'undefined') {
      console.log('dataLayer events:', (window as any).dataLayer);
    }
    
    return {
      gtmLoaded: typeof (window as any).dataLayer !== 'undefined',
      ga4Loaded: typeof (window as any).gtag !== 'undefined',
      sessionId: localStorage.getItem('session_id'),
      utmSource: localStorage.getItem('utm_source')
    };
  }
}