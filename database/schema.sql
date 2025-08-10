-- Supabase Database Schema for Gas Power Compara v2
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    phone TEXT,
    company_name TEXT,
    vat_number TEXT,
    subscription_plan TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'inactive',
    subscription_started_at TIMESTAMP,
    subscription_ends_at TIMESTAMP,
    stripe_customer_id TEXT,
    total_saved DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- BILLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.bills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    period TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    electricity_consumption DECIMAL(10,2),
    gas_consumption DECIMAL(10,2),
    contract_type TEXT,
    customer_code TEXT,
    file_url TEXT,
    parsed_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own bills
CREATE POLICY "Users can view own bills" ON public.bills
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bills" ON public.bills
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- COMPARISONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.comparisons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    bill_id UUID REFERENCES public.bills(id) ON DELETE CASCADE,
    current_provider TEXT,
    current_cost DECIMAL(10,2),
    recommended_provider TEXT,
    recommended_cost DECIMAL(10,2),
    potential_saving DECIMAL(10,2),
    comparison_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;

-- Policy
CREATE POLICY "Users can view own comparisons" ON public.comparisons
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own comparisons" ON public.comparisons
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- SUPPLIERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    website TEXT,
    rating DECIMAL(2,1),
    review_count INTEGER DEFAULT 0,
    description TEXT,
    green_energy BOOLEAN DEFAULT false,
    coverage TEXT[],
    features JSONB,
    customer_service JSONB,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Public read access for suppliers
CREATE POLICY "Anyone can view active suppliers" ON public.suppliers
    FOR SELECT USING (active = true);

-- ============================================
-- OFFERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('electricity', 'gas', 'combined')),
    price_type TEXT CHECK (price_type IN ('fixed', 'indexed', 'dual-rate')),
    duration_months INTEGER,
    activation_cost DECIMAL(10,2) DEFAULT 0,
    termination_fee DECIMAL(10,2) DEFAULT 0,
    price_data JSONB,
    features TEXT[],
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Public read access for offers
CREATE POLICY "Anyone can view available offers" ON public.offers
    FOR SELECT USING (available = true);

-- ============================================
-- ALERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('warning', 'info', 'success', 'error')),
    title TEXT NOT NULL,
    description TEXT,
    read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own alerts" ON public.alerts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" ON public.alerts
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE
    ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE
    ON public.suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE
    ON public.offers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
