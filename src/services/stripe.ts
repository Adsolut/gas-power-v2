import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase, Subscription } from '@/lib/supabase';

// Inizializza Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Missing Stripe publishable key');
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

// Tipi per Stripe
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

// Piani di abbonamento Power Pro
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'power-pro-monthly',
    name: 'Power Pro Mensile',
    description: 'Accesso completo a tutte le funzionalità Power Pro',
    price: 1.99,
    currency: 'EUR',
    interval: 'month',
    stripePriceId: 'price_power_pro_monthly', // Da sostituire con il vero ID Stripe
    features: [
      '📊 Dashboard analytics avanzata',
      '🔔 Alert prezzi in tempo reale',
      '📈 Report mensili dettagliati',
      '💡 Consulenza prioritaria',
      '🎯 Ottimizzazione consumi AI',
      '📱 App mobile dedicata',
      '✅ Supporto prioritario 24/7',
      '🏆 Accesso anticipato nuove features'
    ],
    popular: true
  },
  {
    id: 'power-pro-yearly',
    name: 'Power Pro Annuale',
    description: 'Risparmia 2 mesi con il piano annuale',
    price: 19.99,
    currency: 'EUR',
    interval: 'year',
    stripePriceId: 'price_power_pro_yearly', // Da sostituire con il vero ID Stripe
    features: [
      '📊 Dashboard analytics avanzata',
      '🔔 Alert prezzi in tempo reale',
      '📈 Report mensili dettagliati',
      '💡 Consulenza prioritaria',
      '🎯 Ottimizzazione consumi AI',
      '📱 App mobile dedicata',
      '✅ Supporto prioritario 24/7',
      '🏆 Accesso anticipato nuove features',
      '🎁 2 mesi GRATIS',
      '💰 Risparmio del 16%'
    ]
  }
];

// Servizio di gestione abbonamenti
export const stripeService = {
  // Crea una sessione di checkout
  createCheckoutSession: async (
    priceId: string,
    userId: string,
    email: string,
    successUrl: string,
    cancelUrl: string
  ) => {
    try {
      // Chiama il tuo backend per creare la sessione
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId,
          email,
          successUrl,
          cancelUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      return sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  // Redirect al checkout di Stripe
  redirectToCheckout: async (sessionId: string) => {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe redirect error:', error);
      throw error;
    }
  },

  // Crea un portal per gestire l'abbonamento
  createCustomerPortal: async (customerId: string, returnUrl: string) => {
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  },

  // Verifica lo stato dell'abbonamento
  checkSubscriptionStatus: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error checking subscription:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return null;
    }
  },

  // Cancella l'abbonamento
  cancelSubscription: async (subscriptionId: string) => {
    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  },

  // Aggiorna il metodo di pagamento
  updatePaymentMethod: async (customerId: string) => {
    try {
      const response = await fetch('/api/stripe/update-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update payment method');
      }

      const { setupIntentClientSecret } = await response.json();
      return setupIntentClientSecret;
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  }
};

// Hook per gestire lo stato dell'abbonamento
import { useState, useEffect } from 'react';

export const useSubscription = (userId?: string) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        setLoading(true);
        const data = await stripeService.checkSubscriptionStatus(userId);
        setSubscription(data);
      } catch (err) {
        setError('Failed to check subscription status');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();

    // Setup realtime subscription per aggiornamenti
    const subscription = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.new) {
            setSubscription(payload.new as Subscription);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return {
    subscription,
    isActive: subscription?.status === 'active',
    isPro: subscription?.status === 'active',
    loading,
    error
  };
};

// Funzione helper per formattare i prezzi
export const formatPrice = (price: number, currency: string = 'EUR') => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// Funzione per calcolare il risparmio del piano annuale
export const calculateAnnualSavings = () => {
  const monthlyPrice = subscriptionPlans.find(p => p.interval === 'month')?.price || 0;
  const yearlyPrice = subscriptionPlans.find(p => p.interval === 'year')?.price || 0;
  const monthlyTotal = monthlyPrice * 12;
  const savings = monthlyTotal - yearlyPrice;
  const percentage = Math.round((savings / monthlyTotal) * 100);
  
  return {
    amount: savings,
    percentage
  };
};
