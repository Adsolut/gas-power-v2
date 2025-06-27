
import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

// Lazy load components for better performance
const DetailedComparisonForm = lazy(() => import('@/components/DetailedComparisonForm'));
const PartnerLogos = lazy(() => import('@/components/PartnerLogos'));
const ProcessSteps = lazy(() => import('@/components/ProcessSteps'));
const ReviewsSection = lazy(() => import('@/components/ReviewsSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const FinalCTA = lazy(() => import('@/components/FinalCTA'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const phoneNumber = '0240137880';
  
  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleFormSubmit = () => {
    handleCallNow();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Header onCallNow={handleCallNow} />
      <HeroSection onCallNow={handleCallNow} />
      <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
        <DetailedComparisonForm onSubmit={handleFormSubmit} />
        <PartnerLogos />
        <ProcessSteps onCallNow={handleCallNow} />
        <ReviewsSection />
        <FAQ />
        <FinalCTA onCallNow={handleCallNow} />
        <Footer onCallNow={handleCallNow} />
      </Suspense>
    </div>
  );
};

export default Index;
