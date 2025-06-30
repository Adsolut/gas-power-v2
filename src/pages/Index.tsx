import { lazy, Suspense, useEffect } from 'react';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import { useSEO } from '@/hooks/useSEO';
import SEOHead from '@/components/SEO/SEOHead';
import { generateStructuredData } from '@/utils/seoUtils';

// Import optimized components
import OptimizedHeader from '@/components/optimized/OptimizedHeader';
import StickyMobileCTA from '@/components/optimized/StickyMobileCTA';
import OptimizedFinalCTA from '@/components/optimized/OptimizedFinalCTA';
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
  
  // Initialize tracking on mount
  useEffect(() => {
    const cleanup = initializeTracking();
    return cleanup;
  }, [initializeTracking]);

  const handleFormSubmit = () => {
    handleDirectCall('form_submission');
  };

  return (
    <>
      {/* SEO Head */}
      <SEOHead 
        title="Gas e Power - Confronta e Risparmia su Luce, Gas e Internet | Consulenza Gratuita"
        description="🔥 Risparmia fino a €300/anno sulla bolletta! Confronta GRATIS le migliori offerte di luce, gas e internet. Consulenza telefonica immediata ☎️ 02 4013 7880"
        keywords="confronto offerte luce, confronto offerte gas, risparmio bolletta, offerte energia elettrica, gas e power, consulenza energetica gratuita, milano energia"
        structuredData={generateStructuredData.homepage()}
      />

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Optimized Header with working callback functionality */}
      <OptimizedHeader 
        onCallNow={() => handleDirectCall('header')} 
        onCallbackRequest={handleCallbackRequest}
      />
      
      <HeroSection onCallNow={() => handleDirectCall('hero')} />
      
      <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
        <DetailedComparisonForm onSubmit={handleFormSubmit} />
        <PartnerLogosCompact />
        <ProcessSteps onCallNow={() => handleDirectCall('process_steps')} />
        <ReviewsSection />
        <FAQ />
        
        {/* Optimized Final CTA with urgency and working callback */}
        <OptimizedFinalCTA 
          onCallNow={() => handleDirectCall('final_cta')} 
          onCallbackRequest={handleCallbackRequest}
        />
        
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
