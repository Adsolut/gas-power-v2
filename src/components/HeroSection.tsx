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
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] min-h-[500px] max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel - Position absolute per essere dietro al contenuto */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroCarousel />
      </div>
      
      {/* Main Content Over Background */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-white/10">
            
            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 animate-fade-in drop-shadow-2xl leading-tight">
              Confronta le <span className="text-green-400 drop-shadow-lg">Migliori Offerte</span>
              <br />
              <span className="text-blue-300">Luce e Gas</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 md:mb-10 animate-fade-in drop-shadow-lg px-2 max-w-4xl mx-auto font-medium">
              Trova la tariffa più conveniente per la tua casa. Confronta gratuitamente 
              le offerte dei principali fornitori e inizia subito a risparmiare.
            </p>
            
            {/* Main CTA */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center animate-scale-in mb-6 sm:mb-8 md:mb-10">
              <Button 
                onClick={onCallNow} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border-2 border-white/20"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3" />
                Chiama Ora: 02 4013 7880
              </Button>
              <p className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow-lg text-center px-2 font-medium">
                ⏰ Consulenza gratuita dal lunedì al venerdì 8-21, sabato 9-13
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center animate-fade-in">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-sm sm:text-lg md:text-xl mb-1 sm:mb-2 text-white drop-shadow-lg">Oltre 200.000 Clienti</h3>
                <p className="text-xs sm:text-base md:text-lg text-white/90 drop-shadow-lg font-medium">Si sono fidati di noi dal 2015</p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-sm sm:text-lg md:text-xl mb-1 sm:mb-2 text-white drop-shadow-lg">100% Gratuito</h3>
                <p className="text-xs sm:text-base md:text-lg text-white/90 drop-shadow-lg font-medium">Confronto e consulenza senza costi</p>
              </div>
              
              <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                </div>
                <h3 className="font-bold text-sm sm:text-lg md:text-xl mb-1 sm:mb-2 text-white drop-shadow-lg">Risparmio Immediato</h3>
                <p className="text-xs sm:text-base md:text-lg text-white/90 drop-shadow-lg font-medium">Attivazione in pochi minuti</p>
              </div>
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
