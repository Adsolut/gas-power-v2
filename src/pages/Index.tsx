import { lazy, Suspense } from 'react';
import { useConversionTracking } from '@/hooks/useConversionTracking';

// Import optimized components
import OptimizedHeader from '@/components/optimized/OptimizedHeader';
import StickyMobileCTA from '@/components/optimized/StickyMobileCTA';
import OptimizedFinalCTA from '@/components/optimized/OptimizedFinalCTA';
import HeroSection from '@/components/HeroSection';

// Lazy load components for better performance
const DetailedComparisonForm = lazy(() => import('@/components/DetailedComparisonForm'));
const PartnerLogos = lazy(() => import('@/components/PartnerLogos'));
const ProcessSteps = lazy(() => import('@/components/ProcessSteps'));
const ReviewsSection = lazy(() => import('@/components/ReviewsSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const { handleDirectCall, handleCallbackRequest } = useConversionTracking();
  
  const handleFormSubmit = () => {
    handleDirectCall('form_submission');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Optimized Header with working callback functionality */}
      <OptimizedHeader 
        onCallNow={() => handleDirectCall('header')} 
        onCallbackRequest={handleCallbackRequest}
      />
      
      <HeroSection onCallNow={() => handleDirectCall('hero')} />
      
      <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
        <DetailedComparisonForm onSubmit={handleFormSubmit} />
        <PartnerLogos />
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
  );
};

export default Index;
