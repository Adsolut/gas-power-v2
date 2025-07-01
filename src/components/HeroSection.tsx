import { Phone, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import HeroCarousel from '@/components/HeroCarousel';

interface HeroSectionProps {
  onCallNow: () => void;
}

const HeroSection = ({ onCallNow }: HeroSectionProps) => {
  // Debug per verificare il caricamento della sezione
  useEffect(() => {
    console.log('🎯 HeroSection montata - Carousel dovrebbe essere visibile');
  }, []);

  return (
    <section className="relative w-full h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] min-h-[450px] max-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel - Position absolute per essere dietro al contenuto */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroCarousel />
      </div>
      
      {/* Main Content Over Background */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="text-center">
          <div className="bg-black/25 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-2xl border border-white/15">
            
            {/* Main Title */}
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 animate-fade-in drop-shadow-2xl leading-tight">
              Confronta le <span className="text-green-400 drop-shadow-lg">Migliori Offerte</span>
              <br />
              <span className="text-blue-300">Luce e Gas</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 mb-3 sm:mb-4 md:mb-5 animate-fade-in drop-shadow-lg px-1 sm:px-2 max-w-3xl mx-auto font-medium leading-tight">
              Trova la tariffa più conveniente per la tua casa. Confronta gratuitamente 
              le offerte dei principali fornitori e inizia subito a risparmiare.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
              <div className="text-center animate-fade-in">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mx-auto mb-1 sm:mb-2 border border-white/20">
                  <Users className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-white drop-shadow-lg">200.000+ Clienti</h3>
                <p className="text-xs sm:text-xs md:text-sm text-white/90 drop-shadow-lg font-medium">Dal 2015</p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mx-auto mb-1 sm:mb-2 border border-white/20">
                  <Shield className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-white drop-shadow-lg">100% Gratuito</h3>
                <p className="text-xs sm:text-xs md:text-sm text-white/90 drop-shadow-lg font-medium">Senza costi</p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center mx-auto mb-1 sm:mb-2 border border-white/20">
                  <Clock className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 text-white drop-shadow-lg">Risparmio Immediato</h3>
                <p className="text-xs sm:text-xs md:text-sm text-white/90 drop-shadow-lg font-medium">Attivazione veloce</p>
              </div>
            </div>

            {/* Main CTA - Moved after Trust Indicators */}
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                onClick={onCallNow} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none border-2 border-white/20 active:scale-95"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3" />
                Chiama ora!
              </Button>
              <p className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow-lg text-center px-1 sm:px-2 font-medium leading-tight">
                ⏰ Consulenza gratuita dal lunedì al venerdì 8-21, sabato 9-13
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator (desktop only) */}
      <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-white/70 text-xs mt-2 text-center">Scorri per scoprire</p>
      </div>
    </section>
  );
};

export default HeroSection;
