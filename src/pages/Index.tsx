import { lazy, Suspense, useEffect, useState } from 'react';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { useSEO } from '@/hooks/useSEO';
import SEOHead from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/utils/seoUtils';

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Import optimized components
import OptimizedHeader from '@/components/optimized/OptimizedHeader';
import StickyMobileCTA from '@/components/optimized/StickyMobileCTA';
import OptimizedFinalCTA from '@/components/optimized/OptimizedFinalCTA';

// v2.0 Components - New Marketing Strategy
import HeroSectionV2 from '@/components/v2/HeroSectionV2';
import PowerProPresentation from '@/components/v2/PowerProPresentation';

// Legacy components
import HeroSection from '@/components/HeroSection';

// Lazy load components for better performance
const DetailedComparisonForm = lazy(() => import('@/components/DetailedComparisonForm'));
const PartnerLogosCompact = lazy(() => import('@/components/PartnerLogosCompact'));
const ProcessSteps = lazy(() => import('@/components/ProcessSteps'));
const ReviewsSection = lazy(() => import('@/components/ReviewsSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const { handleDirectCall, handleCallbackRequest, initializeTracking } = useConversionTracking();
  const { updatePageTitle } = useSEO();
  
  // v2.0 Marketing Strategy Toggle
  const [useV2Strategy, setUseV2Strategy] = useState(() => {
    // Enable v2.0 by default for new marketing strategy
    return true;
    // For A/B testing: return Math.random() < 0.5;
  });
  
  // Initialize tracking on mount
  useEffect(() => {
    const cleanup = initializeTracking();
    
    // Track which version is being shown
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'version_shown', {
        event_category: 'ab_test',
        event_label: useV2Strategy ? 'v2_marketing' : 'v1_legacy',
        version: useV2Strategy ? '2.0' : '1.0'
      });
    }
    
    return cleanup;
  }, [initializeTracking, useV2Strategy]);

  // Enhanced tracking for v2.0 features
  const handleV2CallNow = () => {
    handleDirectCall('hero_v2');
  };
  
  const handleDiscoverPowerPro = () => {
    // Track Power Pro discovery
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'power_pro_discovery', {
        event_category: 'engagement',
        event_label: 'hero_cta'
      });
    }
  };

  const handleFormSubmit = () => {
    handleDirectCall('form_submission');
  };
  
  // Generate structured data for v2.0 positioning
  const getStructuredData = () => {
    if (useV2Strategy) {
      return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Gas & Power - Consulenti Efficientamento Energetico",
        "description": "Consulenza professionale per l'efficientamento energetico domestico. Power Pro: il tuo consulente energetico personale per €1.99/mese",
        "serviceType": "Consulenza Efficientamento Energetico",
        "provider": {
          "@type": "Organization",
          "name": "Adsolut S.R.L.S.",
          "telephone": "+39-02-99-22-06-97"
        },
        "offers": {
          "@type": "Offer",
          "name": "Power Pro",
          "description": "Consulente energetico personale",
          "price": "1.99",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "RecurringPriceSpecification",
            "billingIncrement": "P1M"
          }
        }
      };
    }
    return generateStructuredData.homepage();
  };

  return (
    <>
      {/* SEO Head - Dynamic based on strategy version */}
      <SEOHead 
        title={useV2Strategy 
          ? "Consulenti Efficientamento Energetico | Power Pro €1.99/mese | Gas & Power"
          : "Gas & Power - Confronta e Risparmia su Luce, Gas e Internet | Consulenza Gratuita"
        }
        description={useV2Strategy
          ? "🏠 Non vendiamo energia, ti aiutiamo a usarla meglio! Power Pro: il tuo consulente energetico personale per €1.99/mese. Analisi, ottimizzazione e monitoraggio automatico ☎️ +39 02 99 22 06 97"
          : "🔥 Risparmia fino a €300/anno sulla bolletta! Confronta GRATIS le migliori offerte di luce, gas e internet. Consulenza telefonica immediata ☎️ +39 02 99 22 06 97"
        }
        keywords={useV2Strategy
          ? "efficientamento energetico, consulenza energetica, power pro, ottimizzazione consumi, consulente energetico, risparmio energia casa"
          : "confronto offerte luce, confronto offerte gas, risparmio bolletta, offerte energia elettrica, gas & power, consulenza energetica gratuita, milano energia"
        }
        structuredData={getStructuredData()}
      />

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Optimized Header with working callback functionality */}
      <OptimizedHeader 
        onCallNow={() => handleDirectCall('header')} 
        onCallbackRequest={handleCallbackRequest}
      />
      
      {/* Main Hero Section - Dynamic based on strategy */}
      {useV2Strategy ? (
        <HeroSectionV2 
          onCallNow={handleV2CallNow}
          onDiscoverPowerPro={handleDiscoverPowerPro}
        />
      ) : (
        <HeroSection onCallNow={() => handleDirectCall('hero')} />
      )}
      
      <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
        <DetailedComparisonForm onSubmit={handleFormSubmit} />
      
      {/* Power Pro Marketing Section - Only for v2.0 */}
      {useV2Strategy && (
        <PowerProPresentation 
          onCallNow={() => handleDirectCall('power_pro_section')}
        />
      )}
        
        {/* Show partner logos and process steps only for v1.0, or modify for v2.0 */}
        {!useV2Strategy && <PartnerLogosCompact />}
        
        <ProcessSteps onCallNow={() => handleDirectCall('process_steps')} />
        <ReviewsSection />
        
        {/* Optimized Final CTA with urgency and working callback */}
        <OptimizedFinalCTA 
          onCallNow={() => handleDirectCall('final_cta')} 
          onCallbackRequest={handleCallbackRequest}
        />
        
        <FAQ />
        
        <Footer onCallNow={() => handleDirectCall('footer')} />
      </Suspense>
      
      {/* NEW: Sticky Mobile CTA for maximum mobile conversions */}
      <StickyMobileCTA 
        onDirectCall={() => handleDirectCall('sticky_mobile')}
        onRequestCallback={handleCallbackRequest}
      />
    </div>
    </>
  );
};

export default Index;