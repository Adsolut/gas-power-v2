import { createClient } from '@supabase/supabase-js'

// Configurazione Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Tipi per le tabelle del database
export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  created_at: string
  is_power_pro?: boolean
  subscription_status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
  subscription_end_date?: string
  stripe_customer_id?: string
}

export interface BillUpload {
  id: string
  user_id: string
  file_url: string
  file_name: string
  provider_current?: string
  monthly_cost?: number
  annual_cost?: number
  consumption_kwh?: number
  consumption_smc?: number
  upload_date: string
  parsed_data?: Record<string, unknown>
  status: 'pending' | 'parsed' | 'failed'
}

export interface Comparison {
  id: string
  user_id: string
  bill_id?: string
  savings_amount?: number
  best_offer_id?: string
  comparison_date: string
  comparison_data: Record<string, unknown>
  contacted_suppliers?: string[]
}

export interface PowerProAlert {
  id: string
  user_id: string
  alert_type: 'price_increase' | 'better_offer' | 'contract_expiry' | 'consumption_anomaly'
  message: string
  created_at: string
  read: boolean
  action_url?: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

// Helper functions per operazioni comuni
export const auth = {
  signUp: async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`
    })
    return { data, error }
  }
}

// Database operations
export const db = {
  // Users
  users: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    },
    
    update: async (userId: string, updates: Partial<User>) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
      return { data, error }
    }
  },

  // Bill Uploads
  bills: {
    create: async (bill: Omit<BillUpload, 'id' | 'upload_date'>) => {
      const { data, error } = await supabase
        .from('bill_uploads')
        .insert(bill)
        .select()
        .single()
      return { data, error }
    },

    list: async (userId: string) => {
      const { data, error } = await supabase
        .from('bill_uploads')
        .select('*')
        .eq('user_id', userId)
        .order('upload_date', { ascending: false })
      return { data, error }
    },

    update: async (billId: string, updates: Partial<BillUpload>) => {
      const { data, error } = await supabase
        .from('bill_uploads')
        .update(updates)
        .eq('id', billId)
        .select()
        .single()
      return { data, error }
    }
  },

  // Comparisons
  comparisons: {
    create: async (comparison: Omit<Comparison, 'id' | 'comparison_date'>) => {
      const { data, error } = await supabase
        .from('comparisons')
        .insert(comparison)
        .select()
        .single()
      return { data, error }
    },

    list: async (userId: string) => {
      const { data, error } = await supabase
        .from('comparisons')
        .select('*')
        .eq('user_id', userId)
        .order('comparison_date', { ascending: false })
      return { data, error }
    }
  },

  // Power Pro Alerts
  alerts: {
    list: async (userId: string) => {
      const { data, error } = await supabase
        .from('power_pro_alerts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    markAsRead: async (alertId: string) => {
      const { data, error } = await supabase
        .from('power_pro_alerts')
        .update({ read: true })
        .eq('id', alertId)
      return { data, error }
    }
  },

  // Subscriptions
  subscriptions: {
    get: async (userId: string) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()
      return { data, error }
    },

    create: async (subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscription)
        .select()
        .single()
      return { data, error }
    },

    update: async (subscriptionId: string, updates: Partial<Subscription>) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId)
        .select()
        .single()
      return { data, error }
    }
  }
}

// Storage operations per upload files
export const storage = {
  uploadBill: async (file: File, userId: string) => {
    const fileName = `${userId}/${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage
      .from('bills')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) return { data: null, error, url: null }
    
    const { data: { publicUrl } } = supabase.storage
      .from('bills')
      .getPublicUrl(fileName)
    
    return { data, error: null, url: publicUrl }
  },

  deleteBill: async (filePath: string) => {
    const { error } = await supabase.storage
      .from('bills')
      .remove([filePath])
    return { error }
  }
}
