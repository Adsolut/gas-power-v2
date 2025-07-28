import React, { useState, useEffect } from 'react';
import { Phone, Zap, Home, TrendingUp, Shield, Users, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';

// Extend Window interface for analytics
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

interface HeroSectionV2Props {
  onCallNow?: () => void;
  onDiscoverPowerPro?: () => void;
}

const HeroSectionV2: React.FC<HeroSectionV2Props> = ({ onCallNow, onDiscoverPowerPro }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "Ho risparmiato €450 quest'anno grazie ai consigli di efficientamento",
      author: "Marco T., Milano",
      savings: "€450"
    },
    {
      text: "Finalmente capisco dove stavo sprecando energia in casa",
      author: "Sara L., Roma", 
      savings: "€320"
    },
    {
      text: "Non solo risparmio, ma vivo in una casa più efficiente",
      author: "Andrea C., Napoli",
      savings: "€280"
    }
  ];

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleScrollToPowerPro = () => {
    // Scroll to Power Pro section
    const powerProSection = document.getElementById('power-pro-section');
    if (powerProSection) {
      powerProSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'discover_power_pro_click', {
        event_category: 'engagement',
        event_label: 'hero_section'
      });
    }
    
    if (onDiscoverPowerPro) {
      onDiscoverPowerPro();
    }
  };

  const handleCallNow = () => {
    if (onCallNow) {
      onCallNow();
    }
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_call_now', {
        event_category: 'conversion',
        event_label: 'hero_section'
      });
    }
  };

  return (
    <section className="relative overflow-hidden text-white">
      {/* Multi-layer Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-800/70 via-blue-600/40 to-teal-500/30 animate-gradient-y"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-500/15 to-fuchsia-600/25 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-black/15"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-cyan-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-violet-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div className="absolute top-1/4 left-1/2 w-12 h-12 bg-teal-400/20 rounded-full blur-md animate-pulse delay-1500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-flex items-center mb-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 text-sm rounded-full">
              <Home className="w-4 h-4 mr-2" />
              CONSULENTI EFFICIENTAMENTO ENERGETICO
            </span>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Non vendiamo energia,{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ti aiutiamo a usarla meglio
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Analizza, ottimizza e controlla i consumi della tua abitazione 
              con il supporto di <strong>veri esperti</strong> in efficientamento energetico.
            </p>
            
            {/* Value Props */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Identificazione sprechi nascosti</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <TrendingUp className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Ottimizzazione automatica consumi</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <Shield className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Consulenza indipendente</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <Zap className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Monitoraggio continuo mercato</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:0299220697"
                onClick={handleCallNow}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 rounded-lg flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-center">
                  Consulenza Gratuita<br />
                  02 99 22 06 97
                </span>
              </a>
              
              <button
                onClick={handleScrollToPowerPro}
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 text-lg backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors"
              >
                Scopri Power Pro
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-white/80">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">2,000,000+ clienti soddisfatti</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">15 anni di esperienza</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-sm">Consulenza indipendente</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Testimonial & Stats */}
          <div className="text-center lg:text-left">
            {/* Rotating Testimonial */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
              <div className="text-2xl mb-4">💬</div>
              <blockquote className="text-lg italic text-white/90 mb-4 min-h-[60px] flex items-center">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="flex items-center justify-between">
                <cite className="text-white/70 not-italic">
                  — {testimonials[currentTestimonial].author}
                </cite>
                <div className="text-green-400 font-bold text-xl">
                  {testimonials[currentTestimonial].savings}
                </div>
              </div>
              
              {/* Testimonial Dots */}
              <div className="flex justify-center mt-4 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-green-400 mb-2">€350</div>
                <div className="text-white/70 text-sm">Risparmio medio annuo</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
                <div className="text-white/70 text-sm">Clienti soddisfatti</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-white/70 text-sm">Monitoraggio mercato</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
                <div className="text-3xl font-bold text-yellow-400 mb-2">15</div>
                <div className="text-white/70 text-sm">Anni esperienza</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V60c0,0,200,20,400,20s400-20,400-20s200,20,400,20v40H0V0z" fill="currentColor" fillOpacity="0.1"></path>
          <path d="M0,0V40c0,0,200,40,400,40s400-40,400-40s200,40,400,40v80H0V0z" fill="currentColor" fillOpacity="0.05"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSectionV2;