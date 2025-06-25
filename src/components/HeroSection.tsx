
import { Phone, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroCarousel from '@/components/HeroCarousel';

interface HeroSectionProps {
  onCallNow: () => void;
}

const HeroSection = ({ onCallNow }: HeroSectionProps) => {
  return (
    <section className="relative w-full aspect-video flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Carousel */}
      <HeroCarousel />
      
      {/* Main Content Over Background */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 animate-fade-in drop-shadow-lg leading-tight">
            Confronta le <span className="text-gaspower-green">Migliori Offerte</span>
            <br />
            Luce e Gas
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 animate-fade-in drop-shadow-md px-2">
            Trova la tariffa più conveniente per la tua casa. Confronta gratuitamente 
            le offerte dei principali fornitori e inizia subito a risparmiare.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center animate-scale-in mb-4 sm:mb-6 md:mb-8">
            <Button 
              onClick={onCallNow} 
              className="bg-gaspower-blue hover:bg-blue-600 text-white font-bold text-sm sm:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Chiama Ora: 02 4013 7880
            </Button>
            <p className="text-xs sm:text-sm text-white/80 drop-shadow-md text-center px-2">
              Consulenza gratuita dal lunedì al venerdì 8-21, sabato 9-13
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center animate-fade-in">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-white drop-shadow-md">Oltre 200.000 Clienti</h3>
              <p className="text-xs sm:text-base text-white/80 drop-shadow-md">Si sono fidati di noi dal 2015</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-white drop-shadow-md">100% Gratuito</h3>
              <p className="text-xs sm:text-base text-white/80 drop-shadow-md">Confronto e consulenza senza costi</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-white drop-shadow-md">Risparmio Immediato</h3>
              <p className="text-xs sm:text-base text-white/80 drop-shadow-md">Attivazione in pochi minuti</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
