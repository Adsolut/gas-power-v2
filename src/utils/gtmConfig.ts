// src/utils/gtmConfig.ts
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Tracking IDs:
// GTM Container ID: GTM-PMLRZS68
// Google Analytics 4 ID: G-QK1QV0MMWG
export class GTMManager {
  static push(data: GTMEvent) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push(data);
      console.log('[GTM Event]', data);
    }
  }

  // Conversion events for Gas e Power
  static trackConversion(action: string, source: string, value?: number, metadata?: Record<string, any>) {
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
  }

  static trackCallClick(source: string, phoneNumber: string = '0240137880') {
    this.push({
      event: 'click_to_call',
      click_source: source,
      phone_number: phoneNumber,
      click_timestamp: new Date().toISOString(),
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
  }

  static trackCallbackRequest(source: string, leadData: any) {
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
  }
}