
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DetailedComparisonForm from '@/components/DetailedComparisonForm';
import PartnerLogos from '@/components/PartnerLogos';
import ProcessSteps from '@/components/ProcessSteps';
import ReviewsSection from '@/components/ReviewsSection';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

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
      <DetailedComparisonForm onSubmit={handleFormSubmit} />
      <PartnerLogos />
      <ProcessSteps onCallNow={handleCallNow} />
      <ReviewsSection />
      <FAQ />
      <FinalCTA onCallNow={handleCallNow} />
      <Footer onCallNow={handleCallNow} />
    </div>
  );
};

export default Index;
