// Power Pro Waitlist and Lead Management
// Simple implementation without full payment/subscription system

import { useState, useCallback } from 'react';
import { v2Tracker } from '../utils/v2/trackingManager';

export interface PowerProLead {
  id?: string;
  email: string;
  phone?: string;
  source: string;
  interests: string[];
  notifyOnLaunch: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface PowerProInterest {
  userId: string;
  interestLevel: 'low' | 'medium' | 'high';
  servicesInterested: string[];
  source: string;
  timestamp: string;
}

export const usePowerProLeads = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leads, setLeads] = useState<PowerProLead[]>([]);

  // Save lead to waitlist
  const saveToWaitlist = useCallback(async (leadData: Omit<PowerProLead, 'id' | 'createdAt'>) => {
    setIsSubmitting(true);
    
    try {
      const lead: PowerProLead = {
        ...leadData,
        id: generateLeadId(),
        createdAt: new Date().toISOString()
      };

      // Track the signup
      v2Tracker.trackWaitlistSignup(lead.email, lead.source);
      
      // Save to localStorage for demo (replace with actual backend)
      const existingLeads = getStoredLeads();
      const updatedLeads = [...existingLeads, lead];
      localStorage.setItem('power_pro_waitlist', JSON.stringify(updatedLeads));
      
      // Update state
      setLeads(updatedLeads);
      
      // Send to backend (when implemented)
      await sendToBackend(lead);
      
      setIsSubmitting(false);
      return { success: true, leadId: lead.id };
      
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error saving to waitlist:', error);
      return { success: false, error: (error as Error).message };
    }
  }, []);

  // Track interest without collecting email
  const trackInterest = useCallback((source: string, servicesInterested: string[] = []) => {
    const interest: PowerProInterest = {
      userId: getUserId(),
      interestLevel: 'medium',
      servicesInterested,
      source,
      timestamp: new Date().toISOString()
    };
    
    // Track the interest
    v2Tracker.trackPowerProInterest(source);
    
    // Save interest data
    const existingInterests = getStoredInterests();
    existingInterests.push(interest);
    localStorage.setItem('power_pro_interests', JSON.stringify(existingInterests));
    
    return interest;
  }, []);

  // Get analytics data
  const getWaitlistAnalytics = useCallback(() => {
    const leads = getStoredLeads();
    const interests = getStoredInterests();
    
    return {
      totalLeads: leads.length,
      totalInterests: interests.length,
      leadsBySource: groupBy(leads, 'source'),
      interestsBySource: groupBy(interests, 'source'),
      conversionRate: interests.length > 0 ? (leads.length / interests.length) * 100 : 0,
      recentLeads: leads.filter(lead => 
        new Date(lead.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length
    };
  }, []);

  // Export data for analysis
  const exportWaitlistData = useCallback(() => {
    const leads = getStoredLeads();
    const interests = getStoredInterests();
    const analytics = getWaitlistAnalytics();
    
    const exportData = {
      export_date: new Date().toISOString(),
      summary: analytics,
      leads,
      interests
    };
    
    // Create downloadable JSON file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `power_pro_waitlist_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }, [getWaitlistAnalytics]);

  return {
    saveToWaitlist,
    trackInterest,
    getWaitlistAnalytics,
    exportWaitlistData,
    isSubmitting,
    leads
  };
};

// Utility functions
function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getUserId(): string {
  let userId = localStorage.getItem('power_pro_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('power_pro_user_id', userId);
  }
  return userId;
}

function getStoredLeads(): PowerProLead[] {
  try {
    const stored = localStorage.getItem('power_pro_waitlist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getStoredInterests(): PowerProInterest[] {
  try {
    const stored = localStorage.getItem('power_pro_interests');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// Send to backend (placeholder for actual implementation)
async function sendToBackend(lead: PowerProLead) {
  // For demo, just log. Replace with actual API call
  console.log('[POWER PRO LEAD] Sending to backend:', lead);
  
  // Example implementation:
  /*
  try {
    const response = await fetch('/api/power-pro/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Backend submission failed:', error);
    throw error;
  }
  */
}

// Google Sheets integration (alternative to backend)
export const sendToGoogleSheets = async (lead: PowerProLead) => {
  // This would require a Google Apps Script or similar integration
  console.log('[GOOGLE SHEETS] Would send:', lead);
  
  // Example using Google Apps Script Web App:
  /*
  try {
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: lead.email,
        phone: lead.phone || '',
        source: lead.source,
        timestamp: lead.createdAt,
        interests: lead.interests.join(', ')
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Google Sheets submission failed:', error);
    throw error;
  }
  */
};

export default usePowerProLeads;